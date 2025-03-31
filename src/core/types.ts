import { Word } from "@prisma/client/edge";

type NewWord = Omit<Word, "id">; // take all and exlcude id

export type { NewWord };
