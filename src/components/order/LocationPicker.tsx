'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X } from 'lucide-react';
import { LOCATIONS, CITIES, type Location, type CitySlug } from '@/data/locations';
import { getOpenStatus, formatRange } from '@/lib/hours';
import { useCart } from '@/lib/cart/store';

/**
 * Full-screen location picker modal. Opens automatically on first visit when
 * no location is selected and the user lands on an ordering surface. Can also
 * be opened from the top-bar pill.
 */
export function LocationPicker() {
  const isOpen = useCart((s) => s.isLocationPickerOpen);
  const close = useCart((s) => s.closeLocationPicker);
  const setLocation = useCart((s) => s.setLocation);
  const currentSlug = useCart((s) => s.locationSlug);

  // Lock body scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const orig = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = orig;
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] bg-caffe/95 backdrop-blur-sm overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Pick a trattoria"
        >
          <div className="container-edge py-10 lg:py-16">
            <div className="flex items-start justify-between mb-10">
              <div>
                <p className="label-it text-bergamot mb-2">Trovaci · Pick a trattoria</p>
                <h2
                  className="font-display text-balance text-carta"
                  style={{ fontSize: 'var(--text-h1)', lineHeight: 0.95 }}
                >
                  Where would you like <span className="italic">to eat</span>?
                </h2>
                <p className="mt-3 text-carta/70 max-w-prose">
                  Menu and hours vary by location. Pick one — we&rsquo;ll show you
                  what&rsquo;s available now.
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="text-carta/70 hover:text-carta inline-flex items-center justify-center w-12 h-12 -mr-2"
              >
                <X size={22} />
              </button>
            </div>

            <div className="space-y-10">
              {(Object.entries(CITIES) as [CitySlug, typeof CITIES[CitySlug]][]).map(
                ([city, meta]) => {
                  const locs = LOCATIONS.filter((l) => l.city === city);
                  return (
                    <section key={city}>
                      <p className="label-it text-bergamot mb-4">{meta.name}</p>
                      <div className="grid md:grid-cols-2 gap-4">
                        {locs.map((loc) => (
                          <LocationCard
                            key={loc.slug}
                            loc={loc}
                            isCurrent={currentSlug === loc.slug}
                            onPick={() => setLocation(loc.slug)}
                          />
                        ))}
                      </div>
                    </section>
                  );
                },
              )}
            </div>

            <p className="mt-10 text-sm text-carta/60 text-center">
              Looking for a different city?{' '}
              <Link href="/locations" className="link-editorial text-carta">
                See all locations
              </Link>
              {' · '}
              <Link href="/franchising" className="link-editorial text-carta">
                or partner with us
              </Link>
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface CardProps {
  loc: Location;
  isCurrent: boolean;
  onPick: () => void;
}

function LocationCard({ loc, isCurrent, onPick }: CardProps) {
  const status = getOpenStatus(loc.hours, loc.timezone);
  return (
    <button
      type="button"
      onClick={onPick}
      disabled={loc.preLaunch}
      className={`group text-left rounded-sm overflow-hidden border-2 transition-colors ${
        loc.preLaunch
          ? 'border-bergamot/30 bg-caffe/40 opacity-70 cursor-not-allowed'
          : isCurrent
            ? 'border-bergamot bg-monogram/40'
            : 'border-carta/15 hover:border-bergamot bg-caffe'
      }`}
    >
      <div className="grid grid-cols-[1fr_2fr] gap-4 items-stretch">
        <div className="aspect-[4/3] relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500 ease-[var(--ease-default)]"
            style={{ backgroundImage: `url('${loc.hero.src}')` }}
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-t from-caffe/40 to-transparent" aria-hidden />
          {loc.preLaunch && (
            <div className="absolute top-2 left-2 inline-flex items-center px-2 py-0.5 text-[10px] tracking-widest uppercase font-medium bg-bergamot text-caffe rounded-sm">
              Pre-launch
            </div>
          )}
        </div>
        <div className="py-3 pr-4 flex flex-col justify-center text-carta">
          <h3 className="font-display text-2xl tracking-tight">{loc.shortName}</h3>
          <p className="mt-1 text-sm text-carta/70 flex items-center gap-1.5">
            <MapPin size={12} aria-hidden />
            {loc.address.line1}
          </p>
          {loc.preLaunch ? (
            <p className="mt-2 text-sm text-bergamot italic">Opening soon · ordering not yet available</p>
          ) : (
            <>
              <p className="mt-2 text-sm flex items-center gap-2">
                <span className={status.open ? 'dot-open' : 'dot-closed'} aria-hidden />
                <span className={status.open ? 'text-bergamot font-medium' : 'text-carta/60'}>
                  {status.message}
                </span>
              </p>
              <p className="mt-1 text-xs text-carta/50 num">
                Today {formatRange(loc.hours.monday)}
              </p>
            </>
          )}
        </div>
      </div>
    </button>
  );
}
