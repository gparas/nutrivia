'use client';

import { useTheme } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import Card from '@/components/card';
import Typography from '@mui/material/Typography';
import ComponentLoader from '@/components/component-loader';
import Grid from '@mui/material/Grid';
import { Tables } from '@/types/supabase';

const CHART_HEIGHT = 320;

const ApexChart = dynamic(() => import('react-apexcharts'), {
  loading: () => <ComponentLoader height={CHART_HEIGHT} />,
  ssr: false,
});

interface Props {
  nutrientsData: {
    id: string;
    value: number;
    color: 'carbs' | 'protein' | 'fat';
    label: string;
    kcal: number;
    gram: number;
  }[];
  food: Tables<'foods'>;
}

type Nutrients = {
  carbs: number;
  protein: number;
  fat: number;
};

const NutrientsIntake = ({ nutrientsData, food }: Props) => {
  const theme = useTheme();

  const food_nutrients = nutrientsData.map(({ id, label }) => {
    const value =
      id === 'fat'
        ? ((food.fat * 9) / food.kcal) * 100
        : ((food[id as keyof Nutrients] * 4) / food.kcal) * 100;
    return {
      label,
      value: Math.floor(value),
    };
  });

  const series = nutrientsData.map(data => data.value);
  const series2 = food_nutrients.map(({ value }) => value);
  const options = {
    chart: {
      type: 'donut',
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
      },
    },
    legend: {
      position: 'left',
      markers: {
        offsetX: -4,
      },
      labels: {
        colors: nutrientsData.map(() => theme.palette.text.secondary),
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: false,
    },
    tooltip: {
      y: {
        formatter: function (value: number) {
          return value + '%';
        },
      },
    },
    colors: nutrientsData.map(data => theme.palette[data.color].main),
  } as const;
  return (
    <Card>
      <Typography variant="h6" mb={3}>
        Nutrients Intake
      </Typography>
      <Grid container spacing={2} mb={1}>
        <Grid item sm={6} xs={12}>
          <ApexChart
            type="donut"
            options={{
              ...options,
              labels: nutrientsData.map(
                data => `${data.value}% ${data.label}`,
              ) as string[],
              title: {
                text: 'Goal Intake',
                margin: -8,
                style: {
                  fontSize: '15px',
                  fontWeight: 400,
                  color: 'currentColor',
                },
              },
            }}
            series={series}
            height={CHART_HEIGHT}
            width="100%"
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <ApexChart
            type="donut"
            options={{
              ...options,
              labels: food_nutrients.map(
                data => `${data.value}% ${data.label}`,
              ) as string[],
              title: {
                text: 'Your Intake',
                margin: -8,
                style: {
                  fontSize: '15px',
                  fontWeight: 400,
                  color: 'currentColor',
                },
              },
            }}
            series={series2}
            height={CHART_HEIGHT}
            width="100%"
          />
        </Grid>
      </Grid>
    </Card>
  );
};

export default NutrientsIntake;
