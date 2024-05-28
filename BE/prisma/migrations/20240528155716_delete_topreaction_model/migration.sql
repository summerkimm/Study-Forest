/*
  Warnings:

  - You are about to drop the `TopReaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TopReaction" DROP CONSTRAINT "TopReaction_studiesId_fkey";

-- DropTable
DROP TABLE "TopReaction";
