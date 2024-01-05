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
import {
  getDailyCalorieIntake,
  getKcalDataset,
  getNutritionDataset,
  getWeightDataset,
} from '@/lib/utils';

const ProgressPage = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profiles } = await supabase
    .from('profiles')
    .select()
    .eq('id', user?.id!);

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
    .eq('user_id', user?.id!)
    .gte('created_at', dayjs().subtract(7, 'days').format('YYYY-MM-DD'))
    .lte('created_at', dayjs().format('YYYY-MM-DD'));

  const { data: exercises } = await supabase
    .from('exercises')
    .select('created_at, kcal')
    .eq('user_id', user?.id!)
    .gte('created_at', dayjs().subtract(7, 'days').format('YYYY-MM-DD'))
    .lte('created_at', dayjs().format('YYYY-MM-DD'));

  const { data: weights } = await supabase
    .from('weights')
    .select('created_at, kg')
    .eq('user_id', user?.id!)
    .gte('created_at', dayjs().subtract(7, 'days').format('YYYY-MM-DD'))
    .lte('created_at', dayjs().format('YYYY-MM-DD'));

  if (!meals || !exercises) {
    return notFound();
  }

  const dailyCalorieIntake = getDailyCalorieIntake(profiles![0]);

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
      </Grid>
    </>
  );
};

export default ProgressPage;
