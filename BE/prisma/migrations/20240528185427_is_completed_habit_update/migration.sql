/*
  Warnings:

  - A unique constraint covering the columns `[habitId]` on the table `IsCompletedHabit` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "IsCompletedHabit_habitId_key" ON "IsCompletedHabit"("habitId");
