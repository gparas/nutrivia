import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import Typography from '@mui/material/Typography';
import FireIcon from '@mui/icons-material/LocalFireDepartment';
import Card from '@/components/card';
import CircularProgressWithLabel from '@/components/circularProgressWithLabel';
import { getDailyCalorieIntake } from '@/lib/utils';

const Caloriebalance = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data } = await supabase.from('profiles').select();

  if (!data || !data.length) return null;

  const dailyCalorieIntake = getDailyCalorieIntake(data[0]);

  return (
    <Card height="100%" alignItems="center">
      <CircularProgressWithLabel value={50}>
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
        1384{' '}
        <Typography variant="caption">/ {dailyCalorieIntake} kcal</Typography>
      </Typography>
    </Card>
  );
};

export default Caloriebalance;
