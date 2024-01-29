'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import dayjs from 'dayjs';

export async function insertWaterIntake(data: number) {
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

  if (user) {
    if (water) {
      await supabase
        .from('water')
        .update({ liter: data })
        .eq('id', water.id)
        .then(() => revalidatePath('/'))
        .then(() => redirect('/'));
    } else {
      await supabase
        .from('water')
        .upsert({ liter: data, user_id: user.id })
        .then(() => revalidatePath('/'))
        .then(() => redirect('/'));
    }
  }
}
