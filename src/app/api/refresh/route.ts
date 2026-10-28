import { NextResponse } from "next/server";
import { getArticles } from "@/lib/news";

export const dynamic = "force-dynamic";

export async function POST() {
  const articles = await getArticles(true);
  return NextResponse.json({ refreshed: true, count: articles.length });
}
