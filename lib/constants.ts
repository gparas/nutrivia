export const PROFILE = {
  height: {
    name: 'height',
    label: 'Height',
    min: 40,
    max: 220,
    unit: 'cm',
  },
  weight: {
    name: 'weight',
    label: 'Initial weight',
    min: 40,
    max: 200,
    unit: 'kg',
  },
  target_weight: {
    name: 'target_weight',
    label: 'Target weight',
    min: 40,
    max: 200,
    unit: 'kg',
  },
  age: {
    name: 'age',
    min: 20,
    max: 100,
    unit: 'yo',
  },
  gender: {
    name: 'gender',
    label: 'Gender',
    options: [
      {
        value: 'male',
        label: 'Male',
      },
      {
        value: 'female',
        label: 'Female',
      },
    ],
  },
  goal: {
    name: 'goal',
    label: 'Goal',
    options: [
      {
        value: 'lose_weight',
        label: 'Lose weight',
      },
      {
        value: 'maintain_weight',
        label: 'Maintain weight',
      },
      {
        value: 'gain_weight',
        label: 'Gain weight',
      },
    ],
  },
  activity: {
    name: 'activity',
    label: 'Activity level',
    options: [
      {
        value: 'low',
        label: 'Low',
        helperText: 'Little to no daily activity',
      },
      {
        value: 'moderate',
        label: 'Moderate',
        helperText: 'Light daily activity',
      },
      {
        value: 'high',
        label: 'High',
        helperText: 'Physical activity throughout the day',
      },
      {
        value: 'intense',
        label: 'Intense',
        helperText: 'Physically demanding daily activity',
      },
    ],
  },
  food_preference: {
    name: 'food_preference',
    label: 'Food preference',
    options: [
      {
        value: 'mediterranean',
        label: 'Mediterranean',
      },
      {
        value: 'keto',
        label: 'Keto',
      },
      {
        value: 'vegetarian',
        label: 'Vegetarian',
      },
      {
        value: 'vegan',
        label: 'Vegan',
      },
    ],
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
  low: 1.39,
  moderate: 1.59,
  high: 1.89,
  intense: 2.5,
};

export const DAILY_MEALS = [
  {
    id: 'breakfast',
    iconId: 'breakfast',
    textPrimary: 'Breakfast',
  },
  {
    id: 'lunch',
    iconId: 'lunch',
    textPrimary: 'Lunch',
  },
  {
    id: 'dinner',
    iconId: 'dinner',
    textPrimary: 'Dinner',
  },
  {
    id: 'snack',
    iconId: 'snack',
    textPrimary: 'Snack',
  },
];

export const DAILY_EXTRAS = {
  WATER: {
    id: 'water',
    iconId: 'water',
    textPrimary: 'Water',
    textSecondary: 'Daily water intake',
    href:"/water-intake"
  },
};

export const KG_PER_MONTH = 2;
