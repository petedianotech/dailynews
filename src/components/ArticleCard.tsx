import Link from "next/link";
import type { Article } from "@/lib/types";

export default function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  return (
    <article className={`group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md ${featured ? "sm:p-7" : ""}`}>
      <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-brand-700">
        <span>{article.category}</span>
        <span className="text-slate-300">•</span>
        <time dateTime={article.publishedAt} className="text-slate-500">
          {new Date(article.publishedAt).toLocaleDateString()}
        </time>
      </div>
      <h2 className={`font-bold leading-snug text-slate-900 ${featured ? "text-2xl" : "text-lg"}`}>
        <Link href={`/article/${article.slug}`} className="group-hover:text-brand-700">
          {article.title}
        </Link>
      </h2>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">{article.summary}</p>
      <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
        <span>{article.source}</span>
        <Link href={`/article/${article.slug}`} className="font-semibold text-brand-700">
          Read →
        </Link>
      </div>
    </article>
  );
}
