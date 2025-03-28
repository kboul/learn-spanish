import { AddWord, WordsTable } from "@/components";
import { getWords } from "@/actions";

export default async function Home() {
  const { words, error } = await getWords();

  return (
    <main className="flex flex-col items-center min-h-screen p-5">
      <h1 className="text-2xl font-bold mb-4">📖 Spanish Vocabulary</h1>

      <AddWord />

      <WordsTable words={words} error={error} />
    </main>
  );
}
