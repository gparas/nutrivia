import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Card from '@/components/card';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { getYearsOld } from '@/lib/utils';
import { PROFILE } from '@/lib/constants';

const AVATAR_SIZE = 96;

const UserInfo = async ({ user_id }: { user_id: string }) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: profile } = await supabase
    .from('profiles')
    .select()
    .eq('id', user_id)
    .single();

  if (!profile) {
    return null;
  }

  return (
    <Card p={0}>
      <Stack alignItems="center" p={2}>
        <Avatar
          sx={{
            width: AVATAR_SIZE,
            height: AVATAR_SIZE,
            mb: 1,
          }}
        >
          {profile.avatar_url ? (
            <Image
              alt={profile.full_name}
              src={profile.avatar_url}
              priority
              width={AVATAR_SIZE}
              height={AVATAR_SIZE}
            />
          ) : (
            profile.full_name.charAt(0)
          )}
        </Avatar>
        <Typography variant="h5">{profile.full_name}</Typography>
        <Typography variant="body2" color="text.secondary">
          {
            PROFILE.goal.options.find(option => option.value === profile.goal)
              ?.label
          }
        </Typography>
      </Stack>
      <List disablePadding>
        <ListItem>
          <ListItemText
            primary="Gender"
            primaryTypographyProps={{ variant: 'body2' }}
          />
          <Typography variant="body2" fontWeight={500}>
            {profile.gender}
          </Typography>
        </ListItem>
        <Divider light variant="middle" component="li" />
        <ListItem>
          <ListItemText
            primary="Age"
            primaryTypographyProps={{ variant: 'body2' }}
          />
          <Typography variant="body2" fontWeight={500}>
            {getYearsOld(profile.age)} y/o
          </Typography>
        </ListItem>
        <Divider light variant="middle" component="li" />
        <ListItem>
          <ListItemText
            primary="Height"
            primaryTypographyProps={{ variant: 'body2' }}
          />
          <Typography variant="body2" fontWeight={500}>
            {profile.height} cm
          </Typography>
        </ListItem>
        <Divider light variant="middle" component="li" />
        <ListItem>
          <ListItemText
            primary="Initial weight"
            primaryTypographyProps={{ variant: 'body2' }}
          />
          <Typography variant="body2" fontWeight={500}>
            {profile.weight} kg
          </Typography>
        </ListItem>
        <Divider light variant="middle" component="li" />
        <ListItem>
          <ListItemText
            primary="Target weight"
            primaryTypographyProps={{ variant: 'body2' }}
          />
          <Typography variant="body2" fontWeight={500}>
            {profile.target_weight} kg
          </Typography>
        </ListItem>
        <Divider light variant="middle" component="li" />
        <ListItem>
          <ListItemText
            primary="Activity"
            primaryTypographyProps={{ variant: 'body2' }}
          />
          <Typography variant="body2" fontWeight={500}>
            {profile.activity}
          </Typography>
        </ListItem>
      </List>
    </Card>
  );
};

export default UserInfo;
