import { AddWord, Metrics, Pagination, SearchWord, WordsTable } from "@/components";
import { getMetrics, getWords } from "@/core/actions";

export default async function Home({ searchParams }: { searchParams: { page: string } }) {
  const { page: paramsPage } = await searchParams;
  const page = paramsPage ? parseInt(paramsPage) : 1;

  const { words, error } = await getWords(page);
  const { metrics, error: metricsError } = await getMetrics();

  return (
    <main className="flex flex-col items-center min-h-screen p-5 gap-4">
      <h1 className="text-2xl font-bold ">📖 Spanish Vocabulary</h1>

      <div className="flex space-x-2 w-full justify-between">
        <Metrics metrics={metrics} error={metricsError} />
        <SearchWord />
        <AddWord />
      </div>

      <WordsTable words={words} error={error} />
      {metrics && <Pagination page={page} total={metrics?.totalWords} />}
    </main>
  );
}
