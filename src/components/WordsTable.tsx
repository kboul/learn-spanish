"use client";
import { toast } from "react-toastify";
import { Word } from "@prisma/client";
import { FcCheckmark } from "react-icons/fc";
import { IoTrashOutline } from "react-icons/io5";
import { IoFlashlightSharp } from "react-icons/io5";
import { MdFlashlightOff } from "react-icons/md";
import { MdClear } from "react-icons/md";

import { deleteWord, highlighWord, markAsLearned, WordResponse } from "@/core/actions";
import { cn } from "@/core/utils";

const iconsClassName = "w-5 h-5";

export function WordsTable({ words, error }: { words?: Word[]; error?: WordResponse["error"] }) {
  const handleWordMarkedAsLearned = async (word: Word) => {
    const { message, error } = await markAsLearned(word);
    toast[error ? "error" : "success"](message || error);
  };

  const handleWordHighlight = async (word: Word) => {
    const { message, error } = await highlighWord(word);
    toast[error ? "error" : "success"](message || error);
  };

  const handleWordDelete = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this word?");
    if (!confirmed) return;

    const { message, error } = await deleteWord(id);
    toast[error ? "error" : "success"](message || error);
  };

  return (
    <>
      <table className="border-collapse w-full text-center border">
        <thead>
          <tr className="bg-gray-200">
            {["🇪🇸 Spanish", "🇬🇧 English", "🇬🇷 Greek", "Actions"].map((header) => (
              <th className="border p-2" key={header}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {words?.map((word: Word) => {
            const { highlight, learned } = word;
            const trBg = cn("bg-white", { "bg-yellow-100": highlight, "bg-[var(--learned)]": learned });
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
                  <div className="flex justify-center space-x-2 items-center">
                    <div
                      className="cursor-pointer"
                      onClick={() => handleWordMarkedAsLearned(word)}
                      title={`Mark as ${learned ? "not " : ""}learned`}>
                      {learned ? <MdClear className={"w-6 h-6"} /> : <FcCheckmark className={"w-6 h-6"} />}
                    </div>
                    {!word.learned && (
                      <div
                        className="cursor-pointer"
                        onClick={() => handleWordHighlight(word)}
                        title={`${highlight ? "Un" : "H"}ighlight word`}>
                        {highlight ? (
                          <MdFlashlightOff className={`${iconsClassName} text-blue-700`} />
                        ) : (
                          <IoFlashlightSharp className={`${iconsClassName} text-blue-700`} />
                        )}
                      </div>
                    )}
                    <div className="cursor-pointer" onClick={() => handleWordDelete(word.id)} title="Delete word">
                      <IoTrashOutline className={`${iconsClassName} text-red-700`} />
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {words?.length === 0 && <p className="flex justify-center border-x-1 border-b-1 p-2 w-full">No words found</p>}
      {error && <p className="flex justify-center border-x-1 border-b-1 p-2 w-full">{error}</p>}
    </>
  );
}
