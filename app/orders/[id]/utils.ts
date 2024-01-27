import { Tables } from "@/types/supabase";

type NutrientsData = {
  id: string;
  gram: number;
}[];

type Meal =  Tables<'foods'>;

export const getNutrientsDataset = (nutrientsData: NutrientsData, meal: Meal) =>
  nutrientsData.map(data => {
    return {
      id: data.id,
      eaten: Number(meal[data.id as keyof Meal]),
      recommended: Number(data.gram),
      label: data.id,
    };
  });
