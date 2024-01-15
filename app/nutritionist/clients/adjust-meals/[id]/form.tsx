'use client';

import { useState } from 'react';
import { Tables } from '@/types/supabase';
import { capitalize } from '@mui/material';
import { useFormStatus } from 'react-dom';
import { Meals } from '@/types/meals';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import SubmitFormButton from '@/components/submit-form-button';
import Chart from './chart';
import { updateProfile } from './actions';

const SubmitButton = ({ disabled }: { disabled: boolean }) => {
  const { pending } = useFormStatus();
  return (
    <SubmitFormButton disabled={pending || disabled}>Save</SubmitFormButton>
  );
};

const AdjustMealsForm = ({
  breakfast,
  lunch,
  dinner,
  snack,
  kcal_intake,
}: Tables<'profiles'>) => {
  const theme = useTheme();

  const [state, setState] = useState<Meals>({
    breakfast,
    lunch,
    dinner,
    snack,
  });

  const handleChange =
    (key: string) => (event: Event, newValue: number | number[]) => {
      setState({
        ...state,
        [key]: newValue,
      });
    };

  const handleReset = () => {
    setState({ breakfast, lunch, dinner, snack });
  };

  const updateProfileWithdata = updateProfile.bind(null, state);
  const dailyCalorieIntake = kcal_intake || 0;
  const colors = {
    breakfast: '#008FFB',
    lunch: '#00E396',
    dinner: '#FEB019',
    snack: '#FF4560',
  };
  return (
    <form action={updateProfileWithdata}>
      <Box mb={3}>
        <Chart dataSeries={state} series={Object.values(state)} />
      </Box>
      {Object.keys(state).map(key => {
        const value = state[key as keyof Meals] || 0;
        const kcal = Math.floor((dailyCalorieIntake * value) / 100);
        return (
          <Box key={key} p={1} mb={1}>
            <Grid container spacing={1} justifyContent="space-between">
              <Grid item>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Box
                    height={12}
                    width={12}
                    bgcolor={colors[key as keyof Meals]}
                  />
                  <Typography variant="body2">{capitalize(key)}</Typography>
                </Stack>
              </Grid>
              <Grid item>
                <Typography variant="body2">{value}%</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">{kcal}kcal</Typography>
              </Grid>
              <Grid item xs={12}>
                <Slider
                  value={value}
                  size="small"
                  onChange={handleChange(key)}
                  sx={{
                    color: colors[key as keyof Meals],
                    '& .MuiSlider-track': {
                      border: 'none',
                    },
                    '& .MuiSlider-thumb': {
                      backgroundColor: 'currentColor',
                      '&::before': {
                        display: 'none',
                      },
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        );
      })}
      <Stack spacing={1} mt={3}>
        <SubmitButton
          disabled={
            Object.values(state).reduce((acc, cur) => acc + cur, 0) !== 100
          }
        />
        <Button variant="text" color="inherit" onClick={handleReset}>
          reset
        </Button>
      </Stack>
    </form>
  );
};

export default AdjustMealsForm;
