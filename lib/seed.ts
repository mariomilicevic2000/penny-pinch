const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create some users
  const user1 = await prisma.user.create({
    data: {
      id: 'user1',
      email: 'user1@example.com',
      name: 'User One',
      password: 'password1',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      id: 'user2',
      email: 'user2@example.com',
      name: 'User Two',
      password: 'password2',
    },
  });

  // Create transactions for user1
  await prisma.transaction.createMany({
    data: [
      {
        id: 'txn1',
        amount: 1000.0,
        date: new Date(),
        description: 'Salary Payment',
        type: 'INCOME',
        incometype: 'SALARY',
        userId: user1.id,
      },
      {
        id: 'txn2',
        amount: 150.0,
        date: new Date(),
        description: 'Groceries',
        type: 'EXPENSE',
        expensetype: 'GROCERIES',
        userId: user1.id,
      },
      {
        id: 'txn3',
        amount: 200.0,
        date: new Date(),
        description: 'Utilities Bill',
        type: 'EXPENSE',
        expensetype: 'UTILITIES',
        userId: user1.id,
      },
    ],
  });

  // Create transactions for user2
  await prisma.transaction.createMany({
    data: [
      {
        id: 'txn4',
        amount: 2000.0,
        date: new Date(),
        description: 'Freelance Payment',
        type: 'INCOME',
        incometype: 'BONUS',
        userId: user2.id,
      },
      {
        id: 'txn5',
        amount: 500.0,
        date: new Date(),
        description: 'Car Loan Payment',
        type: 'EXPENSE',
        expensetype: 'LOAN',
        userId: user2.id,
      },
      {
        id: 'txn6',
        amount: 300.0,
        date: new Date(),
        description: 'Concert Tickets',
        type: 'EXPENSE',
        expensetype: 'ENTERTAINMENT',
        userId: user2.id,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
