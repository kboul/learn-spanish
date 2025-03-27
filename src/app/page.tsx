"use client";

import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

import { AddWord, WordsTable } from "@/components";
import { getWords, deleteWord } from "@/actions";
import { useWordsStore } from "@/store";

export default function Home() {
  const [setWordsStoreValue] = useWordsStore(useShallow((state) => [state.setWordsStoreValue]));

  useEffect(() => {
    async function fetchWords() {
      const data = await getWords();
      setWordsStoreValue({ words: data });
    }
    fetchWords();
  }, []);

  const handleDeleteWord = async (id: string) => {
    await deleteWord(id);
    const updatedWords = await getWords();
    setWordsStoreValue({ words: updatedWords });
  };

  return (
    <main className="flex flex-col items-center min-h-screen p-5">
      <h1 className="text-2xl font-bold mb-4">📖 Spanish Vocabulary</h1>

      <AddWord />

      <WordsTable onDeleteWord={handleDeleteWord} />
    </main>
  );
}
