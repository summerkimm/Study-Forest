import { PrismaClient } from "@prisma/client";
import { Habit } from "./mock.js";

const prisma = new PrismaClient();

async function main() {
  await prisma.habit.deleteMany();
  await prisma.habit.createMany({
    data: Habit,
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
