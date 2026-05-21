# SEO Plan — IT Trattoria

> Tight, action-oriented SEO blueprint. Title tags, meta descriptions, schema requirements, and hreflang per page. Builds directly on R6's baseline and the 5 keyword whitespace opportunities.

## Global SEO defaults

```ts
// src/lib/seo.ts
export const SITE = {
  name: 'IT — Italian Trattoria',
  url: 'https://it-trattoria-pitch.vercel.app',  // mockup; replace at production cutover
  defaultLocale: 'en',
  locales: ['en', 'it', 'es-US'],                 // es-US specifically for Miami
  twitter: '@it.trattoria.usa',
  ogImageDefault: '/og/default.png',
};
```

Every page renders these by default:
- `<title>` with brand suffix: `"<Page Title> — IT Trattoria"`
- `<meta name="description">` 140–160 chars, primary keyword in first 70 chars
- Canonical URL (no trailing slash)
- `<link rel="alternate" hreflang="..." />` for en, it, es-US
- OG: `og:locale="en_US"` (FIX from current site's `fr_FR`)
- OG image: 1200×630, generated via `next/og` for dynamic pages
- Twitter card: summary_large_image
- `<meta name="robots" content="index,follow">` (or `noindex` for thank-you / legal)

## Per-page titles and meta descriptions

| Path | Title | Meta description |
|---|---|---|
| `/` | Fresh pasta, real Italian, no table. — IT Trattoria | Counter-service Italian by two Calabrian brothers. Fresh pasta made daily, pizza alla pala, real espresso. 4 trattorias across Miami Beach and Manhattan. |
| `/menu` | Menu — Fresh pasta, pizza alla pala, dolci — IT Trattoria | Browse the full IT menu: pasta, pizza, antipasti, dolci. Sourced from named producers across Italy. Order from your nearest trattoria in Miami Beach or NYC. |
| `/menu/al-banco` | Al Banco — Counter snacks, pizza by the slice — IT Trattoria | Pizza alla pala, panini, fritti, and antipasti at the counter. Made fresh in front of you. Miami Beach + NYC. |
| `/menu/a-tavola` | A Tavola — Fresh pasta and mains — IT Trattoria | Tagliatelle al ragù, paccheri alla calabrese, lasagne. Pasta made every morning, paired with sauces from across Italy. |
| `/menu/builder` | Build Your Pasta — IT Trattoria | Pick your shape, choose your sauce, name your add-ons. The fastest fresh pasta in Miami Beach or Midtown. |
| `/menu/[item]` | (dynamic — item name) — IT Trattoria | (dynamic — first 150 chars of description + region) |
| `/regions` | Eat by Region — Italy on the menu — IT Trattoria | From Calabria to Emilia-Romagna, every dish has a home. Explore the regional roots of IT's menu. |
| `/regions/calabria` | Calabria on the Menu — IT Trattoria | The founders' home. N'duja, bergamot, swordfish, peperoncino. The Calabrian dishes you'll find at IT. |
| `/regions/[other]` | (dynamic) Calabria, Sicily, Emilia — IT Trattoria | (dynamic blurb) |
| `/story` | Two Brothers, One Counter — Our Story — IT Trattoria | From Calabria to Paris in 2014, to four trattorias across the US. The story of Renato and Gio Iera. |
| `/story/founders` | Renato & Gio Iera — Founders — IT Trattoria | The Calabrian brothers behind IT. |
| `/story/calabria` | Why Calabria — IT Trattoria | The toe of Italy. Mountains and Ionian coast. Peperoncino, bergamot, n'duja. Why our food starts here. |
| `/locations` | Locations — Miami Beach & NYC — IT Trattoria | Four trattorias in the US: Collins Ave, Lincoln Rd, Midtown Manhattan. Find your nearest. |
| `/locations/miami-beach` | Miami Beach — IT Trattoria | Two trattorias in Miami Beach: Collins Avenue and Lincoln Road. Fresh pasta, pizza alla pala, real espresso. |
| `/locations/nyc` | New York — IT Trattoria | IT in Manhattan: Midtown 7th Ave near Penn Station and 5th Ave near Bryant Park. |
| `/locations/miami-beach/collins` | 1656 Collins Avenue — Miami Beach — IT Trattoria | The flagship. Art Deco district, steps from the beach. Open 7am for cappuccino, fresh pasta from noon. |
| `/locations/miami-beach/lincoln-road` | 1014 Lincoln Road — Miami Beach — IT Trattoria | On pedestrian Lincoln Road. Fresh pasta, pizza by the slice, real Italian espresso. |
| `/locations/nyc/midtown-7th` | 530 7th Avenue — Midtown Manhattan — IT Trattoria | Steps from Penn Station, in the Garment District. The fastest fresh pasta in Midtown. |
| `/locations/nyc/midtown-5th` | 390 5th Avenue — Midtown Manhattan — IT Trattoria | Near Bryant Park. Italian breakfast from 7am, fresh pasta from 11am, real espresso all day. |
| `/order` | Order Online — IT Trattoria | Order fresh pasta, pizza alla pala, and dolci from your nearest IT trattoria. |
| `/catering` | Catering for Miami Beach + NYC — IT Trattoria | Office lunches, events, large groups. Fresh pasta and pizza alla pala, catered from our trattorias. |
| `/private-events` | Private Dining — IT Trattoria | Buyouts and private events at our Miami Beach and NYC trattorias. |
| `/journal` | Journal — Suppliers, regions, neighborhoods — IT Trattoria | Stories from our kitchens. The producers behind our pasta, the regions on our menu. |
| `/journal/[slug]` | (dynamic title) — IT Trattoria Journal | (dynamic dek) |
| `/press` | Press — IT Trattoria | Press, mentions, and awards. |
| `/careers` | Careers — Work at IT Trattoria | Join an Italian kitchen in Miami Beach or Manhattan. Email office.florida@it-trattoria.com. |
| `/contact` | Contact — IT Trattoria | Customer service, press, partnerships. |
| `/gift-cards` | Gift Cards — IT Trattoria | Give someone fresh pasta in Miami Beach or NYC. |
| `/franchising` | Partner with IT — IT Trattoria | Franchising and partnership inquiries for IT — Italian Trattoria. |

## Structured data (JSON-LD) per route

### Homepage
- `Organization` + `WebSite` with `SearchAction` for sitelinks search box

### Each `/locations/[slug]`
- `Restaurant` (which extends `LocalBusiness`):
  - `@id`, `name`, `image[]`, `address`, `geo`, `telephone`, `openingHoursSpecification[]`, `priceRange="$$"`, `servesCuisine=["Italian","Calabrian","Mediterranean"]`, `acceptsReservations` (bool per location), `menu` (URL)
  - `sameAs[]`: Instagram, Yelp, Tripadvisor, GBP
- `BreadcrumbList`

### Each `/menu/[item]`
- `MenuItem` with `name`, `description`, `offers.price`, `nutrition` (if available), `suitableForDiet[]` (vegan/vegetarian/etc), `image`
- `BreadcrumbList`

### `/menu` and `/menu/[category]`
- `Menu` with `hasMenuSection[].hasMenuItem[]` for each category

### `/journal/[slug]`
- `Article` with `author`, `datePublished`, `image`, `headline`

### `/catering` and `/private-events`
- `Service` with `provider`, `areaServed`, `serviceType`, `availableChannel.contactPoint`

### `/contact`, `/careers`, etc.
- `WebPage` + `BreadcrumbList`

### FAQ blocks
- Anywhere we have a FAQ accordion → `FAQPage` schema

## hreflang strategy

```html
<link rel="alternate" hreflang="en" href="https://it-trattoria-pitch.vercel.app/path" />
<link rel="alternate" hreflang="it" href="https://it-trattoria-pitch.vercel.app/path" />
<link rel="alternate" hreflang="es-US" href="https://it-trattoria-pitch.vercel.app/path" />
<link rel="alternate" hreflang="x-default" href="https://it-trattoria-pitch.vercel.app/path" />
```

For the mockup: every page declares all four. Italian and Spanish render English content until translations land (Phase 5+). Documented in QUESTIONS.md.

## Keyword targets (per page)

### Homepage
- Primary: "italian counter service" + city (Miami Beach / NYC)
- Secondary: "fresh pasta near me", "italian fast casual"
- Long-tail: "best italian to-go [neighborhood]"

### Per-location pages (the big SEO win)
- **Collins:** "italian restaurant Collins Avenue", "italian Art Deco district", "fresh pasta Miami Beach"
- **Lincoln Road:** "italian Lincoln Road", "italian pedestrian Lincoln", "italian dinner Lincoln Road"
- **7th Ave:** "italian restaurant Penn Station", "italian lunch Midtown West", "italian Garment District"
- **5th Ave:** "italian Bryant Park", "italian breakfast Midtown 5th Ave", "italian lunch near 5th"

### Menu category pages
- `/menu/a-tavola`: "fresh pasta [city]", "homemade pasta [city]"
- `/menu/al-banco`: "pizza by the slice [city]", "pizza alla pala", "italian panini [city]"
- `/menu/dolce`: "tiramisu [city]", "italian dessert [city]"
- `/menu/bevende`: "real italian espresso [city]", "cappuccino [city]"

### Per-region pages
- `/regions/calabria`: "calabrian food", "n'duja [city]", "peperoncino dish [city]"
- `/regions/emilia-romagna`: "tagliatelle [city]", "parmigiano reggiano dish [city]"

### Catering
- "italian catering [city]", "office lunch catering [neighborhood]", "wedding catering italian"

### Whitespace plays (per R6)
- "italian breakfast Miami Beach" / "italian breakfast NYC" — own this in Phase 5 with a dedicated journal piece + per-location section
- "italian counter service Miami Beach" — own this as the homepage primary
- "fresh pasta Penn Station" — own this on the 7th Ave page

## Technical SEO checklist

- [x] Canonical URLs everywhere
- [x] No trailing-slash inconsistencies (Next config normalizes)
- [x] Sitemap.xml generated dynamically via `src/app/sitemap.ts`
- [x] Robots.txt via `src/app/robots.ts` with sitemap reference
- [x] Per-page `metadata` export with `openGraph`, `twitter`, `alternates.languages`
- [x] `next/image` for every image with width/height
- [x] `next/font` for self-hosted font loading
- [x] AVIF/WebP via Next Image's `formats`
- [x] Internal linking: every location page links to the city hub, sub-hubs link back, every menu item links to its region, every region links to its featured items
- [x] Structured breadcrumbs visible + schema'd
- [x] 404s return 404 status (not redirected)
- [x] 301 redirects from old French/`restaurants.` paths (documented in HANDOFF for the production cutover)

## What to ship from the mockup vs leave for production

**Ships in mockup:**
- Page metadata (titles, descriptions, OG, hreflang stubs)
- JSON-LD on every page (with placeholder data where needed)
- sitemap.xml, robots.txt
- Internal linking graph
- OG image generation via `next/og`

**Production-only (documented in HANDOFF):**
- Real GBP / Yelp / TripAdvisor sameAs URLs once verified
- Real customer reviews via Schema `Review` type
- Server-side redirects from the existing French URLs
- Search Console verification + sitemap submission
- Per-location event tracking for conversion attribution
