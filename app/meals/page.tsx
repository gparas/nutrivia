import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import { notFound } from 'next/navigation';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Card from '@/components/card';
import Nutrients from './components/nutrients';
import Media from './components/media';
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
      <Grid container spacing={2}>
        {meals.map(meal => {
          return (
            <Grid key={meal.id} item xs={12} sm={6} md={4} lg={3}>
              <Card p={0} height="100%">
                <Media {...meal} />
                <Stack p={2} flex="1 1 auto" spacing={2}>
                  <Typography variant="h6" lineHeight={1.5} flex="1 1 auto">
                    {meal.name}
                  </Typography>
                  <Nutrients {...meal} />
                  <Divider />
                  <Price {...meal} />
                </Stack>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default MealsPage;
