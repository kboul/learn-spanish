"use client";
import { Check, Ellipsis, Flashlight, Pencil, Trash, X } from "lucide-react";
import { Word } from "@prisma/client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components";

export function WordActions({ row }: { row: Word }) {
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
          <DropdownMenuItem>
            <Trash /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
