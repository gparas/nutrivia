import { Tables } from "@/types/supabase";
import dayjs from "dayjs";
import { getWeekdays } from "@/lib/utils";

export const getWaterDataset = (water: Tables<'water'>[] | null) => {
  const days = getWeekdays();
  return days.reverse().map(day => {
    const liter = water?.find(({ created_at }) => created_at === day)?.liter;
    return {
      liter: Number(liter) || 0,
      date: dayjs(day).format('YYYY-MM-DD'),
    };
  });
};
