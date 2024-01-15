import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import { redirect } from 'next/navigation';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import DailyNutrientsIntake from '@/components/dailyNutrientsIntake';
import ListItem from '@/components/listItem';
import { DAILY_MEALS, DAILY_EXTRAS } from '@/lib/constants';
import dayjs from 'dayjs';
import Card from '@/components/card';
import HomeKcalChart from '@/components/home-kcal-chart';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { Meals } from '@/types/meals';

const HomePage = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select()
    .eq('id', session.user.id)
    .single();

  if (!profile?.kcal_intake) {
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

  const { data: water } = await supabase
    .from('water')
    .select('liter')
    .eq('created_at', dayjs().format('YYYY-MM-DD'))
    .single();

  const { data: weight } = await supabase
    .from('weights')
    .select('kg')
    .eq('created_at', dayjs().format('YYYY-MM-DD'))
    .single();

  const { kcal_intake } = profile;

  const dailyKcalEaten =
    meals?.reduce((acc, cur) => acc + Number(cur.foods?.kcal), 0) || 0;

  const dailyMeals = DAILY_MEALS.map(({ id, iconId, textPrimary }) => {
    const data = meals?.find(meal => meal.meal_category === id);
    const mealPercentage = profile[id as keyof Meals];
    const recommended = Math.round((kcal_intake * mealPercentage) / 100);
    const orderedKcal = data ? data.foods?.kcal : undefined;
    const orderedKcalDiff = data ? recommended - data?.foods?.kcal! : undefined;
    return {
      id,
      iconId,
      textPrimary,
      added: Boolean(data),
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
  });

  return (
    <Box
      display="grid"
      gap={2}
      gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
      alignItems="flex-start"
    >
      <Card py={3} bgcolor="#7c3aed" color="white">
        <HomeKcalChart
          dailyKcalEaten={dailyKcalEaten}
          dailyCalorieIntake={kcal_intake}
        />
        <DailyNutrientsIntake meals={meals} profile={profile} />
        <Button
          variant="text"
          color="inherit"
          size="small"
          component={Link}
          href="/progress"
          sx={{ fontWeight: 500, bottom: -16 }}
        >
          progress
        </Button>
      </Card>
      <Stack spacing={2}>
        {dailyMeals.map(meal => (
          <ListItem key={meal.id} {...meal} />
        ))}
        <ListItem
          textPrimary="Water"
          iconId="water"
          textSecondary={
            water ? `${water.liter}L intake` : 'Daily water intake'
          }
          href="/water-intake"
          added={Boolean(water)}
        />
        <ListItem
          textPrimary="Weight"
          iconId="diet"
          href="/log-weight"
          textSecondary="Log weight"
          added={Boolean(weight)}
        />
      </Stack>
    </Box>
  );
};

export default HomePage;
