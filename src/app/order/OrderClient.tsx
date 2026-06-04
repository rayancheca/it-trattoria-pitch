'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { MapPin, Clock, Minus, Plus, ChevronDown } from 'lucide-react';
import {
  MENU_ITEMS,
  CATEGORIES,
  formatPrice,
  type MenuCategory,
  type MenuItem,
} from '@/data/menu';
import { regionBySlug } from '@/data/regions';
import { LOCATIONS } from '@/data/locations';
import { useCart, selectCartCount, selectSubtotalCents } from '@/lib/cart/store';
import { getOpenStatus } from '@/lib/hours';

const CATEGORY_ORDER: MenuCategory[] = ['aperitivo', 'al-banco', 'a-tavola', 'dolce', 'bevande'];

export function OrderClient() {
  const hasHydrated = useCart((s) => s.hasHydrated);
  const locationSlug = useCart((s) => s.locationSlug);
  const openLocationPicker = useCart((s) => s.openLocationPicker);
  const openCart = useCart((s) => s.openCart);
  const fulfillment = useCart((s) => s.fulfillment);
  const setFulfillment = useCart((s) => s.setFulfillment);
  const cartCount = useCart(selectCartCount);
  const subtotal = useCart(selectSubtotalCents);

  const loc = LOCATIONS.find((l) => l.slug === locationSlug);
  const status = loc ? getOpenStatus(loc.hours, loc.timezone) : null;

  // Open the picker automatically on first visit if no location yet.
  useEffect(() => {
    if (hasHydrated && !locationSlug) {
      openLocationPicker();
    }
  }, [hasHydrated, locationSlug, openLocationPicker]);

  // Available items at this location. Aspirational (pitch-proposal) items
  // are filtered out of /order because they are not currently on IT's menu —
  // customers can't order what doesn't exist. They remain visible at /menu
  // with a clear "Pitch proposal" badge.
  const availableItems = useMemo(() => {
    const orderable = MENU_ITEMS.filter((i) => !i.aspirational);
    if (!locationSlug) return orderable;
    return orderable.filter((i) => i.availableAt.includes(locationSlug));
  }, [locationSlug]);

  // Sticky category scroll spy.
  const [activeCat, setActiveCat] = useState<MenuCategory>('aperitivo');
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveCat(entry.target.id.replace('cat-', '') as MenuCategory);
          }
        }
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0, 0.1, 0.5] },
    );
    for (const cat of CATEGORY_ORDER) {
      const el = sectionRefs.current[cat];
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  function scrollToCategory(cat: MenuCategory) {
    const el = sectionRefs.current[cat];
    if (!el) return;
    const offset = 184; // header (h-20) + sticky nav (~104)
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  return (
    <>
      {/* Header bar — location + ETA + fulfillment */}
      <section className="bg-caffe text-carta">
        <div className="container-edge py-8 lg:py-10">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-4">
            <div>
              <p className="label-it text-bergamot mb-2">Ordina · Order online</p>
              <h1 className="font-display text-balance" style={{ fontSize: 'var(--text-display)', lineHeight: 0.95 }}>
                {loc ? <>Ordering from <span className="italic">{loc.shortName}</span>.</> : <>Where would you like <span className="italic">to eat</span>?</>}
              </h1>
            </div>
            {loc && (
              <button
                type="button"
                onClick={openLocationPicker}
                className="inline-flex items-center gap-2 h-11 px-4 border border-carta/30 rounded-sm hover:border-carta transition-colors"
              >
                <MapPin size={14} aria-hidden />
                Change
              </button>
            )}
          </div>

          {/* Status / ETA / fulfillment */}
          <div className="flex flex-wrap gap-3 mt-6 items-center">
            {loc && status && (
              <span className="inline-flex items-center gap-2 h-9 px-3 rounded-sm bg-caffe-soft text-sm">
                <span className={status.open ? 'dot-open' : 'dot-closed'} aria-hidden />
                <span className={status.open ? 'text-bergamot font-medium' : 'text-carta/70'}>{status.message}</span>
              </span>
            )}
            {loc && status?.open && (
              <span className="inline-flex items-center gap-2 h-9 px-3 rounded-sm bg-caffe-soft text-sm">
                <Clock size={14} aria-hidden />
                <span className="text-carta">Ready in ~12–15 min</span>
              </span>
            )}
            <div className="inline-flex h-9 rounded-sm border border-carta/30 overflow-hidden text-sm">
              <button
                type="button"
                onClick={() => setFulfillment('pickup')}
                className={`px-4 transition-colors ${fulfillment === 'pickup' ? 'bg-carta text-caffe' : 'text-carta hover:bg-carta/15'}`}
              >
                Pickup
              </button>
              <button
                type="button"
                onClick={() => setFulfillment('delivery')}
                className={`px-4 transition-colors ${fulfillment === 'delivery' ? 'bg-carta text-caffe' : 'text-carta hover:bg-carta/15'}`}
              >
                Delivery
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky category nav */}
      <div className="sticky top-16 lg:top-20 z-30 bg-carta border-b border-carta-deep">
        <nav className="container-edge h-14 flex items-center gap-6 overflow-x-auto" aria-label="Menu categories">
          {CATEGORY_ORDER.map((cat) => {
            const meta = CATEGORIES[cat];
            const isActive = activeCat === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => scrollToCategory(cat)}
                className={`relative whitespace-nowrap text-sm tracking-tight transition-colors ${
                  isActive ? 'text-peperoncino font-medium' : 'text-caffe-soft hover:text-caffe'
                }`}
              >
                {meta.name}
                {isActive && (
                  <span className="absolute -bottom-3 left-0 right-0 h-0.5 bg-peperoncino" />
                )}
              </button>
            );
          })}
          <div className="hidden sm:flex items-center ml-auto gap-3">
            <span className="text-xs text-caffe-mute label-it">{cartCount} in cart</span>
            <button
              type="button"
              onClick={openCart}
              className="inline-flex items-center gap-2 h-9 px-4 bg-caffe text-carta rounded-sm text-sm font-medium hover:bg-monogram transition-colors"
            >
              View cart · {formatPrice(subtotal)}
            </button>
          </div>
        </nav>
      </div>

      {/* Categories */}
      <main>
        {CATEGORY_ORDER.map((cat) => {
          const meta = CATEGORIES[cat];
          const items = availableItems.filter((i) => i.category === cat);
          if (items.length === 0) return null;
          return (
            <section
              key={cat}
              id={`cat-${cat}`}
              ref={(el) => { sectionRefs.current[cat] = el; }}
              className={`bg-carta py-10 lg:py-14 ${cat === CATEGORY_ORDER[CATEGORY_ORDER.length - 1] ? '' : 'border-b border-carta-deep'}`}
              aria-labelledby={`heading-${cat}`}
            >
              <div className="container-edge">
                <div className="mb-8">
                  <p className="label-it mb-2">{meta.italianName}</p>
                  <h2 id={`heading-${cat}`} className="font-display tracking-tight text-balance" style={{ fontSize: 'var(--text-h1)' }}>
                    {meta.name}
                  </h2>
                  <p className="mt-2 text-caffe-soft max-w-prose">{meta.blurb}</p>
                </div>
                <ul className="divide-y divide-carta-deep">
                  {items.map((item) => (
                    <OrderItemRow key={item.id} item={item} />
                  ))}
                </ul>
              </div>
            </section>
          );
        })}
      </main>

      {/* Bottom CTA */}
      <section className="section-tight bg-caffe text-carta">
        <div className="container-edge flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="label-it text-bergamot mb-2">Pronto a ordinare · Ready to order</p>
            <p className="font-display text-2xl tracking-tight">
              {cartCount > 0 ? `${cartCount} item${cartCount === 1 ? '' : 's'} · ${formatPrice(subtotal)}` : 'Add something to start.'}
            </p>
          </div>
          {cartCount > 0 && (
            <Link
              href="/order/checkout"
              className="inline-flex items-center justify-center h-12 px-6 bg-peperoncino text-carta rounded-sm font-medium hover:bg-peperoncino-soft transition-colors"
            >
              Continue to checkout
            </Link>
          )}
        </div>
      </section>
    </>
  );
}

function OrderItemRow({ item }: { item: MenuItem }) {
  const addItem = useCart((s) => s.addItem);
  const locationSlug = useCart((s) => s.locationSlug);
  const openLocationPicker = useCart((s) => s.openLocationPicker);
  const lines = useCart((s) => s.lines);
  const updateQty = useCart((s) => s.updateQuantity);

  // Quantity of THIS item already in cart (sum of lines, ignoring notes).
  const inCart = lines.filter((l) => l.itemId === item.id).reduce((n, l) => n + l.quantity, 0);
  const firstLine = lines.find((l) => l.itemId === item.id);

  const [expanded, setExpanded] = useState(false);

  function onAdd() {
    if (!locationSlug) {
      openLocationPicker();
      return;
    }
    addItem(item, 1);
  }

  return (
    <li>
      <article className="grid md:grid-cols-12 gap-4 md:gap-6 py-6 items-start">
        <div className="md:col-span-3">
          <div className="aspect-square md:aspect-[5/4] bg-carta-deep rounded-sm overflow-hidden relative">
            {item.photo && (
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${item.photo.src}')` }}
                aria-hidden
              />
            )}
          </div>
        </div>
        <div className="md:col-span-6">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="chip">{regionBySlug(item.region)?.name ?? item.region}</span>
            {item.dietary.includes('spicy') && <span className="chip chip-accent">Spicy</span>}
            {item.dietary.includes('vegetarian') && <span className="chip">Veg</span>}
            {item.newThisWeek && <span className="chip chip-accent">New</span>}
          </div>
          <h3 className="font-display text-2xl lg:text-3xl tracking-tight text-balance">
            {item.name}
          </h3>
          <p className="mt-2 text-caffe-soft text-pretty max-w-2xl">{item.description}</p>
          {item.sourcing[0] && (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="mt-3 inline-flex items-center gap-1 text-xs link-editorial"
              aria-expanded={expanded}
            >
              Sourcing &amp; ingredients
              <ChevronDown size={12} aria-hidden className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
            </button>
          )}
          {expanded && (
            <ul className="mt-3 space-y-1.5 max-w-2xl">
              {item.sourcing.map((s, i) => (
                <li key={i} className="text-xs text-caffe-mute">
                  <strong className="text-caffe">{s.ingredient}</strong>{s.producer ? ` · ${s.producer}` : ''} · {s.origin}
                </li>
              ))}
              {item.allergens.length > 0 && (
                <li className="text-xs text-caffe-mute mt-2">
                  <strong className="text-caffe">Allergens:</strong> {item.allergens.join(', ')}
                </li>
              )}
            </ul>
          )}
        </div>
        <div className="md:col-span-3 flex md:flex-col md:items-end justify-between gap-3">
          <p className="num font-display text-2xl">{formatPrice(item.priceCents)}</p>
          {inCart === 0 ? (
            <button
              type="button"
              onClick={onAdd}
              className="inline-flex items-center gap-1.5 h-10 px-4 bg-caffe text-carta rounded-sm text-sm font-medium hover:bg-monogram transition-colors"
            >
              <Plus size={14} aria-hidden /> Add
            </button>
          ) : (
            <div className="inline-flex items-center h-10 border border-carta-deep rounded-sm">
              <button
                type="button"
                onClick={() => firstLine && updateQty(firstLine.id, firstLine.quantity - 1)}
                className="w-10 h-10 inline-flex items-center justify-center hover:text-peperoncino transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus size={14} />
              </button>
              <span className="num w-8 text-center">{inCart}</span>
              <button
                type="button"
                onClick={onAdd}
                className="w-10 h-10 inline-flex items-center justify-center hover:text-peperoncino transition-colors"
                aria-label="Increase quantity"
              >
                <Plus size={14} />
              </button>
            </div>
          )}
        </div>
      </article>
    </li>
  );
}
