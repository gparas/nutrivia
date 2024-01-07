import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import { redirect } from 'next/navigation';
import Box from '@mui/material/Box';
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

  const { data: profiles } = await supabase
    .from('profiles')
    .select()
    .eq('id', session.user.id);

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
    .eq('id', session.user.id);

  const dailyCalorieIntake = getDailyCalorieIntake(profiles![0]);

  const dailyKcalBurned =
    exercises?.reduce((acc, cur) => acc + Number(cur.kcal), 0) || 0;
  const dailyKcalEaten =
    meals?.reduce((acc, cur) => acc + Number(cur.foods?.kcal), 0) || 0;

  const totalDailyCalorieIntake = dailyCalorieIntake + dailyKcalBurned;

  const dailyMeals = DAILY_MEALS.map(
    ({ id, iconId, textPrimary, recommendedKcal }) => {
      const data = meals?.find(meal => meal.meal_category === id);
      const recommended = Math.round(dailyCalorieIntake * recommendedKcal);
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
        href: data
          ? `/foods/ordered/${data.foods?.id}?user_id=${session.user.id}`
          : `/foods?category=${id}`,
        scroll: false,
      };
    },
  );

  return (
    <Box
      display="grid"
      gap={2}
      gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
      alignItems="flex-start"
    >
      <Card py={3} bgcolor="primary.main" color="primary.contrastText">
        <div>
          <DailyCalorieIntake
            dailyCalorieIntake={dailyCalorieIntake}
            dailyKcalBurned={dailyKcalBurned}
            dailyKcalEaten={dailyKcalEaten}
          />
          <DailyNutrientsIntake
            meals={meals}
            totalDailyCalorieIntake={totalDailyCalorieIntake}
          />
        </div>
      </Card>
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
    </Box>
  );
};

export default HomePage;
