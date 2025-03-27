/*
  Warnings:

  - The primary key for the `Word` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Word" DROP CONSTRAINT "Word_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Word_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Word_id_seq";
