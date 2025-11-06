"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";

import { cn } from "@/core/utils";
import UserAvatarDropdown from "./user-avatar-dropdown";

export function Navbar({ Metrics }: { Metrics: React.ReactNode }) {
  const { user } = useUser();

  const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);

  return (
    <nav>
      <div className="flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Learn Spanish</span>
        </div>
        <div className="flex items-center gap-3">
          {/* User avatar menu */}
          <div className="flex items-center md:order-2 space-x-3 gap-3 md:space-x-0 rtl:space-x-reverse relative">
            {Metrics}
            <UserAvatarDropdown user={user} />
          </div>

          {/* Burger menu */}
          <div
            className={cn("items-center justify-between hidden w-full md:flex md:w-auto md:order-1", {
              block: burgerMenuOpen,
              hidden: !burgerMenuOpen
            })}>
            {/* <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  aria-current="page">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                  About
                </a>
              </li>
            </ul> */}
          </div>
        </div>
      </div>
    </nav>
  );
}
