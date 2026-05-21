# HANDOFF — How to edit, deploy, and operate this mockup

> For Rayan, the founders, or whoever inherits this codebase. Read top to bottom before touching anything.

## Quick start

```bash
git clone <repo>
cd it-trattoria-pitch
pnpm install
cp .env.example .env.local   # add NEXT_PUBLIC_MAPBOX_TOKEN
pnpm dev                     # http://localhost:3000
```

Production build:

```bash
pnpm build && pnpm start
```

## Stack at a glance

| Concern | Tool | Why |
|---|---|---|
| Framework | Next.js 15 (App Router) | RSC by default, edge-friendly, future-proof |
| Language | TypeScript strict | Type safety across content model |
| Styling | Tailwind v4 | Token-driven, fast iteration |
| UI primitives | shadcn/ui | Customizable, accessible, no lock-in |
| Animation | Framer Motion | Production-grade, GPU-friendly |
| i18n | next-intl | Route-based EN/IT/ES |
| Forms | React Hook Form + Zod | Type-safe validation |
| Maps | Mapbox GL JS | High-quality renders; Leaflet fallback |
| Deploy | Vercel | Edge functions, preview URLs |

## Where to edit what

### Content (text, menu items, locations, founders)
All static content lives in `src/data/`. Edit a `.ts` file and the site rebuilds.

- `src/data/menu.ts` — every menu item, in every category
- `src/data/locations.ts` — the 4 US locations
- `src/data/founders.ts` — Renato + Gio bios
- `src/data/press.ts` — press placeholders
- `src/data/catering.ts` — catering packages

### Copy (headlines, microcopy, CTAs)
Translation strings live in `messages/{en,it,es}.json`. The English file is authoritative; the others are skeletons pending native review.

### Images
- Drop into `public/images/`
- Reference via `next/image` with explicit width/height
- Prefer AVIF/WebP; ship under 200KB per hero image

### Design tokens (colors, type scale, spacing)
`src/design/tokens.ts` is the source. `tailwind.config.ts` imports from there. Change once.

### Components
- Shared primitives: `src/components/ui/`
- Page sections: `src/components/sections/`
- Layout shell: `src/components/layout/`

## Deploying to Vercel

**Already deployed.** Two URLs in production:

- **Public (production alias):** https://it-trattoria-pitch.vercel.app — anyone can visit
- **Private (preview hash URL):** https://it-trattoria-pitch-mbxfw1lvf-rayankarimcheca-7930s-projects.vercel.app — gated by Vercel Deployment Protection (HTTP 401 for non-team users). Sign in to Vercel as a team member to view.

The Vercel project is `rayankarimcheca-7930s-projects/it-trattoria-pitch`.

### To re-deploy after changes

```bash
vercel --prod --scope rayankarimcheca-7930s-projects
```

Or just push to `main` on GitHub — once you connect the repo in the Vercel dashboard (vercel.com → project → Settings → Git), every push auto-deploys.

### Env vars to set in the Vercel dashboard before going truly live

- `NEXT_PUBLIC_MAPBOX_TOKEN` — required for the location maps (free tier from mapbox.com)
- `NEXT_PUBLIC_SITE_URL` — already defaults to `https://it-trattoria-pitch.vercel.app`; override only if you attach a real domain

### Initial setup (already done — for reference)

1. `vercel login` (interactive, opens browser, sign in with GitHub)
2. From the project root: `vercel --prod --yes --scope <your-team-slug>`
3. Vercel auto-detects Next.js; no `vercel.json` needed

## Stubs that need real integrations before public launch

| Surface | Today (mockup) | Production path |
|---|---|---|
| Order online | Links to a designed interstitial; CTA points to current `/order/italian-trattoria` | Toast Online Ordering API integration with per-location menu sync |
| Reservations | Designed interstitial → external link placeholder | Resy or OpenTable widget per location (if reservations are accepted) |
| Catering inquiry form | Posts to `/api/catering`, console logs, returns 200 | Resend or Postmark → `office.florida@it-trattoria.com` (+ NYC equivalent) |
| Contact form | Posts to `/api/contact`, console logs, returns 200 | Same as above, routed by topic |
| Newsletter | Adds email to a no-op handler | Klaviyo or Customer.io |
| Gift cards | Designed UI, no checkout | Stripe Checkout + Toast gift card sync |
| Press section quotes | Placeholders | Real quotes from real publications |
| Photography | Best-effort placeholders | Commissioned photoshoot per location |

## What's not done that the brief asked for

- Italian and Spanish translations exist as skeletons only — full localization requires native review
- Lighthouse mobile score targets (≥95) were validated on Home, Menu, Story, Miami Beach Collins, and Catering. Smaller utility pages were not exhaustively tuned.
- Real Lighthouse JSON reports for every page are in `/reports/lighthouse/` for the pages above only.

## Pre-publish gate (from Rayan's coding rules)

Before any `git push` to GitHub on this project:
1. Run the dev server, browse the golden path, confirm no console errors
2. Capture live screenshots into `pitch/screenshots/` (script in `scripts/screenshot.ts`)
3. Embed them in `README.md` with relative paths
4. Minimum 6 screenshots
