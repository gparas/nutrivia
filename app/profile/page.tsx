import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import { notFound } from 'next/navigation';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Image from 'next/image';
import Card from '@/components/card';
import Typography from '@mui/material/Typography';
import { PROFILE } from '@/lib/constants';
import ProfileForm from './form';

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

  const goal = PROFILE.goal.options.find(
    option => option.value === profile.goal,
  )?.label;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4}>
        <Card alignItems="center" py={6}>
          <Avatar sx={{ width: 96, height: 96, mb: 2 }}>
            <Image
              alt={profile.full_name}
              src={profile.avatar_url!}
              width={96}
              height={96}
              priority
              style={{ objectFit: 'fill' }}
            />
          </Avatar>
          <Typography variant="h6">{profile.full_name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {goal}
          </Typography>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={8}>
        <ProfileForm profile={profile} />
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
