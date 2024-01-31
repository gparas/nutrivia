'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import dayjs from 'dayjs';

export async function insertWeightIntake(
  prevState: {
    status: string;
  },
  formData: FormData,
) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: weight } = await supabase
    .from('weights')
    .select('id')
    .eq('created_at', dayjs().format('YYYY-MM-DD'))
    .single();

  if (!user) {
    return { status: 'error' };
  }

  const rawFormData = {
    id: weight?.id,
    kg: Number(formData.get('weight')),
    user_id: user.id,
  };

  try {
    await supabase.from('weights').upsert(rawFormData);
    revalidatePath('/');
    return { status: 'success' };
  } catch (error) {
    return { status: 'error' };
  }
}
