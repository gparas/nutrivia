'use client';

import { useTheme } from '@mui/material/styles';
import dynamic from 'next/dynamic';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Card from '@/components/card';

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
interface Props {
  dataset: { carbs: number; protein: number; fat: number; day: string }[];
}

const NutritionChart = async ({ dataset }: Props) => {
  const theme = useTheme();

  const valueFormatter = (value: number) => `${value} g`;

  const totalCarbs = dataset.reduce((acc, cur) => acc + cur.carbs, 0);
  const totalProtein = dataset.reduce((acc, cur) => acc + cur.protein, 0);
  const totalFat = dataset.reduce((acc, cur) => acc + cur.fat, 0);

  const series = [
    {
      name: 'carbs',
      data: dataset.map(item => item.carbs),
    },
    {
      name: 'protein',
      data: dataset.map(item => item.protein),
    },
    {
      name: 'fat',
      data: dataset.map(item => item.fat),
    },
  ];
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    colors: [
      theme.palette.carbs.main,
      theme.palette.protein.main,
      theme.palette.fat.main,
    ],
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: dataset.map(item => item.day),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          cssClass: 'apexcharts-label',
        },
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          cssClass: 'apexcharts-label',
        },
      },
    },
    stroke: {
      show: true,
      width: 1,
      colors: ['transparent'],
    },
    tooltip: {
      shared: true,
      intersect: false,
      x: {
        show: false,
      },
      y: {
        formatter: valueFormatter,
      },
    },
  };

  return (
    <Card
      sx={{
        '& .apexcharts-label': { fill: theme => theme.palette.text.secondary },
      }}
    >
      <Typography variant="h6" mb={3}>
        Nutrition (g)
      </Typography>
      <ApexChart
        type="bar"
        options={options}
        series={series}
        height={360}
        width="100%"
      />
      <List>
        <ListItem>
          <Typography variant="body2" flex="1 1 auto" my={0.5}>
            Average carbs
          </Typography>
          <Typography variant="body2" fontWeight={500}>
            {Math.floor(totalCarbs / dataset.length)} g
          </Typography>
        </ListItem>
        <Divider light component="li" variant="middle" />
        <ListItem>
          <Typography variant="body2" flex="1 1 auto" my={0.5}>
            Average protein
          </Typography>
          <Typography variant="body2" fontWeight={500}>
            {Math.floor(totalProtein / dataset.length)} g
          </Typography>
        </ListItem>
        <Divider light component="li" variant="middle" />
        <ListItem>
          <Typography variant="body2" flex="1 1 auto" my={0.5}>
            Average fat
          </Typography>
          <Typography variant="body2" fontWeight={500}>
            {Math.floor(totalFat / dataset.length)} g
          </Typography>
        </ListItem>
      </List>
    </Card>
  );
};

export default NutritionChart;
