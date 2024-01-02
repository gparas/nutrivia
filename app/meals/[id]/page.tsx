import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import { notFound } from 'next/navigation';
import Container from '@mui/material/Container';
import Card from '@/components/card';
import MealItem from '@/components/mealItem';

const MealPage = async ({ params: { id } }: { params: { id: string } }) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: meals } = await supabase.from('meals').select().match({ id });

  if (!meals?.length) {
    notFound();
  }
  const meal = meals.find(meal => meal.id === id);
  return (
    <Container maxWidth="xs" disableGutters>
      <Card p={0}>
        <MealItem meal={meal} />
      </Card>
    </Container>
  );
};

export default MealPage;
