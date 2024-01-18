import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Card from '@/components/card';
import LinearProgress from '@/components/linear-progress';
import { Tables } from '@/types/supabase';

type Food = Tables<'foods'>;

interface Props {
  recommendedKcal: number;
  food: Food;
  nutrientsData: {
    id: string;
    label: string;
    color: 'carbs' | 'protein' | 'fat';
    kcal: number;
    gram: number;
  }[];
}

const Intake = ({ recommendedKcal, food, nutrientsData }: Props) => {
  return (
    <Card>
      <Typography variant="h6" fontWeight={500} mb={2}>
        Intake
      </Typography>
      <Box mb={2}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="overline" color="text.secondary">
            Kcal
          </Typography>
          <Typography
            variant="overline"
            color="text.secondary"
            fontWeight={500}
          >
            {food.kcal} / {recommendedKcal} kcal
          </Typography>
        </Stack>
        <LinearProgress value={(Number(food.kcal) / recommendedKcal) * 100} />
      </Box>
      {nutrientsData.map(item => {
        const food_grams = Number(food[item.id as keyof Food]);
        return (
          <Box key={item.id} mb={2}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="overline" color="text.secondary">
                {item.label}
              </Typography>
              <Typography
                variant="overline"
                color="text.secondary"
                fontWeight={500}
              >
                {food_grams} / {item.gram} g
              </Typography>
            </Stack>
            <LinearProgress value={(food_grams / item.gram) * 100} />
          </Box>
        );
      })}
    </Card>
  );
};

export default Intake;
