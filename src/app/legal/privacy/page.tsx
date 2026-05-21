import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Privacy Policy',
  description: 'How IT Trattoria handles your data.',
  path: '/legal/privacy',
  noIndex: true,
});

export default function PrivacyPage() {
  return (
    <section className="section bg-carta">
      <div className="container-narrow prose-editorial">
        <p className="label-it mb-3">Privacy</p>
        <h1 className="font-display text-balance" style={{ fontSize: 'var(--text-h1)' }}>
          Privacy Policy
        </h1>
        <div className="bg-bergamot/20 border border-bergamot/40 rounded-sm p-4 my-6">
          <p className="text-sm text-caffe-soft">
            <strong>[BOILERPLATE PLACEHOLDER]</strong> — Production privacy policy must be reviewed by counsel before any real launch. See QUESTIONS.md #12.
          </p>
        </div>
        <p>
          We collect the email addresses people enter in our newsletter signups. We collect
          basic order data when people order online. We do not sell personal data.
        </p>
        <p>
          Cookies: we use first-party analytics (Vercel Analytics) and may use third-party
          analytics in production (Plausible). No third-party advertising trackers.
        </p>
        <p>
          To request a copy of your data or to have it deleted, email{' '}
          <a href="mailto:privacy@it-trattoria.com" className="link-editorial">privacy@it-trattoria.com</a>.
        </p>
        <p className="text-sm text-caffe-mute mt-12">Last updated: {new Date().toISOString().slice(0, 10)}</p>
      </div>
    </section>
  );
}
