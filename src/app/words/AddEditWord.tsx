"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Word } from "@prisma/client";

import { Button, Field, FieldLabel, Input, FieldSeparator, AppSelect } from "@/components";
import { addEditWord } from "./actions";
import { capitalizeFirstLetter } from "@/core/utils";

const textInputClassName = "shadow-xs dark:bg-gray-600 dark:border-gray-500";

const selectItems = [
  { value: "Verb", label: "Verb" },
  { value: "Noun", label: "Noun" },
  { value: "Adverb", label: "Adverb" },
  { value: "Adjective", label: "Adjective" },
  { value: "Phrase", label: "Phrase" }
];

export function AddEditWord({ wordToEdit, onModalClose }: { wordToEdit?: Word; onModalClose?: () => void }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedClass, setSelectedClass] = useState<string | undefined>("");

  useEffect(() => {
    setSelectedClass(capitalizeFirstLetter(wordToEdit?.class ?? ""));
  }, [wordToEdit?.id, wordToEdit?.class]);

  const clearForm = () => {
    formRef.current?.reset();
    setSelectedClass("");
  };

  const addEditWordAction = async (formData: FormData) => {
    const { message, error } = await addEditWord(formData, selectedClass, wordToEdit?.id);
    if (message) onModalClose?.();
    toast[error ? "error" : "success"](message || error);
    if (!error && !wordToEdit) clearForm();
  };

  return (
    <form action={addEditWordAction} ref={formRef}>
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-6 gap-6">
          <Field className="col-span-6 sm:col-span-3">
            <FieldLabel>Name on Card</FieldLabel>
            <Input
              className={textInputClassName}
              defaultValue={wordToEdit?.spanish ?? ""}
              name="spanish"
              placeholder="Spanish"
            />
          </Field>
          <Field className="col-span-6 sm:col-span-3">
            <FieldLabel>English</FieldLabel>
            <Input
              className={textInputClassName}
              defaultValue={wordToEdit?.english ?? ""}
              name="english"
              placeholder="English"
            />
          </Field>
          <Field className="col-span-6 sm:col-span-3">
            <FieldLabel htmlFor="checkout-7j9-card-number-uw1">Greek</FieldLabel>
            <Input className={textInputClassName} defaultValue={wordToEdit?.greek} name="greek" placeholder="Greek" />
          </Field>
          <div className="flex gap-2 mt-6">
            <div className="flex items-center">
              <Input defaultChecked={wordToEdit?.learned} name="learned" placeholder="Learned" type="checkbox" />
              <FieldLabel className="m-2">Learned</FieldLabel>
            </div>
            <div className="flex items-center">
              <Input defaultChecked={wordToEdit?.highlight} name="highlight" placeholder="Highlight" type="checkbox" />
              <FieldLabel className="m-2">Highlight</FieldLabel>
            </div>
          </div>
          <Field className="col-span-6 sm:col-span-3">
            <FieldLabel>Class</FieldLabel>
            <AppSelect
              placeholder="Select a class"
              onValueChange={(value) => setSelectedClass(value)}
              items={selectItems}
              value={selectedClass}
            />
          </Field>
        </div>
      </div>

      <FieldSeparator />
      <Field className="flex items-center justify-end p-2" orientation="horizontal">
        <Button type="submit">{wordToEdit ? "Edit" : "Add"}</Button>
        {!wordToEdit && (
          <Button color="red" onClick={clearForm} type="button">
            Clear
          </Button>
        )}
      </Field>
    </form>
  );
}
