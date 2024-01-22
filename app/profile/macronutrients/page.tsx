import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import { notFound } from 'next/navigation';
import Macronutrients from '@/components/macronutrients';
import Container from '@mui/material/Container';

const MacronutrientsPage = async () => {
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

  if (!profile) {
    notFound();
  }
  return (
    <Container maxWidth="xs" disableGutters sx={{ flex: '1 1 auto' }}>
      <Macronutrients height={'100%'} profile={profile} />
    </Container>
  );
};

export default MacronutrientsPage;
