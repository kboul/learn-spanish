import { cn } from "@/core/utils";

export function Label({ children, className = "" }: { children?: React.ReactNode; className?: string }) {
  return (
    <label className={cn("block mb-2 text-sm font-medium text-gray-900 dark:text-white", className)}>{children}</label>
  );
}
