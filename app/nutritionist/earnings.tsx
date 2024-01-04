'use client';

import { useTheme } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import Card from '@/components/card';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { priceFormat } from '@/lib/utils';

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

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
        <Grid item xs={12} md={5} mb={[0, 3]}>
          <Typography variant="h3" mb={0.25}>
            {priceFormat(1260)}
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
        <Grid item xs={12} md={7}>
          <ApexChart
            options={options}
            series={series}
            type="area"
            height={144}
            width={'100%'}
          />
        </Grid>
      </Grid>
    </Card>
  );
};

export default Earnings;
