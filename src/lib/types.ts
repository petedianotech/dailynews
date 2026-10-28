export type ArticleCategory = "tech" | "ai" | "software";

export type Article = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  url: string;
  source: string;
  category: ArticleCategory;
  publishedAt: string;
  imageUrl?: string;
};
