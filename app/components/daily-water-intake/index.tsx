import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import dayjs from 'dayjs';
import WaterIntakeCard from './water-intake-card';

const DailyWaterIntake = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: water } = await supabase
    .from('water')
    .select()
    .eq('created_at', dayjs().format('YYYY-MM-DD'))
    .single();

  return <WaterIntakeCard water={water} />;
};

export default DailyWaterIntake;
