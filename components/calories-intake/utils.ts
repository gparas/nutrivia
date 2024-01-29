import dayjs from 'dayjs';
import { getWeekdays, groupBy } from '@/lib/utils';

type Meals = {
  created_at: string;
  foods: {
    kcal: string;
    carbs: string;
    fat: string;
    protein: string;
  } | null;
}[];

export const getKcalDataset = (meals: Meals) => {
  const mealsGroup = groupBy(meals, i => i.created_at);
  const days = getWeekdays();

  return days.reverse().map(day => {
    const mealsData = Object.keys(mealsGroup).find(key => key === day);
    return {
      eaten: mealsData
        ? Math.ceil(
            mealsGroup[mealsData].reduce(
              (acc, cur) => acc + Number(cur.foods?.kcal),
              0,
            ),
          )
        : 0,
      date: dayjs(day).format('YYYY-MM-DD'),
    };
  });
};
