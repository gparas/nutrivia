'use client';

import { useTheme } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import ComponentLoader from '@/components/component-loader';
import { capitalize } from '@mui/material';
import { Macronutrients } from '@/types/macronutrients';

interface Props {
  dataSeries: Macronutrients;
  series: number[];
}

const ApexChart = dynamic(() => import('react-apexcharts'), {
  loading: () => <ComponentLoader height={240} />,
  ssr: false,
});

const Chart = ({ dataSeries, series }: Props) => {
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
              formatter: (w: any) =>
                `${w.globals.seriesTotals.reduce(
                  (acc: number, cur: number) => acc + cur,
                  0,
                )} %`,
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
    colors: Object.keys(dataSeries).map(
      key => theme.palette[key as keyof Macronutrients].main,
    ),
  } as const;
  return (
    <ApexChart
      type="donut"
      options={options}
      series={series}
      height={240}
      width="100%"
    />
  );
};

export default Chart;
