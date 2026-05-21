'use client';

import Link from 'next/link';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { Reveal, StaggerChildren, StaggerItem } from '@/components/ui/MotionSection';

const TEASERS = [
  {
    slug: 'why-bergamot-only-grows-in-calabria',
    kind: 'Region',
    title: 'Why bergamot only grows in Calabria',
    dek: 'It needs a specific 60-mile stretch of Ionian coast. The world\'s perfumers have known since the 1700s. So have the Iera brothers.',
    region: 'Calabria',
    accent: 'bergamot',
    image: '/images/menu/spritz-calabrese.jpg',
  },
  {
    slug: 'the-mill-behind-our-pasta-flour',
    kind: 'Supplier',
    title: 'The mill behind our pasta flour',
    dek: 'Why we drive an extra hundred kilometers for the flour from a single mill in Altamura.',
    region: 'Puglia',
    accent: 'olive',
    image: '/images/menu/orecchiette.jpg',
  },
  {
    slug: 'a-walking-tour-of-italian-midtown',
    kind: 'Neighborhood',
    title: 'A walking tour of Italian Midtown',
    dek: 'From the espresso at 5th Ave to the cacio e pepe near Penn Station. Fifteen minutes on foot.',
    region: 'NYC',
    accent: 'peperoncino',
    image: '/images/menu/cappuccino.jpg',
  },
];

export function JournalTeaser() {
  return (
    <section className="section bg-carta" aria-labelledby="journal-heading">
      <div className="container-edge">
        <Reveal as="div" className="flex flex-wrap items-end justify-between gap-6 mb-14 lg:mb-20">
          <div>
            <p className="label-it mb-3">Giornale · The journal</p>
            <h2
              id="journal-heading"
              className="font-display tracking-tight text-balance"
              style={{ fontSize: 'var(--text-display)' }}
            >
              From our <span className="italic">kitchens</span>.
            </h2>
          </div>
          <ArrowLink href="/journal" className="text-lg">All journal pieces</ArrowLink>
        </Reveal>

        <StaggerChildren className="grid md:grid-cols-3 gap-x-8 gap-y-12">
          {TEASERS.map((t) => (
            <StaggerItem key={t.slug}>
              <article className="group h-full flex flex-col">
                <Link href={`/journal/${t.slug}`} className="block">
                  <div className="aspect-[5/4] bg-carta-deep rounded-sm overflow-hidden mb-5 relative">
                    <div
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700 ease-[var(--ease-default)]"
                      style={{ backgroundImage: `url('${t.image}')` }}
                      aria-hidden
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-caffe/40 to-transparent" aria-hidden />
                    <div className="absolute top-4 left-4 chip chip-accent bg-carta/95">
                      {t.kind} · {t.region}
                    </div>
                  </div>
                  <h3 className="font-display text-2xl lg:text-3xl tracking-tight leading-tight text-balance group-hover:text-peperoncino transition-colors">
                    {t.title}
                  </h3>
                  <p className="mt-3 text-caffe-soft text-pretty">{t.dek}</p>
                  <p className="mt-5 link-editorial text-sm inline-block">Read →</p>
                </Link>
              </article>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
