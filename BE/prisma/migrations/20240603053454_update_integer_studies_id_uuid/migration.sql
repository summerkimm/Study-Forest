-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_studiesId_fkey";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_studiesId_fkey" FOREIGN KEY ("studiesId") REFERENCES "Studies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
