/*
  Warnings:

  - You are about to drop the column `Emojitype` on the `Reaction` table. All the data in the column will be lost.
  - Added the required column `emojiType` to the `Reaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reaction" DROP COLUMN "Emojitype",
ADD COLUMN     "emojiType" "EmojiType" NOT NULL;
