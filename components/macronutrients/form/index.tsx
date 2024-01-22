'use client';

import { useEffect, useState } from 'react';
import { Tables } from '@/types/supabase';
import { capitalize } from '@mui/material';
import { useFormState, useFormStatus } from 'react-dom';
import { Macronutrients } from '@/types/macronutrients';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';
import SubmitFormButton from '../../submit-form-button';
import Chart from './chart';
import { updateProfile } from './actions';

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

const MacronutrientsForm = ({ profile, onClose }: Props) => {
  const { carbs, protein, fat, kcal_intake } = profile;
  const [macros, setMacros] = useState<Macronutrients>({
    carbs,
    protein,
    fat,
  });
  const [state, formAction] = useFormState(updateProfile, initialState);

  useEffect(() => {
    if (state?.status !== 'success') return;
    onClose();
  }, [state, onClose]);

  const handleChange =
    (key: string) => (event: Event, newValue: number | number[]) => {
      setMacros({
        ...macros,
        [key]: newValue,
      });
    };

  const handleReset = () => {
    setMacros({ carbs, protein, fat });
  };
  const dailyCalorieIntake = kcal_intake || 0;
  return (
    <Stack
      component="form"
      action={formAction}
      p={2}
      spacing={3}
      flex="1 1 auto"
      minWidth={300}
    >
      <Box flex="0 0 auto">
        <Chart dataSeries={macros} series={Object.values(macros)} />
      </Box>
      <Box flex="1 1 auto">
        {Object.keys(macros).map(key => {
          const factor = key === 'fat' ? 9 : 4;
          const value = macros[key as keyof Macronutrients] || 0;
          const kcal = Math.floor((dailyCalorieIntake * value) / 100);
          const grams = Math.floor((dailyCalorieIntake * value) / 100 / factor);
          return (
            <Box key={key} p={1} mb={1}>
              <Grid container spacing={1} justifyContent="space-between">
                <Grid item>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Box height={12} width={12} bgcolor={`${key}.main`} />
                    <Typography variant="body2">{capitalize(key)}</Typography>
                  </Stack>
                </Grid>
                <Grid item>
                  <Typography variant="body2">{grams}g</Typography>
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
                    color={key as keyof Macronutrients}
                    onChange={handleChange(key)}
                  />
                </Grid>
              </Grid>
              <input type="hidden" name={key} defaultValue={value} />
            </Box>
          );
        })}
      </Box>
      <Stack spacing={1} flex="0 0 auto">
        <SubmitButton
          disabled={
            Object.values(macros).reduce((acc, cur) => acc + cur, 0) !== 100
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
