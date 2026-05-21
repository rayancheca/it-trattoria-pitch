import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { CateringForm } from '@/components/catering/CateringForm';
import { ParallaxImage } from '@/components/ui/ParallaxImage';
import { Reveal, StaggerChildren, StaggerItem } from '@/components/ui/MotionSection';

export const metadata = pageMetadata({
  title: 'Catering for Miami Beach + NYC',
  description:
    'Office lunches, events, large groups. Fresh pasta and pizza alla pala, catered from our trattorias in Miami Beach and Manhattan.',
  path: '/catering',
});

interface CateringPackage {
  name: string;
  italian: string;
  serves: string;
  pricePer: number;
  blurb: string;
  image: string;
}

const PACKAGES: CateringPackage[] = [
  {
    name: 'The Penn Station Lunch',
    italian: 'Pranzo veloce',
    serves: '15–25',
    pricePer: 28,
    blurb:
      'Designed for Midtown desks. Pasta + insalata + dolce. Delivered to your office by 12:30, set out on real serving trays, no rush. [Pricing pending operations confirmation]',
    image: '/images/catering/office-spread.jpg',
  },
  {
    name: 'The Collins Avenue Spread',
    italian: 'L\'aperitivo',
    serves: '30–60',
    pricePer: 42,
    blurb:
      'Aperitivo + Al Banco + dolci. For Miami Beach corporate events, birthdays, and rooftops. Spritz station optional. [Pricing pending operations confirmation]',
    image: '/images/catering/large-board.jpg',
  },
  {
    name: 'The Trattoria at Your Office',
    italian: 'La trattoria a casa tua',
    serves: '50+',
    pricePer: 52,
    blurb:
      'We bring the counter. Pasta cooked on-site, pizza alla pala out of a portable oven, real espresso. Two cooks plus a barista, for groups serious about lunch. [Pricing pending operations confirmation]',
    image: '/images/catering/hands-serving.jpg',
  },
];

export default function CateringPage() {
  return (
    <>
      {/* Hero with parallax photo */}
      <section className="relative bg-caffe text-carta" style={{ minHeight: '70svh' }}>
        <div className="absolute inset-0">
          <ParallaxImage
            src="/images/catering/office-spread.jpg"
            alt=""
            className="absolute inset-0"
            intensity={10}
            overlay="bg-gradient-to-b from-caffe/30 via-caffe/55 to-caffe"
          />
        </div>
        <div className="container-edge relative section flex flex-col justify-end" style={{ minHeight: '70svh' }}>
          <Reveal as="p" className="label-it text-bergamot mb-4">
            Catering
          </Reveal>
          <Reveal as="h1" delay={0.1}>
            <span
              className="font-display tracking-tight text-balance max-w-4xl block"
              style={{ fontSize: 'var(--text-display)', lineHeight: 0.95 }}
            >
              Bring IT to your <span className="italic">office, your event, your block</span>.
            </span>
          </Reveal>
          <Reveal as="p" delay={0.2} className="mt-6 text-xl text-carta/85 max-w-2xl text-pretty">
            We cater from every trattoria. Fresh pasta delivered hot, pizza alla pala by the
            tray, dolci by the box. Two days&rsquo; lead time, longer for groups over 50.
          </Reveal>
        </div>
      </section>

      {/* Packages */}
      <section className="section bg-carta">
        <div className="container-edge">
          <Reveal as="div" className="mb-14">
            <p className="label-it mb-3">Pacchetti · Packages</p>
            <h2 className="font-display tracking-tight text-balance" style={{ fontSize: 'var(--text-h1)' }}>
              Three starting points.
            </h2>
          </Reveal>
          <StaggerChildren className="grid md:grid-cols-3 gap-8">
            {PACKAGES.map((p) => (
              <StaggerItem key={p.name}>
                <article className="bg-carta-deep rounded-sm overflow-hidden flex flex-col h-full">
                  <div className="aspect-[5/4] relative overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{ backgroundImage: `url('${p.image}')` }}
                      aria-hidden
                    />
                  </div>
                  <div className="p-6 lg:p-7 flex-1 flex flex-col">
                    <p className="label-it mb-2">{p.italian} · Serves {p.serves}</p>
                    <h3 className="font-display text-3xl tracking-tight text-balance">{p.name}</h3>
                    <p className="mt-3 text-caffe-soft text-pretty flex-1">{p.blurb}</p>
                    <p className="mt-6 num font-display text-3xl">
                      ${p.pricePer}
                      <span className="text-base text-caffe-mute">/person</span>
                    </p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Inquiry form */}
      <section className="section bg-carta-deep" aria-labelledby="inquire">
        <div className="container-edge grid lg:grid-cols-12 gap-10">
          <Reveal as="div" className="lg:col-span-5">
            <p className="label-it mb-3">Richiesta · Inquire</p>
            <h2 id="inquire" className="font-display text-balance" style={{ fontSize: 'var(--text-h1)' }}>
              Tell us about your event.
            </h2>
            <p className="mt-4 text-caffe-soft text-pretty max-w-prose">
              The form takes a minute. You&rsquo;ll hear from us within 24 hours. For groups
              over 50, expect a phone call.
            </p>
            <p className="mt-6 text-sm text-caffe-mute">
              Need to talk to a person now? Call your nearest trattoria —{' '}
              <Link href="/locations" className="link-editorial">find phone numbers here</Link>.
            </p>
          </Reveal>
          <Reveal as="div" delay={0.15} className="lg:col-span-7">
            <CateringForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
