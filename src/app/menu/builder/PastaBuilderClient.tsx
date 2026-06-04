'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/cart/store';
import { emitCartBurst } from '@/lib/cart/burst';
import { formatPrice } from '@/data/menu';
import { Reveal } from '@/components/ui/MotionSection';

interface Choice {
  id: string;
  name: string;
  italianName?: string;
  region: string;
  priceCents: number;
  blurb: string;
  photo?: string;
}

const SHAPES: Choice[] = [
  { id: 'spaghetti', name: 'Spaghetti', italianName: 'Spaghetti', region: 'Lazio', priceCents: 0, blurb: 'Classic strand. The Roman default.', photo: '/images/real/menu/it-pasta.jpg' },
  { id: 'rigatoni', name: 'Rigatoni', italianName: 'Rigatoni', region: 'Lazio', priceCents: 0, blurb: 'Ridged tubes that catch every drop of sauce.', photo: '/images/real/menu/spaghetti-bolognaise.png' },
  { id: 'penne', name: 'Penne', italianName: 'Penne', region: 'Campania', priceCents: 0, blurb: 'Diagonal-cut tubes; everyone’s reliable favorite.', photo: '/images/real/menu/toast-menu-item-pasta.jpg' },
  { id: 'tagliatelle', name: 'Tagliatelle', italianName: 'Tagliatelle', region: 'Emilia-Romagna', priceCents: 100, blurb: 'Hand-cut ribbons. Best with ragù.', photo: '/images/real/menu/spaghetti-bolognaise.png' },
];

const SAUCES: Choice[] = [
  { id: 'pomodoro', name: 'Pomodoro', italianName: 'al Pomodoro', region: 'Sicilia', priceCents: 1595, blurb: 'Sicilian cherry tomato, basil, EVOO.' },
  { id: 'carbonara', name: 'Carbonara', italianName: 'alla Carbonara', region: 'Lazio', priceCents: 2195, blurb: 'Guanciale, pecorino, egg, black pepper. No cream.' },
  { id: 'bolognese', name: 'Bolognese', italianName: 'al Ragù', region: 'Emilia-Romagna', priceCents: 2095, blurb: 'Slow-cooked beef + pork ragù.' },
  { id: 'vodka', name: 'Vodka', italianName: 'alla Vodka', region: 'Lazio', priceCents: 1995, blurb: 'Tomato + cream + a controlled hit of vodka.' },
  { id: 'genovese', name: 'Pesto Genovese', italianName: 'alla Genovese', region: 'Liguria', priceCents: 1895, blurb: 'Basil pesto, parmigiano, cherry tomatoes.' },
  { id: 'siciliana', name: 'Siciliana', italianName: 'alla Siciliana', region: 'Sicilia', priceCents: 1795, blurb: 'Sicilian tomato + basil pesto + parmigiano.' },
];

const ADDS: Choice[] = [
  { id: 'pecorino', name: 'Extra pecorino romano DOP', region: 'Lazio', priceCents: 200, blurb: 'Aged 8 months. Adds salt + funk.' },
  { id: 'parmigiano', name: 'Extra parmigiano reggiano DOP', region: 'Emilia-Romagna', priceCents: 200, blurb: '30-month aged. Goes with everything.' },
  { id: 'spianata', name: 'Spianata Calabrese', region: 'Calabria', priceCents: 350, blurb: 'Pressed-flat spicy salame, the brothers’ home.' },
  { id: 'guanciale', name: 'Extra guanciale', region: 'Lazio', priceCents: 350, blurb: 'Cured pork jowl. Crisped, never drained.' },
  { id: 'truffle', name: 'Black truffle oil', region: 'Umbria', priceCents: 500, blurb: 'Drizzled at finish. Use sparingly.' },
  { id: 'pepperoncino', name: 'Calabrian peperoncino', region: 'Calabria', priceCents: 100, blurb: 'Crushed chili. Hot, not cautious.' },
];

export function PastaBuilderClient() {
  const [shape, setShape] = useState<Choice | null>(null);
  const [sauce, setSauce] = useState<Choice | null>(null);
  const [adds, setAdds] = useState<Set<string>>(new Set());
  const addItem = useCart((s) => s.addItem);
  const openCart = useCart((s) => s.openCart);
  const locationSlug = useCart((s) => s.locationSlug);
  const openLocationPicker = useCart((s) => s.openLocationPicker);

  const addedAdds = ADDS.filter((a) => adds.has(a.id));
  const totalCents = (shape?.priceCents ?? 0) + (sauce?.priceCents ?? 0) + addedAdds.reduce((sum, a) => sum + a.priceCents, 0);

  const isComplete = Boolean(shape && sauce);

  const buildName = useMemo(() => {
    if (!shape || !sauce) return 'Your build';
    return `${shape.name} ${sauce.italianName ?? sauce.name}${addedAdds.length > 0 ? ` + ${addedAdds.map((a) => a.name.replace('Extra ', '')).join(' + ')}` : ''}`;
  }, [shape, sauce, addedAdds]);

  function toggleAdd(id: string) {
    setAdds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function addToCart(ev: React.MouseEvent<HTMLButtonElement>) {
    if (!isComplete || !shape || !sauce) return;
    if (!locationSlug) {
      openLocationPicker();
      return;
    }
    // Compose a synthetic MenuItem-shaped object
    const synthetic = {
      id: `builder-${Date.now().toString(36)}`,
      slug: 'pasta-builder',
      name: buildName,
      italianName: undefined,
      category: 'a-tavola' as const,
      region: 'lazio' as const,
      description: `${shape.name} + ${sauce.name}${addedAdds.length > 0 ? ` + ${addedAdds.map((a) => a.name).join(', ')}` : ''}`,
      priceCents: totalCents,
      ingredients: [],
      sourcing: [],
      allergens: [],
      dietary: [],
      photo: shape.photo ? { src: shape.photo, alt: buildName } : undefined,
      availableAt: [locationSlug],
      sourcedFrom: ['builder'],
      verified: true,
    };
    addItem(synthetic as never, 1);
    emitCartBurst(ev.clientX, ev.clientY);
    openCart();
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-caffe text-carta">
        <div className="container-edge py-12 lg:py-16">
          <Reveal as="p" className="label-it text-bergamot mb-3">
            Costruisci la tua pasta · Build your pasta
          </Reveal>
          <Reveal as="h1" delay={0.1}>
            <span
              className="font-display text-balance max-w-4xl block"
              style={{ fontSize: 'var(--text-display)', lineHeight: 0.95 }}
            >
              Three choices. One bowl. <span className="italic">Built your way.</span>
            </span>
          </Reveal>
          <Reveal as="p" delay={0.2} className="mt-5 text-lg text-carta/85 max-w-2xl text-pretty">
            Shape, sauce, anything extra. We make it fresh once you tap Order.
          </Reveal>
        </div>
      </section>

      {/* Three-section single-page builder */}
      <section className="bg-carta">
        <div className="container-edge py-12 grid lg:grid-cols-[2fr_1fr] gap-12">
          <div className="space-y-12">
            {/* Step 1 — Shape */}
            <BuilderStep step="01" italian="Forma" label="Pick your shape">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {SHAPES.map((s) => (
                  <ChoiceCard
                    key={s.id}
                    choice={s}
                    active={shape?.id === s.id}
                    onSelect={() => setShape(s)}
                    showPlus={s.priceCents > 0}
                  />
                ))}
              </div>
            </BuilderStep>

            {/* Step 2 — Sauce */}
            <BuilderStep step="02" italian="Sugo" label="Pick your sauce" disabled={!shape}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {SAUCES.map((s) => (
                  <ChoiceCard
                    key={s.id}
                    choice={s}
                    active={sauce?.id === s.id}
                    onSelect={() => setSauce(s)}
                    showPrice
                  />
                ))}
              </div>
            </BuilderStep>

            {/* Step 3 — Add-ons */}
            <BuilderStep step="03" italian="Extra" label="Anything extra? (optional)" disabled={!sauce}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {ADDS.map((a) => (
                  <ChoiceCard
                    key={a.id}
                    choice={a}
                    active={adds.has(a.id)}
                    onSelect={() => toggleAdd(a.id)}
                    showPlus
                    multi
                  />
                ))}
              </div>
            </BuilderStep>
          </div>

          {/* Sticky live build summary */}
          <aside className="lg:sticky lg:top-32 self-start">
            <div className="bg-carta-deep rounded-sm p-6 lg:p-8">
              <p className="label-it mb-4">Live build · Anteprima</p>
              <div className="aspect-[5/4] bg-carta rounded-sm overflow-hidden relative mb-5">
                {shape?.photo ? (
                  <motion.div
                    key={shape.id}
                    initial={{ scale: 1.04, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${shape.photo}')` }}
                    aria-hidden
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-caffe-mute label-it text-center px-6">
                    Pick a shape to start
                  </div>
                )}
              </div>
              <h3 className="font-display text-2xl tracking-tight text-balance">
                {buildName}
              </h3>
              {shape && (
                <p className="mt-2 text-xs text-caffe-mute">
                  {shape.region}{sauce ? ` · ${sauce.region}` : ''}{addedAdds.length > 0 ? ` · ${addedAdds.length} extra${addedAdds.length === 1 ? '' : 's'}` : ''}
                </p>
              )}
              <motion.p
                key={totalCents}
                initial={{ scale: 0.96, opacity: 0.6 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="num font-display text-4xl mt-6"
              >
                {totalCents === 0 ? '—' : formatPrice(totalCents)}
              </motion.p>
              <button
                type="button"
                onClick={addToCart}
                disabled={!isComplete}
                className={`w-full mt-6 h-14 rounded-sm font-medium text-base transition-colors flex items-center justify-center gap-2 ${
                  isComplete
                    ? 'bg-peperoncino text-carta hover:bg-peperoncino-soft'
                    : 'bg-carta-deep text-caffe-mute cursor-not-allowed'
                }`}
              >
                <ShoppingBag size={16} aria-hidden />
                {isComplete ? `Add to cart · ${formatPrice(totalCents)}` : 'Pick a shape & sauce'}
              </button>
              <p className="mt-3 text-xs text-caffe-mute text-center">
                Ready in ~10 min once your order is placed.
              </p>
            </div>
            <p className="mt-5 text-center">
              <Link href="/menu" className="link-editorial text-sm">
                or browse the full menu →
              </Link>
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}

function BuilderStep({
  step,
  italian,
  label,
  disabled,
  children,
}: {
  step: string;
  italian: string;
  label: string;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={disabled ? 'opacity-40 pointer-events-none' : ''}>
      <div className="flex items-baseline gap-3 mb-5">
        <p className="num font-display text-2xl text-peperoncino">{step}</p>
        <p className="label-it">{italian}</p>
        <p className="font-display text-2xl tracking-tight">{label}</p>
      </div>
      {children}
    </div>
  );
}

function ChoiceCard({
  choice,
  active,
  onSelect,
  showPrice,
  showPlus,
  multi,
}: {
  choice: Choice;
  active: boolean;
  onSelect: () => void;
  showPrice?: boolean;
  showPlus?: boolean;
  multi?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`text-left p-4 rounded-sm border-2 transition-colors ${
        active
          ? 'border-peperoncino bg-monogram-tint'
          : 'border-carta-deep hover:border-caffe'
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-1">
        <p className="font-display text-lg tracking-tight leading-tight">{choice.name}</p>
        {active && (
          <span className="text-monogram shrink-0" aria-hidden>
            <Check size={16} strokeWidth={3} />
          </span>
        )}
      </div>
      <p className="text-xs text-caffe-mute mb-2">{choice.region}</p>
      <p className="text-xs text-caffe-soft text-pretty line-clamp-2">{choice.blurb}</p>
      <p className="num text-sm mt-3 text-caffe">
        {showPrice && choice.priceCents > 0
          ? formatPrice(choice.priceCents)
          : showPlus && choice.priceCents > 0
            ? `+ ${formatPrice(choice.priceCents)}`
            : 'Included'}
      </p>
      {multi && active && (
        <p className="mt-1 text-[10px] text-monogram label-it">Tap again to remove</p>
      )}
    </button>
  );
}
