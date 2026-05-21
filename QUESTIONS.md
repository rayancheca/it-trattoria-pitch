# QUESTIONS — Items requiring Rayan's input

> Write here, do not block. Address before the client presentation.

## Critical (must resolve before showing to founders)

1. **Founders' Calabrian hometown.** The brief says they're from Calabria but does not specify the town. Several public sources hint at Reggio Calabria or the Tropea/Ionian coast, but none I can independently verify. Need confirmation directly from Renato/Gio before publishing any "Da [Town], Calabria" copy.
2. **Press section quotes.** All press quotes in the mockup are marked `[PLACEHOLDER — DO NOT PUBLISH UNTIL VERIFIED]`. Need either (a) real press hits from the founders, or (b) a Google/news search to gather actual mentions in Eater Miami, Time Out NY, Miami Herald, etc.
3. **Photography rights.** The mockup uses photos pulled from the founders' own current site + Instagram and from carefully chosen Unsplash photographers. Before launch, the founders should commission a real photoshoot (art-direction notes are in `/design/04-photography.md`).
4. **The fourth NYC location — discrepancy.** The brief lists FOUR US locations (Collins, Lincoln Rd, 530 7th Ave, 390 5th Ave). The current live site (verified by R1 forensic audit) shows only **THREE**: Collins, Lincoln Rd, and one NYC "Times Square" page. The 530 7th Ave / 390 5th Ave split is not reflected on the live site. **The mockup needs to know which is true before public presentation.** Currently building for 4 (per the brief) but presenting Times Square as a unified "NYC Midtown" until confirmed.

## Operational

5. **Vercel deployment.** Production deploy requires logging into Vercel from this machine (`pnpm dlx vercel login`). The mockup ships to a `*.vercel.app` URL once that's done. The Git repo + build are ready.
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
