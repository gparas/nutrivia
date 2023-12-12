import { promises as fs } from 'fs';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Card from '@/components/card';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Meal } from '@/types/meal';
import Title from './title';

let euro = Intl.NumberFormat('en-DE', {
  style: 'currency',
  currency: 'EUR',
  useGrouping: false,
});

const Mealpage = async ({ params: { id } }: { params: { id: string } }) => {
  const file = await fs.readFile(process.cwd() + '/app/meals.json', 'utf8');
  const data = JSON.parse(file);

  const { slot_name, meals } = data.find(
    ({ slot_name }: { slot_name: string }) => slot_name === id,
  );

  if (!data?.length) {
    notFound();
  }

  const title = slot_name.charAt(0).toUpperCase() + slot_name.slice(1);

  return (
    <>
      <Title>{title}</Title>
      <Grid container spacing={2}>
        {meals.map((meal: Meal) => {
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
