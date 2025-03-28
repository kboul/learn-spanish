"use client";
import { useState } from "react";
import { toast } from "react-toastify";

import { addWord } from "@/actions";

const initialNewWord = { spanish: "", greek: "", english: "", learned: false, highlight: false };

export function AddWord() {
  const [newWord, setNewWord] = useState(initialNewWord);

  const { spanish, greek, english, learned, highlight } = newWord;
  const setNewWordValue = (keyValuePair: Partial<typeof newWord>) => setNewWord({ ...newWord, ...keyValuePair });

  const addBtnDisabled = !spanish.trim() || !english.trim() || !greek.trim();

  const handleClearWord = () => setNewWordValue(initialNewWord);

  const handleAddWord = async () => {
    if (addBtnDisabled) return;

    const { message, error } = await addWord(newWord);
    toast[error ? "error" : "success"](message || error);
    if (!error) handleClearWord();
  };

  const changeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name, type, value } = e.target;
    const finalValue = type === "checkbox" ? checked : value;
    setNewWordValue({ [name]: finalValue });
  };

  return (
    <div className="flex gap-2 mb-4">
      <input className="border p-2" name="spanish" onChange={changeInputValue} placeholder="Spanish" value={spanish} />

      <input className="border p-2" name="english" onChange={changeInputValue} placeholder="English" value={english} />

      <input className="border p-2" name="greek" onChange={changeInputValue} placeholder="Greek" value={greek} />

      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <label className="text-sm flex items-center">Learned</label>
          <input
            className="border p-2"
            name="learned"
            onChange={changeInputValue}
            placeholder="Learned"
            type="checkbox"
            checked={learned}
          />
        </div>

        <div className="flex gap-1">
          <label className="text-sm flex items-center">Highlight</label>
          <input
            className="border p-2"
            name="highlight"
            onChange={changeInputValue}
            placeholder="Highlight"
            type="checkbox"
            checked={highlight}
          />
        </div>
      </div>

      <button
        className={`bg-blue-500 text-white px-4 py-2 rounded ${!addBtnDisabled && "cursor-pointer"}`}
        onClick={handleAddWord}>
        Add
      </button>
      <button
        className={`bg-red-500 text-white px-4 py-2 rounded ${!addBtnDisabled && "cursor-pointer"}`}
        onClick={handleClearWord}>
        Clear
      </button>
    </div>
  );
}
