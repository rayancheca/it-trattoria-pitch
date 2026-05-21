'use client';

import { motion } from 'framer-motion';

export function NewsletterCTA() {
  return (
    <section className="section bg-caffe text-carta relative overflow-hidden" aria-labelledby="newsletter-heading">
      {/* Soft glow behind the headline */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] max-w-3xl max-h-3xl rounded-full bg-monogram/30 blur-3xl pointer-events-none"
      />
      <div className="container-narrow text-center relative">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="label-it text-bergamot mb-4"
        >
          Newsletter
        </motion.p>
        <motion.h2
          id="newsletter-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-balance"
          style={{ fontSize: 'var(--text-display)' }}
        >
          A monthly letter from the <span className="italic">kitchen</span>.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-lg text-carta/85 max-w-xl mx-auto text-pretty"
        >
          What&rsquo;s coming on the menu. New suppliers we&rsquo;re proud of. Where the
          brothers are next. Once a month, never more.
        </motion.p>
        <motion.form
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-stretch gap-3 max-w-md mx-auto"
          action="/api/newsletter"
          method="post"
        >
          <label htmlFor="newsletter-email" className="sr-only">Email address</label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            placeholder="your@email.com"
            required
            className="flex-1 h-12 px-4 bg-transparent border border-carta/30 rounded-sm text-carta placeholder:text-carta/50 focus:outline-none focus:border-carta"
          />
          <button
            type="submit"
            className="h-12 px-6 bg-peperoncino text-carta rounded-sm font-medium hover:bg-peperoncino-soft transition-colors"
          >
            Subscribe
          </button>
        </motion.form>
      </div>
    </section>
  );
}
