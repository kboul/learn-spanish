"use client";
import { useState } from "react";
import { Check, Ellipsis, Flashlight, Pencil, Trash, X } from "lucide-react";
import { Word } from "@prisma/client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Modal
} from "@/components";
import DeleteWord from "../DeleteWord";
import { highlighWord, markAsLearned } from "../actions";
import { getUrlParams } from "@/core/utils";
import { AddEditWord } from "../AddEditWord";

export function WordActions({ row }: { row: Word }) {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editWord, setEditWord] = useState<Word | null>(null);

  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const handleWordMarkedAsLearned = async (word: Word) => {
    const { message, error } = await markAsLearned(word);
    toast[error ? "error" : "success"](message || error);
  };

  const handleWordHighlight = async (word: Word) => {
    const { message, error } = await highlighWord(word);
    toast[error ? "error" : "success"](message || error);
  };

  const handleWordEdit = (word: Word) => {
    const params = getUrlParams();
    params.set("editWordId", word.id);
    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  return (
    <div className="flex align-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Ellipsis className="cursor-pointer " />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="flex items-center" onClick={() => handleWordMarkedAsLearned(row)}>
            {row.learned ? <X /> : <Check />}
            {`Mark as ${row.learned ? "not " : ""}learned`}
          </DropdownMenuItem>

          {!row.learned && (
            <DropdownMenuItem className="flex items-center" onClick={() => handleWordHighlight(row)}>
              {row.highlight ? <Flashlight /> : <Flashlight />}
              {`${row.highlight ? "Unh" : "H"}ighlight word`}
            </DropdownMenuItem>
          )}

          <DropdownMenuItem onClick={() => handleWordEdit(row)}>
            <Pencil /> Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              setIsDeleteModalOpen(true);
            }}>
            <Trash /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {editWord && (
        <Modal title="Edit Word" open={!!editWord} onClose={() => setEditWord(null)}>
          <AddEditWord wordToEdit={editWord} onModalClose={() => setEditWord(null)} />
        </Modal>
      )}

      {isDeleteModalOpen && (
        <Modal title="Delete Word" open={isDeleteModalOpen} onClose={closeDeleteModal}>
          <DeleteWord id={row.id} onModalClose={closeDeleteModal} />
        </Modal>
      )}
    </div>
  );
}
