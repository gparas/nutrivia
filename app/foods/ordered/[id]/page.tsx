import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import { notFound } from 'next/navigation';
import Grid from '@mui/material/Grid';
import Overview from './overview';
import ComparisonChart from './comparison-chart';
import { getNutrientsData } from '@/lib/utils';
import { DAILY_MEALS } from '@/lib/constants';
import { getNutrientsDataset } from './utils';
import Intake from './intake';
import NutrientsIntake from './nutrients-intake';
import BackButton from '@/components/back-button';

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

  const { data: profile } = await supabase
    .from('profiles')
    .select()
    .eq('id', user_id || '')
    .single();

  if (!profile) {
    return notFound();
  }

  const { data: food } = await supabase
    .from('foods')
    .select()
    .match({ id })
    .single();

  if (!food) {
    return 'Not found food';
  }

  const dailyCalorieIntake = profile.kcal_intake || 0;

  const recommendedKcal = Math.round(
    DAILY_MEALS.find(meal => meal.id === food.category)?.recommendedKcal! *
      dailyCalorieIntake,
  );

  const nutrientsData = getNutrientsData(profile, recommendedKcal);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <BackButton />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Overview recommendedKcal={recommendedKcal} {...food} />
        <Intake
          food={food}
          nutrientsData={nutrientsData}
          recommendedKcal={recommendedKcal}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <ComparisonChart dataset={getNutrientsDataset(nutrientsData, food)} />
        <NutrientsIntake nutrientsData={nutrientsData} food={food} />
      </Grid>
    </Grid>
  );
};

export default OrderedFoodPage;
