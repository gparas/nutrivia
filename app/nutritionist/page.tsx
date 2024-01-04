import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';

const NutritionistPage = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: profiles } = await supabase.from('profiles').select();

  console.log(profiles);

  return <div>NutritionistPage</div>;
};

export default NutritionistPage;
