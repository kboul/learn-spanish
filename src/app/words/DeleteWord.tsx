"use client";

import { toast } from "react-toastify";

import { Button } from "@/components";
import { deleteWord } from "./actions";

type DeleteWordProps = { id: string; onClose: () => void };

export default function DeleteWord({ id, onClose }: DeleteWordProps) {
  const deleteWordAction = async () => {
    const { message, error } = await deleteWord(id);
    toast[error ? "error" : "success"](message || error);
    onClose();
  };

  return (
    <form action={deleteWordAction}>
      <div className="p-4 space-y-6">
        Are you sure you want to delete this word?
        <div className="flex items-center justify-end gap-2">
          <Button type="submit">Delete</Button>
          <Button color="light" type="button" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
}
