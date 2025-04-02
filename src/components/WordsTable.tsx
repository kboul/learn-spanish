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

  // h-[calc(100%-(40+24+38+32)px)]

  return (
    <>
      <div className="w-full max-w-5xl">
        <div className="flex justify-between mb-2">
          <Button color="light" size="sm" onClick={() => setModal("add")}>
            Add
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
            const iconsClassName = cn("w-5 h-5 text-gray-700 dark:text-white", {
              "!text-yellow-800": highlight,
              "!text-white": learned
            });
            return (
              <tr
                key={word.id}
                className={cn(
                  "bg-white border-b text-gray-900 dark:bg-gray-800 dark:border-gray-700 border-gray-200 dark:text-white",
                  {
                    "!bg-yellow-100 !text-yellow-800": highlight,
                    "!bg-[var(--learned)] !text-white": learned
                  }
                )}>
                <td className="px-6 py-3">{word.spanish}</td>
                <td className="px-6 py-3">{word.english}</td>
                <td className="px-6 py-3">{word.greek}</td>
                <td className="px-6 py-3">
                  <div className="flex justify-center space-x-2 items-center">
                    <div
                      className="cursor-pointer"
                      onClick={() => handleWordMarkedAsLearned(word)}
                      title={`Mark as ${learned ? "not " : ""}learned`}>
                      {learned ? <MdClear className={iconsClassName} /> : <MdCheck className={iconsClassName} />}
                    </div>
                    {!word.learned && (
                      <div
                        className="cursor-pointer"
                        onClick={() => handleWordHighlight(word)}
                        title={`${highlight ? "Un" : "H"}ighlight word`}>
                        {highlight ? (
                          <MdFlashlightOff className={iconsClassName} />
                        ) : (
                          <IoFlashlightSharp className={iconsClassName} />
                        )}
                      </div>
                    )}
                    <div className="cursor-pointer" onClick={() => handleWordEdit(word)} title="Edit word">
                      <MdEdit className={iconsClassName} />
                    </div>
                    <div className="cursor-pointer" onClick={() => handleWordDelete(word.id)} title="Delete word">
                      <IoTrashOutline className={iconsClassName} />
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
