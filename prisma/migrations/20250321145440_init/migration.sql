-- CreateTable
CREATE TABLE "Word" (
    "id" SERIAL NOT NULL,
    "word" TEXT NOT NULL,
    "learned" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Word_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Word_word_key" ON "Word"("word");
