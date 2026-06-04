import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface Entry {
  kind: string;
  region: string;
  title: string;
  dek: string;
  date: string;
  body: string[];
  image: string;
}

const ENTRIES: Record<string, Entry> = {
  'why-bergamot-only-grows-in-calabria': {
    kind: 'Region',
    region: 'Calabria',
    title: 'Why bergamot only grows in Calabria',
    dek: "It needs a specific 60-mile stretch of Ionian coast. The world's perfumers have known since the 1700s. So have the Iera brothers.",
    date: '2026-05-02',
    image: '/images/menu/spritz-calabrese.jpg',
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
    image: '/images/menu/orecchiette.jpg',
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
    image: '/images/menu/cappuccino.jpg',
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
    dek: "A 110-year-old salumeria in Bologna, and why we won't buy mortadella from anyone else.",
    date: '2026-03-15',
    image: '/images/menu/panino-mortadella.jpg',
    body: [
      "There's mortadella, and then there's Pasquini mortadella. The salumeria has been in Bologna since 1916. The recipe hasn't changed.",
      'It matters because mortadella is mostly fat. The wrong fat — industrial, oversmoothed, oversalted — and the panino mortadella loses its reason for existing.',
      "Pasquini hand-trims the pork shoulder, hand-mixes the pistachio (Bronte DOP, like ours), and cures longer than the supermarket version. You can taste it. The panino at IT has it. The tagliere has a slice of it.",
    ],
  },

  // Four new entries

  'cipolla-rossa-di-tropea': {
    kind: 'Region',
    region: 'Calabria',
    title: "The Tropea red onion, and the soil that makes it sweet",
    dek: "It looks like a regular red onion. It tastes like fruit. Same species, different geology.",
    date: '2026-05-29',
    image: '/images/regions/calabria.jpg',
    body: [
      'Tropea is a coastal town in Calabria, about an hour north of where the brothers grew up. The red onion grown there — Cipolla Rossa di Tropea IGP — looks like a regular red onion. You slice it, you taste it, and you stop.',
      "It's almost fruity. There's a sweetness in it that the same species grown in Sicily or in Puglia or in California doesn't have. The reason is the soil — sandy, well-drained, salty from the Tyrrhenian breeze — and the harvest window, which is three weeks long.",
      "We get ours through a co-op of about forty farmers, all of them within twenty kilometers of Tropea proper. They harvest in May and June. We get them air-shipped weekly during the season and stretched out into August with controlled-atmosphere storage.",
      "You see them on the menu in the Bruschetta di Cipolla starter from May through August. After that they go away, and we wait. That's the point. Italian seasonality means a thing exists for a window, then it doesn't.",
    ],
  },

  'caffe-borbone-napoli': {
    kind: 'Supplier',
    region: 'Campania',
    title: "Caffè Borbone, and why our cappuccino tastes like Naples",
    dek: "We tested 14 espresso blends. We picked the one that tasted like the cafés the brothers grew up walking into. That's the whole story.",
    date: '2026-05-15',
    image: '/images/menu/espresso.jpg',
    body: [
      'There are good roasters everywhere. Third-wave roasters in Brooklyn. Italian roasters in San Francisco. Specialty roasters in Melbourne. We tested fourteen of them when we opened Collins.',
      "We picked Caffè Borbone. They're from Naples. Their Miscela Nera is a dark Italian roast — by 2026 standards, almost old-school. It's bitter, full-bodied, balanced by a long finish. It tastes like the cafés Renato walked into as a kid in Calabria, which were all stocked with Neapolitan beans.",
      "The reason it works in our cappuccino: when you steam milk and pour it over a Borbone shot, the bitter and the sweet meet in the right place. With a lighter roast, the milk overwhelms the coffee. With Borbone, they hold each other.",
      "The cappuccino at IT costs $5.25. It will cost more eventually because the green-bean market is what it is. But the recipe doesn't change. Caffè Borbone Miscela Nera, eighteen-gram dose, twenty-six seconds, six ounces of milk steamed to 140°F.",
      "Don't order it after 11am. We won't judge you, but we will notice.",
    ],
  },

  'italian-breakfast-7am-midtown': {
    kind: 'Neighborhood',
    region: 'NYC',
    title: 'Italian breakfast at 7am in Midtown',
    dek: 'A morning at 390 5th Avenue is the best thing about commuting to Midtown. We mean that.',
    date: '2026-05-08',
    image: '/images/locations/5th-hero.jpg',
    body: [
      '7am, June, Tuesday. 390 5th Avenue is six blocks north of the Empire State Building, two blocks south of Bryant Park, on a stretch of 5th that fills up by 7:30 with people walking to offices.',
      'The Italian breakfast move is this: walk in, order a cappuccino and a cornetto vuoto, stand at the counter, drink your coffee in three minutes, leave. That\'s how it\'s done in Italy. That\'s how it\'s done at IT.',
      "Cappuccino: $5.25. Cornetto vuoto (plain croissant): $3.95. Total time elapsed: about four minutes from walking in to walking out. Cost: under nine dollars. The cappuccino is from Caffè Borbone in Naples. The cornetto is laminated with French butter because that's the only way it works.",
      "The brothers wanted to open a 7am store in Midtown specifically because nobody else does Italian breakfast right in this neighborhood. Bryant Park has Le Pain Quotidien, which is fine but it's not Italian. There are espresso bars further south but they make you sit down and wait. We're the fast option.",
      'We also do a real Italian colazione on weekends: tre cornetti + cappuccino + spremuta, $14, served standing or sitting. Get it before 10am or the brothers will tell you the breakfast is over.',
    ],
  },

  'madeo-nduja-crucoli': {
    kind: 'Supplier',
    region: 'Calabria',
    title: "Madeo, the n'duja, and the hill town of Crucoli",
    dek: "We get our n'duja from a single salumificio in a town of 3,000 people. They've been making it the same way since 1925.",
    date: '2026-04-30',
    image: '/images/menu/paccheri-calabrese.jpg',
    body: [
      "N'duja is a spreadable spicy salami. It's the most distinctive thing on the IT menu. It's also the most Calabrian — outside Calabria, real n'duja is hard to find. Outside Italy, it's borderline impossible.",
      "Ours comes from Madeo, a salumificio in Crucoli — a hill town of about 3,000 people in the province of Crotone, eastern Calabria, about an hour from where the brothers grew up. They've been making n'duja since 1925. Three generations.",
      "The recipe is hard to describe and easy to taste: fatty pork shoulder, lean cuts, lard, salt, and a lot of Calabrian peperoncino — both the dried ground variety and the fresh, smoked. It's stuffed into a natural casing and aged for about three months. The result spreads at room temperature like soft butter and tastes like spicy bacon, if bacon were also a chili oil.",
      "We import in 5kg blocks. Renato decided early that we'd only buy from Madeo. Other salumifici make n'duja, some of them well. But Madeo's has a smoke note that none of the others quite hit, and the brothers grew up with it.",
      "On the menu: in the paccheri alla calabrese, in the spianata pizza, in the tagliere as a standalone spread. If you've never had n'duja, that's the place to start — on the bread, with a glass of Calabrian red. Be warned. It's spicy. Calabrian spicy, not cautious.",
    ],
  },
};

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
          <h1 className="font-display text-balance" style={{ fontSize: 'var(--text-display)' }}>
            {e.title}
          </h1>
          <p className="mt-6 text-xl text-carta/85 italic max-w-2xl text-pretty">{e.dek}</p>
          <p className="mt-8 text-sm text-carta/60">
            {new Date(e.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </section>

      <section className="bg-carta">
        <div className="container-narrow py-8">
          <div className="aspect-[16/9] bg-carta-deep rounded-sm overflow-hidden relative">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${e.image}')` }}
              aria-hidden
            />
          </div>
        </div>
      </section>

      <section className="section bg-carta">
        <div className="container-narrow prose-editorial">
          {e.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      <section className="section-tight bg-carta-deep border-t border-carta">
        <div className="container-narrow flex flex-wrap justify-between gap-6">
          <Link href="/journal" className="link-editorial text-lg">← All journal pieces</Link>
          <Link href="/menu" className="link-editorial text-lg">See the menu →</Link>
        </div>
      </section>
    </article>
  );
}
