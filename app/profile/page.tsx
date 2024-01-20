import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import UserInfo from '@/components/user-info';
import Macronutrients from '@/components/macronutrients';
import PageTitle from '@/components/page-title';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Card from '@/components/card';
import NutritionistAvatar from './nutritionist-avatar';

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

  const { data: nutritionist } = await supabase
    .from('nutritionists')
    .select()
    .eq('id', profile?.nutritionist_id || '')
    .single();

  if (!profile) {
    notFound();
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <PageTitle>Profile</PageTitle>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <UserInfo profile={profile}>
          <Box p={2}>
            <Button
              fullWidth
              variant="outlined"
              color="inherit"
              component={Link}
              href="profile/edit"
              sx={{ fontWeight: 400 }}
            >
              Edit Profile
            </Button>
          </Box>
        </UserInfo>
        {nutritionist && (
          <Card p={0} mt={2}>
            <ListItemButton component={Link} href="profile/chat">
              <NutritionistAvatar nutritionist={nutritionist} size={48} />
              <ListItemText
                sx={{ ml: 2 }}
                primary={nutritionist.name}
                secondary="Chat online"
              />
              <ArrowRightIcon />
            </ListItemButton>
          </Card>
        )}
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <Macronutrients height={'100%'} profile={profile} />
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
