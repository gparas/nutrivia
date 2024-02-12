'use client';

import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
import Card from '@/components/card';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/AddCircleRounded';
import RemoveIcon from '@mui/icons-material/Remove';
import Dialog from '@/components/dialog';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import DietIcon from '@/icons/Diet';
import SubmitFormButton from '@/components/submit-form-button';
import { insertWeightIntake } from './actions';

const initialState = {
  status: '',
};

interface Props {
  initValue: number;
  loggedWeight?: boolean;
}

const WeightTrackCard = ({ loggedWeight, initValue }: Props) => {
  const [state, formAction] = useFormState(insertWeightIntake, initialState);
  const [value, setValue] = useState<number>(initValue);
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
            <DietIcon sx={{ fontSize: 40 }} />
          </ListItemIcon>
          <ListItemText primary="Weight" secondary="Log weight" />
          {loggedWeight ? (
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
            {value.toFixed(1)}{' '}
            <Typography variant="body2" color="text.secondary" component="span">
              kg
            </Typography>
          </Typography>
          <Stack direction="row" alignItems="center" width="100%" spacing={1}>
            <IconButton
              aria-label="remove"
              onClick={() => setValue(value - 0.1)}
            >
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
        <input type="hidden" name="weight" defaultValue={value.toFixed(1)} />
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

export default WeightTrackCard;
