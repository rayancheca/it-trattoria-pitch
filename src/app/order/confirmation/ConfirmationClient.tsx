'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Check, ChefHat, Clock, MapPin, Package, Phone, ShoppingBag } from 'lucide-react';
import { LOCATIONS, type LocationSlug } from '@/data/locations';
import { formatPrice, MENU_ITEMS } from '@/data/menu';
import { type CartLine, useCart } from '@/lib/cart/store';
import { emitCartBurst } from '@/lib/cart/burst';

interface StoredOrder {
  orderId: string;
  location: LocationSlug;
  fulfillment: 'pickup' | 'delivery';
  lines: CartLine[];
  subtotal: number;
  tax: number;
  tip: number;
  total: number;
  customer: {
    name: string;
    email: string;
    phone: string;
    notes?: string;
  };
  pickupTime: string;
  paymentMethod: 'apple-pay' | 'google-pay' | 'card';
}

const STAGES = [
  { key: 'received', label: 'Received', italian: 'Ricevuto', icon: ShoppingBag },
  { key: 'prepping', label: 'Prepping', italian: 'In preparazione', icon: ChefHat },
  { key: 'cooking', label: 'In the oven', italian: 'In forno', icon: Clock },
  { key: 'ready', label: 'Ready', italian: 'Pronto', icon: Package },
  { key: 'picked-up', label: 'Picked up', italian: 'Ritirato', icon: Check },
] as const;

export function ConfirmationClient() {
  const params = useSearchParams();
  const orderId = params.get('id');
  const [order, setOrder] = useState<StoredOrder | null>(null);
  const [stageIdx, setStageIdx] = useState(0);
  const clearCart = useCart((s) => s.clearCart);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const raw = sessionStorage.getItem('it:last-order');
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as StoredOrder;
      setOrder(parsed);
      // Now that we have the snapshot, safe to clear the cart.
      clearCart();
    } catch {
      // ignore
    }
  }, [clearCart]);

  // Mock stage progression: advance through stages over ~25s for demo effect.
  useEffect(() => {
    if (!order) return;
    const timings = [4000, 6000, 9000, 6000]; // received→prepping→cooking→ready→picked-up
    const timers: ReturnType<typeof setTimeout>[] = [];
    let elapsed = 0;
    for (let i = 0; i < timings.length; i++) {
      elapsed += timings[i];
      const idx = i + 1;
      timers.push(setTimeout(() => setStageIdx(idx), elapsed));
    }
    return () => timers.forEach(clearTimeout);
  }, [order]);

  if (!order) {
    return (
      <section className="section bg-carta">
        <div className="container-edge">
          <p className="label-it text-bergamot mb-3">Grazie</p>
          <h1 className="font-display text-balance" style={{ fontSize: 'var(--text-h1)' }}>
            Order placed.
          </h1>
          <p className="mt-4 text-caffe-soft">
            We&rsquo;ve sent a confirmation to your email. Track it from there.
          </p>
          <Link href="/menu" className="mt-8 inline-flex items-center justify-center h-12 px-6 bg-caffe text-carta rounded-sm font-medium hover:bg-monogram transition-colors">
            Back to the menu
          </Link>
        </div>
      </section>
    );
  }

  const loc = LOCATIONS.find((l) => l.slug === order.location);
  const etaMin =
    order.pickupTime === 'asap' ? 12 : Number(order.pickupTime.replace('+', '')) || 12;
  const etaMax = etaMin + 3;

  return (
    <>
      <section className="bg-caffe text-carta">
        <div className="container-edge py-10 lg:py-14">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-bergamot text-caffe mb-6"
          >
            <Check size={28} strokeWidth={3} aria-hidden />
          </motion.div>
          <p className="label-it text-bergamot mb-3">Grazie · Order confirmed</p>
          <h1 className="font-display text-balance" style={{ fontSize: 'var(--text-display)', lineHeight: 0.95 }}>
            Thanks, {order.customer.name.split(' ')[0]}. <br />
            <span className="italic">We&rsquo;re on it.</span>
          </h1>
          <div className="mt-6 flex flex-wrap gap-4 text-carta/85">
            <span className="inline-flex items-center gap-2 num">
              <ShoppingBag size={14} aria-hidden />
              Order #{order.orderId}
            </span>
            {loc && (
              <span className="inline-flex items-center gap-2">
                <MapPin size={14} aria-hidden />
                {loc.shortName}
              </span>
            )}
            <span className="inline-flex items-center gap-2">
              <Clock size={14} aria-hidden />
              Ready in {etaMin}–{etaMax} min
            </span>
          </div>
        </div>
      </section>

      {/* Tracker */}
      <section className="section bg-carta">
        <div className="container-edge">
          <p className="label-it mb-6">In cucina · In the kitchen</p>
          <ol className="grid grid-cols-5 gap-2 lg:gap-4">
            {STAGES.map((s, i) => {
              const Icon = s.icon;
              const reached = i <= stageIdx;
              const current = i === stageIdx;
              return (
                <li key={s.key} className="relative">
                  <div className="flex flex-col items-center text-center">
                    <motion.div
                      animate={current ? { scale: [1, 1.06, 1] } : { scale: 1 }}
                      transition={current ? { duration: 1.6, repeat: Infinity, ease: 'easeInOut' } : { duration: 0 }}
                      className={`w-12 h-12 rounded-full inline-flex items-center justify-center mb-3 ${
                        reached ? 'bg-monogram text-carta' : 'bg-carta-deep text-caffe-mute'
                      }`}
                    >
                      <Icon size={18} aria-hidden />
                    </motion.div>
                    <p className={`label-it text-[0.6rem] ${reached ? 'text-caffe' : 'text-caffe-mute'}`}>
                      {s.label}
                    </p>
                    <p className={`text-[0.6rem] mt-0.5 ${reached ? 'text-caffe-mute' : 'text-caffe-mute/60'} italic hidden sm:block`}>
                      {s.italian}
                    </p>
                  </div>
                  {i < STAGES.length - 1 && (
                    <div
                      className={`absolute top-6 left-[60%] right-[-40%] h-0.5 -z-10 ${
                        i < stageIdx ? 'bg-monogram' : 'bg-carta-deep'
                      }`}
                      aria-hidden
                    />
                  )}
                </li>
              );
            })}
          </ol>
          <p className="mt-8 text-sm text-caffe-mute text-pretty max-w-xl">
            We&rsquo;ll text you at <strong className="text-caffe">{order.customer.phone}</strong> when
            it&rsquo;s ready. Walk straight to the counter — no line, just say your name.
          </p>
        </div>
      </section>

      {/* Summary + next steps */}
      <section className="section bg-carta-deep">
        <div className="container-edge grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <p className="label-it mb-4">Riepilogo · Summary</p>
            <ul className="divide-y divide-carta">
              {order.lines.map((l) => (
                <li key={l.id} className="py-3 flex justify-between gap-3">
                  <span>
                    <span className="num text-caffe-mute">{l.quantity}×</span>{' '}
                    <span className="font-display">{l.name}</span>
                  </span>
                  <span className="num">{formatPrice(l.unitPriceCents * l.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 pt-4 border-t border-carta space-y-1.5 text-sm">
              <Row label="Subtotal" value={formatPrice(order.subtotal)} />
              <Row label="Tax" value={formatPrice(order.tax)} />
              <Row label="Tip" value={formatPrice(order.tip)} />
              <div className="pt-3 mt-3 border-t border-carta flex justify-between items-baseline">
                <span className="label-it">Total</span>
                <span className="num font-display text-3xl">{formatPrice(order.total)}</span>
              </div>
            </div>
            <p className="mt-4 text-xs text-caffe-mute">
              Paid with {order.paymentMethod === 'apple-pay' ? 'Apple Pay' : order.paymentMethod === 'google-pay' ? 'Google Pay' : 'Card'}.
              Receipt sent to <strong className="text-caffe">{order.customer.email}</strong>.
            </p>
          </div>

          {loc && (
            <aside className="lg:col-span-5">
              <p className="label-it mb-4">Trovaci · Where to come</p>
              <div className="bg-carta rounded-sm p-6 space-y-3">
                <h3 className="font-display text-2xl tracking-tight">{loc.shortName}</h3>
                <p className="text-caffe-soft">{loc.address.line1}</p>
                <p className="text-caffe-soft">
                  {loc.address.city}, {loc.address.state} {loc.address.zip}
                </p>
                <p className="text-sm text-caffe-mute pt-2">{loc.neighborhood.note}</p>
                <div className="pt-3 flex flex-wrap gap-2">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                      `${loc.address.line1}, ${loc.address.city}, ${loc.address.state} ${loc.address.zip}`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 h-10 px-4 bg-caffe text-carta rounded-sm text-sm hover:bg-monogram transition-colors"
                  >
                    <MapPin size={14} aria-hidden /> Directions
                  </a>
                  <a
                    href={`tel:${loc.phone}`}
                    className="inline-flex items-center gap-2 h-10 px-4 border border-caffe rounded-sm text-sm hover:bg-caffe hover:text-carta transition-colors"
                  >
                    <Phone size={14} aria-hidden /> {loc.phoneFormatted}
                  </a>
                </div>
              </div>
            </aside>
          )}
        </div>
      </section>

      {/* "Forgot something?" 90-second add-to-order window — Sweetgreen pattern.
          Converts without coercion: the kitchen hasn't fired the food yet, so
          a customer can add a tiramisù or espresso while the timer is alive. */}
      <ForgotSomething order={order} />

      {/* Cross-link */}
      <section className="section-tight bg-carta">
        <div className="container-edge flex flex-wrap items-center justify-between gap-4">
          <p className="font-display text-2xl tracking-tight text-balance max-w-md">
            While you wait — read the journal.
          </p>
          <div className="flex gap-3">
            <Link
              href="/journal"
              className="inline-flex items-center justify-center h-11 px-5 border border-caffe rounded-sm text-sm hover:bg-caffe hover:text-carta transition-colors"
            >
              Browse the journal
            </Link>
            <Link
              href="/order"
              className="inline-flex items-center justify-center h-11 px-5 bg-caffe text-carta rounded-sm text-sm hover:bg-monogram transition-colors"
            >
              Order something else
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function ForgotSomething({ order }: { order: StoredOrder }) {
  const WINDOW_MS = 90 * 1000;
  const [secondsLeft, setSecondsLeft] = useState(90);
  const [addedSlugs, setAddedSlugs] = useState<Set<string>>(new Set());
  const addItem = useCart((s) => s.addItem);

  useEffect(() => {
    const start = Date.now();
    const tick = window.setInterval(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, Math.ceil((WINDOW_MS - elapsed) / 1000));
      setSecondsLeft(remaining);
      if (remaining === 0) window.clearInterval(tick);
    }, 500);
    return () => window.clearInterval(tick);
  }, []);

  if (secondsLeft === 0) return null;

  // Suggest 3 items the customer didn't already order, prioritizing dolce + bevande
  const purchasedIds = new Set(order.lines.map((l) => l.itemId));
  const suggestions = MENU_ITEMS
    .filter((i) => !i.aspirational && !purchasedIds.has(i.id))
    .filter((i) => i.availableAt.includes(order.location))
    .filter((i) => ['dolce', 'bevande'].includes(i.category))
    .slice(0, 3);

  if (suggestions.length === 0) return null;

  return (
    <section className="bg-bergamot/15 border-y border-bergamot/30">
      <div className="container-edge py-6 lg:py-8">
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <p className="label-it text-peperoncino">Hai dimenticato qualcosa?</p>
            <h2 className="font-display text-2xl lg:text-3xl tracking-tight mt-1">
              Forgot something? Add to your order.
            </h2>
            <p className="mt-1 text-sm text-caffe-soft">
              The kitchen hasn&rsquo;t fired yet — you have{' '}
              <strong className="num text-peperoncino">{secondsLeft}s</strong> to add something.
            </p>
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          {suggestions.map((item) => {
            const isAdded = addedSlugs.has(item.slug);
            return (
              <button
                key={item.id}
                type="button"
                disabled={isAdded}
                onClick={(ev) => {
                  addItem(item, 1);
                  emitCartBurst(ev.clientX, ev.clientY);
                  setAddedSlugs((prev) => new Set([...prev, item.slug]));
                }}
                className={`flex items-center gap-3 p-3 rounded-sm text-left transition-colors ${
                  isAdded
                    ? 'bg-monogram-tint border border-monogram'
                    : 'bg-carta border border-carta-deep hover:border-caffe'
                }`}
              >
                <div className="w-14 h-14 bg-carta-deep rounded-sm overflow-hidden shrink-0 relative">
                  {item.photo && (
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url('${item.photo.src}')` }}
                      aria-hidden
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display text-base tracking-tight truncate">{item.name}</p>
                  <p className="text-xs text-caffe-mute">{formatPrice(item.priceCents)}</p>
                </div>
                <span className={`text-sm font-medium shrink-0 ${isAdded ? 'text-monogram' : 'text-peperoncino'}`}>
                  {isAdded ? '✓ Added' : '+ Add'}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-caffe-soft">{label}</span>
      <span className="num">{value}</span>
    </div>
  );
}
