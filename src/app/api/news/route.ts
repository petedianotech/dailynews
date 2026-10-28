import { NextResponse } from "next/server";
import { getArticles } from "@/lib/news";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") ?? undefined;
  const query = searchParams.get("q") ?? undefined;
  const articles = await getArticles();
  const filtered = articles.filter((article) => {
    const matchesCategory = !category || article.category === category;
    const normalized = query?.toLowerCase().trim();
    const matchesQuery = !normalized || article.title.toLowerCase().includes(normalized);
    return matchesCategory && matchesQuery;
  });

  return NextResponse.json({ count: filtered.length, articles: filtered.slice(0, 50) });
}
