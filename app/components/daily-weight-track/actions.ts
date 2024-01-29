'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import dayjs from 'dayjs';

export async function insertWeightIntake(data: number) {
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

  if (user) {
    if (weight) {
      await supabase
        .from('weights')
        .update({ kg: Number(data.toFixed(1)) })
        .eq('id', weight.id)
        .then(() => revalidatePath('/'))
        .then(() => redirect('/'));
    } else {
      await supabase
        .from('weights')
        .upsert({ kg: Number(data.toFixed(1)), user_id: user.id })
        .then(() => revalidatePath('/'))
        .then(() => redirect('/'));
    }
  }
}
