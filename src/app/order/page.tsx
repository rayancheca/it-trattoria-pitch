import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { OrderClient } from './OrderClient';

export const metadata: Metadata = pageMetadata({
  title: 'Order Online — Fresh pasta, pizza alla pala, real espresso',
  description:
    'Order fresh pasta, pizza alla pala, and dolci from your nearest IT trattoria. Pickup in 12–15 minutes or delivery via partner network.',
  path: '/order',
});

export default function OrderPage() {
  return <OrderClient />;
}
