import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import dayjs from 'dayjs';
import WeightTrackCard from './weight-track-card';

const DailyWeightTrack = async () => {
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
    .select('created_at, kg');

  const lastLoggedWeight = weights
    ? weights[weights.length - 1].kg
    : Number(profile?.weight);
  const loggedWeight = weights?.some(
    weight => weight.created_at === dayjs().format('YYYY-MM-DD'),
  );
  return (
    <WeightTrackCard loggedWeight={loggedWeight} initValue={lastLoggedWeight} />
  );
};

export default DailyWeightTrack;
