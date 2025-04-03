"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { Word } from "@prisma/client";
import { MdCheck } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";
import { IoFlashlightSharp } from "react-icons/io5";
import { MdFlashlightOff } from "react-icons/md";
import { MdClear } from "react-icons/md";
import { MdEdit } from "react-icons/md";

import { Button, Modal, Table } from "@/components";
import { WordForm } from "./WordForm";
import { deleteWord, highlighWord, markAsLearned, WordResponse } from "./actions";
import { cn, getUrlParams } from "@/core/utils";

const headers = [
  { name: "🇪🇸 Spanish" },
  { name: "🇬🇧 English" },
  { name: "🇬🇷 Greek" },
  { name: "Actions", className: "text-center" }
];

type ModalProps = "edit" | "add" | "";
type WordsTableProps = { Header?: ReactNode; Footer?: ReactNode; words?: Word[]; error?: WordResponse["error"] };

export function WordsTable({ Header, Footer, words, error }: WordsTableProps) {
  const router = useRouter();
  const [modal, setModal] = useState<ModalProps>("");
  const searchParams = useSearchParams();

  const editWordId = searchParams.get("editWordId");
  const wordToEdit = editWordId ? words?.find((word) => word.id === editWordId) : undefined;

  useEffect(() => {
    if (searchParams.has("editWordId")) setModal("edit");
  }, [searchParams]);

  const handleWordMarkedAsLearned = async (word: Word) => {
    const { message, error } = await markAsLearned(word);
    toast[error ? "error" : "success"](message || error);
  };

  const handleWordHighlight = async (word: Word) => {
    const { message, error } = await highlighWord(word);
    toast[error ? "error" : "success"](message || error);
  };

  const deleteWordIdFromUrl = () => {
    const params = getUrlParams();
    params.delete("editWordId");
    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  const handleWordAdd = () => {
    deleteWordIdFromUrl();
    setModal("add");
  };

  const handleWordEdit = (word: Word) => {
    const params = getUrlParams();
    params.set("editWordId", word.id);
    router.push(`${window.location.pathname}?${params.toString()}`);
    setTimeout(() => setModal("edit"), 1000);
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
          <Button color="light" size="sm" onClick={handleWordAdd}>
            Add
          </Button>
          {Header}
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
      {Footer}
      {modal && (
        <Modal
          onClose={() => {
            setModal("");
            deleteWordIdFromUrl();
          }}
          open={!!modal}
          title={`${modal === "add" ? "Add" : "Edit"} Word`}>
          <WordForm wordToEdit={wordToEdit} />
        </Modal>
      )}
    </>
  );
}
