import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import { Tables } from '@/types/supabase';
import dayjs from 'dayjs';
import Link from 'next/link';
import Button from '@mui/material/Button';
import Card from '@/components/card';
import KcalIntake from './kcal-intake';
import NutrientsIntake from './nutrients-intake';

const KcalOverview = async ({ profile }: { profile: Tables<'profiles'> }) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: meals } = await supabase
    .from('meals')
    .select(
      `
    foods (kcal,carbs,fat,protein)`,
    )
    .eq('created_at', dayjs().format('YYYY-MM-DD'));

  const dailyKcalEaten =
    meals?.reduce((acc, cur) => acc + Number(cur.foods?.kcal), 0) || 0;

  const eatenMacros = meals?.map(meal => ({
    carbs: Number(meal.foods?.carbs) || 0,
    protein: Number(meal.foods?.protein) || 0,
    fat: Number(meal.foods?.fat) || 0,
  })) ?? [{ carbs: 0, protein: 0, fat: 0 }];

  return (
    <Card py={3} bgcolor="primary.main" color="primary.contrastText">
      <KcalIntake
        dailyCalorieIntake={profile?.kcal_intake || 0}
        dailyKcalEaten={dailyKcalEaten}
      />
      <NutrientsIntake profile={profile} eatenMacros={eatenMacros} />
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
  );
};

export default KcalOverview;
