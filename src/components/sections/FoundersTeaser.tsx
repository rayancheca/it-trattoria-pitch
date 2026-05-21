import Link from 'next/link';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { founderBySlug } from '@/data/founders';

export function FoundersTeaser() {
  const renato = founderBySlug('renato');
  const gio = founderBySlug('gio');

  return (
    <section className="section bg-carta-deep" aria-labelledby="founders-heading">
      <div className="container-edge grid md:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Portraits — side-by-side editorial */}
        <div className="md:col-span-6 grid grid-cols-2 gap-4">
          <div className="aspect-[3/4] bg-carta relative overflow-hidden rounded-sm">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${renato?.portrait?.src ?? ''}')` }}
              aria-hidden
            />
            <div className="absolute bottom-4 left-4 right-4">
              <p className="label-it text-carta drop-shadow">Renato</p>
            </div>
          </div>
          <div className="aspect-[3/4] bg-carta relative overflow-hidden rounded-sm mt-12">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${gio?.portrait?.src ?? ''}')` }}
              aria-hidden
            />
            <div className="absolute bottom-4 left-4 right-4">
              <p className="label-it text-carta drop-shadow">Gio</p>
            </div>
          </div>
        </div>

        <div className="md:col-span-6">
          <p className="label-it mb-4">Storia · Our story</p>
          <h2
            id="founders-heading"
            className="font-display text-balance"
            style={{ fontSize: 'var(--text-display)' }}
          >
            Two brothers.
            <br />
            Paris in 2014.
            <br />
            <span className="italic">Miami Beach in 2024.</span>
          </h2>
          <p className="mt-6 text-lg text-caffe-soft leading-relaxed text-pretty max-w-prose">
            Renato and Gio left Calabria in their twenties and landed in Paris. Eleven years
            ago they opened a single counter with one rule: cook the food they grew up eating.
            Twenty trattorias and one Atlantic crossing later, they&rsquo;re cooking the same
            food on Collins Avenue.
          </p>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            <ArrowLink href="/story" className="text-lg">Read the full story</ArrowLink>
            <ArrowLink href="/regions/calabria" className="text-lg">See where it started</ArrowLink>
          </div>
        </div>
      </div>
    </section>
  );
}
