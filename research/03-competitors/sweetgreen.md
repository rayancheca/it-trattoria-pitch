# Sweetgreen — Tear-down (gold standard)

**URL:** https://www.sweetgreen.com
**Format:** Salad-led fast-casual, ~250 US locations. The category-defining UX benchmark for counter-service.

## Brand identity
Custom geometric sans-serif, lowercase. Palette is white + a single bright sweetgreen accent + warm earth tones in photography. Voice is health-conscious, sourcing-forward, community-coded — "antibiotic-free," "organic," "locally-made," "inspiring healthier communities." Photography is consistent overhead bowls on solid color tiles — instantly recognizable in any feed.

## Homepage architecture
Above the fold: hero carousel featuring a signature item (e.g., Classic Chicken Caesar wrap), with an expansion or recruitment overlay and an "Order now" CTA. Below: product carousel (Salads / Warm Bowls / Sides) → workplace solutions (Catering, Outpost, Credits) → "In the lab" behind-the-scenes content → newsletter → footer. Primary CTA is "Order now," persistent in header.

## Menu UX
Categories: Wraps / Protein Plates / Bowls / Salads / Kids / Sides / Dessert / Drinks. Every item has consistent photography, dietary tags (V vegan, G gluten-free), online-only badges, full macro breakdowns (calories, protein, carbs, fat), and **carbon footprint data (KG CO2E)** — sourcing turned into a UI element. "Get it →" buttons route directly to deep-linkable item pages on order.sweetgreen.com. "Create your own bowl" customizer extends functionality.

## Locations UX
Single "Locations" link in nav. Map + list. Picking a location personalizes the menu (item availability varies). Outpost (workplace pickup) is a separate flow.

## Ordering flow
order.sweetgreen.com + native app — separate transactional surface from the brand site, but visually continuous. Loyalty and credits tightly integrated.

## One thing worth stealing
**Sourcing as a UI element.** Carbon footprint on every item, ingredient lists with sourcing notes, "in the lab" content treating food R&D as public process. IT can do this with Italian provenance — name the flour mill, the tomato region, the cheese producer, on every relevant item card. This is the highest-leverage differentiator for a brand selling "real Italian" against generic fast-casual.

## One thing to avoid
**Carousel-heavy homepage.** Sweetgreen's hero rotates and the homepage stacks multiple carousels. Auto-rotation hurts dwell time and accessibility, and the LCP cost is real. IT should pick a single hero, not a rotator, and use IntersectionObserver-driven reveals instead.
