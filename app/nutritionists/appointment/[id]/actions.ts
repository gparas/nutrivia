'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import { redirect } from 'next/navigation';

export async function updateNutritionistId(nutritionist_id: string) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    await supabase
      .from('profiles')
      .update({ nutritionist_id })
      .eq('id', user.id)
      .then(() => revalidatePath('/'))
      .then(() => redirect('/'));
  }
}
