/**
 * Locations — IT Trattoria US
 *
 * Source-of-truth note: the brief lists 4 locations. R1 forensic audit found only 3
 * live on the public site. We ship 4 in the mockup pending verification (see
 * QUESTIONS.md #4).
 */

export type LocationSlug =
  | 'miami-beach-collins'
  | 'miami-beach-lincoln-road'
  | 'nyc-midtown-7th'
  | 'nyc-midtown-5th';

export type CitySlug = 'miami-beach' | 'nyc';

export interface HoursRange {
  open: string;
  close: string;
}

export interface BusinessHours {
  monday: HoursRange | 'closed';
  tuesday: HoursRange | 'closed';
  wednesday: HoursRange | 'closed';
  thursday: HoursRange | 'closed';
  friday: HoursRange | 'closed';
  saturday: HoursRange | 'closed';
  sunday: HoursRange | 'closed';
}

export type LocationFeature =
  | 'open-kitchen'
  | 'fresh-pasta-on-site'
  | 'pizza-alla-pala'
  | 'patio'
  | 'beach-walk'
  | 'commuter-fast-lane'
  | 'late-night'
  | 'family-friendly'
  | 'group-friendly'
  | 'breakfast'
  | 'aperitivo-hour';

export interface Location {
  slug: LocationSlug;
  city: CitySlug;
  name: string;
  shortName: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: 'FL' | 'NY';
    zip: string;
  };
  geo: { lat: number; lng: number };
  phone: string;
  phoneFormatted: string;
  email?: string;
  hours: BusinessHours;
  timezone: string;
  features: LocationFeature[];
  neighborhood: {
    name: string;
    note: string;
    transit?: string;
    parking?: string;
  };
  hero: {
    src: string;
    alt: string;
    photographer?: string;
  };
  photos: { src: string; alt: string }[];
  ordering?: { provider: 'toast' | 'self' | 'doordash'; url: string };
  reservations?: { provider: 'resy' | 'opentable'; url: string } | null;
  catering: boolean;
  privateEvents: boolean;
  openDate?: string;        // ISO
  flagship?: boolean;
}

// Hours pattern reused across most locations (7am - 10pm Mon-Sun)
const STANDARD_HOURS: BusinessHours = {
  monday: { open: '07:00', close: '22:00' },
  tuesday: { open: '07:00', close: '22:00' },
  wednesday: { open: '07:00', close: '22:00' },
  thursday: { open: '07:00', close: '22:00' },
  friday: { open: '07:00', close: '23:00' },
  saturday: { open: '08:00', close: '23:00' },
  sunday: { open: '08:00', close: '22:00' },
};

const MIDTOWN_HOURS: BusinessHours = {
  monday: { open: '07:00', close: '21:00' },
  tuesday: { open: '07:00', close: '21:00' },
  wednesday: { open: '07:00', close: '21:00' },
  thursday: { open: '07:00', close: '21:00' },
  friday: { open: '07:00', close: '22:00' },
  saturday: { open: '10:00', close: '22:00' },
  sunday: { open: '10:00', close: '20:00' },
};

export const LOCATIONS: Location[] = [
  {
    slug: 'miami-beach-collins',
    city: 'miami-beach',
    name: 'IT Trattoria — Collins',
    shortName: 'Collins',
    address: {
      line1: '1656 Collins Avenue',
      city: 'Miami Beach',
      state: 'FL',
      zip: '33139',
    },
    geo: { lat: 25.789917, lng: -80.130311 },
    phone: '+13053978244',
    phoneFormatted: '(305) 397-8244',
    hours: STANDARD_HOURS,
    timezone: 'America/New_York',
    features: ['open-kitchen', 'fresh-pasta-on-site', 'pizza-alla-pala', 'beach-walk', 'breakfast', 'aperitivo-hour'],
    neighborhood: {
      name: 'Art Deco District',
      note: 'Steps from the beach. Open from 7am for cappuccino and cornetti.',
      transit: 'Walkable from Collins & 17th. Free trolley stop at Collins & Lincoln.',
      parking: '17th Street Parking Garage, two blocks west.',
    },
    hero: {
      src: '/images/locations/collins-hero.jpg',
      alt: 'IT Trattoria Collins Avenue at golden hour, Art Deco hotels in background',
    },
    photos: [
      { src: '/images/locations/collins-counter.jpg', alt: 'Counter with fresh pasta and pizza alla pala' },
      { src: '/images/locations/collins-patio.jpg', alt: 'Outdoor seating facing Collins Avenue' },
      { src: '/images/locations/collins-kitchen.jpg', alt: 'Open kitchen with pasta being made' },
    ],
    catering: true,
    privateEvents: true,
    openDate: '2024-11-01',
    flagship: true,
  },
  {
    slug: 'miami-beach-lincoln-road',
    city: 'miami-beach',
    name: 'IT Trattoria — Lincoln Road',
    shortName: 'Lincoln Road',
    address: {
      line1: '1014 Lincoln Road',
      city: 'Miami Beach',
      state: 'FL',
      zip: '33139',
    },
    geo: { lat: 25.790684, lng: -80.138664 },
    phone: '+13054885080',
    phoneFormatted: '(305) 488-5080',
    hours: STANDARD_HOURS,
    timezone: 'America/New_York',
    features: ['open-kitchen', 'fresh-pasta-on-site', 'pizza-alla-pala', 'patio', 'family-friendly', 'breakfast', 'aperitivo-hour'],
    neighborhood: {
      name: 'Lincoln Road',
      note: 'On the pedestrian promenade. Patio seating along the open-air mall.',
      transit: 'A two-minute walk from Lincoln & Washington bus stops.',
    },
    hero: {
      src: '/images/locations/lincoln-hero.jpg',
      alt: 'IT Trattoria on pedestrian Lincoln Road, patio tables visible',
    },
    photos: [
      { src: '/images/locations/lincoln-counter.jpg', alt: 'Counter with cornetti and pasta display' },
      { src: '/images/locations/lincoln-patio.jpg', alt: 'Patio tables on Lincoln Road' },
    ],
    catering: true,
    privateEvents: true,
    openDate: '2025-02-15',
  },
  {
    slug: 'nyc-midtown-7th',
    city: 'nyc',
    name: 'IT Trattoria — Midtown 7th',
    shortName: 'Midtown 7th',
    address: {
      line1: '530 7th Avenue',
      city: 'New York',
      state: 'NY',
      zip: '10018',
    },
    geo: { lat: 40.754395, lng: -73.988029 },
    phone: '+16468288399',
    phoneFormatted: '(646) 828-8399',
    hours: MIDTOWN_HOURS,
    timezone: 'America/New_York',
    features: ['open-kitchen', 'fresh-pasta-on-site', 'commuter-fast-lane', 'breakfast', 'pizza-alla-pala'],
    neighborhood: {
      name: 'Garment District',
      note: 'Four-minute walk from Penn Station. The fastest fresh pasta in Midtown.',
      transit: 'Penn Station (1·2·3 / A·C·E / NJ Transit / LIRR) – 4 min walk. Times Square (N·Q·R·W) – 7 min.',
    },
    hero: {
      src: '/images/locations/7th-hero.jpg',
      alt: 'IT Trattoria 530 7th Avenue storefront at lunch rush',
    },
    photos: [
      { src: '/images/locations/7th-counter.jpg', alt: 'Counter line at peak lunch with fresh pasta visible' },
      { src: '/images/locations/7th-window.jpg', alt: 'Garment District street view through the window' },
    ],
    catering: true,
    privateEvents: false,
    openDate: '2024-09-15',
  },
  {
    slug: 'nyc-midtown-5th',
    city: 'nyc',
    name: 'IT Trattoria — Midtown 5th',
    shortName: 'Midtown 5th',
    address: {
      line1: '390 5th Avenue',
      city: 'New York',
      state: 'NY',
      zip: '10018',
    },
    geo: { lat: 40.749798, lng: -73.984823 },
    phone: '+16464520400',
    phoneFormatted: '(646) 452-0400',
    hours: MIDTOWN_HOURS,
    timezone: 'America/New_York',
    features: ['open-kitchen', 'fresh-pasta-on-site', 'commuter-fast-lane', 'breakfast', 'aperitivo-hour'],
    neighborhood: {
      name: 'Bryant Park / Empire State',
      note: 'Two blocks from Bryant Park, opposite the Empire State. Italian breakfast from 7am.',
      transit: 'Bryant Park (B·D·F·M / 7) – 3 min walk. Herald Square (N·Q·R·W) – 5 min.',
    },
    hero: {
      src: '/images/locations/5th-hero.jpg',
      alt: 'IT Trattoria 390 5th Avenue at morning, Empire State Building in background',
    },
    photos: [
      { src: '/images/locations/5th-counter.jpg', alt: 'Counter with cappuccino and cornetti' },
      { src: '/images/locations/5th-window.jpg', alt: 'View of Empire State Building from the window' },
    ],
    catering: true,
    privateEvents: false,
    openDate: '2025-03-20',
  },
];

export function locationBySlug(slug: LocationSlug): Location | undefined {
  return LOCATIONS.find((l) => l.slug === slug);
}

export function locationsByCity(city: CitySlug): Location[] {
  return LOCATIONS.filter((l) => l.city === city);
}

export const CITIES: Record<CitySlug, { name: string; subtitle: string }> = {
  'miami-beach': {
    name: 'Miami Beach',
    subtitle: 'Two trattorias in the Art Deco district + Lincoln Road.',
  },
  nyc: {
    name: 'New York',
    subtitle: 'Two Midtown trattorias — Penn Station and Bryant Park.',
  },
};
