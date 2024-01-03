'use client';

import { useTheme } from '@mui/material/styles';
import { BarChart } from '@mui/x-charts/BarChart';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Card from '@/components/card';

interface Props {
  dataset: { eaten: number; burned: number; day: string }[];
}

const KcalChart = async ({ dataset }: Props) => {
  const theme = useTheme();

  const valueFormatter = (value: number) => `${value} kcal`;

  const totalKcalEaten = dataset.reduce((acc, cur) => acc + cur.eaten, 0);
  const totalKcalBurned = dataset.reduce((acc, cur) => acc + cur.burned, 0);

  return (
    <Card
      sx={{ '& div[class*="MuiResponsiveChart-container"]': { flexGrow: 0 } }}
    >
      <Typography variant="h6" mb={3}>
        Calories (kcal)
      </Typography>
      <BarChart
        height={360}
        dataset={dataset}
        margin={{ left: 40, right: 16, bottom: 24 }}
        xAxis={[{ scaleType: 'band', dataKey: 'day' }]}
        series={[
          {
            dataKey: 'eaten',
            label: 'Eaten',
            color: theme.palette.primary.main,
            valueFormatter,
          },
          {
            dataKey: 'burned',
            label: 'Burned',
            color: theme.palette.secondary.main,
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
