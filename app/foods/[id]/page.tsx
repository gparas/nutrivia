import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import Container from '@mui/material/Container';
import Card from '@/components/card';
import FoodItem from '@/components/foodIten';
import EmptyState from '@/components/empty';

const MealPage = async ({ params: { id } }: { params: { id: string } }) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: foods } = await supabase.from('foods').select().match({ id });

  if (!foods?.length) {
    <EmptyState />;
  }
  const food = foods?.find(food => food.id === id);
  return (
    <Container maxWidth="xs" disableGutters>
      <Card p={0}>
        <FoodItem food={food} />
      </Card>
    </Container>
  );
};

export default MealPage;
