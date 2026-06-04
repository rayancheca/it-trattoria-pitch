# IT Italian Trattoria — Ordering Flow Forensic Audit

Audit performed against live surfaces on 2026-06-04.

Sources probed:
- `https://it-trattoria.com/` (homepage — Cloudflare Turnstile challenge blocks bots)
- `https://it-trattoria.com/order` and `/order/italian-trattoria` (Toast location picker, captured via Wayback snapshot `20251010120239`)
- `https://restaurants.it-trattoria.com/` (WordPress store-locator, plugin `superstorefinder-wp`)
- Per-location pages: `/miami/`, `/miami-beach-lincoln-rd/`, `/new-york-time-square/`
- `https://pp.it-trattoria.com/` (the in-progress US site; theme `itus_v2`, child of WP `twentytwentyone`)
- `https://it-trattoria.fr/` (parent FR brand site)
- Toast Sites-Web API: `https://ws-api.toasttab.com/sites-web/v1/map?shortUrl=italian-trattoria&...` (full Apollo state)
- Uber Eats: 3 storefronts (Collins, Lincoln, 7th Ave)

---

## 1. Locations — the live truth

The Toast `sites-web` API (the chain's own backend) returns **4 US locations**, but only **3 are surfaced publicly anywhere**. The 4th (390 5th Ave NY) exists in Toast but is NOT in the public location picker, NOT in `restaurants.it-trattoria.com`, and NOT in `pp.it-trattoria.com`. R1's "3 live" finding is correct for the customer-visible site; the brief's "4 locations" matches Toast's backend.

| # | Name in Toast | Address | City, State, ZIP | Phone | Toast `shortUrl` | Online Ordering URL | Public picker? | Uber Eats? |
|---|---|---|---|---|---|---|---|---|
| 1 | IT Italian Trattoria Collins | 1656 Collins Avenue | Miami Beach, FL 33139 | 305-397-8244 | `italian-trattoria` | **null** | Yes | Yes (`vzKJ6UHaQvWdXKF8qEM5kw`) |
| 2 | IT Italian Trattoria Lincoln | 1014 Lincoln Rd | Miami Beach, FL 33139 | 305-488-5080 | `trattoria-lincoln-road-2-1014-lincoln-rd` | **null** | Yes | Yes (`sIWZavHJW4-APUMoVTA2Zg`) |
| 3 | IT Italian Trattoria 7th Ave | 530 7th Avenue | New York, NY 10018 | 646-828-8399 | `trattoria-nyc` | **null** | Yes | Yes (`fr0bvkjvVcGZ4IgiIx8lKQ`) |
| 4 | IT Italian Trattoria 5th Ave | 390 5th Ave | Manhattan, NY 10018 | (646) 452-0400 | `it-trattoria-5th-ave-ny` | **null** | **NO** | No |

The `orderPathPattern` embed on `/order` (`...&guids=020368f1...&guids=2fe4edfe...&guids=6a2c8f2b...`) lists only three GUIDs. The 5th Ave GUID `45649a07-0834-4d82-94a7-126c11a69778` is omitted, so even a customer who knows the store exists cannot find it through the chain's own ordering surface.

Hours (from Toast Apollo state) are essentially **24/7 with overnight close**:
- Collins / Lincoln: 07:00 to 03:59 next-day, all days.
- 7th Ave: 06:00 to 03:45 next-day, all days.
- 5th Ave: 06:00 to 03:45 next-day, all days.

But the `pp` site advertises different shorter ranges per location ("8am–11pm", "7am–0am"), so the operating hours surfaced to customers are **inconsistent with what's actually plumbed into Toast**.

---

## 2. Platform stack — what actually powers ordering

- **Online ordering platform: Toast** (location picker + view-only menu only). The `/order` page is a server-side React app served by Toast Sites-Web (`ws-api.toasttab.com/sites-web/v1/map`). The page title is literally `"IT-ITALIAN TRATTORIA | Find a location"`.
- **The Toast online-ordering layer is NOT enabled.** Every location returns `"onlineOrderingUrl": null` and `"ecommMenuChannelGuid": null`. Only `viewOnlyMenuChannelGuid` is set — Toast is being used as a glorified PDF menu host, not a transactional ordering platform.
- **Actual transactional ordering: Uber Eats**, surfaced from `pp.it-trattoria.com`. The new in-progress site embeds 3 Uber Eats deep links as the "ORDER HERE" / "ORDER NOW" CTAs:
  - Collins: `https://www.ubereats.com/store/it-italian-trattoria/vzKJ6UHaQvWdXKF8qEM5kw`
  - Lincoln: `https://www.ubereats.com/store/it-italian-trattoria-lincoln/sIWZavHJW4-APUMoVTA2Zg`
  - 7th Ave: `https://www.ubereats.com/store/it-italian-trattoria/fr0bvkjvVcGZ4IgiIx8lKQ`
- **WordPress + Elementor + Super Store Finder** powers `restaurants.it-trattoria.com`. The store data is fetched from `wp-content/plugins/superstorefinder-wp/ssf-wp-xml.php` and only has 3 stores in the XML. Location records are missing telephone, email, operatingHours, description, website (all empty strings).
- **Cloudflare Turnstile** blocks `it-trattoria.com` from any non-browser fetch (`HTTP 403` for Googlebot, curl, WebFetch). This is hostile to indexing and to LLM citation.

---

## 3. Surface-by-surface order CTA audit

### `pp.it-trattoria.com` (the in-progress new site)
- Sticky mobile-only top nav: `<li class="order"><a href=""><span>Order</span></a></li>` — **`href` is empty**. The primary mobile order CTA goes nowhere.
- Hero CTA: `<a class="primary-btn big top-slideshow-cta desktop-only" href="https://www.ubereats.com/store/it-italian-trattoria/vzKJ6UHaQvWdXKF8qEM5kw?srsltid=...">ORDER HERE</a>` — hard-coded to the **Collins** Uber Eats store. New York customers land on the wrong city.
- Location cards (`Find a restaurant` section):
  - Collins card: `<a class="primary-btn light" href="#">ORDER NOW</a>` — **dead link** (just `#`).
  - Lincoln card: real Uber Eats link.
  - 7th Ave card: real Uber Eats link.
- No 5th Ave card at all.
- Anchor `#link_order_pasta` and `#link_order_pizza` appear in code but resolve nowhere visible — looks like placeholder scaffolding never wired up.

### `restaurants.it-trattoria.com/<location>/` pages
- **No order CTA anywhere**, on any of the 3 location pages.
- No phone number, no hours, no allergens, no menu link beyond a generic "Menu" in the global nav pointing at `it-trattoria.com/menu/` (which is Cloudflare-walled).
- **Bug:** the Lincoln Rd page renders the wrong address — `"1656 Collins Avenue 33139 Miami Beach"` — instead of `1014 Lincoln Rd`. The Hero copy says "Lincoln Road" but the address block is Collins.
- French strings leak into the English site: `"Aller au contenu"` (Skip to content), `"Nous suivre sur Instagram"` (Follow us on Instagram), Instagram link `?hl=fr` (French locale forced), Facebook link `/ITFrance/`.
- Marketing copy ends with the surreal `"After the hour, it's no longer the hour. The newsletter isn't just around the corner!"` — auto-translated from the French idiom *"Passé l'heure, c'est plus l'heure"*. This appears on every location page.

### `it-trattoria.com/order` (the Toast location picker)
- Page title: `"IT-ITALIAN TRATTORIA | Find a location"`.
- Top banner copy: `"IT- ITALIAN TRATTORIA - Online ordering now available with Toast!"` — but the underlying ordering is NOT enabled (see §2).
- Two tabs: `"Delivery"` and `"Pickup"`. Default dining option is `TAKE_OUT`.
- Search bar placeholder + empty state: `"Search to find your closest pickup location."` / `"Find your closest location"` / `"Enter an address in the searchbar above, or click here to browse all locations alphabetically."` Three independent micro-copy variants of the same idea on one screen.
- Clicking a location routes to `/order/<shortUrl>` which iframes Toast — and Toast hosts only a view-only menu (no cart, no checkout) because online ordering is null.

### `it-trattoria.fr` (parent brand)
- Hero CTA: `<a class="primary-btn video-banner-cta delivery" href="#">Commander maintenant</a>` — also a dead link. The French parent has the same broken "Order Now" pattern.

---

## 4. Menu, cart, checkout (only available via Uber Eats today)

Per the live Uber Eats stores:
- Categories: **Featured, Appetizer, Pasta, Pizza, Salad, Pizza Pala, Dessert, Breakfast, Drink, Coffee, Juice** (consistent across Collins, Lincoln, 7th Ave — same menu, no per-store curation).
- **No item photos** in the listing view (text + price only).
- **No modifier groups** exposed in the menu listing (no size, no add-ons, no "extra cheese" options surfaced).
- **No allergen tags, no dietary tags (vegetarian, vegan, gluten-free) anywhere** on any IT surface.
- Sample pricing seen: Margherita $15.95–$16.95, Lasagna $20.95, Carbonara $21.95, Alfredo $18.95, Rigatoni Tartufo $24.95, Cannolo Pistacchio $7.95, Bruschetta $11.95. Range $7.95–$41.95.
- Cart, checkout, tip, payment, delivery-vs-pickup toggle, and ETA are **entirely Uber's UX**. IT collects no first-party order data, no customer email, no order history.
- 7th Ave NY currently shows `"Delivery unavailable"` when geolocation is not Manhattan.

---

## 5. Click count to complete an order today

From `pp.it-trattoria.com`:
1. Land on `pp.it-trattoria.com`.
2. Click `ORDER HERE` (hero) → kicked to **Uber Eats Collins** regardless of intent.
3. If wrong city, scroll back, click `Find a restaurant`, find correct card, click that card's `ORDER NOW`.
4. Uber Eats loads (cold start, ~3–5s).
5. Uber asks for delivery address.
6. Browse Uber's menu.
7. Click item → Uber modal → Add to cart.
8. Open cart on Uber.
9. Sign in to Uber account.
10. Confirm payment / tip / address / checkout.

**Minimum 8–10 screens, with a forced platform handoff and account creation midway.** From the parent `it-trattoria.com`, the "Order" link routes to Toast's view-only menu — a complete dead end for actually purchasing food.

---

## 6. The most damaging UX problems

1. **The flagship "Order" buttons go to dead `href="#"` placeholders.** Sticky mobile-nav Order, Collins card Order, FR `Commander maintenant` — all literally do nothing. Production site.
2. **The wrong address is displayed for the Lincoln Rd location** (Collins Ave address renders on the Lincoln Rd location page). Anyone reading that page is misdirected to a different store.
3. **Toast is configured as view-only with no checkout** (`onlineOrderingUrl: null` on all 4 locations). The `/order/` page actively claims `"Online ordering now available with Toast!"` — a marketing promise the system does not keep.
4. **Customers who want Manhattan (390 5th Ave) cannot order from it at all.** The location exists in Toast (with phone 646-452-0400) but is absent from every public picker and not on Uber Eats.
5. **Zero allergen, vegetarian, vegan, or gluten-free tagging anywhere.** For a restaurant serving pasta/pizza with cross-contamination implications, this is both a UX failure and a real liability.
6. **French copy contaminates the English US site.** "Aller au contenu", "Nous suivre sur Instagram", `?hl=fr`, FB/ITFrance, plus auto-translated idioms ("After the hour, it's no longer the hour…") destroy trust.
7. **No first-party order data ever reaches IT.** Every transaction is routed through Uber, so the brand owns no customer email list, no repeat-purchase telemetry, no marketing surface, and pays ~30% commission per order.
8. **Hours shown to customers contradict hours configured in Toast** — pp site shows "8am–11pm" but Toast schedule is overnight (07:00–03:59).
9. **The Collins "ORDER HERE" hero button is hard-coded to one store** regardless of which city the user is in.
10. **Cloudflare Turnstile blocks `it-trattoria.com` from indexing and from agentic/LLM citation** (HTTP 403 for any non-browser, including Googlebot UA). The main domain is invisible to a growing share of inbound traffic.

---

## 7. What our rebuild must demolish

1. **First-party order flow with cart + checkout owned by IT** — no Uber handoff, no platform middleman. Card processing via Stripe/Adyen, IT keeps the customer data, the email, the repeat order history.
2. **Auto-locate the nearest store** on landing (or remember a previous selection) so the "Order" button is never wrong-city. Tie city detection to a single global "where am I ordering from?" piece of state that lives in the URL.
3. **Per-item rich menu cards with photos, allergens (V, VG, GF, contains nuts/dairy), and modifier groups** rendered as part of the design system — not as Toast/Uber default rows.
4. **One CTA, one URL pattern, every surface live.** No `href=""`, no `href="#"`. The order CTA in mobile sticky nav, hero, every location card, every footer — one component, one route, identical behavior. Address bug-fix mandatory (Lincoln must show Lincoln).
5. **All 4 US locations surfaced equally with accurate addresses, phones, hours from a single source of truth** (the Toast Apollo state we already have). Include 390 5th Ave NY. Hours displayed must match hours that gate ordering — no overnight-vs-11pm mismatch.

Bonus targets the rebuild should meet:
- Ship the site fully indexable (no Turnstile interstitial on `/`, `/menu`, `/order` paths).
- English-only US site; FR strings, FR Instagram, FR locale parameters scrubbed.
- Sub-5-click pickup checkout (location → menu → item → cart → pay). Three-click for repeat customers via saved payment.
- Allergen / dietary filters on the menu list view, not just on item modals.
