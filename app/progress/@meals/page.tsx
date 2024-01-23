import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import dayjs from 'dayjs';
import MealsTable from '@/components/meals-table';

type Meals = {
  breakfast: number;
  lunch: number;
  dinner: number;
  snack: number;
};

const Meals = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('profiles')
    .select()
    .eq('id', user?.id!)
    .single();

  const { data: meals } = await supabase
    .from('meals')
    .select(`created_at, foods (*)`)
    .eq('user_id', user?.id!)
    .order('created_at', { ascending: false })
    .gte('created_at', dayjs().subtract(7, 'days').format('YYYY-MM-DD'))
    .lte('created_at', dayjs().format('YYYY-MM-DD'));

  if (!profile) {
    return 'no data';
  }

  const dailyCalorieIntake = profile?.kcal_intake || 0;

  const mealsData = meals
    ? meals.map((meal, index) => {
        const status =
          (dailyCalorieIntake * profile[meal.foods?.category as keyof Meals]) /
          100;
        return {
          id: index,
          meal_id: meal.foods?.id,
          image: meal.foods?.image,
          name: meal.foods?.name,
          category: meal.foods?.category,
          kcal: meal.foods?.kcal,
          date: meal.created_at,
          status: Math.round(status),
        };
      })
    : [];

  return <MealsTable user_id={user?.id} meals={mealsData} />;
};

export default Meals;
