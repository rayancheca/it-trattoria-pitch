'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * Mobile sticky bottom-bar Order CTA — appears after the user scrolls past
 * the hero. Copy is route-aware:
 *   /                → "Order online"
 *   /menu/...        → "Order from your nearest IT"
 *   /regions/calabria → "Order Calabrian"
 *   /locations/...   → "Order from this location"
 *   /catering        → hidden (form is the CTA on that page)
 *   /menu/builder    → "Send to checkout"
 */
export function StickyOrderBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (pathname.startsWith('/catering') || pathname.startsWith('/private-events')) return null;

  const copy = (() => {
    if (pathname.startsWith('/menu/builder')) return { primary: 'Send to checkout', href: '/order' };
    if (pathname.startsWith('/regions/calabria')) return { primary: 'Order Calabrian', href: '/order' };
    if (pathname.startsWith('/regions/')) return { primary: 'Order this region', href: '/order' };
    if (pathname.startsWith('/locations/')) return { primary: 'Order from this location', href: '/order' };
    if (pathname.startsWith('/menu')) return { primary: 'Order online', href: '/order' };
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
