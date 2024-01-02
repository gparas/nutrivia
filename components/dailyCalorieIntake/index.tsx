import { Tables } from '@/types/supabase';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { getDailyCalorieIntake } from '@/lib/utils';
import CircularProgressWithLabel from '../circularProgressWithLabel';

type Diary = { meals: { kcal: number } | null }[] | null;

interface Props {
  profile: Tables<'profiles'>;
  diary: Diary;
}

const getDailyKcal = (data: Diary) => {
  if (!data || !data.length) return 0;
  const mealsKcalSum = data.reduce((acc, cur) => acc + cur.meals?.kcal!, 0);

  return mealsKcalSum;
};

const DailyCalorieIntake = ({ profile, diary }: Props) => {
  const dailyCalorieIntake = getDailyCalorieIntake(profile);
  const dailyKcal = getDailyKcal(diary);

  return (
    <Grid container alignItems="center" mb={2}>
      <Grid item xs={4}>
        <Typography
          variant="h5"
          component="div"
          textAlign="center"
          lineHeight={1}
        >
          {dailyKcal}
          <br />
          <Typography variant="overline" fontSize={11}>
            eaten
          </Typography>
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <CircularProgressWithLabel
          value={(dailyKcal / dailyCalorieIntake) * 100}
        >
          <Typography
            variant="h4"
            component="div"
            textAlign="center"
            lineHeight={1}
          >
            {dailyCalorieIntake - dailyKcal}
            <br />
            <Typography variant="overline" fontSize={11}>
              kcal left
            </Typography>
          </Typography>
        </CircularProgressWithLabel>
      </Grid>
      <Grid item xs={4}>
        <Typography
          variant="h5"
          component="div"
          textAlign="center"
          lineHeight={1}
        >
          {0}
          <br />
          <Typography variant="overline" fontSize={11}>
            burned
          </Typography>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default DailyCalorieIntake;
