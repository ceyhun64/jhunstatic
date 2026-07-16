# jhun (JhunStatic)

## Overview

This is the **static-content** variant of the `jhun` portfolio/agency site (package name `jhun`), built with Next.js 16 (App Router), React 19, and TypeScript. It shares its component library, styling, and general page layout with the sibling "Dynamic" project, but the underlying data and server surface are fundamentally different.

What makes this variant "Static," verified directly from the code:

- **No database connection exists.** There is no `lib/mongoose.ts` or any MongoDB/Mongoose driver call anywhere in the source. Blog posts, projects, and technologies are instead read from bundled JSON files — `data/blogs.json`, `data/projects.json`, `data/technologies.json` — via plain lookup functions in `lib/staticData.ts` (`getAllBlogs`, `getBlogById`, `getAllProjects`, `getProjectById`, `getAllTechnologies`, `getTechnologyById`).
- **No admin panel or auth exist.** There is no `app/admin/**` route, no `components/admin/**`, and no `app/api/auth/[...nextauth]` route. `models/admin.ts`, `models/blog.ts`, `models/projects.ts`, `models/technology.ts` (Mongoose schema files) are still present in the repo but are **not imported anywhere** in `app/`, `components/`, or `lib/` — they are unused/vestigial leftovers from the Dynamic variant.
- **No CRUD API and no image upload endpoint exist.** Only two route handlers remain under `app/api/`: `chat` and `mail`. There is no `app/api/blog`, `app/api/projects`, `app/api/technology`, or `app/api/upload`.
- **This is not a Next.js static export.** `next.config.ts` does not set `output: 'export'`, and it defines `async headers()` (custom security headers) plus two live server API routes (`chat`, `mail`) that call external services with secret credentials — none of that is compatible with `output: 'export'`. "Static" here refers to how page **content** is sourced (bundled JSON instead of a live database), not to the Next.js build/export mode.
- **Extra SEO/content surface not present in the Dynamic variant**: additional public pages `faq`, `services`, `terms`, `privacy-policy`; a dynamically generated `app/sitemap.ts` and `app/robots.ts`; and an `app/llms.txt/route.ts` endpoint that serves a Markdown summary of the site for LLM crawlers, built from the same static `projects.json`/`blogs.json` data.

## Features (verified)

- Locale-prefixed public site (`/tr`, `/en`) — Home, About, Services, Projects (list + detail), Blog (list + detail), FAQ, Contact, Privacy Policy, Terms — driven by `next-intl` and a locale-aware request handler in `proxy.ts`.
- Content (blogs, projects, technologies) served from static JSON via `lib/staticData.ts` — no runtime database dependency for these pages.
- AI chatbot widget (`components/chatbot/**`) with the same two-tier flow as the Dynamic variant: keyword matching against `data/keywords.json`/`data/responses.json`, falling back to `POST /api/chat`.
- Contact form sending email via `POST /api/mail`.
- Rate limiting on both remaining API routes (`lib/rate-limit.ts`, in-memory, per-IP sliding window).
- Input validation on both API routes via Zod schemas.
- Cookie consent banner (`components/layout/cookieConsent.tsx`, referenced from `app/[locale]/layout.tsx`) — not present in the Dynamic variant's layout.
- Structured data (`Person`/`WebSite` JSON-LD) injected in `app/[locale]/layout.tsx`.
- Dynamically generated `sitemap.xml` and `robots.txt` (`app/sitemap.ts`, `app/robots.ts`) and an `llms.txt` markdown endpoint, all derived from the static JSON data files.
- Dark/light theme via `next-themes`; downloadable CV files (EN/TR, HTML + PDF) under `public/cv/`.

## Technology Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack), React 19, TypeScript 5 |
| Styling | Tailwind CSS 4, `tw-animate-css`, Radix UI primitives, shadcn-style components |
| Content | Static JSON files under `data/`, read via `lib/staticData.ts` |
| Validation | Zod (used in both remaining API routes) |
| Email | Nodemailer (SMTP), used in `app/api/mail/route.ts` |
| AI (server-side) | `@anthropic-ai/sdk` — used in `app/api/chat/route.ts` (Claude, model `claude-haiku-4-5-20251001`) |
| AI (declared but unused) | `@google/generative-ai`, `@mlc-ai/web-llm` — see note below |
| i18n | `next-intl` |
| Animation | Framer Motion, `motion`, GSAP, `@tsparticles/*`, `simplex-noise` |
| Forms | React Hook Form + Zod (`@hookform/resolvers`) |

**Important dependency note:** `package.json` still lists `mongodb`, `mongoose`, `next-auth`, `bcrypt`, `cloudinary`, `@google/generative-ai`, and `@mlc-ai/web-llm` — carried over from the Dynamic variant — but none of them are imported by any file under `app/`, `components/`, `lib/`, or `hooks/` in this project (the only trace of Mongoose is the unused type definitions in `models/`). `@mlc-ai/web-llm` (an in-browser/WebGPU LLM runtime) in particular has zero references anywhere in the source of either project in this workspace. Treat all of the above as unused/vestigial dependencies unless actively wired up.

## Architecture

```
Browser
  │
  ├─ /tr or /en  (locale redirect/header injection via proxy.ts)
  ▼
Next.js App Router
  ├─ app/[locale]/...   Public pages: home, about, services, projects, projects/[id],
  │                      blog, blog/[id], faq, contact, privacy-policy, terms
  ├─ app/api/
  │     ├─ chat/route.ts   → Anthropic Claude chatbot (rate-limited, Zod-validated)
  │     └─ mail/route.ts   → Nodemailer contact-form email (rate-limited, Zod-validated)
  ├─ app/sitemap.ts, app/robots.ts, app/llms.txt/route.ts   SEO/crawler endpoints
  │
  ▼
data/*.json  ──►  lib/staticData.ts  ──►  page components (no database)
```

`proxy.ts` is a Next.js 16 root convention file (successor to `middleware.ts`). Compared to the Dynamic variant's version, this one also sets an `x-locale` response header for the root layout and declares an explicit `matcher` config excluding `_next/static`, `_next/image`, `favicon.ico`, `api/`, `admin/` (an `/admin` bypass remains in the matcher even though no `/admin` route exists in this project — vestigial).

`next.config.ts` also sets `serverExternalPackages: ['@prisma/client', 'prisma']`, but Prisma is **not** a declared dependency and no Prisma import exists anywhere in the codebase — vestigial, currently has no effect. It additionally defines a `Content-Security-Policy` and other security headers via `headers()`, applied to all routes; the CSP's `connect-src` explicitly allow-lists `api.anthropic.com`.

## Folder Structure

```
JhunStatic/
├── app/
│   ├── [locale]/         Public pages: page, layout, about, contact, faq, privacy-policy,
│   │                      projects, projects/[id], services, terms, blog, blog/[id],
│   │                      loading.tsx, error.tsx
│   ├── api/
│   │   ├── chat/route.ts   Anthropic Claude chatbot (rate-limited)
│   │   └── mail/route.ts   Nodemailer contact form (rate-limited)
│   ├── llms.txt/route.ts   Markdown site summary for LLM crawlers (force-static)
│   ├── robots.ts           Dynamic robots.txt generator
│   ├── sitemap.ts          Dynamic sitemap.xml generator (from data/*.json)
│   ├── globals.css, layout.tsx, not-found.tsx, page.tsx
├── components/
│   ├── about/, blog/, contact/, faq/, home/, layout/, legal/, projects/, services/
│   ├── chatbot/           Chat widget UI + client logic
│   └── ui/                 Radix-based primitives + shadcn-io effect components
├── data/
│   ├── blogs.json, projects.json, technologies.json   Static content source
│   └── keywords.json, responses.json                   Chatbot keyword→response map
├── lib/
│   ├── staticData.ts       Typed accessors over the static JSON data
│   ├── rate-limit.ts       In-memory per-IP rate limiter used by chat/mail routes
│   ├── get-dictionary.tsx  i18n message loader
│   └── utils.ts
├── messages/               en.json, tr.json (next-intl)
├── models/                 Mongoose schema files (admin, blog, projects, technology) — unused, not imported anywhere
├── types/                  Ambient/module type declarations
├── hooks/                  use-mobile.ts, use-reduced-motion.ts
├── public/                 avatar, banner, blog, chatbot, cv, footer, logo, socialMedia,
│                            technologies, projects, og-image.png, robots.txt
├── proxy.ts                Locale-redirect + x-locale header request handler
├── next.config.ts          Security headers (CSP, HSTS, etc.), image config, Turbopack
├── components.json         shadcn config (style: new-york, base color: zinc)
└── tsconfig.json
```

## Installation

```bash
npm install
```

Requires Node.js. Because this variant serves content from bundled JSON, no database is required to run it. `app/api/chat` and `app/api/mail` still need real credentials to function. There is no `.env.example` file in this repo — set variables directly in `.env` / `.env.local`. **Never commit real key values.**

## Environment Variables

Names and purpose only, based on actual `process.env.*` references found in this project's source (a local `.env` file exists but its values are not reproduced here):

| Variable | Purpose |
|---|---|
| `ANTHROPIC_API_KEY` | Claude API key, read in `app/api/chat/route.ts`. The route throws at module load if this is missing. |
| `EMAIL_HOST`, `EMAIL_PORT`, `EMAIL_USER`, `EMAIL_PASS` | SMTP credentials for Nodemailer, used in `app/api/mail/route.ts`. `EMAIL_USER` also doubles as the fixed recipient address. |

Not verified as active in this project's code: `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `ADMIN_NAME`, `ADMIN_SURNAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `CLOUD_NAME`, `API_KEY`, `API_SECRET`, `PRISMA_QUERY_ENGINE_TYPE`, `PRISMA_CLIENT_ENGINE_TYPE`, `NEXT_PUBLIC_BASE_URL` are present in the local `.env` file (apparently carried over from the Dynamic variant's template) but no `process.env` reference to them was found anywhere in this project's `app/`, `components/`, or `lib/` source.

## Available Scripts

From `package.json` (exactly as declared — no others exist):

| Script | Command | Behavior |
|---|---|---|
| `npm run dev` | `next dev` | Starts the Next.js development server (Turbopack, per `next.config.ts`) |
| `npm run build` | `next build` | Production build |
| `npm start` | `next start` | Runs the production build |

There is no `lint` script and no ESLint config file in this repository.

## Development

```bash
npm run dev
```

Open `http://localhost:3000`. Public content pages work without any external service; the chatbot and contact form require `ANTHROPIC_API_KEY` and the `EMAIL_*` variables respectively.

## Build

```bash
npm run build
npm start
```

## Deployment

Not verifiable from the code. Although the site's page content is static (JSON-driven), `next.config.ts` does not set `output: 'export'`, and the app ships two live server-side API routes (`/api/chat`, `/api/mail`) that call external services using server-only secrets. This means it cannot be deployed as a pure static export/CDN-only site as-is — it requires a Node.js server runtime (or an equivalent serverless/edge platform that can run Next.js API routes). No `Dockerfile`, `vercel.json`, or CI configuration exists in this repo to confirm a specific deployment target.

## API

All routes are under `/api`. Verified by reading each `route.ts` file directly.

| Method | Endpoint | What it actually does |
|---|---|---|
| POST | `/api/chat` | Rate-limits by IP (20 req/min), validates body with Zod (`message`, `locale`, `context`), sends the message + last 6 history turns to Anthropic Claude (`claude-haiku-4-5-20251001`) with a hardcoded system prompt about Ceyhun Türkmen, returns `{ response: string }` |
| POST | `/api/mail` | Rate-limits by IP (3 req/min), validates body with Zod (`subject`, `message`), sends an email via Nodemailer from and to `EMAIL_USER` using `EMAIL_HOST`/`EMAIL_PORT`/`EMAIL_PASS` |

## Configuration

- Path alias `@/*` maps to the project root (`tsconfig.json`).
- shadcn/ui config (`components.json`): style `new-york`, base color `zinc`, CSS variables enabled, icon library `lucide`.
- `next.config.ts`: Cloudinary remote image pattern (`res.cloudinary.com`) even though no upload endpoint exists in this project (images are presumably pre-uploaded/static), AVIF/WebP image formats, Turbopack enabled, a full custom security-headers set (CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy) applied via `headers()`, and a vestigial `serverExternalPackages` entry for Prisma (unused, see Architecture note).

## Troubleshooting

- **Chatbot fails at startup / build**: `app/api/chat/route.ts` throws immediately if `ANTHROPIC_API_KEY` is not set — this will surface as a server error rather than a silent failure.
- **Chatbot returns 429**: the in-memory rate limiter (`lib/rate-limit.ts`) allows 20 chat requests per IP per minute; this resets per server process (not persisted across restarts or multiple instances).
- **Contact form returns 429**: the mail route allows only 3 requests per IP per minute.
- **Contact form returns 500 "Sunucu yapılandırma hatası"**: `EMAIL_USER` is not set.
- **Content changes not appearing**: since blog/project/technology content is bundled from `data/*.json` at build time, changes to those files require a rebuild/redeploy — there is no admin panel or live database to edit content at runtime.
- **`@mlc-ai/web-llm` (client-side/WebGPU LLM)**: this dependency is declared in `package.json` but has no import anywhere in the source, so there is no WebGPU browser-support consideration to document for this project as it stands — it is not currently wired into the chatbot or any other feature.

## License

No `LICENSE` file exists in this repository. The previous README claimed an MIT license; that claim could not be verified and has been removed. Confirm licensing intent with the project owner before publishing this claim again.
