import { memo } from "react";
import { useShallow } from "zustand/shallow";

import { useWordsStore } from "@/store";
import { deleteWord, getWords, highlighWord, markAsLearned } from "@/actions";
import { Word } from "@prisma/client";

type WordsTableProps = {};

export const WordsTable = memo(({}: WordsTableProps) => {
  const [words, setWordsStoreValue] = useWordsStore(useShallow((state) => [state.words, state.setWordsStoreValue]));

  const handleMarkAsLearned = async (word: Word) => {
    await markAsLearned(word);
    const updatedWords = await getWords();
    setWordsStoreValue({ words: updatedWords });
  };

  const handleHighlightWord = async (word: Word) => {
    await highlighWord({ id: word.id, highlight: word.highlight });
    const updatedWords = await getWords();
    setWordsStoreValue({ words: updatedWords });
  };

  const handleDeleteWord = async (id: string) => {
    await deleteWord(id);
    const updatedWords = await getWords();
    setWordsStoreValue({ words: updatedWords });
  };

  return (
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
        {words.map((word) => {
          const { highlight, learned } = word;
          const trBg = highlight ? "bg-yellow-100" : learned ? "bg-[#04AA6D]" : "bg-white";
          const trColor = learned ? "text-white" : "text-black";
          return (
            <tr key={word.id} className={`border-b ${trBg} ${trColor} transition-colors duration-300`}>
              <td className="border p-2">{word.spanish}</td>
              <td className="border p-2">{word.english}</td>
              <td className="border p-2">{word.greek}</td>
              <td className="border p-2 ">
                <div className="flex justify-center space-x-2">
                  <div
                    className="cursor-pointer"
                    onClick={() => handleMarkAsLearned(word)}
                    title={`Mark as ${learned ? "not " : ""}learned`}>
                    ✅
                  </div>
                  {!word.learned && (
                    <div
                      className="cursor-pointer"
                      onClick={() => handleHighlightWord(word)}
                      title={`${highlight ? "Un" : "H"}ighlight word`}>
                      ⭐
                    </div>
                  )}
                  <div className="cursor-pointer" onClick={() => handleDeleteWord(word.id)} title="Delete word">
                    ❌
                  </div>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
});
