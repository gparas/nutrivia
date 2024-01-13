import dayjs from 'dayjs';
import { ACTIVITY_FACTOR } from './constants';
import { Profile } from '@/types/profile';
import { Macronutrients } from '@/types/macronutrients';

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

export const getNutrientsData = (macronutrients: Macronutrients, calories: number) => {
  return [
    {
      id: 'carbs',
      value: macronutrients.carbs,
      label: 'Carbs',
      color: 'carbs' as const,
      kcal: Math.floor(calories * macronutrients.carbs / 100),
      gram: Math.floor((calories * macronutrients.carbs / 100) / 4),
    },
    {
      id: 'protein',
      value: macronutrients.protein,
      label: 'Protein',
      color: 'protein' as const,
      kcal: Math.floor(calories * macronutrients.protein / 100),
      gram: Math.floor((calories * macronutrients.protein / 100) / 4),
    },
    {
      id: 'fat',
      value: macronutrients.fat,
      label: 'Fat',
      color: 'fat' as const,
      kcal: Math.floor(calories * macronutrients.fat / 100),
      gram: Math.floor((calories * macronutrients.fat / 100) / 9),
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

export const getKcalDataset = (meals: Meals) => {
  const mealsGroup = groupBy(meals, i => i.created_at);
  const days = getDays();

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

export const getWeightDataset = (
  weights:
    | {
        created_at: string;
        kg: string;
      }[]
    | null,
  current_weight: string | null | undefined,
) => {
  const days = getDays();
  return days.reverse().map(day => {
    const weight = weights?.find(weight => weight.created_at === day)?.kg;
    return {
      weight: Number(weight) || Number(current_weight),
      date: dayjs(day).format('YYYY-MM-DD'),
    };
  });
};

type Water =
  | {
      created_at: string;
      liter: string;
    }[]
  | null;

export const getWaterDataset = (water: Water) => {
  const days = getDays();
  return days.reverse().map(day => {
    const liter = water?.find(({ created_at }) => created_at === day)?.liter;
    return {
      liter: Number(liter) || 0,
      date: dayjs(day).format('YYYY-MM-DD'),
    };
  });
};
