import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
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
    <Grid container spacing={2} justifyContent="space-around">
      {nutrients.map(({ id, gram, label }) => {
        let value = 0;
        if (diaryWithMeals && diaryWithMeals.length) {
          value = diaryWithMeals.reduce(
            (acc, cur) => acc + cur.meals![id as keyof DiaryWithMeals],
            0,
          );
        }
        return (
          <Grid item key={id} xs={3}>
            <Typography variant="overline" mb={0.5}>
              {label}
            </Typography>
            <Progress value={(value / gram) * 100} />
            <Typography variant="caption">
              {gram - value}g <Typography variant="caption">left</Typography>
            </Typography>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default DailyNutrientsIntake;
