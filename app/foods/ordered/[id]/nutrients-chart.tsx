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
    eaten: number;
    recommended: number;
    nutrient: string;
  }[];
}

const NutrientsChart = ({ dataset }: Props) => {
  const theme = useTheme();

  const valueFormatter = (value: number) => `${value} g`;

  const chartLabelsColors = [...Array(dataset.length).keys()].map(
    () => theme.palette.text.secondary,
  );

  const series = [
    {
      name: 'eaten',
      data: dataset.map(item => item.eaten),
    },
    {
      name: 'recommended',
      data: dataset.map(item => item.recommended),
    },
  ];
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: '20%',
      },
    } as const,
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: dataset.map(item => item.nutrient),
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
      labels: {
        colors: chartLabelsColors,
      },
      markers: {
        radius: 12,
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
    <Card>
      <Typography variant="h6" mb={3}>
        Nutrients intake
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

export default NutrientsChart;
