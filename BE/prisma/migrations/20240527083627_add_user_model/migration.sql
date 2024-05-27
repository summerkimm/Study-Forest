/*
  Warnings:

  - You are about to drop the column `password` on the `Studies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Studies" DROP COLUMN "password";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "studiesId" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_password_key" ON "User"("password");

-- CreateIndex
CREATE UNIQUE INDEX "User_studiesId_key" ON "User"("studiesId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_studiesId_fkey" FOREIGN KEY ("studiesId") REFERENCES "Studies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
