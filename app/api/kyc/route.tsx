import { NextApiRequest, NextApiResponse } from 'next';
import { auth } from '@/auth/config';
import prisma from '@/prisma/client';
import schema from './schema';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const session = await auth(req, res);

  if (!session) return res.status(401).json('You must be logged in.');

  const validation = schema.safeParse(req.body);

  if (!validation.success) return res.status(400).json(validation.error.errors);

  const user = await prisma.user.findUnique({
    where: { email: session.user!.email! },
  });

  if (!user) return res.status(400).json('Invalid user.');

  const newKyc = await prisma.kyc.create({
    data: {
      goal: req.body.goal,
      gender: req.body.gender,
      height: req.body.height,
      weight: req.body.weight,
      activity: req.body.activity,
      diet: req.body.diet,
      assignedToUser: { connect: { email: user.email! } },
    },
  });

  return res.status(201).json(newKyc);
}
