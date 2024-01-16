import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import { notFound } from 'next/navigation';
import NextLink from 'next/link';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import TrophyIcon from '@mui/icons-material/EmojiEventsOutlined';
import Card from '@/components/card';
import PageTitle from '@/components/page-title';
import { PROFILE } from '@/lib/constants';
import { getYearsOld } from '@/lib/utils';
import BackButton from '@/components/back-button';

const ClientsPage = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: profiles } = await supabase.from('profiles').select();

  if (!profiles?.length) {
    notFound();
  }
  return (
    <>
      <BackButton label={<PageTitle>Clients</PageTitle>} />
      <Box
        display="grid"
        gap={2}
        mt={2}
        gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
      >
        {profiles.map(profile => (
          <Card key={profile.id} p={0}>
            <List>
              <ListItem>
                <ListItemAvatar sx={{ minWidth: 64 }}>
                  <Avatar
                    alt={profile.full_name}
                    src={profile.avatar_url || ''}
                    sx={{ width: 48, height: 48 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={profile.full_name}
                  secondary={
                    <>
                      {getYearsOld(profile.age)}years &bull; {profile.height}
                      cm &bull; {profile.weight}kg
                    </>
                  }
                />
              </ListItem>
            </List>
            <Divider light />
            <Stack direction="row" alignItems="center" p={1}>
              <Stack
                direction="row"
                alignItems="center"
                spacing={0.5}
                px={1}
                flex="1 1 auto"
              >
                <TrophyIcon color="action" fontSize="small" />
                <Typography variant="body2">
                  {
                    PROFILE.goal.options.find(
                      option => option.value === profile.goal,
                    )?.label
                  }
                </Typography>
              </Stack>
              <Button
                color="secondary"
                sx={{ fontWeight: 500 }}
                component={NextLink}
                href={`/nutritionist/clients/${profile.id}`}
              >
                View profile
              </Button>
            </Stack>
          </Card>
        ))}
      </Box>
    </>
  );
};

export default ClientsPage;
