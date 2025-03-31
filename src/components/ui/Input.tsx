import { cn } from "@/core/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

export function Input({ className, ...otherProps }: InputProps) {
  return (
    <input
      className={cn(
        "block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500",
        { className }
      )}
      {...otherProps}
    />
  );
}
