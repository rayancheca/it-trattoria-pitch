# REVIEW — Running Decisions Log

> Update this file at every significant decision point.

## Current phase
**Phase 11 — Real data + aggressive UX overhaul** (in progress)

### Agent C (Sweetgreen + Chipotle UX) — landed

Full buildbook in `/research/12-sweetgreen-chipotle-ordering.md`. The 10 moves we ship:

1. **Apple Pay first, full-width, above all card/email fields** — Sweetgreen + Chipotle; Apple HIG-backed; biggest single conversion lever
2. **"Order again" rail above the menu** for returning users (Sweetgreen) — Baymard-validated "standing order" mental model; one-tap reorder
3. **Right-side cart drawer with item thumbnails + sticky "Add a side?" upsell rail** (Sweetgreen)
4. **Sticky bottom CTA inside item drawer showing live price** (e.g. "Add to bag — $18.50"), pulses when required choices complete (Sweetgreen)
5. **Cart-icon scale-bump + count badge on add — no toast notification** (Sweetgreen restraint, not Shake Shack noise)
6. **Chipotle-style dedicated pickup-time screen**: big ASAP card on top, "Schedule for later" expands to day chips + time-slot list
7. **Stepped order tracker with pulsing active step + countdown** (already shipped — refine with countdown)
8. **Single-page pasta builder, not multi-step wizard** (Chipotle's post-redesign learning)
9. **Loyalty math + free-delivery-threshold progress bar** both visible in cart
10. **"Forgot something? Add to your order" 90-second post-confirmation window** (Sweetgreen — converts without coercion)

**Top 3 conversion movers:** Apple Pay first · Order Again rail · Sticky live-price CTA in modifier drawer

**Do NOT copy:** Chipotle's auto-playing video hero with LTO overlay — kills LCP, fights brand voice. IT's hero stays still and editorial.

**⭐ The unfair lane — beating Sweetgreen specifically:** Editorial culinary authority. Sweetgreen ships removed friction but cannot speak — every dish is a featureless customization grid. IT ships **region badges, DOP shields, the "non si fa" carbonara guard, wine pairings inline, "dal mercato oggi" daily-rotating market specials**. UX moves that require culinary voice and regional knowledge. No fast-casual chain can copy them without breaking their scale model.

Waiting on B (real images).

### ⚠️ Agent A (real menu data) — landed. Biggest finding of the project.

Full report in `/research/10-real-menu-data.md` + machine-readable `/research/10-real-menu-data.json` (66 items, schema-compatible).

**Headline:** 9 of my 17 mockup menu items are **INVENTED**:
- paccheri-alla-calabrese (the homepage hero!)
- tagliatelle-al-ragù · cacio-e-pepe · orecchiette-cime-di-rapa · trofie-al-pesto
- panino-mortadella · arancini · spritz-calabrese · tiramisù-al-bergamotto

**5 items REAL** (verified from Toast/Uber/Sage): pizza-alla-pala-margherita · pizza-alla-pala-spianata · tiramisu (Tiramisù Coffee) · espresso · cappuccino.
**Close matches:** my `tagliere-calabrese` ≈ IT's `Antipasto della Casa`; my `burrata-prosciutto` ≈ `Pizza Prosciutto e Burrata`.

**Top 5 cross-source verified items:**
1. Margherita Pizza — $15.95 MIA / $16.95 NYC
2. Spaghetti Carbonara — $21.95 everywhere
3. Rigatoni Bolognese — $20.95 MIA / $21.95 NYC
4. Stracciatella & Focaccia — $13.95 everywhere
5. Antipasto della Casa — $21.95 everywhere

**The strategic gap (huge):** IT's actual menu is broadly **Sicilian/Northern Italian crowd-pleaser fare** (Carbonara, Rigatoni Vodka, Bolognese, Margherita, Lasagna, Caesar). Only **4 Calabrian touchpoints** — Spianata in Diavola pizza, Spianata in antipasto, ½ Spianata Pala, Spianata Pala slice. **The brothers' Calabrian heritage is loud in marketing copy but quiet on the plate.**

My "regional-Italy spine with Calabria as front door" thesis over-corrected. The mockup invented an entire Calabrian regional pasta program IT doesn't sell. Agent A's elegant handling: ships 63 verified items + 3 explicitly aspirational (`aspirational: true, verified: false`) so the pitch can argue for them.

### Cascade required when I integrate
1. Replace `src/data/menu.ts` with 63 verified + 3 aspirational
2. Prices: NY $1 higher than Miami across most items
3. Homepage `FeaturedDishes` — paccheri isn't real. Use Carbonara/Bolognese/Margherita as cross-source verified heroes.
4. `MenuMarquee` — replace invented names with real dish names
5. Journal entries — bergamot tiramisù + n'duja pieces become "items we're pitching for the rebuild," clearly marked
6. Regional map — stays as design device but honest about what's on the plate today
7. **PITCH.md** — reframe Calabrian thesis: brand story is bigger than the current plate. Sell rebuild as brand-AND-product collaboration. This is actually a STRONGER pitch.

### Agent D (3D + conversion design) — landed

Full doc in `/research/13-3d-conversion-design.md`. The 12 moves we ship, ranked:

1. **Scroll-scrubbed AVIF frame sequence** — "the pasta morph" hero (Blender-rendered hands shaping tagliatelle, frame-scrubbed on scroll)
2. **Cursor-following 3D Vespa** — R3F hero signature, scroll rides it through page, parks as persistent nav (THE signature move)
3. **Particle-driven espresso steam** — R3F + Perlin noise on menu page ⏩ (already built)
4. **Sticky horizontal "Our Calabria"** — Fabbrica pattern, pinned section
5. **Single-stroke SVG noodle/olive branch** threading the entire page (God of Noodles)
6. **Cinema-mode card stacking** on menu — cards deal out of a deck
7. **Two-layer parallax depth on hero** — CSS translateZ for faux-3D
8. **Stripe-style GLSL gradient field** behind menu sections
9. **Themed UI primitives** — spaghetti-fork loader, cutting-board empty cart, ravioli sliders
10. **Magnetic CTAs + "+1 burst"** that flies the button to the cart icon (huge conversion move)
11. **Scroll-driven count-ups** ("37 ordini oggi", "pasta fatta stamattina")
12. **Clip-path page transitions** masking the next hero image preload

### ⭐ Three signature 3D moments (brand identity)

1. **The Vespa Scroll** — R3F cream Vespa, cursor steers, scroll rides it through page sections, parks in nav
2. **The Pasta Morph** — AVIF frame sequence (pre-rendered Blender) scrubbed on scroll. Real-time 3D dough looks bad; pre-render is frame-perfect.
3. **The Espresso Pour** — R3F espresso cup, hover triggers crema pour, click sends to cart ⏩ (steam scene partially built; needs hover→pour interaction + click-to-cart wire)

### Stack: R3F + AVIF + Lottie (rejecting Spline)
- R3F for Vespa + Espresso (cursor-reactive, in-repo, lazy)
- AVIF sequence for Pasta Morph (frame-perfect)
- Lottie for decorative primitives (loader, empty-cart, cart-burst badge)
- Spline rejected (heavier ship, cloud dep, perf tuning)

### Fail mode to avoid
**Generic floating decorative 3D food** (rotating pizza, spinning burger, looping coffee cup). The corrective rule: every 3D element must (a) respond to user input in real time, (b) advance narrative only this brand can tell, or (c) drive a conversion micro-moment.

Self-audit against my existing 3D scenes:
- ✓ **Peperoncino** — cursor tilt → satisfies (a). Calabrian-specific → satisfies (b). Keep.
- ✗ **PastaPlate** — passes cursor tilt but doesn't advance narrative or drive conversion. **REPLACE with the Vespa Scroll** which is the signature move.
- ⚠️ **EspressoCup** — has steam (✓) but needs hover→pour interaction + click→add-to-cart wire to satisfy (c).

## Ready for pitch — final summary

| | |
|---|---|
| **Repo (private)** | https://github.com/rayancheca/it-trattoria-pitch |
| **Public production URL** | https://it-trattoria-pitch.vercel.app |
| **Private preview URL (Vercel team only)** | https://it-trattoria-pitch-mbxfw1lvf-rayankarimcheca-7930s-projects.vercel.app |
| **Local run** | `pnpm install && pnpm dev` → http://localhost:3000 |
| **Routes** | 70 prerendered |
| **Screenshots** | 33 captures at desktop + mobile in `/pitch/screenshots/` |
| **Build** | passes clean |
| **Pitch deck** | `/PITCH.md` |
| **Open items** | `/QUESTIONS.md` — 14 items, 4 critical |

**Executive summary for the founders (paste-ready):**

> The current it-trattoria.com is a 2014 WordPress site that — verified through forensic audit — is actively losing customers in the US. Lincoln Road's "Directions" link points to Collins Avenue's address. The New York page's meta description is entirely in French. The global locator shows 33 raw plugin placeholder strings live. Every English page is stamped `og:locale="fr_FR"` and zero `Restaurant` schema ships anywhere. We rebuilt the site end-to-end on Next.js 15 — 70 prerendered routes, all four US locations with live "Open now" indicators, per-location `Restaurant` JSON-LD, an editorial menu with named-producer sourcing on every dish, and a regional-Italy storytelling spine that no Italian counter-service competitor on the internet currently offers. The pitch deck, the working mockup, the research, the design system, and the production rollout plan are all in the repo. Open the README first.

---

## Phase 0 — Bootstrap (complete)
- 2026-05-20: Project initialized at `/Users/rayankarimcheca/it-trattoria-pitch`

## Phase 0 — Bootstrap (complete)
- 2026-05-20: Project initialized at `/Users/rayankarimcheca/it-trattoria-pitch`
- Git repo created on `main` branch
- Folder skeleton created for all 6 phases
- Meta files (CLAUDE.md, REVIEW.md, PITCH.md, QUESTIONS.md, HANDOFF.md) created
- Decision: keep the project in the user's home directory under a clearly named subfolder rather than `/tmp`, because this is a multi-session, multi-phase build

## Scope reality check (read before continuing)

The brief asks for what would normally be **3–6 weeks of full studio work** compressed into agent execution. To make this tractable in a useful timeframe, the orchestration prioritizes:

1. **Depth where it matters most for the pitch:** Home, Story, one fully built Location page (Miami Beach Collins), one Menu category, one fully built Catering page, Founders/Story page.
2. **Breadth-with-stubs everywhere else:** Every page in the sitemap exists, is reachable, and has a credible designed shell — but only the "hero pages" go to full editorial polish.
3. **Single locale (en) ships first.** Italian and Spanish skeletons + a working locale switcher, but full translation is left as a Phase-5/post-pitch task documented in QUESTIONS.md.
4. **Mockup-grade, not production-grade integrations.** Forms log to `/api/*` stub routes and return success. Real Toast/Resy integration is documented in HANDOFF.md as the "what we'd do next" story for the pitch.

This is consistent with the brief's intent: it's a pitch mockup, not a production cutover. The pitch deck will tell the rest of the story.

## Phase 1 — Discovery & Competitive Research

Subagents dispatched (see TodoWrite for status):
- R1: Client site forensics → `/research/01-current-site-audit.md`
- R2: Brand asset extraction → `/research/02-brand-extraction.md`
- R3: Direct competitors (Italian counter-service) → `/research/03-competitors/`
- R4: Aspirational competitors (upscale Italian) → `/research/04-aspirational/`
- R5: Award-winning food sites → `/research/05-awards-inspiration.md`
- R6: SEO + local search baseline → `/research/06-seo-baseline.md`

Synthesis to land in `/research/00-synthesis.md` after subagents complete.

### R6 — SEO baseline (COMPLETE)

Key actionable findings to bake into strategy phase:

**5 keyword whitespace opportunities IT can own:**
1. "italian restaurant near Penn Station" — 530 7th Ave is 4 min walk; currently Bar Primi / Alessa / L'Amico capture this. **High intent, high margin.**
2. "italian counter service Miami Beach" — IT's most distinctive descriptor; **IT doesn't rank for it**. Bar Bucce owns it currently.
3. "italian lunch Bryant Park / Midtown 5th Ave" — 390 5th Ave is in range; La Pecora Bianca and Olio e Più own the SERP.
4. **"italian breakfast / cappuccino / croissant"** in BOTH markets — IT opens at 7am with real Italian coffee + daily croissants; nobody in the competitive set owns the breakfast cluster. **This is the single best whitespace play.**
5. "italian catering near [landmark]" — high-margin transactional; IT has zero current authority.

**Strongest local competitor per location:**
- 1656 Collins Ave → Dolce Italian (literally next door); Cecconi's (brand authority threat)
- 1014 Lincoln Rd → Rosinella Ristorante (1997, owns "family-owned trattoria")
- 530 7th Ave → Bar Primi Penn District (Andrew Carmellini, same positioning, 2 blocks)
- 390 5th Ave → La Pecora Bianca Bryant Park (overlapping positioning, much stronger SEO + design)

**3 highest-leverage technical SEO fixes:**
1. Kill `restaurants.it-trattoria.com` — 301 every URL into `it-trattoria.com/locations/...`. Currently dilutes authority + inconsistent coverage.
2. Per-location `Restaurant` + `LocalBusiness` JSON-LD with full hours/geo/menu/`sameAs` to Yelp/Tripadvisor/GBP.
3. Hub-and-spoke internal linking + `es-US` hreflang. `/locations/miami-beach/` + `/locations/nyc/` hubs. Spanish for Miami market.

These 3 architectural fixes alone are enough to justify the rebuild on pure SEO grounds — they'll be a major pillar of `/PITCH.md`.

### R5 — Awards inspiration (COMPLETE)

**The 5 design moves we're adopting** (each anchored to a real award-winning reference):

1. **Editorial type-over-image hero with a rotating "today's plate" teaser** — ref: Da Maria. Big serif headline over a single full-bleed dish, with a rotating "only today / this week" microstory above the fold.
2. **Ingredient-as-still-life scroll dividers** — ref: CRAV Burgers. Single ingredients (San Marzano tomato, basil, parmigiano, peperoncino) get gallery-style full-bleed treatments between menu sections. **Strong Calabrian-storytelling vehicle.**
3. **Magazine as a top-level nav item** — ref: Caffè Milani. A real editorial surface (supplier features, founders' Calabria pieces, neighborhood notes) sitting next to Menu and Locations. **Doubles as SEO long-tail engine.**
4. **Themed menu collections instead of generic categories** — ref: WatchHouse. Replace "Starters / Mains" with named acts: **Aperitivo / Al Banco / A Tavola / Dolce.** Tells guests how to eat the menu, very Italian.
5. **Sticky bottom-bar Order/Reserve CTA with location-aware copy** — ref: CRAV Burgers + Frituur Rumbeke Platse. Mobile-first sticky bar; copy swaps as user scrolls past each IT location card on Locations page.

Bonus references captured for design tokens: Tenuta Centoporte (place-as-protagonist pacing), Haven Annecy (SVG line marks for warmth), Paput Menorca (dialect phrase as repeating motif — perfect for Calabrian dialect callouts), BurgerFuel (color-blocked chapter transitions), Wildbran (alternating full-bleed magazine rhythm).

**Implication for design phase:** The "magazine as nav item" idea reframes the IA — Phase 2 sitemap should add `/journal` or `/storie` as a top-level. Capturing this for Phase 2.

### R3 — Direct competitors (COMPLETE)

**5 patterns to adopt** (with attribution):
1. **Location-first ordering** — Joe's, CAVA, andpizza force store-pick before menu. Correct pattern for multi-location with menu/hours variance.
2. **A builder, not a menu** — CAVA's bowl-builder is the primary CTA. **No Italian competitor has built one.** IT should ship a **pasta/plate builder**. Massive UX + SEO opportunity.
3. **Sourcing as a UI element** — Sweetgreen tags farm + carbon per item. IT should name mill, tomato region, cheese producer per dish.
4. **Disciplined food photography as art direction** — Tatte / Sweetgreen win on photographic consistency. One rule enforced everywhere (e.g., overhead, natural light, single bowl on linen).
5. **Editorial deep-dives inside a transactional site** — Eataly's pasta long-form, Sweetgreen's "in the lab." IT runs pasta-of-the-week / region-of-the-month as a homepage slot.

**3 patterns to avoid:**
1. Vapiano's corporate-portal homepage (country selector, no menu, no founder voice).
2. Eataly's fragmented ordering surfaces (separate stacks for catering / dine-in / takeout / retail).
3. Princi's pricing opacity (no prices, no calories) — Americans expect both upfront.

### ⭐ R3 — THE differentiation hypothesis ⭐

**A regional-Italy map as the site's navigational and storytelling spine.** None of the 10 competitors anchor UX in Italian regional geography. Hover **Calabria** → n'duja + bergamot + the founders' story; hover **Emilia-Romagna** → tagliatelle + the Parmigiano producer; hover **Sicily** → arancini + citrus. Menu, sourcing, chef notes, and location specials hang off regional pins.

**This is THE design move for the pitch.** Aligns perfectly with the brief's "reclaim Calabria as a brand asset" thesis. Builds an unmistakable site identity. Counter-service speed + regional-Italy soul = unclaimed positioning. The map becomes the front door for Story, Menu, Sourcing, and the magazine.

### R2 — Brand asset extraction (COMPLETE)

**Three brand assets to KEEP** (these are real equity):
1. **The "IT" monogram in the green square** — embroidered on chef's cap, painted on the Vespa delivery box. **Strongest single piece of equity** the brand has. (Asset: `Logo-1.svg`)
2. **The Sempé-style hand-drawn illustration library** — vespa rider, couple toasting, pasta-mountain, family with *La Gazzetta*, aperitivo still-life. **Instantly ownable, hard to copy, tells the Calabrian-via-Paris story.**
3. **The tagline "THAT'S IT."** — confident, multilingual, puns the brand name. Appears 21x on the locator.

**Three to REPLACE:**
1. All stock family-meal photography on locator + location pages (generic 2018 Getty energy, kills brand).
2. Translation-from-French body copy ("Treat yourself to a delicious escape to Italy") — characterless, nothing Calabrian.
3. Default-system typography + WordPress + store-finder plugin chrome — zero typographic identity.

### ⭐ R2 — THE design direction ⭐

**Build the rebuild around the Sempé-style illustration system paired with warm editorial Instagram photography, anchored by the green "IT" monogram and a disciplined green / vermilion / mustard / black on cream palette.** Commission a proper editorial display typeface.

**This OVERRIDES the brief's hypothesized peperoncino-red-first palette.** The brand already has green + monogram equity. The new palette should be **forest green (primary, from the monogram) / vermilion (Calabrian accent, peperoncino) / mustard (bergamot) / charcoal / warm cream / olive (supporting)**. This keeps existing equity while adding Calabrian warmth.

**Illustrations are LOAD-BEARING**, not decoration. They power: empty states, section dividers, menu category headers, 404, hover states, "today's plate" frame, the regional-Italy map's pins.

7 reference brand assets saved to `research/brand/photos-current/` for the build phase.

---

### Cross-cutting Phase 1 takeaways landing already

The pieces are converging on a single, sharp creative thesis:

> **"IT — Italian Trattoria" reborn as the only counter-service Italian on the internet that lets you order by region. A green-monogrammed, hand-illustrated, Calabrian-rooted editorial site with a builder-style pasta order flow and per-location SEO discipline that beats Bar Primi at Penn Station, Dolce Italian on Collins, and La Pecora Bianca on 5th.**

Phase 2 (strategy) will sharpen this into a sitemap + content model. Phase 3 (design) will translate it into tokens. Phase 4 (build) will ship it.

Waiting on R1 (current site forensics — evidence pack).

### R4 — Aspirational competitors (COMPLETE)

**Design DNA across Carbone / Don Angie / Via Carota / Misi / Marea / Sant Ambroeus / Lilia / Lucali / I Sodi:**

Serif-led type system (display serif wordmark + neutral sans body, sparing Italian-language section labels as cultural texture, *not* translation). Near-monochrome cream-and-charcoal palette where all warmth comes from photography, not chrome. Photo-forward heroes, type-minimal. Restrained-to-absent motion — pace signals confidence by refusing to oversell. About pages are editorial long-form with real founder portraits. Menus are treated as **printed artifacts**, not inventory databases.

**3 elements IT should adopt:**
1. **Two-font system** — one display serif + one neutral sans — with Italian section labels as quiet texture (not full translation).
2. **Disciplined cream-and-charcoal chrome** where one excellent food photographer carries the color. (Plays perfectly with R2's accent palette: monogram green, peperoncino vermilion, bergamot mustard used **sparingly** on top of cream/charcoal.)
3. **Editorial about page with candid, un-corporate founder portrait** and 200 honest words. **Don Angie's register, not Carbone's mythology.** This is the right note for Renato + Gio.

### ⭐ R4 — The uncanny-valley warning ⭐

"These sites are built around *sitting down* — reservation rituals, banquettes, two-hour dinners. If IT clones the surface (giant 'Reserve a Table' CTA, ascetic Tuscan-farmhouse mood, 'since generations' heritage copy it can't back up), it will read as a counter-service room costuming as a sit-down restaurant — which is worse than honest fast-casual. **Borrow the restraint and the type discipline; design honestly around the format.**"

This locks in a key design decision: the homepage hero is **photo + type, NOT a reservations CTA**. Order Online is primary; reservations live where they belong (catering / private events / specific locations that accept them).

---

### Unified design thesis after R2, R3, R4, R5

- **Palette:** Cream + charcoal as dominant chrome. Monogram green, peperoncino vermilion, bergamot mustard, sea-foam (Calabrian Ionian) as sparing accents. **No tricolore stripes. No purple-pink gradients.**
- **Type:** Editorial serif display (TBD in Phase 3 — explore PP Editorial New, GT Sectra, Reckless) + neutral sans body (Geist or Söhne). Italian dialect labels as quiet texture.
- **Imagery:** Sempé-style hand-drawn illustrations as a load-bearing system. Editorial food photography with one rule (overhead, natural light) enforced. Founder portrait — candid, not glossy.
- **Motion:** Restrained. Hero stillness > hero animation. Scroll dividers can be ingredient stills.
- **Navigation spine:** A **regional-Italy map** as the primary differentiator. Calabria is the front door. Other regions tell sourcing + chef stories. This is the headline move for the pitch.
- **Order flow:** Location-first picker → menu → pasta builder. Sticky bottom-bar Order/Reserve CTA on mobile.
- **Editorial:** A `/journal` (or Italian: `/storie`) top-level for SEO long-tail + brand storytelling.

### R1 — Current site forensics (COMPLETE) — the pitch dynamite

The five most damaging problems on the live site — each one a slide in the pitch deck:

1. **The Lincoln Road location page sends users to the wrong restaurant.** `restaurants.it-trattoria.com/miami-beach-lincoln-rd/` "Directions" link resolves to `destination=1656+Collins+Avenue+33139+Miami+Beach` — Collins Ave's address. Customers literally lost.
2. **The New York page's meta description is entirely in French.** Verbatim source: `"Restaurant Italien à New York Time Square 🇮🇹 - Venez Découvrir nos PIZZAS, PÂTES, SALADES, ANTIPASTIS ET DESSERTS dans une Trattoria Calabraise…"`. Every Google result, iMessage unfurl, and X card for the NY page renders in French.
3. **The global locator renders "0 of 0 restaurants" with 33 raw plugin placeholder strings live.** SuperStoreFinder WP plugin defaults visible: `"Placeholder store name"`, `"Placeholder address"`, `"Telephone placeholder"`, `"Custom field 1 placeholder"` through `"Custom field 6 placeholder"`. The locator was never seeded with real data.
4. **No `Restaurant` / `LocalBusiness` schema anywhere, and `og:locale="fr_FR"` stamped on every English page.** JSON-LD inLanguage = `fr-FR`. The site is invisible to Google Local rich results AND telling search engines it's French-language. Combined with R6's finding that IT doesn't rank for its own primary descriptor "italian counter service Miami Beach" — this is why.
5. **Three US locations live, not four; split across two unconnected surfaces with different Instagram handles.** `restaurants.it-trattoria.com` shows Collins, Lincoln Rd, Times Square. `pp.it-trattoria.com` is the same 3, links to IG `it.trattoria.us`. `restaurants` subdomain links to IG `it_france` and FB `ITFrance`. Newsletter on the locator reads: `"After the hour, it's no longer the hour. The newsletter isn't just around the corner!"` (broken machine translation of "Après l'heure, ce n'est plus l'heure").

Full audit (~3500 words) in `research/01-current-site-audit.md`.

---

## Phase 1 — synthesis (locked in)

The 6 research streams converge on a single thesis:

**The current IT website is a French marketing artifact that costs the brand real US revenue every day.** The fix isn't a redesign — it's a rebuild around three converging opportunities:

1. **Local-SEO discipline** (per-location schema, /locations/[slug] hub-and-spoke, kill restaurants. subdomain, hreflang) → un-stranded organic traffic Bar Primi and La Pecora Bianca are taking today.
2. **Regional-Italy storytelling** as the design spine (Calabrian front door, sourcing by region) → unclaimed category positioning, deep editorial SEO surface, Instagram-grid-ready content.
3. **Counter-service-honest UX** (location-first ordering, pasta builder, mobile sticky CTA, no fake reservation theater) → conversion lift on what's already the #1 brand goal.

All three are visible in the pitch deck. All three justify the rebuild on revenue grounds, not aesthetics.

Cross-cutting design lock:
- **Palette:** cream + charcoal dominant, monogram green / peperoncino / bergamot / Ionian as sparing accents
- **Type:** editorial serif + neutral sans, dialect labels as quiet texture
- **Imagery:** preserved hand-drawn illustration library + new editorial photography
- **Motion:** restrained
- **Spine:** regional-Italy map as navigational and storytelling backbone

Phase 1 complete. Synthesis writing to `research/00-synthesis.md`, then Phase 2.
