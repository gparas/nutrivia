'use client';

import { useTheme } from '@mui/material/styles';
import Card from '@/components/card';
import dynamic from 'next/dynamic';
import Typography from '@mui/material/Typography';

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const PerformanceChart = () => {
  const theme = useTheme();
  const series = [
    {
      name: 'Link clicks',
      data: [20, 16, 18, 8, 29, 17, 12],
    },
    {
      name: 'App downloads',
      data: [12, 7, 13, 4, 11, 5, 5],
    },
    {
      name: 'Subscriptions',
      data: [3, 5, 8, 1, 6, 3, 4],
    },
  ];
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: 'straight',
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      axisBorder: {
        color: theme.palette.divider,
      },
      axisTicks: {
        color: theme.palette.divider,
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
        datetimeFormatter: {
          day: 'ddd',
        },
        style: {
          cssClass: 'apexcharts-label',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          cssClass: 'apexcharts-label',
        },
      },
    },
    grid: {
      borderColor: theme.palette.action.disabledBackground,
      strokeDashArray: 4,
    },
    legend: {
      position: 'top',
      labels: {
        colors: [...Array(3).keys()].map(() => theme.palette.text.secondary),
      },
    },
    tooltip: {
      theme: theme.palette.mode,
      x: {
        format: 'dd MMM yy',
      },
    },
  } as const;
  return (
    <Card
      sx={{
        '& .apexcharts-label': { fill: theme => theme.palette.text.secondary },
      }}
    >
      <Typography variant="h6" fontWeight={500} mb={2}>
        Performance Trends
      </Typography>
      <ApexChart
        options={options}
        series={series}
        type="area"
        height={300}
        width={'100%'}
      />
    </Card>
  );
};

export default PerformanceChart;
