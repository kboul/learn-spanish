"use server";
import { Word } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

import { prisma } from "@/core/prisma";
import { itemsPerPage } from "@/core/constants";

type WordResponse = { message?: string; error?: string };

type Metrics = {
  totalWords: number;
  learnedWords: number;
  highlightedWords: number;
};

const getErrorMessage = (submessage: string) => `There was an error while ${submessage}`;
const unauthorisedError = "You are not authorised to ";

// Add a new word
async function addEditWord(formData: FormData, selectedClass = "", wordToEditId = ""): Promise<WordResponse> {
  const spanish = formData.get("spanish")?.toString();
  const english = formData.get("english")?.toString();
  const greek = formData.get("greek")?.toString();
  const learned = formData.get("learned") === "on" ? true : false;
  const highlight = formData.get("highlight") === "on" ? true : false;

  if (!spanish || !english || !greek || !selectedClass)
    return { error: "Spanish english, greek words and class are required" };

  // Get logged in user
  const { userId } = await auth();
  if (!userId) return { error: `${unauthorisedError} add or edit word` };

  try {
    if (wordToEditId) {
      // Editing existing word
      const existingWord = await prisma.word.findUnique({ where: { id: wordToEditId } });

      if (!existingWord) return { error: "Word not found." };

      await prisma.word.update({
        where: { id: wordToEditId },
        data: { spanish, english, greek, learned, highlight, class: selectedClass.toUpperCase() as Word["class"] }
      });

      revalidatePath("/");
      return { message: `${spanish} updated successfully` };
    } else {
      // Adding new word
      await prisma.word.create({
        data: { spanish, english, greek, learned, highlight, class: selectedClass.toUpperCase() as Word["class"] }
      });

      revalidatePath("/");
      return { message: `${spanish} added successfully` };
    }
  } catch {
    if (wordToEditId) return { error: `${getErrorMessage("editing the word")}` };
    return { error: `${getErrorMessage("adding the word")}. The word might already exist on the table.` };
  }
}

// Get all words
async function getWords(page: number): Promise<{ words?: Word[]; error?: string }> {
  try {
    const words = await prisma.word.findMany({
      take: itemsPerPage,
      skip: itemsPerPage * (page - 1),
      orderBy: { createdAt: "asc" }
    });
    return { words };
  } catch {
    return { error: getErrorMessage("fetching the words") };
  }
}

// Mark a word as learned
async function markAsLearned(word: Word): Promise<WordResponse> {
  const { userId } = await auth();
  if (!userId) return { error: `${unauthorisedError} mark word as learned` };

  const newLearnedValue = !word.learned;
  try {
    await prisma.word.update({
      where: { id: word.id },
      data: { learned: newLearnedValue, highlight: newLearnedValue ? false : word.highlight }
    });
    revalidatePath("/");

    return { message: `${word.spanish} marked as ${newLearnedValue ? "" : "not"} learned successfully` };
  } catch {
    return { error: getErrorMessage("marking the word as learned") };
  }
}

async function highlighWord(word: Word): Promise<WordResponse> {
  const { userId } = await auth();
  if (!userId) return { error: `${unauthorisedError} highlight word` };

  const newHighlightValue = !word.highlight;
  try {
    await prisma.word.update({
      where: { id: word.id },
      data: { highlight: newHighlightValue }
    });
    revalidatePath("/");

    return { message: `${word.spanish} ${newHighlightValue ? "" : "un"}highlighted successfully` };
  } catch {
    return { error: getErrorMessage("highlighting the word") };
  }
}

// Delete a word
async function deleteWord(id: string): Promise<WordResponse> {
  const { userId } = await auth();
  if (!userId) return { error: `${unauthorisedError} delete word` };

  try {
    await prisma.word.delete({ where: { id } });
    revalidatePath("/");
    return { message: "Word deleted successfully" };
  } catch {
    return { error: getErrorMessage("deleting the word") };
  }
}

async function getMetrics(): Promise<{ metrics?: Metrics; error?: string }> {
  try {
    const [totalWords, learnedWords, highlightedWords] = await Promise.all([
      prisma.word.count(), // Total words
      prisma.word.count({ where: { learned: true } }), // Learned words
      prisma.word.count({ where: { highlight: true } }) // Highlighted words
    ]);
    return { metrics: { totalWords, learnedWords, highlightedWords } };
  } catch {
    return { error: getErrorMessage("getting the metrics") };
  }
}

async function searchWord(word: string): Promise<{ searchedWords?: Word[]; error?: string }> {
  try {
    const searchedWords = await prisma.word.findMany({
      where: {
        OR: [{ spanish: { contains: word, mode: "insensitive" } }, { english: { contains: word, mode: "insensitive" } }]
      }
    });
    return { searchedWords };
  } catch {
    return { error: getErrorMessage("searching the word") };
  }
}

export {
  addEditWord,
  getWords,
  markAsLearned,
  highlighWord,
  deleteWord,
  searchWord,
  type WordResponse,
  type Metrics,
  getMetrics
};
