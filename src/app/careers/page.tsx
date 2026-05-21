import { pageMetadata } from '@/lib/seo';
import { Reveal, StaggerChildren, StaggerItem } from '@/components/ui/MotionSection';
import { ParallaxImage } from '@/components/ui/ParallaxImage';

export const metadata = pageMetadata({
  title: 'Careers — Work at IT Trattoria',
  description:
    'Join an Italian kitchen in Miami Beach or Manhattan. We hire on craft, not credentials. Email office.florida@it-trattoria.com.',
  path: '/careers',
});

interface Role {
  title: string;
  italian: string;
  city: 'Miami Beach' | 'NYC — Midtown' | 'Both';
  kind: 'Full-time' | 'Part-time';
  blurb: string;
  responsibilities: string[];
  whatWeLookFor: string[];
}

const ROLES: Role[] = [
  {
    title: 'Pasta cook',
    italian: 'Pastaio',
    city: 'Miami Beach',
    kind: 'Full-time',
    blurb:
      'You run the morning. Twenty kilos of dough by 9am, sheets by 10, cut shapes by 11. Lead the lunch rush from the counter.',
    responsibilities: [
      'Mill, mix, sheet, cut — every morning, on time',
      'Train counter staff on portioning and timing',
      'Quality-check every plate that leaves the counter',
    ],
    whatWeLookFor: [
      'Two years of fresh-pasta experience (preferred, not required)',
      'Calm under a lunch rush; faster the second time than the first',
      'Pride in the small thing — flour quality, hydration, salt level',
    ],
  },
  {
    title: 'Pizza alla pala cook',
    italian: 'Pizzaiolo',
    city: 'Miami Beach',
    kind: 'Full-time',
    blurb:
      'The long Roman-style pizza by the slice, ours and yours. 72-hour cold-rise dough, electric deck oven, four toppings rotating per service.',
    responsibilities: [
      'Manage the 72-hour dough schedule',
      'Stretch, top, fire, slice',
      'Own the Spianata Calabrese — the spicy one — recipe and execution',
    ],
    whatWeLookFor: [
      'Roman-style or Neapolitan pizza experience',
      'Patience with dough; respect for the cold rise',
      'Curiosity about Calabrian salumi (we&rsquo;ll teach the rest)',
    ],
  },
  {
    title: 'Counter lead',
    italian: 'Capo banco',
    city: 'NYC — Midtown',
    kind: 'Full-time',
    blurb:
      'The face of IT during the lunch rush. You set the speed, you set the warmth, you set the standard for how the line feels.',
    responsibilities: [
      'Lead the front-of-counter team during peak hours',
      'Cash, POS, comp decisions, lost-item recovery',
      'Customer education on the menu — region, sourcing, what to try',
    ],
    whatWeLookFor: [
      'Three years front-of-house, ideally counter or fast-casual',
      'A sense of theater — speed is the show',
      'Actual interest in Italian food (we can tell)',
    ],
  },
  {
    title: 'Barista (real Italian coffee)',
    italian: 'Barista',
    city: 'NYC — Midtown',
    kind: 'Full-time',
    blurb:
      'You pull real espresso. Caffè Borbone beans, La Marzocco machine, cappuccino before 11, espresso after. The morning is yours.',
    responsibilities: [
      'Open the store; first cappuccino out by 7am',
      'Pull espresso to spec — 25–28 seconds, no compromises',
      'Train new hires on the Italian way (no caramel macchiato)',
    ],
    whatWeLookFor: [
      'Coffee craft — Italian, third-wave, or both',
      'Morning-shift comfort',
      'Affection for difficult customers ordering cappuccino at 3pm',
    ],
  },
  {
    title: 'Catering coordinator',
    italian: 'Coordinatore catering',
    city: 'NYC — Midtown',
    kind: 'Full-time',
    blurb:
      'You build the catering book. Office lunches, corporate events, large groups. Two days&rsquo; lead time minimum, you make it look easy.',
    responsibilities: [
      'Quote, schedule, and execute catering orders end-to-end',
      'Work with the kitchen on lead times and capacity',
      'Build relationships with Midtown corporate clients',
    ],
    whatWeLookFor: [
      'Two years in catering or events',
      'Spreadsheet rigor + people warmth',
      'Familiarity with Midtown corporate dynamics',
    ],
  },
  {
    title: 'General manager',
    italian: 'Direttore',
    city: 'Miami Beach',
    kind: 'Full-time',
    blurb:
      'You run the Collins flagship. P&amp;L, hiring, training, the whole operation. You report to the brothers and you have their full backing.',
    responsibilities: [
      'Full P&amp;L responsibility for the Collins flagship',
      'Recruit, train, retain a 25-person team',
      'Liaise with Paris HQ on inventory, brand, and quality standards',
    ],
    whatWeLookFor: [
      'Five years restaurant management, ideally multi-unit experience',
      'Comfort with Italian / French operational norms',
      'A bias for hospitality over rules',
    ],
  },
];

const VALUES = [
  {
    label: 'Craft',
    body: 'We hire on craft, not credentials. We&rsquo;ll teach you the Calabrian dishes. We can&rsquo;t teach you to care.',
  },
  {
    label: 'Speed',
    body: 'Counter-service means people are in a hurry. Speed is hospitality. Slow is a failure mode.',
  },
  {
    label: 'Pride',
    body: 'We name every supplier. We trim every plate. We don&rsquo;t serve what we wouldn&rsquo;t eat.',
  },
  {
    label: 'Italian',
    body: 'You don&rsquo;t need to be Italian. You need to be curious about Italy. The brothers will fill in the rest.',
  },
];

export default function CareersPage() {
  return (
    <>
      <section className="relative bg-caffe text-carta" style={{ minHeight: '70svh' }}>
        <div className="absolute inset-0">
          <ParallaxImage
            src="/images/locations/collins-kitchen.jpg"
            alt=""
            className="absolute inset-0"
            intensity={10}
            overlay="bg-gradient-to-b from-caffe/30 via-caffe/55 to-caffe"
          />
        </div>
        <div className="container-edge relative section flex flex-col justify-end" style={{ minHeight: '70svh' }}>
          <Reveal as="p" className="label-it text-bergamot mb-4">
            Lavora con noi · Work with us
          </Reveal>
          <Reveal as="h1" delay={0.1}>
            <span
              className="font-display tracking-tight text-balance max-w-4xl block"
              style={{ fontSize: 'var(--text-display)', lineHeight: 0.95 }}
            >
              Cook the food <span className="italic">you&rsquo;d order yourself</span>.
            </span>
          </Reveal>
          <Reveal as="p" delay={0.2} className="mt-6 text-lg text-carta/85 max-w-2xl text-pretty">
            We&rsquo;re hiring across all four US trattorias. Cooks, baristas, counter
            leads, catering coordinators, GMs. We pay above market. We train hard. We
            cook honestly.
          </Reveal>
          <Reveal as="div" delay={0.3} className="mt-8">
            <a
              href="mailto:office.florida@it-trattoria.com"
              className="inline-flex items-center justify-center h-12 px-6 bg-peperoncino text-carta rounded-sm font-medium hover:bg-peperoncino-soft transition-colors"
            >
              Email office.florida@it-trattoria.com
            </a>
          </Reveal>
        </div>
      </section>

      <section className="section bg-carta">
        <div className="container-edge">
          <Reveal as="div" className="max-w-3xl mb-14">
            <p className="label-it mb-3">I valori · What matters here</p>
            <h2 className="font-display text-balance" style={{ fontSize: 'var(--text-h1)' }}>
              Four words, in order.
            </h2>
          </Reveal>
          <StaggerChildren className="grid md:grid-cols-4 gap-x-8 gap-y-10">
            {VALUES.map((v, i) => (
              <StaggerItem key={v.label}>
                <div>
                  <p className="font-display text-7xl text-peperoncino leading-none num">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <p className="label-it mt-4">{v.label}</p>
                  <p
                    className="mt-3 text-caffe-soft leading-relaxed text-pretty"
                    dangerouslySetInnerHTML={{ __html: v.body }}
                  />
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <section className="section bg-carta-deep" id="roles">
        <div className="container-edge">
          <Reveal as="div" className="mb-12">
            <p className="label-it mb-3">Posizioni aperte · Open roles</p>
            <h2 className="font-display text-balance" style={{ fontSize: 'var(--text-h1)' }}>
              Six positions right now.
            </h2>
          </Reveal>
          <StaggerChildren className="space-y-8">
            {ROLES.map((r) => (
              <StaggerItem key={r.title}>
                <article className="bg-carta rounded-sm p-6 lg:p-10 group">
                  <div className="grid lg:grid-cols-12 gap-6 lg:gap-10">
                    <div className="lg:col-span-4">
                      <p className="label-it mb-2">{r.italian}</p>
                      <h3 className="font-display text-3xl lg:text-4xl tracking-tight text-balance">
                        {r.title}
                      </h3>
                      <p className="mt-2 text-sm text-caffe-mute">{r.city} · {r.kind}</p>
                      <a
                        href={`mailto:office.florida@it-trattoria.com?subject=Application: ${encodeURIComponent(r.title)} — ${encodeURIComponent(r.city)}`}
                        className="mt-6 inline-flex items-center justify-center h-11 px-5 bg-caffe text-carta rounded-sm font-medium hover:bg-monogram transition-colors"
                      >
                        Apply for this role
                      </a>
                    </div>
                    <div className="lg:col-span-8 space-y-6">
                      <p
                        className="text-lg text-caffe-soft text-pretty"
                        dangerouslySetInnerHTML={{ __html: r.blurb }}
                      />
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <p className="label-it mb-3">What you&rsquo;ll do</p>
                          <ul className="space-y-2 text-sm text-caffe">
                            {r.responsibilities.map((x) => (
                              <li key={x} className="flex gap-3">
                                <span className="text-peperoncino">·</span>
                                <span dangerouslySetInnerHTML={{ __html: x }} />
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="label-it mb-3">What we look for</p>
                          <ul className="space-y-2 text-sm text-caffe">
                            {r.whatWeLookFor.map((x) => (
                              <li key={x} className="flex gap-3">
                                <span className="text-peperoncino">·</span>
                                <span dangerouslySetInnerHTML={{ __html: x }} />
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <section className="section-tight bg-caffe text-carta text-center">
        <div className="container-narrow">
          <p className="label-it text-bergamot mb-4">Non vedi il tuo ruolo?</p>
          <h2 className="font-display text-balance" style={{ fontSize: 'var(--text-h2)' }}>
            Don&rsquo;t see your role?
          </h2>
          <p className="mt-4 text-carta/85 max-w-2xl mx-auto text-pretty">
            We&rsquo;re always interested in people who can cook honestly, work the
            counter with grace, or run a tight kitchen. Send us a note. Tell us what
            you&rsquo;d do here.
          </p>
          <a
            href="mailto:office.florida@it-trattoria.com?subject=Open application"
            className="mt-8 inline-flex items-center justify-center h-12 px-6 bg-peperoncino text-carta rounded-sm font-medium hover:bg-peperoncino-soft transition-colors"
          >
            Send an open application
          </a>
        </div>
      </section>
    </>
  );
}
