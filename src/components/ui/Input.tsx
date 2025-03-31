export function Input({ ...otherProps }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
      {...otherProps}
    />
  );
}
