import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
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
import { PROFILE } from '@/lib/constants';

const ProfilePage = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profiles } = await supabase
    .from('profiles')
    .select()
    .eq('id', user?.id!);

  if (!profiles?.length) {
    notFound();
  }

  let { data: nutritionists } = await supabase
    .from('nutritionists')
    .select()
    .match({ id: profiles[0].nutritionist_id });

  const { full_name, avatar_url, age, gender, goal, weight, food_preference } =
    profiles[0];

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
    <Box
      display="grid"
      gap={2}
      gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
      alignItems="flex-start"
    >
      <Card p={0}>
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
          <Divider light component="li" variant="middle" sx={{ mb: 1 }} />
          <ListItem>
            <Typography variant="body2" flex="1 1 auto">
              Current weight
            </Typography>
            <Typography variant="body2" fontWeight={500}>
              {weight} kg
            </Typography>
          </ListItem>
          <ListItem>
            <Typography variant="body2" flex="1 1 auto">
              Goal
            </Typography>
            <Typography variant="body2" fontWeight={500}>
              {
                PROFILE.goal.options.find(option => option.value === goal)
                  ?.label
              }
            </Typography>
          </ListItem>
          {food_preference && (
            <ListItem>
              <Typography variant="body2" flex="1 1 auto">
                Dietary Preference
              </Typography>
              <Typography variant="body2" fontWeight={500}>
                {
                  PROFILE.food_preference.options.find(
                    option => option.value === food_preference,
                  )?.label
                }
              </Typography>
            </ListItem>
          )}
        </List>
      </Card>
      <Stack spacing={2}>
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
      </Stack>
    </Box>
  );
};

export default ProfilePage;
