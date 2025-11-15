"use client";

import { cn } from "@/core/utils";

type TableProps<T> = {
  data?: T[];
  errorMsg?: string;
  headers: { name: string; className?: string }[];
  height?: string;
  noItemsMsg?: string;
  renderRow: (item: T, index: number) => React.ReactNode;
};

const TrWithColSpan = ({ colSpan, children }: { colSpan: number; children: React.ReactNode }) => (
  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 dark:text-white">
    <td className="px-6 py-3 text-center" colSpan={colSpan}>
      {children}
    </td>
  </tr>
);

export function LegacyTable<T>({ data, errorMsg = "", headers, height, noItemsMsg = "", renderRow }: TableProps<T>) {
  return (
    <div className={cn("relative overflow-x-auto shadow-md sm:rounded-lg", height)}>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {headers.map(({ name, className = "" }) => (
              <th scope="col" className={`px-6 py-3 ${className} dark:text-white`} key={name}>
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map(renderRow)}
          {data?.length === 0 && <TrWithColSpan colSpan={headers.length}>{noItemsMsg}</TrWithColSpan>}
          {errorMsg && <TrWithColSpan colSpan={headers.length}>{errorMsg}</TrWithColSpan>}
        </tbody>
      </table>
    </div>
  );
}
