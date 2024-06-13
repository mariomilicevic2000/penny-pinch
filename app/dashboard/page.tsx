"use client";
import React, { useState } from 'react';
import AddTransaction from '@/components/addtransaction';
import TransactionList from '@/components/transactionlist';
import { Transaction } from '@/types';

export const fetchCache = 'force-no-store';

const DashboardPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handleTransactionAdded = (newTransaction: Transaction) => {
    setTransactions(prevTransactions => [newTransaction, ...prevTransactions]);
  };

  const userId = 'user1';

  return (
    <div className="w-full flex flex-col">
      <h1>Welcome, User!</h1>
      <div className="w-full flex flex-col md:flex-row m-12">
        <AddTransaction onTransactionAdded={handleTransactionAdded} />
        {/* Pass transactions as prop to TransactionList */}
        <TransactionList transactions={transactions} userId={userId} />
      </div>
    </div>
  );
};

export default DashboardPage;
