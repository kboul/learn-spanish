import { cn } from "@/core/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  color?: "default" | "alternative" | "red" | "green" | "yellow" | "blue" | "light" | "dark";
  className?: string;
};

export default function Button({ children, className, color = "default", ...otherProps }: ButtonProps) {
  return (
    <button
      type="button"
      className={cn("text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 cursor-pointer", {
        "bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800":
          color === "default",
        "bg-red-700 hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900": color === "red",
        "bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800":
          color === "green",
        className
      })}
      {...otherProps}>
      {children}
    </button>
  );
}
