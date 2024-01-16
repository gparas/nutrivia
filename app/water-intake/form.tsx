'use client';

import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import SubmitFormButton from '@/components/submit-form-button';
import { insertWaterIntake } from './actions';

const WaterIntakeForm = () => {
  const [value, setValue] = useState<number>(2);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  const insertWaterIntakedata = insertWaterIntake.bind(null, value);

  return (
    <Stack
      spacing={4}
      alignItems="center"
      component="form"
      action={insertWaterIntakedata}
    >
      <Typography variant="h4" component="div">
        {value}{' '}
        <Typography variant="body2" color="text.secondary" component="span">
          liters
        </Typography>
      </Typography>
      <Typography variant="h4" component="div">
        {value * 4}{' '}
        <Typography variant="body2" color="text.secondary" component="span">
          glasses
        </Typography>
      </Typography>
      <Slider
        aria-label="Liters"
        value={value}
        color="secondary"
        min={1}
        max={5}
        step={0.25}
        onChange={handleChange}
      />
      <SubmitFormButton>Save</SubmitFormButton>
    </Stack>
  );
};

export default WaterIntakeForm;
