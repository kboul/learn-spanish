import { cn } from "@/core/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  label?: string;
};

export function Input({ className, label = "", ...otherProps }: InputProps) {
  return (
    <div className="flex">
      <label htmlFor="department" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <input
        className={cn(
          "block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
          { className }
        )}
        {...otherProps}
      />
    </div>
  );
}
