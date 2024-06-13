"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { Select, SelectItem } from "@nextui-org/select";
import { expensetypes, incometypes } from "@/lib/data";
import { Input } from "@nextui-org/input";
import { Textarea } from "@nextui-org/input";
import { randomUUID } from "crypto";

export default function AddTransaction({ onTransactionAdded } : any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [transactionType, setTransactionType] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");

  const handleAddTransaction = async () => {
    const userId = "user1"; // Replace with actual user ID retrieval logic
    const date = new Date();
    const id = randomUUID;

    const transactionData = {
      id,
      amount: parseFloat(amount),
      date,
      description,
      type: transactionType,
      userId,
      expensetype: transactionType === "EXPENSE" ? type : null,
      incometype: transactionType === "INCOME" ? type : null,
    };

    try {
      const response = await fetch('/api/posttrans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionData),
      });

      if (!response.ok) {
        throw new Error('Failed to add transaction: ' + response.statusText + ' ' + response.status);
      }
      const newTransaction = await response.json();
      console.log('Transaction added successfully:', newTransaction);
      
      // Update UI immediately
      onTransactionAdded(newTransaction);
      
      onClose();
    } catch (error) {
      console.error('Failed to add transaction:', error);
    }
  };

  return (
    <>
      <Button onPress={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onOpenChange={onClose} size="2xl">
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add transaction
            </ModalHeader>
            <ModalBody>
              <p>Use the options below to add a new transaction to your log!</p>
              <RadioGroup
                label="Select transaction type"
                isRequired
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value)}
              >
                <Radio value="INCOME">Income</Radio>
                <Radio value="EXPENSE">Expense</Radio>
              </RadioGroup>
              {transactionType === "EXPENSE" && (
                <Select
                  label="Select an expense type"
                  placeholder="Select an expense type"
                  className="max-w-xs"
                  onChange={(e) => setType(e.target.value)}
                >
                  {expensetypes.map((expensetype) => (
                    <SelectItem key={expensetype.key} value={expensetype.key}>
                      {expensetype.name}
                    </SelectItem>
                  ))}
                </Select>
              )}
              {transactionType === "INCOME" && (
                <Select
                  label="Select an income type"
                  placeholder="Select an income type"
                  className="max-w-xs"
                  onChange={(e) => setType(e.target.value)}
                >
                  {incometypes.map((incometype) => (
                    <SelectItem key={incometype.key} value={incometype.key}>
                      {incometype.name}
                    </SelectItem>
                  ))}
                </Select>
              )}
              <Input
                type="number"
                label="Enter an amount"
                placeholder="0.00"
                labelPlacement="outside"
                className="max-w-xs"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">€</span>
                  </div>
                }
              />
              <Textarea
                label="Description"
                placeholder="Enter your description"
                className="max-w-xs"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={handleAddTransaction}>
                Add Transaction
              </Button>
            </ModalFooter>
          </>
        </ModalContent>
      </Modal>
    </>
  );
}
