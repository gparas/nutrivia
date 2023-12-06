'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import { Profile } from '@/types/profile';

export async function updateProfile(data: Profile) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    await supabase
      .from('profiles')
      .update(data)
      .eq('id', user.id)
      .then(() => revalidatePath('/'))
      .then(() => redirect('/'));
  }
}
