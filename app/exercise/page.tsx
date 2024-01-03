import { Fragment } from 'react';
import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Card from '@/components/card';
import dayjs from 'dayjs';
import Typography from '@mui/material/Typography';
import SportsIcon from '@mui/icons-material/SportsGymnasticsRounded';
import BackButton from '@/components/back-button';
import Form from './form';

const ExercisePage = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: exercises } = await supabase
    .from('exercises')
    .select()
    .eq('created_at', dayjs().format('YYYY-MM-DD'))
    .eq('user_id', user?.id!);

  return (
    <Container maxWidth="xs" disableGutters>
      <BackButton />
      <Card p={0} mb={2}>
        <Form />
      </Card>
      <Card p={0}>
        <Typography variant="h6" p={2}>
          Activities
        </Typography>
        {exercises && exercises.length ? (
          <List
            disablePadding
            sx={{ '& .MuiDivider-root:last-child': { display: 'none' } }}
          >
            {exercises.map(exercise => (
              <Fragment key={exercise.id}>
                <ListItem>
                  <ListItemText
                    primary={exercise.title}
                    secondary={`${exercise.kcal} kcal`}
                  />
                </ListItem>
                <Divider component="li" variant="middle" light />
              </Fragment>
            ))}
          </List>
        ) : (
          <Stack p={2} alignItems="center">
            <SportsIcon color="action" sx={{ fontSize: 80 }} />
            <Typography variant="body2" mb={1}>
              No activity found
            </Typography>
          </Stack>
        )}
      </Card>
    </Container>
  );
};

export default ExercisePage;
