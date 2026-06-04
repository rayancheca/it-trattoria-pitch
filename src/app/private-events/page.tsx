import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { LOCATIONS } from '@/data/locations';
import { Reveal, StaggerChildren, StaggerItem } from '@/components/ui/MotionSection';
import { ParallaxImage } from '@/components/ui/ParallaxImage';

export const metadata = pageMetadata({
  title: 'Private Dining',
  description: 'Buyouts, semi-private dining, and patio takeovers at IT Trattoria Miami Beach and NYC.',
  path: '/private-events',
});

interface EventType {
  title: string;
  italian: string;
  guests: string;
  blurb: string;
  bestAt: string;
}

const EVENT_TYPES: EventType[] = [
  { title: 'Birthday dinner', italian: 'Festa di compleanno', guests: '12–40', bestAt: 'Lincoln Road or Collins',
    blurb: 'Long table down the middle of the trattoria. Family-style pasta, the spianata, dolci to share. Cake fee waived if you bring your own.' },
  { title: 'Rehearsal dinner', italian: 'Cena prematrimoniale', guests: '20–60', bestAt: 'Lincoln Road',
    blurb: 'Counter pulled forward, banquette converted. We close the front 90 minutes early. Wine list from Renato&rsquo;s personal cellar on request.' },
  { title: 'Corporate offsite', italian: 'Evento aziendale', guests: '15–80', bestAt: 'Collins',
    blurb: 'Welcome aperitivo, a real pasta demonstration in the open kitchen, three-course service. Branded swag and printed menus available with two weeks notice.' },
  { title: 'Full buyout', italian: 'Affitto completo', guests: '40–120', bestAt: 'Collins or Lincoln Road',
    blurb: 'The whole trattoria, your night. Open kitchen, custom menu, DJ-friendly. Minimums apply; talk to us early — these book six months out.' },
  { title: 'Patio takeover', italian: 'Aperitivo sulla terrazza', guests: '25–60', bestAt: 'Lincoln Road',
    blurb: 'Lincoln Road patio, all of it, golden hour through close. Cocktail station, antipasti circulation, pizza alla pala by the slice.' },
  { title: 'Cocktail reception', italian: 'Aperitivo in piedi', guests: '30–100', bestAt: 'Collins',
    blurb: 'Standing reception, antipasti and dolci circulated by the team. Two-hour minimum, three drinks per person on average. Most-booked in Q4.' },
];

const INCLUDED = [
  'A dedicated event coordinator',
  'Custom printed menus with your event name',
  'A welcome aperitivo per guest (Spritz Calabrese or alcohol-free)',
  'Family-style or plated service — your call',
  'Cake fee waived on outside dessert',
  'Coat check on request',
  'AV setup at Collins (projector, screen, mic)',
];

const PE_LOCATIONS = LOCATIONS.filter((l) => l.privateEvents);

export default function PrivateEventsPage() {
  return (
    <>
      <section className="relative bg-caffe text-carta" style={{ minHeight: '70svh' }}>
        <div className="absolute inset-0">
          <ParallaxImage
            src="/images/catering/large-board.jpg"
            alt=""
            className="absolute inset-0"
            intensity={10}
            overlay="bg-gradient-to-b from-caffe/40 via-caffe/65 to-caffe"
          />
        </div>
        <div className="container-edge relative section flex flex-col justify-end" style={{ minHeight: '70svh' }}>
          <Reveal as="p" className="label-it text-bergamot mb-4">Eventi privati · Private events</Reveal>
          <Reveal as="h1" delay={0.1}>
            <span className="font-display tracking-tight text-balance max-w-4xl block" style={{ fontSize: 'var(--text-display)', lineHeight: 0.95 }}>
              Take over a <span className="italic">trattoria</span>.
            </span>
          </Reveal>
          <Reveal as="p" delay={0.2} className="mt-6 text-lg text-carta/85 max-w-2xl text-pretty">
            Birthdays, corporate offsites, rehearsal dinners, full buyouts. Two of our
            US trattorias take private events. Booked six months out for buyouts;
            two weeks out for semi-private.
          </Reveal>
          <Reveal as="div" delay={0.3} className="mt-8 flex flex-wrap gap-3">
            <a href="mailto:events@it-trattoria.com?subject=Private event inquiry"
              className="inline-flex items-center justify-center h-12 px-6 bg-peperoncino text-carta rounded-sm font-medium hover:bg-peperoncino-soft transition-colors">
              Start an inquiry
            </a>
            <a href="tel:+13053978244"
              className="inline-flex items-center justify-center h-12 px-6 border border-carta rounded-sm hover:bg-carta hover:text-caffe transition-colors">
              Or call the Collins flagship
            </a>
          </Reveal>
        </div>
      </section>

      <section className="section bg-carta">
        <div className="container-edge">
          <Reveal as="div" className="mb-12 lg:mb-16 max-w-2xl">
            <p className="label-it mb-3">Sei modi · Six ways</p>
            <h2 className="font-display text-balance" style={{ fontSize: 'var(--text-h1)' }}>
              Pick a format. We&rsquo;ll handle the rest.
            </h2>
          </Reveal>
          <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {EVENT_TYPES.map((e) => (
              <StaggerItem key={e.title}>
                <article className="border-t border-carta-deep pt-6 h-full flex flex-col">
                  <p className="label-it text-caffe-mute mb-2">{e.italian} · {e.guests} guests</p>
                  <h3 className="font-display text-3xl tracking-tight text-balance">{e.title}</h3>
                  <p className="mt-3 text-caffe-soft text-pretty flex-1" dangerouslySetInnerHTML={{ __html: e.blurb }} />
                  <p className="mt-5 text-sm text-caffe-mute">
                    Best at: <strong className="text-caffe">{e.bestAt}</strong>
                  </p>
                </article>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <section className="section bg-carta-deep">
        <div className="container-edge grid md:grid-cols-12 gap-10 items-start">
          <Reveal as="div" className="md:col-span-5">
            <p className="label-it mb-3">Incluso · What&rsquo;s included</p>
            <h2 className="font-display text-balance" style={{ fontSize: 'var(--text-h1)' }}>
              No fine print.
            </h2>
            <p className="mt-4 text-caffe-soft text-pretty max-w-prose">
              Every private event includes the basics below. Custom additions —
              florals, music, photography — handled on request.
            </p>
          </Reveal>
          <Reveal as="div" delay={0.15} className="md:col-span-7">
            <ul className="divide-y divide-carta">
              {INCLUDED.map((x) => (
                <li key={x} className="py-4 flex gap-4 items-start">
                  <span className="font-display text-peperoncino text-xl leading-none mt-0.5">·</span>
                  <span className="text-caffe text-lg">{x}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section bg-carta">
        <div className="container-edge">
          <Reveal as="div" className="mb-10">
            <p className="label-it mb-3">Dove · Where</p>
            <h2 className="font-display text-balance" style={{ fontSize: 'var(--text-h1)' }}>
              Two trattorias take buyouts.
            </h2>
            <p className="mt-3 text-caffe-soft">
              Midtown locations book through catering for off-site events instead.
            </p>
          </Reveal>
          <StaggerChildren className="grid md:grid-cols-2 gap-8">
            {PE_LOCATIONS.map((loc) => (
              <StaggerItem key={loc.slug}>
                <article className="bg-carta-deep rounded-sm overflow-hidden h-full flex flex-col group">
                  <div className="aspect-[16/9] overflow-hidden relative">
                    <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-[var(--ease-default)]"
                      style={{ backgroundImage: `url('${loc.hero.src}')` }} aria-hidden />
                    <div className="absolute inset-0 bg-gradient-to-t from-caffe/40 to-transparent" aria-hidden />
                  </div>
                  <div className="p-6 lg:p-8 flex-1 flex flex-col">
                    <h3 className="font-display text-3xl tracking-tight">{loc.shortName}</h3>
                    <p className="mt-1 text-caffe-soft text-sm">{loc.address.line1}, {loc.address.city}</p>
                    <p className="mt-4 text-caffe-soft text-pretty flex-1">{loc.neighborhood.note}</p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <a href={`mailto:events@it-trattoria.com?subject=Private event at ${encodeURIComponent(loc.shortName)}`}
                        className="inline-flex items-center justify-center h-11 px-5 bg-caffe text-carta rounded-sm font-medium hover:bg-monogram transition-colors">
                        Inquire here
                      </a>
                      <a href={`tel:${loc.phone}`}
                        className="inline-flex items-center justify-center h-11 px-4 border border-caffe rounded-sm hover:bg-caffe hover:text-carta transition-colors">
                        Or call {loc.phoneFormatted}
                      </a>
                    </div>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <section className="section-tight bg-monogram text-carta">
        <div className="container-narrow text-center">
          <p className="label-it text-bergamot mb-4">Ready to plan?</p>
          <h2 className="font-display text-balance" style={{ fontSize: 'var(--text-h2)' }}>
            We respond in <span className="italic">24 hours</span>.
          </h2>
          <p className="mt-4 text-carta/85 max-w-xl mx-auto text-pretty">
            Tell us a date and a rough headcount. We&rsquo;ll come back with availability,
            a menu suggestion, and a number.
          </p>
          <a href="mailto:events@it-trattoria.com?subject=Private event inquiry"
            className="mt-8 inline-flex items-center justify-center h-12 px-7 bg-peperoncino text-carta rounded-sm font-medium hover:bg-peperoncino-soft transition-colors">
            Email events@it-trattoria.com
          </a>
          <p className="mt-6 text-sm text-carta/60">
            Or call any location directly — <Link href="/locations" className="link-editorial text-carta">phone numbers here</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
