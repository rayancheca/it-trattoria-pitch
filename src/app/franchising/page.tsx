import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Partner with IT',
  description: 'Franchising, partnership, and expansion inquiries for IT — Italian Trattoria.',
  path: '/franchising',
});

export default function FranchisingPage() {
  return (
    <>
      <section className="section bg-caffe text-carta">
        <div className="container-edge">
          <p className="label-it text-bergamot mb-4">Partnership · Franchising</p>
          <h1
            className="font-display tracking-tight text-balance max-w-4xl"
            style={{ fontSize: 'var(--text-display)' }}
          >
            <span className="italic">Twenty trattorias</span> in France. Four in the US.
            <br /> We&rsquo;re open to the right partners.
          </h1>
          <p className="mt-6 text-lg text-carta/85 max-w-2xl text-pretty">
            We&rsquo;re selective. The IT format is counter-service Italian with on-site
            pasta and an open kitchen. If your city, your retail footprint, and your
            operations skill match that, we&rsquo;d like to talk.
          </p>
        </div>
      </section>

      <section className="section bg-carta">
        <div className="container-edge max-w-2xl">
          <form action="/api/contact" method="post" className="space-y-4">
            <input type="hidden" name="topic" value="franchising" />
            <label className="block">
              <span className="label-it block mb-2">Your name</span>
              <input name="name" required className="w-full h-12 px-3 border border-carta-deep rounded-sm" />
            </label>
            <label className="block">
              <span className="label-it block mb-2">Email</span>
              <input name="email" type="email" required className="w-full h-12 px-3 border border-carta-deep rounded-sm" />
            </label>
            <label className="block">
              <span className="label-it block mb-2">Region of interest</span>
              <input name="region" required placeholder="Miami / Boston / Chicago / etc." className="w-full h-12 px-3 border border-carta-deep rounded-sm" />
            </label>
            <label className="block">
              <span className="label-it block mb-2">A bit about you</span>
              <textarea name="message" rows={5} required className="w-full p-3 border border-carta-deep rounded-sm resize-y" />
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
