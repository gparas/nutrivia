'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import { redirect } from 'next/navigation';
import { InitData } from './types';

export async function insertFood(data: InitData, formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const mergeData = { ...data, ...Object.fromEntries(formData) };

  try {
    await supabase.from('foods').upsert(mergeData);
    revalidatePath('/vendor');
  } catch (error) {
    console.log(error);
  } finally {
    redirect('/vendor');
  }
}
