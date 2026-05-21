import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { LOCATIONS } from '@/data/locations';

export const metadata = pageMetadata({
  title: 'Reservations',
  description: 'Most IT locations are walk-in. For groups of 8+ or private events, get in touch.',
  path: '/reserve',
});

export default function ReservePage() {
  return (
    <>
      <section className="section bg-carta">
        <div className="container-edge">
          <p className="label-it mb-3">Prenotare · Reservations</p>
          <h1
            className="font-display tracking-tight text-balance max-w-4xl"
            style={{ fontSize: 'var(--text-display)' }}
          >
            We&rsquo;re mostly <span className="italic">walk-in</span>.
          </h1>
          <p className="mt-6 text-lg text-caffe-soft max-w-2xl text-pretty">
            IT is a counter. Most days, most hours, you walk in and beep. For groups of 8
            or more, we&rsquo;ll set you up — but we&rsquo;d rather you came for catering or
            a private event than tried to reserve.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/catering" className="inline-flex items-center justify-center h-12 px-6 bg-caffe text-carta rounded-sm font-medium hover:bg-monogram transition-colors">
              Catering inquiry
            </Link>
            <Link href="/private-events" className="inline-flex items-center justify-center h-12 px-6 border border-caffe rounded-sm hover:bg-caffe hover:text-carta transition-colors">
              Private event
            </Link>
          </div>
        </div>
      </section>

      <section className="section-tight bg-cartaDeep border-t border-carta">
        <div className="container-edge">
          <p className="label-it mb-3">Large groups (8+)</p>
          <p className="text-caffe-soft mb-6 max-w-prose">Call your nearest trattoria directly:</p>
          <ul className="divide-y divide-carta">
            {LOCATIONS.map((loc) => (
              <li key={loc.slug} className="py-4 flex justify-between">
                <span className="font-display text-2xl">{loc.shortName}</span>
                <a href={`tel:${loc.phone}`} className="num link-editorial">
                  {loc.phoneFormatted}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
