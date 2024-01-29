'use client';

import { useCallback, useState } from 'react';
import { Tables } from '@/types/supabase';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack, { StackProps } from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@/components/card';
import Dialog from '@/components/dialog';
import { getNutrientsData } from '@/lib/utils';
import Chart from './chart';
import MacronutrientsForm from './form';

type Props = {
  profile: Tables<'profiles'>;
} & StackProps;

const Macronutrients = ({ profile, ...other }: Props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const nutrientsData = getNutrientsData(profile, profile.kcal_intake || 0);
  return (
    <>
      <Card {...other}>
        <Box
          flex="0 0 auto"
          display="flex"
          alignItems="center"
          justifyContent="center"
          position="relative"
        >
          <Chart
            nutrientsData={nutrientsData}
            dailyKcal={profile.kcal_intake || 0}
          />
        </Box>
        <Box flex="1 1 auto">
          {nutrientsData.map(item => (
            <Grid container key={item.label} spacing={2}>
              <Grid item xs={12}>
                <Divider sx={{ mt: 2 }} light />
              </Grid>
              <Grid item xs={4}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Box
                    height={10}
                    width={10}
                    borderRadius={'2px'}
                    bgcolor={`${item.color}.main`}
                  />
                  <Typography variant="body2">{item.label}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body2">{item.gram}g</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body2">{item.value}%</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body2">{item.kcal}kcal</Typography>
              </Grid>
            </Grid>
          ))}
        </Box>
        <Button
          variant="contained"
          color="neutral"
          onClick={handleClickOpen}
          sx={{ mt: 3, fontWeight: 500 }}
        >
          Adjust Macronutrients
        </Button>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <MacronutrientsForm profile={profile} onClose={handleClose} />
      </Dialog>
    </>
  );
};

export default Macronutrients;