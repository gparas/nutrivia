'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import { redirect } from 'next/navigation';

export async function addMeal(formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const data = Object.fromEntries(formData);

  try {
    await supabase.from('meals').upsert(data);
    revalidatePath('/');
  } catch (error) {
    console.log(error);
  } finally {
    redirect('/');
  }
}
