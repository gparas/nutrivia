'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import dayjs from 'dayjs';

export async function insertWaterIntake(
  prevState: {
    status: string;
  },
  formData: FormData,
)  {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: water } = await supabase
    .from('water')
    .select('id')
    .eq('created_at', dayjs().format('YYYY-MM-DD'))
    .single();

    if(!user) {
      return { status: 'error' };
    }

    const rawFormData = {
      id: water?.id,
      liter: Number(formData.get('liter')),
      user_id: user.id,
    }

    try {
      await supabase.from('water').upsert(rawFormData);
      revalidatePath('/');
      return { status: 'success' };
    } catch (error) {
      return { status: 'error' };
    }

}
