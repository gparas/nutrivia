'use client';

import { useCallback, useState } from 'react';
import { Meals } from '@/types/meals';
import { Tables } from '@/types/supabase';
import { capitalize } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack, { StackProps } from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Card from '@/components/card';
import Chart from './chart';
import AdjustMealsForm from './form';
import Dialog from '../dialog';
import { COLORS } from './constants';

type Props = {
  profile: Tables<'profiles'>;
} & StackProps;

const MealsBreakdown = ({ profile, ...other }: Props) => {
  const { breakfast, lunch, dinner, snack, kcal_intake } = profile;
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const dailyCalorieIntake = kcal_intake || 0;
  const meals = {
    breakfast,
    lunch,
    dinner,
    snack,
  };
  return (
    <>
      <Card {...other}>
        <Box flex="0 0 auto">
          <Chart
            dataSeries={meals}
            dailyKcal={dailyCalorieIntake}
            series={Object.values(meals)}
          />
        </Box>
        <Box flex="1 1 auto">
          {Object.keys(meals).map(key => {
            const value = meals[key as keyof Meals] || 0;
            const kcal = Math.floor((dailyCalorieIntake * value) / 100);
            return (
              <Grid
                key={key}
                container
                spacing={2}
                justifyContent="space-between"
              >
                <Grid item xs={12}>
                  <Divider sx={{ mt: 2 }} light />
                </Grid>
                <Grid item>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Box
                      height={10}
                      width={10}
                      borderRadius={'2px'}
                      bgcolor={COLORS[key as keyof Meals]}
                    />
                    <Typography variant="body2">{capitalize(key)}</Typography>
                  </Stack>
                </Grid>
                <Grid item>
                  <Typography variant="body2">{value}%</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2">{kcal}kcal</Typography>
                </Grid>
              </Grid>
            );
          })}
        </Box>
        <Box flex="0 0 auto" mt={3}>
          <Button
            variant="contained"
            color="neutral"
            fullWidth
            onClick={handleClickOpen}
            sx={{ fontWeight: 500 }}
          >
            Adjust Meals
          </Button>
        </Box>
      </Card>
      <Dialog open={open} onClose={handleClose}>
        <AdjustMealsForm onClose={handleClose} profile={profile} />
      </Dialog>
    </>
  );
};

export default MealsBreakdown;
