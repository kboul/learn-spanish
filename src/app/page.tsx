import { AddWord, Metrics, Pagination, SearchWord, WordsTable } from "@/components";
import { getMetrics, getWords, searchWord } from "@/core/actions";
import { itemsPerPage } from "@/core/constants";

export default async function Home({ searchParams }: { searchParams: { page: string; q: string } }) {
  const { page: paramsPage, q } = await searchParams;
  const page = paramsPage ? parseInt(paramsPage) : 1;

  const { words, error } = await getWords(page);
  const { metrics, error: metricsError } = await getMetrics();
  const { searchedWords } = await searchWord(q);
  const finalWords = searchedWords && searchedWords?.length > 0 ? searchedWords : words;

  return (
    <main className="flex flex-col items-center min-h-screen p-5 gap-4">
      <h1 className="text-2xl font-bold ">📖 Spanish Vocabulary</h1>

      <div className="flex space-x-2 w-full justify-between">
        <Metrics metrics={metrics} error={metricsError} />
        <SearchWord q={q} />
        <AddWord />
      </div>

      <WordsTable words={finalWords} error={error} />
      {finalWords && finalWords.length > itemsPerPage - 1 && metrics && (
        <Pagination page={page} total={metrics?.totalWords} />
      )}
    </main>
  );
}
