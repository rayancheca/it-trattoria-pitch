# Sweetgreen & Chipotle Ordering Deep-Dive — Molecular Buildbook for IT

> Purpose: a screen-by-screen, interaction-by-interaction reference for what IT — Italian Trattoria's ordering flow must clone, adapt, and beat. Sweetgreen + Chipotle + CAVA + Shake Shack are the chosen ceiling; DoorDash + Uber Eats are the floor we must not look like.

---

## 1. Sweetgreen (`order.sweetgreen.com`)

### Hero / above-the-fold
The order site is essentially a logged-in shell. For anonymous users it opens to a location-finder card; for returning users it skips the marketing surface entirely and renders **the last ordered store + an "Order again" rail** above the menu. There is no marketing hero, no carousel, no "shop our collection." The fold is one of three states:

1. **Empty/anonymous** — full-bleed "Choose a sweetgreen" card with a search field, a "Use my location" pill, and recently-used location chips.
2. **Returning user with active order** — order-status block ("Your bowl is being made.") + reorder rail.
3. **Returning user idle** — "Order again from Union Square" rail with item cards horizontally scrollable, then the menu below.

The headline copy ranges from utilitarian ("Order pickup or delivery") to playful ("Tap. Eat. Smile."). The primary CTA is always a green pill labeled either **"Order now"** or **"Order again"**, never "Shop" or "Start order."

### Location selection
- **Modal-as-page**, not a dropdown. The location chooser takes the entire viewport, with a left column of stores and a right column showing a Mapbox-style map with pin clusters.
- **Auto-detect**: prompts for geolocation on first paint. If denied, falls back to a search input with type-ahead.
- Each store card shows: distance, address, pickup wait (e.g. "Ready in 15 min"), and a green **"Order from here"** button. The recently-used store gets a "Last visited" chip.
- Delivery vs Pickup is a sticky segmented toggle at the top of the modal, NOT a separate flow — same store list, same UI, only the metadata in each card changes (ETA replaces wait time).

### Menu browse
- **Sticky category nav** with horizontal scroll on mobile, anchor-jump on desktop. Categories: *Warm Bowls, Salads, Plates, Sides, Drinks, Desserts.* Active category gets a green underline that slides as you scroll-spy.
- **Item card style**: square food photo on top (no rounded corners on the photo — that's a deliberate brand choice that reads "magazine, not delivery app"), then title, one-line ingredient list ("chicken, kale, sweet potato, lime cilantro jalapeño vinaigrette"), then price right-justified. No "Add" button on the card itself — the entire card is the tap target.
- **Badges**: tiny pill labels on cards — "New," "Featured with [Chef name]," "Limited time," "Spicy." Never more than one badge per card.
- **Density**: three cards per row on desktop, one per row on mobile (no grid-of-six). Generous whitespace; the menu *breathes*.
- **Photography**: top-down, white background, ingredient-forward. No bowls shot at an angle.

### Item detail / modifier UX
- **Full-page route** on mobile (not modal), **right-side drawer** on desktop (~520px wide, scrolls independently of the menu underneath).
- Inside the drawer: **hero photo at top**, then "What's inside" ingredient chips, then sections — *Base, Greens, Toppings, Premium Toppings (+$), Dressings*. Each section has a clear required/optional label and a count constraint ("Choose up to 4").
- Each ingredient row is its own tap target with a **circular checkbox/plus button**. Tapping toggles inclusion; selected items get a green tick. Premium toppings show the upcharge to the right ("+ $1.50").
- **Live price counter** at the top of the drawer updates as you toggle.
- **"Substitute" affordance**: tap a default ingredient to see swap suggestions inline.
- The CTA is a sticky black bar at the bottom: **"Add to bag — $14.95"**. The bar pulses subtly when you complete required choices.

### Add-to-cart feedback
- Drawer slides shut with a 320ms ease-out, simultaneously the **bag icon in the top right scales 1.0 → 1.2 → 1.0** and a **green dot badge with a count number appears** (animated in with a small spring).
- No toast. No notification. The cart-count bump *is* the feedback.

### Cart / "Bag" UX
- **Right-side drawer**, 420px wide on desktop, full-screen on mobile.
- Each line item: thumbnail photo (60px), name, customizations as a 2-line gray summary ("No tomatoes • Extra avocado • Dressing on the side"), quantity stepper, and a delete X.
- **Edit affordance**: tap the row to reopen the customization drawer pre-filled.
- **Sticky upsell rail** at the bottom of the cart: "Add a side?" with horizontally scrollable side cards (Pita Chips, Cucumber Salad, Lemonade). Each has a one-tap **"+ Add for $3.50"** button — no modal, no choices, instant add.
- **Loyalty math inline**: "You'll earn 14 sweets toward your next reward." A progress bar shows distance to next perk.
- **Subtotal / tax / delivery / tip breakdown** above the CTA.
- **Tip selector**: chip group (15% / 18% / 20% / Custom), pickup defaults to no tip, delivery defaults to 18% pre-selected.
- Sticky CTA bottom: **"Checkout — $24.50"** (black pill).

### Checkout
- **Single-page checkout** for returning users (saved address, saved card, saved tip).
- Field order: pickup/delivery toggle (locked to whatever was selected) → time selector → payment → review.
- **Apple Pay button is placed FIRST**, full-width, above all other fields, with a thin "or pay with card" divider below. Apple Pay button is the standard black pill with the Apple logo + "Pay" — never restyled.
- For new users, fields are progressive — each tap reveals the next section.
- **Pickup time selector**: shows "ASAP — ready in 12 min" as the default, with a "Schedule for later" link that expands a time grid (15-min increments, today/tomorrow tabs).

### Confirmation / tracking
- **Stepped progress tracker**: "Order received → Being made → Ready for pickup" with the active step highlighted green and a soft pulse on the active indicator.
- **Live countdown timer** ("Ready in 8 min") above the tracker.
- Below the tracker: the order receipt, a "Get directions" button, "Add to Apple Wallet" for the order code.
- **Post-order upsell**: "Forgot something? Add to your order" — but only available for 90 seconds before kitchen prep starts. This creates urgency without feeling pushy.
- "Rate your order" emerges after pickup is confirmed (push notification + in-app card).

### Conversion devices
- **"Order again" rail** on home (top placement)
- **"Featured" rail** with chef collabs (Pinkberry x Marcus Samuelsson energy)
- **Loyalty progress** visible in cart AND header at all times
- **Free delivery threshold bar** ("$3 away from free delivery") with a filling progress bar in the cart
- **"Recently viewed" rail** on item detail pages for cross-sell
- **No countdown timers, no fake scarcity, no popups**. Sweetgreen converts through removed friction, not pressure.

---

## 2. Chipotle (`chipotle.com/order`)

### Hero
A promotional hero on the marketing page (e.g. "Chipotle Honey Chicken is back" with the auto-playing video compilation), then a giant **"ORDER NOW"** button that jumps to `#menu`. For returning users in the app, the hero is replaced by **"Your last order"** with a one-tap **"Reorder"** button.

### Location selection
- **Full-page picker** with a "Use my current location" button at top.
- Each location card shows address, distance, pickup wait, and crucially **"Order pickup" vs "Order delivery" as two separate buttons** on the same card — Chipotle treats them as different mental models, not a toggle.
- "Make this my Chipotle" star button to save the location.

### The famous Chipotle pickup-time picker
This is the single most-copied pattern in fast-casual ordering. Specifics:
- After choosing pickup, the user lands on a **dedicated time selector screen** — never a dropdown.
- Top option (default-selected): big card that reads **"ASAP — Ready in 11–16 min"**.
- Below it: **"Schedule for later"** which expands to a **horizontal day chip row** (Today / Tomorrow / Wed / Thu...) and a **vertical scrolling list of 15-minute time slots** ("11:00 AM, 11:15 AM, 11:30 AM..."). Each slot is a full-width tap target.
- Critical detail: each slot shows a small label if it's outside normal hours ("Last orders" / "Opens at 10:30 AM").
- The picker is a separate screen, not a modal. The screen-not-modal choice is deliberate — it reduces cognitive load by removing the menu underneath as a distraction.

### Menu browse
- The web menu is a **single long scroll grouped by category** (Bowls, Burritos, Tacos, Salads, Quesadillas, Lifestyle Bowls, Kid's Meal, Sides & Drinks).
- **Sticky category nav** that turns into a hamburger overflow on mobile.
- Cards are wider than Sweetgreen's — landscape orientation with photo left + title/desc/price right on desktop, stacked on mobile.
- Photography is closer-in, more saturated, dark backgrounds — Chipotle's "burrito porn" treatment.
- **"Lifestyle Bowls" badges**: "Keto," "Whole30," "Paleo," "Vegan," "Vegetarian." These are first-class filterable categories, not afterthoughts.

### Bowl builder ("Build Your Own")
- **Single-page builder** (not a multi-step wizard) — that was a deliberate redesign decision after testing showed wizards caused abandonment.
- Sections in order: *Choose a Protein → Choose Rice → Choose Beans → Add Toppings → Add Extras*.
- Each section has a **horizontal scrolling chip row** of options with a small photo, name, and price delta (e.g. "Steak +$2.10"). Selected option gets a thick brown border + check.
- **"No charge for extras" callouts**: a small "+ Add more for free" link under sections like fajita veggies and lettuce — turns a free upsell into a discovery moment.
- **Spice level**: chili-pepper icons (1 to 4) under salsas, not just labels.
- The builder has a **sticky "Your bowl so far" preview** at the bottom showing selected ingredients as text chips + running price.

### Add-to-bag feedback
- A subtle confetti/celebration of a bag icon bump + a small toast that fades after 1.5s: **"Added to bag."**
- Less restrained than Sweetgreen — Chipotle wants you to *feel* the add.

### Bag UX
- **Right drawer** on desktop, full-screen route on mobile.
- Each item shows the customization summary as small bullet points (specifically: every ingredient is listed; this is intentional — a Chipotle bowl has 6–9 ingredients and seeing them all reduces "wait did I order this right?" anxiety).
- **Cart upsells**: "Add chips & guac?" with a single-tap add, and a "Make it a meal — add a drink for $3" combo offer.
- Sticky CTA: **"Continue to checkout — $14.85"** in brown.

### Checkout
- Single page, returning-user-optimized.
- Apple Pay button placed first (this is the post-redesign pattern; pre-redesign Chipotle defaulted to "pay in store" which suppressed card usage).
- Rewards points balance shown ("You have 280 points — use 250 for free chips & guac?") with an inline redemption toggle.

### Confirmation / tracking
- **Live countdown timer** as the hero ("Ready at 12:23 PM"), with a smaller progress bar below.
- **"We're preparing your order"** → **"Your order is ready"** state changes with subtle animation.
- Order code in a large monospace font for the in-store handoff.
- "Find my Chipotle" button that opens directions.

### Conversion devices
- **Free chips & guac** as the entry-level reward — drives constant cart upsell
- **Group order** with deadlines and "the organizer is probably hungry" microcopy
- **Lifestyle Bowls** as a discovery surface
- **Honey Chicken-style LTO heroes** on the marketing page that lead directly into the menu

---

## 3. CAVA (`cava.com/builder/grains-bowl`)

### Bowl builder
- **Step-by-step wizard** (different from Chipotle's single-page choice) — base, protein, toppings, dips, dressings as discrete steps.
- **Sticky bowl preview** at top showing a stylized illustration of the bowl filling up as you select. Each ingredient appears in the illustrated bowl with a small bounce-in animation. This is CAVA's signature move and is *highly* relevant for IT's pasta builder if we ever ship one.
- **Real-time macro counter** (calories / protein / carbs / fat) updates inline as you build.
- Color palette: terracotta, olive, cream — earth tones, no green-as-a-shortcut-for-healthy.
- Multi-select with quantity steppers (e.g. "2x hummus") for dips — rare and useful.

### Modifier categories
- Required: base, protein
- Optional with limits: toppings (up to 6 free, more cost extra), dips (up to 3 free)
- Dressings: single-select radio

### Friction notes
- Documented friction: sluggish nav, occasional freezing. IT must not inherit this — keep the builder fully client-side with optimistic state.

---

## 4. Shake Shack (`order.shakeshack.com`)

### Item detail modal
- **Modal-with-collapsible-sections** approach. Customize options are *hidden in a "Customize" dropdown* by default — explicit UX choice to prevent kitchen overload from frivolous customizations.
- Add button visible without customization required.

### Bag and confirmation
- Confirmation screen displays pickup location, time, order number, total, "View Receipt" button.
- Order status flips between "Preparing" → "Ready for pickup" → "Out for delivery."
- Push notifications opt-in for each state.

### Order tracker
- Linear progress bar (not a map; pickup-first brand).
- The famous detail: a **timer that counts down** with a subtle anticipation animation — used to "amp up the excitement."

---

## 5. DoorDash + Uber Eats restaurant detail pages

These are the *floor* — patterns IT should knowingly avoid:
- Endless horizontal carousels stacked (Most Ordered, Featured, Picked for You) creating decision fatigue
- Generic item cards with no brand expression
- Modal item-detail with no animation, no atmosphere
- Aggressive upsells ("Frequently bought together") that feel transactional, not curated
- Fees broken across multiple lines (service fee, delivery fee, small order fee) eroding trust
- Default tip pre-selection at 18%+ which feels coercive

What IT keeps from them: persistent cart bag with item count + total, sticky "View bag" CTA on mobile, and quick-add `+` buttons on item cards for items that have no modifiers.

---

## Top 25 Moves for IT to Adopt — Ranked by Conversion Impact

| # | Move | Source | Implementation |
|---|------|--------|----------------|
| 1 | Apple Pay button FIRST, full-width, above email/card fields | Sweetgreen, Chipotle | shadcn `Button` variant `applePay`; render PaymentRequest API; black pill, never restyled |
| 2 | "Order again" rail above the menu for returning users | Sweetgreen, Baymard | Zustand `useOrderHistory`; Framer Motion `layoutId` for hero-to-card transition |
| 3 | Sticky bottom CTA bar in item drawer with live price ("Add to bag — €18.50") | Sweetgreen | Framer Motion `whileInView` pulse when required choices complete |
| 4 | Cart-icon scale-bump + green-dot count on add | Sweetgreen | Framer Motion `animate={{ scale: [1, 1.2, 1] }}` + spring badge |
| 5 | Right-side cart drawer with item thumbnails (not a route) | Sweetgreen | shadcn `Sheet` component, side="right", width 420px |
| 6 | "Add a side?" sticky horizontal upsell rail inside cart | Sweetgreen | One-tap `+` add — no modal; data from `sides` collection |
| 7 | Live price + macros counter in modifier drawer | Sweetgreen, CAVA | Computed selector on Zustand store; animated number with Framer `MotionValue` |
| 8 | Sticky bowl/plate preview that builds visually as you select | CAVA | SVG ingredient layers with stagger entrance per addition |
| 9 | Chipotle-style dedicated pickup-time screen (not dropdown) | Chipotle | Full-page route; ASAP card on top, "Schedule" chip-grid expand |
| 10 | Stepped order tracker with pulsing active step | Sweetgreen, Shake Shack | Three pills, active pulses via Framer `animate={{ opacity: [1, 0.6, 1] }}` |
| 11 | "Forgot something? Add to your order" 90-second post-order window | Sweetgreen | Countdown bound to order timestamp; surface as ephemeral card |
| 12 | Loyalty math visible in cart ("You'll earn 12 punti") with progress bar | Sweetgreen | Inline above subtotal; progress fills on add |
| 13 | Free delivery threshold bar ("€4 away from free delivery") | Sweetgreen | Sticky in cart drawer head; fills as subtotal grows |
| 14 | Full-page location picker, NOT a dropdown | Sweetgreen, Chipotle | Next.js route `/order/location`; Mapbox + list combo |
| 15 | "Last visited" + "Your Trattoria" pin saved locations | Chipotle | LocalStorage + Zustand `savedLocations[]` |
| 16 | Single-page builder (NOT a multi-step wizard) for primi/secondi | Chipotle (post-redesign) | One scroll; sections with chip rows; sticky preview |
| 17 | "Choose up to 4" count constraints with clear required/optional labels | Sweetgreen | Modifier schema with `min`/`max`/`required` fields |
| 18 | Tap card = open detail (no separate "Add" button on item card) | Sweetgreen | Whole-card click target; cursor-pointer; subtle hover lift |
| 19 | Inline ingredient swap suggestions ("Swap pasta for gluten-free") | Sweetgreen | Substitution data per modifier; expand inline on tap |
| 20 | Order code in monospace + Apple Wallet add | Chipotle, Sweetgreen | PKPass generation; show code in 32px JetBrains Mono |
| 21 | Sticky category nav with scroll-spy underline animation | Sweetgreen | IntersectionObserver; Framer `layoutId="active-cat"` |
| 22 | Top-down white-background ingredient photography | Sweetgreen | Brand standard; commission shoot or curated stock |
| 23 | Item card photo with no rounded corners (magazine-not-app feel) | Sweetgreen | `rounded-none` on Image; rounded on the wrapper card only |
| 24 | Quantity stepper inside cart with hold-to-repeat | Standard | shadcn-based stepper; `setInterval` on hold |
| 25 | "Rate your order" surfaces only after pickup confirmation | Sweetgreen | Webhook on order-completed; Zustand flag; modal on next session |

---

## What IT Can Do That Sweetgreen Can't — Italian-Specific Moves

Fast-casual chains are constrained by a *non-regional, ingredient-stripped, customization-maximalist* worldview. IT's Italian identity unlocks a parallel UX language that Sweetgreen literally cannot copy without breaking brand:

1. **Region badges on every dish.** A small terracotta pin with the region of origin (Lazio, Toscana, Emilia-Romagna) on every primi/secondi card. Tappable to surface a one-sentence regional context: *"Lazio — Roman cuisine, built around guanciale, pecorino, and pasta."* This is editorial UX, not delivery-app UX.

2. **DOP / IGP / DOC icons next to ingredients.** Tiny shield icons on parmigiano, prosciutto di parma, mozzarella di bufala, balsamico di modena. Tap reveals the protected-designation explainer. Conveys quality without saying "premium" — which fast-casual cannot do.

3. **The "non si fa" rail in modifiers.** Italian-specific negative-customization. When someone tries to add cream to carbonara, the UX surfaces a friendly card: *"In Roma, carbonara non ha panna. Vuoi continuare? — Continue or undo."* This is brand voice masquerading as UX. Chipotle will never tell you spaghetti isn't supposed to have ranch.

4. **Wine pairing recommender at item detail.** Each pasta/secondo has a one-tap wine pairing card ("Pairs with Chianti Classico — €12 glass"). Conversion lift without a modifier section. No fast-casual chain has wines.

5. **Half-portions ("mezza porzione") as a first-class modifier.** Italian dining tradition. UX: a small toggle inside item detail. Chipotle has "kids" but never "half." IT can use this for tasting menus.

6. **Bread service opt-in with timing logic.** "Add pane carasau — served first, before primi" with a small bread icon. Calls out the *timing* of arrival, which signals real-restaurant pacing.

7. **Course pacing on multi-item orders.** Cart drawer shows orders grouped by course (Antipasti → Primi → Secondi → Dolci) with a small note: "We'll bring them in this order." No delivery app does course pacing.

8. **Aperitivo hour mode.** Between 5–7pm, the menu auto-reorders to lead with aperitivi + small plates. Subtle and seasonal — fast-casual menus are static all day.

9. **"Dal mercato oggi" surface.** A small chalkboard-style component above the menu rotating market-fresh specials with sourcing notes. Updated daily by staff via a tiny admin. Sweetgreen has "Featured" but it's never *dated*.

10. **Cestino / digestivo upsell at the end of checkout.** A final card: "Finish with a limoncello? — €6" or "Add a basket of biscotti to take home." Confection upsell with cultural specificity. Sweetgreen sells "a brownie" — IT sells "a piece of where we're from."

These ten moves form IT's defensible UX moat. They cannot be reproduced by a chain because they require *culinary authority and regional voice*, both of which fast-casual brands explicitly avoided to scale.

---

## Sources

- [Sweetgreen App Case Study — dotconor.com](https://www.dotconor.com/sweetgreen)
- [Less Clicks, More Cravings: The UX Magic Behind Sweetgreen — Medium](https://medium.com/marketing-in-the-age-of-digital/less-clicks-more-cravings-the-ux-magic-behind-sweetgreen-e9b3cda23768)
- [Taking a look at the Sweetgreen app — Fueled](https://fueled.com/blog/sweetgreen/)
- [Chipotle Ordering Apps — Lynette Chiu](https://www.lynettechiu.com/chipotle-ordering)
- [Improving Chipotle's Mobile Ordering Experience — Jacob Rogelberg](https://medium.com/@jacobrogelberg/improving-chipotles-mobile-ordering-experience-b008a13db5be)
- [Chipotle Digital Ordering — Anna Tou](https://annatoudesign.com/project/chipotle-digital-ordering)
- [Time Picker UX Best Practices — Eleken](https://www.eleken.co/blog-posts/time-picker-ux)
- [Shake Shack Order Ahead — Matt Van Anderson](https://www.matt-van-anderson.com/shackorderahead)
- [Shake Shack iOS Order Tracking — Mobbin](https://mobbin.com/explore/screens/58273643-6fd6-4096-a585-11d4d637fd15)
- [Apple Pay Best Practices — Stripe](https://docs.stripe.com/apple-pay/best-practices)
- [Apple Pay Checkout & Payment — Apple HIG](https://developer.apple.com/design/human-interface-guidelines/apple-pay/overview/checkout-and-payment/)
- [CAVA Order Online Intel Report — Marlvel](https://marlvel.ai/intel-report/food-drink/cava-order-online)
- [CAVA Digital Ordering — Blake Wilton](https://blakewilton.com/Cava-Digital-Ordering)
- [Past Purchases on Grocery/Food Delivery Homepage — Baymard](https://baymard.com/blog/grocery-food-delivery-orders)
- [DoorDash App Screen Map — Revyl Atlas](https://revyl.com/atlas/doordash/)
