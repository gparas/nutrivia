import dayjs from 'dayjs';
import { KG_PER_MONTH } from '@/lib/constants';
import { getDailyCalorieIntake } from '@/lib/utils';
import { Profile } from '@/types/profile';

export const getWeightDiff = (data: Profile): number => {
  const { weight, target_weight } = data;
  const weightDiff = Number(weight) - Number(target_weight);
  return Math.abs(weightDiff);
};

export const getOverviewTitle = (data: Profile): string => {
  const { goal } = data;
  if (goal === 'maintain_weight') {
    return 'Get your personalized health plan';
  }
  const weightDiff = getWeightDiff(data);
  const totalMonths = weightDiff / KG_PER_MONTH;
  const date = dayjs().add(totalMonths, 'month').format('MMM D');
  return `You will reach your goal by ${date}`;
};

export const getGoalText = (data: Profile): string => {
  const { goal } = data;
  if (goal === 'maintain_weight') {
    return 'Maintain Weight';
  }
  const weightDiff = getWeightDiff(data);
  if (goal === 'lose_weight') {
    return `Lose ${weightDiff}`;
  }
  return `Gain ${weightDiff}`;
};

export const dailyCalorieIntake = (data: Profile) =>
  getDailyCalorieIntake(data);
