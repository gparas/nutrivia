'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { doc, setDoc } from 'firebase/firestore';
import db from '@/firebase/db';

export async function createKyc(prevState: any, formData: FormData) {
  const obj = Object.fromEntries(formData);
  try {
    await setDoc(doc(db, 'kyc', prevState.userId), {
      ...prevState.data,
      ...obj,
    });
    revalidatePath('/');
  } catch (error) {
    console.error(error);
  } finally {
    redirect('/');
  }
}
