# IT — Ordering UX Buildbook

> Source-derived, opinionated patterns from the best counter-service ordering flows on the internet, translated into specific decisions for IT — Italian Trattoria. Online ordering is the centerpiece of the rebuild; every pattern below is judged on one metric: does it convert a hungry, distracted, mobile-first customer in under 90 seconds.

---

## 1. Sweetgreen — the gold standard for counter-service

**Location selection.** First-visit modal blocks the menu until a store is picked. Geolocation prompt with a "Use current location" primary CTA and a manual ZIP/address fallback below. Once chosen, the location sits in a top-bar pill ("Pickup at SoHo — 0.3 mi") that doubles as the "change location" tap target. Selection is sticky across sessions via cookie.

**Menu browse.** Visual-first grid with category anchors in a sticky horizontal scroller along the top. Scroll-spy highlights the active category as you scroll the menu. Photos are large, square, and the same crop ratio — discipline matters.

**Item detail / modifier UX.** Full-screen takeover on mobile, side-panel on desktop. The salad/bowl builder shows ingredients in vertical sections (Base → Greens → Protein → Toppings → Dressing), with **portion stepper (½ / 1 / 2)** per ingredient. Price and calorie ticker updates **live** at the bottom as you build. Premium ingredients are flagged with a "+$X" badge inline, not buried.

**Add-to-cart feedback.** Bottom-anchored sticky "Add to Bag — $14.50" button. On tap, button morphs into a checkmark for ~600ms, then the cart drawer slides in from the right.

**Cart UX.** Right-edge drawer. Line items show a thumbnail, customizations as collapsible text, qty stepper, and a "Customize" link that re-opens the builder pre-filled.

**Checkout.** Single scrollable page: pickup time → contact → payment → tip → review. Apple Pay and Google Pay surface at the top — most users never see the card form. Guest checkout default; account creation is a single "Save my info for next time" checkbox at the bottom.

**Pickup time.** ASAP is selected by default with a live ETA pill ("Ready in 8–12 min"). "Schedule for later" reveals a horizontal day chip + vertical 15-min time slot picker.

**Order confirmation.** Persistent status card with a horizontal stepper (Received → Making → Ready) and the store address with one-tap directions. SMS notifies when ready.

**Steal:** the live calorie + price ticker at the bottom of the builder. For IT, swap calories for "serves 1 / serves 2" and ingredient origin badges (DOP, Lazio, etc.).

---

## 2. CAVA — the bowl-builder paradigm

**Location selection.** Modal first, then sticky. CAVA shows store wait-time inline with the location ("Ready in 10 min at Penn Quarter") — sets expectations before the user invests in building.

**Menu browse.** Two-tier: top tabs (Signatures / Build Your Own / Sides / Drinks). Signatures are tappable shortcuts that drop you into the builder pre-filled — fastest path for repeat customers.

**Item detail / modifier UX.** True **step-by-step builder** with a horizontal progress indicator at the top (Base → Mains → Toppings → Dressings → Toppings → Review). One screen per step on mobile. "Skip" available on every optional step. Counter shows "3 of 4 toppings selected (free)" so users know when they hit upcharge territory.

**Add-to-cart feedback.** Confetti-light animation on the cart icon + qty badge bump. No toast — the badge animation is the feedback.

**Cart UX.** Persistent across navigation (the documented failure mode is cart data loss — IT must beat this by persisting cart to localStorage on every mutation).

**Checkout.** Linear single page. Default tip pre-selected at 15%.

**Pickup time.** ASAP default with live ETA. Scheduled picker is a single time slot grid.

**Order confirmation.** Status card lives in the app shell; you can keep browsing without losing it.

**Steal:** the step-by-step builder with progress indicator. For IT's pasta builder (shape → sauce → add-ons), this is the right paradigm. Five seconds of clarity beats a wall of checkboxes.

---

## 3. Joe's Pizza NYC — counter heritage brand

**Location selection.** Minimal — one or two locations means a single "Pick a shop" screen, no geolocation drama.

**Menu browse.** Single long scrolling menu. Categories as sticky section headers. No images for some items — the brand is the photography.

**Item detail.** Inline expand for simple items (slice, drink) — no modal needed. Whole pies open in a modifier modal.

**Add-to-cart feedback.** Cart count badge with subtle scale bump.

**Cart UX.** Right drawer.

**Checkout.** Toast-powered single-page checkout. Apple Pay top, guest by default.

**Pickup time.** ASAP plus a 15-min increment scheduler.

**Steal:** the **inline expand** for trivially simple items. For IT, a single antipasto or a glass of wine should never require a modal — tap, add, done. Reserve modals for pasta and pizza builds.

---

## 4. &pizza (via Thanx) — opinionated counter-service

**Location selection.** Map-first picker with location cards. Each card shows distance + wait time.

**Menu browse.** Heavy use of editorial copy in section headers. Signatures + Build-Your-Own coexist.

**Item detail / modifier UX.** Pizza builder as a **stacked checkbox list** with sections (Sauces, Cheese, Veggies, Meats, Finishes). Visual chip selection — tap to add, tap again to remove. Per-section "Add all" trolling.

**Add-to-cart feedback.** Slide-up confirmation banner with "View Cart" CTA.

**Cart UX.** Full-page cart on mobile, drawer on desktop.

**Checkout.** Thanx-powered loyalty integration — points balance and earn preview surface during checkout. This drives repeat behavior.

**Pickup time.** ASAP + schedule.

**Steal:** the **points preview at checkout** ("This order earns you 35 points → free side at 100"). For IT, surface the loyalty math at the cart, not buried in an account page.

---

## 5. Shake Shack — order tracking as theater

**Location selection.** Modal with map + list view toggle.

**Menu browse.** Card grid, category tabs across the top, sticky on scroll.

**Item detail / modifier UX.** Bottom sheet on mobile (slides up from bottom, dismissable by swipe down). Required modifiers gated — "Continue" is disabled until satisfied.

**Add-to-cart feedback.** Cart badge bumps, bottom-sheet auto-dismisses, brief inline success state ("Added — Single SmokeShack").

**Cart UX.** Persistent bottom bar on mobile ("3 items — $24.50 — View Bag") that acts as the cart entry point. No drawer until tapped — keeps menu real estate.

**Checkout.** Multi-step but with a visible progress indicator. Apple Pay surfaces first.

**Pickup time.** ASAP with ETA, plus scheduled.

**Order confirmation.** This is the gold pattern. Confirmation screen shows: order number large, ETA countdown, horizontal status stepper (Received → Cooking → Ready), pickup address with one-tap directions, and an in-app "I'm here" button that pings the kitchen on arrival. SMS for ready.

**Steal:** the **persistent bottom cart bar on mobile** and the **"I'm here" arrival ping**. Both are conversion gold.

---

## 6. Tatte — counter-service with design

Tatte's order flow is Toast-powered. The interesting move is the **brand handoff**: the marketing site is editorial and warm; the moment you hit "Order," Toast takes over — but Tatte styles the Toast frame with their own typography and colors so the seam is invisible. IT must do the same if it uses Toast or similar — your ordering page should not look like a different website.

**Steal:** seamless brand continuity from marketing site → order surface. No "ordering powered by..." aesthetic.

---

## 7. Domino's — the OG efficiency machine

**Location selection.** Address first, then delivery vs. carryout. Saved addresses surface immediately on return visits — one tap to a previous order.

**Menu browse.** Category-driven, image-heavy, "Recent orders" pinned to the top for returning users.

**Item detail / modifier UX.** Pizza builder is a half/half visualizer — you literally see your pizza render as you add toppings. This is the highest-fidelity feedback in the industry.

**Cart UX.** Sidebar with running total.

**Checkout.** Single page, saved payment defaulted, one-tap reorder.

**Pickup time.** ASAP + scheduled.

**Order confirmation.** The famous **Pizza Tracker** — five-stage horizontal stepper with the employee's name at each stage. Pure theater, but it converts anxiety into entertainment.

**Steal:** **one-tap reorder of last order** on the home screen. For IT regulars, "Order your usual" should be one tap from the order home.

---

## Cross-cutting patterns from 2026 research

- Mobile is **75%+ of orders** — design mobile-first, period.
- Floating "Order Now" CTA that follows scroll lifts orders **~25%**.
- Every extra click between landing and checkout costs **up to 20%** conversion.
- Surface fees and ETA **before** checkout — hidden fees are the #1 abandonment driver.
- HTML menus only — never PDFs. Photos on top sellers. Dietary icons inline.
- Apple Pay / Google Pay **above** the card form, not below.

---

## The IT ordering experience — 12 named decisions

Ranked by conversion impact.

1. **Persistent bottom cart bar on mobile** ("3 items — €28.50 — View Bag") visible across every screen of the order flow — ref: **Shake Shack**. Highest single mobile conversion lever.
2. **Apple Pay / Google Pay surfaced above the card form** on checkout, with guest checkout as the default — ref: **Sweetgreen**.
3. **Step-by-step pasta builder** (Shape → Sauce → Add-ons → Review) with a horizontal progress indicator, one section per screen on mobile — ref: **CAVA**.
4. **One-tap "Order your usual"** card pinned to the top of the order home for returning customers — ref: **Domino's**.
5. **Live price + portion ticker** at the bottom of every builder, with DOP/region badges replacing CAVA's calorie count — ref: **Sweetgreen**.
6. **ASAP default with live ETA pill** ("Ready in 12–15 min") shown on the location pill itself, before the user invests in building — ref: **CAVA**.
7. **Location picker as one-screen modal on first visit**, then a top-bar pill that doubles as the "change location" target. Geolocation primary, ZIP fallback — ref: **Sweetgreen**.
8. **Sticky horizontal category nav with scroll-spy** on the menu page; smooth-scroll on tap — ref: **Sweetgreen / Smashing sticky-menu guidelines**.
9. **Bottom-sheet item detail on mobile, side-panel on desktop**. Inline expand for trivially simple items (single glass of wine, espresso) — ref: **Shake Shack** + **Joe's Pizza**.
10. **Right-edge cart drawer on desktop**, auto-opens on first add, dismissable; persistent across navigation via localStorage — ref: **Sweetgreen** (and explicit anti-pattern from **CAVA's cart-loss failure**).
11. **Order confirmation as a five-stage horizontal tracker** (Received → Prepping → In the oven → Ready → Picked up) with SMS on Ready and an in-app "I'm here" button — ref: **Shake Shack** + **Domino's**.
12. **Loyalty math surfaced at the cart** ("This order earns you 35 punti → free aperitivo at 100") rather than buried in account — ref: **&pizza / Thanx**.

---

## Mobile-first non-negotiables

- Single-thumb reachable primary CTAs at the bottom of every screen.
- 16px minimum input font to prevent iOS auto-zoom on focus.
- Bottom sheets, not modals, for item detail.
- Persistent bottom cart bar — never make the user hunt for it.
- ETA visible **before** the menu loads.
