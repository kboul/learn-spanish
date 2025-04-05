"use client";

import { cn } from "@/core/utils";
import { ComponentProps } from "react";

type BadgeProps = ComponentProps<"span"> & {
  children: React.ReactNode;
  className?: string;
  color?: string;
  size?: "xs" | "sm";
};

export function Badge({ children, className = "", color = "default", size = "xs", ...otherProps }: BadgeProps) {
  return (
    <span
      className={cn(
        "font-medium px-2.5 py-0.5 rounded-sm",
        {
          "text-xs": size === "xs",
          "text-sm": size === "sm",
          "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300": color === "default",
          "bg-gray-100 text-gray-800 dark:text-gray-300": color === "dark",
          "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300": color === "green",
          "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300": color === "red",
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300": color === "yellow",
          "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300": color === "indigo",
          "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300": color === "purple",
          "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300": color === "pink"
        },
        className
      )}
      {...otherProps}>
      {children}
    </span>
  );
}
