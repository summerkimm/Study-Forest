/*
  Warnings:

  - You are about to drop the column `studiesId` on the `Reaction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Reaction" DROP CONSTRAINT "Reaction_studiesId_fkey";

-- AlterTable
ALTER TABLE "Reaction" DROP COLUMN "studiesId";

-- CreateTable
CREATE TABLE "_ReactionToStudies" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ReactionToStudies_AB_unique" ON "_ReactionToStudies"("A", "B");

-- CreateIndex
CREATE INDEX "_ReactionToStudies_B_index" ON "_ReactionToStudies"("B");

-- AddForeignKey
ALTER TABLE "_ReactionToStudies" ADD CONSTRAINT "_ReactionToStudies_A_fkey" FOREIGN KEY ("A") REFERENCES "Reaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReactionToStudies" ADD CONSTRAINT "_ReactionToStudies_B_fkey" FOREIGN KEY ("B") REFERENCES "Studies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
