import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { getNutrientsData } from '@/lib/utils';
import Progress from './progress';

type Meals =
  | { foods: { carbs: number; protein: number; fat: number } | null }[]
  | null;

interface Props {
  totalDailyCalorieIntake: number;
  meals: Meals;
}

const DailyNutrientsIntake = ({ totalDailyCalorieIntake, meals }: Props) => {
  const nutrients = getNutrientsData(totalDailyCalorieIntake);
  return (
    <Grid container spacing={2} justifyContent="space-around">
      {nutrients.map(({ id, gram, label }) => {
        let value = 0;
        if (meals && meals.length) {
          value = meals.reduce(
            (acc, cur) => acc + cur.foods![id as keyof Meals],
            0,
          );
        }
        const gramsDiff = gram - value;
        const gramsLeft = gramsDiff > 0 ? gramsDiff : 0;
        return (
          <Grid item key={id} xs={3}>
            <Typography variant="overline" mb={0.5}>
              {label}
            </Typography>
            <Progress value={(value / gram) * 100} />
            <Typography variant="caption">
              {gramsLeft}g <Typography variant="caption">left</Typography>
            </Typography>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default DailyNutrientsIntake;
