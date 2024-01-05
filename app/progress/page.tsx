import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import dayjs from 'dayjs';
import { notFound } from 'next/navigation';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import KcalChart from './kcal-chart';
import Typography from '@mui/material/Typography';
import PageTitle from '@/components/page-title';
import { getDailyCalorieIntake, groupBy } from '@/lib/utils';
import KcalOverview from './kcal-overview';

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

  const mealsGroup = groupBy(meals, i => i.created_at);
  const exercisesGroup = groupBy(exercises, i => i.created_at);
  const dailyCalorieIntake = getDailyCalorieIntake(profiles![0]);

  const days = [];
  for (let i = 0; i < 7; i++) {
    days.push(dayjs().subtract(i, 'days').format('YYYY-MM-DD'));
  }

  const kcalDataset = days.reverse().map(day => {
    const mealsData = Object.keys(mealsGroup).find(key => key === day);
    const exercisesData = Object.keys(exercisesGroup).find(key => key === day);
    return {
      eaten: mealsData
        ? Math.ceil(
            mealsGroup[mealsData].reduce(
              (acc, cur) => acc + Number(cur.foods?.kcal),
              0,
            ),
          )
        : 0,
      burned: exercisesData
        ? Math.ceil(
            exercisesGroup[exercisesData].reduce(
              (acc, cur) => acc + Number(cur.kcal),
              0,
            ),
          )
        : 0,
      date: dayjs(day).format('YYYY-MM-DD'),
    };
  });

  const nutritionDataset = [
    {
      id: 'carbs',
      label: 'carbs',
      value: Math.round(
        meals.reduce((acc, cur) => acc + cur.foods?.carbs!, 0) / meals.length,
      ),
    },
    {
      id: 'protein',
      label: 'protein',
      value: Math.round(
        meals.reduce((acc, cur) => acc + cur.foods?.protein!, 0) / meals.length,
      ),
    },
    {
      id: 'fat',
      label: 'fat',
      value: Math.round(
        meals.reduce((acc, cur) => acc + cur.foods?.fat!, 0) / meals.length,
      ),
    },
  ];

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
          <KcalChart dataset={kcalDataset} />
        </Grid>
        <Grid item xs={12} md={4}>
          <KcalOverview
            dataset={kcalDataset}
            nutritionDataset={nutritionDataset}
            dailyCalorieIntake={dailyCalorieIntake}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ProgressPage;
