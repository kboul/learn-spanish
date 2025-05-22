"use client";

import { useState } from "react";

import { cn } from "@/core/utils";

type DropdownProps = {
  placeholder?: string;
  value?: string;
  onChange: (newValue: string) => void;
  options: string[];
};

export function Dropdown({ placeholder = "Select an option", value = "", onChange, options }: DropdownProps) {
  const [open, setOpen] = useState(false);

  const handleOptionClick = (option: string) => {
    onChange(option);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full cursor-pointer"
        onClick={() => setOpen(!open)}
        type="button">
        <div className="flex items-center justify-between w-full">
          {value || placeholder}
          <svg
            className="w-2.5 h-2.5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
          </svg>
        </div>
      </button>

      <ul
        className={cn(
          "z-1000 py-2 text-sm text-gray-700 bg-white dark:text-gray-200 absolute dark:bg-gray-700 w-full rounded-lg shadow-sm",
          { block: open, hidden: !open }
        )}>
        {options.map((option, index) => (
          <li
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
            onClick={() => handleOptionClick(option)}
            key={index}>
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
}
