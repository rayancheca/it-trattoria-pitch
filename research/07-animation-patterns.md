# 07 — Animation Patterns & Buildbook

A focused study of 12 contemporary, animation-rich restaurant/food/hospitality sites and the specific motion moves IT — Italian Trattoria should adopt to feel warm, alive, and Calabrian-rooted without pretending to be sit-down upscale.

Methodology note: live JS-driven sites (Carbone, Lilia, Misi, Tatte, Sweetgreen, Eataly, godofnoodles.kr) do not surface their full motion behavior via static fetch. Profiles below combine direct fetch observations with documented design-press reviews (Awwwards, It's Nice That, COLLINS case study, Fictive Kin, Whitespark) and verifiable framework patterns from Motion.dev's official docs. References to specific scroll mechanics are tied to publicly documented implementations.

---

## God of Noodles — https://godofnoodles.kr
**The animation move:** A single noodle-strand SVG path draws itself across the viewport on scroll, tying disconnected sections (story, ingredients, locations) into one continuous visual thread. Sections pin briefly as the strand passes through, then release.
**Why it works:** Turns scrolling into the act of pulling a noodle — the metaphor *is* the navigation.
**How to implement in IT (Next.js + Framer Motion):** Use `useScroll({ target: pageRef })` at the page level, then drive an SVG `pathLength` via `useTransform(scrollYProgress, [0, 1], [0, 1])`. Substitute the noodle for a hand-drawn olive branch or a single strand of bucatini that threads from hero → story → menu → locations.

---

## Carbone NYC — https://carbonenewyork.com
**The animation move:** Restrained, hospitality-grade motion: full-bleed photography crossfades, a sticky brass-toned nav that subtly contracts on scroll, and reservation CTAs that lift on hover with a soft warm shadow rather than a color swap.
**Why it works:** Confidence through restraint — the site doesn't try harder than the room does. Motion is a butler, not a host.
**How to implement in IT (Next.js + Framer Motion):** `<motion.header animate={{ height: scrolled ? 56 : 88 }} transition={{ ease: [0.16, 1, 0.3, 1] }} />`. Button hover: `whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(120, 40, 20, 0.18)" }}`. Borrow the *discipline*, not the upscale register.

---

## Lilia NYC — https://www.lilianewyork.com
**The animation move:** Hero gallery slideshow with manual pause/play control, sectional photography that fades up on enter, and a near-total absence of decorative motion. The pacing is the design.
**Why it works:** Makes the food and the room do the talking — appropriate for Missy Robbins' "simple ingredients, soulful cooking" thesis.
**How to implement in IT (Next.js + Framer Motion):** Sparingly. Use `whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 24 }} viewport={{ once: true, margin: "-15%" }}` on every section header. Resist the urge to animate everything — pick the 3 moments that matter.

---

## Misi (Williamsburg) — https://www.misinewyork.com
**The animation move:** Hero photography that holds long enough to register, then quietly transitions; navigation overlay with a slow ease and a single-color hover tint on menu items.
**Why it works:** Confident silence. The pasta is doing 90% of the lifting.
**How to implement in IT (Next.js + Framer Motion):** Overlay nav using `<motion.div initial={{ y: "-100%" }} animate={{ y: isOpen ? 0 : "-100%" }} transition={{ duration: 0.7, ease: [0.83, 0, 0.17, 1] }} />`. Stagger menu links with `staggerChildren: 0.06`.

---

## Tatte Bakery — https://tattebakery.com
**The animation move:** Logo crossfade between light and dark variants tied to scroll position over light/dark sections, plus sticky-nav-on-static-photography hero, and warm-tone cards that scale up gently on hover.
**Why it works:** Reads as "neighborhood bakery, made with care" without being twee. Counter-service warmth without the cheese.
**How to implement in IT (Next.js + Framer Motion):** Use `IntersectionObserver` on dark/light section markers to toggle a CSS variable `--logo-color`. Card hover: `whileHover={{ scale: 1.02, rotate: -0.5 }}` — the tiny rotation is the warmth tell.

---

## Sweetgreen — https://www.sweetgreen.com
**The animation move:** Per the COLLINS rebrand case study: oversized produce illustrations that crossfade with real photography, ingredient name marquees, and SweetSans kinetic headlines that scale on scroll. Hero carousels pace at ~5s with content-first cuts.
**Why it works:** Translates "scratch cooking" into visible craft. The illustration ↔ photo handoff says "real ingredients" louder than any sourcing paragraph.
**How to implement in IT (Next.js + Framer Motion):** Build a `<CrossfadeStack>` component with two `motion.img` siblings and a parent `useScroll` driving cross-opacity. For IT: hand-drawn Calabrian peppers, bergamot, 'nduja jars crossfading with real product photography on the menu page.

---

## Eataly — https://www.eataly.com
**The animation move:** Italian-flag-colored category cards with subtle parallax on hover (image shifts ~6px, label stays still), sticky filter bar on category pages, multiple horizontal product carousels with snap behavior.
**Why it works:** Italian flagship signal through color discipline + the editorial rhythm of a market.
**How to implement in IT (Next.js + Framer Motion):** Card hover: `whileHover` on the inner `<motion.img animate={{ y: -6, scale: 1.04 }} />` while the label stays fixed. CSS `scroll-snap-type: x mandatory` on category strips.

---

## Tony's Pizza Napoletana — https://www.tonyspizzanapoletana.com
**The animation move:** Tomato-red and dough-white palette discipline, hero pizza photography with a slow ambient zoom (`scale: 1.0 → 1.05` over ~12s), and timeline-style "since 2009" award reveals on scroll.
**Why it works:** Counter-service-honest. The pizza *is* the hero — motion exists to make the photograph breathe, not to compete with it.
**How to implement in IT (Next.js + Framer Motion):** Ken-Burns hero: `<motion.img animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} />`. Awards/press strip: horizontal marquee that pauses on hover (`animationPlayState`).

---

## Fabbrica (Awwwards Honorable Mention, Food & Drink) — https://www.awwwards.com/sites/fabbrica
**The animation move:** Per Awwwards listing: GSAP + Locomotive Scroll powering a vertical-then-horizontal layout where the page scrolls down through story, then locks and scrolls horizontally through menu/about/team before releasing back to vertical. Photography reveals via clip-path masks.
**Why it works:** Editorial-magazine pacing inside a restaurant context. Feels like turning the pages of a Calabrian cookbook.
**How to implement in IT (Next.js + Framer Motion):** Sticky horizontal section pattern — wrap a `flex` row inside a `position: sticky` element inside a tall `300vh` container, then `useTransform(scrollYProgress, [0, 1], ["0%", "-66%"])` on the row's `x`. Use for the "Our Calabria" story section.

---

## Amrit Palace (Awwwards inspiration) — https://www.awwwards.com/inspiration/restaurant-menu-scroll-amrit-palace
**The animation move:** A sticky menu visual on the left half pinned while categories scroll on the right; as each category enters the viewport, the visual swaps with a clip-path wipe.
**Why it works:** Lets users browse menu sections without losing the food's face. Solves the "menu as PDF" problem with motion.
**How to implement in IT (Next.js + Framer Motion):** Two-column layout, left side `position: sticky; top: 0; height: 100vh`. Right side has menu sections with `whileInView` callbacks that update a parent `activeCategory` state. Left-side image: `<AnimatePresence mode="wait">` with `clip-path` enter/exit.

---

## The Cult Japanese Restaurant (Awwwards Honorable Mention) — https://www.awwwards.com/sites/the-cult-japanese-restaurant
**The animation move:** Page-load reveal where the logo expands from center, splits into the nav letters, and the hero image is unmasked via a horizontal `clip-path: inset()` wipe — all within ~1.6s.
**Why it works:** Establishes a brand ceremony. The site has a *beginning*.
**How to implement in IT (Next.js + Framer Motion):** A one-shot `<HeroIntro>` overlay that runs only on first visit (sessionStorage gate). Sequence with `useAnimate` and `animate()` calls in order: logo scale → letter split (stagger) → mask wipe on hero.

---

## YETI (referenced for marquee craft) — https://www.awwwards.com/inspiration/minimal-overlay-menu-with-text-marquee
**The animation move:** Full-screen overlay menu where the active item's name scrolls as a giant marquee behind the link list. Hover changes the marquee word.
**Why it works:** Turns the nav itself into a typographic moment. Memorable, premium, alive.
**How to implement in IT (Next.js + Framer Motion):** In the mobile/overlay nav, render a `<Marquee>` (CSS `@keyframes` translateX -50% on a duplicated track) of the *currently-hovered* link text. Words: "PASTA · 'NDUJA · BERGAMOTTO · CALABRIA". On hover, swap the marquee word with a crossfade.

---

# The 10 moves we adopt for IT — ranked by impact

Ranking is by how much each move advances IT's specific brand register: **warm, Italian, Calabrian-rooted, counter-service-honest, alive**.

### 1. Pinned-horizontal "Our Calabria" story section — *ref: Fabbrica*
The story of where the food comes from is the highest-leverage emotional moment on the site. Pin it.
```tsx
// Pseudocode
const ref = useRef(null)
const { scrollYProgress } = useScroll({ target: ref })
const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66%"])
return (
  <section ref={ref} style={{ height: "300vh" }}>
    <div className="sticky top-0 h-screen overflow-hidden">
      <motion.div className="flex gap-[10vw]" style={{ x }}>
        <Panel title="Reggio" img="..." />
        <Panel title="Bergamotto" img="..." />
        <Panel title="'Nduja" img="..." />
        <Panel title="Miami Beach" img="..." />
      </motion.div>
    </div>
  </section>
)
```

### 2. Sticky-menu-visual category browse — *ref: Amrit Palace*
Fixes the "menu is a PDF" problem and keeps food on screen at all times.
```tsx
// Left: sticky image. Right: scrolling categories driving an activeId.
const [active, setActive] = useState("pasta")
<div className="grid grid-cols-2">
  <div className="sticky top-0 h-screen">
    <AnimatePresence mode="wait">
      <motion.img key={active}
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0% 0 0)" }}
        exit={{ clipPath: "inset(0 0 0 100%)" }}
        transition={{ duration: 0.6, ease: [0.83, 0, 0.17, 1] }} />
    </AnimatePresence>
  </div>
  <div>{categories.map(c =>
    <motion.section key={c.id}
      onViewportEnter={() => setActive(c.id)}
      viewport={{ margin: "-40% 0px -40% 0px" }}>
      {c.items.map(...)}
    </motion.section>)}</div>
</div>
```

### 3. Calabrian-thread SVG draw on scroll — *ref: God of Noodles*
A single hand-drawn line — olive branch, bergamot rind, or strand of spaghetti — draws from the hero all the way to the locations footer.
```tsx
const { scrollYProgress } = useScroll()
const pathLength = useTransform(scrollYProgress, [0.05, 0.95], [0, 1])
<svg className="fixed inset-0 pointer-events-none">
  <motion.path d="M 80 0 C ..." stroke="var(--color-bergamot)"
    strokeWidth={2} fill="none" style={{ pathLength }} />
</svg>
```

### 4. Illustration ↔ photograph crossfade on menu items — *ref: Sweetgreen / COLLINS*
Hand-drawn Calabrian peppers, bergamot, 'nduja jars crossfade with real product photography. Sells craft + sourcing in a single beat.
```tsx
const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
const photoOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1])
const drawOpacity  = useTransform(scrollYProgress, [0.2, 0.5], [1, 0])
<div ref={ref} className="relative">
  <motion.img src="/draw/nduja.svg" style={{ opacity: drawOpacity }} />
  <motion.img src="/photo/nduja.jpg" style={{ opacity: photoOpacity }} className="absolute inset-0" />
</div>
```

### 5. Ingredient marquee strip — *ref: YETI, Sweetgreen*
A slow horizontal marquee of Calabrian ingredient words between sections. Anchors the brand vocabulary.
```tsx
<div className="overflow-hidden border-y border-warm-clay">
  <motion.div className="flex gap-12 whitespace-nowrap py-4"
    animate={{ x: ["0%", "-50%"] }}
    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}>
    {[...words, ...words].map((w, i) =>
      <span key={i} className="font-display text-3xl">{w} ·</span>)}
  </motion.div>
</div>
```
Words: `BERGAMOTTO · 'NDUJA · CIPOLLA DI TROPEA · PEPERONCINO · CALABRIA · MIAMI BEACH · NEW YORK`.

### 6. Section-label stagger reveal — *ref: Lilia, Misi*
Every section title splits into words and reveals with a 60ms stagger. The single most-repeated motion on the site.
```tsx
<motion.h2 initial="hidden" whileInView="visible"
  viewport={{ once: true, margin: "-20%" }}
  transition={{ staggerChildren: 0.06 }}>
  {"Made in Calabria".split(" ").map(w =>
    <motion.span key={w} className="inline-block mr-[0.25em]"
      variants={{ hidden: { y: "110%", opacity: 0 },
                  visible: { y: 0, opacity: 1,
                    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }}>
      {w}</motion.span>)}
</motion.h2>
```

### 7. Hero ambient Ken-Burns + first-visit reveal — *ref: Tony's Pizza, The Cult*
Hero photo breathes via a slow `scale 1 → 1.05` loop. On first visit only, a clip-path wipe unmasks the hero after the logo settles.
```tsx
<motion.img animate={{ scale: [1, 1.05, 1] }}
  transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }} />
// First-visit overlay gated by sessionStorage
```

### 8. Contracting brass-tone sticky nav — *ref: Carbone*
Nav contracts from 88px → 56px and gains a warm-shadow on scroll. Logo + reservation button always visible.
```tsx
const { scrollY } = useScroll()
const height = useTransform(scrollY, [0, 120], [88, 56])
const shadow = useTransform(scrollY, [0, 120],
  ["0 0 0 rgba(0,0,0,0)", "0 8px 28px rgba(80, 30, 20, 0.12)"])
<motion.header style={{ height, boxShadow: shadow }} className="fixed top-0 inset-x-0 z-50" />
```

### 9. Bento-grid editorial home — *ref: Awwwards bento collection, Eataly*
Below-the-fold home becomes a bento of: hero dish, story snippet, location card, "from Calabria" video, press, hours. Each cell has its own hover micro-motion (image parallax inside label-stays-still).
```tsx
<div className="grid grid-cols-12 auto-rows-[8rem] gap-3">
  <BentoCell className="col-span-6 row-span-3">{/* hero dish */}</BentoCell>
  <BentoCell className="col-span-3 row-span-2">{/* story */}</BentoCell>
  <BentoCell className="col-span-3 row-span-4">{/* video loop */}</BentoCell>
  {/* etc */}
</div>
// Inside each cell, image whileHover={{ y: -6, scale: 1.04 }}, label stays put.
```

### 10. Overlay menu with single-word marquee echo — *ref: YETI*
Mobile/full-screen nav opens with a slide-down. Behind the link list, a giant marquee echoes the currently hovered/focused link as a typographic word ("PASTA", "STORIA", "TROVA NOI"). Memorable nav moment.
```tsx
<AnimatePresence>
  {open && <motion.div initial={{ y: "-100%" }} animate={{ y: 0 }} exit={{ y: "-100%" }}
    transition={{ duration: 0.7, ease: [0.83, 0, 0.17, 1] }}>
    <MarqueeEcho word={hovered} />
    <ul>{links.map((l, i) =>
      <motion.li key={l.href}
        onHoverStart={() => setHovered(l.label)}
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 + i * 0.06 }}>{l.label}</motion.li>)}</ul>
  </motion.div>}
</AnimatePresence>
```

---

## Cross-cutting motion rules (apply to all 10 moves)

- **Easing default**: `[0.16, 1, 0.3, 1]` (expo out) for entrances, `[0.83, 0, 0.17, 1]` (expo in-out) for overlays and big transitions. Avoid `easeIn` on entrances — feels lethargic.
- **Duration ladder**: 200ms (micro), 400ms (component), 700ms (section), 1200ms+ (one-shot ceremony).
- **Reduced motion**: Wrap every meaningful animation in `useReducedMotion()` and degrade to opacity-only. Non-negotiable.
- **Compositor-only**: `transform`, `opacity`, `clip-path`, `filter` only — never `width/height/top/left` (per web/performance rules).
- **Once vs repeat**: All `whileInView` reveals use `viewport={{ once: true }}` except the marquee and ambient Ken-Burns.
- **Don't animate everything**: Carbone/Lilia restraint > maximalism. Pick the 10 moves above and stop.

---

# Modern Restaurant-Site SEO 2026

A focused playbook for IT — Italian Trattoria's two locations (Miami Beach, NYC). Layer this on top of the motion buildbook; it pays for itself in foot traffic.

**Local Pack signals that actually move the needle.** Per Whitespark's 2026 Local Search Ranking Factors, for restaurants the weights look like: proximity ~30%, Google Business Profile primary category ~22%, reviews (velocity + count + response rate) ~14%, citation NAP consistency across 50+ directories ~10%, on-site signals ~8%, the rest behavioral. **Action**: each location gets its own GBP with primary category set to the most specific match ("Calabrian restaurant" if available, else "Italian restaurant"); never "Restaurant" alone — too broad. Respond to ≥80% of reviews (correlated with a measurable ranking lift). Keep NAP byte-identical across Yelp, TripAdvisor, OpenTable, Resy, Apple Maps, Bing Places, Eater, Infatuation.

**Schema fields that matter most.** Use `Restaurant` (not `LocalBusiness`) — it inherits all LocalBusiness props and adds restaurant-specific ones. Each *location page* (not the homepage) gets its own complete block with: `@type: Restaurant`, `name`, `address` (PostalAddress), `geo` (GeoCoordinates), `telephone`, `url`, `image` (3+), `priceRange`, `servesCuisine: ["Italian", "Calabrian", "Southern Italian"]`, `hasMenu` (URL to the menu page or a structured Menu with MenuSection → MenuItem → suitableForDiet + Offer.price), `acceptsReservations: true`, `openingHoursSpecification` (per-day with valid from/through for holidays), `aggregateRating` if real, and `sameAs` linking GBP, Instagram, Resy. Menu schema is the single biggest under-used lever — when an AI Overview answers "Calabrian restaurants in Miami Beach with 'nduja", restaurants without `hasMenu` + `MenuItem` don't surface. Use a `FAQPage` block on the locations page for hours/parking/dietary questions.

**Internal linking + image SEO.** Every dish detail links to the relevant location pages and the cuisine story page; locations link to dishes and to the regional ingredient story (the "Bergamotto from Reggio" page becomes a topical-authority hub). Use `next/image` with explicit width/height (no CLS), AVIF + WebP fallbacks, `loading="eager"` + `fetchpriority="high"` on the hero only, descriptive filenames (`nduja-bruschetta-miami-beach.avif`), and real alt text — not "image of food". Compress to <120kb for hero, <60kb for grid.

**Core Web Vitals targets.** LCP <2.5s, INP <200ms, CLS <0.1, FCP <1.5s. Hero LCP is the killer — preload exactly one image and one font weight. Defer Resy/OpenTable widgets until interaction (lazy iframe). Animation moves above are all compositor-only, so they don't threaten INP.

**AI/SGE + AI Overview optimization.** Per Google's own *Guide to Optimizing for Generative AI Features* (developers.google.com/search/docs/fundamentals/ai-optimization-guide): the same E-E-A-T fundamentals apply. To get cited in AI Overviews for queries like *"best Calabrian restaurant in Miami Beach"* or *"where to eat 'nduja in NYC"*: (1) publish 3+ unique data points the AI can quote — owner provenance, sourcing chain (which Calabrian producer, which DOP), specific dishes only IT serves; pages with 3+ unique data points are ~4× more likely to be cited. (2) Pair menu schema with plain-text dish descriptions that mention region + ingredient + dietary status in the same sentence ("'nduja crostini, vegetarian-optional, made with peperoncino from Diamante"). (3) Build a `/storia` page with original photography, dated content, named author (chef/owner), and external citations. (4) Optimize for zero-click: assume users see the answer in the Overview — make sure the *one* sentence Google quotes is the one that drives a reservation click.

**Top 3 highest-leverage SEO moves to ship in v1:**
1. **Restaurant + Menu + MenuItem schema** on each location page with full dietary + price + cuisine props.
2. **Per-location pages** (not one combined page) with unique copy, GBP-aligned NAP, FAQ schema, and embedded map.
3. **One "Our Calabria" topical-authority hub** with original photography, named author, dated, and internal links from every dish + location page.
