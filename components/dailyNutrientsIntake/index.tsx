import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
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
    <Stack direction="row" justifyContent="space-around">
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
          <Box key={id} width="20%">
            <Typography variant="overline" mb={0.5}>
              {label}
            </Typography>
            <Progress value={(value / gram) * 100} />
            <Typography variant="caption">
              {gramsLeft}g <Typography variant="caption">left</Typography>
            </Typography>
          </Box>
        );
      })}
    </Stack>
  );
};

export default DailyNutrientsIntake;
