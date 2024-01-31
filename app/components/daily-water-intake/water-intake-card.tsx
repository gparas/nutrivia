'use client';

import { useEffect, useState } from 'react';
import { Tables } from '@/types/supabase';
import { useFormState } from 'react-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/AddCircleRounded';
import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
import Card from '@/components/card';
import WaterIcon from '@/icons/Water';
import Dialog from '@/components/dialog';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import SubmitFormButton from '@/components/submit-form-button';
import { insertWaterIntake } from './actions';

const initialState = {
  status: '',
};

const WaterIntakeCard = ({ water }: { water: Tables<'water'> | null }) => {
  const [state, formAction] = useFormState(insertWaterIntake, initialState);
  const [value, setValue] = useState<number>(2);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (state?.status !== 'success') return;
    setOpen(false);
  }, [state]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Card p={0}>
        <ListItemButton onClick={handleClickOpen}>
          <ListItemIcon>
            <WaterIcon sx={{ fontSize: 40 }} />
          </ListItemIcon>
          <ListItemText
            primary="Water"
            secondary={water ? `${water.liter}L intake` : 'Daily water intake'}
          />
          {water ? (
            <CheckCircleRounded color="success" />
          ) : (
            <AddIcon color="disabled" />
          )}
        </ListItemButton>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          action: formAction,
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
        <input type="hidden" name="liter" defaultValue={value} />
        <Stack direction="row" spacing={1} p={2}>
          <Button
            variant="contained"
            color="neutral"
            onClick={handleClose}
            fullWidth
          >
            Cancel
          </Button>
          <SubmitFormButton>Save</SubmitFormButton>
        </Stack>
      </Dialog>
    </>
  );
};

export default WaterIntakeCard;
