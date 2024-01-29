'use client';

import ComponentLoader from '@/components/component-loader';
import { alpha, useTheme } from '@mui/material/styles';
import dynamic from 'next/dynamic';

interface Props {
  dailyCalorieIntake: number;
  dailyKcalEaten: number;
}

const CHART_HEIGHT = 300;

const ApexChart = dynamic(() => import('react-apexcharts'), {
  loading: () => <ComponentLoader height={270} />,
  ssr: false,
});

const KcalIntake = ({ dailyCalorieIntake, dailyKcalEaten }: Props) => {
  const theme = useTheme();
  const options = {
    chart: {
      offsetY: -20,
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: {
          size: '55%',
        },
        track: {
          background: alpha('#fff', 0.2),
        },
        dataLabels: {
          name: {
            fontSize: '14px',
            color: '#fff',
            offsetY: 110,
          },
          value: {
            offsetY: 72,
            fontSize: '20px',
            color: '#fff',
            formatter: function () {
              return dailyCalorieIntake - dailyKcalEaten + ' kcal';
            },
          },
        },
      },
    },
    fill: {
      type: 'solid',
    },
    colors: ['#fff'],
    stroke: {
      dashArray: 3,
    },
    labels: ['Left'],
  };

  return (
    <ApexChart
      type="radialBar"
      options={options}
      series={[(dailyKcalEaten / dailyCalorieIntake) * 100]}
      height={CHART_HEIGHT}
      width="100%"
    />
  );
};

export default KcalIntake;
