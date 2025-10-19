import { Metrics } from "./Metrics";
import { WordsTable } from "./WordsTable";
import { Navbar, Pagination } from "@/components";
import { SearchWord } from "./SearchWord";
import { getMetrics, getWords, searchWord } from "./actions";
import { itemsPerPage } from "@/core/constants";

type HomeProps = { searchParams: Promise<{ page: string; q: string }> };

export default async function WordsPage({ searchParams }: HomeProps) {
  const { page: paramsPage, q } = await searchParams;
  const page = paramsPage ? parseInt(paramsPage) : 1;

  const { words, error } = await getWords(page);
  const { metrics, error: metricsError } = await getMetrics();
  const { searchedWords } = await searchWord(q);
  const showPagination = q ? searchedWords && searchedWords.length > itemsPerPage - 1 : true;

  return (
    <main>
      <Navbar Metrics={<Metrics metrics={metrics} error={metricsError} />} />
      <div className="flex flex-col items-center min-h-screen p-5 gap-4">
        <WordsTable
          Header={<SearchWord q={q} />}
          Footer={showPagination && metrics && <Pagination page={page} total={metrics?.totalWords} />}
          words={q ? searchedWords : words}
          error={error}
        />
      </div>
    </main>
  );
}

//{/* <Suspense key={`words-${page}-${q}`} fallback={<Loading />}> */}{/* </Suspense> */}
// async function TableContent({ page, q }: { page: number; q: string }) {
//   let words = [];
//   let error = null;

//   if (q) {
//     const { searchedWords, error: searchError } = await searchWord(q);
//     words = searchedWords || [];
//     error = searchError;
//   } else {
//     const { words: fetchedWords, error: fetchError } = await getWords(page);
//     words = fetchedWords || [];
//     error = fetchError;
//   }

//   return <WordsTable words={words} error={error} />;
// }
