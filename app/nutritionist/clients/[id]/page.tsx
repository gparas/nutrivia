import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import dayjs from 'dayjs';
import { notFound } from 'next/navigation';
import NextLink from 'next/link';
import Grid from '@mui/material/Grid';
import KcalChart from '@/components/kcal-chart';
import WeightChart from '@/components/weight-chart';
import WaterChart from '@/components/water-chart';
import MealsTable from '@/components/meals-table';
import UserInfo from '@/components/user-info';
import BackButton from '@/components/back-button';
import Macronutrients from '@/components/macronutrients';
import { getKcalDataset, getWaterDataset } from '@/lib/utils';
import Button from '@mui/material/Button';
import { Meals } from '@/types/meals';
import Link from 'next/link';

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
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <BackButton />
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={12}>
              <UserInfo profile={profile} />
            </Grid>
            <Grid item xs={12} sm={6} md={12}>
              <Macronutrients profile={profile} height={'100%'}>
                <Button
                  variant="outlined"
                  color="inherit"
                  component={NextLink}
                  href={`macronutrients/${id}`}
                  sx={{ mt: 3, fontWeight: 400 }}
                >
                  Adjust Macronutrients
                </Button>
              </Macronutrients>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <KcalChart
                dataset={getKcalDataset(meals)}
                dailyCalorieIntake={dailyCalorieIntake}
              />
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
                action={
                  <Button
                    variant="outlined"
                    color="inherit"
                    component={Link}
                    href={`adjust-meals/${id}`}
                    sx={{ fontWeight: 400 }}
                  >
                    Adjust Meals
                  </Button>
                }
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
    </>
  );
};

export default ClientPage;
