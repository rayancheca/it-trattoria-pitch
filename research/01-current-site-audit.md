# 01 — Current Site Forensics: IT — Italian Trattoria

**Audit date:** 2026-05-20
**Auditor role:** R1, Current Site Forensics
**Method:** Live HTTP fetches with realistic UA, raw HTML inspection, OG/JSON-LD parsing, plus AI-assisted content extraction on render-blocked surfaces.

---

## 0. Topology — what's actually live, and what's blocking us

IT — Italian Trattoria does not have one website. It has **at least three disconnected digital surfaces** stitched together with cross-links and different branding:

| Surface | Host | Role | Tech | Status |
|---|---|---|---|---|
| Global brand site | `it-trattoria.com` (apex) | French parent brand + global locator entrypoint | WordPress (assumed) | Cloudflare-challenged, returns HTTP 403 to all non-browser UAs incl. Googlebot |
| Global locator + content silo | `restaurants.it-trattoria.com` | Restaurant locator, per-location pages including Miami + NY | WordPress + Hello Elementor theme + Elementor Pro + SuperStoreFinder WP plugin; hosted on Kinsta | HTTP 200, fully crawlable |
| US-only marketing site | `pp.it-trattoria.com` | Self-contained US site with 3 locations and Uber Eats ordering | WordPress, custom theme `itus_v2`, ACF Page Builder, jQuery, Slick 1.8.1 from jsDelivr | HTTP 200, fully crawlable |
| "Order" path | `it-trattoria.com/order/italian-trattoria` | Stub or redirect on the challenged apex | Unknown — 403 to all probes; `order.it-trattoria.com` does not resolve (DNS=000) | Unverifiable |

**Implication for the pitch:** the user does not have a website problem — they have a *site sprawl* problem. There are three CMSes, three theme stacks, two Instagram brands (`it_france` vs. `it.trattoria.us`), and inconsistent location counts across surfaces. Any rebuild has to decide whether to consolidate or stay sprawled.

---

## 1. https://it-trattoria.com (homepage, apex)

**Status:** Cloudflare bot-managed challenge. Every direct-fetch attempt — including from `Mozilla` desktop UA strings and `Googlebot/2.1` — returned `HTTP 403` with a `cf-mitigated: challenge` header and a "Just a moment..." interstitial. WebFetch was redirected to the same. **Content could not be directly audited.** Inference must come from inbound links observed on `restaurants.it-trattoria.com` and `pp.it-trattoria.com`.

**Inferred page purpose:** Global brand landing for the IT chain (French parent, 70+ trattorias claimed worldwide), routing users into menu, story, franchising, jobs, and the locator subdomain.

**Inferred information architecture (from cross-linking):**
- `/menu/` — global menu page (linked from every location and locator page)
- `/our-story/` — founder/origin page
- `/franchising/` — "Become a franchisee" funnel
- `/jobs/` — careers
- Cross-linked sister TLD: `it-trattoria.fr` (the French brand site)

**Stack signals (inferred from sister sites):** WordPress + Elementor stack on the same theme family.

**SEO red flags:** Apex is behind a Cloudflare managed challenge that **also blocks Googlebot**. This is catastrophic if it has been in place for any meaningful period — it means the apex pages (Menu, Our Story, Franchising, Jobs) cannot be re-crawled, and any link equity gained by those pages is decaying. Either WAF rules are over-tight or this was a deliberate bot wall with no allowlist. Worth verifying with `gsc:index` or a fresh `site:it-trattoria.com` check on the strategy side.

---

## 2. https://restaurants.it-trattoria.com (global locator)

**Page purpose:** Branded restaurant locator entrypoint that points users to the right per-city page.

**Page title:** `Restaurant IT Trattoria`
**Meta description:** *(none — empty `<meta>` not present)*
**OG locale:** `fr_FR` *(on an English-facing site)*
**OG description:** `"Over 70 trattorias worldwide! Discover the ones near you… Find a restaurant"`

**Content structure (in order):**
1. Hero: `"Over 70 trattorias worldwide!"` / `"Discover the ones near you…"` / button `"Find a restaurant"` (links to `#ancre`)
2. Brand narrative block — Calabrian founders, "products straight from Italy", "momento vero"
3. SuperStoreFinder locator widget — currently rendering empty
4. Newsletter / Instagram block

**Conversion CTAs:** "Find a restaurant" anchor; "Voir nos restaurants" (French); "Voir le site internet" (French); social follow.

**Critical copy issues — *verbatim*:**

- **Empty locator state.** The locator widget displays `"0 of 0 restaurants"` with the SuperStoreFinder default placeholder content rendered live:
  - `"Placeholder store name"`
  - `"Placeholder address"`
  - `"Placeholder for address"`
  - `"Website placeholder."`
  - `"Email placeholder."`
  - `"Telephone placeholder."`
  - `"Fax placeholder."`
  - `"Description placeholder."`
  - `"Custom field 1 placeholder." … "Custom field 6 placeholder."`
  - `"Ext placeholder"`
  Total: **33 placeholder strings** baked into the rendered HTML. This is the SuperStoreFinder WP plugin's default scaffolding — the locator was either never seeded with restaurants, or its data was wiped and never restored.

- **Brief said "lorem ipsum on testimonials block."** I did not find any lorem ipsum. I did find the above **placeholder** strings (SuperStoreFinder defaults), which is functionally equivalent — the brief's intuition was right, the location was wrong.

- **Newsletter copy reads like broken machine translation:**
  > `"After the hour, it's no longer the hour. The newsletter isn't just around the corner!"`
  This is an English literal of the French idiom *"Passé l'heure, c'est plus l'heure"*. Reads as nonsense in English.

- **French strings on an English page:**
  - `"Aller au contenu"` (Skip to content)
  - `"Voir le site internet"` (See the website)
  - `"Voir nos restaurants"` (See our restaurants)
  - `"Envoyer"` (Send — newsletter button)

- **Instagram and Facebook footer links point to the *French* brand accounts:**
  - `https://www.instagram.com/it_france/?hl=fr`
  - `https://www.facebook.com/ITFrance/`
  On the US-facing pp.it-trattoria.com site, the same buttons point to `it.trattoria.us` instead — so US visitors to the locator are being shipped to the wrong country's social presence.

**Stack signals:**
- WordPress + `hello-elementor` theme
- Plugins: `elementor`, `elementor-pro`, `superstorefinder-wp` (the locator)
- Hosted on Kinsta (`x-kinsta-cache`, `ki-edge` headers)
- Google Fonts: Roboto, Roboto Slab loaded via Elementor's google-fonts shim

**Photography:** One hero image (`restaurant-trattoria-1-1024x939.png`) — a wide interior dining shot. No food close-ups on this page.

**Accessibility red flags:**
- Logo alt text is the generic `"Logo it trattoria"`
- Hero image alt is `"restaurant trattoria"` — descriptive but minimal

**SEO red flags:**
- No `<meta name="description">` on the locator root
- `og:locale = fr_FR` on an English page
- JSON-LD `inLanguage` = `fr-FR` despite `<html lang="en-US">` (verified on Miami page in §3)
- Schema graph contains only `WebPage`, `Organization`, `BreadcrumbList`, `WebSite`, `ImageObject` — **no `Restaurant` or `LocalBusiness` schema at all**

---

## 3. https://restaurants.it-trattoria.com/miami/

**Page purpose:** Discovery/landing for the Miami Beach Collins Avenue location.

**Page title:** `Discover our Italian restaurant in Miami Collins Avenue IT TRATTORIA, Pizza and Fresh Pasta`
**Meta description:** `"Italian Restaurant in Miami 🇮🇹 - Come Discover our PIZZAS, PASTAS, SALADS, ANTIPASTI, AND DESSERTS in a Calabrian Trattoria. Enjoy on-site, delivery, takeout, or Click&Collect a family-style and authentic cuisine."`
**OG locale:** `fr_FR` *(English page)*
**OG image:** `Mask-group.png` from 2021/03 uploads — generic, not photographic

**Content structure (in order):**
1. Header / nav
2. Hero with location name and tagline `"Treat yourself to a delicious escape to Italy"`
3. Address line: `"1656 Collins Avenue 33139 Miami Beach"` + Google Maps directions link
4. Three service cards: On-spot / Take away / Delivery
5. "Why they chose us!" section — **empty in DOM, no testimonial bodies rendered**
6. Instagram embed
7. Three narrative content blocks (Why IT Trattoria, Pasta, Pizza)
8. Newsletter signup
9. Footer

**Conversion CTAs:** Menu → `it-trattoria.com/menu/`; Delivery / Take away / Directions all rendered as buttons but with masked targets in the markup; Instagram follow.

**Copy issues:**
- **No phone number listed.** The only digits in the HTML are timestamps. For a counter-service restaurant where takeout calls are still real, this is missing.
- **French leak strings (verbatim):**
  - `"Aller au contenu"`
  - `"Envoyer"`
  - `"Nous suivre sur Instagram"`
  - `"Voir plus"`
- **"Why they chose us!" testimonials block is structurally present but contains no quotes, no names, no photos** — just empty Elementor wrappers. The brief said "lorem ipsum on testimonials" — actual state is *worse:* the block exists, is rendered, and is entirely empty.
- **Number-of-locations claim** on this page is inherited from the global locator ("70 trattorias worldwide"). No US count given.

**Stack:** WordPress, Hello Elementor, Elementor Pro. No Slick/Owl/Swiper detected. Google Fonts (Roboto family).

**Photography:** Recurring filenames betray a shared library — `trattoria-en-famille.jpg`, `livreur-repas-vespa-livraison-italien.jpg`, `restaurant-italie-a-emporter-en-famille.jpg`. File slugs are **French**. Imagery is lifestyle-ish (family dining, Vespa delivery scooter, takeaway) — feels stock-art-directed for a French parent brand rather than location-specific.

**Accessibility red flags:**
- **14 `<img>` tags, 9 with `alt=""`** — 64% of images have empty alt text.
- The 5 non-empty alts are French: `"livreur repas vespa livraison italien"`, `"restaurant italie à emporter en famille"`, `"trattoria en famille"`, `"Logo it trattoria"`, plus one English string. Screen-reader users on an English page would hear French descriptions.

**SEO red flags:**
- `og:locale = fr_FR` and JSON-LD `inLanguage = fr-FR` on a page with `<html lang="en-US">`
- No `Restaurant` / `FoodEstablishment` / `LocalBusiness` schema (verified — JSON-LD types: `WebPage`, `Organization`, `BreadcrumbList`, `WebSite`, `ImageObject`, `SearchAction`, `EntryPoint`, `ListItem`, `ReadAction`, `PropertyValueSpecification`)
- No phone, no `openingHours`, no `address` markup → location pages cannot earn rich results in Google
- OG image is `Mask-group.png` — a generic asset, not a photo of the restaurant

---

## 4. https://restaurants.it-trattoria.com/miami-beach-lincoln-rd/

**Page purpose:** Discovery/landing for the Miami Beach Lincoln Road location.

**Page title:** `Discover our Italian restaurant in Miami Lincoln RoadIT TRATTORIA, Pizza and Fresh Pasta`
**Note the missing space** between "Road" and "IT TRATTORIA" — visible in `<title>`, `og:title`, and JSON-LD `name`. This is a typo baked into the CMS, not a render artifact.

**Meta description:** Identical to Miami Collins page — `"Italian Restaurant in Miami 🇮🇹 - Come Discover our PIZZAS, PASTAS, SALADS, ANTIPASTI, AND DESSERTS in a Calabrian Trattoria. Enjoy on-site, delivery, takeout, or Click&Collect a family-style and authentic cuisine."` Same string. Duplicate descriptions across two distinct location pages — Google will treat one as a near-duplicate.

**Critical content bug — address swap:**
The narrative copy on this page correctly references Lincoln Road:
> `"Located in the heart of Miami, on the famous Lincoln Road, our…"`
> `"Why choose IT Trattoria for a culinary getaway on Miami Lincoln Road?"`

But **the structured address block, and the embedded Google Maps "Get directions" link, still resolve to the Collins Avenue location:**
> Map destination URL: `destination=1656+Collins+Avenue+33139+Miami+Beach`

The actual Lincoln Road address (per pp.it-trattoria.com) is `1014 Lincoln Rd, Miami Beach FL 33139`. A user on the Lincoln Road page who clicks "Directions" will be navigated to the **wrong restaurant** ~0.5 miles away. This is the single most damaging functional bug I found.

**Content structure:** Identical layout to Miami Collins page (hero, services, empty testimonials, Instagram, narrative, newsletter, footer).

**French leak strings:** Same set — `"Aller au contenu"`, `"Voir plus"`, `"Nous suivre sur Instagram"`, `"Envoyer"`.

**Testimonials:** Empty, same as Miami Collins.

**Stack / photography / a11y / SEO:** All inherited from the same WordPress template — same Elementor build, same French-slug image library, same missing Restaurant schema, same `fr_FR` OG locale.

---

## 5. https://restaurants.it-trattoria.com/new-york/

**Page purpose:** Discovery for the New York Times Square location.

**Page title:** `Discover our Italian restaurant in New York's Times Square IT TRATTORIA, Pizza and Fresh Pasta`
**Meta description — entirely in French:**
> `"Restaurant Italien à New York Time Square 🇮🇹 - Venez Découvrir nos PIZZAS, PÂTES, SALADES, ANTIPASTIS ET DESSERTS dans une Trattoria Calabraise. Déguster sur place, en livraison, à emporter ou en Click&Collect une cuisine familiale et authentique"`

This is the most flagrant single defect on the entire site: **the English-targeting New York landing page ships a French meta description to search engines and to social-card unfurls.** A New York user sharing the page on iMessage or X sees a French preview.

**OG locale:** `fr_FR`. Canonical URL slug is `/new-york-time-square/` — note "Time Square", not "Times Square" — typo present in the canonical.

**Address:** `530 7th Ave 10018 New York` — present, correct, matches pp.it-trattoria.com.

**French leak strings:** `"Aller au contenu"`, `"Voir plus"`, `"Nous suivre sur Instagram"`, `"Envoyer"`, plus `"Découvrir nos PIZZAS, PÂTES, SALADES, ANTIPASTIS"` bleeding from the meta description into rendered content.

**Number of NY locations:** Only **one** NY page exists. Probed slugs `/nyc/`, `/manhattan/`, `/upper-east-side/`, `/new-york-2/` all return 404. So `restaurants.it-trattoria.com` knows about 1 NYC location and 2 Miami locations = **3 US locations**. The brief says **4**. Either the 4th location is brand-new and not yet on either site, is on the Cloudflare-blocked apex `it-trattoria.com/locations` page that I cannot read, or the brief is stale. Worth verifying with the client in QUESTIONS.md.

**Testimonials:** Empty "Why they chose us!" block, same as Miami pages.

**Stack / a11y:** Same Elementor stack, same French-slug image library, same empty-alt pattern.

---

## 6. https://it-trattoria.com/order/italian-trattoria

**Status:** 403 (Cloudflare challenge). Unverifiable directly.

**Inferred behavior:** Likely either a redirect into Uber Eats (matching pp.it-trattoria.com's pattern) or an internal click-and-collect page on the French stack. `order.it-trattoria.com` does not resolve (DNS NXDOMAIN equivalent). The actual order destinations *that do load* are external Uber Eats store URLs:
- `ubereats.com/store/it-italian-trattoria/fr0bvkjvVcGZ4IgiIx8lKQ` (Collins)
- `ubereats.com/store/it-italian-trattoria-lincoln/sIWZavHJW4-APUMoVTA2Zg` (Lincoln Rd)
- `ubereats.com/store/it-italian-trattoria/vzKJ6UHaQvWdXKF8qEM5kw` (Times Square — has a `?srsltid=…` Google Shopping click param baked into the link, suggesting it was pasted from a search result)

So in practice, "order online" in the US = Uber Eats off-platform. The brand owns zero first-party order surface for US customers.

---

## 7. https://pp.it-trattoria.com (de facto US marketing site)

**Page purpose:** The actual US-facing marketing site. This is what a US visitor *should* be landing on. It is the cleanest and most coherent surface in the whole estate.

**Page title:** `IT Trattoria`
**Meta description:** ***none***
**OG tags:** ***none***
**JSON-LD:** ***none***

So while the surface is visually tighter, its SEO/social fundamentals are even thinner than the locator site — bare title, no description, no Open Graph, no schema. Sharing this URL on any social platform will produce a broken preview card.

**Content structure (in order):**
1. Top nav: `RESTAURANTS`, `FOOD`, `JOIN US`, plus `ORDER HERE` and `Find a restaurant` buttons
2. Hero slideshow: `"We are the italian trattoria"` / `"Slaying italian food since 2014"` / `ORDER HERE` CTA
3. Sliding text ruban: `"Homemade pizza ⸱ Fresh Pasta ⸱ Healthy Juices ⸱ Authentic Italian Food ⸱"` (repeats 3x)
4. `Find a restaurant` map block — Google Maps with 3 markers (Collins, Lincoln Rd, Times Square)
5. Two-column Slick carousel: `ALL YOU NEED IS LOVE AND PIZZA` / `ALL YOU NEED IS LOVE AND PASTA` — both with **identical body copy**: `"Fresh ingredients, sourced in Italy, prepared daily under your eyes. What more do you need?"`
6. `JOIN THE CREW` recruiting block → `/join-the-crew/`
7. Sliding text ruban (repeats)
8. Footer with nav, social, copyright

**Conversion CTAs:**
- `ORDER HERE` → Uber Eats (per-location)
- `ORDER NOW` (on each location card) → location-specific Uber Eats
- `APPLY` → `/join-the-crew/` (full form: Full Name, Shift Number, Email, Phone, City, "Why are you interested", Preferred Work Shift dropdown)

**Restaurants listed:** 3 (Collins Avenue, Lincoln Road, Time square — note "Time square" lowercase + missing "s"). With hours:
- Collins: `7/7 From 8am to 11pm`
- Lincoln Rd: `7/7 From 8am to 11pm`
- Time Square: `7/7 From 7am to 0am` — **literal "0am"** rendered, almost certainly a midnight/`00:00` formatting bug

**Copy issues:**
- No French strings detected. This site is cleanly localized.
- No lorem ipsum.
- Pizza and pasta blocks have **identical body copy** — lazy/duplicated.
- "Time square" used consistently instead of "Times Square" — both on the card and in the embedded map marker title (`"IT Time square - 530 7th Avenue"`). The actual brand most likely is "Times Square."
- "Slaying italian food since 2014" — informal, fun, but "italian" should be capitalized; the rest of the site capitalizes "Italian".

**Stack signals:**
- WordPress, custom theme `itus_v2`
- Plugin: `acf-page-builder` (Advanced Custom Fields page builder)
- jQuery + jQuery Migrate (legacy stack)
- `slick-carousel@1.8.1` loaded from `cdn.jsdelivr.net` — third-party CDN with **no Subresource Integrity hash** on the `<link>`/`<script>` tags (0 `integrity=` attributes in the page)
- Google Maps JS API (v=weekly), `AdvancedMarkerElement`

**SECURITY — material finding:**
A Google Maps JS API key is hard-coded into the page source:
```js
const api_gm_key = "AIza...[REDACTED]";
```
Client-side Maps keys are fine *if* they are HTTP-referrer-restricted and have a billing cap. Whether this one is properly scoped should be flagged to the client — an unrestricted key on a public WordPress page is an open invoice. (Do not, of course, attempt to use the key — that's not the job here. The finding is the exposure pattern itself.)

**Photography:** 5 `<img>` tags. Alt text is actually used here — `"IT Trattoria"`, `"Collins Avenue"`, `"Lincoln Road"`, `"Time square"`, `"It's about time !"` (1 empty alt). Better than the Elementor site. Imagery itself is small and could not be inspected at resolution — looks like location glamour shots used as map-card thumbnails.

**Accessibility red flags:**
- Only 1/5 images has empty alt — significantly better than the Elementor sites
- The sliding ruban (3x duplicated string) and the JOIN THE CREW headline cut weirdly across lines (`JOIN THE\nCREW`) — likely styled via a CSS rule that doesn't degrade well for screen readers

---

## 8. Cross-surface inconsistencies and brand fragmentation

These cross-cut every URL above and are the most expensive items to clean up in a rebuild:

**a. Brand identity is split in two**
| Surface | Instagram | Facebook | Tone |
|---|---|---|---|
| `restaurants.it-trattoria.com` (all location pages) | `it_france` (with `?hl=fr`) | `ITFrance` | French parent brand |
| `pp.it-trattoria.com` (US site) | `it.trattoria.us` | (not linked) | US sub-brand |
A US visitor following IG from the location page lands on the *French* brand's feed — content in French, France store hours, France promotions.

**b. Address truth lives in pp, not in the canonical SEO surface**
The Lincoln Rd page on `restaurants.it-trattoria.com` ships the wrong address (Collins Ave's `1656 Collins Avenue`) in its structured map link, while pp.it-trattoria.com correctly shows `1014 Lincoln Rd`. The site Google indexes is the one with the wrong address.

**c. Location count contradiction**
- Brief / `PITCH.md`: **4 US locations**
- `restaurants.it-trattoria.com`: 3 pages exist (Miami Collins, Miami Beach Lincoln Rd, NY Times Square)
- `pp.it-trattoria.com`: 3 markers on the map (same three)
- `it-trattoria.com` apex: cannot read, but global claim is "70 trattorias worldwide"
- **If the 4th location is real, it's on neither US-facing surface today.** Flag for the client.

**d. Locale stamping is wrong everywhere**
- `<html lang="en-US">` on all en pages
- `og:locale = fr_FR` on every page
- JSON-LD `inLanguage = fr-FR` on every page
- WordPress is configured for French as the primary site language; English content sits inside a French frame. This is also why so many strings leak through.

**e. "Order online" UX is unowned**
The only working order paths are Uber Eats deeplinks. There is no first-party online order UX, no menu integration, no cart, no email capture on order, no upsell. For a counter-service / fast-casual chain in 2026, this is below baseline.

**f. Search engines see two different sites for the same business**
- `restaurants.it-trattoria.com/miami/`, `/miami-beach-lincoln-rd/`, `/new-york/` — French-locale, no Restaurant schema, French OG, broken meta
- `pp.it-trattoria.com/` — no description, no schema at all
- The user has zero canonical NAP (name/address/phone) authority for Google Local, and the locations don't link back to a single hub.

---

## 9. Stack inventory (for the rebuild estimate)

| Layer | restaurants.it-trattoria.com | pp.it-trattoria.com |
|---|---|---|
| CMS | WordPress | WordPress |
| Hosting | Kinsta (CF in front) | Kinsta-style (CF in front; `x-powered-by: PHP/8.1.34`) |
| Theme | `hello-elementor` | `itus_v2` (custom) |
| Page builder | Elementor + Elementor Pro | ACF Page Builder |
| Locator | SuperStoreFinder WP plugin (default placeholders never replaced) | Custom Google Maps JS integration with hard-coded API key |
| JS libs | Elementor runtime, webpack runtime | jQuery, jQuery Migrate, Slick 1.8.1 (jsDelivr, no SRI) |
| Map | Google Maps via SSF | Google Maps JS API v=weekly, AdvancedMarkerElement |
| Order integration | None (links go to apex `/menu/`) | Uber Eats external deeplinks |
| Schema.org | WebPage / Organization / Breadcrumb (no Restaurant) | None |
| OG / Twitter cards | Present, locale=fr_FR | Absent |
| Robots/canonical | Canonical present, robots absent | Not verified |

---

## 10. Verification of the briefing's claims

The brief said two specific things I was asked to check:
- **"Lorem ipsum on the testimonials block":** *Partially wrong.* The "Why they chose us!" testimonials block exists on every location page and is **completely empty** — no quotes, no lorem, no nothing. The lorem-style noise that *does* exist lives on a different page: the locator at `restaurants.it-trattoria.com/`, where the **SuperStoreFinder plugin's "Placeholder store name / Placeholder address / Telephone placeholder / …"** defaults are rendering live (33 instances).
- **"French strings on what should be English pages":** *Confirmed.* On every English location page: `Aller au contenu`, `Voir plus`, `Nous suivre sur Instagram`, `Envoyer`. On the locator: also `Voir le site internet` and `Voir nos restaurants`. On the NY page meta description: entire description is in French. On image alt text: `livreur repas vespa livraison italien`, etc. On JSON-LD `inLanguage`: `fr-FR`. On OG locale: `fr_FR`. The leakage is structural, not cosmetic.

The strongest single defect the brief did *not* anticipate is the **address bug on the Lincoln Road page** (directions link goes to Collins Ave), and the **broken-MT newsletter line** ("After the hour, it's no longer the hour. The newsletter isn't just around the corner!").
