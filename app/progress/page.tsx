import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import dayjs from 'dayjs';
import { groupBy } from '@/lib/utils';
import { notFound } from 'next/navigation';
import Box from '@mui/material/Box';
import KcalChart from './kcal-chart';
import NutritionChart from './nutrition-chart';

const ProgressPage = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: meals } = await supabase
    .from('meals')
    .select(
      `
    created_at,
    foods (
      kcal,
      carbs,
      fat,
      protein
    )
  `,
    )
    .gte('created_at', dayjs().subtract(7, 'days').format('YYYY-MM-DD'))
    .lte('created_at', dayjs().format('YYYY-MM-DD'));

  const { data: exercises } = await supabase
    .from('exercises')
    .select('created_at, kcal')
    .gte('created_at', dayjs().subtract(7, 'days').format('YYYY-MM-DD'))
    .lte('created_at', dayjs().format('YYYY-MM-DD'));

  if (!meals || !exercises) {
    return notFound();
  }

  const mealsGroup = groupBy(meals, i => i.created_at);
  const exercisesGroup = groupBy(exercises, i => i.created_at);

  const days = [];
  for (let i = 0; i < 7; i++) {
    days.push(dayjs().subtract(i, 'days').format('YYYY-MM-DD'));
  }

  const kcalDataset = days.reverse().map(day => {
    const mealsData = Object.keys(mealsGroup).find(key => key === day);
    const exercisesData = Object.keys(exercisesGroup).find(key => key === day);
    return {
      eaten: mealsData
        ? Math.ceil(
            mealsGroup[mealsData].reduce(
              (acc, cur) => acc + Number(cur.foods?.kcal),
              0,
            ),
          )
        : 0,
      burned: exercisesData
        ? Math.ceil(
            exercisesGroup[exercisesData].reduce(
              (acc, cur) => acc + Number(cur.kcal),
              0,
            ),
          )
        : 0,
      day: dayjs(day).format('dd'),
    };
  });

  const nutritionDataset = days.map(day => {
    const mealsData = Object.keys(mealsGroup).find(key => key === day);
    return {
      carbs: mealsData
        ? Math.ceil(
            mealsGroup[mealsData].reduce(
              (acc, cur) => acc + Number(cur.foods?.carbs),
              0,
            ),
          )
        : 0,
      protein: mealsData
        ? Math.ceil(
            mealsGroup[mealsData].reduce(
              (acc, cur) => acc + Number(cur.foods?.protein),
              0,
            ),
          )
        : 0,
      fat: mealsData
        ? Math.ceil(
            mealsGroup[mealsData].reduce(
              (acc, cur) => acc + Number(cur.foods?.fat),
              0,
            ),
          )
        : 0,
      day: dayjs(day).format('dd'),
    };
  });

  return (
    <Box
      display="grid"
      gap={2}
      gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
    >
      <KcalChart dataset={kcalDataset} />
      <NutritionChart dataset={nutritionDataset} />
    </Box>
  );
};

export default ProgressPage;
