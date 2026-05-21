import { pageMetadata } from '@/lib/seo';
import { HeroEditorial } from '@/components/sections/HeroEditorial';
import { MenuMarquee } from '@/components/sections/MenuMarquee';
import { FeaturedDishes } from '@/components/sections/FeaturedDishes';
import { StatsBar } from '@/components/sections/StatsBar';
import { CalabriaTeaser } from '@/components/sections/CalabriaTeaser';
import { LocationsPreview } from '@/components/sections/LocationsPreview';
import { FoundersTeaser } from '@/components/sections/FoundersTeaser';
import { PressLogoCloud } from '@/components/sections/PressLogoCloud';
import { JournalTeaser } from '@/components/sections/JournalTeaser';
import { NewsletterCTA } from '@/components/sections/NewsletterCTA';

export const metadata = pageMetadata({
  title: 'Fresh pasta, real Italian, no table.',
  description:
    'Counter-service Italian by two Calabrian brothers. Fresh pasta made daily, pizza alla pala, real espresso. Four trattorias across Miami Beach and Manhattan.',
  path: '/',
});

export default function HomePage() {
  return (
    <>
      <HeroEditorial />
      <MenuMarquee />
      <FeaturedDishes />
      <StatsBar />
      <CalabriaTeaser />
      <LocationsPreview />
      <FoundersTeaser />
      <JournalTeaser />
      <PressLogoCloud />
      <NewsletterCTA />
    </>
  );
}
