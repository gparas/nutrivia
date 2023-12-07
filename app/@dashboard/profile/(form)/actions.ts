'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import { redirect } from 'next/navigation';

export async function submit(formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const data = Object.fromEntries(formData);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  try {
    await supabase.from('profiles').update(data).eq('id', user.id);
    revalidatePath('/profile');
  } catch (error) {
    console.log(error);
  } finally {
    redirect('/profile');
  }
}