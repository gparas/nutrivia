import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import { notFound } from 'next/navigation';
import NextLink from 'next/link';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Grid from '@mui/material/Grid';
import Card from '@/components/card';

import Nutrients from './components/nutrients';
import Media from './components/media';
import Name from './components/name';
import Price from './components/price';

type Props = {
  searchParams?: {
    category?: string;
    kcal?: string;
  };
};

const MealsPage = async ({ searchParams }: Props) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  let query = supabase.from('meals').select('*');

  if (searchParams?.category) {
    query = query.eq('category', searchParams.category);
  }
  if (searchParams?.kcal) {
    query = query.lte('kcal', Number(searchParams.kcal));
  }

  const { data: meals } = await query;

  if (!meals?.length) {
    notFound();
  }

  return (
    <>
      <Typography variant="h4" mb={3}>
        Meals
      </Typography>
      <Grid container spacing={[1, 1, 2]}>
        {meals.map(meal => {
          return (
            <Grid key={meal.id} item xs={6} sm={4} lg={3}>
              <Card p={0} height="100%">
                <CardActionArea
                  component={NextLink}
                  href={`/meals/${meal.id}`}
                  scroll={false}
                  sx={{ height: '100%' }}
                >
                  <Media {...meal} />
                  <Box p={2}>
                    <Name name={meal.name} />
                    <Price price={meal.price} />
                    <Divider light sx={{ my: 1.75 }} />
                    <Nutrients {...meal} />
                  </Box>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default MealsPage;
