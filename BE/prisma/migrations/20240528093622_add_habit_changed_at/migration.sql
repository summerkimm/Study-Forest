/*
  Warnings:

  - You are about to drop the `HabitTracker` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `changedAt` to the `Habit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isCompletedDays` to the `Habit` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "HabitTracker" DROP CONSTRAINT "HabitTracker_studiesId_fkey";

-- AlterTable
ALTER TABLE "Habit" ADD COLUMN     "changedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "isCompletedDays" JSONB NOT NULL;

-- DropTable
DROP TABLE "HabitTracker";

-- DropEnum
DROP TYPE "IsCompletedDays";
