export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="container-page flex flex-col items-center justify-between gap-2 py-8 text-sm text-slate-500 sm:flex-row">
        <p>© {new Date().getFullYear()} DailyNews. Built for technology builders.</p>
        <p>Powered by Next.js, TypeScript, and RSS.</p>
      </div>
    </footer>
  );
}
