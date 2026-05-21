import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Press',
  description: 'Press, mentions, and awards for IT — Italian Trattoria.',
  path: '/press',
});

// IMPORTANT: every quote here is [PLACEHOLDER — DO NOT PUBLISH UNTIL VERIFIED].
// Per the brief, attributing invented quotes to real publications is forbidden.
// These exist purely as designed-shell content for the pitch. See QUESTIONS.md #2.
const PLACEHOLDER_QUOTES = [
  {
    publication: 'Eater Miami',
    note: '[PLACEHOLDER — pending verification with real coverage]',
  },
  {
    publication: 'Time Out NY',
    note: '[PLACEHOLDER — pending verification with real coverage]',
  },
  {
    publication: 'The Infatuation',
    note: '[PLACEHOLDER — pending verification with real coverage]',
  },
];

export default function PressPage() {
  return (
    <>
      <section className="section bg-carta">
        <div className="container-edge">
          <p className="label-it mb-3">Stampa · Press</p>
          <h1
            className="font-display tracking-tight text-balance max-w-4xl"
            style={{ fontSize: 'var(--text-display)' }}
          >
            What people <span className="italic">have said</span>.
          </h1>
          <p className="mt-6 text-lg text-caffe-soft max-w-2xl text-pretty">
            Press, mentions, and reviews. For press inquiries email{' '}
            <a href="mailto:press@it-trattoria.com" className="link-editorial">press@it-trattoria.com</a>.
          </p>
        </div>
      </section>

      <section className="section bg-cartaDeep">
        <div className="container-edge">
          <div className="bg-bergamot/20 border border-bergamot/40 rounded-sm p-6 mb-12">
            <p className="label-it text-peperoncino mb-2">Note for the founders</p>
            <p className="text-sm text-caffe-soft text-pretty">
              This page is a designed shell. Per the engagement brief, we don&rsquo;t
              fabricate quotes attributed to real publications. Real press will be added
              once verified — either from coverage you already have, or earned during a
              proper press push in Phase 2 of the rollout.
            </p>
          </div>

          <ul className="divide-y divide-carta">
            {PLACEHOLDER_QUOTES.map((q) => (
              <li key={q.publication} className="py-8">
                <p className="font-display text-3xl tracking-tight">{q.publication}</p>
                <p className="mt-2 text-sm text-caffe-mute italic">{q.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
