import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import dayjs from 'dayjs';
import WaterChart from '@/components/water-chart';
import { getWaterDataset } from '@/lib/utils';

const Water = async () => {
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

  const { data: water } = await supabase
    .from('water')
    .select('created_at, liter')
    .eq('user_id', user?.id!)
    .gte('created_at', dayjs().subtract(7, 'days').format('YYYY-MM-DD'))
    .lte('created_at', dayjs().format('YYYY-MM-DD'));

  if (!profile) {
    return 'no data';
  }
  return <WaterChart dataset={getWaterDataset(water)} />;
};

export default Water;
