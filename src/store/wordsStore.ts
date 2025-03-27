import { create } from "zustand";
import { Word } from "@prisma/client";

import { NewWord } from "@/types";

type StoreState = {
  words: Word[];
  newWord: NewWord;
  setWordsStoreValue: (keyValuePair: Partial<StoreState>) => void;
};

export const initialNewWord = { spanish: "", greek: "", english: "", learned: false, highlight: false };

export const useWordsStore = create<StoreState>((set) => ({
  words: [],
  newWord: initialNewWord,
  setWordsStoreValue: (keyValuePair: Partial<StoreState>) => set((state) => ({ ...state, ...keyValuePair }))
}));
