import { fetchRssArticles } from "./rss";
import type { Article } from "./types";
import seedArticles from "@/data/articles.json";

let cache: { articles: Article[]; expiresAt: number } | null = null;

function sources() {
  return (process.env.NEWS_RSS_SOURCES ?? "https://techcrunch.com/feed/")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
}

export async function getArticles(force = false): Promise<Article[]> {
  const ttl = Number(process.env.NEWS_CACHE_TTL_SECONDS ?? 900) * 1000;

  if (!force && cache && cache.expiresAt > Date.now()) {
    return cache.articles;
  }

  try {
    const articles = await fetchRssArticles(sources());
    if (articles.length) {
      cache = { articles, expiresAt: Date.now() + ttl };
      return articles;
    }
  } catch (error) {
    console.error("RSS ingestion failed, using fallback content", error);
  }

  const fallback = seedArticles as Article[];
  cache = { articles: fallback, expiresAt: Date.now() + ttl };
  return fallback;
}

export async function getArticleBySlug(slug: string) {
  const articles = await getArticles();
  return articles.find((article) => article.slug === slug) ?? null;
}

export function filterArticles(articles: Article[], category?: string, query?: string) {
  return articles.filter((article) => {
    const matchesCategory = !category || article.category === category;
    const normalizedQuery = query?.toLowerCase().trim();
    const matchesQuery =
      !normalizedQuery ||
      article.title.toLowerCase().includes(normalizedQuery) ||
      article.summary.toLowerCase().includes(normalizedQuery);
    return matchesCategory && matchesQuery;
  });
}
