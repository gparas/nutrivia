import dayjs from 'dayjs';
import { Tables } from '@/types/supabase';
import { ACTIVITY_FACTOR } from './constants';
import { Profile } from '@/types/profile';

export const getYearsOld = (age: number | null | undefined) => {
  if (!age) return 30;

  return dayjs().diff(dayjs().year(age), 'year');
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

export const getNutrientsData = (dailyCalorieIntake: number) => {
  return [
    {
      id: 'carbs',
      value: 45,
      label: 'Carbs',
      color: 'carbs',
      kcal: Math.ceil(dailyCalorieIntake * 0.45),
      gram: Math.ceil((dailyCalorieIntake * 0.45) / 4),
    },
    {
      id: 'protein',
      value: 25,
      label: 'Protein',
      color: 'protein',
      kcal: Math.ceil(dailyCalorieIntake * 0.25),
      gram: Math.ceil((dailyCalorieIntake * 0.25) / 4),
    },
    {
      id: 'fat',
      value: 30,
      label: 'Fat',
      color: 'fat',
      kcal: Math.ceil(dailyCalorieIntake * 0.3),
      gram: Math.ceil((dailyCalorieIntake * 0.3) / 9),
    },
  ];
};

type DailyKcal =
  | {
      meals: {
        kcal: number;
      } | null;
    }[]
  | null;

export const getDailyKcal = (data: DailyKcal) => {
  if (!data || !data.length) return 0;

  return data.reduce((acc, cur) => acc + cur.meals?.kcal!, 0);
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
