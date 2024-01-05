import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import dayjs from 'dayjs';
import { notFound } from 'next/navigation';
import Grid from '@mui/material/Grid';
import KcalChart from '@/components/kcal-chart';
import KcalOverview from '@/components/kcal-overview';
import WeightChart from '@/components/weight-chart';
import WaterChart from '@/components/water-chart';
import {
  getDailyCalorieIntake,
  getKcalDataset,
  getNutritionDataset,
  getWeightDataset,
  getWaterDataset,
} from '@/lib/utils';
import Title from './title';

const ClientPage = async ({ params: { id } }: { params: { id: string } }) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: profiles } = await supabase
    .from('profiles')
    .select()
    .eq('id', id);

  const { data: meals } = await supabase
    .from('meals')
    .select(
      `
    created_at,
    foods (
      kcal,
      carbs,
      fat,
      protein
    )
  `,
    )
    .eq('user_id', id)
    .gte('created_at', dayjs().subtract(7, 'days').format('YYYY-MM-DD'))
    .lte('created_at', dayjs().format('YYYY-MM-DD'));

  const { data: exercises } = await supabase
    .from('exercises')
    .select('created_at, kcal')
    .eq('user_id', id)
    .gte('created_at', dayjs().subtract(7, 'days').format('YYYY-MM-DD'))
    .lte('created_at', dayjs().format('YYYY-MM-DD'));

  const { data: weights } = await supabase
    .from('weights')
    .select('created_at, kg')
    .eq('user_id', id)
    .gte('created_at', dayjs().subtract(7, 'days').format('YYYY-MM-DD'))
    .lte('created_at', dayjs().format('YYYY-MM-DD'));

  const { data: water } = await supabase
    .from('water')
    .select('created_at, liter')
    .eq('user_id', id)
    .gte('created_at', dayjs().subtract(7, 'days').format('YYYY-MM-DD'))
    .lte('created_at', dayjs().format('YYYY-MM-DD'));

  if (!meals || !exercises) {
    return notFound();
  }

  const dailyCalorieIntake = getDailyCalorieIntake(profiles![0]);

  return (
    <>
      <Title name={profiles?.find(profile => profile.id === id)?.full_name} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <KcalChart dataset={getKcalDataset(meals, exercises)} />
        </Grid>
        <Grid item xs={12} md={4}>
          <KcalOverview
            dataset={getKcalDataset(meals, exercises)}
            nutritionDataset={getNutritionDataset(meals)}
            dailyCalorieIntake={dailyCalorieIntake}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <WeightChart
            profile={profiles![0]}
            dataset={getWeightDataset(weights, profiles![0].weight)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <WaterChart dataset={getWaterDataset(water)} />
        </Grid>
      </Grid>
    </>
  );
};

export default ClientPage;
