import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Accessibility Statement',
  description: 'IT Trattoria&apos;s commitment to accessibility.',
  path: '/legal/accessibility',
  noIndex: true,
});

export default function AccessibilityPage() {
  return (
    <section className="section bg-carta">
      <div className="container-narrow prose-editorial">
        <p className="label-it mb-3">Accessibility</p>
        <h1 className="font-display text-balance" style={{ fontSize: 'var(--text-h1)' }}>
          Accessibility Statement
        </h1>
        <p>
          We aim to meet WCAG 2.2 AA on this website. Every component is keyboard-accessible;
          color contrast meets AA standards; motion respects <code>prefers-reduced-motion</code>;
          forms include explicit labels and error messages.
        </p>
        <p>
          If you encounter an accessibility issue, please email{' '}
          <a href="mailto:accessibility@it-trattoria.com" className="link-editorial">accessibility@it-trattoria.com</a>{' '}
          and we&rsquo;ll make it right.
        </p>
        <p className="text-sm text-caffe-mute mt-12">Last updated: {new Date().toISOString().slice(0, 10)}</p>
      </div>
    </section>
  );
}
