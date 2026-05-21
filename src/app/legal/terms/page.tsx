import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Terms of Service',
  description: 'Terms governing use of IT Trattoria services.',
  path: '/legal/terms',
  noIndex: true,
});

export default function TermsPage() {
  return (
    <section className="section bg-carta">
      <div className="container-narrow prose-editorial">
        <p className="label-it mb-3">Terms</p>
        <h1 className="font-display text-balance" style={{ fontSize: 'var(--text-h1)' }}>
          Terms of Service
        </h1>
        <div className="bg-bergamot/20 border border-bergamot/40 rounded-sm p-4 my-6">
          <p className="text-sm text-caffe-soft">
            <strong>[BOILERPLATE PLACEHOLDER]</strong> — Production terms must be reviewed by counsel before any real launch.
          </p>
        </div>
        <p>
          By using this website or ordering from IT — Italian Trattoria, you agree to these
          terms. Standard ordering, payment, refund, and dispute terms apply.
        </p>
        <p className="text-sm text-caffe-mute mt-12">Last updated: {new Date().toISOString().slice(0, 10)}</p>
      </div>
    </section>
  );
}
