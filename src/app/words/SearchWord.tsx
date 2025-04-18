"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GoSearch } from "react-icons/go";
import { MdClear } from "react-icons/md";

import { Input } from "@/components";
import { getUrlParams } from "@/core/utils";

export function SearchWord({ q }: { q: string }) {
  const router = useRouter();

  const [searchWord, setSearchWord] = useState(q ?? "");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    const params = getUrlParams();
    params.delete("page");
    params.set("q", searchWord);
    router.push(`${window.location.pathname}?${params}`);
  };

  const handleClear = () => {
    const params = getUrlParams();
    params.delete("q");
    router.push(`${window.location.pathname}?${params}`);
    setSearchWord("");
  };

  return (
    <form className="flex items-center" onSubmit={(e) => e.preventDefault()}>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <GoSearch className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </div>
        <Input
          className="p-2 ps-10 w-60"
          onChange={(e) => setSearchWord(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search word..."
          value={searchWord}
        />
        {searchWord.length > 0 && (
          <div className="absolute inset-y-0 end-0 flex items-center pr-3 cursor-pointer">
            <MdClear className="w-5 h-5 text-gray-500 dark:text-gray-400" onClick={handleClear} />
          </div>
        )}
      </div>
    </form>
  );
}
