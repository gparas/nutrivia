import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import EmptyState from '@/components/empty';
import FoodCard from './components/food-card';
import Grid from '@mui/material/Grid';

type Props = {
  searchParams?: {
    category?: string;
    kcal?: string;
  };
};

const FoodsPage = async ({ searchParams }: Props) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  let query = supabase
    .from('foods')
    .select()
    .order('created_at', { ascending: false });

  if (searchParams?.category) {
    query = query.eq('category', searchParams.category);
  }
  if (searchParams?.kcal) {
    query = query.lte('kcal', Number(searchParams.kcal));
  }

  const { data: foods } = await query;

  if (!foods?.length) {
    return <EmptyState />;
  }

  return (
    <Grid container spacing={2}>
      {foods.map(food => {
        return (
          <Grid key={food.id} item xs={12} sm={6} md={4}>
            <FoodCard key={food.id} food={food} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default FoodsPage;
