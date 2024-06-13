// pages/api/fetchTransactions.ts

import prisma from '@/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const transactions = await prisma.transaction.findMany();
      res.status(200).json({
        message: 'Successfully fetched transactions',
        status: 200,
        data: transactions
      });
    } catch (error) {
      console.error('Error fetching transactions:', error);
      res.status(500).json({
        message: 'Failed to fetch transactions',
        status: 500
      });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
