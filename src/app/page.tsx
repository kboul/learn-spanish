"use client";

import { useEffect, useState } from "react";

import { addWord, getWords, markAsLearned, deleteWord } from "../actions";

type Word = { word: string; learned: boolean; id: number };

export default function Home() {
  const [words, setWords] = useState<Word[]>([] as Word[]);
  const [newWord, setNewWord] = useState("");

  useEffect(() => {
    async function fetchWords() {
      const data = await getWords();
      console.log(data);
      setWords(data);
    }
    fetchWords();
  }, []);

  const handleAddWord = async () => {
    if (!newWord.trim()) return;
    await addWord(newWord);
    setWords((prevState) => [
      ...prevState,
      { word: newWord, learned: false, id: new Date().getTime() },
    ]);
    setNewWord("");
  };

  const handleMarkAsLearned = async (id: number) => {
    await markAsLearned(id);
    setWords(words.map((w) => (w.id === id ? { ...w, learned: true } : w)));
  };

  const handleDeleteWord = async (id: number) => {
    await deleteWord(id);
    setWords(words.filter((w) => w.id !== id));
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-5">
      <h1 className="text-2xl font-bold mb-4">📖 My Spanish Words</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
          className="border p-2 rounded"
          placeholder="Enter a new word..."
        />
        <button
          onClick={handleAddWord}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      <ul className="w-1/2">
        {words.map((item) => (
          <li
            key={item.id}
            className={`flex justify-between items-center p-2 border-b ${
              item.learned ? "text-green-500" : ""
            }`}
          >
            {item.word}
            <div className="flex gap-2">
              {!item.learned && (
                <button
                  onClick={() => handleMarkAsLearned(item.id)}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  ✅ Learned
                </button>
              )}
              <button
                onClick={() => handleDeleteWord(item.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                ❌ Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
