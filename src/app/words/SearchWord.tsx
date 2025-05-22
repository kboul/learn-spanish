"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
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
            <svg
              className="w-5 h-5 text-gray-800 dark:text-white"
              aria-hidden="true"
              onClick={handleClear}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18 17.94 6M18 18 6.06 6"
              />
            </svg>
          </div>
        )}
      </div>
    </form>
  );
}
