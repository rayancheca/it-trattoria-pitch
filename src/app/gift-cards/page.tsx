import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Gift Cards',
  description: 'Give someone fresh pasta in Miami Beach or NYC. IT gift cards by email or by post.',
  path: '/gift-cards',
});

const AMOUNTS = [25, 50, 75, 100, 150, 250];

export default function GiftCardsPage() {
  return (
    <>
      <section className="section bg-monogram text-carta">
        <div className="container-edge">
          <p className="label-it text-bergamot mb-4">Buono regalo · Gift card</p>
          <h1
            className="font-display tracking-tight text-balance max-w-4xl"
            style={{ fontSize: 'var(--text-display)' }}
          >
            Give someone <span className="italic">fresh pasta</span>.
          </h1>
          <p className="mt-6 text-lg text-carta/85 max-w-2xl text-pretty">
            Use at any IT trattoria. Order online, in person, or for catering. Never
            expires.
          </p>
        </div>
      </section>

      <section className="section bg-carta">
        <div className="container-edge">
          <p className="label-it mb-3">Pick an amount</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
            {AMOUNTS.map((a) => (
              <button
                key={a}
                type="button"
                className="aspect-[5/3] border border-caffe rounded-sm font-display text-3xl tracking-tight hover:bg-caffe hover:text-carta transition-colors num"
              >
                ${a}
              </button>
            ))}
          </div>
          <p className="text-sm text-caffe-mute">
            Checkout is a Stripe stub in this mockup — the full flow goes live with
            production launch. See <a href="/HANDOFF.md" className="link-editorial">HANDOFF</a>.
          </p>
        </div>
      </section>
    </>
  );
}
