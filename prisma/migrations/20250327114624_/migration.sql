/*
  Warnings:

  - You are about to drop the column `forget` on the `Word` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Word" DROP COLUMN "forget",
ADD COLUMN     "highlight" BOOLEAN NOT NULL DEFAULT false;
