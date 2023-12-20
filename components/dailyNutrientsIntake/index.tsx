import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@/components/card';
import { Tables } from '@/types/supabase';
import { getNutrientsData } from '@/lib/utils';
import Progress from './progress';

type Color = 'carbs' | 'protein' | 'fat';

type DiaryWithMeals =
  | { meals: { carbs: number; protein: number; fat: number } | null }[]
  | null;

interface Props {
  profile: Tables<'profiles'>;
  diaryWithMeals: DiaryWithMeals;
}

const DailyNutrientsIntake = ({ profile, diaryWithMeals }: Props) => {
  const nutrients = getNutrientsData(profile);
  return (
    <Card direction={{ xs: 'row', sm: 'column' }} spacing={3} p={3}>
      {nutrients.map(({ id, color, gram, label }) => {
        let value = 0;
        if (diaryWithMeals && diaryWithMeals.length) {
          value = diaryWithMeals.reduce(
            (acc, cur) => acc + cur.meals![id as keyof DiaryWithMeals],
            0,
          );
        }
        return (
          <Box key={id} width="100%">
            <Typography variant="body2" fontWeight="medium" mb={0.5}>
              {label}
            </Typography>
            <Progress color={color as Color} value={(value / gram) * 100} />
            <Typography variant="caption" fontWeight="bold">
              {value}{' '}
              <Typography variant="caption" color="text.secondary">
                / {gram} g
              </Typography>
            </Typography>
          </Box>
        );
      })}
    </Card>
  );
};

export default DailyNutrientsIntake;
