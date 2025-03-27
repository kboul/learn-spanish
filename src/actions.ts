"use server";
import { Word } from "@prisma/client";

import prisma from "./lib/prisma";
import { NewWord } from "./types";

// Add a new word
async function addWord(payload: NewWord): Promise<void> {
  try {
    await prisma.word.create({ data: payload });
    console.log("word added successfully");
  } catch (error) {
    console.error("Error adding word:", error);
  }
}

// Get all words
async function getWords(): Promise<Word[]> {
  try {
    return await prisma.word.findMany();
  } catch (error) {
    console.error("Error fetching words:", error);
    return [];
  }
}

// Mark a word as learned
async function markAsLearned(word: Word): Promise<void> {
  const newLearnedValue = !word.learned;
  try {
    await prisma.word.update({
      where: { id: word.id },
      data: { learned: newLearnedValue, highlight: newLearnedValue ? false : word.highlight }
    });
    console.log(`word marked as ${newLearnedValue ? "" : "not "}learned successfully`);
  } catch (error) {
    console.error("Error marking as learned:", error);
  }
}

async function highlighWord({ id, highlight }: Pick<Word, "id" | "highlight">): Promise<void> {
  try {
    await prisma.word.update({
      where: { id },
      data: { highlight: !highlight }
    });
    console.log(`word ${highlight ? "un" : ""}highlighted successfully`);
  } catch (error) {
    console.error("Error marking as learned:", error);
  }
}

// Delete a word
async function deleteWord(id: string) {
  try {
    await prisma.word.delete({ where: { id } });
    console.log("word deleted successfully");
  } catch (error) {
    console.error("Error deleting word:", error);
  }
}

export { addWord, getWords, markAsLearned, highlighWord, deleteWord };
