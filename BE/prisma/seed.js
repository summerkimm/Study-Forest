import { PrismaClient } from '@prisma/client';
import { Habit } from './mock.js';

const prisma = new PrismaClient();

async function main() {
  await prisma.habit.deleteMany();

  const habitsWithJson = Habit.map(habit => ({
    ...habit,
    isCompletedDays: JSON.stringify(habit.isCompletedDays),
  }));

  await prisma.habit.createMany({
    data: habitsWithJson,
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });