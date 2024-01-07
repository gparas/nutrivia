type NutrientsData = {
  id: string;
  gram: number;
}[];

type Meal = {
  carbs: number;
  fat: number;
  protein: number;
};

export const getNutrientsDataset = (nutrientsData: NutrientsData, meal: Meal) =>
  nutrientsData.map(data => {
    return {
      id: data.id,
      eaten: meal[data.id as keyof Meal],
      recommended: data.gram,
      label: data.id,
    };
  });
