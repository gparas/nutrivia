type NutrientsData = {
  id: string;
  gram: number;
}[];

type Meal = {
  carbs: number;
  fat: number;
  protein: number;
};

export const getnutrientsDataset = (nutrientsData: NutrientsData, meal: Meal) =>
  nutrientsData.map(data => {
    return {
      eaten: meal[data.id as keyof Meal],
      recommended: data.gram,
      nutrient: data.id,
    };
  });
