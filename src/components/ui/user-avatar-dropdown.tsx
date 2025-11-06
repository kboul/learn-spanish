"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useAuth, useClerk } from "@clerk/nextjs";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { usePathname } from "next/navigation";

const getUserInitials = (user: any) => {
  if (user?.firstName && user?.lastName) `${user.firstName.charAt(0)}${user.lastName?.charAt(0) ?? ""}`.toUpperCase();
  return "AB";
};

export default function UserAvatarDropdown({ user }: { user: any }) {
  const { signOut, openSignIn } = useClerk();
  const { isSignedIn } = useAuth();
  const pathname = usePathname();

  const handleSignIn = () => openSignIn({ afterSignInUrl: pathname });
  // Optional: redirect after sign out redirectUrl: url you want to redirect to
  const handleSignOut = () => signOut();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <AvatarFallback>{getUserInitials(user)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="bottom">
        {!user && <DropdownMenuLabel>My Account</DropdownMenuLabel>}{" "}
        {user && (
          <DropdownMenuLabel>
            <span className="block text-sm text-gray-900 dark:text-white">
              {user?.firstName} {user?.lastName}
            </span>
            <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
              {user?.emailAddresses[0].emailAddress}
            </span>
          </DropdownMenuLabel>
        )}
        <DropdownMenuSeparator />
        {!isSignedIn && <DropdownMenuItem onClick={handleSignIn}>Login</DropdownMenuItem>}
        {isSignedIn && <DropdownMenuItem onClick={handleSignOut}>Logout</DropdownMenuItem>}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
