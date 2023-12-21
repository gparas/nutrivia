import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import MealItem from '@/components/mealItem';
import Dialog from './dialog';
import Close from './close';

interface Props {
  params: { id: string };
  searchParams: { ordered: boolean };
}

const MealDialog = async ({
  params: { id },
  searchParams: { ordered },
}: Props) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: meals, error } = await supabase
    .from('meals')
    .select()
    .match({ id });

  const meal = meals?.find(meal => meal.id === id);
  return (
    <Dialog maxWidth="xs" open={Boolean(meal)}>
      <Close />
      <MealItem meal={meal} ordered={ordered} />
    </Dialog>
  );
};

export default MealDialog;
