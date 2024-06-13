import React, { useEffect, useState } from 'react';
import ExpenseCard from './expensecard';
import prisma from '@/lib/db';
import { TRANSACTIONTYPES } from '@prisma/client';

const dynamic = 'force-dynamic';

// export default function TransactionList() {
//   const [transactions, setTransactions] = useState([]);

//   useEffect(() => {
//     async function fetchTransactions() {
//       try {
//         const response = await fetch('/api/fetchtrans');
//         const data = await response.json();
//         setTransactions(data);
//       } catch (error) {
//         console.error('Error fetching transactions:', error);
//       }
//     }

//     fetchTransactions();
//   }, []);

//   return (
//     <div className="grid grid-cols-1 gap-4">
//       {transactions.map(transaction => (
//         <ExpenseCard transaction={transaction} />
//       ))}
//     </div>
//   );
// }

export default async function TransactionList() {
  
  const income = await prisma.transaction.findMany({
    where: {
      type: TRANSACTIONTYPES.INCOME,
    },
  });

  const expenses = await prisma.transaction.findMany({
    where: {
      type: TRANSACTIONTYPES.EXPENSE,
    },
  });


  return (
    <div className='w-full flex flex-row gap-4'>
      <div className='flex flex-col'>
        <h1 className='text-4xl text-center'>Income</h1>
        <div className='grid grid-cols-1 gap-4'>
          {income.map(transaction => (
            <ExpenseCard transaction={transaction} key={transaction.id}/>
          ))}
        </div>
      </div>
      <div className='flex flex-col'>
        <h1 className='text-4xl text-center'>Expenses</h1>
        <div className='grid grid-cols-1 gap-4'>
          {expenses.map(transaction => (
            <ExpenseCard transaction={transaction} key={transaction.id}/>
          ))}
        </div>
    </div>
  </div>
  );
}
