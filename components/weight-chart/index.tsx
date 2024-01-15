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
  weights: { date: string; weight: number }[] | [];
} & StackProps;

const WeightChart = ({ profile, weights, ...other }: Props) => {
  const theme = useTheme();

  const initData = { date: profile.created_at, weight: profile.weight };
  const dataset = [initData, ...weights];

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
      x: {
        format: 'dd MMM yy',
      },
    },
  };

  const lastLoggedWeight = Number(dataset[dataset.length - 1].weight);

  const weightDiff = !Number.isNaN(lastLoggedWeight)
    ? lastLoggedWeight - Number(profile.weight)
    : Number(profile.weight) - Number(profile.weight);

  const getTextColor = () => {
    if (profile.goal === 'lose_weight') {
      return weightDiff <= 0 ? 'success.main' : 'error.main';
    }
    if (profile.goal === 'gain_weight') {
      return weightDiff < 0 ? 'error.main' : 'success.main';
    }
    return 'inherit';
  };

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
          <Typography
            variant="body2"
            color={getTextColor()}
            fontWeight={500}
            mb={1}
          >
            {weightDiff <= 0 ? <span>&darr;</span> : <span>&uarr;</span>}
            {Math.abs(Math.round(weightDiff * 100) / 100)}{' '}
            <Typography
              variant="inherit"
              color={'text.secondary'}
              component="span"
              fontWeight={400}
            >
              kg {weightDiff <= 0 ? 'lost' : 'gain'}
            </Typography>
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

export default WeightChart;
