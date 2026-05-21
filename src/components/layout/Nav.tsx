'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ITMonogram } from '@/components/brand/ITMonogram';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

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

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        scrolled || !isHome ? 'bg-carta/90 backdrop-blur-md border-b border-carta-deep' : 'bg-transparent',
      )}
    >
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="container-edge flex h-16 lg:h-20 items-center justify-between">
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
          <Button asChild size="sm" variant="primary" className="hidden sm:inline-flex">
            <Link href="/order">Order online</Link>
          </Button>
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
        <div
          id="mobile-nav"
          className="lg:hidden border-t border-carta-deep bg-carta"
        >
          <nav className="container-edge py-6 flex flex-col gap-1" aria-label="Mobile primary">
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
