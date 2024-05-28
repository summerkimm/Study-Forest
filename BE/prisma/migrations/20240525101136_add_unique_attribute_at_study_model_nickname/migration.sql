/*
  Warnings:

  - A unique constraint covering the columns `[nickName]` on the table `Study` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Study_nickName_key" ON "Study"("nickName");
