import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { Reveal, StaggerChildren, StaggerItem } from '@/components/ui/MotionSection';

export const metadata = pageMetadata({
  title: 'Journal — Suppliers, regions, neighborhoods',
  description:
    'Stories from our kitchens. The producers behind our pasta, the regions on our menu, the neighborhoods we cook in.',
  path: '/journal',
});

const ENTRIES = [
  {
    slug: 'cipolla-rossa-di-tropea',
    kind: 'Region',
    region: 'Calabria',
    title: 'The Tropea red onion, and the soil that makes it sweet',
    dek: 'It looks like a regular red onion. It tastes like fruit. Same species, different geology.',
    date: '2026-05-29',
  },
  {
    slug: 'caffe-borbone-napoli',
    kind: 'Supplier',
    region: 'Campania',
    title: 'Caffè Borbone, and why our cappuccino tastes like Naples',
    dek: "We tested 14 espresso blends. We picked the one that tasted like the cafés the brothers grew up walking into.",
    date: '2026-05-15',
  },
  {
    slug: 'italian-breakfast-7am-midtown',
    kind: 'Neighborhood',
    region: 'NYC',
    title: 'Italian breakfast at 7am in Midtown',
    dek: 'A morning at 390 5th Avenue is the best thing about commuting to Midtown. We mean that.',
    date: '2026-05-08',
  },
  {
    slug: 'why-bergamot-only-grows-in-calabria',
    kind: 'Region',
    region: 'Calabria',
    title: 'Why bergamot only grows in Calabria',
    dek: "It needs a specific 60-mile stretch of Ionian coast. The world's perfumers have known since the 1700s. So have the Iera brothers.",
    date: '2026-05-02',
  },
  {
    slug: 'madeo-nduja-crucoli',
    kind: 'Supplier',
    region: 'Calabria',
    title: "Madeo, the n'duja, and the hill town of Crucoli",
    dek: "We get our n'duja from a single salumificio in a town of 3,000 people. They've been making it the same way since 1925.",
    date: '2026-04-30',
  },
  {
    slug: 'the-mill-behind-our-pasta-flour',
    kind: 'Supplier',
    region: 'Puglia',
    title: 'The mill behind our pasta flour',
    dek: 'Why we drive an extra hundred kilometers for the flour from a single mill in Altamura.',
    date: '2026-04-21',
  },
  {
    slug: 'a-walking-tour-of-italian-midtown',
    kind: 'Neighborhood',
    region: 'NYC',
    title: 'A walking tour of Italian Midtown',
    dek: 'From the espresso at 5th Ave to the carbonara near Penn Station. Fifteen minutes on foot.',
    date: '2026-04-08',
  },
  {
    slug: 'pasquini-mortadella',
    kind: 'Supplier',
    region: 'Emilia-Romagna',
    title: 'Pasquini, and the mortadella you can taste',
    dek: "A 110-year-old salumeria in Bologna, and why we won't buy mortadella from anyone else.",
    date: '2026-03-15',
  },
];

export default function JournalIndexPage() {
  return (
    <>
      <section className="section bg-carta">
        <div className="container-edge">
          <Reveal as="p" className="label-it mb-3">Giornale · Journal</Reveal>
          <Reveal as="h1" delay={0.1}>
            <span className="font-display tracking-tight text-balance max-w-4xl block" style={{ fontSize: 'var(--text-display)' }}>
              From our <span className="italic">kitchens</span>.
            </span>
          </Reveal>
          <Reveal as="p" delay={0.2} className="mt-6 text-lg text-caffe-soft max-w-2xl text-pretty">
            Why we drive to a specific mill in Altamura. Why bergamot doesn&apos;t grow
            outside Calabria. What changes when fresh pasta is made on-site every morning.
            Once or twice a month, from Renato, Gio, and the kitchens.
          </Reveal>
        </div>
      </section>

      <section className="section-tight bg-carta-deep border-t border-carta">
        <div className="container-edge">
          <StaggerChildren className="divide-y divide-carta">
            {ENTRIES.map((e) => (
              <StaggerItem key={e.slug}>
                <Link href={`/journal/${e.slug}`} className="group grid md:grid-cols-12 gap-6 py-8 items-start">
                  <div className="md:col-span-2">
                    <p className="label-it text-caffe-mute">{e.kind}</p>
                    <p className="text-xs text-caffe-mute mt-1">{e.region}</p>
                  </div>
                  <div className="md:col-span-8">
                    <h2 className="font-display text-3xl tracking-tight group-hover:text-peperoncino transition-colors text-balance">
                      {e.title}
                    </h2>
                    <p className="mt-2 text-caffe-soft text-pretty max-w-prose">{e.dek}</p>
                  </div>
                  <div className="md:col-span-2 md:text-right text-sm text-caffe-mute">
                    {new Date(e.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>
    </>
  );
}
