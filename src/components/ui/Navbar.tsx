"use client";

import { useState } from "react";
import { useAuth, useClerk, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

import { cn } from "@/core/utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getUserInitials = (user: any) => {
  if (!user) return null;
  return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
};

export function Navbar() {
  const { signOut, openSignIn } = useClerk();
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const pathname = usePathname();

  const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleSignIn = () => openSignIn({ afterSignInUrl: pathname });

  // Optional: redirect after sign out redirectUrl: allPaths.home.href
  const handleSignOut = () => signOut();

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Learn Spanish</span>
        </div>
        <div className="flex items-center gap-3">
          {/* User avatar menu */}
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">
            <button
              type="button"
              className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded="false"
              onClick={() => setUserMenuOpen((prevState) => !prevState)}
              data-dropdown-placement="bottom">
              <span className="sr-only">burgerMenuO user menu</span>
              <div className="cursor-pointer relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <span className="font-medium text-gray-600 dark:text-gray-300">{getUserInitials(user) ?? "AB"}</span>
              </div>
            </button>

            <div
              className={cn(
                "absolute top-8 right-0 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm dark:bg-gray-700 dark:divide-gray-600",
                {
                  block: userMenuOpen,
                  hidden: !userMenuOpen
                }
              )}>
              {user && (
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">
                    {user?.firstName} {user?.lastName}
                  </span>
                  <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                    {user?.emailAddresses[0].emailAddress}
                  </span>
                </div>
              )}
              <ul className="py-2" aria-labelledby="user-menu-button">
                {!isSignedIn && (
                  <li>
                    <span
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer"
                      onClick={handleSignIn}>
                      Login
                    </span>
                  </li>
                )}
                {isSignedIn && (
                  <li>
                    <span
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white cursor-pointer"
                      onClick={handleSignOut}>
                      Logout
                    </span>
                  </li>
                )}
              </ul>
            </div>
            <button
              type="button"
              className="cursor-pointer inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-expanded="false"
              onClick={() => setBurgerMenuOpen((prevState) => !prevState)}>
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
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
