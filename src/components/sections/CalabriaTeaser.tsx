import Link from 'next/link';
import { ArrowLink } from '@/components/ui/ArrowLink';

/**
 * Calabria teaser — the brand's emotional core, surfaced on the homepage.
 *
 * This is the section the R3 differentiation hypothesis was about: making
 * regional Italy (and specifically Calabria) the spine of the site rather
 * than another row of feature cards.
 */
export function CalabriaTeaser() {
  return (
    <section className="section bg-monogram text-carta relative isolate" aria-labelledby="calabria-heading">
      {/* Subtle grain overlay */}
      <div aria-hidden className="absolute inset-0 grain opacity-30" />

      <div className="container-edge grid md:grid-cols-12 gap-10 lg:gap-16 items-end relative">
        <div className="md:col-span-7 lg:col-span-6">
          <p className="label-it text-bergamot mb-4">Da Calabria · From Calabria</p>
          <h2
            id="calabria-heading"
            className="font-display text-balance"
            style={{ fontSize: 'var(--text-display)' }}
          >
            Two brothers.
            <br />
            <span className="italic">One pasta machine.</span>
            <br />
            One region you can taste.
          </h2>
        </div>

        <div className="md:col-span-5 lg:col-span-5 lg:col-start-8 space-y-6">
          <p className="text-lg lg:text-xl leading-relaxed text-carta/90 text-pretty">
            Renato and Gio Iera grew up in Calabria — the toe of Italy, where
            peperoncino goes on everything and bergamot grows nowhere else in the
            world. Eleven years ago they opened a single counter in Paris. Today
            you can taste their hometown in <span className="italic">paccheri alla calabrese</span>,
            in tiramisù al bergamotto, in the spianata pizza they ate as kids.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-3 pt-3">
            <ArrowLink href="/regions/calabria" className="text-carta text-lg">
              <span className="text-carta">Eat Calabrian</span>
            </ArrowLink>
            <ArrowLink href="/story" className="text-carta text-lg">
              <span className="text-carta">Read the story</span>
            </ArrowLink>
          </div>
        </div>
      </div>

      {/* Regional pin strip — preview of the regions map */}
      <div className="container-edge mt-16 lg:mt-24 relative">
        <div className="flex items-center justify-between mb-4">
          <p className="label-it text-bergamot">Other regions on the menu</p>
          <Link href="/regions" className="label-it text-carta/70 hover:text-carta">
            See the map →
          </Link>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-carta/70 font-display text-2xl tracking-tight">
          {['Sicilia', 'Campania', 'Puglia', 'Lazio', 'Emilia-Romagna', 'Toscana', 'Liguria', 'Veneto', 'Lombardia'].map((r) => (
            <span key={r} className="hover:text-carta transition-colors cursor-default">
              {r}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
