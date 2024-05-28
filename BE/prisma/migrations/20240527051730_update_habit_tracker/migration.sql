-- CreateEnum
CREATE TYPE "IsCompletedDays" AS ENUM ('Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun');

-- DropForeignKey
ALTER TABLE "Reaction" DROP CONSTRAINT "Reaction_studiesId_fkey";

-- AlterTable
ALTER TABLE "Studies" ADD COLUMN     "studyDays" INTEGER NOT NULL DEFAULT 1;

-- CreateTable
CREATE TABLE "TopReaction" (
    "id" TEXT NOT NULL,
    "emoji" TEXT NOT NULL,
    "count" INTEGER NOT NULL,
    "studiesId" TEXT NOT NULL,

    CONSTRAINT "TopReaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HabitTracker" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isCompletedDays" "IsCompletedDays" NOT NULL,
    "studiesId" TEXT NOT NULL,

    CONSTRAINT "HabitTracker_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_studiesId_fkey" FOREIGN KEY ("studiesId") REFERENCES "Studies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopReaction" ADD CONSTRAINT "TopReaction_studiesId_fkey" FOREIGN KEY ("studiesId") REFERENCES "Studies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HabitTracker" ADD CONSTRAINT "HabitTracker_studiesId_fkey" FOREIGN KEY ("studiesId") REFERENCES "Studies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
