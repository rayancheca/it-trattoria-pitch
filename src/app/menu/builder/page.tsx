import { pageMetadata } from '@/lib/seo';
import { PastaBuilderClient } from './PastaBuilderClient';

export const metadata = pageMetadata({
  title: 'Build Your Pasta',
  description:
    'Pick your shape, choose your sauce, name your add-ons. The fastest fresh pasta in Miami Beach or Midtown.',
  path: '/menu/builder',
});

export default function PastaBuilderPage() {
  return <PastaBuilderClient />;
}
