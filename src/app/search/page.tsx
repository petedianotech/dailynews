import type { Metadata } from "next";
import NewsGrid from "@/components/NewsGrid";
import SearchBar from "@/components/SearchBar";
import { filterArticles, getArticles } from "@/lib/news";

export const metadata: Metadata = { title: "Search" };

export const revalidate = 900;

export default async function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const query = searchParams.q ?? "";
  const articles = filterArticles(await getArticles(), undefined, query);

  return (
    <div className="container-page py-12">
      <h1 className="mb-4 text-3xl font-black">Search</h1>
      <SearchBar initialQuery={query} />
      <p className="my-8 text-slate-600">
        {query ? `${articles.length} results for “${query}”` : "Search across all ingested stories."}
      </p>
      <NewsGrid articles={articles} />
    </div>
  );
}
