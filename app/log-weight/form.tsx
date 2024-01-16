'use client';

import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import SubmitFormButton from '@/components/submit-form-button';
import { insertWeightIntake } from './actions';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const LogWeightForm = ({ initValue }: { initValue: number }) => {
  const [value, setValue] = useState<number>(initValue);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  const insertWeightIntakedata = insertWeightIntake.bind(null, value);

  return (
    <Stack
      spacing={4}
      alignItems="center"
      component="form"
      action={insertWeightIntakedata}
    >
      <Typography variant="h4" component="div">
        {value.toFixed(1)}{' '}
        <Typography variant="body2" color="text.secondary" component="span">
          kg
        </Typography>
      </Typography>
      <Stack direction="row" alignItems="center" width="100%" spacing={1}>
        <IconButton aria-label="remove" onClick={() => setValue(value - 0.1)}>
          <RemoveIcon />
        </IconButton>
        <Slider
          aria-label="kilos"
          value={value}
          color="secondary"
          min={40}
          max={160}
          step={0.1}
          onChange={handleChange}
          sx={{ flex: '1 1 auto' }}
        />
        <IconButton aria-label="add" onClick={() => setValue(value + 0.1)}>
          <AddIcon />
        </IconButton>
      </Stack>
      <SubmitFormButton>Save</SubmitFormButton>
    </Stack>
  );
};

export default LogWeightForm;
