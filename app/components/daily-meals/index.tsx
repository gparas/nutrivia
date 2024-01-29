import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import { Tables } from '@/types/supabase';
import dayjs from 'dayjs';
import { Meals } from '@/types/meals';
import { DAILY_MEALS } from '@/lib/constants';
import MealCard from './meal-card';

const DailyMeals = async ({ profile }: { profile: Tables<'profiles'> }) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: meals } = await supabase
    .from('meals')
    .select(`meal_category,foods (id,name,kcal)`)
    .eq('created_at', dayjs().format('YYYY-MM-DD'));

  return DAILY_MEALS.map(({ id, textPrimary }) => {
    const orderedMeal = meals?.find(meal => meal.meal_category === id);
    const mealPercentage = profile[id as keyof Meals];
    const href = orderedMeal
      ? `/orders/${orderedMeal.foods?.id}?user_id=${user?.id}`
      : `/foods?category=${id}`;
    const recommended = Math.round(
      (profile.kcal_intake! * mealPercentage) / 100,
    );
    const textSecondary: string =
      orderedMeal?.foods?.name ?? `Recommended - ${recommended} kcal`;

    const orderedMealKcal = Number(orderedMeal?.foods?.kcal);
    const orderedMealKcalDiff = recommended - Number(orderedMeal?.foods?.kcal);

    return (
      <MealCard
        key={id}
        category={id}
        href={href}
        textPrimary={textPrimary}
        textSecondary={textSecondary}
        orderedMealKcal={orderedMealKcal}
        orderedMealKcalDiff={orderedMealKcalDiff}
      />
    );
  });
};

export default DailyMeals;
