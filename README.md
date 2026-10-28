# DailyNews

A modern, production-ready daily news platform focused on **technology, AI, and software**.

Built with Next.js App Router, TypeScript, Tailwind CSS, RSS ingestion, server-side rendering, and Docker-ready deployment.

## Features

- Tech, AI, and software news categories
- Homepage with featured and latest stories
- Article detail pages with SEO metadata
- Category pages and client-side search
- RSS ingestion API for automated daily updates
- Responsive, accessible modern UI
- Docker and GitHub Actions CI
- Scalable architecture with cached data fetching

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

## Refresh news

```bash
curl -X POST http://localhost:3000/api/refresh
```

Configure trusted RSS sources in `.env.local`:

```env
NEWS_RSS_SOURCES=https://techcrunch.com/feed/,https://www.theverge.com/rss/index.xml,https://feeds.arstechnica.com/arstechnica/index
```

## Deployment

The project includes a multi-stage Dockerfile:

```bash
docker compose up --build
```

For Vercel, import the repository and deploy with the default Next.js settings.

## License

MIT
