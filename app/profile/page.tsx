import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import UserInfo from '@/components/user-info';
import Macronutrients from '@/components/macronutrients';

const ProfilePage = async () => {
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

  let { data: nutritionist } = await supabase
    .from('nutritionists')
    .select()
    .match({ id: profile.nutritionist_id })
    .single();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={5}>
        <UserInfo profile={profile}>
          <Box color="text.secondary" p={2}>
            <Button
              fullWidth
              variant="outlined"
              color="inherit"
              component={Link}
              href="/profile/edit"
            >
              Edit
            </Button>
          </Box>
        </UserInfo>
      </Grid>
      <Grid item xs={12} sm={6} md={7}>
        <Macronutrients height={'100%'} profile={profile} />
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
