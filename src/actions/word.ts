"use server";
import { Word } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { prisma } from "../lib";
import { NewWord } from "../types";

type WordResponse = { message?: string; error?: string };

const getErrorMessage = (submessage: string) => `There was an error while ${submessage}`;

// Add a new word
async function addWord(newWord: NewWord): Promise<WordResponse> {
  try {
    await prisma.word.create({ data: newWord });
    revalidatePath("/");

    return { message: "Word added successfully" };
  } catch (error) {
    return { error: `${getErrorMessage("adding the word")}. The word might already exists on the table.` };
  }
}

// Get all words
async function getWords(): Promise<{ words?: Word[]; error?: string }> {
  try {
    const words = await prisma.word.findMany({ orderBy: { id: "asc" } });
    return { words };
  } catch (error) {
    return { error: getErrorMessage("fetching the words") };
  }
}

// Mark a word as learned
async function markAsLearned(word: Word): Promise<WordResponse> {
  const newLearnedValue = !word.learned;
  try {
    await prisma.word.update({
      where: { id: word.id },
      data: { learned: newLearnedValue, highlight: newLearnedValue ? false : word.highlight }
    });
    revalidatePath("/");

    return { message: `${word.spanish} marked as ${newLearnedValue ? "" : "not"} learned successfully` };
  } catch (error) {
    return { error: getErrorMessage("marking the word as learned") };
  }
}

async function highlighWord(word: Word): Promise<WordResponse> {
  const newHighlightValue = !word.highlight;
  try {
    await prisma.word.update({
      where: { id: word.id },
      data: { highlight: newHighlightValue }
    });
    revalidatePath("/");

    return { message: `${word.spanish} ${newHighlightValue ? "" : "un"}highlighted successfully` };
  } catch (error) {
    return { error: getErrorMessage("highlighting the word") };
  }
}

// Delete a word
async function deleteWord(id: string): Promise<WordResponse> {
  try {
    await prisma.word.delete({ where: { id } });
    revalidatePath("/");
    return { message: "Word deleted successfully" };
  } catch (error) {
    return { error: getErrorMessage("deleting the word") };
  }
}

export { addWord, getWords, markAsLearned, highlighWord, deleteWord, type WordResponse };
