"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { Word } from "@prisma/client";
import { MdCheck } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";
import { IoFlashlightSharp } from "react-icons/io5";
import { MdFlashlightOff } from "react-icons/md";
import { MdClear } from "react-icons/md";
import { MdEdit } from "react-icons/md";

import { Button } from "./ui/Button";
import { Modal } from "./ui/Modal";
import { WordForm } from "./WordForm";
import { SearchWord } from "./SearchWord";
import Table from "./ui/Table";
import { deleteWord, highlighWord, markAsLearned, WordResponse } from "@/core/actions";
import { cn } from "@/core/utils";

const iconsClassName = "w-5 h-5";
const headers = [
  { name: "🇪🇸 Spanish" },
  { name: "🇬🇧 English" },
  { name: "🇬🇷 Greek" },
  { name: "Actions", className: "text-center" }
];

type ModalProps = "edit" | "add" | "";
type WordsTableProps = { q: string; words?: Word[]; error?: WordResponse["error"] };

export function WordsTable({ q, words, error }: WordsTableProps) {
  const [modal, setModal] = useState<ModalProps>("");

  const handleWordMarkedAsLearned = async (word: Word) => {
    const { message, error } = await markAsLearned(word);
    toast[error ? "error" : "success"](message || error);
  };

  const handleWordHighlight = async (word: Word) => {
    const { message, error } = await highlighWord(word);
    toast[error ? "error" : "success"](message || error);
  };

  const handleWordEdit = (word: Word) => {
    setModal("edit");
  };

  const handleWordDelete = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this word?");
    if (!confirmed) return;

    const { message, error } = await deleteWord(id);
    toast[error ? "error" : "success"](message || error);
  };

  return (
    <>
      <div className="w-full max-w-5xl">
        <div className="flex justify-between mb-2">
          <Button color="light" size="sm" onClick={() => setModal("add")}>
            Add Word
          </Button>
          <SearchWord q={q} />
        </div>
        <Table
          data={words}
          errorMsg={error}
          headers={headers}
          noItemsMsg="No words found"
          renderRow={(word) => {
            const { highlight, learned } = word;
            const trBg = cn("bg-white", {
              "bg-yellow-100": highlight,
              "bg-[var(--learned)]": learned
            });
            const trColor = learned ? "text-white" : "text-black";

            return (
              <tr key={word.id} className="bg-white border-b border-gray-200">
                <td className={`px-6 py-3 ${trBg}`}>
                  <p className={trColor}>{word.spanish}</p>
                </td>
                <td className={`px-6 py-3 ${trBg}`}>
                  <p className={trColor}>{word.english}</p>
                </td>
                <td className={`px-6 py-3 ${trBg}`}>
                  <p className={trColor}>{word.greek}</p>
                </td>
                <td className="px-6 py-3">
                  <div className="flex justify-center space-x-2 items-center">
                    <div
                      className="cursor-pointer"
                      onClick={() => handleWordMarkedAsLearned(word)}
                      title={`Mark as ${learned ? "not " : ""}learned`}>
                      {learned ? (
                        <MdClear className={`${iconsClassName} text-red-700`} />
                      ) : (
                        <MdCheck className={`${iconsClassName} text-green-700`} />
                      )}
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
                    <div className="cursor-pointer" onClick={() => handleWordEdit(word)} title="Edit word">
                      <MdEdit className={`${iconsClassName}`} />
                    </div>
                    <div className="cursor-pointer" onClick={() => handleWordDelete(word.id)} title="Delete word">
                      <IoTrashOutline className={`${iconsClassName} text-red-700`} />
                    </div>
                  </div>
                </td>
              </tr>
            );
          }}
        />
      </div>
      {modal && (
        <Modal onClose={() => setModal("")} open={!!modal} title={`${modal === "add" ? "Add" : "Edit"} Word`}>
          <WordForm />
        </Modal>
      )}
    </>
  );
}
