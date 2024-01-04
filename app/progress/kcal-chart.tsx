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
  dataset: { eaten: number; burned: number; date: string }[];
}

const KcalChart = async ({ dataset }: Props) => {
  const theme = useTheme();

  const valueFormatter = (value: number) => `${value} kcal`;

  const totalKcalEaten = dataset.reduce((acc, cur) => acc + cur.eaten, 0);
  const totalKcalBurned = dataset.reduce((acc, cur) => acc + cur.burned, 0);

  const series = [
    {
      name: 'eaten',
      data: dataset.map(item => item.eaten),
    },
    {
      name: 'burned',
      data: dataset.map(item => item.burned),
    },
  ];
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    colors: [theme.palette.primary.main, theme.palette.secondary.main],
    plotOptions: {
      bar: {
        borderRadius: 2,
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
          cssClass: 'apexcharts-label',
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
          cssClass: 'apexcharts-label',
        },
      },
    },
    stroke: {
      show: true,
      width: 1,
      colors: ['transparent'],
    },
    grid: {
      borderColor: theme.palette.action.disabledBackground,
      strokeDashArray: 4,
    },
    legend: {
      position: 'top',
      colors: [...Array(2).keys()].map(() => theme.palette.text.secondary),
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
      x: {
        format: 'dd MMM yy',
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
        Calories (kcal)
      </Typography>
      <ApexChart
        type="bar"
        options={options}
        series={series}
        height={350}
        width="100%"
      />
      <List sx={{ flex: '1 1 auto' }}>
        <ListItem>
          <Typography variant="body2" flex="1 1 auto" my={0.5}>
            Average calories eaten
          </Typography>
          <Typography variant="body2" fontWeight={500}>
            {Math.floor(totalKcalEaten / dataset.length)} kcal
          </Typography>
        </ListItem>
        <Divider light component="li" variant="middle" />
        <ListItem>
          <Typography variant="body2" flex="1 1 auto" my={0.5}>
            Average calories burned
          </Typography>
          <Typography variant="body2" fontWeight={500}>
            {Math.floor(totalKcalBurned / dataset.length)} kcal
          </Typography>
        </ListItem>
      </List>
    </Card>
  );
};

export default KcalChart;
