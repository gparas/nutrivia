'use client';

import { useFormStatus } from 'react-dom';
import Title from '../components/Title';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ChartIcon from '@mui/icons-material/BarChartRounded';
import FireIcon from '@mui/icons-material/LocalFireDepartment';
import DrinkIcon from '@mui/icons-material/LocalDrinkRounded';
import CircularProgress from '@mui/material/CircularProgress';
import { useFormContext } from '../components/FormContext';
import { getOverviewTitle, getGoalText, dailyCalorieIntake } from './utils';
import { createKyc } from './actions';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      variant="contained"
      color="primary"
      fullWidth
      size="large"
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      endIcon={pending && <CircularProgress size={20} />}
    >
      Start
    </Button>
  );
}

const Overview = () => {
  const { data, onHandleBack } = useFormContext();
  const createKycWithdata = createKyc.bind(null, data);

  return (
    <Box
      component="form"
      action={createKycWithdata}
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
            primary={
              <>
                {getGoalText(data)}{' '}
                {data.goal !== 'maintain_weight' && (
                  <Typography component="span" variant="body2">
                    kg
                  </Typography>
                )}
              </>
            }
            secondary={`Current weight ${data.weight}kg`}
            primaryTypographyProps={{
              fontWeight: 'medium',
              color: 'primary.dark',
              variant: 'h6',
            }}
          />
          <Avatar sx={{ bgcolor: 'primary.300' }}>
            <ChartIcon color="primary" />
          </Avatar>
        </ListItem>
        <Divider variant="middle" light component="li" />
        <ListItem>
          <ListItemText
            primary={
              <>
                {dailyCalorieIntake(data)}{' '}
                <Typography component="span" variant="body2">
                  kcal
                </Typography>
              </>
            }
            secondary="Daily calorie intake"
            primaryTypographyProps={{
              fontWeight: 'medium',
              color: 'primary.dark',
              variant: 'h6',
            }}
          />
          <Avatar sx={{ bgcolor: 'primary.300' }}>
            <FireIcon color="primary" />
          </Avatar>
        </ListItem>
        <Divider variant="middle" light component="li" />
        <ListItem>
          <ListItemText
            primary={
              <>
                2,0{' '}
                <Typography component="span" variant="body2">
                  L
                </Typography>
              </>
            }
            secondary="Daily water intake"
            primaryTypographyProps={{
              fontWeight: 'medium',
              color: 'primary.dark',
              variant: 'h6',
            }}
          />
          <Avatar sx={{ bgcolor: 'primary.300' }}>
            <DrinkIcon color="primary" fontSize="small" />
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
