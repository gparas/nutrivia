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

  const { data: profiles } = await supabase.from('profiles').select();

  if (profiles?.some(item => !item.nutritionist_id)) {
    redirect('/getStarted');
  }

  const { data: diary } = await supabase
    .from('diary')
    .select(
      `
    id,
    meal_category,
    exercise,
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
      const data = diary?.find(meal => meal.meal_category === id);
      const dailyCalorieIntake = getDailyCalorieIntake(profiles![0]);
      const recommended = Math.round(dailyCalorieIntake * recommendedKcal);
      const orderedKcal = data ? data.meals?.kcal : undefined;
      const orderedKcalDiff = data
        ? recommended - data?.meals?.kcal!
        : undefined;
      return {
        id,
        iconId,
        textPrimary,
        ordered: Boolean(data),
        orderedKcal,
        orderedKcalDiff,
        textSecondary: data
          ? data.meals?.name
          : `Recommended - ${recommended} kcal`,
        href: data
          ? `/meals/${data.meals?.id}?ordered=true`
          : `/meals?category=${id}`,
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
          <DailyCalorieIntake profile={profiles![0]} diary={diary} />
          <DailyNutrientsIntake profile={profiles![0]} diary={diary} />
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={7} lg={8}>
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
