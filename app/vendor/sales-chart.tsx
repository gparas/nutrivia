'use client';

import { useTheme } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import Typography from '@mui/material/Typography';
import Card from '@/components/card';
import ComponentLoader from '@/components/component-loader';
import { priceFormat } from '@/lib/utils';
import { DATA_CURRENT, DATA_PREVIOUS } from './constants';
import dayjs from 'dayjs';

const CHART_HEIGHT = 320;

const ApexChart = dynamic(() => import('react-apexcharts'), {
  loading: () => <ComponentLoader height={CHART_HEIGHT} />,
  ssr: false,
});

const series = [
  {
    name: 'current week',
    data: DATA_CURRENT,
  },
  {
    name: 'previous week',
    data: DATA_PREVIOUS,
  },
];

const SalesChart = () => {
  const theme = useTheme();
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
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
        dayjs().subtract(6, 'day').format('YYYY-MM-DD'),
        dayjs().subtract(5, 'day').format('YYYY-MM-DD'),
        dayjs().subtract(4, 'day').format('YYYY-MM-DD'),
        dayjs().subtract(3, 'day').format('YYYY-MM-DD'),
        dayjs().subtract(2, 'day').format('YYYY-MM-DD'),
        dayjs().subtract(1, 'day').format('YYYY-MM-DD'),
        dayjs().format('YYYY-MM-DD'),
      ],
      labels: {
        datetimeFormatter: {
          day: 'ddd',
        },
        style: {
          colors: [...Array(7).keys()].map(() => theme.palette.text.secondary),
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (value: number) => priceFormat(value),
        style: {
          colors: [...Array(7).keys()].map(() => theme.palette.text.secondary),
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
        colors: [...Array(2).keys()].map(() => theme.palette.text.secondary),
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
    <Card>
      <Typography variant="h6" mb={3}>
        Sales Overview
      </Typography>
      <ApexChart
        type="area"
        options={options}
        series={series}
        height={CHART_HEIGHT}
        width="100%"
      />
    </Card>
  );
};

export default SalesChart;
