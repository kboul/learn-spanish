"use client";

import { useEffect, useState } from "react";

import { addWord, getWords, markAsLearned, deleteWord } from "../actions";
import { Word } from "@prisma/client";

const initialState = {
  spanish: "",
  greek: "",
  english: "",
  learned: false,
  forget: false,
  words: [] as Word[]
};

export default function Home() {
  const [state, setState] = useState(initialState);

  const setValue = (key: string, value: any) => setState((prev) => ({ ...prev, [key]: value }));

  useEffect(() => {
    async function fetchWords() {
      const data = await getWords();
      setValue("words", data);
    }
    fetchWords();
  }, []);

  const { spanish, english, greek, words } = state;

  const handleAddWord = async () => {
    if (!spanish.trim() || !english.trim() || !greek.trim()) return;

    await addWord({ spanish, english, greek, learned: false, forget: false, id: 123456 });
    const updatedWords = await getWords(); // Fetch updated list
    setState({ ...initialState, words: updatedWords });
  };

  const handleMarkAsLearned = async (id: number) => {
    await markAsLearned(id);
    setValue(
      "words",
      words.map((w) => (w.id === id ? { ...w, learned: true } : w))
    );
  };

  const handleDeleteWord = async (id: number) => {
    await deleteWord(id);
    const updatedWords = await getWords();
    setValue("words", updatedWords);
  };

  return (
    <main className="flex flex-col items-center min-h-screen p-5">
      <h1 className="text-2xl font-bold mb-4">📖 Spanish Vocabulary</h1>

      <div className="flex gap-2 mb-4">
        <input
          className="border p-2"
          placeholder="Spanish"
          value={spanish}
          onChange={(e) => setValue("spanish", e.target.value)}
        />
        <input
          className="border p-2"
          placeholder="English"
          value={english}
          onChange={(e) => setValue("english", e.target.value)}
        />
        <input
          className="border p-2"
          placeholder="Greek"
          value={greek}
          onChange={(e) => setValue("greek", e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer" onClick={handleAddWord}>
          Add
        </button>
      </div>

      <table className="border-collapse w-full text-center border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">🇪🇸 Spanish</th>
            <th className="border p-2">🇬🇧 English</th>
            <th className="border p-2">🇬🇷 Greek</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {words.map((word) => (
            <tr
              key={word.id}
              className={`border-b ${word.forget ? "bg-yellow-100" : "bg-white"} transition-colors duration-300`}>
              <td className="border p-2">{word.spanish}</td>
              <td className="border p-2">{word.english}</td>
              <td className="border p-2">{word.greek}</td>
              <td className="border p-2">
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
                  onClick={() => handleDeleteWord(word.id)}>
                  ❌ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
