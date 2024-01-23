import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import dayjs from 'dayjs';
import WeightChart from '@/components/weight-chart';

const Weight = async () => {
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

  const { data: weights } = await supabase
    .from('weights')
    .select('created_at, kg')
    .eq('user_id', user?.id!)
    .gte('created_at', dayjs().subtract(7, 'days').format('YYYY-MM-DD'))
    .lte('created_at', dayjs().format('YYYY-MM-DD'));

  if (!profile) {
    return 'no data';
  }

  const weightsData =
    weights?.map(({ created_at, kg }) => ({ date: created_at, weight: kg })) ||
    [];
  return <WeightChart profile={profile} weights={weightsData} />;
};

export default Weight;
