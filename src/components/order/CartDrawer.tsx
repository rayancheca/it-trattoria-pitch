'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useMemo } from 'react';
import { Minus, Plus, ShoppingBag, Sparkles, X } from 'lucide-react';
import { useCart, selectSubtotalCents, selectCartCount } from '@/lib/cart/store';
import { emitCartBurst } from '@/lib/cart/burst';
import { LOCATIONS } from '@/data/locations';
import { formatPrice, MENU_ITEMS } from '@/data/menu';

// Loyalty / free-delivery threshold (Sweetgreen pattern).
// When subtotal crosses LOYALTY_THRESHOLD, the order earns a free aperitivo.
const LOYALTY_THRESHOLD = 3500; // $35
const FREE_DELIVERY_THRESHOLD = 4000; // $40

export function CartDrawer() {
  const isOpen = useCart((s) => s.isCartOpen);
  const close = useCart((s) => s.closeCart);
  const lines = useCart((s) => s.lines);
  const updateQty = useCart((s) => s.updateQuantity);
  const removeLine = useCart((s) => s.removeLine);
  const addItem = useCart((s) => s.addItem);
  const subtotal = useCart(selectSubtotalCents);
  const count = useCart(selectCartCount);
  const fulfillment = useCart((s) => s.fulfillment);
  const setFulfillment = useCart((s) => s.setFulfillment);
  const locationSlug = useCart((s) => s.locationSlug);
  const openLocationPicker = useCart((s) => s.openLocationPicker);

  const loc = LOCATIONS.find((l) => l.slug === locationSlug);

  // "Add a side?" upsell — looks at the current cart and suggests a
  // complementary item the customer hasn't already added. We prefer a dolce
  // or bevande since most pasta-only carts benefit from one.
  const upsellItem = useMemo(() => {
    if (lines.length === 0) return undefined;
    const hasDolce = lines.some((l) => {
      const it = MENU_ITEMS.find((i) => i.id === l.itemId);
      return it?.category === 'dolce';
    });
    const hasBevande = lines.some((l) => {
      const it = MENU_ITEMS.find((i) => i.id === l.itemId);
      return it?.category === 'bevande';
    });
    if (!hasDolce) {
      // Suggest the most-iconic dolce: Tiramisù Coffee
      return MENU_ITEMS.find(
        (i) => i.slug === 'tiramisu-coffee' && (!locationSlug || i.availableAt.includes(locationSlug)) && !i.aspirational,
      );
    }
    if (!hasBevande) {
      return MENU_ITEMS.find(
        (i) => i.slug === 'cappuccino' && (!locationSlug || i.availableAt.includes(locationSlug)) && !i.aspirational,
      );
    }
    return undefined;
  }, [lines, locationSlug]);

  // Loyalty math
  const loyaltyProgress = Math.min(subtotal / LOYALTY_THRESHOLD, 1);
  const loyaltyEarned = subtotal >= LOYALTY_THRESHOLD;
  const loyaltyToGo = Math.max(0, LOYALTY_THRESHOLD - subtotal);
  const freeDeliveryProgress = fulfillment === 'delivery'
    ? Math.min(subtotal / FREE_DELIVERY_THRESHOLD, 1)
    : 0;
  const freeDeliveryToGo = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[90] bg-caffe/40"
            onClick={close}
            aria-hidden
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 z-[91] h-full w-full sm:w-[460px] bg-carta border-l border-carta-deep flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Your order"
          >
            <header className="px-6 py-5 border-b border-carta-deep flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} aria-hidden />
                <div>
                  <p className="label-it">Il tuo ordine · Your order</p>
                  <p className="text-sm text-caffe-mute">
                    {count === 0 ? 'Empty' : `${count} item${count === 1 ? '' : 's'}`}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close cart"
                className="w-10 h-10 inline-flex items-center justify-center hover:text-peperoncino transition-colors"
              >
                <X size={20} />
              </button>
            </header>

            {/* Location + mode */}
            <div className="px-6 py-4 border-b border-carta-deep bg-carta-deep/40">
              <div className="flex items-center justify-between gap-3 mb-3">
                <div>
                  <p className="label-it text-caffe-mute mb-1">From</p>
                  <button
                    type="button"
                    onClick={openLocationPicker}
                    className="font-display text-lg tracking-tight link-editorial"
                  >
                    {loc ? loc.shortName : 'Pick a trattoria'}
                  </button>
                </div>
                <div className="flex border border-carta-deep rounded-sm overflow-hidden text-sm">
                  <button
                    type="button"
                    onClick={() => setFulfillment('pickup')}
                    className={`px-4 py-1.5 transition-colors ${fulfillment === 'pickup' ? 'bg-caffe text-carta' : 'text-caffe-soft hover:text-caffe'}`}
                  >
                    Pickup
                  </button>
                  <button
                    type="button"
                    onClick={() => setFulfillment('delivery')}
                    className={`px-4 py-1.5 transition-colors ${fulfillment === 'delivery' ? 'bg-caffe text-carta' : 'text-caffe-soft hover:text-caffe'}`}
                  >
                    Delivery
                  </button>
                </div>
              </div>
              <p className="text-xs text-caffe-mute">
                {fulfillment === 'pickup'
                  ? loc ? `Ready in ~12–15 min at ${loc.shortName}` : 'Pick a location to see prep time'
                  : 'Delivery via partner network · 25–40 min'}
              </p>
            </div>

            {/* Lines */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {lines.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <p className="label-it mb-3">Vuoto · Empty</p>
                  <p className="font-display text-2xl tracking-tight text-balance max-w-xs">
                    Add a paccheri to your <span className="italic">order</span>.
                  </p>
                  <Link
                    href="/order"
                    onClick={close}
                    className="mt-6 inline-flex items-center justify-center h-11 px-5 bg-caffe text-carta rounded-sm font-medium hover:bg-monogram transition-colors"
                  >
                    Browse the menu
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-carta-deep">
                  {lines.map((l) => (
                    <li key={l.id} className="py-4 flex gap-3 items-start">
                      <div className="w-16 h-16 bg-carta-deep rounded-sm overflow-hidden shrink-0 relative">
                        {l.photo && (
                          <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url('${l.photo}')` }}
                            aria-hidden
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-display text-base tracking-tight truncate">{l.name}</p>
                        {l.notes && (
                          <p className="text-xs text-caffe-mute mt-0.5">{l.notes}</p>
                        )}
                        <div className="mt-2 flex items-center gap-2">
                          <div className="inline-flex items-center border border-carta-deep rounded-sm">
                            <button
                              type="button"
                              onClick={() => updateQty(l.id, l.quantity - 1)}
                              className="w-7 h-7 inline-flex items-center justify-center hover:text-peperoncino transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="num text-sm w-7 text-center">{l.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQty(l.id, l.quantity + 1)}
                              className="w-7 h-7 inline-flex items-center justify-center hover:text-peperoncino transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeLine(l.id)}
                            className="text-xs text-caffe-mute hover:text-peperoncino transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                      <p className="num text-sm shrink-0">{formatPrice(l.unitPriceCents * l.quantity)}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Add a side? upsell — Sweetgreen "Add a side?" pattern */}
            {lines.length > 0 && upsellItem && (
              <div className="px-6 py-4 border-t border-carta-deep bg-monogram-tint">
                <p className="label-it text-monogram mb-3 flex items-center gap-2">
                  <Sparkles size={14} aria-hidden />
                  Add a side?
                </p>
                <button
                  type="button"
                  onClick={(ev) => {
                    addItem(upsellItem, 1);
                    emitCartBurst(ev.clientX, ev.clientY);
                  }}
                  className="w-full flex items-center gap-3 p-3 bg-carta rounded-sm hover:bg-carta-deep transition-colors text-left group"
                >
                  <div className="w-12 h-12 bg-carta-deep rounded-sm overflow-hidden shrink-0 relative">
                    {upsellItem.photo && (
                      <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('${upsellItem.photo.src}')` }}
                        aria-hidden
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-base tracking-tight truncate">{upsellItem.name}</p>
                    <p className="text-xs text-caffe-mute">{upsellItem.description.split('.')[0]}</p>
                  </div>
                  <p className="num text-sm shrink-0 text-peperoncino font-medium group-hover:text-monogram transition-colors">
                    + {formatPrice(upsellItem.priceCents)}
                  </p>
                </button>
              </div>
            )}

            {/* Loyalty + free-delivery progress — Sweetgreen "rewards math" */}
            {lines.length > 0 && (
              <div className="px-6 py-4 border-t border-carta-deep bg-carta">
                {loyaltyEarned ? (
                  <p className="text-xs text-monogram font-medium mb-2 flex items-center gap-1.5">
                    <Sparkles size={12} aria-hidden />
                    You&rsquo;ve unlocked a free Spritz on the house — applied at pickup.
                  </p>
                ) : (
                  <>
                    <p className="text-xs text-caffe-soft mb-1.5">
                      <strong className="text-caffe">{formatPrice(loyaltyToGo)}</strong> away from a free Spritz
                    </p>
                    <div className="h-1.5 bg-carta-deep rounded-full overflow-hidden mb-3">
                      <motion.div
                        className="h-full bg-bergamot rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${loyaltyProgress * 100}%` }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </>
                )}
                {fulfillment === 'delivery' && (freeDeliveryToGo > 0 ? (
                  <>
                    <p className="text-xs text-caffe-soft mb-1.5">
                      <strong className="text-caffe">{formatPrice(freeDeliveryToGo)}</strong> away from free delivery
                    </p>
                    <div className="h-1.5 bg-carta-deep rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-peperoncino rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${freeDeliveryProgress * 100}%` }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                  </>
                ) : (
                  <p className="text-xs text-peperoncino font-medium">
                    🎉 You qualify for free delivery.
                  </p>
                ))}
              </div>
            )}

            {/* Footer */}
            {lines.length > 0 && (
              <footer className="border-t border-carta-deep px-6 py-5 bg-carta">
                <div className="flex items-center justify-between mb-4">
                  <p className="label-it">Subtotal</p>
                  <p className="num font-display text-2xl">{formatPrice(subtotal)}</p>
                </div>
                <Link
                  href="/order/checkout"
                  onClick={close}
                  className="block w-full text-center h-14 inline-flex items-center justify-center bg-peperoncino text-carta rounded-sm font-medium hover:bg-peperoncino-soft transition-colors"
                >
                  Checkout · {formatPrice(subtotal)}
                </Link>
                <p className="text-xs text-caffe-mute text-center mt-3">
                  Tax + tip calculated at checkout. Apple Pay supported.
                </p>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
