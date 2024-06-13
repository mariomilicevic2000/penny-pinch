import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, date, description, type, userId, expensetype, incometype } = body;

    // Debugging: Log the received body
    console.log('Received body:', body);

    if (!amount || !date || !description || !type || !userId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const transaction = await prisma.transaction.create({
      data: {
        amount,
        date: new Date(date),
        description,
        type,
        userId,
        expensetype: expensetype ?? null,
        incometype: incometype ?? null,
      },
    });

    return NextResponse.json(transaction);
  } catch (error) {
    console.error('Failed to add transaction:', error);
    return NextResponse.json({ error: 'Failed to add transaction' }, { status: 500 });
  }
}
