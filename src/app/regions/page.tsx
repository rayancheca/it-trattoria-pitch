import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { REGIONS } from '@/data/regions';

export const metadata = pageMetadata({
  title: 'Eat by Region — Italy on the menu',
  description:
    'From Calabria to Emilia-Romagna, every dish has a home. Explore the regional roots of the IT menu.',
  path: '/regions',
});

export default function RegionsPage() {
  return (
    <>
      <section className="section bg-carta">
        <div className="container-edge">
          <p className="label-it mb-3">Regioni · Italy</p>
          <h1
            className="font-display tracking-tight text-balance max-w-5xl"
            style={{ fontSize: 'var(--text-display)' }}
          >
            Every dish has a <span className="italic">home</span>.
          </h1>
          <p className="mt-6 text-lg text-caffe-soft max-w-2xl text-pretty">
            The IT menu reads like a tour of Italy — Calabria&rsquo;s peperoncino,
            Emilia&rsquo;s parmigiano, Liguria&rsquo;s basil. Pick a region. We&rsquo;ll
            tell you what to eat from there.
          </p>
        </div>
      </section>

      <section className="section-tight bg-cartaDeep border-t border-carta">
        <div className="container-edge">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {REGIONS.map((r) => (
              <Link key={r.slug} href={`/regions/${r.slug}`} className="group block">
                <div className="aspect-[4/3] bg-carta rounded-sm overflow-hidden mb-4 relative">
                  <div
                    className="absolute inset-0 transition-transform duration-700 ease-[var(--ease-default)] group-hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, var(--color-${r.accentColor}) 0%, var(--color-cartaDeep) 100%)`,
                    }}
                    aria-hidden
                  />
                  <p className="absolute top-4 left-4 label-it text-carta/90 drop-shadow">
                    {r.italianName}
                  </p>
                  <p className="absolute bottom-4 right-4 font-display text-5xl text-carta/80 drop-shadow leading-none">
                    {r.signatureDishes[0]?.split(' ')[0] ?? ''}
                  </p>
                </div>
                <h2 className="font-display text-2xl tracking-tight group-hover:text-peperoncino transition-colors">
                  {r.name}
                </h2>
                <p className="mt-1 text-caffe-soft text-pretty">{r.blurb}</p>
                {r.founderConnection && (
                  <p className="mt-2 label-it text-peperoncino">{r.founderConnection}</p>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
