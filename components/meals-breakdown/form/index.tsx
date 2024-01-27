'use client';

import { useEffect, useState } from 'react';
import { Tables } from '@/types/supabase';
import { capitalize } from '@mui/material';
import { useFormState, useFormStatus } from 'react-dom';
import { Meals } from '@/types/meals';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import SubmitFormButton from '@/components/submit-form-button';
import Chart from './chart';
import { updateProfile } from './actions';
import { COLORS } from '../constants';

const SubmitButton = ({ disabled }: { disabled: boolean }) => {
  const { pending } = useFormStatus();
  return (
    <SubmitFormButton disabled={pending || disabled}>Save</SubmitFormButton>
  );
};

interface Props {
  profile: Tables<'profiles'>;
  onClose: () => void;
}

const initialState = {
  status: '',
};

const AdjustMealsForm = ({ profile, onClose }: Props) => {
  const { breakfast, lunch, dinner, snack, kcal_intake } = profile;
  const [state, formAction] = useFormState(updateProfile, initialState);
  const [meals, setMeals] = useState<Meals>({
    breakfast,
    lunch,
    dinner,
    snack,
  });

  useEffect(() => {
    if (state?.status !== 'success') return;
    onClose();
  }, [state, onClose]);

  const handleChange =
    (key: string) => (event: Event, newValue: number | number[]) => {
      setMeals({
        ...meals,
        [key]: newValue,
      });
    };

  const handleReset = () => {
    setMeals({ breakfast, lunch, dinner, snack });
  };

  const dailyCalorieIntake = kcal_intake || 0;
  return (
    <Stack
      component="form"
      action={formAction}
      px={2}
      py={{ xs: 4, sm: 3 }}
      spacing={3}
      flex="1 1 auto"
      minWidth={300}
    >
      <Box flex="0 0 auto">
        <Chart dataSeries={meals} series={Object.values(meals)} />
      </Box>
      <Box flex="1 1 auto">
        {Object.keys(meals).map(key => {
          const value = meals[key as keyof Meals] || 0;
          const kcal = Math.floor((dailyCalorieIntake * value) / 100);
          return (
            <Box key={key} p={1} mb={1}>
              <Grid container spacing={1} justifyContent="space-between">
                <Grid item>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Box
                      height={10}
                      width={10}
                      borderRadius={'2px'}
                      bgcolor={COLORS[key as keyof Meals]}
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
                      color: COLORS[key as keyof Meals],
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
              <input type="hidden" name={key} defaultValue={value} />
            </Box>
          );
        })}
      </Box>
      <Stack direction="row" spacing={1} flex="0 0 auto">
        <Button
          variant="contained"
          color="neutral"
          fullWidth
          onClick={handleReset}
        >
          reset
        </Button>
        <SubmitButton
          disabled={
            Object.values(meals).reduce((acc, cur) => acc + cur, 0) !== 100
          }
        />
      </Stack>
    </Stack>
  );
};

export default AdjustMealsForm;
