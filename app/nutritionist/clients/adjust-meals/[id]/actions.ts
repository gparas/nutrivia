'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import { Meals } from '@/types/meals';

export async function updateProfile(data: Meals) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const path = `/nutritionist/clients/${user.id}`
    await supabase
      .from('profiles')
      .update(data)
      .eq('id', user.id)
      .then(() => revalidatePath(path))
      .then(() => redirect(path));
  }
}
