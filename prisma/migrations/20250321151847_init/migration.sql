/*
  Warnings:

  - You are about to drop the column `word` on the `Word` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[spanish]` on the table `Word` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `english` to the `Word` table without a default value. This is not possible if the table is not empty.
  - Added the required column `greek` to the `Word` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spanish` to the `Word` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Word_word_key";

-- AlterTable
ALTER TABLE "Word" DROP COLUMN "word",
ADD COLUMN     "english" TEXT NOT NULL,
ADD COLUMN     "greek" TEXT NOT NULL,
ADD COLUMN     "spanish" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Word_spanish_key" ON "Word"("spanish");
