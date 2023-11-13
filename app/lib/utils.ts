import dayjs from 'dayjs';
import { KycTypes } from './types';

export const getDailyCalorieIntake = (data: KycTypes) => {
  const { gender, age, weight, target_weight, height } = data;
  if (!weight || !height || !age) return;
  const yearsOld = dayjs().diff(dayjs().year(age), 'year');
  const goalWeight = target_weight || weight;
  const bmrBase =
    10 * Number(goalWeight) + 6.25 * Number(height) - 5 * yearsOld;
  const bmr = gender === 'male' ? bmrBase + 5 : bmrBase - 161;
  return Math.ceil(bmr);
};
