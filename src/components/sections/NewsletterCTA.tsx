export function NewsletterCTA() {
  return (
    <section className="section bg-caffe text-carta" aria-labelledby="newsletter-heading">
      <div className="container-narrow text-center">
        <p className="label-it text-bergamot mb-4">Newsletter</p>
        <h2
          id="newsletter-heading"
          className="font-display text-balance"
          style={{ fontSize: 'var(--text-display)' }}
        >
          A monthly letter from the <span className="italic">kitchen</span>.
        </h2>
        <p className="mt-5 text-lg text-carta/85 max-w-xl mx-auto text-pretty">
          What&rsquo;s coming on the menu. New suppliers we&rsquo;re proud of. Where the
          brothers are next. Once a month, never more.
        </p>
        <form
          className="mt-10 flex flex-col sm:flex-row items-stretch gap-3 max-w-md mx-auto"
          action="/api/newsletter"
          method="post"
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
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
        </form>
      </div>
    </section>
  );
}
