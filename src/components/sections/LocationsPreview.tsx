'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { LOCATIONS, CITIES, type Location } from '@/data/locations';
import { getOpenStatus, formatRange } from '@/lib/hours';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { Reveal, StaggerChildren, StaggerItem } from '@/components/ui/MotionSection';

function statusFor(loc: Location) {
  return getOpenStatus(loc.hours, loc.timezone);
}

function locationHref(loc: Location): string {
  return `/locations/${loc.city}/${loc.slug.slice(loc.city.length + 1)}`;
}

export function LocationsPreview() {
  return (
    <section className="bg-carta section" aria-labelledby="locations-heading">
      <div className="container-edge">
        <Reveal as="div" className="flex flex-wrap items-end justify-between gap-6 mb-14 lg:mb-20">
          <div>
            <p className="label-it mb-3">Trovaci · Find us</p>
            <h2
              id="locations-heading"
              className="font-display tracking-tight text-balance"
              style={{ fontSize: 'var(--text-display)' }}
            >
              Four trattorias.
              <br />
              <span className="italic">Two cities you already love.</span>
            </h2>
          </div>
          <ArrowLink href="/locations" className="text-lg">
            See all locations
          </ArrowLink>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-x-10 gap-y-16 lg:gap-y-20">
          {(Object.entries(CITIES) as ['miami-beach' | 'nyc', typeof CITIES[keyof typeof CITIES]][]).map(
            ([city, meta]) => {
              const locs = LOCATIONS.filter((l) => l.city === city);
              return (
                <Reveal key={city} as="div">
                  <div className="mb-7">
                    <h3 className="font-display text-5xl lg:text-6xl tracking-tight">{meta.name}</h3>
                    <p className="mt-2 text-caffe-soft">{meta.subtitle}</p>
                  </div>
                  <StaggerChildren className="space-y-5">
                    {locs.map((loc) => {
                      const status = statusFor(loc);
                      return (
                        <StaggerItem key={loc.slug}>
                          <Link href={locationHref(loc)} className="group block">
                            <div className="grid grid-cols-[1fr_2fr] gap-4 items-stretch">
                              <div className="aspect-[4/3] bg-carta-deep rounded-sm overflow-hidden relative">
                                <div
                                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700 ease-[var(--ease-default)]"
                                  style={{ backgroundImage: `url('${loc.hero.src}')` }}
                                  aria-hidden
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-caffe/40 to-transparent" aria-hidden />
                                <div className="absolute top-2 left-2 chip bg-carta/90 backdrop-blur-sm text-xs">
                                  <span className={status.open ? 'dot-open' : 'dot-closed'} aria-hidden />
                                  <span className={status.open ? 'text-monogram' : 'text-caffe-mute'}>
                                    {status.open ? 'Open' : 'Closed'}
                                  </span>
                                </div>
                              </div>
                              <div className="py-2 flex flex-col justify-center">
                                <h4 className="font-display text-3xl tracking-tight group-hover:text-peperoncino transition-colors">
                                  {loc.shortName}
                                </h4>
                                <p className="mt-1 text-sm text-caffe-soft flex items-center gap-1.5">
                                  <MapPin size={14} aria-hidden />
                                  {loc.address.line1}
                                </p>
                                <p className="mt-1 text-xs text-caffe-mute num">
                                  Today {formatRange(loc.hours.monday)} · {loc.phoneFormatted}
                                </p>
                                <motion.p
                                  initial={{ opacity: 0.7 }}
                                  whileHover={{ x: 4 }}
                                  transition={{ duration: 0.3 }}
                                  className="mt-3 text-sm text-caffe-soft text-pretty line-clamp-2"
                                >
                                  {loc.neighborhood.note}
                                </motion.p>
                              </div>
                            </div>
                          </Link>
                        </StaggerItem>
                      );
                    })}
                  </StaggerChildren>
                </Reveal>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
}
