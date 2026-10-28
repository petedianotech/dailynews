import Link from "next/link";

const categories = ["tech", "ai", "software"];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="text-xl font-black tracking-tight text-brand-700">
          Daily<span className="text-slate-900">News</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 sm:flex">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/category/${category}`}
              className="capitalize transition hover:text-brand-700"
            >
              {category}
            </Link>
          ))}
          <Link href="/search" className="transition hover:text-brand-700">
            Search
          </Link>
        </nav>
      </div>
    </header>
  );
}
