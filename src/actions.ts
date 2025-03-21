"use server";
import prisma from "./lib/prisma";

// Add a new word
export async function addWord(word: string) {
  try {
    await prisma.word.create({
      data: { word },
    });
  } catch (error) {
    console.error("Error adding word:", error);
  }
}

// Get all words
export async function getWords() {
  try {
    return await prisma.word.findMany();
  } catch (error) {
    console.error("Error fetching words:", error);
    return [];
  }
}

// Mark a word as learned
export async function markAsLearned(id: number) {
  try {
    await prisma.word.update({
      where: { id },
      data: { learned: true },
    });
  } catch (error) {
    console.error("Error marking as learned:", error);
  }
}

// Delete a word
export async function deleteWord(id: number) {
  try {
    await prisma.word.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error deleting word:", error);
  }
}
