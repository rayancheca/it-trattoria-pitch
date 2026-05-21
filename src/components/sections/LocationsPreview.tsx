'use client';

import Link from 'next/link';
import { ArrowUpRight, MapPin, Phone } from 'lucide-react';
import { LOCATIONS, CITIES, type Location } from '@/data/locations';
import { getOpenStatus, formatRange } from '@/lib/hours';
import { ArrowLink } from '@/components/ui/ArrowLink';

function statusFor(loc: Location) {
  return getOpenStatus(loc.hours, loc.timezone);
}

function locationHref(loc: Location): string {
  return `/locations/${loc.city}/${loc.slug.replace(`${loc.city}-`, '')}`;
}

export function LocationsPreview() {
  return (
    <section className="section bg-carta" aria-labelledby="locations-heading">
      <div className="container-edge">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12 lg:mb-16">
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
        </div>

        <div className="grid lg:grid-cols-2 gap-x-8 gap-y-16 lg:gap-y-20">
          {(Object.entries(CITIES) as ['miami-beach' | 'nyc', typeof CITIES[keyof typeof CITIES]][]).map(
            ([city, meta]) => {
              const locs = LOCATIONS.filter((l) => l.city === city);
              return (
                <div key={city}>
                  <div className="mb-6">
                    <h3 className="font-display text-4xl lg:text-5xl tracking-tight">
                      {meta.name}
                    </h3>
                    <p className="mt-2 text-caffe-soft">{meta.subtitle}</p>
                  </div>
                  <ul className="divide-y divide-carta-deep">
                    {locs.map((loc) => {
                      const status = statusFor(loc);
                      return (
                        <li key={loc.slug}>
                          <Link href={locationHref(loc)} className="group block py-5">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <h4 className="font-display text-2xl tracking-tight group-hover:text-peperoncino transition-colors">
                                  {loc.shortName}
                                </h4>
                                <p className="mt-1 text-sm text-caffe-soft flex items-center gap-1.5">
                                  <MapPin size={14} aria-hidden />
                                  {loc.address.line1}, {loc.address.city}
                                </p>
                              </div>
                              <div className="text-right shrink-0">
                                <p className="flex items-center justify-end gap-2 text-sm">
                                  <span className={status.open ? 'dot-open' : 'dot-closed'} aria-hidden />
                                  <span className={status.open ? 'text-monogram font-medium' : 'text-caffe-mute'}>
                                    {status.message}
                                  </span>
                                </p>
                                <p className="mt-1 text-xs text-caffe-mute num">
                                  {formatRange(loc.hours.monday)} today
                                </p>
                              </div>
                            </div>
                            <p className="mt-3 text-sm text-caffe-soft text-pretty">
                              {loc.neighborhood.note}
                            </p>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
}
