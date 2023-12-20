import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import { redirect } from 'next/navigation';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import DailyCalorieIntake from '@/components/dailyCalorieIntake';
import DailyNutrientsIntake from '@/components/dailyNutrientsIntake';

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

  if (profiles?.some(item => !item.goal)) {
    redirect('/getStarted');
  }

  const { data: diaryWithMeals, error } = await supabase.from('diary').select(
    `
    date,
    meal_category,
    meals (
      kcal,
      carbs,
      fat,
      protein
    )
  `,
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
        meals
      </Grid>
    </Grid>
  );
};

export default HomePage;
