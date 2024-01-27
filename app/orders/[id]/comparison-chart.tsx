'use client';

import { useTheme } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import Typography from '@mui/material/Typography';
import Card from '@/components/card';
import ComponentLoader from '@/components/component-loader';

const CHART_HEIGHT = 320;

const ApexChart = dynamic(() => import('react-apexcharts'), {
  loading: () => <ComponentLoader height={CHART_HEIGHT} />,
  ssr: false,
});

interface Props {
  dataset: {
    id: string;
    eaten: number;
    recommended: number;
    label: string;
  }[];
}

const ComparisonChart = ({ dataset }: Props) => {
  const theme = useTheme();

  const valueFormatter = (value: number) => `${value} g`;

  const chartLabelsColors = [...Array(dataset.length).keys()].map(
    () => theme.palette.text.secondary,
  );

  const series = [
    {
      name: 'Your intake',
      data: dataset.map(item => {
        return {
          x: item.label,
          y: item.eaten,
          goals: [
            {
              name: 'Goal intake',
              value: item.recommended,
              strokeHeight: 2,
              strokeDashArray: 2,
              strokeColor: '#3bcde2',
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
    colors: ['#775DD0'],
    plotOptions: {
      bar: {
        columnWidth: '20%',
      },
    } as const,
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: dataset.map(item => item.label),
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
      width: 3,
      colors: ['transparent'],
    },
    grid: {
      borderColor: theme.palette.action.disabledBackground,
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
        fillColors: ['#775DD0', '#3bcde2'] as string[],
      },
      itemMargin: {
        horizontal: 8,
      },
    } as const,
    tooltip: {
      shared: true,
      intersect: false,
      theme: theme.palette.mode,
      y: {
        formatter: valueFormatter,
      },
    },
  };

  return (
    <Card mb={2}>
      <Typography variant="h6" mb={3}>
        Nutrients comparison
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

export default ComparisonChart;
