import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const ENTRIES = {
  'why-bergamot-only-grows-in-calabria': {
    kind: 'Region',
    region: 'Calabria',
    title: 'Why bergamot only grows in Calabria',
    dek: "It needs a specific 60-mile stretch of Ionian coast. The world's perfumers have known since the 1700s. So have the Iera brothers.",
    date: '2026-05-02',
    body: [
      "If you ask a perfumer where bergamot comes from, they'll say Reggio Calabria. Not 'Italy.' Not 'southern Italy.' Reggio Calabria — a specific 60-mile stretch of Ionian coast between Villa San Giovanni and Brancaleone. It's the only place on earth where Citrus bergamia produces commercial fruit.",
      'People have tried elsewhere. Sicilians have tried, an hour across the strait. Tunisians have tried. The Argentines have tried. The trees grow but the fruit doesn\'t have the oil. The microclimate is wrong — too dry, too hot, the wrong morning fog.',
      'Renato and Gio grew up an hour from the groves. The fruit in their tiramisù al bergamotto is from a four-generation farm outside Bagnara Calabra. The bergamot in the spritz is from the same farm. The marmalade on the Tagliere Calabrese is from a producer in Tropea who shares the same harvest.',
      'You can buy bergamot anywhere now — the oil is in Earl Grey, in perfume, in $14 fancy soaps. But the actual fruit, fresh and turned into a tiramisù, is hard to find outside Calabria. We figured out how to get it here without losing it.',
    ],
  },
  'the-mill-behind-our-pasta-flour': {
    kind: 'Supplier',
    region: 'Puglia',
    title: 'The mill behind our pasta flour',
    dek: 'Why we drive an extra hundred kilometers for the flour from a single mill in Altamura.',
    date: '2026-04-21',
    body: [
      'Pasta flour is mostly a settled question. You want semola di grano duro, finely milled. There are about a dozen mills in Italy that supply restaurants seriously. We could pick any one of them.',
      "We don't. We drive a hundred kilometers past closer mills to Molino Caputo in Altamura, Puglia. Here's why.",
      "Altamura wheat — Senatore Cappelli specifically — has a longer growing season, lower yield per acre, and a flavor that doesn't quite exist in the more industrial cultivars. The fresh tagliatelle made with it has a distinct smell when you stack it on a cooling rack: faintly sweet, faintly grassy.",
      "You can taste it in the cacio e pepe. We tell our cooks: the pasta should taste like something on its own. Sauce should improve it, not rescue it.",
    ],
  },
  'a-walking-tour-of-italian-midtown': {
    kind: 'Neighborhood',
    region: 'NYC',
    title: 'A walking tour of Italian Midtown',
    dek: 'From the espresso at 5th Ave to the cacio e pepe near Penn Station. Fifteen minutes on foot.',
    date: '2026-04-08',
    body: [
      'Start at 7:15am at 390 5th Avenue. Order a cappuccino. The barista will not judge you for ordering a cappuccino at 7:15. They will judge you at 11.',
      'Walk west. You\'ll hit Bryant Park in three minutes — sit on the gravel for a moment with a cornetto vuoto. The park is at its best before the lunch crowd.',
      "Then turn south on Broadway. Twelve minutes later you'll be at 530 7th Avenue. Lunch. Order the paccheri alla calabrese. Watch the line at the counter; the speed is the point.",
      'This is the IT walking tour. Twenty minutes of Midtown on foot, two trattorias, three reasons to do it again tomorrow.',
    ],
  },
  'pasquini-mortadella': {
    kind: 'Supplier',
    region: 'Emilia-Romagna',
    title: 'Pasquini, and the mortadella you can taste',
    dek: "A 110-year-old salumeria in Bologna, and why we won&apos;t buy mortadella from anyone else.",
    date: '2026-03-15',
    body: [
      "There's mortadella, and then there's Pasquini mortadella. The salumeria has been in Bologna since 1916. The recipe hasn't changed.",
      'It matters because mortadella is mostly fat. The wrong fat — industrial, oversmoothed, oversalted — and the panino mortadella loses its reason for existing.',
      "Pasquini hand-trims the pork shoulder, hand-mixes the pistachio (Bronte DOP, like ours), and cures longer than the supermarket version. You can taste it. The panino at IT has it. The tagliere has a slice of it.",
    ],
  },
} as const;

type EntrySlug = keyof typeof ENTRIES;

export async function generateStaticParams() {
  return Object.keys(ENTRIES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const e = ENTRIES[slug as EntrySlug];
  if (!e) return {};
  return pageMetadata({
    title: e.title,
    description: e.dek,
    path: `/journal/${slug}`,
  });
}

export default async function JournalEntryPage({ params }: PageProps) {
  const { slug } = await params;
  const e = ENTRIES[slug as EntrySlug];
  if (!e) notFound();

  return (
    <article>
      <section className="section bg-caffe text-carta">
        <div className="container-narrow">
          <p className="label-it text-bergamot mb-4">
            <Link href="/journal" className="text-bergamot link-editorial">Journal</Link> ·{' '}
            {e.kind} · {e.region}
          </p>
          <h1
            className="font-display text-balance"
            style={{ fontSize: 'var(--text-display)' }}
          >
            {e.title}
          </h1>
          <p className="mt-6 text-xl text-carta/85 italic max-w-2xl text-pretty">{e.dek}</p>
          <p className="mt-8 text-sm text-carta/60">
            {new Date(e.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </section>

      <section className="section bg-carta">
        <div className="container-narrow prose-editorial">
          {e.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      <section className="section-tight bg-cartaDeep border-t border-carta">
        <div className="container-narrow flex flex-wrap justify-between gap-6">
          <Link href="/journal" className="link-editorial text-lg">← All journal pieces</Link>
          <Link href="/menu" className="link-editorial text-lg">See the menu →</Link>
        </div>
      </section>
    </article>
  );
}
