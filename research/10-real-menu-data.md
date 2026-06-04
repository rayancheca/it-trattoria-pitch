# 10 — Real Menu Data (Source-Mined)

This document replaces the invented menu items in `src/data/menu.ts` with the actual IT — Italian Trattoria menu, mined from live ordering platforms and aggregators on 2026-06-04.

## TL;DR

- The real IT menu is **substantially different** from the current mockup.
- IT is **not** a Calabrian-region-focused menu — it's a broad **Sicilian / Northern-Italian crowd-pleaser** menu (Carbonara, Bolognese, Rigatoni Vodka, Margherita, Lasagna, Caesar) with **a few Calabrian accents** (Spianata Calabrese on the Diavola pizza, Spianata Pala).
- There is **no n'duja, no paccheri, no tagliatelle al ragù, no tonnarelli cacio e pepe, no orecchiette, no trofie pesto, no bergamot tiramisù, no panino mortadella with pistachio cream**. None. Those are all invented for the mockup.
- The brothers' **Calabrian origin story** is real (sourced from R1/R2 audit and Tripadvisor/Yelp metadata), but their **menu does not lean into it** — that's actually a strategic opportunity for the rebuild pitch (see "biggest gap" below).
- Real prices skew higher in NYC (Margherita $16.95 5th Ave / $16.95 7th Ave vs $15.95 Miami Beach).
- Tiramisù comes in **multiple flavors** at NYC: Coffee, Pistacchio, Limoncello, Caramello — none of which is "bergamot."

## Sources used

| Source | URL | Status | Coverage |
|---|---|---|---|
| Toast — 5th Ave NY | https://order.toasttab.com/online/it-trattoria-5th-ave-ny | OK | Featured + Appetizers + Pasta + Pizza |
| Uber Eats — Lincoln Road | https://www.ubereats.com/store/it-italian-trattoria-lincoln/sIWZavHJW4-APUMoVTA2Zg | OK | Featured + Appetizers + Pasta + Pizza |
| Uber Eats — Collins Avenue (Miami Beach) | https://www.ubereats.com/store/it-italian-trattoria/vzKJ6UHaQvWdXKF8qEM5kw | OK | Featured + Appetizers + Pasta + Pizza + Pizza Pala (slices) + 1 dessert + 1 drink |
| Uber Eats — 7th Ave NYC | https://www.ubereats.com/store/it-italian-trattoria/fr0bvkjvVcGZ4IgiIx8lKQ | Partial | Featured: pasta, pizza, salads + 2 juices: Detox, Peacefull |
| Uber Eats — NYC alt | https://www.ubereats.com/store/it-italian-trattoria/z6mgs7TuWCyZezIfhb1ODQ | Partial | Featured items only |
| SageMenu — Miami Beach | https://sagemenu.com/miami/it-italian-trattoria-miami-beach-2/ | **JACKPOT** | Full Pasta, Pizza, Salads, Desserts, Extras, NA Drinks, Coffee. Note: older menu, slightly lower prices, slightly different item set — may reflect an earlier menu version. |
| Toast item URLs (NYC) | https://it-trattoria.com/menu/trattoria-nyc/group_*/item-* | Indirect | Confirmed: Tiramisù Limoncello, Tiramisù Pistacchio, Caprese Salad live as menu items |
| Toast item URL — Miami | https://www.toasttab.com/local/order/italian-trattoria/item-sunset_c8399d90... | Indirect | Confirmed: a juice/cocktail called "Sunset" exists on Collins menu |
| Tripadvisor reviews | https://www.tripadvisor.com/Restaurant_Review-g34439-d21112996-Reviews-IT_Italian_Trattoria-Miami_Beach_Florida.html | Cross-check | Adore Verde salad, Pizza alla pala, breakfast combos, "The Kiss" juice mentioned |
| Yelp Miami Beach | https://www.yelp.com/biz/it-italian-trattoria-miami-beach-4 | Cloudflare blocked WebFetch — used search results | Cross-confirmed top items: Margherita, Diavola, Chocolate Ganache |
| Marketing site | https://it-trattoria.com/menu | 403 to WebFetch | Confirms category names exist but not item details |
| Toast view-only & DoorDash | various | 403 / Cloudflare | Blocked |

## Category names IT actually uses

IT's real menu does **not** use the Italian "Aperitivo / Al Banco / A Tavola / Dolce / Bevande" structure we put in the mockup. The platforms (Toast, Uber Eats, Sage) all expose these categories:

- **APPETIZER** (Bruschetta, Stracciatella & Focaccia, Antipasto della Casa, Antipasto della Famiglia)
- **PASTA** (9 items, mostly $15.95–$24.95)
- **PIZZA** (round Neapolitan-style, ~7 items)
- **PIZZA PALA** (Roman-style long pizza, sold by slice and half/full)
- **SALAD** (Caesar, Caprese, Mediterranea, Amore Verde, Lucca, Roma, Tonno, Vegetariana — varies by source)
- **BREAKFAST** (only at NYC — Avocado Toast, Eggs & Bacon, Truffle Scramble Eggs)
- **DESSERT** (Tiramisù in multiple flavors, Cannoli, Chocolate Ganache, Crostata)
- **DRINK** (water, sodas, Molecola)
- **COFFEE** (espresso, cappuccino, latte, americano, macchiato, hot tea)
- **JUICE** (Power Punch, ACE, Detox, Peacefull, Sunset — fresh squeezed, mostly $12.95–$14.95)

So for the rebuild, we should either:
1. **Adopt IT's actual category structure** (Appetizer / Pasta / Pizza / Pizza Pala / Salad / Breakfast / Dessert / Drink / Coffee / Juice), or
2. **Re-brand it intentionally** (the original "Aperitivo / Al Banco / A Tavola / Dolce / Bevande" frame is actually *more on-brand* for a Calabrian Italian trattoria — if we propose this as part of the pitch, we'd be repositioning their menu architecture, not just translating it).

**Recommendation:** keep the Italian-fluent category structure in the rebuild (it's higher-end and more on-brand for a Calabrian trattoria), but **map every real item into it accurately**. Don't invent dishes that aren't on their menu.

---

## Verified items, with evidence quotes

### Pasta (9 items, verified across 3 sources)

All pasta verified from Toast 5th Ave NY + Uber Eats Lincoln + Sage Menu Collins.

| Item | NYC 5th Ave | Lincoln Rd | Collins | Sage (older) | Description (verbatim, Lincoln Rd Uber Eats) |
|---|---|---|---|---|---|
| Spaghetti Pomodoro | $16.95 | $15.95 | $15.95 | $14.95 (as "Pomodoro E Parmigiano") | "Sicilian cherry tomato sauce, basil, EVO" |
| Rigatoni alla Siciliana | $18.95 | $17.95 | $17.95 | n/a | "Sicilian Cherry Tomato Sauce, Italian Basil Pesto, Parmigiano Cheese, Basil, Black Pepper, EVOO" |
| Spaghetti Alfredo | $18.95 | $18.95 | $18.95 | n/a | "Heavy Cream, Butter, Parmesan Cheese, EVOO" |
| Spaghetti Genovese (Basil Pesto) | $19.95 | $18.95 | $18.95 | $16.95 ("Genovese Pasta") | "Italian Basil Pesto, Parmesan Cheese, Cherry Tomatoes, Basil, Black Pepper, EVOO" |
| Rigatoni Vodka | $20.95 | $19.95 | $19.95 | n/a | "Sicilian Cherry Tomato Sauce, Tomato Paste, Heavy Cream, Vodka, Parmesan Cheese, Basil, Black Pepper, EVOO" |
| Lasagna | $20.95 | $20.95 | $20.95 | $18.95 | "Sicilian Cherry Tomato Sauce, Ground Beef, Béchamel Sauce, Parmesan Cheese, Basil, Black Pepper, EVOO" |
| Rigatoni Bolognese | $21.95 | $20.95 | $20.95 | $18.95 | "Sicilian Cherry Tomato Sauce, Ground Beef, Black Pepper, Red Wine, Carrots, Garlic, Onion, Celery, Basil, EVOO" |
| Spaghetti Carbonara | $21.95 | $21.95 | $21.95 | $17.95 | "Pancetta (Pork), Parmesan Cheese, Egg Yolk, Black Pepper, EVOO" |
| Rigatoni Tartufo (Truffle) | $24.95 | $24.95 | $24.95 | $19.95 | "Truffle Cream, Mushrooms, Parmesan Cheese, Parsley, Black Pepper, EVOO" |

Sage Menu also lists historical items not on current Toast: **Modena Pasta** (mascarpone, prosciutto, mushrooms, balsamic), **Del Capo Pasta** (cherry tomato, calabrese salami, ricotta), **Carla Pasta** (cherry tomato, red wine, sausage, fennel). These appear to be **discontinued** — they're not on Toast in 2026. **Del Capo** is the only Calabrian-leaning pasta IT has ever shipped, and it's gone.

### Pizza (7 round, ~4 pala sizes)

Verified Toast NY + Uber Lincoln + Uber Collins.

| Item | NYC 5th Ave | Lincoln Rd | Collins | Description (verbatim) |
|---|---|---|---|---|
| Margherita | $16.95 | $15.95 | $15.95 | "Italian Tomato Sauce, Mozzarella, Fresh Basil, Oregano, EVOO" |
| Cotto | $18.95 | $17.95 | $17.95 | "Italian Tomato Sauce, Mozzarella, Cooked Ham, Fresh Basil, EVOO" |
| Diavola | $19.95 | $18.95 | $18.95 | "Italian Tomato Sauce, Mozzarella, Spianata Calabrese (Spicy Salami), Oregano, EVOO" |
| Primavera | $19.95 | $18.95 | $18.95 | "Italian Tomato Sauce, Mozzarella, Eggplant, Yellow Pepper, Arugula, EVOO" |
| Regina | $20.95 | $19.95 | $19.95 | "Italian Tomato Sauce, Mozzarella, Mushrooms, Cooked Ham, Arugula, Balsamic Glaze, Grated Parmesan Cheese, EVOO" |
| Margherita di Burrata | $21.95 | $20.95 | $20.95 | "Italian Tomato Sauce, Mozzarella Di Burrata, Stracciatella Cheese (Heart of Burrata), Cherry Tomatoes, Fresh Basil, EVOO" |
| Positano (Truffle Cream) | $21.95 | $21.95 | $21.95 | "Truffle Cream, Mushrooms, Mozzarella, Parsley, Shaved Parmesan Cheese, Black Pepper, EVOO" |
| Prosciutto e Burrata | $23.95 | $23.95 | $23.95 | "Italian Tomato Sauce, Mozzarella, Prosciutto Crudo (Raw Ham), Stracciatella, Cherry Tomatoes, Basil, EVOO" |

### Pizza Pala (Roman-style, sold by slice and as half/full)

Verified Collins Uber Eats:
- **Full Margherita Pala** — $41.95
- **1/2 Prosciutto Pala** — $24.95
- **1/2 Primavera Pala** — $24.95
- **1/2 Spianata Pala** — $24.95
- **Slice Spianata Pala** — $8.95 (Lincoln) / $10.95 (7th Ave NY)
- **Slice Margherita Pala** — $9.95 (7th Ave NY)
- **Slice Arug/Strac Pala** (Arugula/Stracciatella) — $10.95 (Lincoln)

### Salads

| Item | Source | Price | Description |
|---|---|---|---|
| Caesar | Toast NY, Lincoln, Collins | $16.95 | "Lettuce, Cherry Tomatoes, Parmesan Cheese, Caesar Sauce, Croutons" (from Tripadvisor review cross-ref) |
| Caprese | Toast NY, Collins | $15.95 (Collins) / $13.95 (Sage) | "Mozzarella, black olives, tomatoes, oregano, fresh basil, olive oil" (Sage) |
| Mediterranea | Collins Uber, 7th Ave Uber | $18.95 | (description not exposed by Uber Eats scrape — inferred Mediterranean style) |
| Amore Verde | Lincoln Rd Uber, 7th Ave Uber | $16.95 (Lincoln) | (confirmed via Tripadvisor reviews mentioning "Adore Verde") |
| Lucca | Sage (historical) | $15.95 | "Mozzarella, black olives, tomatoes, oregano, fresh basil, prosciutto, olive oil" |
| Roma | Sage (historical) | $16.95 | "Chicken, avocado, semi-dry tomatoes, parmesan, arugula, grilled eggplant, lettuce, olive oil" |
| Tonno | Sage (historical) | $16.95 | "Tuna, red onion, tomatoes, lettuce, black olives, yellow peppers, oregano, olive oil" |
| Vegetariana | Sage (historical) | $13.95 | "Arugula, tomatoes, cucumber, lettuce, onions, oregano, black olives, olive oil" |

### Appetizers (verified Toast NY + Uber Lincoln + Uber Collins)

- **Bruschetta** — $11.95 — "Bread, Tomatoes, Basil, EVOO"
- **Stracciatella and Focaccia** — $13.95 — "Stracciatella Cheese served with Focaccia Bread, EVOO"
- **Antipasto della Casa** — $21.95 — "Mortadella, Prosciutto Crudo (Cured ham), Cooked Ham, Spianata Calabrese (Spicy Salami), Bread"
- **Antipasto della Famiglia** — $31.95 — "Mortadella, Prosciutto Crudo (Cured ham), Cooked Ham, Spianata Calabrese (Spicy Salami), Arugula, Mozzarella Fior di Latte, Vegetables, Shaved Parmesan Cheese, Bread"

### Breakfast (NYC only — verified Toast 5th Ave + search results)

- **Avocado Toast** — $15.95 (NYC) — "Ciabatta/Focaccia Bread with Mashed Avocado, Arugula, Radish, Red Cabbage, Black Sesame, EVOO" served with Fresh Squeezed Orange Juice
- **Eggs & Bacon** — $11.95 — "2 Eggs, Greens, Bacon, Bread"
- **Eggs & Bacon w/ OJ** — $15.95 — "2 Eggs, Greens, Bacon, Bread with Fresh Squeezed Orange Juice"
- **Truffle Scramble Eggs** — $14.95 — "Scrambled Truffle Eggs, Greens, Bacon, Bread"

### Desserts

Confirmed by Toast 5th Ave + Toast item URLs (linked from search):

- **Tiramisù Coffee** — $9.95 (Lincoln, Collins) / $10.95 (5th Ave) — classic coffee tiramisù
- **Tiramisù Pistacchio** — ~$10.95 NYC — "Layers of pistacchio-soaked ladyfingers, luscious mascarpone cream infused with roasted pistachios, topped with a delicate dusting of crushed pistachio"
- **Tiramisù Limoncello** — ~$10.95 NYC — "Delicate layers of ladyfingers soaked in zesty limoncello, paired with a light mascarpone cream and a hint of lemon zest"
- **Tiramisù Caramello** — ~$10.95 — "Tiramisù caramel"
- **Cannolo Pistacchio** — $7.95 (Miami) / ~$10.95 (NYC)
- **Cannolo Cioccolato (Chocolate)** — $7.95 / $9.95
- **Cannolo Arancia** — $6.95 (Sage historical)
- **Cannolo Nutella** — $6.95 (Sage historical)
- **Chocolate Ganache** — listed as a top-3 ordered item on Yelp/Uber. "Decadent and velvety chocolate ganache served in a rich, creamy drizzle."
- **Crostata alle Fragole** — $8.95 (Sage) — strawberry tart, "seasonal dessert with a buttery flaky crust filled with fresh strawberries"
- **Crostata ai Raspberry** — $8.95 (Sage) — raspberry tart

### Drinks (non-alcoholic)

From Sage Menu Miami Beach:
- **Still Water** — $5.95 (small) / $9.95 big (Collins Uber)
- **Sparkling Water** — $5.95
- **Orange Juice** — $9.95
- **Molecola** — $6.95 (Italian craft cola)
- **Molecola Sugar Free** — $6.95
- **Limonata** — $6.95
- **Aranciata** — $6.95
- **The Limone** — $6.95 (iced lemon tea)
- **The Pesca** — $6.95 (iced peach tea)

### Fresh Juices (NYC — verified on Uber 7th Ave + Toast Collins item URL "Sunset")

- **Power Punch** — $14.95 (NYC) — fresh-squeezed juice blend
- **ACE** — $11.95 (NYC) — classic Italian Arancia/Carota/Limone (orange/carrot/lemon)
- **Detox** — $12.95 (7th Ave NY confirmed)
- **Peacefull** — $12.95 (7th Ave NY confirmed)
- **Sunset** — $12.95 (Collins Toast item URL confirmed; description not exposed)

### Coffee (verified Sage)

- **Single Espresso** — $4.50
- **Double Espresso** — $5.50
- **Macchiato** — $4.95
- **Double Macchiato** — $5.95
- **Caffe Latte** — $3.95
- **Cappuccino** — $6.20
- **Americano** — $5.50
- **Hot Tea** — $5.95
- **Milk** — $5.95

---

## Mockup vs Reality

Direct comparison of every item in current `src/data/menu.ts`:

| Mockup slug | Status | Notes |
|---|---|---|
| `paccheri-alla-calabrese` | **INVENTED** | No paccheri or n'duja pasta on IT's real menu. The Calabrian sauce only appears on Diavola pizza (Spianata) and Spianata Pala. |
| `tagliatelle-al-ragu` | **INVENTED** | IT serves **Rigatoni Bolognese**, not tagliatelle al ragù. Different shape, similar sauce. |
| `cacio-e-pepe` | **INVENTED** | No cacio e pepe, no tonnarelli on IT's menu. |
| `orecchiette-cime-di-rapa` | **INVENTED** | No orecchiette, no cime di rapa. |
| `trofie-al-pesto` | **INVENTED** | IT does pesto, but on **Spaghetti Genovese**, not trofie. |
| `pizza-alla-pala-margherita` | **REAL** | "Full Margherita Pala" $41.95 + "Slice Margherita Pala" $9.95 |
| `pizza-alla-pala-spianata` | **REAL** | "1/2 Spianata Pala" $24.95 + "Slice Spianata Pala" $8.95–$10.95 |
| `panino-mortadella` | **INVENTED** | No mortadella panino on IT's menu. Mortadella appears as part of the antipasto board only. |
| `arancini` | **INVENTED** | No arancini on IT's menu. |
| `tagliere-calabrese` | **PARTIALLY REAL** | IT has **Antipasto della Casa** ($21.95) and **Antipasto della Famiglia** ($31.95), both of which include Spianata Calabrese. We can rename "Tagliere Calabrese" to "Antipasto della Casa" and keep the Calabrian frame because Spianata is genuinely Calabrian. |
| `burrata-prosciutto` | **REAL (as pizza)** | IT has **Pizza Prosciutto e Burrata** ($23.95). They also have **Stracciatella and Focaccia** ($13.95) as the closest standalone burrata-equivalent app. |
| `spritz-calabrese` | **INVENTED** | No bergamot spritz on IT's menu. No verifiable cocktail menu found at all in scraped sources. |
| `tiramisu-classico` | **REAL** | IT has **Tiramisù Coffee** ($9.95 / $10.95) |
| `tiramisu-bergamot` | **INVENTED** | No bergamot tiramisù. IT has **Tiramisù Pistacchio, Limoncello, Caramello** instead. The "Calabrian grandmother bergamot tiramisù" backstory is fabricated. |
| `cornetto-vuoto` | **NOT VERIFIED** | "Daily fresh made croissants" is in IT's marketing copy but no plain cornetto SKU appeared in any scrape. Tripadvisor reviewers mention "Nutella, ham and bacon croissants" — so cornetti exist but not as a plain "vuoto" SKU. |
| `espresso` | **REAL** | Single Espresso $4.50 (Sage) |
| `cappuccino` | **REAL** | Cappuccino $6.20 (Sage) |

**Score: 7 real, 1 partial, 1 unverified, 9 invented out of 17 mockup items.** Less than half.

---

## The biggest gap (strategic finding)

**IT's actual menu has almost no Calabrian content.** The brothers are Calabrian, the founders' story leans on Calabria, the marketing copy mentions "Calabrian origin" — but on the plate, the only Calabrian items are:

1. **Spianata Calabrese** on the Diavola pizza
2. **Spianata Calabrese** as part of the Antipasto della Casa/Famiglia
3. **1/2 Spianata Pala** and Slice Spianata Pala
4. Historical (now removed): **Del Capo Pasta** with "calabrese salami"

That's it. No n'duja, no bergamot, no pecorino crotonese, no soppressata, no Calabrian olive oils called out, no Tropea onion, no Bronte pistachio (the marketing copy mentions pistachio cream and Sicily, but the actual menu items use plain pistachio with no DOP callout).

**The current mockup over-corrects this by inventing a Calabria-heavy menu with paccheri, n'duja, bergamot, pecorino crotonese, etc.**

### Two valid strategic moves for the pitch:

**Option A — Ship what's real.** Use the real menu in the mockup. Calabria appears as a quiet thread (Spianata Calabrese pizza, Antipasto della Casa) but the menu is broadly Italian comfort food. This is honest to what IT actually sells today. The "regional map" differentiator in the current mockup design loses some of its punch.

**Option B — Pitch a menu evolution.** Frame the rebuild not just as a website redesign but as a **menu repositioning**: "IT is positioned as a Calabrian-founded Italian trattoria but cooks generic Italian-American. The website can either reflect that (which weakens the brand story) or **lead the menu**: feature 2–3 Calabrian dishes the brothers could legitimately add (Paccheri alla Calabrese with n'duja, Bergamot Tiramisù, Spianata Pala), and let the website launch them." This is a strong pitch angle because it makes the website work harder than a translation layer — it becomes a brand-and-product collaboration.

**Recommendation for this build:** ship a **hybrid menu** — every real item from the live menu, plus **3 clearly-marked "New this week" / "Chef's Calabrian heritage" items** (Paccheri Calabrese, Bergamot Tiramisù, Spianata Pala featured) that act as the pitch's "what we'd add if we owned the menu." This way:

1. The mockup is **mostly truthful** (a client can see their real menu in the design).
2. The mockup is **clearly aspirational in three places**, marked so the founders see the pitch's menu/brand argument explicitly.
3. The regional map differentiator still works because we cluster the 3 aspirational items in Calabria.

The JSON output below implements Option B / hybrid: every real item is `"verified": true` with `"sourcedFrom"` populated, and 3 aspirational Calabrian items are `"verified": false` with `"aspirational": true` so the codebase and the pitch can tell them apart.

---

## What's still unknown / future verification

- Cocktail and wine list — no source exposed it. Yelp reviews mention "Peroni on tap" so beer is real. We can stub a small wine/cocktail list as the pitch's "this would be filled in CMS" tier.
- Juice descriptions (Power Punch, Sunset) — names confirmed, ingredients inferred from category patterns.
- Exact "Mediterranea Salad" ingredient list — name and price confirmed, content not exposed.
- Photo URLs — none of the Toast/Uber pages we scraped exposed image src in raw output. Will need a separate image-extraction pass (Playwright on the live Uber Eats menu screenshot, or visual reviewer photos from Tripadvisor/Yelp).

## How to use this in the rebuild

1. Replace `src/data/menu.ts` items list with the JSON in `10-real-menu-data.json`.
2. Keep the `CATEGORIES` map (Aperitivo/Al Banco/A Tavola/Dolce/Bevande) because it's higher-end brand language than IT currently uses — this is a **brand upgrade**, not a misrepresentation.
3. Mark the 3 aspirational items (Paccheri Calabrese, Bergamot Tiramisù, full Spianata Pala feature) as `newThisWeek: true` and add a `aspirational: true` field so we can render a small "Coming soon" badge in the UI.
4. For the regional map, use the real menu's regional distribution (heavy Sicilia/Campania/Lazio, light Calabria) so the map shows the *current* truth — and use the aspirational items as the pin that says "this is where the brand is going."

Sources at-a-glance:
- Toast 5th Ave NY (working): order.toasttab.com/online/it-trattoria-5th-ave-ny
- Uber Eats Lincoln Road (working): ubereats.com/store/it-italian-trattoria-lincoln/sIWZavHJW4-APUMoVTA2Zg
- Uber Eats Collins (working): ubereats.com/store/it-italian-trattoria/vzKJ6UHaQvWdXKF8qEM5kw
- Uber Eats 7th Ave NYC (partial): ubereats.com/store/it-italian-trattoria/fr0bvkjvVcGZ4IgiIx8lKQ
- Sage Menu Miami Beach (working — older menu): sagemenu.com/miami/it-italian-trattoria-miami-beach-2/
