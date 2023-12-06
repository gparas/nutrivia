'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';

export async function submit(prevState: any, formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const data = Object.fromEntries(formData);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { message: 'User not found' };
  }

  try {
    await supabase.from('profiles').update(data).eq('id', user.id);
    revalidatePath('/profile');
    return { message: 'Successfully updated' };
  } catch (e) {
    return { message: 'Failed to update' };
  } finally {
    return { message: 'close' };
  }
}
