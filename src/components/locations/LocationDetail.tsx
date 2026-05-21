'use client';

import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Navigation } from 'lucide-react';
import type { Location } from '@/data/locations';
import { DAY_KEYS, getOpenStatus, formatRange, weekdayLabel } from '@/lib/hours';

interface Props {
  location: Location;
}

export function LocationDetailHero({ location }: Props) {
  const status = getOpenStatus(location.hours, location.timezone);
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${location.address.line1}, ${location.address.city}, ${location.address.state} ${location.address.zip}`,
  )}`;

  return (
    <section className="relative bg-caffe text-carta" aria-labelledby="location-heading">
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(26,22,20,0.45), rgba(26,22,20,0.85)), url('${location.hero.src}')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-monogram/40 via-caffe to-caffe -z-10" aria-hidden />
      </div>

      <div className="container-edge relative section-tight">
        <p className="label-it text-bergamot mb-4">
          {location.city === 'miami-beach' ? 'Miami Beach · ' : 'New York · '}
          {location.neighborhood.name}
          {location.flagship && ' · Flagship'}
        </p>
        <h1
          id="location-heading"
          className="font-display text-balance"
          style={{ fontSize: 'var(--text-display)' }}
        >
          {location.shortName}
        </h1>
        <p className="mt-4 text-xl text-carta/85 max-w-2xl text-pretty">
          {location.neighborhood.note}
        </p>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 border-t border-carta/15 pt-8 max-w-4xl">
          <div>
            <p className="label-it text-carta/60 mb-2">Address</p>
            <p className="text-carta">{location.address.line1}</p>
            <p className="text-carta/85">
              {location.address.city}, {location.address.state} {location.address.zip}
            </p>
          </div>
          <div>
            <p className="label-it text-carta/60 mb-2">Today</p>
            <p className="flex items-center gap-2">
              <span className={status.open ? 'dot-open' : 'dot-closed'} aria-hidden />
              <span className={status.open ? 'text-bergamot font-medium' : 'text-carta/70'}>
                {status.message}
              </span>
            </p>
          </div>
          <div>
            <p className="label-it text-carta/60 mb-2">Phone</p>
            <a href={`tel:${location.phone}`} className="text-carta hover:text-bergamot">
              {location.phoneFormatted}
            </a>
          </div>
          <div>
            <p className="label-it text-carta/60 mb-2">Neighborhood</p>
            <p className="text-carta">{location.neighborhood.name}</p>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            href="/order"
            className="inline-flex items-center justify-center h-12 px-6 bg-peperoncino text-carta rounded-sm font-medium hover:bg-peperoncino-soft transition-colors"
          >
            Order from {location.shortName}
          </Link>
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 h-12 px-5 border border-carta/40 rounded-sm text-carta hover:bg-carta hover:text-caffe transition-colors"
          >
            <Navigation size={16} aria-hidden /> Directions
          </a>
          <a
            href={`tel:${location.phone}`}
            className="inline-flex items-center justify-center gap-2 h-12 px-5 border border-carta/40 rounded-sm text-carta hover:bg-carta hover:text-caffe transition-colors"
          >
            <Phone size={16} aria-hidden /> Call
          </a>
        </div>
      </div>
    </section>
  );
}

export function LocationHours({ location }: Props) {
  return (
    <section className="section bg-carta" aria-labelledby="hours-heading">
      <div className="container-edge grid md:grid-cols-2 gap-12 lg:gap-20">
        <div>
          <p className="label-it mb-3">Orari · Hours</p>
          <h2 id="hours-heading" className="font-display text-balance" style={{ fontSize: 'var(--text-h1)' }}>
            We&rsquo;re here {summarizeWeekHours(location)}.
          </h2>
          <p className="mt-4 text-caffe-soft text-pretty max-w-prose">
            Open kitchen, fresh pasta every morning. Pastry from 7am. Walk in, beep,
            eat. Reservations only for groups of 8 or more.
          </p>
        </div>
        <div>
          <table className="w-full text-sm">
            <tbody className="divide-y divide-carta-deep">
              {DAY_KEYS.map((day) => (
                <tr key={day} className="py-2">
                  <td className="py-3 label-it text-caffe-soft">{weekdayLabel(day)}</td>
                  <td className="py-3 num text-right text-caffe">
                    {formatRange(location.hours[day])}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function LocationNeighborhood({ location }: Props) {
  const { neighborhood } = location;
  return (
    <section className="section-tight bg-carta-deep" aria-labelledby="neighborhood-heading">
      <div className="container-edge grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <p className="label-it mb-3">Quartiere · Neighborhood</p>
          <h2
            id="neighborhood-heading"
            className="font-display tracking-tight text-balance"
            style={{ fontSize: 'var(--text-h2)' }}
          >
            {neighborhood.name}
          </h2>
        </div>
        <div className="md:col-span-7 space-y-6">
          <p className="text-lg text-caffe-soft text-pretty max-w-prose">{neighborhood.note}</p>
          {neighborhood.transit && (
            <div>
              <p className="label-it mb-1">Transit</p>
              <p className="text-caffe-soft">{neighborhood.transit}</p>
            </div>
          )}
          {neighborhood.parking && (
            <div>
              <p className="label-it mb-1">Parking</p>
              <p className="text-caffe-soft">{neighborhood.parking}</p>
            </div>
          )}
          <div className="flex flex-wrap gap-2 pt-2">
            {location.features.map((f) => (
              <span key={f} className="chip">{f.replaceAll('-', ' ')}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function summarizeWeekHours(loc: Location): string {
  const monday = loc.hours.monday;
  if (monday === 'closed') return 'most of the week';
  return `from ${monday.open.split(':')[0]}am most of the week`;
}
