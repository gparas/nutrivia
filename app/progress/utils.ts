import dayjs from 'dayjs';
import { groupBy } from '@/lib/utils';

type Meals = {
  created_at: string;
  foods: {
    kcal: number;
    carbs: number;
    fat: number;
    protein: number;
  } | null;
}[];

type Exercises = {
  created_at: string;
  kcal: string | null;
}[];

const getDays = () => {
  const days = [];
  for (let i = 0; i < 7; i++) {
    days.push(dayjs().subtract(i, 'days').format('YYYY-MM-DD'));
  }
  return days;
};

export const getNutritionDataset = (meals: Meals) => [
  {
    id: 'carbs',
    label: 'carbs',
    value: Math.round(
      meals.reduce((acc, cur) => acc + cur.foods?.carbs!, 0) / meals.length,
    ),
  },
  {
    id: 'protein',
    label: 'protein',
    value: Math.round(
      meals.reduce((acc, cur) => acc + cur.foods?.protein!, 0) / meals.length,
    ),
  },
  {
    id: 'fat',
    label: 'fat',
    value: Math.round(
      meals.reduce((acc, cur) => acc + cur.foods?.fat!, 0) / meals.length,
    ),
  },
];

export const getKcalDataset = (meals: Meals, exercises: Exercises) => {
  const mealsGroup = groupBy(meals, i => i.created_at);
  const exercisesGroup = groupBy(exercises, i => i.created_at);
  const days = getDays();

  return days.reverse().map(day => {
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
      date: dayjs(day).format('YYYY-MM-DD'),
    };
  });
};
