import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CircularProgressWithLabel from '../circularProgressWithLabel';

interface Props {
  dailyCalorieIntake: number;
  dailyKcalBurned: number;
  dailyKcalEaten: number;
}

const DailyCalorieIntake = async ({
  dailyCalorieIntake,
  dailyKcalEaten,
  dailyKcalBurned,
}: Props) => {
  const totalDailyCalorieIntake = dailyCalorieIntake + dailyKcalBurned;

  return (
    <Grid container alignItems="center" mb={2}>
      <Grid item xs={4}>
        <Typography
          variant="h5"
          component="div"
          textAlign="center"
          lineHeight={1}
        >
          {dailyKcalEaten}
          <br />
          <Typography variant="overline" fontSize={11}>
            eaten
          </Typography>
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <CircularProgressWithLabel
          value={(dailyKcalEaten / totalDailyCalorieIntake) * 100}
        >
          <Typography
            variant="h4"
            component="div"
            textAlign="center"
            lineHeight={1}
          >
            {totalDailyCalorieIntake - dailyKcalEaten}
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
          {dailyKcalBurned}
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
