import { pageMetadata } from '@/lib/seo';
import { LOCATIONS } from '@/data/locations';

export const metadata = pageMetadata({
  title: 'Private Dining',
  description: 'Buyouts and private events at our Miami Beach and NYC trattorias.',
  path: '/private-events',
});

const PE_LOCATIONS = LOCATIONS.filter((l) => l.privateEvents);

export default function PrivateEventsPage() {
  return (
    <>
      <section className="section bg-carta">
        <div className="container-edge">
          <p className="label-it mb-3">Eventi privati · Private events</p>
          <h1
            className="font-display tracking-tight text-balance max-w-4xl"
            style={{ fontSize: 'var(--text-display)' }}
          >
            Take over a <span className="italic">trattoria</span>.
          </h1>
          <p className="mt-6 text-lg text-caffe-soft max-w-2xl text-pretty">
            Birthdays, corporate dinners, rehearsal dinners. Two of our locations offer
            full buyouts. Patio takeovers available at Lincoln Road in warmer months.
          </p>
        </div>
      </section>

      <section className="section-tight bg-carta-deep border-t border-carta">
        <div className="container-edge">
          <p className="label-it mb-3">Available for buyouts</p>
          <ul className="divide-y divide-carta">
            {PE_LOCATIONS.map((loc) => (
              <li key={loc.slug} className="py-5 flex justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl tracking-tight">{loc.shortName}</h2>
                  <p className="text-sm text-caffe-soft">{loc.address.line1}, {loc.address.city}</p>
                </div>
                <a
                  href={`mailto:events@it-trattoria.com?subject=Private event at ${encodeURIComponent(loc.shortName)}`}
                  className="link-editorial text-lg"
                >
                  Inquire →
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
