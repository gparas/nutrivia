'use server';

import { doc, setDoc } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import db from '@/firebase/db';

export async function createKyc(prevState: any) {
  const { data, userId } = prevState;

  try {
    await setDoc(doc(db, 'kyc', userId), { ...data, userId });
    revalidatePath('/');
  } catch (error) {
    console.error(error);
  } finally {
    redirect('/');
  }
}
