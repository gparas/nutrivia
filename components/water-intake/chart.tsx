'use client';

import { useTheme } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import ComponentLoader from '@/components/component-loader';

const CHART_HEIGHT = 144;

const ApexChart = dynamic(() => import('react-apexcharts'), {
  loading: () => <ComponentLoader height={CHART_HEIGHT} />,
  ssr: false,
});

interface Props {
  dataset: {
    date: string;
    liter: number;
  }[];
}

const WaterChart = ({ dataset }: Props) => {
  const theme = useTheme();

  const series = [
    {
      name: 'Liter',
      data: dataset.map(item => item.liter),
    },
  ];
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
    } as const,
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      type: 'datetime',
      categories: dataset.map(item => item.date),
      labels: {
        show: false,
      },
    } as const,
    yaxis: {
      show: false,
    },
    grid: {
      show: false,
    },
    colors: [theme.palette.info.main],
    tooltip: {
      theme: theme.palette.mode,
      hideEmptySeries: false,
    },
  };
  return (
    <ApexChart
      options={options}
      series={series}
      type="area"
      height={CHART_HEIGHT}
      width={'100%'}
    />
  );
};

export default WaterChart;
