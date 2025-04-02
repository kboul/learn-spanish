"use client";

import { useRef } from "react";
import { toast } from "react-toastify";

import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { addWord } from "@/core/actions";

export function WordForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const clearForm = () => formRef.current?.reset();

  const clientAction = async (formData: FormData) => {
    const { message, error } = await addWord(formData);
    toast[error ? "error" : "success"](message || error);
    if (!error) clearForm();
  };

  return (
    <form action={clientAction} ref={formRef}>
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="spanish" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Spanish
            </label>
            <Input className="shadow-xs dark:bg-gray-600 dark:border-gray-500" name="spanish" placeholder="Spanish" />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="last-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              English
            </label>
            <Input className="shadow-xs dark:bg-gray-600 dark:border-gray-500" name="english" placeholder="English" />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Greek
            </label>
            <Input className="shadow-xs dark:bg-gray-600 dark:border-gray-500" name="greek" placeholder="Greek" />
          </div>
          <div className="flex flex-col justify-center mt-7">
            <div className="flex items-center">
              <Input name="learned" placeholder="Learned" type="checkbox" />
              <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Learned</label>
            </div>
            <div className="flex items-center">
              <Input name="highlight" placeholder="Highlight" type="checkbox" />
              <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Highlight</label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b">
        <Button type="submit">Add</Button>
        <Button color="red" onClick={clearForm} type="button">
          Clear
        </Button>
      </div>
    </form>
  );
}
