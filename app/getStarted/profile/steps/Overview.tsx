'use client';

import { useFormStatus } from 'react-dom';
import Title from '../components/Title';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ChartIcon from '@mui/icons-material/BarChartRounded';
import FireIcon from '@mui/icons-material/LocalFireDepartment';
import DrinkIcon from '@mui/icons-material/LocalDrinkRounded';
import CircularProgress from '@mui/material/CircularProgress';
import { useFormContext } from '../components/FormContext';
import { getOverviewTitle, getGoalText, dailyCalorieIntake } from './utils';
import { updateProfile } from './actions';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      variant="contained"
      fullWidth
      size="large"
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      endIcon={pending && <CircularProgress size={20} color="inherit" />}
    >
      Start
    </Button>
  );
}

const Overview = () => {
  const { data, onHandleBack } = useFormContext();
  const updateProfileWithdata = updateProfile.bind(null, data);

  return (
    <Box
      component="form"
      action={updateProfileWithdata}
      sx={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}
    >
      <Title>{getOverviewTitle(data)}</Title>
      <List
        sx={{
          borderRadius: 2,
          bgcolor: 'background.paper',
        }}
      >
        <ListItem>
          <ListItemText
            primary={`${getGoalText(data)} ${
              data.goal !== 'maintain_weight' ? 'kg' : ''
            }`}
            secondary={`Current weight ${data.weight}kg`}
            primaryTypographyProps={{
              fontWeight: 'medium',
              color: 'primary.main',
            }}
          />
          <Avatar sx={{ bgcolor: 'action.selected' }}>
            <ChartIcon color="primary" />
          </Avatar>
        </ListItem>
        <Divider variant="middle" component="li" />
        <ListItem>
          <ListItemText
            primary={`${dailyCalorieIntake(data)} kcal`}
            secondary="Daily calorie intake"
            primaryTypographyProps={{
              fontWeight: 'medium',
              color: 'primary.main',
            }}
          />
          <Avatar sx={{ bgcolor: 'action.selected' }}>
            <FireIcon color="primary" />
          </Avatar>
        </ListItem>
        <Divider variant="middle" component="li" />
        <ListItem>
          <ListItemText
            primary="2,0 L"
            secondary="Daily water intake"
            primaryTypographyProps={{
              fontWeight: 'medium',
              color: 'primary.main',
            }}
          />
          <Avatar sx={{ bgcolor: 'action.selected' }}>
            <DrinkIcon fontSize="small" color="primary" />
          </Avatar>
        </ListItem>
      </List>
      <Stack spacing={1} mt={{ xs: 'auto', sm: 8 }}>
        <SubmitButton />
        <Button
          variant="text"
          color="inherit"
          onClick={onHandleBack}
          sx={{ alignSelf: 'center' }}
        >
          Back
        </Button>
      </Stack>
    </Box>
  );
};

export default Overview;
