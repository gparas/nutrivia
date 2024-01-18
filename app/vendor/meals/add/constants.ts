import { DAILY_MEALS } from "@/lib/constants";

export const INFO_FIELDS = [
  {
    id: 'name',
    label: 'name',
    required: true,
  },
  {
    id: 'description',
    label: 'Description',
    required: false,
  },
  {
    id: 'category',
    label: 'Category',
    required: true,
    options: DAILY_MEALS,
  },
  {
    id: 'price',
    label: 'Price',
    type: 'number',
    required: true,
  },
];

export const MACROS_FIELDS = [
  {
    id: 'kcal',
    label: 'Calories',
    type: 'number',
    required: true,
  },
  {
    id: 'protein',
    label: 'Protein',
    type: 'number',
    required: false,
  },
  {
    id: 'carbs',
    label: 'Carbs',
    type: 'number',
    required: true,
  },
  {
    id: 'fat',
    label: 'Fat',
    type: 'number',
    required: true,
  },
];
