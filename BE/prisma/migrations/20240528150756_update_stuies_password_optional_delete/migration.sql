/*
  Warnings:

  - Made the column `password` on table `Studies` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Studies" ALTER COLUMN "password" SET NOT NULL;
