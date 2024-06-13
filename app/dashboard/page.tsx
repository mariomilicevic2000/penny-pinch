"use client"
import { title } from "@/components/primitives";
import TransactionList from "@/components/transactionlist";
import AddTransaction from "@/components/addtransaction";
import { Transaction } from "@/types";
import { useState } from "react";

export default function DashboardPage() {
  // Initialize transactions state as an empty array of Transaction
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Handler function to add new transaction to state
  const handleTransactionAdded = (newTransaction: Transaction) => {
    // Use callback form to update state correctly
    setTransactions((prevTransactions: Transaction[]) => [newTransaction, ...prevTransactions]);
  };

  return (
    <div className="w-full flex flex-col">
      <h1 className={title()}>Welcome, User!</h1>
      <div className="w-full flex flex-col md:flex-row m-12">
        {/* Pass handleTransactionAdded function as prop */}
        <AddTransaction onTransactionAdded={handleTransactionAdded}/>
        <TransactionList transactions={transactions}/> {/* Pass transactions as prop */}
      </div>
    </div>
  );
}
