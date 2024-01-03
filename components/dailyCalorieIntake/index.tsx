import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
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
    <Stack direction="row" alignItems="center" mb={2}>
      <Box textAlign="center" flex="1 1 auto">
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
      </Box>
      <Box textAlign="center" flex="1 1 auto">
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
      </Box>
      <Box textAlign="center" flex="1 1 auto">
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
      </Box>
    </Stack>
  );
};

export default DailyCalorieIntake;
