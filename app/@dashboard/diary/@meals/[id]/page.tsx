import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Card from '@/components/card';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import BackButton from './backButton';

let euro = Intl.NumberFormat('en-DE', {
  style: 'currency',
  currency: 'EUR',
  useGrouping: false,
});

const Mealpage = async ({ params: { id } }: { params: { id: string } }) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data } = await supabase
    .from('meals')
    .select()
    .match({ category_id: id });

  if (!data?.length) {
    notFound();
  }

  return (
    <>
      <BackButton />
      <Grid container spacing={2}>
        {data.map(meal => {
          return (
            <Grid key={meal.id} item xs={12} md={6} lg={4}>
              <Card p={0} height="100%">
                <Box flex="0 0 auto" textAlign="center">
                  <Image
                    width={200}
                    height={200}
                    alt={meal.name}
                    src={meal.image}
                    priority
                  />
                </Box>
                <Stack p={2} flex="1 1 auto" spacing={2}>
                  <Typography variant="h6" lineHeight={1.5} flex="1 1 auto">
                    {meal.name}
                  </Typography>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" textAlign="center">
                      {meal.kcal}
                      <br />
                      <Typography variant="caption">Kcal</Typography>
                    </Typography>
                    <Typography variant="body2" textAlign="center">
                      {meal.protein}
                      <br />
                      <Typography variant="caption">protein</Typography>
                    </Typography>
                    <Typography variant="body2" textAlign="center">
                      {meal.fat}
                      <br />
                      <Typography variant="caption">fat</Typography>
                    </Typography>
                    <Typography variant="body2" textAlign="center">
                      {meal.carbs}
                      <br />
                      <Typography variant="caption">carbs</Typography>
                    </Typography>
                  </Stack>
                  <Divider />
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography fontWeight={500}>
                      {euro.format(Math.random() * (20 - 8) + 8)}
                    </Typography>
                    <Button variant="contained">Order now</Button>
                  </Stack>
                </Stack>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default Mealpage;
