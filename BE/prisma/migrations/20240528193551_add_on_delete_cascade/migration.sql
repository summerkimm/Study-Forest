-- DropForeignKey
ALTER TABLE "Habit" DROP CONSTRAINT "Habit_studiesId_fkey";

-- DropForeignKey
ALTER TABLE "IsCompletedHabit" DROP CONSTRAINT "IsCompletedHabit_habitId_fkey";

-- DropForeignKey
ALTER TABLE "IsCompletedHabit" DROP CONSTRAINT "IsCompletedHabit_studiesId_fkey";

-- DropForeignKey
ALTER TABLE "Reaction" DROP CONSTRAINT "Reaction_studiesId_fkey";

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_studiesId_fkey" FOREIGN KEY ("studiesId") REFERENCES "Studies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Habit" ADD CONSTRAINT "Habit_studiesId_fkey" FOREIGN KEY ("studiesId") REFERENCES "Studies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IsCompletedHabit" ADD CONSTRAINT "IsCompletedHabit_studiesId_fkey" FOREIGN KEY ("studiesId") REFERENCES "Studies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IsCompletedHabit" ADD CONSTRAINT "IsCompletedHabit_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "Habit"("id") ON DELETE CASCADE ON UPDATE CASCADE;
