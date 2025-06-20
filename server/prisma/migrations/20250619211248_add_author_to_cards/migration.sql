/*
  Warnings:

  - Added the required column `author` to the `Cards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cards" ADD COLUMN     "author" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Cards" ADD CONSTRAINT "Cards_board_id_fkey" FOREIGN KEY ("board_id") REFERENCES "Boards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
