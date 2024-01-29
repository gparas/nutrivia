import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import dayjs from 'dayjs';
import Typography from '@mui/material/Typography';
import Card from '@/components/card';
import CaloriesOverview from './calories-overview';
import EmptyIcon from '@/components/empty/icon';

const Overview = async ({ user_id }: { user_id: string }) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: meals } = await supabase
    .from('meals')
    .select(`created_at, foods (*)`)
    .eq('user_id', user_id)
    .order('created_at', { ascending: false })
    .gte('created_at', dayjs().subtract(7, 'days').format('YYYY-MM-DD'))
    .lte('created_at', dayjs().format('YYYY-MM-DD'));

  return (
    <Card height={'100%'}>
      <Typography variant="h6" fontWeight={500} mb={2}>
        Overview
      </Typography>
      {meals ? (
        <CaloriesOverview meals={meals.map(meal => meal.foods!)} />
      ) : (
        <EmptyIcon />
      )}
    </Card>
  );
};

export default Overview;
