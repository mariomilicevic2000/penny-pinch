-- CreateEnum
CREATE TYPE "EXPENSETYPES" AS ENUM ('UTILITIES', 'GROCERIES', 'RENT', 'LOAN', 'TRANSPORTATION', 'ENTERTAINMENT', 'HEALTHCARE', 'INSURANCE', 'EDUCATION', 'TRAVEL', 'OTHER');

-- CreateEnum
CREATE TYPE "INCOMETYPES" AS ENUM ('SALARY', 'BONUS', 'INTEREST', 'DIVIDEND', 'GIFT', 'RENT', 'OTHER');

-- CreateEnum
CREATE TYPE "TRANSACTIONTYPES" AS ENUM ('INCOME', 'EXPENSE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transaction" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "type" "TRANSACTIONTYPES" NOT NULL,
    "expensetype" "EXPENSETYPES",
    "incometype" "INCOMETYPES",
    "userId" TEXT NOT NULL,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
