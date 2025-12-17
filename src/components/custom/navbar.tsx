"use client";

import { useUser } from "@clerk/nextjs";
import UserAvatarDropdown from "./user-avatar-dropdown";

export function Navbar({ Metrics }: { Metrics: React.ReactNode }) {
  const { user } = useUser();
  return (
    <nav>
      <div className="flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Learn Spanish</span>
        </div>
        <div className="flex items-center gap-3">
          {/* User avatar menu */}
          <div className="flex items-center md:order-2 space-x-0 gap-1 md:space-x-3 md:gap-3 rtl:space-x-reverse relative">
            {Metrics}
            <UserAvatarDropdown user={user} />
          </div>
        </div>
      </div>
    </nav>
  );
}
