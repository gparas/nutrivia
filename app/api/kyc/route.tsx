import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import schema from './schema';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(validation.error.errors, {
      status: 400,
    });

  const newKyc = await prisma.kyc.create({
    data: {
      goal: body.goal,
      gender: body.gender,
      height: body.height,
      weight: body.weight,
      activity: body.activity,
      diet: body.diet,
      assignedToUser: { connect: { id: body.userId } },
    },
  });

  return NextResponse.json(newKyc, { status: 201 });
}
