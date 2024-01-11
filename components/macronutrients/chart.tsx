'use client';

import { useTheme } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import ComponentLoader from '@/components/component-loader';
import { Macronutrients } from '@/types/macronutrients';

interface Props {
  nutrientsData: Macronutrients;
  chartHeight: number;
}

const ApexChart = dynamic(() => import('react-apexcharts'), {
  loading: () => <ComponentLoader height={300} />,
  ssr: false,
});

const Chart = ({ nutrientsData, chartHeight }: Props) => {
  const theme = useTheme();
  const series = nutrientsData.map(data => data.value);
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
              formatter: (val: string) => `${val} %`,
            },
            total: {
              show: true,
              label: 'Goal',
              color: theme.palette.text.secondary,
              formatter: () =>
                `${nutrientsData.reduce((acc, cur) => acc + cur.kcal, 0)} kcal`,
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
    labels: nutrientsData.map(data => data.label),
    states: {
      hover: {
        filter: {
          type: 'none',
        },
      },
    },
    colors: nutrientsData.map(data => theme.palette[data.color].main),
  } as const;
  return (
    <ApexChart
      type="donut"
      options={options}
      series={series}
      height={chartHeight}
      width="100%"
    />
  );
};

export default Chart;
