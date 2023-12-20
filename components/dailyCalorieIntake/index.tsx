import { Tables } from '@/types/supabase';
import Typography from '@mui/material/Typography';
import FireIcon from '@mui/icons-material/LocalFireDepartment';
import { getDailyCalorieIntake } from '@/lib/utils';
import Card from '../card';
import CircularProgressWithLabel from '../circularProgressWithLabel';

type DiaryWithMeals = { meals: { kcal: number } | null }[] | null;

interface Props {
  profile: Tables<'profiles'>;
  diaryWithMeals: DiaryWithMeals;
}

const getDailyKcal = (data: DiaryWithMeals) => {
  if (!data || !data.length) return 0;

  return data.reduce((acc, cur) => acc + cur.meals?.kcal!, 0);
};

const DailyCalorieIntake = ({ profile, diaryWithMeals }: Props) => {
  const dailyCalorieIntake = getDailyCalorieIntake(profile);
  const dailyKcal = getDailyKcal(diaryWithMeals);

  return (
    <Card height="100%" alignItems="center">
      <CircularProgressWithLabel value={(dailyKcal / dailyCalorieIntake) * 100}>
        <FireIcon fontSize="large" color="primary" />
      </CircularProgressWithLabel>
      <Typography
        variant="caption"
        color="text.secondary"
        fontWeight="medium"
        display="block"
        mt={0.5}
      >
        Calorie intake
      </Typography>
      <Typography fontWeight="bold" variant="h6" component="div">
        {dailyKcal}{' '}
        <Typography variant="caption">/ {dailyCalorieIntake} kcal</Typography>
      </Typography>
    </Card>
  );
};

export default DailyCalorieIntake;
