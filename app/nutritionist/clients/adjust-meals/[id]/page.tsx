import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import { notFound } from 'next/navigation';
import Container from '@mui/material/Container';
import Card from '@/components/card';
import BackButton from '@/components/back-button';
import AdjustMealsForm from './form';

const AdjustMealspage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: profile } = await supabase
    .from('profiles')
    .select()
    .eq('id', id)
    .single();

  if (!profile) {
    return notFound();
  }
  return (
    <Container maxWidth="xs" disableGutters>
      <BackButton />
      <Card mt={2}>
        <AdjustMealsForm {...profile} />
      </Card>
    </Container>
  );
};

export default AdjustMealspage;
