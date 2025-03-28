import { AddWord, Metrics, WordsTable } from "@/components";
import { getMetrics, getWords } from "@/actions";

export default async function Home() {
  const { words, error } = await getWords();
  const { metrics, error: metricsError } = await getMetrics();

  return (
    <main className="flex flex-col items-center min-h-screen p-5 gap-4">
      <h1 className="text-2xl font-bold ">📖 Spanish Vocabulary</h1>

      <div className="flex space-x-2 w-full justify-between">
        <Metrics metrics={metrics} error={metricsError} />
        <AddWord />
      </div>

      <WordsTable words={words} error={error} />
    </main>
  );
}
