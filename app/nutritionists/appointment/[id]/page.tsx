import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import { notFound } from 'next/navigation';
import Grid from '@mui/material/Grid';
import Card from '@/components/card';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Image from 'next/image';
import TimeIcon from '@mui/icons-material/AccessTime';
import VideocamIcon from '@mui/icons-material/VideocamOutlined';
import DateTime from './date-time';
import BackButton from '@/components/back-button';
import PageTitle from '@/components/page-title';

const AppointmentPage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data: nutritionist } = await supabase
    .from('nutritionists')
    .select()
    .match({ id })
    .single();

  if (!nutritionist) {
    return notFound();
  }
  return (
    <>
      <BackButton label={<PageTitle>Schedule appointment</PageTitle>} />
      <Card mt={2}>
        <Grid container>
          <Grid item xs={12} md={4}>
            <ListItem
              component="div"
              disableGutters
              disablePadding
              sx={{ gap: 1, mb: 3 }}
            >
              <Avatar sx={{ width: 72, height: 72 }}>
                <Image
                  alt={nutritionist.name}
                  src={nutritionist.image}
                  priority
                  width={72}
                  height={72}
                />
              </Avatar>
              <ListItemText
                primary={nutritionist.name}
                secondary={nutritionist.expertise}
              />
            </ListItem>
            <Typography variant="h6">30 Minutes Meeting</Typography>
            <ListItem component="div" disableGutters sx={{ gap: 1 }}>
              <TimeIcon fontSize="small" color="action" />
              <ListItemText secondary="30 min" />
            </ListItem>
            <ListItem
              component="div"
              disableGutters
              sx={{ gap: 1, alignItems: 'flex-start', mb: 3 }}
            >
              <VideocamIcon fontSize="small" color="action" sx={{ mt: 0.5 }} />
              <ListItemText
                secondary={
                  <>
                    Web conferencing
                    <br />
                    details provided upon confirmation
                  </>
                }
              />
            </ListItem>
          </Grid>
          <Grid item xs={12} md={8}>
            <DateTime nutritionist_id={id} />
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default AppointmentPage;
