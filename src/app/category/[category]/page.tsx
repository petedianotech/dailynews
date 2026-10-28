import { notFound } from "next/navigation";
import type { Metadata } from "next";
import NewsGrid from "@/components/NewsGrid";
import { filterArticles, getArticles } from "@/lib/news";

const validCategories = ["tech", "ai", "software"];

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  if (!validCategories.includes(params.category)) return { title: "Category not found" };
  return { title: `${params.category.toUpperCase()} news` };
}

export const revalidate = 900;

export default async function CategoryPage({ params }: { params: { category: string } }) {
  if (!validCategories.includes(params.category)) notFound();
  const articles = filterArticles(await getArticles(), params.category);

  return (
    <div className="container-page py-12">
      <h1 className="mb-2 text-3xl font-black capitalize">{params.category} news</h1>
      <p className="mb-8 text-slate-600">The latest {params.category} stories from across the web.</p>
      <NewsGrid articles={articles} />
    </div>
  );
}
