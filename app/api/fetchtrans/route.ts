import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { headers } from 'next/headers';

export async function GET() {
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
      data: [],
    });
  }
}
