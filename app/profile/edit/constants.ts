import { PROFILE } from '@/lib/constants';

export const FIELDS = {
  goal: PROFILE.goal,
  gender: PROFILE.gender,
  age: PROFILE.age,
  weight: PROFILE.weight,
  target_weight: PROFILE.target_weight,
  height: PROFILE.height,
  food_preference: PROFILE.food_preference,
  activity: PROFILE.activity,
};

export type Fields = {
  name: string;
  label?: string;
  min?: number;
  max?: number;
  unit?: string;
  options?: {
    value: string;
    label: string;
  }[];
};
