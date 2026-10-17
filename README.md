# Ali Jan Jameel — Portfolio

Personal site and engineering case studies for Ali Jan Jameel, Software Engineer.

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript (strict) · Tailwind CSS 4 · Motion · React Three Fiber

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint
npm run typecheck
npm run icons      # regenerate favicon/app icons from app/icon.svg
```

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` before deploying — canonical URLs, the sitemap, robots and structured data all derive from it. On Vercel it falls back to the production domain automatically.

## Before going live — content that needs Ali

Nothing on the site is invented. Where information wasn't provided or couldn't be verified, the section is simply left out — the site never shows a placeholder. To add it:

| What | Where |
| --- | --- |
| Email (enables the contact form); phone and LinkedIn/GitHub are already set | `lib/site.ts` → `email`, `phone`, `socials` |
| Education | `lib/education.ts` |
| Employment dates, location, summary, highlights, tech per role | `lib/experience.ts` |
| Ali's role on each project | `lib/projects.ts` → `contribution` |
| Backend, database, AI providers and other layers not visible from outside | `lib/projects.ts` → add them to `architecture.nodes` / `technologies` with `evidence: "confirmed"` |
| Little Hidden Treasures: product purpose, problem/solution, screenshots | `lib/projects.ts` → `little-hidden-treasures` |
| The "longer version" About copy | `app/about/page.tsx` |

Once `site.email` is set, the contact page also shows the address and a validated form that opens a pre-filled email (no backend needed).

## How it's organised

```
app/                    routes, metadata files (sitemap, robots, manifest, icons, OG images)
  projects/[slug]/      statically generated case studies + per-project OG images
components/
  hero/                 hero + interactive system-architecture diagram
  about/                engineering map (layers → tools → case studies)
  experience/           scroll-linked timeline
  projects/             cards, browser/phone framing, case-study sections
  skills/ three/        skills explorer + lazily loaded 3D constellation (SVG fallback)
  navigation/ footer/ contact/ cursor/ animations/ layout/ ui/
lib/
  site.ts               name, URL, contact, navigation
  stack.ts              the layer taxonomy that drives the diagram, map and skills
  projects.ts           case-study data with an evidence level on every claim
  experience.ts         roles
  metadata.ts           per-page Metadata (canonical, OG, Twitter)
  structured-data.ts    JSON-LD: Person, WebSite, WebPage, BreadcrumbList, Web/MobileApplication
  og.tsx                shared Open Graph image renderer
```

### Adding a project

Add an entry to `projects` in `lib/projects.ts`, put its images in `public/projects/<slug>/`, and it appears on the home page, the projects index, the sitemap and gets its own case study and OG image.

### Research method and evidence levels

Case studies were written from each live product — public pages, page metadata, the Play Store listing, and what each production front end publicly loads (framework, API host, SDKs such as Stripe or Socket.IO). Every feature, architecture node, integration and technology is tagged:

- **verified** — directly observable on the public product
- **confirmed** — confirmed by Ali from the project itself (e.g. Little Hidden Treasures, which is private)
- **interpreted** — a reasonable reading of public evidence, worded as such

Anything that can't be placed in one of these is left off the site.

Marketing figures shown on the products themselves (user counts, ratings, order volumes) are deliberately not repeated.

## Design system

- **Theme:** one dark theme, designed rather than inverted — warm graphite surfaces, paper-white text, a single ember accent (`--primary`) for interaction and flow, and a cool steel (`--accent`) reserved for secondary data. Tokens live in `app/globals.css` and all meet WCAG AA contrast on every surface.
- **Type:** Geist (UI and display), Instrument Serif italic (editorial emphasis), Geist Mono (technical labels), all via `next/font`.
- **Motion:** expo-out entrances, springs for pointer-driven values, `reducedMotion="user"`. Above-the-fold text animates in CSS so it never waits for hydration. With reduced motion the 3D scene, animated packets, auto-cycling diagram and custom cursor are all disabled.
- **3D:** Three.js loads only on the skills section, only on the client, only near the viewport, and pauses when off-screen. A flat SVG version is shown while loading and when WebGL or motion isn't available.
