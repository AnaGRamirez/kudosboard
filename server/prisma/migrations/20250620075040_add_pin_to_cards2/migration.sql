/*
  Warnings:

  - You are about to drop the column `createdA` on the `Cards` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cards" DROP COLUMN "createdA",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
