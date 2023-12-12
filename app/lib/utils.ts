import dayjs from 'dayjs';
import { Profile } from '@/types/profile';
import { ACTIVITY_FACTOR, NUTRIENT_COLOR } from './constants';

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

export const getNutrientsData = (data: Profile) => {
  const dailyCalorieIntake = getDailyCalorieIntake(data);
  return {
    carbs: {
      label: 'Carbs',
      value: 45,
      color: 'carbs',
      kcal: Math.ceil(dailyCalorieIntake * 0.45),
      gram: Math.ceil((dailyCalorieIntake * 0.45) / 4),
    },
    protein: {
      label: 'Protein',
      value: 25,
      color: 'proteins',
      kcal: Math.ceil(dailyCalorieIntake * 0.25),
      gram: Math.ceil((dailyCalorieIntake * 0.25) / 4),
    },
    fat: {
      label: 'Fat',
      value: 30,
      color: 'fats',
      kcal: Math.ceil(dailyCalorieIntake * 0.3),
      gram: Math.ceil((dailyCalorieIntake * 0.3) / 9),
    },
  };
};
