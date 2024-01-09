export type Macronutrients = {
  id: string;
  value: number;
  color: 'carbs' | 'protein' | 'fat';
  label: string;
  kcal: number;
  gram: number;
}[];
