import ArticleCard from "./ArticleCard";
import type { Article } from "@/lib/types";

export default function NewsGrid({ articles, featured = false }: { articles: Article[]; featured?: boolean }) {
  if (!articles.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
        No articles found yet. Run the news refresh endpoint to ingest stories.
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article, index) => (
        <ArticleCard key={article.slug} article={article} featured={featured && index === 0} />
      ))}
    </div>
  );
}
