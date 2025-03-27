import { useShallow } from "zustand/react/shallow";

import { addWord, getWords } from "@/actions";
import { initialNewWord, useWordsStore } from "@/store";

export function AddWord() {
  const [newWord, setWordsStoreValue] = useWordsStore(useShallow((state) => [state.newWord, state.setWordsStoreValue]));
  const { spanish, english, greek, learned, highlight } = newWord;

  const addBtnDisabled = !spanish.trim() || !english.trim() || !greek.trim();

  const handleAddWord = async () => {
    if (addBtnDisabled) return;

    await addWord(newWord);
    const updatedWords = await getWords(); // Fetch updated list
    setWordsStoreValue({ words: updatedWords, newWord: initialNewWord });
  };

  const changeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name, type, value } = e.target;
    const finalValue = type === "checkbox" ? checked : value;
    setWordsStoreValue({ newWord: { ...newWord, [name]: finalValue } });
  };

  console.log(newWord);

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
    </div>
  );
}
