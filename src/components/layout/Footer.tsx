import Link from 'next/link';
import { Instagram } from 'lucide-react';
import { ITMonogram } from '@/components/brand/ITMonogram';
import { LOCATIONS } from '@/data/locations';
import { SITE } from '@/lib/seo';

const COLS: { title: string; italian: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Eat',
    italian: 'Mangia',
    links: [
      { label: 'Menu', href: '/menu' },
      { label: 'Build your pasta', href: '/menu/builder' },
      { label: 'Order online', href: '/order' },
      { label: 'Catering', href: '/catering' },
      { label: 'Gift cards', href: '/gift-cards' },
    ],
  },
  {
    title: 'Story',
    italian: 'Storia',
    links: [
      { label: 'Founders', href: '/story/founders' },
      { label: 'Calabria', href: '/regions/calabria' },
      { label: 'All regions', href: '/regions' },
      { label: 'Journal', href: '/journal' },
    ],
  },
  {
    title: 'Work',
    italian: 'Lavora',
    links: [
      { label: 'Careers', href: '/careers' },
      { label: 'Franchising', href: '/franchising' },
      { label: 'Press', href: '/press' },
      { label: 'Private events', href: '/private-events' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-caffe text-carta">
      <div className="container-edge section-tight">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-x-8 gap-y-12">
          {/* Find us */}
          <div className="col-span-2 md:col-span-4">
            <h3 className="label-it text-carta-deep mb-5">Find us · Trovaci</h3>
            <ul className="space-y-5">
              {LOCATIONS.map((loc) => (
                <li key={loc.slug}>
                  <Link
                    href={`/locations/${loc.city}/${loc.slug.slice(loc.city.length + 1)}`}
                    className="group block"
                  >
                    <p className="font-display text-2xl leading-none tracking-tight group-hover:text-bergamot transition-colors">
                      {loc.shortName}
                    </p>
                    <p className="mt-1 text-sm text-carta/70">
                      {loc.address.line1} · {loc.address.city}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Three text columns */}
          {COLS.map((col) => (
            <div key={col.title} className="col-span-1 md:col-span-2">
              <h3 className="label-it text-carta-deep mb-5">
                {col.title} · {col.italian}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-carta/85 hover:text-carta transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter + social */}
          <div className="col-span-2">
            <h3 className="label-it text-carta-deep mb-5">Subscribe</h3>
            <form className="space-y-3" action="/api/newsletter" method="post">
              <label className="sr-only" htmlFor="footer-newsletter">
                Email address
              </label>
              <input
                id="footer-newsletter"
                name="email"
                type="email"
                placeholder="your@email.com"
                required
                className="w-full h-11 px-3 bg-transparent border border-carta/30 rounded-sm text-carta placeholder:text-carta/50 focus:outline-none focus:border-carta"
              />
              <button
                type="submit"
                className="w-full h-11 bg-carta text-caffe rounded-sm font-medium hover:bg-bergamot transition-colors"
              >
                Subscribe
              </button>
            </form>
            <a
              href="https://www.instagram.com/it.trattoria.usa/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-carta/85 hover:text-carta"
            >
              <Instagram size={18} aria-hidden />
              <span>@it.trattoria.usa</span>
            </a>
          </div>
        </div>

        <hr className="my-12 border-carta/15" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="flex items-center gap-3">
            <ITMonogram size={40} />
            <p className="font-display text-3xl leading-none tracking-tight">trattoria</p>
          </div>
          <div className="text-sm text-carta/60 space-y-1">
            <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
            <p className="space-x-4">
              <Link href="/legal/privacy" className="hover:text-carta">Privacy</Link>
              <Link href="/legal/terms" className="hover:text-carta">Terms</Link>
              <Link href="/legal/accessibility" className="hover:text-carta">Accessibility</Link>
            </p>
            <p className="text-xs text-carta/40 mt-3 max-w-md">
              IT — Italian Trattoria. Founded 2014 in Paris by Renato &amp; Gio Iera. US locations in Miami Beach and New York.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
