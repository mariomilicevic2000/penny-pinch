// components/ExpenseCard.tsx
import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { TRANSACTIONTYPES, EXPENSETYPES, INCOMETYPES } from "@prisma/client";

interface ExpenseCardProps {
  transaction: {
    id: string;
    type: TRANSACTIONTYPES;
    amount: number;
    date: string | Date;
    description: string;
    expensetype?: EXPENSETYPES;
    incometype?: INCOMETYPES;
  };
}


const ExpenseCard: React.FC<ExpenseCardProps> = ({ transaction }) => {
  const isIncome = transaction.type === "INCOME";
  const TransactionIcon = isIncome ? FaArrowUp : FaArrowDown;
  const transactionTypeLabel = isIncome ? "Income" : "Expense";
  const category = isIncome ? transaction.incometype : transaction.expensetype;
  const formattedDate = new Date(transaction.date).toLocaleDateString();
  const formattedAmount = transaction.amount.toFixed(2);
  const description = transaction.description;

  return (
    <Card className="max-w-full" key={transaction.id}>
      <CardHeader className="flex gap-3">
        <TransactionIcon
          className={`h-8 w-8 ${
            isIncome ? "text-green-500" : "text-red-500"
          }`}
        />
        <div className="flex flex-col">
          <p className="text-md">{category}</p>
          <p className="text-small text-default-500">{formattedDate}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>€{formattedAmount}</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <p>{description}</p>
      </CardFooter>
    </Card>
  );
};

export default ExpenseCard;
