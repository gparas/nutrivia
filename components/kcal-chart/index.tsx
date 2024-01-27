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

  const series = [
    {
      name: 'Your intake',
      data: dataset.map(item => {
        return {
          x: item.date,
          y: item.eaten,
          goals: [
            {
              name: 'Goal intake',
              value: dailyCalorieIntake,
              strokeHeight: 2,
              strokeDashArray: 2,
              strokeColor: '#3acce1',
            },
          ],
        };
      }),
    },
  ];
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    colors: ['#665eff'],
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
      categories: dataset.map(item => item.date),
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
    } as const,
    yaxis: {
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
    stroke: {
      show: true,
      width: 1,
      colors: ['transparent'],
    },
    grid: {
      borderColor: alpha(theme.palette.text.primary, 0.08),
      strokeDashArray: 4,
    },
    legend: {
      position: 'top',
      show: true,
      showForSingleSeries: true,
      customLegendItems: ['Your intake', 'Goal intake'] as string[],
      labels: {
        colors: chartLabelsColors,
      },
      markers: {
        radius: 12,
        fillColors: ['#665eff', '#3acce1'] as string[],
      },
      itemMargin: {
        horizontal: 8,
      },
    } as const,
    tooltip: {
      shared: true,
      intersect: false,
      theme: theme.palette.mode,
      x: {
        format: 'dd MMM yy',
      },
      y: {
        formatter: valueFormatter,
      },
    },
  };

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
