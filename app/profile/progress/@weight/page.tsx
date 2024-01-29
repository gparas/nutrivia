import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import WeightTrack from '@/components/weight-track';

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
    .select()
    .eq('user_id', user?.id!);

  if (!profile) {
    return 'no data';
  }

  return <WeightTrack profile={profile} weights={weights} />;
};

export default Weight;
