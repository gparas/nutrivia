'use client';

import { useState } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import SubmitFormButton from '@/components/submit-form-button';
import Dialog from '@/components/dialog';
import { insertWaterIntake } from './actions';

const WaterIntakeForm = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const open = searchParams.get('log_water');

  const [value, setValue] = useState<number>(2);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  const onClose = () => {
    router.push(pathname);
  };

  const insertWaterIntakedata = insertWaterIntake.bind(null, value);

  return (
    <Dialog
      open={Boolean(open)}
      onClose={onClose}
      PaperProps={{
        component: 'form',
        action: insertWaterIntakedata,
      }}
    >
      <Stack
        p={3}
        spacing={4}
        alignItems="center"
        justifyContent="center"
        flex="1 1 auto"
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
      </Stack>
      <Stack direction="row" spacing={1} p={2}>
        <Button variant="contained" color="neutral" onClick={onClose} fullWidth>
          Cancel
        </Button>
        <SubmitFormButton>Save</SubmitFormButton>
      </Stack>
    </Dialog>
  );
};

export default WaterIntakeForm;
