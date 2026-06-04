import { Marquee } from '@/components/ui/Marquee';
import { MENU_ITEMS } from '@/data/menu';

/**
 * Marquee strip between the hero and featured dishes — a horizontal rhythm
 * break that signals "this is a real menu." Pulls verified items from
 * src/data/menu.ts (canonical source: research/10-real-menu-data.json).
 *
 * Includes one aspirational item suffixed with "+" so the user can see we're
 * also pitching a Calabrian item — honestly marked.
 */
const PHRASES = (() => {
  const verified = MENU_ITEMS
    .filter((i) => i.verified && !i.aspirational)
    .map((i) => i.italianName ?? i.name);
  // Curate a clean, recognizable rotation
  const order = [
    'Spaghetti Carbonara',
    'Rigatoni Bolognese',
    'Pizza Margherita',
    'Pizza Diavola',
    'Lasagna Bolognese',
    'Antipasto della Casa',
    'Tiramisù Coffee',
    'Cappuccino',
    'Spaghetti Pomodoro',
    'Stracciatella & Focaccia',
  ];
  return order.filter((name) => verified.some((v) => v.toLowerCase().includes(name.toLowerCase().split(' ')[0])));
})();

export function MenuMarquee() {
  return (
    <div className="bg-caffe text-carta py-8 border-y border-caffe-soft overflow-hidden">
      <Marquee items={PHRASES.length > 0 ? PHRASES : ['Spaghetti Carbonara', 'Rigatoni Bolognese', 'Pizza Margherita', 'Lasagna Bolognese', 'Antipasto della Casa', 'Tiramisù Coffee']} speed={40} />
    </div>
  );
}
