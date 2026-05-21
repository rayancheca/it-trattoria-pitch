import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Careers — Work at IT Trattoria',
  description:
    'Join an Italian kitchen in Miami Beach or Manhattan. We hire on craft, not credentials. Email office.florida@it-trattoria.com.',
  path: '/careers',
});

const ROLES = [
  { title: 'Pasta cook', city: 'Miami Beach', kind: 'Full-time' },
  { title: 'Pizza cook (pala)', city: 'Miami Beach', kind: 'Full-time' },
  { title: 'Counter lead', city: 'NYC — Midtown', kind: 'Full-time' },
  { title: 'Barista (real Italian coffee)', city: 'NYC — Midtown', kind: 'Full-time' },
  { title: 'Catering coordinator', city: 'NYC — Midtown', kind: 'Full-time' },
  { title: 'General manager', city: 'Miami Beach', kind: 'Full-time' },
];

export default function CareersPage() {
  return (
    <>
      <section className="section bg-caffe text-carta">
        <div className="container-edge">
          <p className="label-it text-bergamot mb-4">Lavora con noi · Work with us</p>
          <h1
            className="font-display tracking-tight text-balance max-w-4xl"
            style={{ fontSize: 'var(--text-display)' }}
          >
            Cook the food <span className="italic">you&rsquo;d order yourself</span>.
          </h1>
          <p className="mt-6 text-lg text-carta/85 max-w-2xl text-pretty">
            We hire on craft. The fresh pasta has to be made every morning. The pizza has
            to come out right. The espresso has to taste like Naples. If that&rsquo;s
            interesting to you, we&rsquo;d like to hear from you.
          </p>
          <a
            href="mailto:office.florida@it-trattoria.com"
            className="mt-8 inline-flex items-center justify-center h-12 px-6 bg-peperoncino text-carta rounded-sm font-medium hover:bg-peperoncino-soft transition-colors"
          >
            Email office.florida@it-trattoria.com
          </a>
        </div>
      </section>

      <section className="section bg-carta">
        <div className="container-edge">
          <p className="label-it mb-3">Open roles</p>
          <ul className="divide-y divide-cartaDeep">
            {ROLES.map((r) => (
              <li key={r.title} className="py-5 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
                <div>
                  <h3 className="font-display text-2xl tracking-tight">{r.title}</h3>
                  <p className="text-sm text-caffe-soft mt-1">{r.city} · {r.kind}</p>
                </div>
                <a
                  href={`mailto:office.florida@it-trattoria.com?subject=Application: ${encodeURIComponent(r.title)} — ${encodeURIComponent(r.city)}`}
                  className="link-editorial text-lg"
                >
                  Apply →
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
