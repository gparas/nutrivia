'use client';

import { useTheme } from '@mui/material/styles';
import { StackProps } from '@mui/material';
import { Tables } from '@/types/supabase';
import dynamic from 'next/dynamic';
import Card from '@/components/card';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ComponentLoader from '@/components/component-loader';
import dayjs from 'dayjs';

const CHART_HEIGHT = 144;

const ApexChart = dynamic(() => import('react-apexcharts'), {
  loading: () => <ComponentLoader height={CHART_HEIGHT} />,
  ssr: false,
});

type Props = {
  profile: Tables<'profiles'>;
  weights: Tables<'weights'>[] | null;
} & StackProps;

const WeightTrack = ({ profile, weights, ...other }: Props) => {
  const theme = useTheme();

  const initWeight = {
    date: profile.created_at,
    weight: Number(profile.weight),
  };
  const logWeight =
    weights && weights.length
      ? weights?.map(({ created_at, kg }) => ({
          date: created_at,
          weight: kg,
        }))
      : [{ date: dayjs().format('YYYY-MM-DD'), weight: initWeight.weight }];

  const dataset = [initWeight, ...logWeight];

  const series = [
    {
      name: 'Weight',
      data: dataset.map(item => Number(item.weight)),
    },
  ];
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
    } as const,
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      type: 'datetime',
      categories: dataset.map(item => item.date),
      labels: {
        show: false,
      },
    } as const,
    colors: [theme.palette.success.main],
    yaxis: {
      show: false,
      min: Number(profile.target_weight) || Number(profile.weight),
    },
    grid: {
      show: false,
    },
    tooltip: {
      theme: theme.palette.mode,
      hideEmptySeries: false,
    },
  };

  const lastLoggedWeight = Number(dataset[dataset.length - 1].weight);

  return (
    <Card {...other}>
      <Typography variant="h6" fontWeight={500}>
        Weight
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={[2, 0]}>
        Goal {profile.target_weight || profile.weight} kg
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
          <ApexChart
            options={options}
            series={series}
            type="area"
            height={CHART_HEIGHT}
            width={'100%'}
          />
        </Grid>
      </Grid>
    </Card>
  );
};

export default WeightTrack;
