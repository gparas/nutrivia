'use client';

import { useState } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SubmitFormButton from '@/components/submit-form-button';
import Dialog from '@/components/dialog';
import { insertWeightIntake } from './actions';

const LogWeightForm = ({ initValue }: { initValue: number }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const open = searchParams.get('log_weight');
  const [value, setValue] = useState<number>(initValue);

  const onClose = () => {
    router.push(pathname);
  };

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  const insertWeightIntakedata = insertWeightIntake.bind(null, value);

  return (
    <Dialog
      open={Boolean(open)}
      onClose={onClose}
      PaperProps={{
        component: 'form',
        action: insertWeightIntakedata,
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

export default LogWeightForm;
