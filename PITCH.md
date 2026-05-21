# IT — Italian Trattoria · Web Rebuild Pitch

> A pitch from **Rayan Karim Checa** to Renato Iera, Gio Iera, Maxence Lellouche, and the US leadership team.

---

## 1. Cover

| | |
|---|---|
| **The project** | Rebuild IT — Italian Trattoria's US web presence |
| **The deliverable** | A working, deployable Next.js mockup of the new site |
| **The engineer** | Rayan Karim Checa · Fordham University, Computer Science · VP, Fordham CS Society |
| **Date** | May 2026 |
| **Live mockup URL** | _Run `pnpm dlx vercel` against the repo — see `HANDOFF.md`. Listed in `/QUESTIONS.md #5`._ |
| **GitHub** | _link to be added on push_ |

---

## 2. The opportunity in one paragraph

You've built something rare in restaurants: a French brand with Calabrian soul, a counter-service format with the food quality of a sit-down trattoria, and four US locations across Miami Beach and Manhattan with more coming. The food is ready for the US. **The website isn't.** This pitch is a working mockup that demonstrates the rebuild end-to-end — designed, written, and built for the US market, deployable on day one, defendable on revenue grounds, and ready to put in front of customers.

---

## 3. The audit — what the current site is losing you every day

We ran a forensic audit of every page on `it-trattoria.com` and its three subdomains (`restaurants.it-trattoria.com`, `pp.it-trattoria.com`, the `/order/` subpath). The findings are evidence-backed, verbatim from the live site, and each one is costing real customers.

| # | Finding | Evidence |
|---|---|---|
| 1 | **Lincoln Road sends customers to Collins Avenue.** The "Directions" link on the Lincoln Road page resolves to Collins Ave's address. Customers literally lost. | `destination=1656+Collins+Avenue+33139+Miami+Beach` (from the `restaurants.` subdomain HTML) |
| 2 | **The NY page's meta description is entirely in French.** Every Google result, every iMessage unfurl, every X card for the NY page renders in French. | `"Restaurant Italien à New York Time Square — Venez Découvrir nos PIZZAS, PÂTES, SALADES…"` |
| 3 | **The global locator never received its data.** Renders **"0 of 0 restaurants"** with 33 raw SuperStoreFinder plugin placeholder strings live. | `"Placeholder store name"`, `"Telephone placeholder"`, `"Custom field 1 placeholder"` through 6 |
| 4 | **English pages are stamped `og:locale="fr_FR"`** + JSON-LD `inLanguage="fr-FR"`. Combined with zero `Restaurant` / `LocalBusiness` schema. Google reads the site as French and skips it for Map Pack. | OG tag + JSON-LD on every US-facing page |
| 5 | **Brand fragmented across two unconnected surfaces** with two Instagram accounts (`it_france` and `it.trattoria.us`). Newsletter copy on the locator: `"After the hour, it's no longer the hour."` (Broken machine translation of *"Après l'heure, ce n'est plus l'heure."*) | Locator HTML; visible cross-domain inconsistency |
| 6 | **No ranking for own primary descriptor.** "italian counter service Miami Beach" — IT doesn't rank. Bar Bucce owns it. "italian restaurant near Penn Station" — Bar Primi owns it. "italian Bryant Park" — La Pecora Bianca owns it. | SERP audit per location |
| 7 | **Calabria is invisible.** The founders' single most distinctive brand asset is reduced to one sentence buried on an About page. | Current site copy |
| 8 | **Photography is generic stock-cliché.** Compare to Carbone, Don Angie, Misi, Tatte. Their photography is art direction; the current IT photography is wallpaper. | Visual audit |
| 9 | **Order flow is a disconnected experience.** `/order/italian-trattoria` looks and feels separate from the brand. Customers drop off at the boundary. | Cross-surface UX audit |
| 10 | **Stack from 2014.** WordPress + jQuery + Slick + SuperStoreFinder + WPForms. Performance bottlenecked, no headless content model, no modern motion, no edge rendering. | Tech audit via public profiling tools |

**Bottom line:** the current site isn't underperforming as a marketing site — it's actively misdirecting customers, miscoding language, and yielding the SEO real estate to the competition. The fix isn't a redesign. It's a rebuild.

---

## 4. The approach — how we rebuilt it

A six-phase methodology, all artifacts in this repo:

1. **Discovery & competitive research** (`/research/`) — forensic audit of the current site, brand asset extraction, 10 direct competitor tear-downs, 9 aspirational tear-downs, awards inspiration, SEO baseline. Synthesis in `research/00-synthesis.md`.
2. **Strategy** (`/strategy/`) — sitemap, content model, per-page conversion map, SEO plan with per-page titles + meta + schema.
3. **Design system** (`/design/`) — direction document and tokens. Cream + charcoal chrome with monogram green / peperoncino / bergamot / Ionian as sparing accents.
4. **Build** — Next.js 15 (App Router, RSC), Tailwind v4, shadcn/ui, Framer Motion, React Hook Form + Zod, Mapbox-ready, deployment-ready.
5. **Content polish** — first-person plural founder voice, named ingredients on every dish, no generic AI-isms, Italian dialect labels as quiet texture.
6. **QA & deploy** — accessibility passes, performance pass, screenshots, sitemap + robots, Vercel-ready.

**Stack** (all chosen to set the project up for production cutover, not just a mockup):

| Concern | Tool | Why |
|---|---|---|
| Framework | Next.js 15 (App Router) | RSC by default, edge-friendly |
| Language | TypeScript strict | Type safety on content model |
| Styling | Tailwind v4 + CSS-based @theme tokens | Token-driven, easy to refine |
| UI primitives | shadcn/ui, customized | Accessible, no lock-in |
| Animation | Framer Motion | GPU-friendly, restraint-first |
| Forms | React Hook Form + Zod | Type-safe validation, no inventory of weirdness |
| Maps | Mapbox GL (token-gated) with Leaflet fallback | High-quality renders |
| Deploy | Vercel | Edge functions, preview URLs |

---

## 5. The three bets — what makes this site different

Three converging bets give the rebuild revenue justification beyond aesthetics:

### ⭐ Bet 1 — A regional-Italy map as the navigational and storytelling spine

**No counter-service Italian competitor on the internet does this.** Hover Calabria → n'duja, bergamot, the founders' hometown. Hover Emilia-Romagna → tagliatelle, the Parmigiano DOP producer. Hover Sicily → arancini, citrus. Menu, sourcing, chef stories, per-location specials all hang off regional pins. The map becomes the front door for Story, Menu, Sourcing, and the Journal.

This single move (a) reclaims Calabria as the brand's lead asset, (b) creates an Awwwards-tier site signature, (c) powers SEO long-tail ("calabrian food miami beach", "fresh pasta tagliatelle nyc"), and (d) provides an evergreen Instagram and journal content engine.

### ⭐ Bet 2 — Per-location SEO discipline that captures the traffic competitors are taking today

The current site ships **zero `Restaurant` schema, `og:locale="fr_FR"` on English pages, and the locator shows raw plugin placeholders.** The rebuild ships:

- `Restaurant` + `LocalBusiness` JSON-LD on every `/locations/[slug]` page
- Hours + geo + telephone + cuisine + price + acceptsReservations + sameAs
- BreadcrumbList + MenuItem schema on every menu item
- `hreflang="en"`, `"it"`, `"es-US"` (es-US specifically for Miami)
- 301 plan for the existing French URLs (documented in `HANDOFF.md`)

**Five keyword whitespace opportunities IT can own** that today belong to Bar Primi / La Pecora Bianca / Dolce Italian / Bar Bucce:

1. "italian restaurant near Penn Station" — 530 7th Ave is a 4-min walk
2. "italian counter service Miami Beach" — IT's own descriptor; doesn't rank
3. "italian Bryant Park / Midtown 5th" — 390 5th Ave is in range
4. **"italian breakfast / cappuccino / croissant"** in both cities — IT opens at 7am with real Italian coffee; nobody owns this cluster
5. "italian catering near [landmark]" — high-margin, zero current authority

### ⭐ Bet 3 — Counter-service-honest UX

We don't pretend to be a sit-down restaurant. The R4 aspirational research called this the "uncanny valley" — if IT clones the surface of Carbone or Don Angie (giant reservations CTA, two-hour-dinner heritage copy), it reads as a counter costuming as a banquette, which is worse than honest fast-casual. The mockup:

- Primary homepage CTA is **Order Online**, not Reserve
- Location-first ordering flow (the CAVA / Joe's / andpizza pattern)
- Sticky bottom-bar Order CTA on mobile with route-aware copy
- Reservations page reframed for the truth: "We're mostly walk-in" → catering / private events for large groups
- A **pasta builder** at `/menu/builder` (CAVA-pattern, no Italian competitor has built one)

---

## 6. What we built — page by page

A non-exhaustive tour of what's live in the mockup:

### Home (`/`)
Editorial type-over-image hero ("Fresh pasta. Real Italian. *No table.*"). Rotating today's-plate teaser. Live "Open now" indicators on every featured location. Calabria teaser as a load-bearing brand moment, not a footnote. Locations preview with computed status. Founders teaser. Journal teaser. Press placeholder (clearly flagged). Newsletter.

### Locations (`/locations`, `/locations/[city]`, `/locations/[city]/[slug]`)
Hub → city sub-hub → detail page. Each detail page has a per-location hero, computed-live Open Now indicator, full hours table, neighborhood note with transit and parking, click-to-call, directions deep-link to Google Maps, featured items at that specific location, and a per-location catering CTA. `Restaurant` JSON-LD inlined on every detail page.

### Menu (`/menu`, `/menu/[category-or-item]`)
Italian dialect category labels (Aperitivo · Al Banco · A Tavola · Dolce · Bevande). Menu hub uses an editorial list pattern with region chips and spicy/veg/new tags. Per-item pages have full sourcing — the named mill, the named producer, the named DOP. `MenuItem` schema on each. The pasta builder lives at `/menu/builder` as a Phase-2 stub with the choice architecture demonstrated.

### Regions (`/regions`, `/regions/[slug]`)
The differentiator surface. 11 Italian regions, Calabria treated as the front door (`/regions/calabria` rendered in monogram green chrome with founders connection prominently called out). Each region page has signature ingredients, signature dishes, and the menu items from that region with an "Order from [region]" CTA.

### Story (`/story`)
Editorial scroll: Calabria 1980s → Paris 2014 → France 20 stores → US 2024. Three founder portraits (Renato, Gio, Maxence) with first-person voiced bios. Don Angie's register, not Carbone's mythology.

### Catering (`/catering`)
Three named packages ("The Penn Station Lunch", "The Collins Avenue Spread", "The Trattoria at Your Office" — flagged as placeholder names for ops to refine). Multi-step inquiry form: Event → Contact → Details → Review. React Hook Form + Zod validation. Posts to `/api/catering` (stub).

### Journal (`/journal`, `/journal/[slug]`)
Editorial layer for SEO long-tail. Four sample entries: "Why bergamot only grows in Calabria", "The mill behind our pasta flour", "A walking tour of Italian Midtown", "Pasquini, and the mortadella you can taste". Real Calabrian-rooted writing.

### Order (`/order`)
Location-first picker (CAVA pattern). User picks city → location → deep-links to Toast.

### Plus designed shells for: Reserve, Press, Careers, Contact, Gift Cards, Franchising, Private Events, Legal/{privacy,terms,accessibility}, and a designed 404.

---

## 7. Why this drives traffic and revenue

| Decision | Revenue mechanism | Evidence in mockup |
|---|---|---|
| Per-location `Restaurant` schema + hreflang | Map Pack visibility recovered; Google reads the site as US-English not French | `/src/components/locations/LocationSchema.tsx`, sitemap, hreflang in metadata |
| Hub-and-spoke location IA + kill `restaurants.` subdomain | Authority consolidated; internal linking compounds | `/strategy/01-sitemap.md`, `/strategy/04-seo.md` |
| Regional-Italy map as front door | Brand differentiation = SEO long-tail = social shareability | `/regions/calabria`, `/menu/[item]` cross-links |
| Counter-service-honest mobile sticky Order CTA | Conversion lift on the #1 brand goal (online orders) | `/src/components/layout/StickyOrderBar.tsx` |
| Editorial menu UX with named ingredients | Premium signal at counter-service prices | `/menu/[slug]` sourcing block |
| Catering inquiry form with multi-step + Zod validation | High-margin lead capture from corporate customers | `/catering` |
| "Open now" indicators computed live by timezone | Reduced customer service load (no calls asking "are you open") | `/src/lib/hours.ts` |
| Real Calabrian content (bergamot story, Pasquini mortadella) | Email open rates, Instagram engagement, repeat visits | `/journal/[slug]` |

---

## 8. What's next — the rollout plan

A four-phase rollout if we get the engagement:

**Phase 1 (week 1–2) · Content gathering + photography.**
- Commission a single-discipline photoshoot at one location (Collins flagship)
- Real founder portraits (candid, not glossy — Don Angie register)
- Verify the four-locations discrepancy (the brief lists four; current site shows three) and lock the public count
- Resolve `[VERIFY]` items from `/QUESTIONS.md`

**Phase 2 (week 2–4) · Production launch.**
- Wire real Toast Online Ordering integration on `/order/[location]`
- Wire Resend (or Postmark) on `/api/catering`, `/api/contact`, `/api/newsletter`
- Stripe Checkout for `/gift-cards`
- Real `sameAs` URLs on JSON-LD (verified GBP, Yelp, TripAdvisor)
- Counsel review of legal pages
- Search Console verification + sitemap submission
- DNS cutover from current WordPress site, 301 redirects for the major French URLs

**Phase 3 (week 4–8) · Translation + builder.**
- Native-speaker translation pass for IT and ES (Miami-Spanish, not Castilian)
- Build the pasta builder as a real product (Toast cart integration)
- Add real press hits once earned through a press push

**Phase 4 (ongoing) · Iteration.**
- Monthly journal cadence (region/supplier/neighborhood)
- Per-location event tracking + conversion attribution
- Quarterly performance audit

---

## 9. Cost and timeline

_[DISCUSS — to be filled in with the company. The mockup is buildable, deployable, and tunable in the timeframes above. Specific scope and SOW to be agreed.]_

---

## 10. About the engineer

**Rayan Karim Checa** is a Computer Science student at Fordham University and the VP of Fordham's Computer Science Society. Prior independent projects include a full-stack SwiftUI Uber clone (real-time location, Firebase backend), a Flask e-commerce site (Stripe integration, admin tooling), and EnrollTech (university enrollment tooling).

This pitch is his proposal for the engagement to rebuild IT — Italian Trattoria's US web presence.

Contact: _withheld from the public mockup; see Rayan directly._

---

## Appendix — repository map

| Path | What's there |
|---|---|
| `/research/` | Phase 1 outputs — 6 research streams + synthesis |
| `/strategy/` | Sitemap, content model, conversion map, SEO plan |
| `/design/` | Direction doc + tokens.ts |
| `/src/app/` | Next.js 15 App Router source — 70 prerendered routes |
| `/src/data/` | Locations, founders, regions, menu — typed content layer |
| `/src/components/` | Layout shell, brand, UI primitives, page sections |
| `/HANDOFF.md` | How to edit, deploy, replace content |
| `/QUESTIONS.md` | Open items the founders need to answer |
| `/REVIEW.md` | Running decisions log across all phases |
| `/pitch/screenshots/` | Screenshots of every key page (desktop + mobile) |

---

*End of pitch.*
