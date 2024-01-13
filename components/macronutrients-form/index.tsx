'use client';

import { useState } from 'react';
import { Tables } from '@/types/supabase';
import { capitalize } from '@mui/material';
import { useFormStatus } from 'react-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import SubmitFormButton from '../submit-form-button';
import { Macronutrients } from '@/types/macronutrients';
import Chart from './chart';
import { updateProfile } from './actions';

const SubmitButton = ({ disabled }: { disabled: boolean }) => {
  const { pending } = useFormStatus();
  return (
    <SubmitFormButton disabled={pending || disabled}>Save</SubmitFormButton>
  );
};

const MacronutrientsForm = ({
  carbs,
  protein,
  fat,
  kcal_intake,
}: Tables<'profiles'>) => {
  const [state, setState] = useState<Macronutrients>({
    carbs,
    protein,
    fat,
  });
  const handleChange =
    (key: string) => (event: Event, newValue: number | number[]) => {
      setState({
        ...state,
        [key]: newValue,
      });
    };

  const handleReset = () => {
    setState({ carbs, protein, fat });
  };
  const dailyCalorieIntake = kcal_intake || 0;
  const updateProfileWithdata = updateProfile.bind(null, state);
  return (
    <Stack spacing={3} component="form" action={updateProfileWithdata}>
      <Chart dataSeries={state} series={Object.values(state)} />
      {Object.keys(state).map(key => {
        const factor = key === 'fat' ? 9 : 4;
        const value = state[key as keyof Macronutrients] || 0;
        const kcal = Math.floor((dailyCalorieIntake * value) / 100);
        const grams = Math.floor((dailyCalorieIntake * value) / 100 / factor);
        return (
          <div key={key}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Box height={12} width={12} bgcolor={`${key}.main`} />
                  <Typography variant="body2">{capitalize(key)}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body2">{grams}g</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body2">{value}%</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body2">{kcal}kcal</Typography>
              </Grid>
              <Grid item xs={12}>
                <Slider
                  value={value}
                  color={key as keyof Macronutrients}
                  onChange={handleChange(key)}
                />
              </Grid>
            </Grid>
          </div>
        );
      })}
      <Stack spacing={1}>
        <SubmitButton
          disabled={
            Object.values(state).reduce((acc, cur) => acc + cur, 0) !== 100
          }
        />
        <Button variant="text" color="inherit" onClick={handleReset}>
          reset
        </Button>
      </Stack>
    </Stack>
  );
};

export default MacronutrientsForm;
