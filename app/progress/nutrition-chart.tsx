'use client';

import { useTheme } from '@mui/material/styles';
import { BarChart } from '@mui/x-charts/BarChart';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Card from '@/components/card';

interface Props {
  dataset: { carbs: number; protein: number; fat: number; day: string }[];
}

const NutritionChart = async ({ dataset }: Props) => {
  const theme = useTheme();

  const valueFormatter = (value: number) => `${value} g`;

  const totalCarbs = dataset.reduce((acc, cur) => acc + cur.carbs, 0);
  const totalProtein = dataset.reduce((acc, cur) => acc + cur.protein, 0);
  const totalFat = dataset.reduce((acc, cur) => acc + cur.fat, 0);

  return (
    <Card>
      <Typography variant="h6" mb={3}>
        Nutrition (g)
      </Typography>
      <BarChart
        height={360}
        dataset={dataset}
        margin={{ left: 32, right: 16, bottom: 24 }}
        xAxis={[{ scaleType: 'band', dataKey: 'day' }]}
        series={[
          {
            dataKey: 'carbs',
            label: 'Carbs',
            color: theme.palette.carbs.main,
            valueFormatter,
          },
          {
            dataKey: 'protein',
            label: 'Proten',
            color: theme.palette.protein.main,
            valueFormatter,
          },
          {
            dataKey: 'fat',
            label: 'Fat',
            color: theme.palette.fat.main,
            valueFormatter,
          },
        ]}
        slotProps={{
          legend: {
            itemMarkWidth: 10,
            itemMarkHeight: 10,
            labelStyle: {
              fontSize: 13,
            },
          },
        }}
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
