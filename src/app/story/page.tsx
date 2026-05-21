import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { FOUNDERS } from '@/data/founders';
import { ArrowLink } from '@/components/ui/ArrowLink';

export const metadata = pageMetadata({
  title: 'Two Brothers, One Counter — Our Story',
  description:
    'From Calabria to Paris in 2014, to four trattorias across the US. The story of Renato and Gio Iera.',
  path: '/story',
});

export default function StoryPage() {
  const renato = FOUNDERS.find((f) => f.slug === 'renato');
  const gio = FOUNDERS.find((f) => f.slug === 'gio');
  const max = FOUNDERS.find((f) => f.slug === 'maxence');

  return (
    <>
      {/* Hero */}
      <section className="section bg-caffe text-carta relative isolate">
        <div className="absolute inset-0 bg-gradient-to-br from-monogram via-caffe to-caffe -z-10" aria-hidden />
        <div className="container-edge">
          <p className="label-it text-bergamot mb-4">Storia · Our story</p>
          <h1
            className="font-display text-balance max-w-5xl"
            style={{ fontSize: 'var(--text-display)' }}
          >
            Two brothers.
            <br />
            <span className="italic">One pasta machine.</span>
            <br />
            Eleven years.
            <br />
            <span className="italic">Four trattorias.</span>
          </h1>
        </div>
      </section>

      {/* Origin — Calabria */}
      <section className="section bg-carta">
        <div className="container-edge grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-4">
            <p className="label-it mb-3">1980s — Calabria</p>
            <h2 className="font-display text-balance" style={{ fontSize: 'var(--text-h1)' }}>
              The toe of Italy.
            </h2>
          </div>
          <div className="md:col-span-8 prose-editorial text-caffe-soft">
            <p>
              Calabria is mountains that fall straight into two seas. Peperoncino on every
              table. N&apos;duja you spread with a knife. Bergamot you can&apos;t grow
              anywhere else in the world. Renato and Gio Iera grew up here.
            </p>
            <p>
              Sunday pasta from their grandmother. Fresh swordfish at the market. A Vespa
              parked outside. The kind of childhood that becomes a menu later.
            </p>
            <Link href="/regions/calabria" className="link-editorial text-lg">
              Read about Calabria →
            </Link>
          </div>
        </div>
      </section>

      {/* Paris 2014 */}
      <section className="section bg-carta-deep border-t border-carta">
        <div className="container-edge grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-4">
            <p className="label-it mb-3">2014 — Paris</p>
            <h2 className="font-display text-balance" style={{ fontSize: 'var(--text-h1)' }}>
              One counter.
            </h2>
          </div>
          <div className="md:col-span-8 prose-editorial text-caffe-soft">
            <p>
              They moved to Paris in their twenties. Renato cooked in restaurants that
              taught him discipline and others that taught him what to avoid. Gio handled
              everything else.
            </p>
            <p>
              In 2014 they opened the first IT — a single counter with one pasta machine and
              one rule: cook the food they grew up eating. No table service. No reservations.
              Walk in, beep, eat.
            </p>
            <p>
              People came back. They opened a second. Then a third. Within five years, IT
              was the fastest-growing Italian counter chain in France.
            </p>
          </div>
        </div>
      </section>

      {/* Twenty stores */}
      <section className="section bg-carta">
        <div className="container-edge grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-4">
            <p className="label-it mb-3">2019–2023 — France</p>
            <h2 className="font-display text-balance" style={{ fontSize: 'var(--text-h1)' }}>
              Twenty trattorias.
            </h2>
          </div>
          <div className="md:col-span-8 prose-editorial text-caffe-soft">
            <p>
              By 2023, there were more than twenty IT trattorias across France. Maxence
              Lellouche joined as CEO — the reason there are now twenty stores instead of
              one, and the reason every one of them cooks like there&rsquo;s still only one.
            </p>
            <p>
              The fresh pasta is made on-site every morning. The Parmigiano comes from a
              40-cow farm in Reggio Emilia. The mortadella is from Pasquini in Bologna. The
              n&rsquo;duja is from Madeo in Crucoli. We tell you because we&apos;re proud.
            </p>
          </div>
        </div>
      </section>

      {/* US — 2024 */}
      <section className="section bg-monogram text-carta">
        <div className="container-edge grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-4">
            <p className="label-it text-bergamot mb-3">2024 — Miami Beach</p>
            <h2 className="font-display text-balance" style={{ fontSize: 'var(--text-h1)' }}>
              Atlantic crossing.
            </h2>
          </div>
          <div className="md:col-span-8 text-carta/90 space-y-4 text-lg leading-relaxed">
            <p>
              The first US store opened on Collins Avenue in November 2024. Lincoln Road
              followed in February. Manhattan&apos;s 7th Avenue and 5th Avenue in late
              2024 and early 2025.
            </p>
            <p>
              The food is the same as in Paris. The counter is the same. The pasta machine
              is the same. The bergamot tiramisù was their grandmother&apos;s recipe.
              That&rsquo;s the only marketing.
            </p>
            <div className="flex flex-wrap gap-6 pt-4">
              <ArrowLink href="/locations" className="text-carta text-lg">
                <span className="text-carta">Find your trattoria</span>
              </ArrowLink>
              <ArrowLink href="/regions/calabria" className="text-carta text-lg">
                <span className="text-carta">Eat Calabrian</span>
              </ArrowLink>
            </div>
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="section bg-carta">
        <div className="container-edge">
          <p className="label-it mb-3">I fondatori · The founders</p>
          <h2 className="font-display text-balance mb-12" style={{ fontSize: 'var(--text-h1)' }}>
            The people who answer the phone.
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[renato, gio, max].filter((f): f is NonNullable<typeof f> => Boolean(f)).map((f) => (
              <article key={f.slug}>
                <div className="aspect-[3/4] bg-carta-deep rounded-sm overflow-hidden mb-5 relative">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${f.portrait?.src ?? ''}')` }}
                    aria-hidden
                  />
                </div>
                <p className="label-it mb-1">{f.role}</p>
                <h3 className="font-display text-3xl tracking-tight">{f.name}</h3>
                <p className="text-sm text-caffe-mute mt-1">{f.hometown}</p>
                <p className="mt-3 text-caffe-soft text-pretty">{f.longBio ?? f.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
