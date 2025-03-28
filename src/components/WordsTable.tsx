"use client";

import { deleteWord, highlighWord, markAsLearned } from "@/actions";
import { Word } from "@prisma/client";

export function WordsTable({ words, error }: { words?: Word[]; error?: string }) {
  return (
    <>
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
          {words?.map((word: Word) => {
            const { highlight, learned } = word;
            const trBg = highlight ? "bg-yellow-100" : learned ? "bg-[#04AA6D]" : "bg-white";
            const trColor = learned ? "text-white" : "text-black";
            return (
              <tr key={word.id} className="border-b transition-colors duration-300">
                <td className={`border p-2 ${trBg}`}>
                  <p className={trColor}>{word.spanish}</p>
                </td>
                <td className={`border p-2 ${trBg}`}>
                  <p className={trColor}>{word.english}</p>
                </td>
                <td className={`border p-2 ${trBg}`}>
                  <p className={trColor}>{word.greek}</p>
                </td>
                <td className="border p-2 ">
                  <div className="flex justify-center space-x-2">
                    <div
                      className="cursor-pointer"
                      onClick={() => markAsLearned(word)}
                      title={`Mark as ${learned ? "not " : ""}learned`}>
                      {learned ? "👎" : "👍"}
                    </div>
                    {!word.learned && (
                      <div
                        className="cursor-pointer"
                        onClick={() => highlighWord(word)}
                        title={`${highlight ? "Un" : "H"}ighlight word`}>
                        {highlight ? "🌟" : "⭐"}
                      </div>
                    )}
                    <div className="cursor-pointer" onClick={() => deleteWord(word.id)} title="Delete word">
                      ❌
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {error && <p className="text-red-500">{error}</p>}
    </>
  );
}
