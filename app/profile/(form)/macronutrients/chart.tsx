'use client';

import { useTheme } from '@mui/material/styles';
import dynamic from 'next/dynamic';

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface Props {
  dailyCalorieIntake: number;
  data: {
    label: string;
    value: number;
    color: string;
  }[];
}

interface Palette {
  carbs: {
    main: string;
  };
  protein: {
    main: string;
  };
  fat: {
    main: string;
  };
}

const Chart = ({ data, dailyCalorieIntake }: Props) => {
  const theme = useTheme();
  const series = data.map(item => item.value);
  const options = {
    plotOptions: {
      radialBar: {
        track: {
          background: theme.palette.action.disabledBackground,
        },
        dataLabels: {
          value: {
            fontSize: '16px',
            color: theme.palette.text.primary,
            offsetY: 8,
          },
          total: {
            show: true,
            fontSize: '14px',
            color: theme.palette.text.primary,
            label: 'Daily Calories',
            formatter: function () {
              return `${dailyCalorieIntake} kcal`;
            },
          },
        },
      },
    },
    stroke: {
      lineCap: 'round',
    },
    labels: data.map(item => item.label),
    colors: data.map(item => theme.palette[item.color as keyof Palette].main),
  } as const;
  return (
    <ApexChart
      options={options}
      series={series}
      type="radialBar"
      height={320}
      width={'100%'}
    />
  );
};

export default Chart;
