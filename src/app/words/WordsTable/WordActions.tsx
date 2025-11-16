"use client";
import { useState } from "react";
import { Check, Ellipsis, Flashlight, Pencil, Trash, X } from "lucide-react";
import { Word } from "@prisma/client";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Modal
} from "@/components";
import DeleteWord from "../DeleteWord";

export function WordActions({ row }: { row: Word }) {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  return (
    <div className="flex align-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Ellipsis className="cursor-pointer " />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem className="flex items-center">
            {row.learned ? <X /> : <Check />}
            {`Mark as ${row.learned ? "not " : ""}learned`}
          </DropdownMenuItem>

          {!row.learned && (
            <DropdownMenuItem className="flex items-center">
              {row.highlight ? <Flashlight /> : <Flashlight />}
              {`${row.highlight ? "Un" : "H"}ighlight word`}
            </DropdownMenuItem>
          )}

          <DropdownMenuItem>
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

      {isDeleteModalOpen && (
        <Modal title="Delete Word" open={isDeleteModalOpen} onClose={closeDeleteModal}>
          <DeleteWord id={row.id} onClose={closeDeleteModal} />
        </Modal>
      )}
    </div>
  );
}
