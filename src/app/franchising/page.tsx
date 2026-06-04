import { pageMetadata } from '@/lib/seo';
import { Reveal, StaggerChildren, StaggerItem } from '@/components/ui/MotionSection';
import { ParallaxImage } from '@/components/ui/ParallaxImage';

export const metadata = pageMetadata({
  title: 'Partner with IT',
  description: 'Franchising, partnership, and expansion inquiries for IT — Italian Trattoria. Multi-unit operators only.',
  path: '/franchising',
});

const MODEL = [
  { label: 'Format', body: 'Counter-service Italian. ~1,800–2,800 sq ft. Open kitchen, on-site fresh-pasta room, espresso bar.' },
  { label: 'Average ticket', body: '$17–22 lunch, $24–32 dinner. Coffee + dolce add-on is 38% of receipts.' },
  { label: 'Hours', body: '7am open for breakfast trade. 10pm close in beach cities, 9pm in office districts.' },
  { label: 'Day-one revenue mix', body: 'Walk-in: 55% · Online order pickup: 28% · Delivery: 10% · Catering: 7%.' },
];

const CRITERIA = [
  { n: '01', label: 'Multi-unit', body: 'Five-unit minimum commitment per market. We don&rsquo;t do one-offs.' },
  { n: '02', label: 'Operator-led', body: 'A principal who runs restaurants, not a passive investor. Hands-on through opening.' },
  { n: '03', label: 'Real estate', body: 'Existing site control or a credible pipeline. We have an opinion on locations.' },
  { n: '04', label: 'Italian-adjacent', body: 'Prior Italian, Mediterranean, or premium fast-casual experience. Not required, weighted.' },
];

const WHAT_WE_PROVIDE = [
  'The brand, the recipes, the playbook — including the spianata Calabrese',
  'On-site pasta-room build-out spec and a six-week opening training',
  'Centralized purchasing for the imported ingredients (mortadella, Parmigiano, n&rsquo;duja)',
  'Marketing kit for opening and the first quarter post-launch',
  'Quarterly visits from Renato or Gio for the first year',
  'Pre-built integrations: Toast POS, ordering, gift cards, loyalty',
];

const MARKETS = [
  { city: 'Miami Beach', status: 'Live', count: 2 },
  { city: 'Manhattan', status: 'Live', count: 2 },
  { city: 'Brooklyn', status: 'In LOI', count: 1 },
  { city: 'Washington DC', status: 'Open', count: null },
  { city: 'Boston', status: 'Open', count: null },
  { city: 'Chicago', status: 'Open', count: null },
  { city: 'Los Angeles', status: 'Q3 2026', count: null },
  { city: 'Austin', status: 'Open', count: null },
];

const FAQ = [
  { q: 'What&rsquo;s the franchise fee?', a: '[PLACEHOLDER — Maxence to confirm.] Typical range for the segment is $45–60k initial, 5–6% royalty, 2% national marketing. FDD on request after a qualified call.' },
  { q: 'How long from signed agreement to opening?', a: 'Nine to fourteen months for a first store in a new market. Three months faster for an operator&rsquo;s second + units in the same market.' },
  { q: 'Are you considering international expansion?', a: 'Not in 2026. Paris HQ is fully focused on the US and the existing 20+ French stores. We&rsquo;ll revisit in 2027.' },
  { q: 'Do I need to know Italian?', a: 'No. Gio handles operator training in English. We&rsquo;ll teach you what mortadella should taste like.' },
];

export default function FranchisingPage() {
  return (
    <>
      <section className="relative bg-caffe text-carta" style={{ minHeight: '70svh' }}>
        <div className="absolute inset-0">
          <ParallaxImage
            src="/images/locations/collins-counter.jpg"
            alt=""
            className="absolute inset-0"
            intensity={8}
            overlay="bg-gradient-to-b from-caffe/40 via-caffe/65 to-caffe"
          />
        </div>
        <div className="container-edge relative section flex flex-col justify-end" style={{ minHeight: '70svh' }}>
          <Reveal as="p" className="label-it text-bergamot mb-4">Partnership · Espansione</Reveal>
          <Reveal as="h1" delay={0.1}>
            <span className="font-display tracking-tight text-balance max-w-4xl block" style={{ fontSize: 'var(--text-display)', lineHeight: 0.95 }}>
              <span className="italic">Twenty trattorias</span> in France.<br />
              Four in the US.<br />
              The right partners get the next ten.
            </span>
          </Reveal>
          <Reveal as="p" delay={0.2} className="mt-6 text-lg text-carta/85 max-w-2xl text-pretty">
            We&rsquo;re selective. Multi-unit operators only. If your city, your real
            estate pipeline, and your operations skill match the format, the brothers
            want to talk.
          </Reveal>
          <Reveal as="div" delay={0.3} className="mt-8">
            <a href="#inquire" className="inline-flex items-center justify-center h-12 px-6 bg-peperoncino text-carta rounded-sm font-medium hover:bg-peperoncino-soft transition-colors">
              Start a conversation
            </a>
          </Reveal>
        </div>
      </section>

      <section className="section bg-carta">
        <div className="container-edge">
          <Reveal as="div" className="mb-12 max-w-2xl">
            <p className="label-it mb-3">Il modello · The model</p>
            <h2 className="font-display text-balance" style={{ fontSize: 'var(--text-h1)' }}>
              What an IT trattoria actually is.
            </h2>
          </Reveal>
          <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
            {MODEL.map((m) => (
              <StaggerItem key={m.label}>
                <div className="border-t border-carta-deep pt-5">
                  <p className="label-it mb-3">{m.label}</p>
                  <p className="text-caffe-soft text-pretty leading-relaxed">{m.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <section className="section bg-carta-deep">
        <div className="container-edge">
          <Reveal as="div" className="mb-12 max-w-2xl">
            <p className="label-it mb-3">Chi cerchiamo · Who we want</p>
            <h2 className="font-display text-balance" style={{ fontSize: 'var(--text-h1)' }}>
              Four criteria. All four matter.
            </h2>
          </Reveal>
          <StaggerChildren className="grid md:grid-cols-2 gap-x-8 gap-y-10">
            {CRITERIA.map((c) => (
              <StaggerItem key={c.n}>
                <div className="flex gap-6 items-start">
                  <p className="font-display text-6xl text-peperoncino leading-none num shrink-0">{c.n}</p>
                  <div>
                    <p className="label-it mb-2">{c.label}</p>
                    <p className="text-caffe-soft text-pretty leading-relaxed" dangerouslySetInnerHTML={{ __html: c.body }} />
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <section className="section bg-monogram text-carta">
        <div className="container-edge grid md:grid-cols-12 gap-10 items-start">
          <Reveal as="div" className="md:col-span-5">
            <p className="label-it text-bergamot mb-3">Cosa diamo · What HQ provides</p>
            <h2 className="font-display text-balance" style={{ fontSize: 'var(--text-h1)' }}>
              The whole IT, in your market.
            </h2>
          </Reveal>
          <Reveal as="div" delay={0.15} className="md:col-span-7">
            <ul className="divide-y divide-carta/15">
              {WHAT_WE_PROVIDE.map((x) => (
                <li key={x} className="py-4 flex gap-4 items-start">
                  <span className="font-display text-bergamot text-xl leading-none mt-0.5">·</span>
                  <span className="text-carta text-lg" dangerouslySetInnerHTML={{ __html: x }} />
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section bg-carta">
        <div className="container-edge">
          <Reveal as="div" className="mb-10">
            <p className="label-it mb-3">Mercati · Markets</p>
            <h2 className="font-display text-balance" style={{ fontSize: 'var(--text-h1)' }}>
              Where IT is, where it&rsquo;s going.
            </h2>
          </Reveal>
          <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-6">
            {MARKETS.map((m) => (
              <StaggerItem key={m.city}>
                <div className="border border-carta-deep p-5 rounded-sm hover:border-caffe transition-colors">
                  <p className="font-display text-2xl tracking-tight">{m.city}</p>
                  <p className="label-it mt-2 text-caffe-mute">
                    {m.status}{m.count !== null ? ` · ${m.count} unit${m.count === 1 ? '' : 's'}` : ''}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <section className="section bg-carta-deep">
        <div className="container-edge">
          <Reveal as="div" className="mb-10 max-w-2xl">
            <p className="label-it mb-3">Domande frequenti · FAQ</p>
            <h2 className="font-display text-balance" style={{ fontSize: 'var(--text-h1)' }}>
              Things operators ask first.
            </h2>
          </Reveal>
          <StaggerChildren className="divide-y divide-carta">
            {FAQ.map((f) => (
              <StaggerItem key={f.q}>
                <details className="group py-6">
                  <summary className="font-display text-2xl lg:text-3xl tracking-tight cursor-pointer list-none flex items-center justify-between gap-6"
                    dangerouslySetInnerHTML={{ __html: f.q + ' <span class="text-peperoncino text-3xl group-open:rotate-45 transition-transform inline-block" aria-hidden>+</span>' }} />
                  <p className="mt-4 text-caffe-soft text-pretty max-w-3xl leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: f.a }} />
                </details>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <section className="section bg-carta" id="inquire">
        <div className="container-edge max-w-2xl">
          <Reveal as="div" className="mb-10">
            <p className="label-it mb-3">Iniziamo · Get in touch</p>
            <h2 className="font-display text-balance" style={{ fontSize: 'var(--text-h1)' }}>
              Tell us about your market.
            </h2>
            <p className="mt-3 text-caffe-soft">
              We answer every qualified inquiry within five business days. Maxence
              handles operator screening; the brothers join the conversation once the
              fit is mutual.
            </p>
          </Reveal>
          <form action="/api/contact" method="post" className="space-y-5">
            <input type="hidden" name="topic" value="franchising" />
            <div className="grid sm:grid-cols-2 gap-5">
              <label className="block">
                <span className="label-it mb-2 block">Your name</span>
                <input name="name" required className="w-full h-12 px-3 border border-carta-deep rounded-sm bg-carta" />
              </label>
              <label className="block">
                <span className="label-it mb-2 block">Email</span>
                <input name="email" type="email" required className="w-full h-12 px-3 border border-carta-deep rounded-sm bg-carta" />
              </label>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <label className="block">
                <span className="label-it mb-2 block">Region of interest</span>
                <input name="region" required placeholder="Boston / Chicago / etc." className="w-full h-12 px-3 border border-carta-deep rounded-sm bg-carta" />
              </label>
              <label className="block">
                <span className="label-it mb-2 block">Existing units</span>
                <select name="existingUnits" className="w-full h-12 px-3 border border-carta-deep rounded-sm bg-carta">
                  <option>None yet — first restaurant</option>
                  <option>1–4 restaurants</option>
                  <option>5–14 restaurants</option>
                  <option>15+ restaurants</option>
                </select>
              </label>
            </div>
            <label className="block">
              <span className="label-it mb-2 block">A bit about your operation</span>
              <textarea name="message" rows={6} required
                placeholder="Brands you run, markets you operate in, real estate pipeline, why IT."
                className="w-full p-3 border border-carta-deep rounded-sm bg-carta resize-y" />
            </label>
            <button type="submit" className="h-12 px-6 bg-caffe text-carta rounded-sm font-medium hover:bg-monogram transition-colors">
              Submit inquiry
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
