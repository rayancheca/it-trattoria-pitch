import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { CateringForm } from '@/components/catering/CateringForm';

export const metadata = pageMetadata({
  title: 'Catering for Miami Beach + NYC',
  description:
    'Office lunches, events, large groups. Fresh pasta and pizza alla pala, catered from our trattorias in Miami Beach and Manhattan.',
  path: '/catering',
});

const PACKAGES = [
  {
    name: 'The Penn Station Lunch',
    serves: '15–25',
    pricePer: 28,
    blurb: 'Designed for Midtown desks. Pasta + insalata + tiramisù. Delivered to your office by 12:30. [PLACEHOLDER — verify with operations]',
  },
  {
    name: 'The Collins Avenue Spread',
    serves: '30–60',
    pricePer: 42,
    blurb: 'Aperitivo + Al Banco + dolci buffet. For Miami Beach corporate events and birthdays. [PLACEHOLDER — verify with operations]',
  },
  {
    name: 'The Trattoria at Your Office',
    serves: '50+',
    pricePer: 52,
    blurb: 'We bring the counter. Pasta cooked on-site, pizza alla pala out of a portable oven. [PLACEHOLDER — verify with operations]',
  },
];

export default function CateringPage() {
  return (
    <>
      <section className="section bg-caffe text-carta relative isolate">
        <div className="absolute inset-0 bg-gradient-to-br from-monogram via-caffe to-caffe -z-10" aria-hidden />
        <div className="container-edge">
          <p className="label-it text-bergamot mb-4">Catering</p>
          <h1
            className="font-display tracking-tight text-balance max-w-4xl"
            style={{ fontSize: 'var(--text-display)' }}
          >
            Bring IT to your <span className="italic">office, your event, your block</span>.
          </h1>
          <p className="mt-6 text-xl text-carta/85 max-w-2xl text-pretty">
            We cater from every trattoria. Fresh pasta delivered hot, pizza alla pala by the
            tray, dolci by the box. Two days&rsquo; lead time, longer for groups over 50.
          </p>
        </div>
      </section>

      {/* Packages */}
      <section className="section bg-carta">
        <div className="container-edge">
          <p className="label-it mb-3">Pacchetti · Packages</p>
          <h2 className="font-display tracking-tight text-balance mb-12" style={{ fontSize: 'var(--text-h1)' }}>
            Three starting points.
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {PACKAGES.map((p) => (
              <article key={p.name} className="bg-carta-deep p-6 lg:p-8 rounded-sm">
                <p className="label-it mb-2">Serves {p.serves}</p>
                <h3 className="font-display text-2xl tracking-tight text-balance">{p.name}</h3>
                <p className="mt-3 text-caffe-soft text-pretty">{p.blurb}</p>
                <p className="mt-6 num font-display text-3xl">${p.pricePer}<span className="text-base text-caffe-mute">/person</span></p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="section bg-carta-deep" aria-labelledby="inquire">
        <div className="container-edge grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
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
          </div>
          <div className="lg:col-span-7">
            <CateringForm />
          </div>
        </div>
      </section>
    </>
  );
}
