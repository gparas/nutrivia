import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import { StackProps } from '@mui/material';
import Card from '@/components/card';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import dayjs from 'dayjs';
import WeightChart from './chart';

type Props = {
  user_id: string;
} & StackProps;

const WeightTrack = async ({ user_id, ...other }: Props) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: profile } = await supabase
    .from('profiles')
    .select()
    .eq('id', user_id)
    .single();

  const { data: weights } = await supabase
    .from('weights')
    .select()
    .eq('user_id', user_id);

  const initWeight = {
    date: profile?.created_at || dayjs().format('YYYY-MM-DD'),
    weight: Number(profile?.weight) || 0,
  };
  const logWeight =
    weights && weights.length
      ? weights?.map(({ created_at, kg }) => ({
          date: created_at,
          weight: kg,
        }))
      : [{ date: dayjs().format('YYYY-MM-DD'), weight: initWeight.weight }];

  const dataset = [initWeight, ...logWeight];

  const lastLoggedWeight = Number(dataset[dataset.length - 1].weight);

  return (
    <Card {...other}>
      <Typography variant="h6" fontWeight={500}>
        Weight
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={[2, 0]}>
        Goal {profile?.target_weight || profile?.weight} kg
      </Typography>
      <Grid container alignItems="flex-end">
        <Grid item xs={12} sm={4} md={5}>
          <Typography variant="h3" mb={0.25}>
            {lastLoggedWeight}
            <Typography variant="h6" component="span" fontWeight={400}>
              kg
            </Typography>
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={1}>
            current weight
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8} md={7}>
          <WeightChart
            dataset={dataset}
            minWeight={
              Number(profile?.target_weight) || Number(profile?.weight)
            }
          />
        </Grid>
      </Grid>
    </Card>
  );
};

export default WeightTrack;
