'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prisma from '@/prisma/client';

export async function createKyc(prevState: any) {
  const { data, userId } = prevState;

  try {
    await prisma.kyc.create({ data: { ...data, userId } });
    revalidatePath('/');
  } catch (error) {
    console.error(error);
  } finally {
    redirect('/');
  }
}
