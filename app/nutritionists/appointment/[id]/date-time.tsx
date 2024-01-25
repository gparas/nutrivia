'use client';

import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { alpha, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { SLOTS } from './constants';
import { updateNutritionistId } from './actions';
import SubmitFormButton from '@/components/submit-form-button';

const DateTime = ({ nutritionist_id }: { nutritionist_id: string }) => {
  const [value, setValue] = useState<Dayjs | null>(dayjs());
  const [selectedIndex, setSelectedIndex] = useState<number>();

  const updateNutritionistIdData = updateNutritionistId.bind(
    null,
    nutritionist_id,
  );

  return (
    <>
      <Box
        sx={theme => ({
          height: '100%',
          [theme.breakpoints.up('md')]: {
            p: 2,
            borderLeft: `1px solid ${alpha(theme.palette.text.primary, 0.1)}`,
          },
        })}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography pl={[0, 3]} fontWeight={500}>
              Select a Date & Time
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <DateCalendar
              disablePast
              views={['day']}
              value={value}
              onChange={newValue => {
                setValue(newValue);
                setSelectedIndex(undefined);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2" mb={3}>
              {dayjs(value).format('dddd, MMM YY')}
            </Typography>
            <Stack spacing={1}>
              {SLOTS.map((slot, index) => {
                const selected = selectedIndex === index;
                return (
                  <Button
                    key={index}
                    size="large"
                    variant={selected ? 'contained' : 'outlined'}
                    color={selected ? 'primary' : 'secondary'}
                    onClick={() => setSelectedIndex(index)}
                  >
                    {slot}
                  </Button>
                );
              })}
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <Dialog
        open={Boolean(selectedIndex?.toString())}
        onClose={() => setSelectedIndex(undefined)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          component: 'form',
          action: updateNutritionistIdData,
        }}
      >
        <DialogTitle id="alert-dialog-title">Confirm appointment</DialogTitle>
        <Box sx={{ p: 3, maxWidth: 320 }}>
          <Typography variant="body1">30 Minutes Meeting</Typography>
          <Typography variant="body1" mb={1}>
            {dayjs(value).format('dddd, MMM YY')} at{' '}
            {SLOTS.find((_, index) => index === selectedIndex)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Web conferencing details provided upon confirmation
          </Typography>
        </Box>
        <DialogActions sx={{ p: 2 }}>
          <Button color="inherit" onClick={() => setSelectedIndex(undefined)}>
            cancel
          </Button>
          <SubmitFormButton>Confirm</SubmitFormButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DateTime;
