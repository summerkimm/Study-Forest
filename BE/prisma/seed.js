import { PrismaClient } from '@prisma/client';
import { Reaction } from './mock.js';

const prisma = new PrismaClient();

async function main() {
  await prisma.reaction.deleteMany();

  await prisma.reaction.createMany({
    data: Reaction,
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