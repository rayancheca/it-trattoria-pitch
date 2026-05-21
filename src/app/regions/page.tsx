import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { REGIONS, type ItalianRegion } from '@/data/regions';
import { Reveal, StaggerChildren, StaggerItem } from '@/components/ui/MotionSection';

export const metadata = pageMetadata({
  title: 'Eat by Region — Italy on the menu',
  description:
    'From Calabria to Emilia-Romagna, every dish has a home. Explore the regional roots of the IT menu.',
  path: '/regions',
});

const REGION_PHOTOS: Partial<Record<ItalianRegion, string>> = {
  calabria: '/images/regions/calabria.jpg',
  sicilia: '/images/regions/sicilia.jpg',
  campania: '/images/regions/campania.jpg',
  puglia: '/images/regions/puglia.jpg',
  lazio: '/images/regions/lazio.jpg',
  toscana: '/images/regions/toscana.jpg',
  'emilia-romagna': '/images/regions/emilia-romagna.jpg',
  liguria: '/images/regions/liguria.jpg',
};

export default function RegionsPage() {
  return (
    <>
      <section className="section bg-carta">
        <div className="container-edge">
          <Reveal as="p" className="label-it mb-3">
            Regioni · Italy
          </Reveal>
          <Reveal as="h1" delay={0.1}>
            <span
              className="font-display tracking-tight text-balance max-w-5xl block"
              style={{ fontSize: 'var(--text-display)' }}
            >
              Every dish has a <span className="italic">home</span>.
            </span>
          </Reveal>
          <Reveal as="p" delay={0.2} className="mt-6 text-lg text-caffe-soft max-w-2xl text-pretty">
            The IT menu reads like a tour of Italy — Calabria&rsquo;s peperoncino,
            Emilia&rsquo;s parmigiano, Liguria&rsquo;s basil. Pick a region. We&rsquo;ll
            tell you what to eat from there.
          </Reveal>
        </div>
      </section>

      <section className="section-tight bg-carta-deep border-t border-carta">
        <div className="container-edge">
          <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {REGIONS.map((r) => {
              const photo = REGION_PHOTOS[r.slug];
              return (
                <StaggerItem key={r.slug}>
                  <Link href={`/regions/${r.slug}`} className="group block">
                    <div className="aspect-[4/3] bg-carta rounded-sm overflow-hidden mb-4 relative">
                      {photo ? (
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-[var(--ease-default)] group-hover:scale-110"
                          style={{ backgroundImage: `url('${photo}')` }}
                          aria-hidden
                        />
                      ) : (
                        <div
                          className="absolute inset-0 transition-transform duration-700 ease-[var(--ease-default)] group-hover:scale-105"
                          style={{
                            background: `linear-gradient(135deg, var(--color-${r.accentColor}) 0%, var(--color-carta-deep) 100%)`,
                          }}
                          aria-hidden
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-caffe/55 via-transparent to-transparent" aria-hidden />
                      <p className="absolute top-4 left-4 label-it text-carta drop-shadow">
                        {r.italianName}
                      </p>
                      <p className="absolute bottom-4 left-4 right-4 font-display text-4xl text-carta drop-shadow-lg leading-none">
                        {r.name}
                      </p>
                    </div>
                    <p className="text-caffe-soft text-pretty">{r.blurb}</p>
                    {r.founderConnection && (
                      <p className="mt-2 label-it text-peperoncino">{r.founderConnection}</p>
                    )}
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerChildren>
        </div>
      </section>
    </>
  );
}
