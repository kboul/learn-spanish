import { memo } from "react";
import { Word } from "@prisma/client";

type WordsTableProps = {
  words: Word[];
  onDeleteWord: (id: number) => void;
  onMarkAsLearned?: (id: number) => void;
};

export const WordsTable = memo(({ words, onDeleteWord, onMarkAsLearned }: WordsTableProps) => {
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
                onClick={() => onDeleteWord(word.id)}>
                ❌ Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});
