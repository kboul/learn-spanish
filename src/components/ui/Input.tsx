import { cn } from "@/core/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  label?: string;
};

export function Input({ className = "", ...otherProps }: InputProps) {
  const type = otherProps.type || "text";
  return (
    <input
      className={cn(
        {
          "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500":
            type === "text",
          "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600":
            type === "checkbox"
        },
        className
      )}
      {...otherProps}
    />
  );
}
