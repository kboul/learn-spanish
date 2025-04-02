import { MdClear } from "react-icons/md";

import { cn } from "@/core/utils";

type ModalProps = { children: React.ReactNode; onClose: () => void; open: boolean; title: string };

export function Modal({ children, onClose, open, title }: ModalProps) {
  return (
    <div
      className={cn(
        "fixed z-50 items-center flex justify-center w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full",
        { visible: open, hidden: !open }
      )}
      tabIndex={-1}
      aria-hidden="true">
      <div className="relative w-full max-w-2xl max-h-full">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 border-b rounded-t border-gray-200 dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              onClick={onClose}>
              <MdClear className="w-5 h-5 cursor-pointer" />

              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {/* Modal body */}
          {children}
        </div>
      </div>
    </div>
  );
}
