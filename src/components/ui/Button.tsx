import { cn } from "@/core/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  color?: "default" | "alternative" | "red" | "green" | "yellow" | "blue" | "light" | "dark";
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
};

export function Button({ children, className, color = "default", size = "md", ...otherProps }: ButtonProps) {
  return (
    <button
      type="button"
      className={cn("text-white focus:ring-4 font-medium rounded-lg cursor-pointer", {
        "bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800":
          color === "default",
        "bg-red-700 hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900": color === "red",
        "bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800":
          color === "green",
        "text-gray-900 bg-white border border-gray-300 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700":
          color === "light",
        "bg-gray-800 hover:bg-gray-900 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700":
          color === "dark",
        "px-3 py-2 text-xs": size === "xs",
        "px-3 py-2 text-sm": size === "sm",
        "px-5 py-2.5 text-sm": size === "md",
        "px-5 py-3 text-base": size === "lg",
        "px-6 py-3.5 text-base": size === "xl",
        className
      })}
      {...otherProps}>
      {children}
    </button>
  );
}
