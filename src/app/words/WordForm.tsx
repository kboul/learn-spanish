"use client";

import { useRef, useState } from "react";
import { toast } from "react-toastify";

import { Button, Dropdown, Input, Label } from "@/components";
import { addEditWord } from "./actions";
import { Word } from "@prisma/client";

const textInputClassName = "shadow-xs dark:bg-gray-600 dark:border-gray-500";

export function WordForm({ wordToEdit }: { wordToEdit?: Word }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedClass, setSelectedClass] = useState<string | undefined>(wordToEdit?.class ?? "");

  const clearForm = () => formRef.current?.reset();

  const clientAction = async (formData: FormData) => {
    const { message, error } = await addEditWord(formData, selectedClass, wordToEdit?.id);
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
          <div className="flex gap-2 mt-6">
            <div className="flex items-center">
              <Input defaultChecked={wordToEdit?.learned} name="learned" placeholder="Learned" type="checkbox" />
              <Label className="m-2">Learned</Label>
            </div>
            <div className="flex items-center">
              <Input defaultChecked={wordToEdit?.highlight} name="highlight" placeholder="Highlight" type="checkbox" />
              <Label className="m-2">Highlight</Label>
            </div>
          </div>
          <div className="col-span-6 sm:col-span-3">
            <Label>Class</Label>
            <Dropdown
              value={selectedClass}
              onChange={(value) => setSelectedClass(value)}
              options={["Verb", "Noun", "Adverb", "Adjective"]}
            />
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
