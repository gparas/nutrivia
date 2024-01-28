import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import dayjs from 'dayjs';
import Card from '@/components/card';
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
    .select(`id, created_at, foods (image,name,category,kcal)`)
    .eq('user_id', user?.id!)
    .eq('created_at', date);

  if (!meals) {
    return <MealsTable rows={[]} />;
  }

  return (
    <>
      <PageTitle mb={3}>
        Meals ordered - {dayjs(date).format('DD MMM')}
      </PageTitle>
      <Card p={1}>
        <MealsTable
          rows={meals.map(meal => ({
            id: meal.id,
            created_at: meal.created_at,
            ...meal.foods,
          }))}
        />
      </Card>
    </>
  );
};

export default FoodsOrderedPage;
