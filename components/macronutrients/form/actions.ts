'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';

export async function updateProfile(
  prevState: {
    status: string;
  },
  formData: FormData,
) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const data = Object.fromEntries(formData);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { status: 'error' };
  }
  
  try {
    await supabase.from('profiles').update(data).eq('id', user.id);
    revalidatePath(`/nutritionist/clients/${user.id}`);
    return { status: 'success' };
  } catch (error) {
    return { status: 'error' };
  }

}
