import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import { notFound } from 'next/navigation';
import Container from '@mui/material/Container';
import Card from '@/components/card';
import BackButton from '@/components/back-button';
import Typography from '@mui/material/Typography';
import LogWeightForm from './form';
import dayjs from 'dayjs';

const LogWeightPage = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return notFound();
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select()
    .eq('id', user?.id)
    .single();

  const { data: weight } = await supabase
    .from('weights')
    .select('kg')
    .eq('created_at', dayjs().format('YYYY-MM-DD'))
    .single();

  return (
    <Container maxWidth="xs" disableGutters>
      <BackButton />
      <Card mt={2}>
        <Typography variant="h5" mb={3}>
          Log Weight
        </Typography>
        <LogWeightForm initValue={weight?.kg || Number(profile?.weight)} />
      </Card>
    </Container>
  );
};

export default LogWeightPage;
