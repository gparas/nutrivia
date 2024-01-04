import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import { redirect } from 'next/navigation';
import NextLink from 'next/link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ArrowNext from '@mui/icons-material/ArrowForwardRounded';
import Container from '@mui/material/Container';

const GetStartedPage = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  const { data: profiles } = await supabase
    .from('profiles')
    .select()
    .eq('id', session.user.id);

  if (profiles?.some(item => item.nutritionist_id)) {
    redirect('/');
  }

  return (
    <Container
      maxWidth="xs"
      sx={{
        flex: '1 1 auto',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Stack
        spacing={3}
        sx={{
          flex: '1 1 auto',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography component="h1" variant="h4" fontWeight={700} align="center">
          Healthy Eating Made Easy.
        </Typography>
        <Typography fontWeight="regular" align="center">
          Get your meals tailored to your fitness goals
        </Typography>
        <Button
          variant="contained"
          size="large"
          endIcon={<ArrowNext />}
          component={NextLink}
          href="/getStarted/profile"
          sx={{ px: 3, py: 1.5, fontSize: 16 }}
        >
          Get started
        </Button>
      </Stack>
    </Container>
  );
};

export default GetStartedPage;
