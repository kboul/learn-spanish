"use client";

import { GoSearch } from "react-icons/go";
import { Input } from "./ui/Input";

export function SearchWord() {
  return (
    <form>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <GoSearch className="w-5 h-5 text-gray-500" />
        </div>
        <Input type="search" placeholder="Search word..." />
      </div>
    </form>
  );
}
