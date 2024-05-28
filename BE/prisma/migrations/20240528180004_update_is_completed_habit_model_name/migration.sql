/*
  Warnings:

  - You are about to drop the `CompletedHabit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CompletedHabit" DROP CONSTRAINT "CompletedHabit_habitId_fkey";

-- DropForeignKey
ALTER TABLE "CompletedHabit" DROP CONSTRAINT "CompletedHabit_studiesId_fkey";

-- DropTable
DROP TABLE "CompletedHabit";

-- CreateTable
CREATE TABLE "IsCompletedHabit" (
    "id" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "days" JSONB NOT NULL,
    "habitId" TEXT NOT NULL,
    "studiesId" TEXT NOT NULL,

    CONSTRAINT "IsCompletedHabit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "IsCompletedHabit" ADD CONSTRAINT "IsCompletedHabit_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "Habit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IsCompletedHabit" ADD CONSTRAINT "IsCompletedHabit_studiesId_fkey" FOREIGN KEY ("studiesId") REFERENCES "Studies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
