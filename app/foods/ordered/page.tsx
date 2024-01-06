import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import dayjs from 'dayjs';
import MealsTable from '@/components/meals-table';
import PageTitle from '@/components/page-title';

const FoodsOrderedPage = async ({
  searchParams,
}: {
  searchParams: { date: string | undefined };
}) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const date = searchParams?.date || dayjs().format('YYYY-MM-DD');

  const {
    data: { user },
  } = await supabase.auth.getUser();

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
    .eq('user_id', user?.id!)
    .eq('created_at', date);

  if (!meals) {
    return <MealsTable meals={[]} />;
  }

  return (
    <>
      <PageTitle mb={3}>
        Meals ordered - {dayjs(date).format('DD MMM')}
      </PageTitle>
      <MealsTable
        user_id={user?.id}
        meals={meals.map((meal, index) => {
          return {
            id: index,
            meal_id: meal.foods?.id,
            image: meal.foods?.image,
            name: meal.foods?.name,
            category: meal.foods?.category,
            kcal: meal.foods?.kcal,
            carbs: meal.foods?.carbs,
            protein: meal.foods?.protein,
            fat: meal.foods?.fat,
          };
        })}
      />
    </>
  );
};

export default FoodsOrderedPage;
