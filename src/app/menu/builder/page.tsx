import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Build Your Pasta',
  description: 'Pick your shape, choose your sauce, name your add-ons. The fastest fresh pasta in Miami Beach or Midtown.',
  path: '/menu/builder',
});

const SHAPES = ['Paccheri', 'Tagliatelle', 'Tonnarelli', 'Orecchiette', 'Trofie'];
const SAUCES = ['Calabrese (n&rsquo;duja)', 'Ragù bolognese', 'Cacio e pepe', 'Cime di rapa', 'Pesto genovese', 'Pomodoro'];
const ADDS = ['Mortadella IGP', 'Spianata calabrese', 'Burrata', 'Stracciatella', 'Pecorino', 'Peperoncino'];

export default function PastaBuilderPage() {
  return (
    <>
      <section className="section bg-caffe text-carta">
        <div className="container-edge">
          <p className="label-it text-bergamot mb-4">Costruisci la tua pasta · Build your pasta</p>
          <h1
            className="font-display tracking-tight text-balance max-w-4xl"
            style={{ fontSize: 'var(--text-display)' }}
          >
            Pick a shape. Pick a sauce. <span className="italic">Eat.</span>
          </h1>
          <p className="mt-6 text-lg text-carta/85 max-w-2xl text-pretty">
            Counter-service pasta in three taps. Comes out hot, fresh, faster than the
            line at any sit-down trattoria. Phase 1 of the rebuild ships the menu;
            this builder is the centerpiece of Phase 2.
          </p>
        </div>
      </section>

      <section className="section bg-carta">
        <div className="container-edge">
          <div className="bg-bergamot/20 border border-bergamot/40 rounded-sm p-6 mb-12 max-w-3xl">
            <p className="label-it text-peperoncino mb-2">Phase 2 stub</p>
            <p className="text-sm text-caffe-soft text-pretty">
              The builder is documented in the conversion map and content model. Live
              builder UX ships once Toast integration lands. The mockup demonstrates the
              choice architecture — the production version wires each click to the cart
              and accepts payment.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <BuilderColumn label="1 · Shape" italian="Forma" items={SHAPES} />
            <BuilderColumn label="2 · Sauce" italian="Sugo" items={SAUCES} />
            <BuilderColumn label="3 · Extras" italian="Extra" items={ADDS} />
          </div>

          <div className="mt-12 p-6 lg:p-10 bg-cartaDeep rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="label-it mb-2">Your build (preview)</p>
              <p className="font-display text-2xl tracking-tight">
                Paccheri + Calabrese + Pecorino
              </p>
              <p className="text-sm text-caffe-mute mt-1">$18.50 · ready in ~6 min</p>
            </div>
            <Link href="/order" className="inline-flex items-center justify-center h-12 px-6 bg-peperoncino text-carta rounded-sm font-medium">
              Send to checkout
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

interface BuilderColumnProps {
  label: string;
  italian: string;
  items: string[];
}

function BuilderColumn({ label, italian, items }: BuilderColumnProps) {
  return (
    <div>
      <p className="label-it mb-1">{label}</p>
      <p className="font-display text-3xl tracking-tight mb-5">{italian}</p>
      <ul className="space-y-2">
        {items.map((i) => (
          <li
            key={i}
            className="px-4 py-3 border border-cartaDeep rounded-sm hover:border-caffe hover:bg-monogram-tint cursor-pointer transition-colors"
            // dangerouslySetInnerHTML used only for &rsquo; entity safety; static strings only
            dangerouslySetInnerHTML={{ __html: i }}
          />
        ))}
      </ul>
    </div>
  );
}
