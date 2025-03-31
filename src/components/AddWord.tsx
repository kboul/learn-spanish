"use client";

import { useRef } from "react";
import { toast } from "react-toastify";

import Button from "./ui/Button";
import { Input } from "./ui/Input";
import { addWord } from "@/core/actions";

export function AddWord() {
  const formRef = useRef<HTMLFormElement>(null);

  const clearForm = () => formRef.current?.reset();

  const clientAction = async (formData: FormData) => {
    const { message, error } = await addWord(formData);
    toast[error ? "error" : "success"](message || error);
    if (!error) clearForm();
  };

  return (
    <form action={clientAction} className="flex gap-2 items-center" ref={formRef}>
      <Input name="spanish" placeholder="Spanish" />

      <Input name="english" placeholder="English" />

      <Input name="greek" placeholder="Greek" />

      <div className="flex flex-col gap-2 ">
        <div className="flex gap-2">
          <label className="text-sm flex ">Learned</label>
          <Input name="learned" placeholder="Learned" type="checkbox" />
        </div>

        <div className="flex gap-1">
          <label className="text-sm flex">Highlight</label>
          <Input name="highlight" placeholder="Highlight" type="checkbox" />
        </div>
      </div>

      <Button type="submit">Add</Button>
      <Button color="red" onClick={clearForm} type="button">
        Clear
      </Button>
    </form>
  );
}
