import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getArticleBySlug } from "@/lib/news";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  if (!article) return { title: "Article not found" };
  return {
    title: article.title,
    description: article.summary,
    alternates: { canonical: `/article/${article.slug}` }
  };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);
  if (!article) notFound();

  return (
    <article className="container-page max-w-3xl py-12">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">{article.category}</p>
      <h1 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">{article.title}</h1>
      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
        <span>{article.source}</span>
        <span>•</span>
        <time dateTime={article.publishedAt}>{new Date(article.publishedAt).toLocaleString()}</time>
      </div>
      <p className="mt-8 text-lg leading-relaxed text-slate-700">{article.summary}</p>
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-block rounded-xl bg-brand-600 px-6 py-3 font-semibold text-white transition hover:bg-brand-700"
      >
        Read the original story
      </a>
    </article>
  );
}
