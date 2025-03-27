"use server";
import { Word } from "@prisma/client";
import prisma from "./lib/prisma";

// Add a new word
async function addWord(payload: Word): Promise<void> {
  try {
    await prisma.word.create({ data: payload });
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
async function markAsLearned(id: number) {
  try {
    await prisma.word.update({
      where: { id },
      data: { learned: true }
    });
  } catch (error) {
    console.error("Error marking as learned:", error);
  }
}

// Delete a word
async function deleteWord(id: number) {
  try {
    await prisma.word.delete({ where: { id } });
  } catch (error) {
    console.error("Error deleting word:", error);
  }
}

export { addWord, getWords, markAsLearned, deleteWord };
