import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth/authOptions';
import prisma from '@/prisma/client';
import schema from './schema';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) return NextResponse.json({}, { status: 401 });

  const body = await request.json();

  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, {
      status: 400,
    });

  const user = await prisma.user.findUnique({
    where: { email: session.user!.email! },
  });

  if (!user)
    return NextResponse.json({ error: 'Invalid user.' }, { status: 400 });

  const newKyc = await prisma.kyc.create({
    data: {
      ...body,
      assignedToUser: { connect: { email: user.email! } },
    },
  });

  return NextResponse.json(newKyc, { status: 201 });
}
