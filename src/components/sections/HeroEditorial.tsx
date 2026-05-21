import Link from 'next/link';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/Button';

/**
 * Editorial type-over-image hero. R5 reference: Da Maria + Don Angie register.
 *
 * Photography note: hero photo lives at /public/images/hero/pasta-overhead.jpg
 * with art-direction overhead, natural light, single plate on warm linen.
 * For the mockup, falls back to a designed gradient + illustration if the
 * image is missing.
 */
export function HeroEditorial() {
  return (
    <section
      className="relative isolate overflow-hidden bg-caffe text-carta"
      aria-labelledby="hero-heading"
    >
      {/* Background photo / fallback gradient */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(rgba(26,22,20,0.55), rgba(26,22,20,0.85)), url('/images/hero/pasta-overhead.jpg')",
          }}
        />
        {/* Fallback when image missing — warm gradient with the brand greens */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-br from-monogram via-caffe to-caffe"
        />
      </div>

      <div className="container-edge relative min-h-[calc(100svh-5rem)] flex flex-col justify-between py-12 lg:py-20">
        {/* Top eyebrow */}
        <div className="flex items-center gap-3">
          <span className="dot-open" aria-hidden />
          <span className="label-it text-carta/80">Aperto · Open now in Miami Beach &amp; NYC</span>
        </div>

        {/* Hero type */}
        <div className="mt-12 lg:mt-0 max-w-[20ch]">
          <p className="label-it text-bergamot mb-4 lg:mb-6">From Calabria, with a pasta machine</p>
          <h1
            id="hero-heading"
            className="font-display text-balance"
            style={{ fontSize: 'var(--text-hero)' }}
          >
            Fresh pasta.
            <br />
            Real Italian.
            <br />
            <span className="italic text-bergamot">No table.</span>
          </h1>
          <p className="mt-6 lg:mt-8 text-lg lg:text-xl text-carta/85 max-w-prose text-pretty">
            Counter-service trattorias by two Calabrian brothers. Open kitchens, daily
            pasta, real espresso. Four spots between Collins Avenue and Bryant Park.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" variant="accent">
              <Link href="/order">Order online</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="text-carta border-carta hover:bg-carta hover:text-caffe">
              <Link href="/locations">Find your trattoria</Link>
            </Button>
          </div>
        </div>

        {/* Bottom strip: rotating "today's plate" + scroll cue */}
        <div className="mt-16 lg:mt-0 flex items-end justify-between gap-6">
          <div>
            <p className="label-it text-carta/60 mb-2">Only this week</p>
            <p className="font-display italic text-2xl lg:text-3xl tracking-tight max-w-md text-balance">
              Tiramisù al bergamotto — the Calabrian one. From the brothers&rsquo; grandmother.
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-3 text-carta/60 shrink-0">
            <span className="label-it">Scroll</span>
            <ArrowDown size={20} aria-hidden className="animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
