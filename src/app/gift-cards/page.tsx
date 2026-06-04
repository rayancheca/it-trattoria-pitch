'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Reveal, StaggerChildren, StaggerItem } from '@/components/ui/MotionSection';
import { ParallaxImage } from '@/components/ui/ParallaxImage';

const AMOUNTS = [25, 50, 75, 100, 150, 250] as const;

const HOW_IT_WORKS = [
  { n: '01', label: 'Pick an amount', body: 'Any amount from $25 to $250. Custom amounts on request.' },
  { n: '02', label: 'Write a note', body: 'A real note from you to them. Italian welcome but not required.' },
  { n: '03', label: 'Choose delivery', body: 'Email on a date you pick, or printed and shipped (USPS, $3).' },
  { n: '04', label: 'They eat', body: 'Use online or at the counter at any of our four trattorias. Never expires.' },
];

const IDEAS = [
  { title: 'Housewarming', italian: 'Per la casa nuova', blurb: 'A counter dinner for two on their first Friday in the new place.', amount: 75 },
  { title: 'The new parents', italian: 'Per i neogenitori', blurb: 'Three weeks of dinners that arrive hot. They&rsquo;ll thank you.', amount: 250 },
  { title: 'The Italian friend', italian: 'Per il vero italiano', blurb: 'They&rsquo;ll fact-check the cacio e pepe. Worth the gift.', amount: 100 },
  { title: 'The team', italian: 'Per i colleghi', blurb: 'Office Friday lunch for the whole floor. Talk to catering.', amount: 500 },
  { title: 'A first date', italian: 'Per il primo appuntamento', blurb: 'Lincoln Road patio, two spritzes, dessert if it goes well.', amount: 100 },
  { title: 'The "just because"', italian: 'Senza occasione', blurb: 'No event. No birthday. Just lunch.', amount: 50 },
];

export default function GiftCardsPage() {
  const [amount, setAmount] = useState<number>(50);
  const [custom, setCustom] = useState<string>('');

  return (
    <>
      <section className="relative bg-monogram text-carta" style={{ minHeight: '60svh' }}>
        <div className="absolute inset-0">
          <ParallaxImage
            src="/images/menu/tagliere-calabrese.jpg"
            alt=""
            className="absolute inset-0"
            intensity={8}
            overlay="bg-gradient-to-b from-monogram/50 via-monogram/75 to-monogram"
          />
        </div>
        <div className="container-edge relative section flex flex-col justify-end" style={{ minHeight: '60svh' }}>
          <Reveal as="p" className="label-it text-bergamot mb-4">Buono regalo · Gift card</Reveal>
          <Reveal as="h1" delay={0.1}>
            <span className="font-display tracking-tight text-balance max-w-4xl block" style={{ fontSize: 'var(--text-display)', lineHeight: 0.95 }}>
              Give someone <span className="italic">fresh pasta</span>.
            </span>
          </Reveal>
          <Reveal as="p" delay={0.2} className="mt-6 text-lg text-carta/85 max-w-2xl text-pretty">
            Use online or at the counter. Works at any of our four trattorias —
            Miami Beach to Manhattan. Never expires.
          </Reveal>
        </div>
      </section>

      <section className="section bg-carta">
        <div className="container-edge grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <Reveal as="div" className="lg:col-span-6">
            <p className="label-it mb-3">Anteprima · Preview</p>
            <motion.div
              key={amount}
              initial={{ scale: 0.96, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="aspect-[16/10] bg-caffe text-carta rounded-md overflow-hidden relative shadow-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-monogram via-caffe to-caffe" aria-hidden />
              <div aria-hidden className="absolute inset-0 grain opacity-25 pointer-events-none" />
              <div className="relative h-full p-8 lg:p-10 flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="label-it text-bergamot">Buono regalo</p>
                    <p className="label-it text-carta/70 mt-1">IT — Italian Trattoria</p>
                  </div>
                  <span aria-hidden style={{
                    width: 44, height: 44, background: '#F4EDE0', color: '#1F4D2E', borderRadius: 2,
                    fontFamily: 'var(--font-display)', fontSize: 28, lineHeight: 1, letterSpacing: '-0.04em',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center'
                  }}>IT</span>
                </div>
                <div>
                  <p className="font-display italic text-2xl text-bergamot/85 max-w-xs text-balance">
                    A monthly letter from the kitchen, in a single dinner.
                  </p>
                  <p className="mt-6 num font-display text-7xl leading-none">${amount}</p>
                </div>
              </div>
            </motion.div>
            <p className="mt-4 text-sm text-caffe-mute">
              Digital and physical versions available. Same design.
            </p>
          </Reveal>

          <Reveal as="div" delay={0.15} className="lg:col-span-6">
            <p className="label-it mb-3">Scegli · Choose</p>
            <h2 className="font-display text-balance" style={{ fontSize: 'var(--text-h1)' }}>Pick an amount.</h2>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {AMOUNTS.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => { setAmount(a); setCustom(''); }}
                  className={`aspect-[5/3] border rounded-sm font-display text-2xl lg:text-3xl tracking-tight num transition-colors ${
                    amount === a && !custom ? 'bg-caffe text-carta border-caffe' : 'border-caffe hover:bg-caffe hover:text-carta'
                  }`}
                >
                  ${a}
                </button>
              ))}
            </div>
            <div className="mt-4">
              <label className="block">
                <span className="label-it mb-2 block">Or a custom amount</span>
                <div className="flex items-center gap-2">
                  <span className="font-display text-2xl text-caffe-mute">$</span>
                  <input
                    type="number"
                    min={10}
                    max={1000}
                    value={custom}
                    onChange={(e) => {
                      setCustom(e.target.value);
                      const n = Number(e.target.value);
                      if (Number.isFinite(n) && n > 0) setAmount(n);
                    }}
                    placeholder="Other"
                    className="w-32 h-12 px-3 border border-carta-deep rounded-sm bg-carta num text-lg"
                  />
                </div>
              </label>
            </div>

            <div className="mt-8 grid sm:grid-cols-2 gap-3">
              <button
                type="button"
                className="h-14 px-6 bg-peperoncino text-carta rounded-sm font-medium hover:bg-peperoncino-soft transition-colors"
                onClick={() => alert(`Mockup: $${amount} digital gift card.\nProduction wires Stripe Checkout — see HANDOFF.md`)}
              >
                Send digital · ${amount}
              </button>
              <button
                type="button"
                className="h-14 px-6 border border-caffe rounded-sm font-medium hover:bg-caffe hover:text-carta transition-colors"
                onClick={() => alert(`Mockup: $${amount} printed card (+$3 ship).\nProduction wires Stripe Checkout — see HANDOFF.md`)}
              >
                Mail a printed card
              </button>
            </div>
            <p className="mt-4 text-xs text-caffe-mute">
              Checkout uses Stripe in production. This mockup stubs the payment step.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section bg-carta-deep">
        <div className="container-edge">
          <Reveal as="div" className="mb-12 max-w-2xl">
            <p className="label-it mb-3">Come funziona · How it works</p>
            <h2 className="font-display text-balance" style={{ fontSize: 'var(--text-h1)' }}>Four steps. Two minutes.</h2>
          </Reveal>
          <StaggerChildren className="grid md:grid-cols-4 gap-x-8 gap-y-10">
            {HOW_IT_WORKS.map((s) => (
              <StaggerItem key={s.n}>
                <div>
                  <p className="font-display text-6xl text-peperoncino leading-none num">{s.n}</p>
                  <p className="label-it mt-4">{s.label}</p>
                  <p className="mt-2 text-caffe-soft text-pretty leading-relaxed">{s.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <section className="section bg-carta">
        <div className="container-edge">
          <Reveal as="div" className="mb-12 max-w-2xl">
            <p className="label-it mb-3">Idee · Ideas</p>
            <h2 className="font-display text-balance" style={{ fontSize: 'var(--text-h1)' }}>
              Six gifts that <span className="italic">land</span>.
            </h2>
          </Reveal>
          <StaggerChildren className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
            {IDEAS.map((idea) => (
              <StaggerItem key={idea.title}>
                <article className="border-t border-carta-deep pt-5 group">
                  <p className="label-it mb-2 text-caffe-mute">{idea.italian}</p>
                  <h3 className="font-display text-2xl tracking-tight">{idea.title}</h3>
                  <p className="mt-2 text-caffe-soft text-pretty" dangerouslySetInnerHTML={{ __html: idea.blurb }} />
                  <button
                    type="button"
                    onClick={() => setAmount(idea.amount)}
                    className="mt-4 link-editorial text-sm inline-flex items-center gap-2"
                  >
                    Try ${idea.amount} →
                  </button>
                </article>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <section className="section-tight bg-caffe text-carta">
        <div className="container-edge grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <p className="label-it text-bergamot mb-3">Larger gifts</p>
            <h2 className="font-display text-balance" style={{ fontSize: 'var(--text-h2)' }}>
              Gifting for a team or an event?
            </h2>
            <p className="mt-4 text-carta/85 text-pretty max-w-prose">
              Anything over $500 makes more sense as a catering credit. We&rsquo;ll work
              with you and the recipient to plan a real meal.
            </p>
          </div>
          <div className="md:col-span-5 md:text-right">
            <Link
              href="/catering"
              className="inline-flex items-center justify-center h-12 px-6 bg-peperoncino text-carta rounded-sm font-medium hover:bg-peperoncino-soft transition-colors"
            >
              Talk to catering
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
