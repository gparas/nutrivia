import dayjs from 'dayjs';
import { ACTIVITY_FACTOR } from './constants';
import { Profile } from '@/types/profile';
import { Macronutrients } from '@/types/macronutrients';

export const getYearsOld = (age: Profile['age']) => {
  if (!age) return 30;

  return dayjs().diff(dayjs().year(Number(age)), 'year');
};

export const getBMR = (data: Profile) => {
  const { gender, age, weight, height } = data;
  const yearsOld = getYearsOld(age);

  if (gender === 'male') {
    return 5 + 10 * Number(weight) + 6.25 * Number(height) - 5 * yearsOld;
  }
  return 5 + 10 * Number(weight) + 6.25 * Number(height) - 5 * yearsOld - 161;
};

type ActivityFactor = {
  low: number;
  moderate: number;
  high: number;
  intense: number;
};

export const getDailyCalorieIntake = (data: Profile) => {
  if (!data) return 0;
  const { activity, goal } = data;
  const activity_factor = activity
    ? ACTIVITY_FACTOR[activity as keyof ActivityFactor]
    : ACTIVITY_FACTOR.low;

  const bmr = getBMR(data);

  const kcal = Math.ceil(bmr * activity_factor);

  if (goal === 'lose_weight') {
    return kcal - 500;
  }

  if (goal === 'gain_weight') {
    return kcal + 250;
  }

  return kcal;
};

export const getNutrientsData = (
  macronutrients: Macronutrients,
  calories: number,
) => {
  return [
    {
      id: 'carbs',
      value: macronutrients.carbs,
      label: 'Carbs',
      color: 'carbs' as const,
      kcal: Math.floor((calories * macronutrients.carbs) / 100),
      gram: Math.floor((calories * macronutrients.carbs) / 100 / 4),
    },
    {
      id: 'protein',
      value: macronutrients.protein,
      label: 'Protein',
      color: 'protein' as const,
      kcal: Math.floor((calories * macronutrients.protein) / 100),
      gram: Math.floor((calories * macronutrients.protein) / 100 / 4),
    },
    {
      id: 'fat',
      value: macronutrients.fat,
      label: 'Fat',
      color: 'fat' as const,
      kcal: Math.floor((calories * macronutrients.fat) / 100),
      gram: Math.floor((calories * macronutrients.fat) / 100 / 9),
    },
  ];
};

export const getRecommendedMacros = ({
  kcal_intake,
  carbs,
  protein,
  fat,
}: {
  kcal_intake: number | null;
  carbs: number;
  protein: number;
  fat: number;
}) => {
  const kcal = kcal_intake || 0;
  const recommendedCarbs = Math.floor((kcal * carbs) / 100 / 4);
  const recommendedProtein = Math.floor((kcal * protein) / 100 / 4);
  const recommendedFat = Math.floor((kcal * fat) / 100 / 9);

  return {
    recommendedCarbs,
    recommendedProtein,
    recommendedFat,
  };
};

export const priceFormat = (price: number) => {
  const currency = Intl.NumberFormat('en-DE', {
    style: 'currency',
    currency: 'EUR',
    useGrouping: false,
  });
  return currency.format(price);
};

export const groupBy = <T, K extends keyof any>(arr: T[], key: (i: T) => K) =>
  arr.reduce((groups, item) => {
    (groups[key(item)] ||= []).push(item);
    return groups;
  }, {} as Record<K, T[]>);

type Meals = {
  created_at: string;
  foods: {
    kcal: string;
    carbs: string;
    fat: string;
    protein: string;
  } | null;
}[];

export const getWeekdays = () =>
  [...Array(7).keys()].map(key =>
    dayjs().subtract(key, 'days').format('YYYY-MM-DD'),
  );

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
