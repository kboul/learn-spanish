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

import { Badge, Button, DropdownMenuIconButton, Modal, Table } from "@/components";
import { AddIcon } from "@/icons";
import { AddEditWord } from "./AddEditWord";
import DeleteWord from "./DeleteWord";
import { highlighWord, markAsLearned, WordResponse } from "./actions";
import { cn, getUrlParams } from "@/core/utils";
import { itemsPerPage } from "@/core/constants";

const headers = [{ name: "🇪🇸 Spanish" }, { name: "🇬🇧 English" }, { name: "🇬🇷 Greek" }, { name: "Class" }, { name: "" }];

const getClassBadgeColor = (wordClass: Word["class"]) => {
  return {
    NOUN: "default",
    VERB: "green",
    ADJECTIVE: "red",
    ADVERB: "yellow",
    PHRASE: "indigo",
    PRONOUN: "purple",
    PREPOSITION: "purple",
    CONJUNCTION: "pink",
    INTERJECTION: "dark"
  }[wordClass];
};

type AddEditModalProps = "edit" | "add" | "";
type WordsTableProps = { Header?: ReactNode; Footer?: ReactNode; words?: Word[]; error?: WordResponse["error"] };

export function WordsTable({ Header, Footer, words, error }: WordsTableProps) {
  const router = useRouter();
  const [addEditModal, setAddEditModal] = useState<AddEditModalProps>("");
  const [deleteWordId, setDeleteWordId] = useState("");
  const searchParams = useSearchParams();

  const [wordId, setWordId] = useState("");
  const changeWordId = (id: string) => setWordId(wordId === id ? "" : id);

  const editWordId = searchParams.get("editWordId");
  const wordToEdit = editWordId ? words?.find((word) => word.id === editWordId) : undefined;

  useEffect(() => {
    if (searchParams.has("editWordId")) setAddEditModal("edit");
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
    setAddEditModal("add");
  };

  const handleWordEdit = (word: Word) => {
    const params = getUrlParams();
    params.set("editWordId", word.id);
    router.push(`${window.location.pathname}?${params.toString()}`);
    setTimeout(() => setAddEditModal("edit"), 1000);
  };

  const handleDeleteWordClose = () => setDeleteWordId("");

  const pageItemsSameAsWords = itemsPerPage === words?.length || 0;

  return (
    <>
      <div className="w-full max-w-5xl">
        <div className="flex justify-between mb-2">
          <Button color="light" iconBefore={<AddIcon />} size="sm" onClick={handleWordAdd}>
            Add
          </Button>
          {Header}
        </div>
        <Table
          data={words}
          errorMsg={error}
          headers={headers}
          height={`h-full ${pageItemsSameAsWords ? "[@media(max-height:823px)]:h-[calc(100vh-200px)]" : ""}`}
          noItemsMsg="No words found"
          renderRow={(word, index) => {
            const { highlight, learned } = word;
            return (
              <tr
                key={word.id}
                className={cn(
                  "bg-white border-b text-gray-900 dark:bg-gray-800 dark:border-gray-700 border-gray-200 dark:text-white",
                  { highlight, learned }
                )}>
                <td className="px-6 py-3">{word.spanish}</td>
                <td className="px-6 py-3">{word.english}</td>
                <td className="px-6 py-3">{word.greek}</td>
                <td className="px-6 py-3">
                  <Badge color={getClassBadgeColor(word.class)}>{word.class}</Badge>
                </td>
                <td className="px-6 py-3">
                  <div className="flex justify-end space-x-2 items-center">
                    <DropdownMenuIconButton
                      index={index}
                      isOpen={word.id === wordId}
                      itemId={wordId}
                      setItemId={() => changeWordId(word.id)}
                      options={[
                        {
                          Icon: learned ? <MdClear /> : <MdCheck />,
                          label: `Mark as ${learned ? "not " : ""}learned`,
                          callback: () => handleWordMarkedAsLearned(word)
                        },
                        ...(!learned
                          ? [
                              {
                                Icon: highlight ? <MdFlashlightOff /> : <IoFlashlightSharp />,
                                label: `${highlight ? "Un" : "H"}ighlight word`,
                                callback: () => handleWordHighlight(word)
                              }
                            ]
                          : []),
                        {
                          Icon: <MdEdit />,
                          label: "Edit",
                          callback: () => handleWordEdit(word)
                        },
                        {
                          Icon: <IoTrashOutline />,
                          label: "Delete",
                          callback: () => setDeleteWordId(word.id),
                          hasDivider: true
                        }
                      ]}
                    />
                  </div>
                </td>
              </tr>
            );
          }}
        />
      </div>

      {Footer}

      {addEditModal && (
        <Modal
          onClose={() => {
            setAddEditModal("");
            deleteWordIdFromUrl();
          }}
          open={!!addEditModal}
          title={`${addEditModal === "add" ? "Add" : "Edit"} Word`}>
          <AddEditWord wordToEdit={wordToEdit} />
        </Modal>
      )}

      {deleteWordId && (
        <Modal onClose={handleDeleteWordClose} open={!!deleteWordId} title="Delete Word">
          <DeleteWord id={deleteWordId} onClose={handleDeleteWordClose} />
        </Modal>
      )}
    </>
  );
}
