import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import Grid from '@mui/material/Grid';
import EmptyState from '@/components/empty';
import FoodCard from '../components/food-card';

type Props = {
  searchParams?: {
    category?: string;
  };
};

const Recommended = async ({ searchParams }: Props) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let query = supabase
    .from('meals_plan')
    .select(`id,category,foods (*)`)
    .eq('user_id', user?.id!);

  if (searchParams?.category) {
    query = query.eq('category', searchParams.category);
  }

  const { data: meals } = await query;

  if (!meals?.length) {
    return <EmptyState />;
  }

  return (
    <Grid container spacing={2}>
      {meals?.map(meal => (
        <Grid key={meal.id} item xs={12} sm={6} md={4}>
          <FoodCard food={meal.foods!} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Recommended;
