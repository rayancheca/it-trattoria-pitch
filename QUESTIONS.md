# QUESTIONS — Items requiring Rayan's input

> Write here, do not block. Address before the client presentation.

## Critical (must resolve before showing to founders)

1. **Founders' Calabrian hometown.** The brief says they're from Calabria but does not specify the town. Several public sources hint at Reggio Calabria or the Tropea/Ionian coast, but none I can independently verify. Need confirmation directly from Renato/Gio before publishing any "Da [Town], Calabria" copy.
2. **Press section quotes.** All press quotes in the mockup are marked `[PLACEHOLDER — DO NOT PUBLISH UNTIL VERIFIED]`. Need either (a) real press hits from the founders, or (b) a Google/news search to gather actual mentions in Eater Miami, Time Out NY, Miami Herald, etc.
3. **Photography rights.** The mockup uses photos pulled from the founders' own current site + Instagram and from carefully chosen Unsplash photographers. Before launch, the founders should commission a real photoshoot (art-direction notes are in `/design/04-photography.md`).
4. **The fourth NYC location — RESOLVED by Agent A audit.** Brief and live site disagreed; both turned out to be right about different layers. Toast backend has **all 4 locations** (Collins · Lincoln Rd · 530 7th Ave · 390 5th Ave NY with `shortUrl: it-trattoria-5th-ave-ny`, GUID `45649a07-…`). The public site only surfaces 3 because **390 5th Ave is pre-launch** — Toast checkout `null`, Uber Eats absent, zero public photos exist (Agent B confirmed: 0/12 sources had 5th Ave imagery). The mockup ships 4 locations honestly with 5th Ave using atmospheric placeholders + `[Placeholder — 5th Ave NYC pre-launch]` alt text. **For the founders:** confirm the public launch date for 5th Ave so we can swap in real photos.

5. **Founder portrait gap — needs commissioned shoot.** Agent B (Phase 11 image extraction) confirmed ZERO public portraits of Renato, Gio, or Maxence exist across 12 sources (it-trattoria.com, restaurants. subdomain, pp.it-trattoria.com, Behance brand portfolio, Lincoln Road BID, Miami New Times, Yelp, TripAdvisor, Google Places, Toast, Uber, Instagram authwall). The mockup uses the official "IT IS FAMILY" crew polaroid (`/images/real/founders/it-crew.png`) as a 3-way placeholder. Each founder data record has `portrait.needsShoot: true` and the bio cards visually flag the placeholder state. **Commissioned shoot needs**: candid portraits of Renato + Gio (kitchen/counter, golden hour preferred) + Maxence (office or counter), 3:4 portrait crop, warm Calabrian palette. Art direction in `/design/04-photography.md`.

## Operational

5. **Vercel deployment.** ✅ **DONE.** Live at:
   - Public: **https://it-trattoria-pitch.vercel.app**
   - Private (Vercel team only, 401 for everyone else): https://it-trattoria-pitch-mbxfw1lvf-rayankarimcheca-7930s-projects.vercel.app
   - Vercel project: `rayankarimcheca-7930s-projects/it-trattoria-pitch`
6. **Mapbox token.** The location pages use Mapbox GL. A free-tier public token is needed in `.env.local` as `NEXT_PUBLIC_MAPBOX_TOKEN`. There is a fallback to Leaflet+OSM, but Mapbox renders look more on-brand.
7. **Toast / Resy / OpenTable accounts.** The order/reserve flows are stubbed. For a real launch, we need to confirm which provider IT uses today (the current site uses an internal `/order/italian-trattoria` flow that looks self-hosted) and wire the bridge UI to the right deep links.
8. **Domain strategy.** The brief explicitly says not to register `it-trattoria.com`. Long-term, the rebuild would replace the WordPress site behind that domain. We should ask the founders about DNS access and a migration window.

## Content

9. **Real founder bios.** First-draft bios are voiced as if from the brothers, but they are best-effort reconstructions. The brothers should review and edit for accuracy.
10. **Italian and Spanish translations.** Skeleton i18n is in place with English as the default. Italian should be reviewed by Renato/Gio (native speakers). Spanish should be reviewed by a Miami-Spanish speaker, not Castilian.
11. **Catering package pricing.** The "Penn Station Lunch" and "Collins Avenue Spread" package names are invented for the pitch. Real pricing/items must come from the operations team before publishing.
12. **Legal pages.** Privacy, terms, and accessibility statement are boilerplate placeholders. Counsel review required before any real launch.

## Strategic

13. **Reservations vs. counter-only.** The current site implies counter-service only, but a "Reservations" page is included in the new IA. Need to confirm whether any of the 4 US locations actually accept reservations, or whether Reservations should be reframed as "Large groups & private events only."
14. **The "Calabrian heritage" thesis.** The single biggest content bet in the pitch is leaning hard into the founders' Calabrian roots. This is a hypothesis. Validate with the founders before doubling down — if they prefer a more pan-Italian positioning, the homepage and Story page need to be reshaped.
