import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import { Meals } from '@/types/meals';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Card from '@/components/card';
import Chart from './chart';
import { COLORS } from './constants';
import AdjustCta from './adjust-cta';

const MealsBreakdown = async ({ user_id }: { user_id: string }) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: profile } = await supabase
    .from('profiles')
    .select()
    .eq('id', user_id)
    .single();

  if (!profile) {
    return null;
  }
  const { breakfast, lunch, dinner, snack, kcal_intake } = profile;

  const dailyCalorieIntake = kcal_intake || 0;
  const meals = {
    breakfast,
    lunch,
    dinner,
    snack,
  };
  return (
    <>
      <Card height={'100%'}>
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
                    <Typography variant="body2">{key}</Typography>
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
        <AdjustCta profile={profile} />
      </Card>
    </>
  );
};

export default MealsBreakdown;
