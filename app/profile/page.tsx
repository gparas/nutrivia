import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import Image from 'next/image';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import ChevronIcon from '@mui/icons-material/ChevronRightRounded';
import PersonIcon from '@mui/icons-material/Person';
import FoodIcon from '@mui/icons-material/Fastfood';
import ChartIcon from '@mui/icons-material/BarChart';
import TargetIcon from '@mui/icons-material/GpsFixed';
import Card from '@/components/card';
import { getYearsOld } from '@/lib/utils';
import { Fragment } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const ProfilePage = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: profiles } = await supabase.from('profiles').select();

  if (!profiles?.length) {
    notFound();
  }

  let { data: nutritionists } = await supabase
    .from('nutritionists')
    .select()
    .match({ id: profiles[0].nutritionist_id });

  const { full_name, avatar_url, age, gender } = profiles[0];

  const settings = [
    {
      primary: 'Personal details',
      href: '/profile/details',
      icon: <PersonIcon />,
    },
    {
      primary: 'Macronutrients',
      href: '/profile/macronutrients',
      icon: <ChartIcon />,
    },
    {
      primary: 'Dietary preferences',
      href: '/profile/preferences',
      icon: <FoodIcon />,
    },
    {
      primary: 'Target Goal',
      href: '/profile/goal',
      icon: <TargetIcon />,
    },
  ];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={5}>
        <Card p={0} height="100%">
          <List>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  alt={full_name || undefined}
                  src={avatar_url || undefined}
                />
              </ListItemAvatar>
              <ListItemText
                primary={full_name}
                secondary={`${gender} ${getYearsOld(age)} years`}
              />
            </ListItem>
          </List>
        </Card>
      </Grid>
      <Grid item xs={12} sm={7}>
        <Card p={0} mb={2}>
          <List
            component="div"
            sx={{ '& .MuiDivider-root:last-child': { display: 'none' } }}
          >
            {settings.map(({ primary, icon, href }, index) => {
              return (
                <Fragment key={index}>
                  <ListItemButton component={Link} href={href}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText primary={primary} />
                    <ChevronIcon />
                  </ListItemButton>
                  <Divider variant="inset" component="li" />
                </Fragment>
              );
            })}
          </List>
        </Card>
        {nutritionists?.map(nutritionist => (
          <Card key={nutritionist.id} p={0}>
            <List>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar>
                    <Image
                      alt={nutritionist.name}
                      src={nutritionist.image}
                      priority
                      width={40}
                      height={40}
                    />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Nutritionist"
                  secondary={nutritionist.name}
                />
              </ListItem>
            </List>
          </Card>
        ))}
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
