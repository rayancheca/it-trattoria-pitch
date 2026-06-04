import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { CheckoutClient } from './CheckoutClient';

export const metadata: Metadata = pageMetadata({
  title: 'Checkout',
  description: 'Finish your IT Trattoria order — pickup or delivery, in 30 seconds.',
  path: '/order/checkout',
  noIndex: true,
});

export default function CheckoutPage() {
  return <CheckoutClient />;
}
