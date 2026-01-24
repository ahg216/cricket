/*
  Warnings:

  - You are about to drop the column `inningsId` on the `batting` table. All the data in the column will be lost.
  - You are about to drop the column `inningsId` on the `bowling` table. All the data in the column will be lost.
  - You are about to drop the column `inningsId` on the `fielding` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "batting" DROP CONSTRAINT "batting_inningsId_fkey";

-- DropForeignKey
ALTER TABLE "bowling" DROP CONSTRAINT "bowling_inningsId_fkey";

-- DropForeignKey
ALTER TABLE "fielding" DROP CONSTRAINT "fielding_inningsId_fkey";

-- AlterTable
ALTER TABLE "batting" DROP COLUMN "inningsId";

-- AlterTable
ALTER TABLE "bowling" DROP COLUMN "inningsId";

-- AlterTable
ALTER TABLE "fielding" DROP COLUMN "inningsId";
