import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
import Image from 'next/image';
import Card from '@/components/card';
import NutritionistAlert from '@/components/nutritionist-alert';
import Chat from './chat';
import Link from 'next/link';
import Container from '@mui/material/Container';

const NutritionistPage = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('profiles')
    .select(`nutritionist_id, nutritionists(id, name, image)`)
    .eq('id', user?.id!)
    .single();

  const nutritionist = profile?.nutritionists;

  if (!nutritionist) {
    return (
      <Container maxWidth="xs" disableGutters sx={{ m: 0 }}>
        <NutritionistAlert nutritionist_id={''} />
      </Container>
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4}>
        <Card alignItems="center" pt={6} pb={4}>
          <Badge
            variant="dot"
            color="success"
            overlap="circular"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
          >
            <Avatar sx={{ width: 96, height: 96 }}>
              <Image
                alt={nutritionist.name}
                src={nutritionist.image}
                width={96}
                height={96}
                style={{ objectFit: 'fill' }}
              />
            </Avatar>
          </Badge>
          <Typography variant="h6" mt={2}>
            {nutritionist.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Online
          </Typography>
          <Stack direction="row" spacing={1}>
            <IconButton aria-label="call">
              <CallIcon />
            </IconButton>
            <IconButton
              aria-label="appointment"
              component={Link}
              href={`/nutritionists/appointment/${nutritionist.id}`}
            >
              <VideocamIcon />
            </IconButton>
          </Stack>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <Chat nutritionist={nutritionist} />
      </Grid>
    </Grid>
  );
};

export default NutritionistPage;
