'use client';

import { useTheme } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import Card from '@/components/card';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ComponentLoader from '@/components/component-loader';

const CHART_HEIGHT = 144;

const ApexChart = dynamic(() => import('react-apexcharts'), {
  loading: () => <ComponentLoader height={CHART_HEIGHT} />,
  ssr: false,
});

interface Props {
  goal: string | null;
  current_weight: number | null;
  target_weight: number | null;
  dataset: { weight: number; date: string }[];
}

const WeightChart = ({
  dataset,
  goal,
  current_weight,
  target_weight,
}: Props) => {
  const theme = useTheme();

  const series = [
    {
      name: 'Weight',
      data: dataset.map(item => item.weight),
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
      min: target_weight || current_weight || 0,
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

  const avgWeight =
    dataset.reduce((acc, cur) => acc + cur.weight, 0) / dataset.length;

  const weightDiff = avgWeight - current_weight!;

  const getTextColor = () => {
    if (goal === 'lose_weight') {
      return weightDiff <= 0 ? 'success.main' : 'error.main';
    }
    if (goal === 'gain_weight') {
      return weightDiff < 0 ? 'error.main' : 'success.main';
    }
    return 'inherit';
  };

  return (
    <Card>
      <Typography variant="h6" fontWeight={500} mb={2}>
        Weight
      </Typography>
      <Grid container alignItems="flex-end">
        <Grid item xs={12} sm={5} mb={[0, 3]}>
          <Typography variant="h3" mb={0.25}>
            {current_weight}
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
              kg this week
            </Typography>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={7}>
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
