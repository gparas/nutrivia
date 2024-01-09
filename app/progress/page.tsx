import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import dayjs from 'dayjs';
import { notFound } from 'next/navigation';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PageTitle from '@/components/page-title';
import KcalChart from '@/components/kcal-chart';
import KcalOverview from '@/components/kcal-overview';
import WeightChart from '@/components/weight-chart';
import WaterChart from '@/components/water-chart';
import MealsTable from '@/components/meals-table';
import {
  getKcalDataset,
  getNutritionDataset,
  getWeightDataset,
  getWaterDataset,
} from '@/lib/utils';

const ProgressPage = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('profiles')
    .select()
    .eq('id', user?.id!)
    .single();

  const { data: meals } = await supabase
    .from('meals')
    .select(
      `
    created_at,
    foods (
      id,
      image,
      name,
      category,
      kcal,
      carbs,
      protein,
      fat
    )
  `,
    )
    .eq('user_id', user?.id!)
    .gte('created_at', dayjs().subtract(7, 'days').format('YYYY-MM-DD'))
    .lte('created_at', dayjs().format('YYYY-MM-DD'));

  const { data: weights } = await supabase
    .from('weights')
    .select('created_at, kg')
    .eq('user_id', user?.id!)
    .gte('created_at', dayjs().subtract(7, 'days').format('YYYY-MM-DD'))
    .lte('created_at', dayjs().format('YYYY-MM-DD'));

  const { data: water } = await supabase
    .from('water')
    .select('created_at, liter')
    .eq('user_id', user?.id!)
    .gte('created_at', dayjs().subtract(7, 'days').format('YYYY-MM-DD'))
    .lte('created_at', dayjs().format('YYYY-MM-DD'));

  if (!meals || !profile) {
    return notFound();
  }

  const dailyCalorieIntake = profile?.kcal_intake || 0;

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <PageTitle>Progress</PageTitle>
        <Typography variant="body2">
          {dayjs().subtract(7, 'days').format('DD MMM YY')} -{' '}
          {dayjs().format('DD MMM YY')}
        </Typography>
      </Stack>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <KcalChart dataset={getKcalDataset(meals)} />
        </Grid>
        <Grid item xs={12} md={4}>
          <KcalOverview
            dataset={getKcalDataset(meals)}
            nutritionDataset={getNutritionDataset(meals)}
            dailyCalorieIntake={dailyCalorieIntake}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <WeightChart
            goal={profile.goal}
            current_weight={Number(profile.weight)}
            target_weight={Number(profile.target_weight)}
            dataset={getWeightDataset(weights, profile?.weight)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <WaterChart dataset={getWaterDataset(water)} />
        </Grid>
        <Grid item xs={12}>
          <MealsTable
            user_id={user?.id}
            meals={meals.map((meal, index) => {
              return {
                id: index,
                meal_id: meal.foods?.id,
                image: meal.foods?.image,
                name: meal.foods?.name,
                category: meal.foods?.category,
                kcal: meal.foods?.kcal,
                carbs: meal.foods?.carbs,
                protein: meal.foods?.protein,
                fat: meal.foods?.fat,
              };
            })}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ProgressPage;
