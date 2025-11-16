"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button, DataTable, Modal } from "@/components";
import { AddIcon } from "@/icons";
import { AddEditWord } from "../AddEditWord";
import { cn, getUrlParams } from "@/core/utils";
import { AddEditModalProps, WordsTableProps } from "./types";
import { columns } from "./columns";

export function WordsTable({ Header, Footer, words }: WordsTableProps) {
  const router = useRouter();
  const [addEditModal, setAddEditModal] = useState<AddEditModalProps>("");
  const searchParams = useSearchParams();

  const editWordId = searchParams.get("editWordId");
  const wordToEdit = editWordId ? words?.find((word) => word.id === editWordId) : undefined;

  useEffect(() => {
    if (searchParams.has("editWordId")) setAddEditModal("edit");
  }, [searchParams]);

  const deleteWordIdFromUrl = () => {
    const params = getUrlParams();
    params.delete("editWordId");
    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  const handleWordAdd = () => {
    deleteWordIdFromUrl();
    setAddEditModal("add");
  };

  const closeModal = () => setAddEditModal("");

  return (
    <>
      <div className="w-full max-w-5xl">
        <div className="flex justify-between">
          <Button variant="outline" onClick={handleWordAdd}>
            <AddIcon /> Add
          </Button>

          {Header}
        </div>
        <div className="container mx-auto py-5">
          <DataTable
            columns={columns}
            data={words || []}
            getRowClassName={(word) => cn(word.highlight && "highlight", word.learned && "learned")}
          />
        </div>
      </div>

      {Footer}

      {addEditModal && (
        <Modal
          onClose={() => {
            closeModal();
            deleteWordIdFromUrl();
          }}
          open={!!addEditModal}
          title={`${addEditModal === "add" ? "Add" : "Edit"} Word`}>
          <AddEditWord wordToEdit={wordToEdit} onModalClose={closeModal} />
        </Modal>
      )}
    </>
  );
}
