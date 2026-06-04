import type { Metadata } from 'next';
import { Suspense } from 'react';
import { pageMetadata } from '@/lib/seo';
import { ConfirmationClient } from './ConfirmationClient';

export const metadata: Metadata = pageMetadata({
  title: 'Order Confirmed',
  description: 'Your IT Trattoria order is on the way.',
  path: '/order/confirmation',
  noIndex: true,
});

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="section container-edge"><p className="text-caffe-mute">Loading…</p></div>}>
      <ConfirmationClient />
    </Suspense>
  );
}
