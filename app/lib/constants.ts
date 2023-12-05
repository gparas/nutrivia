export const PROFILE = {
  height: {
    min: 40,
    max: 220,
    unit: 'cm',
  },
  weight: {
    min: 40,
    max: 200,
    unit: 'kg',
  },
  age: {
    min: 20,
    max: 100,
    unit: 'yo',
  },
  initialData: {
    goal: null,
    gender: null,
    height: '',
    weight: '',
    target_weight: '',
    age: null,
    activity: null,
    food_preference: null,
  },
};

export const ACTIVITY_FACTOR = {
  low: 1.2,
  moderate: 1.375,
  high: 1.55,
  intense: 1.725,
};

export const KG_PER_MONTH = 2;
