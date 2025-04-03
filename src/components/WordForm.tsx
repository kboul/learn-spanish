"use client";

import { useRef } from "react";
import { toast } from "react-toastify";

import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { addWord } from "@/core/actions";
import { Label } from "./ui/Label";
import { Word } from "@prisma/client";

const textInputClassName = "shadow-xs dark:bg-gray-600 dark:border-gray-500";

export function WordForm({ wordToEdit }: { wordToEdit?: Word }) {
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
            <Label>Spanish</Label>
            <Input
              className={textInputClassName}
              defaultValue={wordToEdit?.spanish ?? ""}
              name="spanish"
              placeholder="Spanish"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <Label>English</Label>
            <Input
              className={textInputClassName}
              defaultValue={wordToEdit?.english ?? ""}
              name="english"
              placeholder="English"
            />
          </div>
          <div className="col-span-6 sm:col-span-3">
            <Label>Greek</Label>
            <Input className={textInputClassName} defaultValue={wordToEdit?.greek} name="greek" placeholder="Greek" />
          </div>
          <div className="flex flex-col justify-center mt-5">
            <div className="flex items-center">
              <Input defaultChecked={wordToEdit?.learned} name="learned" placeholder="Learned" type="checkbox" />
              <Label className="ms-2">Learned</Label>
            </div>
            <div className="flex items-center">
              <Input defaultChecked={wordToEdit?.highlight} name="highlight" placeholder="Highlight" type="checkbox" />
              <Label className="ms-2">Highlight</Label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b">
        <Button type="submit">{wordToEdit ? "Edit" : "Add"}</Button>
        <Button color="red" onClick={clearForm} type="button">
          Clear
        </Button>
      </div>
    </form>
  );
}
