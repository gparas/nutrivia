'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createClient } from '@/supabase/server';
import { Kyc as KycTypes } from '@/types/kyc';

export async function createKyc(data: KycTypes) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    await supabase
      .from('kyc')
      .insert({ ...data, user_id: user.id })
      .then(() => revalidatePath('/'))
      .then(() => redirect('/'));
  }
}
