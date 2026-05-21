import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { Reveal, StaggerChildren, StaggerItem } from '@/components/ui/MotionSection';
import { ParallaxImage } from '@/components/ui/ParallaxImage';

export const metadata = pageMetadata({
  title: 'Press',
  description: 'Press, mentions, and awards for IT — Italian Trattoria.',
  path: '/press',
});

interface FeatureCard {
  publication: string;
  kind: 'feature' | 'review' | 'mention' | 'list';
  city?: string;
  hed: string;
  dek: string;
  date: string;
}

const FEATURES: FeatureCard[] = [
  {
    publication: 'Eater Miami',
    kind: 'feature',
    city: 'Miami',
    hed: 'The Calabrian counter changing Collins Avenue',
    dek: '[PLACEHOLDER hed] Real coverage to land post launch.',
    date: 'TBD',
  },
  {
    publication: 'Time Out New York',
    kind: 'review',
    city: 'NYC',
    hed: 'Fresh pasta in 6 minutes, near Penn Station',
    dek: '[PLACEHOLDER hed] The 5pm commuter pitch deck.',
    date: 'TBD',
  },
  {
    publication: 'The Infatuation',
    kind: 'list',
    city: 'Both',
    hed: 'Best fast-casual Italian in America 2026',
    dek: '[PLACEHOLDER hed] Listicle slot we&rsquo;re targeting.',
    date: 'TBD',
  },
  {
    publication: 'Miami Herald',
    kind: 'feature',
    city: 'Miami',
    hed: 'Two brothers from Calabria opened on Collins. The line says everything.',
    dek: '[PLACEHOLDER hed] Founder profile, hometown angle.',
    date: 'TBD',
  },
  {
    publication: 'New York Times Food',
    kind: 'mention',
    city: 'NYC',
    hed: 'Where to eat near Bryant Park, by neighborhood',
    dek: '[PLACEHOLDER hed] Dining-guide slot for the 5th Ave store.',
    date: 'TBD',
  },
  {
    publication: 'Condé Nast Traveler',
    kind: 'list',
    city: 'Both',
    hed: '36 Hours in Miami Beach',
    dek: '[PLACEHOLDER hed] Travel-itinerary slot for Collins Ave.',
    date: 'TBD',
  },
];

const TARGETS = ['Eater', 'Time Out', 'The Infatuation', 'NY Times', 'Miami Herald', 'Vogue Italia', 'Bon Appétit', 'Resy Blog'];

export default function PressPage() {
  return (
    <>
      <section className="relative bg-caffe text-carta" style={{ minHeight: '60svh' }}>
        <div className="absolute inset-0">
          <ParallaxImage
            src="/images/menu/tagliatelle-ragu.jpg"
            alt=""
            className="absolute inset-0"
            intensity={8}
            overlay="bg-gradient-to-b from-caffe/55 via-caffe/75 to-caffe"
          />
        </div>
        <div className="container-edge relative section flex flex-col justify-end" style={{ minHeight: '60svh' }}>
          <Reveal as="p" className="label-it text-bergamot mb-4">
            Stampa · Press
          </Reveal>
          <Reveal as="h1" delay={0.1}>
            <span
              className="font-display tracking-tight text-balance max-w-4xl block"
              style={{ fontSize: 'var(--text-display)', lineHeight: 0.95 }}
            >
              In the room with the <span className="italic">right writers</span>.
            </span>
          </Reveal>
          <Reveal as="p" delay={0.2} className="mt-6 text-lg text-carta/85 max-w-2xl text-pretty">
            Press inquiries, image requests, and chef availability. We respond within
            24 hours during a press week, faster during a launch.
          </Reveal>
          <Reveal as="div" delay={0.3} className="mt-8 flex flex-wrap gap-3">
            <a
              href="mailto:press@it-trattoria.com"
              className="inline-flex items-center justify-center h-12 px-6 bg-peperoncino text-carta rounded-sm font-medium hover:bg-peperoncino-soft transition-colors"
            >
              Email press@it-trattoria.com
            </a>
            <a
              href="/press-kit.zip"
              className="inline-flex items-center justify-center h-12 px-6 border border-carta rounded-sm hover:bg-carta hover:text-caffe transition-colors"
            >
              Download press kit (placeholder)
            </a>
          </Reveal>
        </div>
      </section>

      <section className="bg-bergamot/15 border-y border-bergamot/30">
        <div className="container-edge py-6">
          <p className="text-sm text-caffe-soft text-pretty max-w-4xl">
            <strong className="text-caffe">Note for the founders.</strong> Per the
            engagement brief, we don&rsquo;t fabricate quotes attributed to real
            publications. The slots below are <em>designed shells</em> for real coverage
            once earned — through a press push during the production launch — or
            backfilled with coverage you already have. Replace each card&rsquo;s copy
            once verified.
          </p>
        </div>
      </section>

      <section className="section bg-carta">
        <div className="container-edge">
          <Reveal as="div" className="mb-12 lg:mb-16 max-w-2xl">
            <p className="label-it mb-3">Featured in · Da leggere</p>
            <h2 className="font-display text-balance" style={{ fontSize: 'var(--text-h1)' }}>
              Six pieces, six angles.
            </h2>
            <p className="mt-4 text-caffe-soft text-pretty">
              The press strategy: a founder profile per city, a review for each Manhattan
              opening, a Miami beach-week piece, and the listicle slots that drive most of
              the traffic.
            </p>
          </Reveal>
          <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {FEATURES.map((f) => (
              <StaggerItem key={f.publication + f.hed}>
                <article className="group h-full flex flex-col">
                  <p className="font-display text-2xl tracking-tight">{f.publication}</p>
                  <div className="mt-2 flex items-center gap-3 text-xs label-it text-caffe-mute">
                    <span>{f.kind}</span>
                    {f.city && <><span aria-hidden>·</span><span>{f.city}</span></>}
                    <span aria-hidden>·</span>
                    <span>{f.date}</span>
                  </div>
                  <h3 className="mt-5 font-display text-2xl lg:text-3xl tracking-tight leading-tight text-balance">
                    &ldquo;{f.hed}&rdquo;
                  </h3>
                  <p className="mt-3 text-sm text-caffe-mute italic">{f.dek}</p>
                </article>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <section className="section-tight bg-carta-deep">
        <div className="container-edge">
          <p className="label-it mb-6 text-center">Targets · Obiettivi</p>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-5">
            {TARGETS.map((t) => (
              <p key={t} className="font-display text-2xl lg:text-3xl tracking-tight text-caffe-mute hover:text-caffe transition-colors cursor-default">
                {t}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-caffe text-carta">
        <div className="container-edge grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <p className="label-it text-bergamot mb-3">For journalists</p>
            <h2 className="font-display text-balance" style={{ fontSize: 'var(--text-h1)' }}>
              What we can offer.
            </h2>
          </div>
          <div className="md:col-span-7 space-y-6 text-carta/85 text-lg leading-relaxed">
            <p>
              Founder availability for interviews (Renato cooks, Gio talks, Maxence
              answers the operations questions). Chef-table tastings at any of the four
              US trattorias on 48 hours notice. High-resolution food and interior
              photography, on request.
            </p>
            <p>
              Original angles we can support: the Calabrian regional story, the
              French-to-US expansion playbook, the open-kitchen counter format, the
              fresh-pasta supply chain, the bergamot-tiramisù origin recipe.
            </p>
            <p className="text-base">
              <a href="mailto:press@it-trattoria.com" className="link-editorial">press@it-trattoria.com</a>
              {' '}—{' '}
              <Link href="/contact" className="link-editorial">general contact</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
