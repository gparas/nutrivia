import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import { redirect } from 'next/navigation';
import Stack from '@mui/material/Stack';
import DailyNutrientsIntake from '@/components/dailyNutrientsIntake';
import ListItem from '@/components/listItem';
import { DAILY_MEALS } from '@/lib/constants';
import dayjs from 'dayjs';
import Card from '@/components/card';
import HomeKcalChart from '@/components/home-kcal-chart';
import Button from '@mui/material/Button';
import Link from 'next/link';
import { Meals } from '@/types/meals';
import { getEatenMacros } from '@/lib/utils';
import Grid from '@mui/material/Grid';
import NutritionistAlert from '@/components/nutritionist-alert';
import Chat from './chat';

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
    .select(`*, nutritionists(id, name, image)`)
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
    const orderedKcal = data ? Number(data.foods?.kcal) : undefined;
    const orderedKcalDiff = data
      ? recommended - Number(data?.foods?.kcal)!
      : undefined;
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
        ? `/orders/${data.foods?.id}?user_id=${session.user.id}`
        : `/foods?category=${id}`,
      scroll: false,
    };
  });

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Card py={3} bgcolor="primary.main" color="primary.contrastText">
            <HomeKcalChart
              dailyKcalEaten={dailyKcalEaten}
              dailyCalorieIntake={kcal_intake}
            />
            <DailyNutrientsIntake
              profile={profile}
              eatenMacros={getEatenMacros(meals)}
            />
            <Button
              variant="text"
              color="inherit"
              size="small"
              component={Link}
              href="/profile/progress"
              sx={{ fontWeight: 500, bottom: -16 }}
            >
              progress
            </Button>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack spacing={2}>
            <NutritionistAlert nutritionist_id={profile.nutritionist_id} />
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
        </Grid>
      </Grid>
      <Chat nutrionist={profile.nutritionists} />
    </>
  );
};

export default HomePage;
