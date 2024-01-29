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

const Earnings = () => {
  const theme = useTheme();
  const series = [
    {
      name: 'Earnings',
      data: [150, 440, 370, 580, 310, 880, 1200],
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
      categories: [
        '2023-12-28',
        '2023-12-29',
        '2023-12-30',
        '2023-12-31',
        '2024-01-01',
        '2024-01-02',
        '2024-01-03',
      ],
      labels: {
        show: false,
      },
    } as const,
    colors: [theme.palette.success.main],
    yaxis: {
      show: false,
    },
    grid: {
      show: false,
    },
    legend: {
      position: 'top',
      labels: {
        colors: [...Array(7).keys()].map(() => theme.palette.text.secondary),
      },
    } as const,
    tooltip: {
      theme: theme.palette.mode,
      x: {
        format: 'dd MMM yy',
      },
    },
  };
  return (
    <Card
      sx={{
        '& .apexcharts-label': { fill: theme => theme.palette.text.secondary },
      }}
    >
      <Typography variant="h6" fontWeight={500} mb={2}>
        Earnings
      </Typography>
      <Grid container alignItems="flex-end">
        <Grid item xs={12} sm={5} mb={[0, 3]}>
          <Typography variant="h3" mb={0.25}>
            1260
            <Typography variant="h6" component="span" fontWeight={400}>
              €
            </Typography>
          </Typography>
          <Typography variant="body2" color="success.main" fontWeight={500}>
            &uarr;75{' '}
            <Typography
              variant="inherit"
              color="text.secondary"
              component="span"
              fontWeight={400}
            >
              vs previous week
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

export default Earnings;
