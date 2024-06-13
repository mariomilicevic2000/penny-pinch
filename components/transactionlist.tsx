"use client"
import React, { useEffect, useState } from 'react';
import ExpenseCard from './expensecard';
import { Transaction } from '@/types';

const TransactionList = () => {
  const [income, setIncome] = useState<Transaction[]>([]);
  const [expenses, setExpenses] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('/api/fetchtrans');
        const data: Transaction[] = await response.json();
        setIncome(data.filter(transaction => transaction.type === 'INCOME'));
        setExpenses(data.filter(transaction => transaction.type === 'EXPENSE'));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

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
};

export default TransactionList;
