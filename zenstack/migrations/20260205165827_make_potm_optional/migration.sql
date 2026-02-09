-- DropForeignKey
ALTER TABLE "matches" DROP CONSTRAINT "matches_potmId_fkey";

-- AlterTable
ALTER TABLE "matches" ALTER COLUMN "potmId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "matches" ADD CONSTRAINT "matches_potmId_fkey" FOREIGN KEY ("potmId") REFERENCES "players"("name") ON DELETE SET NULL ON UPDATE CASCADE;
