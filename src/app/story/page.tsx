import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { FOUNDERS } from '@/data/founders';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { Reveal, StaggerChildren, StaggerItem } from '@/components/ui/MotionSection';
import { ParallaxImage } from '@/components/ui/ParallaxImage';

export const metadata = pageMetadata({
  title: 'Two Brothers, One Counter — Our Story',
  description:
    'From Calabria to Paris in 2014, to four trattorias across the US. The story of Renato and Gio Iera.',
  path: '/story',
});

interface Chapter {
  era: string;
  heading: string;
  italian?: string;
  body: string[];
  image: string;
  imageAlt: string;
  dark?: boolean;
}

const CHAPTERS: Chapter[] = [
  {
    era: '1980s · Calabria',
    heading: 'The toe of Italy.',
    italian: 'La punta dello stivale.',
    body: [
      'Calabria is mountains that fall straight into two seas. Peperoncino on every table. N&apos;duja you spread with a knife. Bergamot you can&apos;t grow anywhere else in the world. Renato and Gio Iera grew up here.',
      'Sunday pasta from their grandmother. Fresh swordfish at the market. A Vespa parked outside. The kind of childhood that becomes a menu later.',
    ],
    image: '/images/story/calabria-coast.jpg',
    imageAlt: 'Calabrian Ionian coast at golden hour',
  },
  {
    era: '2014 · Paris',
    heading: 'One counter.',
    italian: 'Un bancone.',
    body: [
      'They moved to Paris in their twenties. Renato cooked in restaurants that taught him discipline and others that taught him what to avoid. Gio handled everything else.',
      'In 2014 they opened the first IT — a single counter with one pasta machine and one rule: cook the food they grew up eating. No table service. No reservations. Walk in, beep, eat.',
      'People came back. They opened a second. Then a third. Within five years, IT was the fastest-growing Italian counter chain in France.',
    ],
    image: '/images/story/paris-2014.jpg',
    imageAlt: 'Parisian neighborhood street with cafe lights',
    dark: true,
  },
  {
    era: '2019–2023 · France',
    heading: 'Twenty trattorias.',
    italian: 'Venti trattorie.',
    body: [
      'By 2023, there were more than twenty IT trattorias across France. Maxence Lellouche joined as CEO — the reason there are now twenty stores instead of one, and the reason every one of them cooks like there&rsquo;s still only one.',
      'The fresh pasta is made on-site every morning. The Parmigiano comes from a 40-cow farm in Reggio Emilia. The mortadella is from Pasquini in Bologna. The n&rsquo;duja is from Madeo in Crucoli. We tell you because we&rsquo;re proud.',
    ],
    image: '/images/story/pasta-rolling.jpg',
    imageAlt: 'Hands rolling fresh tagliatelle dough',
  },
  {
    era: '2024 · Miami Beach',
    heading: 'Atlantic crossing.',
    italian: 'Attraversata.',
    body: [
      'The first US store opened on Collins Avenue in November 2024. Lincoln Road followed in February. Manhattan&rsquo;s 7th Avenue and 5th Avenue in late 2024 and early 2025.',
      'The food is the same as in Paris. The counter is the same. The pasta machine is the same. The bergamot tiramisù was their grandmother&rsquo;s recipe. That&rsquo;s the only marketing.',
    ],
    image: '/images/story/miami-beach.jpg',
    imageAlt: 'Miami Beach Art Deco district at sunset',
    dark: true,
  },
];

export default function StoryPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-caffe text-carta" style={{ minHeight: '70svh' }}>
        <div className="absolute inset-0">
          <ParallaxImage
            src="/images/story/calabria-village.jpg"
            alt=""
            className="absolute inset-0"
            intensity={10}
            overlay="bg-gradient-to-b from-caffe/30 via-caffe/55 to-caffe"
          />
        </div>
        <div className="container-edge relative section flex flex-col justify-end" style={{ minHeight: '70svh' }}>
          <Reveal as="p" className="label-it text-bergamot mb-4">
            Storia · Our story
          </Reveal>
          <Reveal as="h1" delay={0.1} className="font-display text-balance max-w-5xl" >
            <span style={{ fontSize: 'var(--text-display)', lineHeight: 0.92, display: 'block' }}>
              Two brothers.<br />
              <span className="italic">One pasta machine.</span><br />
              Eleven years.<br />
              <span className="italic">Four trattorias.</span>
            </span>
          </Reveal>
        </div>
      </section>

      {/* Chapters */}
      {CHAPTERS.map((c, i) => (
        <section
          key={c.era}
          className={c.dark ? 'bg-caffe text-carta' : i % 2 === 0 ? 'bg-carta' : 'bg-carta-deep'}
        >
          <div className="container-edge section grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <Reveal as="div" className={`lg:col-span-5 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
              <div className="aspect-[4/5] overflow-hidden rounded-sm relative">
                <ParallaxImage
                  src={c.image}
                  alt={c.imageAlt}
                  className="absolute inset-0"
                  intensity={8}
                />
              </div>
            </Reveal>
            <Reveal as="div" delay={0.1} className={`lg:col-span-7 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
              <p className={`label-it mb-4 ${c.dark ? 'text-bergamot' : ''}`}>{c.era}</p>
              <h2
                className="font-display text-balance"
                style={{ fontSize: 'var(--text-display)', lineHeight: 0.95 }}
              >
                {c.heading}
              </h2>
              {c.italian && (
                <p className="font-display italic text-3xl mt-2 opacity-60">{c.italian}</p>
              )}
              <div className={`prose-editorial mt-8 ${c.dark ? 'text-carta/85' : 'text-caffe-soft'}`}>
                {c.body.map((p, idx) => (
                  <p key={idx} dangerouslySetInnerHTML={{ __html: p }} />
                ))}
              </div>
              {i === CHAPTERS.length - 1 && (
                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                  <ArrowLink href="/locations" className="text-lg">
                    Find your trattoria
                  </ArrowLink>
                  <ArrowLink href="/regions/calabria" className="text-lg">
                    Eat Calabrian
                  </ArrowLink>
                </div>
              )}
            </Reveal>
          </div>
        </section>
      ))}

      {/* Founders portrait wall */}
      <section className="bg-carta-deep section">
        <div className="container-edge">
          <Reveal as="div" className="max-w-3xl mb-14">
            <p className="label-it mb-3">I fondatori · The founders</p>
            <h2 className="font-display text-balance" style={{ fontSize: 'var(--text-display)' }}>
              The people who <span className="italic">answer the phone</span>.
            </h2>
          </Reveal>
          <StaggerChildren className="grid md:grid-cols-3 gap-x-8 gap-y-12">
            {FOUNDERS.map((f) => (
              <StaggerItem key={f.slug}>
                <article>
                  <div className="aspect-[3/4] bg-carta rounded-sm overflow-hidden mb-5 relative">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url('${f.portrait?.src ?? ''}')` }}
                      aria-hidden
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-caffe/50 via-transparent" aria-hidden />
                  </div>
                  <p className="label-it mb-1">{f.role}</p>
                  <h3 className="font-display text-3xl tracking-tight">{f.name}</h3>
                  <p className="text-sm text-caffe-mute mt-1">{f.hometown}</p>
                  <p className="mt-4 text-caffe-soft text-pretty leading-relaxed">{f.longBio ?? f.bio}</p>
                </article>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>
    </>
  );
}
