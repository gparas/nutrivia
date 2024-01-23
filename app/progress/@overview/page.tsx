import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import dayjs from 'dayjs';
import KcalOverview from '@/components/kcal-overview';
import { getKcalDataset, getNutritionDataset } from '@/lib/utils';

const Overview = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('profiles')
    .select()
    .eq('id', user?.id!)
    .single();

  const { data: meals } = await supabase
    .from('meals')
    .select(`created_at, foods (*)`)
    .eq('user_id', user?.id!)
    .order('created_at', { ascending: false })
    .gte('created_at', dayjs().subtract(7, 'days').format('YYYY-MM-DD'))
    .lte('created_at', dayjs().format('YYYY-MM-DD'));

  if (!profile || !meals) {
    return 'no data';
  }
  return (
    <KcalOverview
      profile={profile}
      dataset={getKcalDataset(meals)}
      nutritionDataset={getNutritionDataset(meals)}
    />
  );
};

export default Overview;
