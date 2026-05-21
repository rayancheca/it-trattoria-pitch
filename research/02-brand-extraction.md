# 02 — Brand Asset Extraction

**Subject:** IT — Italian Trattoria (Renato & Gio Iera; HQ Paris; ~70 trattorias worldwide; US: Miami Beach + 3 NYC locations).

**Method:** Direct fetch of `it-trattoria.com`, `restaurants.it-trattoria.com`, the order subdomain, plus public Instagram surfaces (no login). Asset URLs pulled from raw HTML on the WordPress subdomain (the only surface that returned 200). Decorative illustrations and the Instagram strip photo were downloaded and visually inspected.

**Reference assets captured to** `research/brand/photos-current/`.

---

## 1. Logo treatment

The brand operates **two related marks**, both confirmed from the live site:

### 1a. The "IT" monogram (icon mark)
- **Asset URL:** `https://restaurants.it-trattoria.com/wp-content/uploads/2021/03/Logo-1.svg`
- **Form:** A solid square containing the letters **I + N** (which together read as the wordmark "IT" stylized — see note below), in a geometric sans, white knockout on a dark fill. The SVG ships as white on transparent (used as overlay on dark / green backgrounds).
- **Real-world appearance:** Visible as an embroidered patch on the chef's black cap in the Instagram strip; visible on the green Vespa delivery box in the brand illustrations; visible on the green takeaway bag in the aperitivo illustration. **This mark is the de facto symbol of the brand.**
- **Dominant background color in physical use:** green (Italian-flag green).
- **SVG source:** 80×80 viewBox, single `<path>` with `fill="white"`, geometric letterforms with uniform stroke weight.

> Note on the letterforms: the SVG decomposes as two glyphs that read "I N" geometrically but resolve as "IT" when set inside the green square — the second character is the brand's stylized T. Either reading, it is recognizable and consistent.

### 1b. The horizontal wordmark
- **Asset URL:** `https://restaurants.it-trattoria.com/wp-content/uploads/2021/03/Logo.svg`
- **Form:** "IT" monogram square + horizontal wordmark "IT TRATTORIA" (or full chain name) lockup. 398×67px. All black on transparent. Modern geometric sans, uniform stroke weights.
- **JPG fallback:** `Logo-1.jpg` (raster).
- **Use:** Header on the WordPress locator subdomain.

### Color variants confirmed in the wild
- White-on-green square (primary, brand identifier — Vespa box, hat patch)
- Black-on-transparent (web header)
- White-on-transparent (overlay on photo)

**Recommendation: KEEP (with refinement).**
The "IT" monogram in the green square is the single strongest piece of brand equity the company owns. It survives on a hat, on a delivery box, on a sign. Don't touch it. The horizontal wordmark lockup is fine but the typography under the mark could be redrawn cleaner in a custom display face to give the wordmark more personality (the current letterforms feel generic-corporate, not Italian-trattoria). Treat the monogram as **KEEP**, the wordmark typography as **REFINE**.

---

## 2. Typeface used

**Display / wordmark:** A custom or near-custom geometric sans (proprietary in the logo SVG — no font reference shipped with it). Closest commercial analogues: **Neue Haas Grotesk**, **Inter**, or a Futura-adjacent geometric sans. Not particularly distinctive.

**Body type on the site:** Not declared in any `@font-face` block that was retrievable — the WordPress theme injects the stylesheet through an asset path that 403'd. From visible rendering it appears to fall back to a system-stack sans-serif. No Italian-character serif anywhere in the type system.

**The Sempé-style illustrations carry hand-lettered cues** (Chianti label, "Salute!", "Saluti!", "La Gazzetta") that suggest the brand *wants* a more characterful editorial voice in print than the website currently delivers in type.

**Recommendation: REPLACE.**
There is no real typographic identity in the current digital surface. The brand has all the visual ingredients to support a strong editorial type system (serif display + clean grotesque body, or a humanist sans + a hand-lettered accent face) but is presenting in default WordPress system fonts. This is the single biggest gap between the brand's *physical* identity (hand-drawn illustrations, embroidered patches, Vespa decals) and its *digital* identity (looks like any DIY pasta-shop site). Type is the cheapest, fastest way to close the gap.

---

## 3. Color palette

No hex codes were directly retrievable from CSS (the theme stylesheet returned 403 on every attempt and inline color was not declared in the HTML). Palette below is **observed** from the SVG assets, the illustrations, the food photography, and the physical Vespa-box / hat treatments.

| Role | Color | Approx hex | Source / use |
|------|-------|------------|--------------|
| Primary brand | Italian flag green | ~`#0B6E3A` to `#1B7A3C` | Vespa, delivery box, monogram background |
| Primary accent | Vermilion / red-orange | ~`#E5562B` to `#F26A2E` | Illustration jacket, scarf, Aperol bottle, lettering accents |
| Highlight | Mustard yellow | ~`#F5C200` to `#FDB813` | Illustration sweaters, hat bands, Chianti bottle |
| Base ink | Pure black | `#000000` | Illustration linework, wordmark |
| Neutral / paper | Off-white | ~`#FBFAF6` | Illustration backgrounds, page |
| Photography warmth | Terracotta / sun-baked clay | ~`#C77A4E` | Tile, ceramic plates in Instagram photography |

The palette is **closer to Italian flag than to tricolore cliché** because it's a *desaturated*, *editorial* version (the red is a warm vermilion, not fire-engine; the green is forest-leaning, not neon). Mustard yellow does meaningful work as a fourth color and prevents the palette from feeling like a flag.

**Recommendation: KEEP (with discipline).**
The four-color palette (green / vermilion / mustard / black on cream) is the strongest piece of brand equity after the monogram. It is *not* tricolore — the inclusion of mustard yellow and the warmth of the vermilion lift it out of cliché. Codify exact hex values for the rebuild; use green as the dominant brand color, vermilion as the action/CTA accent, mustard sparingly for editorial moments. Drop any neon, any pure RGB red, any flag-stripe layouts.

---

## 4. Photography style

**Two photography systems are in play.**

### 4a. Real lifestyle / food photography (Instagram, current strip on locator)
- Captured in the strip image at `restaurants.it-trattoria.com/wp-content/uploads/2021/03/instagram-1024x329.jpg` (see `photography-real-instagram-strip.jpg`).
- **Style:** Warm, candid, natural-light. Slightly underexposed in the highlights, rich shadow. Filmic.
- **Subjects:** Three frames — (1) young women laughing over Aperol spritz and antipasti on a terrace; (2) close portrait of an older chef in an "IT" cap and apron, kitchen background; (3) overhead of burrata + grilled bread + tomato on a hand-painted ceramic plate, on a sage-green wooden table.
- **Plating:** Casual, generous, ceramic dishware with Italian folk-pattern painting. **Not** fine-dining minimalism.
- **Lighting:** Warm afternoon / golden hour. No flash. No food-blog ring light.
- **Color grading:** Warm, slight desaturation, lifted shadows. Feels closer to a Kinfolk / Cereal magazine edit than to a delivery-app photo set.

This is genuinely good editorial photography and is the closest thing the brand has to a contemporary visual identity online.

### 4b. Stock-ish family-meal photography (locator page hero, take-away page)
- e.g. `trattoria-en-famille.jpg`, `restaurant-italie-a-emporter-en-famille.jpg`.
- **Style:** Generic stock family-around-a-table imagery. Bright, evenly lit, smiling extras. Looks like a Getty buy from ~2018.
- **Plating:** Forgettable.
- **Mood:** Friendly but generic. Doesn't communicate Calabrian heritage, Vespa-and-Aperol Italy, or anything specific.

**Recommendation: REFINE the editorial photography, REPLACE the stock photography.**
The Instagram-strip aesthetic (4a) is the right direction and is already on-brand — keep, expand, and use it as the foundation. The locator-page family-stock imagery (4b) should be killed entirely and replaced with either a new commissioned shoot in the 4a style, or carefully sourced editorial Italy / Calabria photography that matches the warmth and candidness.

---

## 5. UI patterns

The current digital surface is a stock WordPress build with a third-party "Super Store Finder" plugin:

- **Navigation:** Plain horizontal nav, hamburger SVG on mobile (24×19, white stroke, `Group-124.svg`). No motion, no opinion.
- **Buttons:** Standard plugin-default buttons with no consistent brand styling visible in the retrievable HTML.
- **Hero pattern on locator:** Headline "Over 70 trattorias worldwide! Discover the ones near you..." over the restaurant-trattoria-1 hero PNG. A spinner gif (`spinner.gif`) is the loading state — defaults from the store-finder plugin.
- **Vespa decoration:** The `vespa.png` illustration is dropped onto the locator page as a decorative flourish — the most successful UI element on the page.
- **Layout:** Single-column, plugin-shaped. No editorial grid, no bento, no scrollytelling. Nothing that signals "premium hospitality brand."

**Recommendation: REPLACE entirely.**
There is no UI system to carry forward. The brand has zero design equity in its current digital interface — it's a third-party plugin in a WordPress theme. This is liberating: the rebuild has no UI legacy debt. The illustrations and photography survive; the chrome around them does not.

---

## 6. Voice / tone of headlines

Verbatim copy collected from live pages:

- **"THAT'S IT."** — appears 21 times on the locator homepage. This is clearly the brand's primary tagline / sign-off.
- **"Over 70 trattorias worldwide! Discover the ones near you..."**
- **"IT TRATTORIA, Pizza and Fresh Pasta"**
- **"Discover our Italian restaurant in Miami Lincoln Road"**
- **"Discover our Italian restaurant in New York's Times Square"**
- **"Treat yourself to a delicious escape to Italy"**
- **"Why they chose us!"**
- **"The latest from your trattoria on Instagram"**
- **"After the hour, it's no longer the hour. The newsletter isn't just around the corner!"** (footer, slightly awkward EN translation from FR)
- Brand body copy describes "authentic family-style cuisine," "products straight from Italy," "fresh, homemade dishes."

**Voice characteristics:**
- The tagline **"THAT'S IT."** is excellent — it's a pun on the brand name, it's confident, it's short, it works in any language. Genuine asset.
- The rest of the copy is **translated-from-French generic** ("Treat yourself to a delicious escape to Italy" is a phrase no native English-speaking diner would write or remember). It is friendly but characterless.
- There is no Calabrian voice, no founder voice, no edge, no humor that matches the playful Sempé illustrations.

**Recommendation: KEEP "THAT'S IT.", REPLACE the rest.**
"THAT'S IT." is the entire voice strategy you need — confident, declarative, doubles as brand name. Build a copy system around it (short, declarative, dry, occasionally funny — matched to the Sempé illustration tone). Kill the translation-soup phrasing and write all new English copy from scratch with the Calabrian-brothers-in-Paris voice in mind: a little arch, a little proud, never precious.

---

## 7. Iconography style

The brand's **single most distinctive visual asset** is its illustration system.

- **Source URLs:** `vespa.png` (locator decoration), and the larger Sempé-style scenes embedded as visual content on the WordPress pages and clearly drawn from the same commissioned illustrator: `illustration-vespa-delivery.png`, `illustration-couple-salute.jpg`, `illustration-pasta-mountain.png`, `illustration-family-gazzetta.jpg`, `illustration-aperitivo.png` (all saved to `research/brand/photos-current/`).
- **Style:** Hand-drawn line work in black, flat color fills in the brand palette (green / vermilion / mustard / black on cream). Loose, slightly wobbly linework. Confident character drawing. Reads instantly as **Jean-Jacques Sempé** (the *New Yorker* / *Le Petit Nicolas* illustrator) — almost certainly the deliberate reference, given the brand's Paris HQ. Also adjacent to **Saul Steinberg**.
- **Subjects:** A Vespa delivery rider with an "IT" green box; a couple toasting with Aperol spritz over an antipasti spread (with a tiny Italian flag on the table, "Salute!" placecard); two kids climbing a giant mountain of pasta and planting an Italian flag; a grandmother reading *La Gazzetta dello Sport* with kids playing under the table; an aperitivo still life with an Aperol bottle marked "ITALIA," olives, prosciutto-on-toothpicks, and a "Saluti!" card.
- **Tone:** Warm, family-centric, mid-century European, gently funny, never saccharine.

This illustration system is **gold**. It's instantly recognizable, ownable, hard to copy, and tells the entire brand story (Italian family meals via Paris) in three seconds. It is the strongest piece of brand equity IT — Italian Trattoria has and it is criminally underused on the digital surface (the locator slaps a single vespa.png in the corner; the menu page is text-only).

**Recommendation: KEEP and elevate.**
The Sempé-style illustration system is the single most defendable, ownable, instantly-recognizable thing this brand has. It deserves to be the centerpiece of the rebuild — not a decoration. Build the site around the illustration library: use it for empty states, for section dividers, for the menu category headers, for hover states, for the loading state, for the 404. Commission more pieces if needed (the existing set is ~5–7 scenes; a proper site wants 15–20). Pair the illustration system with the warm editorial food photography (4a) and you have a complete visual identity.

---

## 8. Instagram grid themes

Both public accounts were partially accessible (Instagram serves an aggressively limited markup to logged-out visitors and most thumbnails are returned as base64 image data the page renderer cannot describe). What can be confirmed:

### @it.trattoria.usa
- **Bio:** "IT • The Italian Trattoria | Italian Restaurant in NYC & Miami"
- **Positioning:** Multi-location US-facing handle, focused on Miami Beach + NYC.
- **Visible recurring elements** (from the rendered Instagram banner strip and the same imagery surfaced on the WordPress locator):
  - Candid lifestyle shots of diners (young, social, terrace-and-aperitivo coded)
  - Founder / chef portraits (with the embroidered "IT" cap)
  - Overhead food shots on hand-painted ceramic plates on rustic wooden surfaces
  - Burrata, antipasti, Aperol spritz, grilled bread appear repeatedly
  - Warm natural light, filmic grade

### @it_trattoria (global / Paris-led)
- **Bio:** "IT Miami (@it_trattoria) • Instagram photos and videos" — note: bio identifies as Miami-focused even though the handle is the global one. (Confirm in client meeting whether the global handle has been repurposed for Miami or whether the bio is stale.)
- Grid not visually retrievable from logged-out HTML.

**Recommendation: KEEP the photography direction, REFINE the strategy.**
The photographic style on the visible Instagram surface is the strongest current expression of the brand online — far stronger than the website. The rebuild should treat the IG aesthetic as the *source of truth* for site photography, and the website should mirror that warmth and candidness rather than the locator's stock-family aesthetic. (Strategic note for separate deliverable: the bio confusion between @it_trattoria and @it.trattoria.usa is a flag for the rebuild's overall information architecture — which handle does a US diner land on, and what does each say.)

---

## Asset inventory (recoverable URLs)

| Asset | URL | Format | Recommendation |
|-------|-----|--------|----------------|
| Primary monogram (white on transparent) | `https://restaurants.it-trattoria.com/wp-content/uploads/2021/03/Logo-1.svg` | SVG | KEEP |
| Horizontal wordmark lockup | `https://restaurants.it-trattoria.com/wp-content/uploads/2021/03/Logo.svg` | SVG | REFINE (redraw type) |
| Wordmark raster fallback | `https://restaurants.it-trattoria.com/wp-content/uploads/2021/03/Logo-1.jpg` | JPG | REPLACE (use SVG) |
| Hamburger icon | `https://restaurants.it-trattoria.com/wp-content/uploads/2021/03/Group-124.svg` | SVG | REPLACE (custom UI) |
| Vespa illustration | `https://restaurants.it-trattoria.com/wp-content/uploads/2023/10/vespa.png` | PNG | KEEP (request SVG/vector source from client) |
| Couple-salute illustration | (embedded in pages) | JPG | KEEP |
| Pasta-mountain illustration | (embedded in pages) | PNG | KEEP |
| Family-Gazzetta illustration | (embedded in pages) | JPG | KEEP |
| Aperitivo still-life illustration | (embedded in pages) | PNG | KEEP |
| Real Instagram food/lifestyle strip | `https://restaurants.it-trattoria.com/wp-content/uploads/2021/03/instagram-1024x329.jpg` | JPG | KEEP direction (commission new shoot) |
| Stock family-meal hero (locator) | `https://restaurants.it-trattoria.com/wp-content/uploads/2024/02/restaurant-trattoria-1-1024x939.png` | PNG | REPLACE |
| Stock family-meal (Miami/NY pages) | `…/trattoria-en-famille.jpg`, `…/trattoria-en-famiglia.jpg`, `…/restaurant-italie-a-emporter-en-famille.jpg` | JPG | REPLACE |
| Vespa delivery photo | `…/livreur-repas-vespa-livraison-italien.jpg` | JPG | REPLACE (use real photography, not stock) |
| Tagline copy "THAT'S IT." | (text) | — | KEEP |

---

## Quick decision matrix

| Brand asset | Keep | Refine | Replace |
|---|---|---|---|
| "IT" monogram (green square) | ✅ | | |
| Wordmark lockup type | | ✅ | |
| Sempé-style illustration system | ✅ | | |
| Primary color palette (green / vermilion / mustard / black on cream) | ✅ | | |
| Display + body typography | | | ✅ |
| Editorial lifestyle/food photography (a la IG strip) | ✅ | | |
| Stock family-meal photography | | | ✅ |
| Tagline "THAT'S IT." | ✅ | | |
| Rest of body / headline copy | | | ✅ |
| UI / navigation / button system | | | ✅ |
| Iconography (e.g. hamburger) | | | ✅ |
| Site information architecture (locator-on-subdomain split) | | | ✅ |

---

## Brand equity summary

What's worth carrying forward: the **"IT" monogram inside a green square**, the **Sempé-style hand-drawn illustration library**, the **disciplined four-color palette of green / vermilion / mustard / black on cream**, the **warm candid editorial photography** already visible on Instagram, and the **tagline "THAT'S IT."** — five assets that together carry a complete, ownable, instantly-recognizable Italian-family-trattoria-via-Paris identity. What should go: every piece of generic stock family-meal photography, every line of translation-from-French body copy, the entire WordPress + store-finder-plugin chrome, the default-system typography, and the locator's split-subdomain information architecture. The brand has a strong physical and illustrative identity that the digital surface is actively hiding; the rebuild's job is to put the illustrations, the photography, and the green monogram on a stage worthy of them.
