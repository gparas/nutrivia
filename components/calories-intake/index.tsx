import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import dayjs from 'dayjs';
import Typography from '@mui/material/Typography';
import Card from '@/components/card';
import CaloriesChart from './chart';
import { getKcalDataset } from './utils';

const CaloriesIntake = async ({ user_id }: { user_id: string }) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: profile } = await supabase
    .from('profiles')
    .select()
    .eq('id', user_id)
    .single();

  const { data: meals } = await supabase
    .from('meals')
    .select(`created_at, foods (*)`)
    .eq('user_id', user_id)
    .order('created_at', { ascending: false })
    .gte('created_at', dayjs().subtract(7, 'days').format('YYYY-MM-DD'))
    .lte('created_at', dayjs().format('YYYY-MM-DD'));

  const dailyCalorieIntake = profile?.kcal_intake || 0;

  return (
    <Card>
      <Typography variant="h6">Calories</Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Goal {dailyCalorieIntake} kcal / day
      </Typography>
      <CaloriesChart
        dailyCalorieIntake={dailyCalorieIntake}
        dataset={getKcalDataset(meals || [])}
      />
    </Card>
  );
};

export default CaloriesIntake;
