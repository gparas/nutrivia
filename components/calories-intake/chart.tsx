'use client';

import { alpha, useTheme } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import ComponentLoader from '@/components/component-loader';

const CHART_HEIGHT = 320;

const ApexChart = dynamic(() => import('react-apexcharts'), {
  loading: () => <ComponentLoader height={CHART_HEIGHT} />,
  ssr: false,
});

interface Props {
  dailyCalorieIntake: number;
  dataset: {
    date: string;
    eaten: number;
  }[];
}

const CaloriesChart = ({ dataset, dailyCalorieIntake }: Props) => {
  const theme = useTheme();

  const valueFormatter = (value: number) => `${value} kcal`;
  const chartLabelsColors = [...Array(dataset.length).keys()].map(
    () => theme.palette.text.secondary,
  );

  const greaterEatenIntake = dataset.reduce(
    (acc, cur) => (cur.eaten > acc ? cur.eaten : acc),
    dataset[0].eaten,
  );

  const series = [
    {
      name: 'Your intake',
      data: dataset.map(({ eaten }) => eaten),
    },
  ];
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    colors: [theme.palette.primary.main] as string[],
    plotOptions: {
      bar: {
        columnWidth: '25%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: 'datetime',
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        datetimeFormatter: {
          day: 'ddd',
        },
        style: {
          colors: chartLabelsColors,
        },
      },
    },
    annotations: {
      yaxis: [
        {
          y: dailyCalorieIntake,
          borderColor: theme.palette.success.main,
          label: {
            borderColor: theme.palette.success.light,
            style: {
              color: theme.palette.success.dark,
              background: theme.palette.success.light,
            },
            text: 'Goal intake',
          },
        },
      ] as object[],
    },
    labels: dataset.map(({ date }) => date),
    yaxis: {
      max:
        greaterEatenIntake > dailyCalorieIntake
          ? greaterEatenIntake
          : dailyCalorieIntake,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: chartLabelsColors,
        },
      },
    },
    grid: {
      borderColor: alpha(theme.palette.text.primary, 0.08),
      strokeDashArray: 4,
    },
    tooltip: {
      shared: true,
      intersect: false,
      theme: theme.palette.mode,
      hideEmptySeries: false,
      x: {
        format: 'dd MMM yy',
      },
      y: {
        formatter: valueFormatter,
      },
    },
  } as const;
  return (
    <ApexChart
      type="bar"
      options={options}
      series={series}
      height={CHART_HEIGHT}
      width="100%"
    />
  );
};

export default CaloriesChart;
