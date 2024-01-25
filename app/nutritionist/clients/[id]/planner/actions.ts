'use server';

import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { TablesInsert } from '@/types/supabase';

export async function addMealPlan(formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const data: TablesInsert<'meals_plan'> = {
    id: formData.get('id')?.toString()!,
    day: Number(formData.get('day')),
    category: formData.get('category')?.toString(),
    meal_id: formData.get('meal_id')?.toString(),
    user_id: formData.get('user_id')?.toString(),
  };

  const path = `/nutritionist/clients/${data.user_id}/planner`;
  try {
    await supabase.from('meals_plan').upsert(data);
    revalidatePath(path);
  } catch (error) {
    console.log(error);
  } finally {
    redirect(path);
  }
}
