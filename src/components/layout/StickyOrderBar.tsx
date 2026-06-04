'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart, selectCartCount } from '@/lib/cart/store';

/**
 * Mobile sticky bottom-bar Order CTA — appears after the user scrolls past
 * the hero. Yields to CartBar when the user has items in their cart and to
 * specific routes where it would just get in the way.
 */
export function StickyOrderBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const hasHydrated = useCart((s) => s.hasHydrated);
  const cartCount = useCart(selectCartCount);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Yield to CartBar when the user has items.
  if (hasHydrated && cartCount > 0) return null;

  // Hide on routes where it's not appropriate.
  if (
    pathname.startsWith('/catering') ||
    pathname.startsWith('/private-events') ||
    pathname.startsWith('/order') ||
    pathname.startsWith('/menu')
  ) {
    return null;
  }

  const copy = (() => {
    if (pathname.startsWith('/regions/calabria')) return { primary: 'Order Calabrian', href: '/order' };
    if (pathname.startsWith('/regions/')) return { primary: 'Order this region', href: '/order' };
    if (pathname.startsWith('/locations/')) return { primary: 'Order from this location', href: '/order' };
    return { primary: 'Order online', href: '/order' };
  })();

  return (
    <div
      className={`lg:hidden fixed inset-x-0 bottom-0 z-40 transition-transform duration-500 ease-[var(--ease-default)] ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      aria-hidden={!visible}
    >
      <div className="bg-caffe text-carta border-t border-caffe-soft">
        <div className="container-edge py-3 flex items-center gap-3">
          <Link
            href={copy.href}
            className="flex-1 inline-flex items-center justify-center h-12 bg-peperoncino text-carta rounded-sm font-medium tracking-tight"
          >
            {copy.primary}
          </Link>
          <Link
            href="/locations"
            className="inline-flex items-center justify-center h-12 px-4 border border-carta/30 rounded-sm text-carta/90"
          >
            Locations
          </Link>
        </div>
      </div>
    </div>
  );
}
