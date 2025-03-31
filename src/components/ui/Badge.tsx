import { cn } from "@/core/utils";
import { ComponentProps } from "react";

type BadgeProps = ComponentProps<"span"> & {
  children: React.ReactNode;
  className?: string;
  color?: string;
};

export default function Badge({ children, className = "", color = "default", ...otherProps }: BadgeProps) {
  return (
    <span
      className={cn("text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm", {
        "bg-blue-100 text-blue-800": color === "default",
        "bg-green-100 text-green-800": color === "green",
        "bg-red-100 text-red-800": color === "red",
        "bg-yellow-100 text-yellow-800": color === "yellow",
        className
      })}
      {...otherProps}>
      {children}
    </span>
  );
}
