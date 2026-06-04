'use client';

import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useCart, selectSubtotalCents, selectCartCount } from '@/lib/cart/store';
import { LOCATIONS } from '@/data/locations';
import { formatPrice } from '@/data/menu';

/**
 * Persistent mobile bottom cart bar — Shake Shack pattern. Per Agent B research:
 * the single highest mobile conversion lever for restaurant ordering.
 *
 * Appears whenever cart has 1+ items, on any /order/* route or the home page.
 * Tapping it opens the cart drawer.
 */
export function CartBar() {
  const pathname = usePathname();
  const hasHydrated = useCart((s) => s.hasHydrated);
  const count = useCart(selectCartCount);
  const subtotal = useCart(selectSubtotalCents);
  const open = useCart((s) => s.openCart);
  const locationSlug = useCart((s) => s.locationSlug);
  const loc = LOCATIONS.find((l) => l.slug === locationSlug);

  if (!hasHydrated) return null;
  if (count === 0) return null;

  // Always render on order routes; otherwise only on root + locations.
  const onOrderRoute = pathname.startsWith('/order') || pathname.startsWith('/menu');
  const onLandingRoute = pathname === '/' || pathname.startsWith('/locations') || pathname.startsWith('/regions') || pathname.startsWith('/story') || pathname.startsWith('/journal');
  if (!onOrderRoute && !onLandingRoute) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="cart-bar"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="lg:hidden fixed inset-x-0 bottom-0 z-40"
      >
        <div className="bg-caffe text-carta border-t border-caffe-soft px-3 py-3">
          <button
            type="button"
            onClick={open}
            className="w-full h-12 px-4 bg-peperoncino text-carta rounded-sm flex items-center justify-between gap-3 hover:bg-peperoncino-soft transition-colors"
          >
            <span className="flex items-center gap-3">
              <span className="relative inline-flex items-center justify-center w-7 h-7 bg-carta/15 rounded-full">
                <ShoppingBag size={14} aria-hidden />
                <span className="absolute -top-1 -right-1 num text-[10px] bg-bergamot text-caffe w-4 h-4 rounded-full flex items-center justify-center font-medium">
                  {count}
                </span>
              </span>
              <span className="font-medium tracking-tight">
                {count} item{count === 1 ? '' : 's'}
                {loc && <span className="text-carta/75 font-normal"> · {loc.shortName}</span>}
              </span>
            </span>
            <span className="num font-display text-lg">{formatPrice(subtotal)}</span>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
