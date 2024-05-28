/*
  Warnings:

  - You are about to drop the `_ReactionToStudies` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `studiesId` to the `Reaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ReactionToStudies" DROP CONSTRAINT "_ReactionToStudies_A_fkey";

-- DropForeignKey
ALTER TABLE "_ReactionToStudies" DROP CONSTRAINT "_ReactionToStudies_B_fkey";

-- AlterTable
ALTER TABLE "Reaction" ADD COLUMN     "studiesId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_ReactionToStudies";

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_studiesId_fkey" FOREIGN KEY ("studiesId") REFERENCES "Studies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
