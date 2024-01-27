'use client';

import { useTheme } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import Typography from '@mui/material/Typography';
import Card from '@/components/card';
import ComponentLoader from '@/components/component-loader';
import { StackProps, alpha } from '@mui/material';

const CHART_HEIGHT = 320;

const ApexChart = dynamic(() => import('react-apexcharts'), {
  loading: () => <ComponentLoader height={CHART_HEIGHT} />,
  ssr: false,
});

type Props = {
  dailyCalorieIntake: number;
  dataset: { eaten: number; date: string }[];
} & StackProps;

const KcalChart = ({ dataset, dailyCalorieIntake, ...other }: Props) => {
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
          borderColor: theme.palette.accent.main,
          label: {
            borderColor: theme.palette.accent.main,
            style: {
              color: theme.palette.accent.contrastText,
              background: theme.palette.accent.main,
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
    <Card {...other}>
      <Typography variant="h6">Calories</Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Goal {dailyCalorieIntake} kcal / day
      </Typography>
      <ApexChart
        type="bar"
        options={options}
        series={series}
        height={CHART_HEIGHT}
        width="100%"
      />
    </Card>
  );
};

export default KcalChart;
