import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import dayjs from 'dayjs';
import { notFound } from 'next/navigation';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import KcalChart from './kcal-chart';
import Typography from '@mui/material/Typography';
import PageTitle from '@/components/page-title';
import { getDailyCalorieIntake } from '@/lib/utils';
import KcalOverview from './kcal-overview';
import { getNutritionDataset, getKcalDataset } from './utils';

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
      </Grid>
    </>
  );
};

export default ProgressPage;
