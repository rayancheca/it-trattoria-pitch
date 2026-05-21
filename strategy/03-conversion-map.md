# Conversion Map — Primary + Secondary CTAs per Page

> Per the brief: optimize for foot traffic + online orders + reservations/large groups + catering + brand equity + hiring funnel, in that order. Every page below has exactly one primary CTA and two secondary CTAs. Anything beyond that is decoration.

| Page | Primary CTA | Secondary 1 | Secondary 2 | Notes |
|---|---|---|---|---|
| `/` Home | **Order online** (sticky bottom on mobile) | Find your trattoria → `/locations` | Eat by region → `/regions/calabria` | Hero photo + type. No reservation CTA above the fold. |
| `/menu` | **Order now** | Build your pasta → `/menu/builder` | Find a location → `/locations` | Top-of-fold filter: by category / by region |
| `/menu/[category]` | **Add to order** (sticky) | View regional roots → `/regions/[region]` | Find a location → `/locations` | |
| `/menu/[item]` | **Add to order** | Where it's available → `/locations` (filtered) | More from [region] → `/regions/[region]` | OG image generated per item via `next/og` |
| `/menu/builder` | **Send to checkout** | Save your build (cookie) | Share build (link) | The differentiator UX |
| `/regions` | **Eat from this region** (filters menu) | Read more → `/regions/[slug]` | Find a location → `/locations` | Interactive map is the hero |
| `/regions/calabria` | **Eat Calabrian today** (filters menu) | Read the founders' story → `/story` | Find a location → `/locations` | Most-clicked region; the brand's heart |
| `/regions/[other]` | **Eat from [region]** | Story behind the region | Find a location | |
| `/story` | **Find your trattoria** → `/locations` | Eat from Calabria → `/regions/calabria` | Catering inquiry → `/catering` | Editorial scroll, low-CTA pressure |
| `/story/founders` | **Find your trattoria** | Read journal | Order online | |
| `/story/calabria` | **Eat from Calabria** | Read journal: Calabrian suppliers | Order online | |
| `/story/paris-2014` | Read journal | Find your trattoria | Order online | |
| `/story/us-2024` | **Find your trattoria** | Order online | Press → `/press` | |
| `/locations` | **Pick a location** (visual picker → location page) | Order from nearest | Catering inquiry | |
| `/locations/miami-beach` | Pick: Collins or Lincoln Rd | Order online | Catering | |
| `/locations/nyc` | Pick: 7th Ave or 5th Ave | Order online | Catering | |
| `/locations/[slug]` | **Order from this location** | Directions → external Maps | Call → `tel:` | Per-location hours, photos, neighborhood notes, "Open now" indicator |
| `/order` | **Pick your location** | Browse menu first → `/menu` | Catering → `/catering` | Location-first bridge to Toast (per R3) |
| `/reserve` | **Pick your location** | (text: most IT locations are walk-in; large groups → catering or private events) | Catering | Conditional page; documented uncertainty |
| `/catering` | **Submit catering inquiry** (multi-step form) | Download menu PDF (placeholder) | Call your nearest location | High-margin transactional |
| `/catering/packages` | **Inquire** | Browse menu → `/menu` | Find a location | |
| `/private-events` | **Submit inquiry** | Call your nearest location | See catering | |
| `/journal` | (no primary CTA — editorial index) | Read latest | Subscribe newsletter | |
| `/journal/[slug]` | **Subscribe newsletter** | Eat from [related region] | Find a location | Each journal piece ends with a region or item link |
| `/press` | (no primary CTA) | Press contact → `/contact?topic=press` | Read journal | All quotes flagged placeholders until verified |
| `/careers` | **Email** `office.florida@it-trattoria.com` (mailto) | See journal: working at IT | Order online | |
| `/contact` | **Send message** | Call your nearest location | See catering | Topic-aware routing on the form |
| `/gift-cards` | **Buy gift card** (Stripe stub) | Browse menu | Find a location | Mockup only — Stripe wired in HANDOFF |
| `/franchising` | **Submit inquiry** | About IT → `/story` | Press → `/press` | B2B page; restrained design |
| 404 | **Back to home** | Browse menu | Find a location | Designed page with illustration |

## Sticky-bar Order CTA logic (mobile)

The mobile sticky bottom-bar copy is location-aware:

- User on a Miami Beach page → "Order from Collins" (or Lincoln, whichever is closest by geo if known)
- User on an NYC page → "Order from Midtown"
- User on Calabria region page → "Order Calabrian"
- User on builder → "Send to checkout"
- User on catering page → bar hides (form is the only CTA that matters there)

Implementation note: the bar's copy is derived from a context provider that watches the current route segment.

## Newsletter as a soft secondary

Newsletter signup appears in:
- Homepage final section
- Every `/journal/[slug]` footer
- Site-wide footer (column 5)
- Catering thank-you state (after form submit)

Never on a primary checkout/order surface — would create friction.

## "Open now" CTA logic on location pages

If now is within open hours:
- Primary CTA: "Order from this location"
- Secondary 1: "Directions" (external Maps)
- Secondary 2: "Call" (tel:)

If now is outside open hours:
- Primary CTA shifts to "Schedule an order for [next open hour]"
- "Open at [time]" indicator replaces "Open now"
- Secondary CTAs unchanged

Computed live on the client from the location's `hours` + the user's local time (vs the location's timezone).
