import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { LOCATIONS } from '@/data/locations';

export const metadata = pageMetadata({
  title: 'Contact',
  description: 'Customer service, press, partnerships. Or call your nearest IT trattoria directly.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <section className="section bg-carta">
        <div className="container-edge">
          <p className="label-it mb-3">Contattaci · Contact</p>
          <h1
            className="font-display tracking-tight text-balance max-w-4xl"
            style={{ fontSize: 'var(--text-display)' }}
          >
            How can we <span className="italic">help</span>?
          </h1>
        </div>
      </section>

      <section className="section-tight bg-cartaDeep border-t border-carta">
        <div className="container-edge grid lg:grid-cols-2 gap-10">
          <div>
            <p className="label-it mb-4">Call us directly</p>
            <ul className="divide-y divide-carta">
              {LOCATIONS.map((loc) => (
                <li key={loc.slug} className="py-4 flex items-baseline justify-between gap-4">
                  <div>
                    <p className="font-display text-2xl tracking-tight">{loc.shortName}</p>
                    <p className="text-sm text-caffe-soft">{loc.address.line1}</p>
                  </div>
                  <a href={`tel:${loc.phone}`} className="num link-editorial">
                    {loc.phoneFormatted}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label-it mb-4">Send a message</p>
            <form action="/api/contact" method="post" className="bg-carta p-6 rounded-sm border border-cartaDeep space-y-4">
              <label className="block">
                <span className="label-it block mb-2">Topic</span>
                <select name="topic" className="w-full h-12 px-3 border border-cartaDeep rounded-sm bg-carta">
                  <option value="general">General question</option>
                  <option value="feedback">Feedback about a visit</option>
                  <option value="press">Press</option>
                  <option value="careers">Careers</option>
                  <option value="franchising">Franchising</option>
                  <option value="order-issue">Issue with an order</option>
                  <option value="lost-item">Lost item</option>
                </select>
              </label>
              <label className="block">
                <span className="label-it block mb-2">Your name</span>
                <input name="name" required className="w-full h-12 px-3 border border-cartaDeep rounded-sm bg-carta" />
              </label>
              <label className="block">
                <span className="label-it block mb-2">Email</span>
                <input name="email" type="email" required className="w-full h-12 px-3 border border-cartaDeep rounded-sm bg-carta" />
              </label>
              <label className="block">
                <span className="label-it block mb-2">Message</span>
                <textarea name="message" rows={5} required className="w-full p-3 border border-cartaDeep rounded-sm bg-carta resize-y" />
              </label>
              <button type="submit" className="h-12 px-6 bg-caffe text-carta rounded-sm font-medium hover:bg-monogram transition-colors">
                Send message
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
