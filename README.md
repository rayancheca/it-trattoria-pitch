# IT — Italian Trattoria · Web Rebuild (Pitch Mockup)

> A production-quality Next.js mockup for the US web presence rebuild of **IT — Italian Trattoria** — a French-Italian counter-service restaurant group with four trattorias across Miami Beach and Manhattan.
> Built by **Rayan Karim Checa** as a pitch to win the engagement.

---

## What this is

The current `it-trattoria.com` is a 2014-era WordPress site that — verified through forensic audit — is actively losing customers in the US. The Lincoln Road location's "Directions" link points to Collins Avenue's address. The New York page's meta description renders entirely in French. The global locator shows 33 raw plugin placeholder strings live. Every English page is stamped `og:locale="fr_FR"` and zero `Restaurant` schema is shipped anywhere.

This repository is a complete rebuild proposal: research, strategy, design system, and a working, deployable Next.js 15 application — 70 prerendered routes, all four US locations with live "Open now" indicators, an editorial menu with per-item sourcing, a regional-Italy storytelling spine that no Italian counter-service competitor on the internet currently offers, and per-location SEO discipline that captures the organic traffic Bar Primi and La Pecora Bianca take today.

If the founders open the deployed URL on their phone in Miami Beach, the brand they built across twenty trattorias in France should feel finally legible on the internet.

---

## Technical deep-dive — the interesting decisions

**The hardest call: how much to lean into Calabria.** The brief's stated ask was "drive more traffic." The forensic audit showed the brand's strongest single piece of equity — Renato and Gio's Calabrian roots — was reduced to one buried sentence on an About page. After studying 19 direct and aspirational competitors (Eataly, L'Industrie, Tatte, Trapizzino, Vapiano, Princi, Joe's, andpizza, Sweetgreen, CAVA on the direct side; Carbone, Don Angie, Via Carota, Misi, Marea, Sant Ambroeus, Lilia, Lucali, I Sodi on the aspirational side), I observed that **none of them anchor UX in Italian regional geography.** So the site's navigational spine became a regional-Italy interactive surface where Calabria is the front door and every menu item carries its region with it. This is risky if the founders prefer a pan-Italian positioning, but the upside — Awwwards-tier signature design, evergreen SEO long-tail, and Calabrian content as an Instagram engine — is large. It's the single most distinctive move in the rebuild.

**The alternative we rejected: a Carbone-style upscale clone.** R4 research surfaced an "uncanny valley" warning — counter-service brands that costume themselves as sit-down restaurants read as worse than honest fast-casual. So the homepage primary CTA is **Order Online**, not Reserve. The Reserve page is reframed for the truth: "We're mostly walk-in." Carbone's register would be wrong; Don Angie's editorial restraint is right.

**The implementation detail that wasn't obvious:** "Open now" indicators are computed live in the user's browser from the location's `BusinessHours` schedule and the location's IANA timezone (`America/New_York`). The same logic powers the route-aware sticky bottom-bar Order CTA — its copy swaps depending on whether you're on a Miami Beach page (`"Order from Collins"`), an NYC page, a Calabria region page (`"Order Calabrian"`), or the menu builder. None of the competitor sites I tore down do this. It's a small thing that signals attention to the format.

---

## Live workflow screenshots

Captured against the live `pnpm start` build using Playwright at desktop (1440×900) and mobile (390×844) with reduced-motion preference, fonts settled, full-page captures.

### 1 — The homepage hero. Editorial type-over-image, no reservations CTA above the fold

![Homepage hero — desktop](pitch/screenshots/desktop/01-home.png)

The hero sets the brand register: cream-and-charcoal chrome, the IT monogram top-left as the strongest piece of preserved equity, hero type that breathes ("Fresh pasta. Real Italian. *No table.*"), and a rotating "Only this week" teaser line below the fold. The primary CTA is Order Online; the secondary is Find your trattoria. Reservations don't appear above the fold because IT is a counter, not a banquette.

### 2 — Editorial menu, not a card grid

![Menu hub — desktop](pitch/screenshots/desktop/02-menu.png)

Italian dialect category labels — Aperitivo · Al Banco · A Tavola · Dolce · Bevande — replace the generic "Starters / Mains." Every item carries its region as a chip and shows dietary/spicy/new tags. The list pattern reads like a printed menu, not an inventory database.

### 3 — Item page with named-ingredient sourcing

![Paccheri alla Calabrese — desktop](pitch/screenshots/desktop/03-menu-item-paccheri.png)

Every item page names the producer and the origin: n'duja from Madeo in Crucoli, San Marzano DOP from Agro Sarnese-Nocerino, pecorino crotonese DOP from Crotone. This is the Sweetgreen "sourcing as UI element" pattern, translated for Italian craft producers. It's also `MenuItem` JSON-LD on every item — schema the current site ships zero of.

### 4 — The regional-Italy spine

![Regions hub — desktop](pitch/screenshots/desktop/05-regions.png)

Eleven Italian regions arranged as a navigable system. Pick Calabria, see Calabrian dishes; pick Emilia-Romagna, see the Parmigiano DOP supplier and the tagliatelle. This is the differentiator — no counter-service Italian competitor does it.

### 5 — Calabria as the front door

![Calabria region — desktop](pitch/screenshots/desktop/06-regions-calabria.png)

The founders' home region gets a distinct chrome — monogram green, bergamot accent — that the other regions don't. It's where the brand's emotional core lives.

### 6 — Per-location detail with live "Open now"

![Collins Avenue location — desktop](pitch/screenshots/desktop/09-location-collins.png)

Every location ships full `Restaurant` + `LocalBusiness` JSON-LD (R6's highest-leverage SEO fix), a computed-live Open Now indicator, click-to-call, directions deep-link to Google Maps, full hours table, neighborhood notes with transit and parking, and the dishes featured at *that specific* location.

### 7 — The founder story, Don Angie register

![Story page — desktop](pitch/screenshots/desktop/07-story.png)

Chronological editorial scroll: Calabria 1980s → Paris 2014 → 20 stores by 2023 → Miami Beach in November 2024. First-person plural voice. Honest. No mythology.

### 8 — Counter-service catering inquiry, multi-step form

![Catering page — desktop](pitch/screenshots/desktop/11-catering.png)

Three named starter packages, then a React Hook Form + Zod multi-step inquiry. High-margin corporate lunch lead capture for both cities.

### 9 — Order online, location-first

![Order interstitial — desktop](pitch/screenshots/desktop/12-order.png)

The CAVA / Joe's / andpizza pattern: pick where you are before you pick what you want. Menu and hours genuinely vary per location.

### 10 — Editorial journal layer for SEO long-tail

![Journal index — desktop](pitch/screenshots/desktop/13-journal.png)
![Journal entry — desktop](pitch/screenshots/desktop/14-journal-bergamot.png)

Four sample journal pieces — "Why bergamot only grows in Calabria," "The mill behind our pasta flour," "A walking tour of Italian Midtown," "Pasquini, and the mortadella you can taste." Each one is also a long-tail SEO surface and an Instagram-grid-ready story.

### 11 — Honest 404 page

![404 page — mobile](pitch/screenshots/mobile/99-404.png)

"That page isn't on the menu." Designed page with three escape hatches — never a default Next.js error.

### 12 — Mobile — sticky bottom-bar Order CTA visible

![Homepage — mobile](pitch/screenshots/mobile/01-home.png)
![Menu — mobile](pitch/screenshots/mobile/02-menu.png)
![Location detail — mobile](pitch/screenshots/mobile/09-location-collins.png)

Mobile is treated as the primary surface (most US restaurant traffic is mobile-first). The bottom-bar Order CTA appears after the hero and its copy swaps with route — "Order from Collins" on Miami Beach pages, "Order Calabrian" on the Calabria region page, "Send to checkout" on the pasta builder.

---

## Architecture

```
research/         Phase 1 — discovery & competitive research (6 streams + synthesis)
strategy/         Phase 2 — sitemap, content model, conversion map, SEO plan
design/           Phase 3 — direction document & design tokens
src/
├── app/          Next.js 15 App Router — 70 prerendered routes
│   ├── locations/[city]/[slug]/    Per-location pages w/ Restaurant JSON-LD
│   ├── menu/[slug]/                Categories + item detail pages w/ MenuItem JSON-LD
│   ├── regions/[slug]/             11 Italian regions, Calabria as front door
│   ├── journal/[slug]/             Editorial layer
│   ├── catering/                   Multi-step inquiry form
│   ├── api/{contact,catering,newsletter}/  Stub routes, ready for production wiring
│   ├── sitemap.ts                  Auto-generated sitemap.xml
│   └── robots.ts                   robots.txt
├── components/
│   ├── brand/      ITMonogram (the preserved equity from R2)
│   ├── layout/     Nav (scroll-aware), Footer, StickyOrderBar (route-aware)
│   ├── locations/  Location detail components + JSON-LD
│   ├── catering/   Multi-step form w/ React Hook Form + Zod
│   ├── sections/   8 homepage sections (Hero, FeaturedDishes, CalabriaTeaser, etc.)
│   └── ui/         Button, ArrowLink
├── data/           Typed content: locations.ts, menu.ts, regions.ts, founders.ts
├── lib/            seo.ts, hours.ts (timezone-aware "Open now"), utils.ts
└── design/         tokens.ts (palette / type / motion / spacing)
pitch/screenshots/  Live captures at desktop + mobile breakpoints
scripts/            screenshot.ts (Playwright capture script)
```

## Stack

| Concern | Tool | Why |
|---|---|---|
| Framework | Next.js 15 (App Router) | RSC by default, edge-friendly |
| Language | TypeScript strict | Type safety on content model |
| Styling | Tailwind v4 + CSS-based @theme | Token-driven, easy to refine |
| UI primitives | shadcn/ui, customized | Accessible, no lock-in |
| Animation | Framer Motion | GPU-friendly, restraint-first |
| Forms | React Hook Form + Zod | Type-safe validation |
| Maps | Mapbox GL (token-gated) with Leaflet fallback | High-quality renders |
| Deploy target | Vercel | Edge functions, preview URLs |
| Screenshots | Playwright | CI-friendly, mobile + desktop |

## Quick start

```bash
git clone <this repo>
cd it-trattoria-pitch
pnpm install
pnpm dev                  # http://localhost:3000
```

Production build:

```bash
pnpm build
pnpm start                # http://localhost:3000
```

Capture fresh screenshots:

```bash
pnpm start --port 3055 &
pnpm exec tsx scripts/screenshot.ts
```

## Documents to read

1. **[PITCH.md](./PITCH.md)** — the pitch deck for the founders. Start here.
2. **[REVIEW.md](./REVIEW.md)** — running decisions log across all six phases.
3. **[HANDOFF.md](./HANDOFF.md)** — how to edit content, deploy to Vercel, and wire real Toast/Resy/Stripe integrations.
4. **[QUESTIONS.md](./QUESTIONS.md)** — open items that need the founders' input before public presentation. Notably: a 4-vs-3 locations discrepancy between the brief and the live site.
5. **[CLAUDE.md](./CLAUDE.md)** — context for Claude Code sessions on this repo.
6. **[research/00-synthesis.md](./research/00-synthesis.md)** — the 2-page executive synthesis that drove all design and engineering decisions.

## What's stubbed vs production-ready

| Surface | Today (mockup) | Production path |
|---|---|---|
| Online ordering | Designed interstitial → `https://order.it-trattoria.com/[location]` | Toast Online Ordering integration with per-location menu sync |
| Reservations | Walk-in framing + tel: links | Resy/OpenTable for the 1–2 locations that take large groups, if any |
| Catering inquiry | Posts to `/api/catering`, validated, returns 200 | Resend/Postmark → `office.florida@it-trattoria.com` + NYC counterpart |
| Newsletter | Stub `/api/newsletter` | Klaviyo or Customer.io |
| Gift cards | Designed UI, no checkout | Stripe Checkout + Toast gift card sync |
| Press quotes | Designed shell + clearly labeled `[PLACEHOLDER]` | Real coverage post press push |
| Photography | Designed placeholder panels | Commissioned photoshoot — art direction in `design/01-direction.md` |
| i18n | English ships; locale switcher wired but no-op | Native-speaker translation: Italian (Renato/Gio review), Spanish (Miami-Spanish for the FL market) |

See [HANDOFF.md](./HANDOFF.md) for the full path from mockup to production.

## License

Proprietary — pitch mockup for IT — Italian Trattoria. Not licensed for redistribution.
