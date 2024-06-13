import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const transactions = await prisma.transaction.findMany();
    return NextResponse.json({
      message: 'Successfully fetched transactions',
      status: 200,
      data: transactions,
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json({
      message: 'Failed to fetch transactions',
      status: 500,
    });
  }
}
