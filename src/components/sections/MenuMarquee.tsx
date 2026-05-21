import { Marquee } from '@/components/ui/Marquee';

const PHRASES = [
  'Paccheri alla Calabrese',
  'Tagliatelle al Ragù',
  'Pizza alla Pala',
  "Tiramisù al Bergamotto",
  "N'duja",
  'Cacio e Pepe',
  'Burrata di Andria',
  'Mortadella & Pistacchio',
  'Spritz Calabrese',
  'Cappuccino al Banco',
];

/**
 * Marquee strip between the hero and featured dishes — a horizontal rhythm
 * break that signals "this is a real menu" without doing the work of a card grid.
 */
export function MenuMarquee() {
  return (
    <div className="bg-caffe text-carta py-8 border-y border-caffe-soft overflow-hidden">
      <Marquee items={PHRASES} speed={40} />
    </div>
  );
}
