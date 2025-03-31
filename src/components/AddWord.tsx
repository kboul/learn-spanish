"use client";
import { useState } from "react";
import { toast } from "react-toastify";

import Button from "./ui/Button";
import { Input } from "./ui/Input";
import { addWord } from "@/actions";

const initialNewWord = { spanish: "", greek: "", english: "", learned: false, highlight: false };

export function AddWord() {
  const [newWord, setNewWord] = useState(initialNewWord);

  const { spanish, greek, english, learned, highlight } = newWord;
  const setNewWordValue = (keyValuePair: Partial<typeof newWord>) => setNewWord({ ...newWord, ...keyValuePair });

  const addBtnDisabled = !spanish.trim() || !english.trim() || !greek.trim();

  const handleWordClear = () => setNewWordValue(initialNewWord);

  const handleWordAdd = async () => {
    if (addBtnDisabled) return;

    const { message, error } = await addWord(newWord);
    toast[error ? "error" : "success"](message || error);
    if (!error) handleWordClear();
  };

  const changeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name, type, value } = e.target;
    const finalValue = type === "checkbox" ? checked : value;
    setNewWordValue({ [name]: finalValue });
  };

  return (
    <div className="flex gap-2">
      <Input name="spanish" onChange={changeInputValue} placeholder="Spanish" value={spanish} />

      <Input name="english" onChange={changeInputValue} placeholder="English" value={english} />

      <Input name="greek" onChange={changeInputValue} placeholder="Greek" value={greek} />

      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <label className="text-sm flex items-center">Learned</label>
          <Input name="learned" onChange={changeInputValue} placeholder="Learned" type="checkbox" checked={learned} />
        </div>

        <div className="flex gap-1">
          <label className="text-sm flex items-center">Highlight</label>
          <Input
            name="highlight"
            onChange={changeInputValue}
            placeholder="Highlight"
            type="checkbox"
            checked={highlight}
          />
        </div>
      </div>

      <Button className={!addBtnDisabled ? "cursor-pointer" : ""} onClick={handleWordAdd}>
        Add
      </Button>
      <Button color="red" className={!addBtnDisabled ? "cursor-pointer" : ""} onClick={handleWordClear}>
        Clear
      </Button>
    </div>
  );
}
