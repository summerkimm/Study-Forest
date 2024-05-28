/*
  Warnings:

  - You are about to drop the column `studyId` on the `CompletedHabit` table. All the data in the column will be lost.
  - You are about to drop the column `todayHabitId` on the `CompletedHabit` table. All the data in the column will be lost.
  - You are about to drop the column `studyId` on the `Reaction` table. All the data in the column will be lost.
  - You are about to drop the `Study` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TodayHabit` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `habitId` to the `CompletedHabit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studiesId` to the `CompletedHabit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Emojitype` to the `Reaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studiesId` to the `Reaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Background" AS ENUM ('green', 'yellow', 'sky_blue', 'pink', 'image_1', 'image_2', 'image_3', 'image_4');

-- CreateEnum
CREATE TYPE "EmojiType" AS ENUM ('increase', 'decrease');

-- DropForeignKey
ALTER TABLE "CompletedHabit" DROP CONSTRAINT "CompletedHabit_studyId_fkey";

-- DropForeignKey
ALTER TABLE "CompletedHabit" DROP CONSTRAINT "CompletedHabit_todayHabitId_fkey";

-- DropForeignKey
ALTER TABLE "Reaction" DROP CONSTRAINT "Reaction_studyId_fkey";

-- DropForeignKey
ALTER TABLE "TodayHabit" DROP CONSTRAINT "TodayHabit_studyId_fkey";

-- AlterTable
ALTER TABLE "CompletedHabit" DROP COLUMN "studyId",
DROP COLUMN "todayHabitId",
ADD COLUMN     "habitId" TEXT NOT NULL,
ADD COLUMN     "isCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "studiesId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Reaction" DROP COLUMN "studyId",
ADD COLUMN     "Emojitype" "EmojiType" NOT NULL,
ADD COLUMN     "studiesId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Study";

-- DropTable
DROP TABLE "TodayHabit";

-- CreateTable
CREATE TABLE "Studies" (
    "id" TEXT NOT NULL,
    "nickName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 0,
    "background" "Background" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Studies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Habit" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "studiesId" TEXT NOT NULL,

    CONSTRAINT "Habit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Studies_nickName_key" ON "Studies"("nickName");

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_studiesId_fkey" FOREIGN KEY ("studiesId") REFERENCES "Studies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Habit" ADD CONSTRAINT "Habit_studiesId_fkey" FOREIGN KEY ("studiesId") REFERENCES "Studies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompletedHabit" ADD CONSTRAINT "CompletedHabit_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "Habit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompletedHabit" ADD CONSTRAINT "CompletedHabit_studiesId_fkey" FOREIGN KEY ("studiesId") REFERENCES "Studies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
