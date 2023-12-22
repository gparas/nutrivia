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

const HomePage = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  const { data: profiles } = await supabase.from('profiles').select();

  if (profiles?.some(item => !item.nutritionist_id)) {
    redirect('/getStarted');
  }

  const { data: diaryWithMeals, error } = await supabase
    .from('diary')
    .select(
      `
    id,
    meal_category,
    meals (
      id,
      name,
      kcal,
      carbs,
      fat,
      protein
    )
  `,
    )
    .gt('date', dayjs().startOf('date').format())
    .lt('date', dayjs().endOf('date').format());

  const dailyMeals = DAILY_MEALS.map(
    ({ id, iconId, textPrimary, recommendedKcal }) => {
      const data = diaryWithMeals?.find(meal => meal.meal_category === id);
      const dailyCalorieIntake = getDailyCalorieIntake(profiles![0]);
      return {
        id,
        iconId,
        textPrimary,
        textSecondary: data
          ? `${data.meals?.name} - ${data.meals?.kcal} kcal`
          : `Recommended - ${Math.round(
              dailyCalorieIntake * recommendedKcal,
            )} kcal`,
        href: data
          ? `/meals/${data.meals?.id}?ordered=true`
          : `/meals?category=${id}`,
        scroll: false,
      };
    },
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={5} md={4} lg={3}>
        <Stack spacing={2} position="sticky" top={64}>
          <DailyCalorieIntake
            profile={profiles![0]}
            diaryWithMeals={diaryWithMeals}
          />
          <DailyNutrientsIntake
            profile={profiles![0]}
            diaryWithMeals={diaryWithMeals}
          />
        </Stack>
      </Grid>
      <Grid item xs={12} sm={7} md={8} lg={9}>
        <Stack spacing={2}>
          {dailyMeals.map(meal => (
            <ListItem key={meal.id} {...meal} />
          ))}
          {DAILY_EXTRAS.map(extra => (
            <ListItem key={extra.id} {...extra} />
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default HomePage;
