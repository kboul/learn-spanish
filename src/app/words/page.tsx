import { Suspense } from "react";

import { getMetrics, getWords, searchWord } from "@/core/actions";
import { itemsPerPage } from "@/core/constants";
import { Metrics } from "./Metrics";
import { WordsTable } from "./WordsTable";
import { Pagination } from "@/components";
import Loading from "./loading";

type HomeProps = { searchParams: Promise<{ page: string; q: string }> };

export default async function WordsPage({ searchParams }: HomeProps) {
  const { page: paramsPage, q } = await searchParams;
  const page = paramsPage ? parseInt(paramsPage) : 1;

  const { metrics, error: metricsError } = await getMetrics();

  const showPagination = metrics && metrics.totalWords > itemsPerPage;

  return (
    <main className="flex flex-col items-center min-h-screen p-5 gap-4">
      <h1 className="text-2xl font-bold">📖 Spanish Vocabulary</h1>

      <Metrics metrics={metrics} error={metricsError} />

      {/* <Suspense key={`words-${page}-${q}`} fallback={<Loading />}> */}
      <TableContent page={page} q={q} />
      {/* </Suspense> */}

      {showPagination && <Pagination page={page} total={metrics?.totalWords} />}
    </main>
  );
}

// This component only handles the table content
async function TableContent({ page, q }: { page: number; q: string }) {
  let words = [];
  let error = null;

  if (q) {
    const { searchedWords, error: searchError } = await searchWord(q);
    words = searchedWords || [];
    error = searchError;
  } else {
    const { words: fetchedWords, error: fetchError } = await getWords(page);
    words = fetchedWords || [];
    error = fetchError;
  }

  return <WordsTable q={q} words={words} error={error} />;
}
