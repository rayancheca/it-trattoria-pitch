# Phase 1 Synthesis — IT Trattoria Web Rebuild

> Executive synthesis across R1 (current site forensics), R2 (brand extraction), R3 (direct competitors), R4 (aspirational competitors), R5 (awards inspiration), R6 (SEO baseline).
>
> This document is the contract Phase 2 (strategy) and Phase 3 (design) are built against.

## The thesis in one paragraph

The current IT — Italian Trattoria website is a French marketing artifact that quietly costs the US business measurable revenue every day. Customers are being routed to the wrong addresses, English meta descriptions are stamped `fr_FR`, the global locator shows raw plugin placeholders, the per-location SEO yields zero rich-result coverage, and the brand's strongest equity — the green "IT" monogram and the Sempé-style illustration system — is buried behind WordPress plugin chrome and stock food photography. The fix is not a redesign; it is a rebuild that converges three opportunities: **local-SEO discipline that captures the organic traffic Bar Primi and La Pecora Bianca take today, a regional-Italy storytelling spine that nobody in the counter-service category has claimed, and counter-service-honest UX (location-first ordering, pasta builder, mobile sticky CTA) that lifts conversion on what's already the #1 brand goal.**

## Top 5 problems with the current site

1. **Broken navigation costs customers.** Lincoln Road's "Directions" link points to Collins Avenue's address.
2. **English pages are stamped as French.** `og:locale="fr_FR"`, JSON-LD `inLanguage="fr-FR"`, NY page's meta description fully in French.
3. **The locator was never seeded** — 33 raw SuperStoreFinder plugin placeholders (`"Placeholder store name"`, `"Telephone placeholder"`, six "Custom field" placeholders) render live in production HTML.
4. **No `Restaurant` or `LocalBusiness` schema on any page.** Google Maps rich features unreachable. R6 confirms IT doesn't rank for its own descriptor ("italian counter service Miami Beach").
5. **Brand fragmented across two disconnected surfaces** with two different Instagram handles (`it_france` and `it.trattoria.us`), inconsistent location counts (3 vs the brief's 4), and machine-translated newsletter copy ("After the hour, it's no longer the hour").

## Top 5 patterns from competitors worth adopting

1. **Location-first ordering** (Joe's, CAVA, andpizza) — store-pick before menu. Correct for multi-location with varying hours.
2. **A pasta builder** (CAVA's bowl-builder pattern) — no Italian competitor has built this. Massive UX + SEO opportunity.
3. **Sourcing as a UI element** (Sweetgreen) — name the mill, the tomato region, the cheese producer per dish. Plays naturally into the Calabrian story.
4. **Editorial menu treatment** (Don Angie, Misi, Via Carota) — menus as printed artifacts, not inventory databases. Italian dialect section labels (Aperitivo / Al Banco / A Tavola / Dolce, per R5/WatchHouse).
5. **Sticky bottom-bar Order/Reserve CTA** (CRAV Burgers) with location-aware copy that swaps as user scrolls.

## Top 5 patterns to avoid

1. **Vapiano's corporate-portal homepage** — country selector, no menu, no founder voice. Cautionary tale.
2. **Eataly's fragmented ordering** — separate stacks for catering / dine-in / takeout / retail. Pick one platform, wrap it.
3. **Princi's pricing opacity** — no prices, no calories. Americans expect both upfront.
4. **Carbone's mythology** — works for a $150-pp sit-down. Wrong register for counter-service. Use Don Angie's honest editorial voice instead.
5. **Reservation-theater homepages** (R4 uncanny-valley warning) — IT is a counter, not a banquette. Don't pretend.

## The single most important brand opportunity

**A regional-Italy interactive map as the site's navigational and storytelling spine.** None of the 19 competitors studied (10 direct, 9 aspirational) anchor UX in Italian regional geography. The map becomes the front door: hover **Calabria** → n'duja, bergamot, the founders' Reggio/Tropea origin, the spianata calabrese; hover **Emilia-Romagna** → tagliatelle, the Parmigiano DOP producer; hover **Sicily** → arancini, citrus, mortadella's Bologna cousin. Menu items, sourcing notes, chef stories, and even per-location specials all hang off regional pins. This single move:

- **Reclaims Calabria** as the brand's lead asset (the brief's explicit ask)
- **Builds an unmistakable site identity** (Awwwards-tier signature)
- **Powers SEO long-tail** ("calabrian food miami beach", "fresh pasta nyc made with [region] flour")
- **Provides an evergreen Instagram-grid + journal content engine**
- **Aligns with the existing illustration library** (Sempé-style line art lives perfectly on a soft regional map)

## Recommended design language (one paragraph)

A disciplined cream-and-charcoal editorial chrome — Don Angie / Via Carota restraint — broken by load-bearing hand-drawn illustrations carried over from IT's existing equity, with monogram green / peperoncino vermilion / bergamot mustard / Ionian sea-green deployed sparingly as Calabrian accents. Editorial serif display ("Instrument Serif" as the free mockup choice; "PP Editorial New" or "GT Sectra" in production) paired with a neutral sans (Geist). Italian dialect labels as quiet texture (Aperitivo / Al Banco / A Tavola / Dolce — never full translation). Photography under one discipline (overhead, natural light, single plate on warm linen). Motion restrained — pace signals confidence by refusing to oversell.

## What this means for Phase 2 (strategy)

The sitemap will:
- Replace the `restaurants.it-trattoria.com` subdomain with `it-trattoria.com/locations/[slug]`
- Add `/journal` (or `/storie`) as a top-level for editorial SEO long-tail
- Add an interactive `/regions` surface (or fold it into homepage hero)
- Add `/order` and `/reserve` as bridges, location-first
- Add `/catering` with a real multi-step inquiry form
- Add `/menu/builder` as the pasta-builder destination

The content model will:
- Tag every `MenuItem` with `region` (Italian region of origin)
- Tag every `MenuItem` with `sourcedFrom` (producer / region details)
- Track per-location availability for every item
- Track per-location hours, photos, neighborhood notes

The SEO strategy will:
- Ship `Restaurant` + `LocalBusiness` JSON-LD on every `/locations/[slug]`
- Ship `Menu` + `MenuItem` JSON-LD on `/menu` and item pages
- hreflang for en / it / es (es-US for Miami)
- Per-page OG images via `next/og` (regional-map-themed)

## What this means for Phase 3 (design)

Tokens already in `src/design/tokens.ts`. Component priorities:
- `RegionMap` — the differentiator
- `LocationCard` with "Open now" indicator + neighborhood note
- `MenuItem` with region tag + sourcing note + photo
- `PastaBuilder` (Phase 4 stretch — gate behind a flag if time-bound)
- `StickyOrderBar` for mobile
- Illustration system (10–15 inline SVGs in `src/components/illustrations/`)
