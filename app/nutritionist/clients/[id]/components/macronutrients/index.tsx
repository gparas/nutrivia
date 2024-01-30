import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Card from '@/components/card';
import { getNutrientsData } from '@/lib/utils';
import Chart from './chart';
import AdjustCta from './adjust-cta';

const Macronutrients = async ({ user_id }: { user_id: string }) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: profile } = await supabase
    .from('profiles')
    .select()
    .eq('id', user_id)
    .single();

  if (!profile) return null;

  const nutrientsData = getNutrientsData(profile, profile.kcal_intake || 0);
  return (
    <Card height={'100%'}>
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
      <AdjustCta profile={profile} />
    </Card>
  );
};

export default Macronutrients;
