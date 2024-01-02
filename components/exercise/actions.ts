'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import { redirect } from 'next/navigation';
import dayjs from 'dayjs';

export async function submit(formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { title, kcal } = Object.fromEntries(formData);
  const created_at = dayjs().format('YYYY-MM-DD');

  try {
    await supabase.from('exercises').upsert({
      created_at,
      title,
      kcal,
    });
    revalidatePath('/');
  } catch (error) {
    console.log(error);
  } finally {
    redirect('/');
  }
}
