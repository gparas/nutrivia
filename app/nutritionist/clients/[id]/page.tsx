import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import { notFound } from 'next/navigation';
import dayjs from 'dayjs';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@/components/card';
import MealsTable from '@/components/meals-table';
import UserInfo from './components/user-info';
import Macronutrients from './components/macronutrients';
import MealsBreakdown from './components/meals-breakdown';
import WeightTrack from '@/components/weight-track';
import WaterIntake from '@/components/water-intake';

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
    .select(`id, created_at, foods (image,name,category,kcal)`)
    .eq('user_id', id)
    .order('created_at', { ascending: false })
    .gte('created_at', dayjs().subtract(7, 'days').format('YYYY-MM-DD'))
    .lte('created_at', dayjs().format('YYYY-MM-DD'));

  const { data: weights } = await supabase
    .from('weights')
    .select()
    .eq('user_id', id);

  const { data: water } = await supabase
    .from('water')
    .select()
    .eq('user_id', id)
    .gte('created_at', dayjs().subtract(7, 'days').format('YYYY-MM-DD'))
    .lte('created_at', dayjs().format('YYYY-MM-DD'));

  if (!meals || !profile) {
    return notFound();
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <UserInfo profile={profile} />
      </Grid>
      <Grid item xs={12} md={8}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Macronutrients profile={profile} height={'100%'} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MealsBreakdown profile={profile} height={'100%'} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <WeightTrack profile={profile} weights={weights} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <WaterIntake water={water} />
          </Grid>
          <Grid item xs={12}>
            <Card p={1}>
              <Typography variant="h6" fontWeight={500} p={1}>
                Meals
              </Typography>
              <MealsTable
                rows={meals.map(meal => ({
                  id: meal.id,
                  created_at: meal.created_at,
                  ...meal.foods,
                }))}
              />
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ClientPage;
