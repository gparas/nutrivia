import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgressWithLabel from '../circularProgressWithLabel';

interface Props {
  dailyCalorieIntake: number;
  dailyKcalEaten: number;
}

const DailyCalorieIntake = ({ dailyCalorieIntake, dailyKcalEaten }: Props) => {
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
          value={(dailyKcalEaten / dailyCalorieIntake) * 100}
        >
          <Typography
            variant="h4"
            component="div"
            textAlign="center"
            lineHeight={1}
          >
            {dailyCalorieIntake - dailyKcalEaten}
            <br />
            <Typography variant="overline" fontSize={11}>
              kcal left
            </Typography>
          </Typography>
        </CircularProgressWithLabel>
      </Box>
    </Stack>
  );
};

export default DailyCalorieIntake;
