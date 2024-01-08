'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import { Profile } from '@/types/profile';
import { getDailyCalorieIntake } from '@/lib/utils';

export async function updateProfile(data: Profile) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const kcal_intake = getDailyCalorieIntake(data);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    await supabase
      .from('profiles')
      .update({ ...data, kcal_intake })
      .eq('id', user.id)
      .then(() => revalidatePath('/'))
      .then(() => redirect('/nutritionists'));
  }
}
