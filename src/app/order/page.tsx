import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { LOCATIONS, CITIES, type CitySlug } from '@/data/locations';
import { getOpenStatus, formatRange } from '@/lib/hours';

export const metadata = pageMetadata({
  title: 'Order Online',
  description:
    'Order fresh pasta, pizza alla pala, and dolci from your nearest IT trattoria. Miami Beach + NYC.',
  path: '/order',
});

export default function OrderPage() {
  return (
    <>
      <section className="section bg-carta">
        <div className="container-edge">
          <p className="label-it mb-3">Ordina · Order online</p>
          <h1
            className="font-display tracking-tight text-balance max-w-4xl"
            style={{ fontSize: 'var(--text-display)' }}
          >
            Pick your <span className="italic">trattoria</span>.
          </h1>
          <p className="mt-6 text-lg text-caffe-soft max-w-2xl text-pretty">
            Menu varies slightly by location — pasta runs out, pizza alla pala by the slice
            differs. Pick where you are; we&rsquo;ll show you what&rsquo;s available now.
          </p>
        </div>
      </section>

      {(Object.entries(CITIES) as [CitySlug, typeof CITIES[CitySlug]][]).map(([city, meta]) => {
        const locs = LOCATIONS.filter((l) => l.city === city);
        return (
          <section key={city} className="section-tight bg-cartaDeep border-t border-carta">
            <div className="container-edge">
              <h2 className="font-display text-3xl tracking-tight mb-6">{meta.name}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {locs.map((loc) => {
                  const status = getOpenStatus(loc.hours, loc.timezone);
                  return (
                    <div key={loc.slug} className="bg-carta p-6 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-cartaDeep">
                      <div>
                        <h3 className="font-display text-2xl tracking-tight">{loc.shortName}</h3>
                        <p className="mt-1 text-sm text-caffe-soft">{loc.address.line1}</p>
                        <p className="mt-1 flex items-center gap-2 text-sm">
                          <span className={status.open ? 'dot-open' : 'dot-closed'} aria-hidden />
                          <span className={status.open ? 'text-monogram' : 'text-caffe-mute'}>
                            {status.message}
                          </span>
                          <span className="text-caffe-mute">· today {formatRange(loc.hours.monday)}</span>
                        </p>
                      </div>
                      <Link
                        href={`https://order.it-trattoria.com/${loc.slug}`}
                        className="inline-flex items-center justify-center h-11 px-5 bg-peperoncino text-carta rounded-sm font-medium hover:bg-peperoncino-soft transition-colors whitespace-nowrap"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Order from here
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}

      <section className="section bg-carta">
        <div className="container-narrow text-center">
          <p className="label-it mb-3">Or browse</p>
          <h2 className="font-display text-balance" style={{ fontSize: 'var(--text-h1)' }}>
            Just looking? <Link href="/menu" className="italic underline decoration-1 underline-offset-8">See the menu</Link>.
          </h2>
        </div>
      </section>
    </>
  );
}
