import { PROFILE } from '@/lib/constants';

export const FIELDS = {
  gender: PROFILE.gender,
  weight: PROFILE.weight,
  height: PROFILE.height,
  activity: PROFILE.activity,
};

export type Fields = {
  name: string;
  label: string;
  min?: number;
  max?: number;
  unit?: string;
  options?: {
    value: string;
    label: string;
  }[];
};
