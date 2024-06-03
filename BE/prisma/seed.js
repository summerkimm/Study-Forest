import { PrismaClient } from "@prisma/client";
import { Habit } from "./mock.js";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await prisma.studies.deleteMany();
  await prisma.habit.deleteMany();
  await prisma.isCompletedHabit.deleteMany();
  await prisma.reaction.deleteMany();
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
