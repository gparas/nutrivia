import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import dayjs from 'dayjs';
import { notFound } from 'next/navigation';
import Grid from '@mui/material/Grid';
import WeightChart from '@/components/weight-chart';
import WaterChart from '@/components/water-chart';
import MealsTable from '@/components/meals-table';
import UserInfo from '@/components/user-info';
import Macronutrients from '@/components/macronutrients';
import { getWaterDataset } from '@/lib/utils';
import { Meals } from '@/types/meals';
import MealsBreakdown from '@/components/meals-breakdown';

const ClientPage = async ({ params: { id } }: { params: { id: string } }) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: profile } = await supabase
    .from('profiles')
    .select()
    .eq('id', id)
    .single();

  const { data: meals } = await supabase
    .from('meals')
    .select(
      `
    created_at,
    foods (
      id,
      image,
      name,
      category,
      kcal,
      carbs,
      protein,
      fat
    )
  `,
    )
    .eq('user_id', id)
    .order('created_at', { ascending: false })
    .gte('created_at', dayjs().subtract(7, 'days').format('YYYY-MM-DD'))
    .lte('created_at', dayjs().format('YYYY-MM-DD'));

  const { data: weights } = await supabase
    .from('weights')
    .select('created_at, kg')
    .eq('user_id', id)
    .gte('created_at', dayjs().subtract(7, 'days').format('YYYY-MM-DD'))
    .lte('created_at', dayjs().format('YYYY-MM-DD'));

  const { data: water } = await supabase
    .from('water')
    .select('created_at, liter')
    .eq('user_id', id)
    .gte('created_at', dayjs().subtract(7, 'days').format('YYYY-MM-DD'))
    .lte('created_at', dayjs().format('YYYY-MM-DD'));

  if (!meals || !profile) {
    return notFound();
  }

  const dailyCalorieIntake = profile?.kcal_intake || 0;
  const weightsData =
    weights?.map(({ created_at, kg }) => ({ date: created_at, weight: kg })) ||
    [];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <UserInfo profile={profile} />
      </Grid>
      <Grid item xs={12} md={8}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Macronutrients profile={profile} height={'100%'} showEditCta />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MealsBreakdown profile={profile} height={'100%'} showEditCta />
          </Grid>
          <Grid item xs={12} sm={6}>
            <WeightChart profile={profile} weights={weightsData} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <WaterChart dataset={getWaterDataset(water)} />
          </Grid>
          <Grid item xs={12}>
            <MealsTable
              user_id={id}
              meals={meals.map((meal, index) => {
                const status =
                  (dailyCalorieIntake *
                    profile[meal.foods?.category as keyof Meals]) /
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
              })}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ClientPage;
