import NewsGrid from "@/components/NewsGrid";
import SearchBar from "@/components/SearchBar";
import { getArticles } from "@/lib/news";

export const revalidate = 900;

export default async function HomePage() {
  const articles = await getArticles();

  return (
    <div className="container-page py-10">
      <section className="mb-10 rounded-3xl bg-gradient-to-br from-brand-900 via-brand-700 to-indigo-500 p-8 text-white sm:p-12">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-indigo-200">
          Daily technology intelligence
        </p>
        <h1 className="max-w-3xl text-3xl font-black leading-tight sm:text-5xl">
          Tech, AI, and software news for people who build.
        </h1>
        <p className="mt-4 max-w-2xl text-indigo-100">
          Stay current with the stories shaping modern engineering, artificial intelligence, and the software industry.
        </p>
        <div className="mt-6">
          <SearchBar />
        </div>
      </section>

      <section>
        <div className="mb-5 flex items-end justify-between">
          <h2 className="text-2xl font-bold">Latest stories</h2>
          <span className="text-sm text-slate-500">Updated automatically from trusted RSS sources</span>
        </div>
        <NewsGrid articles={articles.slice(0, 18)} featured />
      </section>
    </div>
  );
}
