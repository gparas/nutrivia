import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import { notFound } from 'next/navigation';
import Grid from '@mui/material/Grid';
import Overview from './overview';
import NutrientsChart from './nutrients-chart';
import { getDailyCalorieIntake, getNutrientsData } from '@/lib/utils';
import { DAILY_MEALS } from '@/lib/constants';
import { getnutrientsDataset } from './utils';

const OrderedFoodPage = async ({
  params: { id },
  searchParams,
}: {
  params: { id: string };
  searchParams: { user_id: string | undefined };
}) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const user_id = searchParams.user_id;

  const { data: profiles } = await supabase
    .from('profiles')
    .select()
    .eq('id', user_id || '');

  if (!profiles) {
    return notFound();
  }

  const { data: foods } = await supabase.from('foods').select().match({ id });

  const food = foods?.find(food => food.id === id);

  if (!food) {
    return 'No food found';
  }

  const dailyCalorieIntake = getDailyCalorieIntake(profiles[0]);

  const recommendedKcal = Math.round(
    DAILY_MEALS.find(meal => meal.id === food.category)?.recommendedKcal! *
      dailyCalorieIntake,
  );

  const nutrientsData = getNutrientsData(recommendedKcal);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <Overview foodKcal={food.kcal} recommendedKcal={recommendedKcal} />
      </Grid>
      <Grid item xs={12} sm={8}>
        <NutrientsChart dataset={getnutrientsDataset(nutrientsData, food)} />
      </Grid>
    </Grid>
  );
};

export default OrderedFoodPage;
