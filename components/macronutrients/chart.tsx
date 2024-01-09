'use client';

import { useTheme } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import ComponentLoader from '@/components/component-loader';
import { Macronutrients } from '@/types/macronutrients';

interface Props {
  nutrientsData: Macronutrients;
}

const CHART_HEIGHT = 300;

const ApexChart = dynamic(() => import('react-apexcharts'), {
  loading: () => <ComponentLoader height={CHART_HEIGHT} />,
  ssr: false,
});

const Chart = ({ nutrientsData }: Props) => {
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
      height={CHART_HEIGHT}
      width="100%"
    />
  );
};

export default Chart;
