import Parser from "rss-parser";
import type { Article, ArticleCategory } from "./types";

const parser = new Parser({ timeout: 10000 });

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function detectCategory(title: string, description: string): ArticleCategory {
  const text = `${title} ${description}`.toLowerCase();
  if (/(artificial intelligence|\bai\b|machine learning|llm|openai|anthropic|gemini)/.test(text)) return "ai";
  if (/(software|developer|programming|typescript|javascript|python|github|devops|cloud)/.test(text)) return "software";
  return "tech";
}

function stripHtml(value?: string) {
  return (value ?? "").replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

export async function fetchRssArticles(feedUrls: string[]): Promise<Article[]> {
  const results = await Promise.allSettled(
    feedUrls.map(async (feedUrl) => {
      const feed = await parser.parseURL(feedUrl);
      return feed.items.slice(0, 25).map((item, index) => {
        const title = item.title ?? "Untitled story";
        const summary = stripHtml(item.contentSnippet || item.content || item.summary);
        const publishedAt = item.isoDate ?? item.pubDate ?? new Date().toISOString();
        const source = new URL(feedUrl).hostname.replace("www.", "");
        return {
          id: `${source}-${slugify(title)}-${index}`,
          slug: `${slugify(title)}-${Date.now().toString(36)}`,
          title,
          summary: summary.slice(0, 280),
          url: item.link ?? feedUrl,
          source,
          category: detectCategory(title, summary),
          publishedAt
        } satisfies Article;
      });
    })
  );

  return results
    .filter((result): result is PromiseFulfilledResult<Article[]> => result.status === "fulfilled")
    .flatMap((result) => result.value)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}
