import { useShallow } from "zustand/react/shallow";

import { addWord, getWords, markAsLearned } from "@/actions";
import { initialNewWord, useWordsStore } from "@/store";

export function AddWord() {
  const [words, newWord, setWordsStoreValue] = useWordsStore(
    useShallow((state) => [state.words, state.newWord, state.setWordsStoreValue])
  );
  const { spanish, english, greek } = newWord;

  const addBtnDisabled = !spanish.trim() || !english.trim() || !greek.trim();

  const handleAddWord = async () => {
    if (addBtnDisabled) return;

    await addWord({ spanish, english, greek, learned: false, forget: false });
    const updatedWords = await getWords(); // Fetch updated list
    setWordsStoreValue({ words: updatedWords, newWord: initialNewWord });
  };

  const handleMarkAsLearned = async (id: number) => {
    await markAsLearned(id);
    setWordsStoreValue({ words: words.map((w) => (w.id === id ? { ...w, learned: true } : w)) });
  };

  const changeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWordsStoreValue({ newWord: { ...newWord, [name]: value } });
  };

  console.log(newWord);

  return (
    <div className="flex gap-2 mb-4">
      <input className="border p-2" name="spanish" placeholder="Spanish" value={spanish} onChange={changeInputValue} />

      <input className="border p-2" name="english" placeholder="English" value={english} onChange={changeInputValue} />

      <input className="border p-2" name="greek" placeholder="Greek" value={greek} onChange={changeInputValue} />

      <button
        className={`bg-blue-500 text-white px-4 py-2 rounded ${!addBtnDisabled && "cursor-pointer"}`}
        onClick={handleAddWord}>
        Add
      </button>
    </div>
  );
}
