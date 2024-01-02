import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import { redirect } from 'next/navigation';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import DailyCalorieIntake from '@/components/dailyCalorieIntake';
import DailyNutrientsIntake from '@/components/dailyNutrientsIntake';
import ListItem from '@/components/listItem';
import { DAILY_MEALS, DAILY_EXTRAS } from '@/lib/constants';
import dayjs from 'dayjs';
import { getDailyCalorieIntake } from '@/lib/utils';
import Card from '@/components/card';

const HomePage = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profiles } = await supabase.from('profiles').select();

  if (profiles?.some(item => !item.nutritionist_id)) {
    redirect('/getStarted');
  }

  const { data: meals } = await supabase
    .from('meals')
    .select(
      `
    id,
    meal_category,
    foods (
      id,
      name,
      kcal,
      carbs,
      fat,
      protein
    )
  `,
    )
    .eq('created_at', dayjs().format('YYYY-MM-DD'));

  const { data: exercises } = await supabase
    .from('exercises')
    .select()
    .eq('created_at', dayjs().format('YYYY-MM-DD'))
    .eq('user_id', user?.id!);

  const dailyCalorieIntake = getDailyCalorieIntake(profiles![0]);
  const dailyKcalBurned =
    exercises?.reduce((acc, cur) => acc + Number(cur.kcal), 0) || 0;
  const dailyKcalEaten =
    meals?.reduce((acc, cur) => acc + Number(cur.foods?.kcal), 0) || 0;

  const totalDailyCalorieIntake = dailyCalorieIntake + dailyKcalBurned;

  const dailyMeals = DAILY_MEALS.map(
    ({ id, iconId, textPrimary, recommendedKcal }) => {
      const data = meals?.find(meal => meal.meal_category === id);
      const recommended = Math.round(totalDailyCalorieIntake * recommendedKcal);
      const orderedKcal = data ? data.foods?.kcal : undefined;
      const orderedKcalDiff = data
        ? recommended - data?.foods?.kcal!
        : undefined;
      return {
        id,
        iconId,
        textPrimary,
        ordered: Boolean(data),
        orderedKcal,
        orderedKcalDiff,
        textSecondary: data
          ? data.foods?.name
          : `Recommended - ${recommended} kcal`,
        href: data ? `/foods/${data.foods?.id}` : `/foods?category=${id}`,
        scroll: false,
      };
    },
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={5} lg={4}>
        <Card
          py={3}
          top={64}
          position="sticky"
          bgcolor="primary.main"
          color="primary.contrastText"
        >
          <DailyCalorieIntake
            dailyCalorieIntake={dailyCalorieIntake}
            dailyKcalBurned={dailyKcalBurned}
            dailyKcalEaten={dailyKcalEaten}
          />
          <DailyNutrientsIntake
            meals={meals}
            totalDailyCalorieIntake={totalDailyCalorieIntake}
          />
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={7} lg={8}>
        <Stack spacing={2}>
          {dailyMeals.map(meal => (
            <ListItem key={meal.id} {...meal} />
          ))}
          <ListItem {...DAILY_EXTRAS.WATER} />
          <ListItem
            textSecondary={`Daily exercise - ${exercises?.reduce(
              (acc, cur) => acc + Number(cur.kcal),
              0,
            )} kcal`}
            {...DAILY_EXTRAS.EXERCISE}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default HomePage;
