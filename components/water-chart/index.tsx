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
  dataset: { liter: number; date: string }[];
}

const WaterChart = ({ dataset }: Props) => {
  const theme = useTheme();

  const series = [
    {
      name: 'Liter',
      data: dataset.map(item => item.liter),
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
    yaxis: {
      show: false,
    },
    grid: {
      show: false,
    },
    colors: [theme.palette.info.main],
    tooltip: {
      theme: theme.palette.mode,
      hideEmptySeries: false,
    },
  };

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

export default WaterChart;
