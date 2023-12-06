import dayjs from 'dayjs';
import { Profile } from '@/types/profile';

export const getYearsOld = (age: number | null) => {
  if (!age) return 30;

  return dayjs().diff(dayjs().year(age), 'year');
};

export const getDailyCalorieIntake = (data: Profile) => {
  const { gender, age, weight, target_weight, height } = data;
  if (!weight || !height || !age) return;
  const yearsOld = getYearsOld(age);
  const goalWeight = target_weight || weight;
  const bmrBase =
    10 * Number(goalWeight) + 6.25 * Number(height) - 5 * yearsOld;
  const bmr = gender === 'male' ? bmrBase + 5 : bmrBase - 161;
  return Math.ceil(bmr);
};
