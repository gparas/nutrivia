import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Card from '@/components/card';
import { getNutrientsData } from '@/lib/utils';

interface Props {
  dailyCalorieIntake: number;
  dataset: { eaten: number }[];
  nutritionDataset: { id: string; label: string; value: number }[];
}

const KcalOverview = ({
  dataset,
  dailyCalorieIntake,
  nutritionDataset,
}: Props) => {
  const totalKcalEaten = Math.floor(
    dataset.reduce((acc, cur) => acc + cur.eaten, 0) / dataset.length,
  );
  const totalKcalIntake = dailyCalorieIntake;
  const kcalDiff = totalKcalEaten - totalKcalIntake;
  const nutrientsData = getNutrientsData(totalKcalIntake);
  return (
    <Card height={'100%'}>
      <Typography variant="h6" fontWeight={500} mb={2}>
        Overview
      </Typography>
      <Typography variant="h3" mb={0.25}>
        {totalKcalIntake}
        <Typography variant="h6" component="span" fontWeight={400} ml={0.5}>
          kcal
        </Typography>
      </Typography>
      <Typography
        variant="body2"
        color={kcalDiff <= 0 ? 'success.main' : 'error.main'}
        fontWeight={500}
        mb={3}
      >
        {kcalDiff <= 0 ? <span>&darr;</span> : <span>&uarr;</span>}
        {Math.abs(kcalDiff)}{' '}
        <Typography
          variant="inherit"
          color={'text.secondary'}
          component="span"
          fontWeight={400}
        >
          kcal this week
        </Typography>
      </Typography>
      <List disablePadding dense sx={{ mt: 'auto' }}>
        <ListItem disableGutters>
          <ListItemText secondary="calories" />
          <Typography variant="body2" fontWeight={500} component="span">
            {totalKcalEaten} kcal
          </Typography>
        </ListItem>
        {nutritionDataset.map(({ id, label, value }) => {
          const defaultNutrient = nutrientsData.find(
            item => item.id === id,
          )?.gram;
          return (
            <ListItem key={id} disableGutters>
              <ListItemText secondary={`${label}`} />
              <Typography variant="body2" fontWeight={500} component="span">
                {value || 0} / {defaultNutrient} g
              </Typography>
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
};

export default KcalOverview;
