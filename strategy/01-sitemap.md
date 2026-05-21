# Sitemap & Information Architecture

> Updated after Phase 1 synthesis. The regional-Italy spine (`/regions`) and editorial layer (`/journal`) are new top-levels not in the brief's original sitemap.

## Top-level navigation (visible in primary nav)

```
Menu      —  /menu                  hub + categories + builder + item pages
Locations —  /locations             hub + 4 location pages + per-city sub-hubs
Story     —  /story                 founders, Calabria, the 2014 Paris origin
Journal   —  /journal               editorial: regions, suppliers, neighborhood
Order     —  /order                 location-first bridge to Toast
[Reserve] —  /reserve               (conditional — only if any location accepts)
```

Plus a secondary nav strip / utility links:
```
Catering · Private Events · Gift Cards · Careers · Press · Franchising · Contact
```

Plus a brand-locked element in the nav: the green IT monogram (always the top-left mark; clickable to /).

## Full sitemap

```
/                                            Home (English default; locale switcher in nav)

/menu                                        Menu hub — by category + by region toggle
  /menu/aperitivo                            Aperitivo
  /menu/al-banco                             Al Banco (counter snacks, pizza alla pala, panini)
  /menu/a-tavola                             A Tavola (pasta, mains)
  /menu/dolce                                Dolce (tiramisù, dolci, cornetti)
  /menu/bevande                              Bevande (caffè, juices, wine, spritz)
  /menu/builder                              Pasta builder — Phase 4 stretch
  /menu/[item]                               Per-item page (sharable, with OG)

/regions                                     Regional-Italy interactive map — front door
  /regions/calabria                          Calabria deep-dive (founders' home)
  /regions/emilia-romagna                    Tagliatelle, Parmigiano-Reggiano DOP
  /regions/sicilia                           Arancini, citrus, swordfish
  /regions/[region-slug]                     Other regions as content lands

/story                                       About hub — founders, journey, US arrival
  /story/founders                            Renato & Gio bios
  /story/calabria                            Hometown, ingredients, why Calabria
  /story/paris-2014                          First store, the leap
  /story/us-2024                             Arrival in Miami Beach + NYC

/locations                                   All locations hub
  /locations/miami-beach                     Miami Beach sub-hub
    /locations/miami-beach/collins           1656 Collins Ave (flagship)
    /locations/miami-beach/lincoln-road      1014 Lincoln Rd
  /locations/nyc                             NYC sub-hub
    /locations/nyc/midtown-7th               530 7th Ave [verify against live site]
    /locations/nyc/midtown-5th               390 5th Ave [verify against live site]

/order                                       Order online — location-first picker
/reserve                                     Reserve — conditional, only for locations that accept

/catering                                    Catering hub + inquiry form (multi-step)
  /catering/packages                         Package details
  /catering/inquire                          Form (in-route step)

/private-events                              Private dining / buyouts
  /private-events/inquire                    Form

/journal                                     Editorial index
  /journal/[slug]                            Individual journal pieces

/press                                       Press, awards, mentions [placeholders flagged]

/careers                                     Jobs (links to office.florida@it-trattoria.com)
  /careers/[role-slug]                       Per-role pages if any

/contact                                     Customer service / general contact

/gift-cards                                  Gift card sales (stub UI, Stripe later)

/franchising                                 Expansion / partnership inquiries

/legal/privacy                               Privacy policy [boilerplate, counsel needed]
/legal/terms                                 Terms [boilerplate, counsel needed]
/legal/accessibility                         Accessibility statement [boilerplate]

/api/contact                                 Contact form POST
/api/catering                                Catering form POST
/api/newsletter                              Newsletter signup POST
/api/private-events                          Private events form POST

/sitemap.xml
/robots.txt
/manifest.webmanifest
```

## Routing decisions

- **English-only at the route level for the mockup.** No `/en` prefix. Locale switcher in nav is wired to no-op (sets a cookie + reloads — translations land Phase 5+). Documented in `HANDOFF.md`.
- **Sub-hubs for city pages** (`/locations/miami-beach`, `/locations/nyc`) **separate from individual locations**. Sub-hubs aggregate "all in this city" plus neighborhood notes; individual pages drill down.
- **Calabria gets its own surface** at `/regions/calabria` AND a story surface at `/story/calabria` AND deep mentions on menu items. Triple-coverage is intentional — it's the brand's biggest hidden asset (per R2/R3/synthesis).
- **No `/blog`.** It's `/journal` because it sits in the editorial register R5 calls for.
- **Pasta builder lives under `/menu/builder`** rather than as a separate top-level. Builder is a feature inside menu, not a separate destination.

## Mobile-first nav pattern

- Hamburger drawer on `<lg`
- Top bar: monogram (left), nav links (lg+), Order button (right)
- Sticky bottom-bar Order/Reserve on scroll (R5/CRAV pattern), copy swaps by current page context

## Footer information architecture

Footer has five columns:
1. **Trovaci** (Find us): four location cards with address + Open Now indicator
2. **Mangia** (Eat): menu, builder, order, catering, gift cards
3. **Storia** (Story): regions, founders, Calabria, journal
4. **Lavora con noi** (Work): careers, franchising, press, contact
5. **Newsletter + social**: email signup, IG @it.trattoria.usa, IG @it_trattoria

Bottom strip: © IT — Italian Trattoria · privacy · terms · accessibility · locale switcher
