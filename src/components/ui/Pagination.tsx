"use client";

import { useRouter } from "next/navigation";
import { itemsPerPage } from "@/core/constants";
import { cn } from "@/core/utils";

export function Pagination({ page, total }: { page: number; total: number }) {
  const router = useRouter();

  const hasPrevious = itemsPerPage * (page - 1) > 0;
  const hasNext = itemsPerPage * (page - 1) + itemsPerPage < total;

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", newPage.toString());
    router.push(`${window.location.pathname}?${params}`);
  };

  return (
    <nav>
      <ul className="inline-flex -space-x-px text-sm">
        <li>
          <button
            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed cursor-pointer"
            disabled={!hasPrevious}
            onClick={() => changePage(page - 1)}>
            Previous
          </button>
        </li>
        {Array.from({ length: Math.ceil(total / itemsPerPage) }, (_, index) => {
          const pageIndex = index + 1;
          const isActive = page === pageIndex;
          return (
            <li key={index}>
              <button
                className={cn(
                  "flex items-center justify-center px-3 h-8 leading-tight cursor-pointer border border-gray-300 hover:bg-gray-100 hover:text-gray-700",
                  {
                    "text-blue-600  bg-blue-50 ": isActive,
                    "text-gray-500 bg-white": !isActive
                  }
                )}
                onClick={() => changePage(pageIndex)}>
                {pageIndex}
              </button>
            </li>
          );
        })}

        <li>
          <button
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed cursor-pointer"
            disabled={!hasNext}
            onClick={() => changePage(page + 1)}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
