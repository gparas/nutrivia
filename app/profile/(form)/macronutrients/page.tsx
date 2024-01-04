import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { getDailyCalorieIntake, getNutrientsData } from '@/lib/utils';
import Chart from './chart';

const page = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data } = await supabase.from('profiles').select();

  if (!data || !data.length) return null;

  const dailyCalorieIntake = getDailyCalorieIntake(data[0]);
  const nutrientsData = getNutrientsData(dailyCalorieIntake);
  return (
    <Box>
      <Box height={300} position="relative">
        <Chart data={nutrientsData} dailyCalorieIntake={dailyCalorieIntake} />
      </Box>
      {nutrientsData.map(item => (
        <Grid container key={item.label} spacing={2}>
          <Grid item xs={12}>
            <Divider sx={{ mt: 2 }} />
          </Grid>
          <Grid item xs={4}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Box height={12} width={12} bgcolor={`${item.color}.main`} />
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
  );
};

export default page;
