'use client';

import { useTheme } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import { capitalize } from '@mui/material';
import { Meals } from '@/types/meals';
import ComponentLoader from '@/components/component-loader';
import { COLORS } from './constants';

interface Props {
  dailyKcal: number;
  dataSeries: Meals;
  series: number[];
}

const CHART_HEIGHT = 240;

const ApexChart = dynamic(() => import('react-apexcharts'), {
  loading: () => <ComponentLoader height={CHART_HEIGHT} />,
  ssr: false,
});

const Chart = ({ dataSeries, series, dailyKcal }: Props) => {
  const theme = useTheme();
  const options = {
    chart: {
      type: 'donut',
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: '80%',
          labels: {
            show: true,
            value: {
              offsetY: 2,
              color: theme.palette.text.primary,
            },
            total: {
              show: true,
              showAlways: true,
              color: theme.palette.text.secondary,
              formatter: () => `${dailyKcal} kcal`,
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: false,
    },
    legend: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
    labels: Object.keys(dataSeries).map(key => capitalize(key)),
    states: {
      hover: {
        filter: {
          type: 'none',
        },
      },
    },
    colors: Object.values(COLORS),
  } as const;
  return (
    <ApexChart
      type="donut"
      options={options}
      series={series}
      height={CHART_HEIGHT}
      width="100%"
    />
  );
};

export default Chart;
