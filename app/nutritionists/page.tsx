import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import { notFound } from 'next/navigation';
import NextLink from 'next/link';
import Image from 'next/image';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import StarIcon from '@mui/icons-material/StarRounded';
import PeopleIcon from '@mui/icons-material/PeopleRounded';
import PinIcon from '@mui/icons-material/FmdGood';
import Card from '@/components/card';

const NutritionistsPage = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: nutritionists, error } = await supabase
    .from('nutritionists')
    .select();

  if (!nutritionists?.length) {
    notFound();
  }

  return (
    <Grid container spacing={3}>
      {nutritionists.map(nutritionist => (
        <Grid key={nutritionist.id} item xs={12} sm={6} md={4}>
          <Card p={0}>
            <Stack direction="row" spacing={2} p={2}>
              <Avatar sx={{ width: 72, height: 72 }}>
                <Image
                  alt={nutritionist.name}
                  src={nutritionist.image}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{
                    objectFit: 'cover',
                    objectPosition: '50% 25%',
                  }}
                />
              </Avatar>
              <Box flex="1 1 auto">
                <Typography variant="h6" fontWeight={500}>
                  {nutritionist.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  {nutritionist.expertise}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={3} mt={1}>
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <StarIcon color="warning" sx={{ fontSize: 18 }} />
                    <Typography variant="caption" noWrap>
                      {nutritionist.rating}
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <PeopleIcon color="action" sx={{ fontSize: 18 }} />
                    <Typography variant="caption" noWrap>
                      {Math.floor(Math.random() * (40 - 10 + 1) + 10)} clients
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
            <Divider light />
            <Stack direction="row" alignItems="center" p={1}>
              <Stack
                direction="row"
                alignItems="center"
                spacing={0.5}
                px={1}
                flex="1 1 auto"
              >
                <PinIcon color="action" sx={{ fontSize: 18 }} />
                <Typography variant="caption">
                  {nutritionist.location}
                </Typography>
              </Stack>
              <Button
                color="primary"
                size="small"
                sx={{ fontWeight: 500 }}
                component={NextLink}
                href={`/nutritionists/${nutritionist.id}`}
              >
                View profile
              </Button>
            </Stack>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default NutritionistsPage;
