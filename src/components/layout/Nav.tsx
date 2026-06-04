'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, MapPin, ShoppingBag, X } from 'lucide-react';
import { ITMonogram } from '@/components/brand/ITMonogram';
import { cn } from '@/lib/utils';
import { useCart, selectCartCount } from '@/lib/cart/store';
import { LOCATIONS } from '@/data/locations';

const NAV_ITEMS = [
  { label: 'Menu', italian: 'Menù', href: '/menu' },
  { label: 'Regions', italian: 'Regioni', href: '/regions' },
  { label: 'Locations', italian: 'Trovaci', href: '/locations' },
  { label: 'Story', italian: 'Storia', href: '/story' },
  { label: 'Journal', italian: 'Giornale', href: '/journal' },
  { label: 'Catering', italian: 'Catering', href: '/catering' },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const hasHydrated = useCart((s) => s.hasHydrated);
  const cartCount = useCart(selectCartCount);
  const openCart = useCart((s) => s.openCart);
  const openLocationPicker = useCart((s) => s.openLocationPicker);
  const locationSlug = useCart((s) => s.locationSlug);
  const loc = LOCATIONS.find((l) => l.slug === locationSlug);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isHome = pathname === '/';
  const opaque = scrolled || !isHome;

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        opaque ? 'bg-carta/90 backdrop-blur-md border-b border-carta-deep' : 'bg-transparent',
      )}
    >
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="container-edge flex h-16 lg:h-20 items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2.5" aria-label="IT Trattoria, home">
          <ITMonogram size={36} />
          <span className="hidden sm:inline font-display text-[1.35rem] leading-none tracking-tight">
            trattoria
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
          {NAV_ITEMS.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'group relative text-[0.95rem] leading-none tracking-tight',
                  active ? 'text-peperoncino' : 'text-caffe hover:text-peperoncino',
                  'transition-colors duration-200',
                )}
              >
                <span>{item.label}</span>
                <span
                  aria-hidden
                  className="label-it block mt-1 text-[0.6rem] tracking-[0.18em] opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  {item.italian}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {/* Location pill */}
          <button
            type="button"
            onClick={openLocationPicker}
            className="hidden md:inline-flex items-center gap-1.5 h-9 px-3 border border-carta-deep rounded-sm text-sm hover:border-caffe transition-colors"
            aria-label="Change location"
          >
            <MapPin size={14} aria-hidden />
            <span className="font-medium">{hasHydrated && loc ? loc.shortName : 'Pick location'}</span>
          </button>

          {/* Cart pill */}
          <button
            type="button"
            onClick={openCart}
            className="relative inline-flex items-center gap-1.5 h-9 px-3 bg-caffe text-carta rounded-sm text-sm font-medium hover:bg-monogram transition-colors"
            aria-label={`Cart with ${cartCount} item${cartCount === 1 ? '' : 's'}`}
          >
            <ShoppingBag size={14} aria-hidden />
            <span className="hidden sm:inline">Cart</span>
            {hasHydrated && cartCount > 0 && (
              <span className="num bg-bergamot text-caffe rounded-full min-w-[18px] h-[18px] inline-flex items-center justify-center text-[10px] font-bold px-1">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 -mr-2"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-nav" className="lg:hidden border-t border-carta-deep bg-carta">
          <nav className="container-edge py-6 flex flex-col gap-1" aria-label="Mobile primary">
            <button
              type="button"
              onClick={() => { openLocationPicker(); setOpen(false); }}
              className="py-3 flex items-center justify-between border-b border-carta-deep text-left"
            >
              <span className="flex items-center gap-2 font-display text-2xl tracking-tight">
                <MapPin size={18} aria-hidden />
                {hasHydrated && loc ? loc.shortName : 'Pick a location'}
              </span>
              <span className="label-it">Change</span>
            </button>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'py-3 flex items-baseline justify-between border-b border-carta-deep',
                  pathname.startsWith(item.href) ? 'text-peperoncino' : 'text-caffe',
                )}
              >
                <span className="font-display text-2xl tracking-tight">{item.label}</span>
                <span className="label-it">{item.italian}</span>
              </Link>
            ))}
            <Link
              href="/order"
              className="mt-6 inline-flex items-center justify-center h-12 bg-caffe text-carta rounded-sm font-medium"
            >
              Order online
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
