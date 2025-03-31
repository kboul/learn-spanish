import { cn } from "@/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  color?: "default" | "alternative" | "red" | "green" | "yellow" | "blue" | "light" | "dark";
  className?: string;
};

export default function Button({ children, className, color = "default", ...otherProps }: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 cursor-pointer",
        {
          "bg-blue-700 hover:bg-blue-800": color === "default",
          "bg-red-700 hover:bg-red-800": color === "red",
          "bg-green-700 hover:bg-green-800": color === "green",
          className
        }
      )}
      {...otherProps}>
      {children}
    </button>
  );
}
