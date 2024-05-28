/*
  Warnings:

  - You are about to drop the column `date` on the `CompletedHabit` table. All the data in the column will be lost.
  - You are about to drop the column `isCompletedDays` on the `Habit` table. All the data in the column will be lost.
  - Added the required column `days` to the `CompletedHabit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CompletedHabit" DROP COLUMN "date",
ADD COLUMN     "days" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Habit" DROP COLUMN "isCompletedDays";
