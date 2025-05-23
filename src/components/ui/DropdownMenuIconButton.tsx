"use client";

import { itemsPerPage } from "@/core/constants";
import { cn } from "@/core/utils";

type ItemId = string | null;
type DropdownMenuIconButtonProps = {
  index: number;
  isOpen: boolean;
  options: { Icon?: React.ReactElement; label: string; callback: () => void; hasDivider?: boolean }[];
  itemId: ItemId;
  setItemId: (itemId: ItemId) => void;
};

export function DropdownMenuIconButton({ index, isOpen, itemId, options, setItemId }: DropdownMenuIconButtonProps) {
  return (
    <div className="relative">
      <svg
        aria-hidden="true"
        className="w-5 h-5 cursor-pointer"
        fill="currentColor"
        onClick={() => setItemId(itemId)}
        xmlns="http://www.w3.org/2000/svg">
        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
      </svg>
      <div
        className={cn(
          "absolute right-0 z-10 w-[200px] bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600",
          index < itemsPerPage / 2 ? "top-5" : "bottom-5",
          { block: isOpen, hidden: !isOpen }
        )}>
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
          {options.map((option) => (
            <div key={option.label}>
              {option.hasDivider && <hr />}
              <li
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
                onClick={() => {
                  option.callback();
                  setItemId("");
                }}>
                {option.Icon} {option.label}
              </li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
