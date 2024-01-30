import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import dayjs from 'dayjs';
import Table from './table';
import Card from '../card';
import Typography from '@mui/material/Typography';

const MealsTable = async ({ user_id }: { user_id: string }) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: meals } = await supabase
    .from('meals')
    .select(`id, created_at, foods (id,image,name,category,kcal)`)
    .eq('user_id', user_id)
    .order('created_at', { ascending: false })
    .gte('created_at', dayjs().subtract(7, 'days').format('YYYY-MM-DD'))
    .lte('created_at', dayjs().format('YYYY-MM-DD'));

  return (
    <Card p={1}>
      <Typography variant="h6" fontWeight={500} p={1}>
        Meals
      </Typography>
      <Table
        rows={
          meals?.map(meal => ({
            id: meal.id,
            user_id: user_id,
            meal_id: meal.foods?.id,
            created_at: meal.created_at,
            ...meal.foods,
          })) || []
        }
      />
    </Card>
  );
};

export default MealsTable;
