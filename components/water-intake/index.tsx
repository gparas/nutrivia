import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import dayjs from 'dayjs';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Card from '@/components/card';
import { getWaterDataset } from './utils';
import WaterChart from './chart';

interface Props {
  user_id: string;
}

const WaterIntake = async ({ user_id }: Props) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: water } = await supabase
    .from('water')
    .select()
    .eq('user_id', user_id)
    .gte('created_at', dayjs().subtract(7, 'days').format('YYYY-MM-DD'))
    .lte('created_at', dayjs().format('YYYY-MM-DD'));

  const dataset = getWaterDataset(water);
  const totalWater = dataset.reduce((acc, cur) => acc + cur.liter, 0);

  return (
    <Card>
      <Typography variant="h6" fontWeight={500}>
        Water
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={[2, 0]}>
        Goal 2L / day
      </Typography>
      <Grid container alignItems="flex-end">
        <Grid item xs={12} sm={4} md={5}>
          <Typography variant="h3" mb={0.25}>
            {totalWater}
            <Typography variant="h6" component="span" fontWeight={400}>
              L
            </Typography>
          </Typography>
          <Typography variant="body2" color={'text.secondary'}>
            water intake
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8} md={7}>
          <WaterChart dataset={dataset} />
        </Grid>
      </Grid>
    </Card>
  );
};

export default WaterIntake;
