/**
 * Content Model — IT Trattoria
 *
 * TypeScript interfaces for the static content of the mockup. In production these
 * would be backed by a CMS (likely Sanity, Contentful, or Payload). For the mockup
 * they back static `.ts` data files in `src/data/`.
 *
 * Tagging is deliberate:
 *  - Every MenuItem has a `region` (Italian region of origin) — powers the
 *    regional-Italy map differentiator from R3.
 *  - Every MenuItem has a `sourcing` note (mill, producer, region) — powers the
 *    "sourcing as UI element" pattern from R3/Sweetgreen.
 *  - Every MenuItem has `availableAt` (location slugs) — per-location menu
 *    variations are real and worth surfacing.
 *  - Localization-ready: any user-facing string is typed as `LocalizedString`
 *    even though only `en` ships in the mockup.
 */

// -------- Localization --------

export type Locale = 'en' | 'it' | 'es';

export type LocalizedString = {
  en: string;
  it?: string;
  es?: string;
};

// -------- Geography & regions --------

export type ItalianRegion =
  | 'calabria'
  | 'sicilia'
  | 'campania'
  | 'puglia'
  | 'basilicata'
  | 'lazio'
  | 'toscana'
  | 'emilia-romagna'
  | 'lombardia'
  | 'piemonte'
  | 'veneto'
  | 'liguria'
  | 'marche'
  | 'umbria'
  | 'abruzzo'
  | 'molise'
  | 'sardegna'
  | 'friuli-venezia-giulia'
  | 'trentino-alto-adige'
  | "valle-d-aosta";

export interface RegionDetail {
  slug: ItalianRegion;
  name: LocalizedString;
  capital: string;
  signatureIngredients: string[];
  signatureDishes: string[];
  blurb: LocalizedString;
  founderConnection?: LocalizedString;     // "Renato + Gio's home region" type copy
  illustrationKey?: string;                 // points at /components/illustrations/<key>
}

// -------- Menu --------

export type MenuCategory = 'aperitivo' | 'al-banco' | 'a-tavola' | 'dolce' | 'bevande';

export type DietaryTag = 'vegetarian' | 'vegan' | 'gluten-free' | 'spicy' | 'contains-pork' | 'contains-alcohol';

export type Allergen = 'gluten' | 'dairy' | 'eggs' | 'nuts' | 'soy' | 'shellfish' | 'sulfites';

export interface Sourcing {
  ingredient: string;
  producer?: string;
  origin: string;             // "San Marzano, Campania DOP" / "Crucoli, Calabria"
  note?: LocalizedString;     // optional editorial note
}

export interface MenuItem {
  id: string;
  slug: string;
  name: LocalizedString;
  italianName?: string;        // always the Italian form, e.g. "Tagliatelle al ragù"
  category: MenuCategory;
  region: ItalianRegion;
  description: LocalizedString;
  longDescription?: LocalizedString;   // for item pages
  price: {
    amount: number;             // in cents (USD)
    perLocation?: Partial<Record<LocationSlug, number>>;  // per-location overrides
  };
  ingredients: string[];
  sourcing: Sourcing[];
  allergens: Allergen[];
  dietary: DietaryTag[];
  photo?: {
    src: string;
    alt: LocalizedString;
    photographer?: string;
  };
  availableAt: LocationSlug[];
  featured?: boolean;
  newThisWeek?: boolean;
  pasta?: {                      // for items eligible in the builder
    shape?: string;
    sauce?: string;
    fresh: boolean;
  };
}

// -------- Locations --------

export type LocationSlug =
  | 'miami-beach-collins'
  | 'miami-beach-lincoln-road'
  | 'nyc-midtown-7th'
  | 'nyc-midtown-5th';

export type CitySlug = 'miami-beach' | 'nyc';

export interface BusinessHours {
  monday: HoursRange | 'closed';
  tuesday: HoursRange | 'closed';
  wednesday: HoursRange | 'closed';
  thursday: HoursRange | 'closed';
  friday: HoursRange | 'closed';
  saturday: HoursRange | 'closed';
  sunday: HoursRange | 'closed';
}

export interface HoursRange {
  open: string;    // "07:00"
  close: string;   // "22:00"
}

export interface Location {
  slug: LocationSlug;
  city: CitySlug;
  name: string;                              // "IT Trattoria — Collins"
  shortName: string;                          // "Collins"
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: 'FL' | 'NY';
    zip: string;
  };
  geo: { lat: number; lng: number };
  phone: string;                              // E.164: "+13053978244"
  phoneFormatted: string;                     // "(305) 397-8244"
  email?: string;
  hours: BusinessHours;
  timezone: string;                           // "America/New_York"
  features: LocationFeature[];
  neighborhood: {
    name: string;
    note: LocalizedString;                    // "Steps from the Art Deco district"
    transit?: LocalizedString;
    parking?: LocalizedString;
  };
  photos: LocationPhoto[];
  menuOverrides?: LocationSlug extends never ? never : Partial<Record<string, { available?: boolean; price?: number }>>;
  ordering?: { provider: 'toast' | 'self' | 'doordash'; url: string };
  reservations?: { provider: 'resy' | 'opentable'; url: string } | null;
  catering: boolean;
  privateEvents: boolean;
}

export type LocationFeature =
  | 'open-kitchen'
  | 'fresh-pasta-on-site'
  | 'wood-fired-pizza'
  | 'patio'
  | 'beach-walk'
  | 'commuter-fast-lane'
  | 'late-night'
  | 'family-friendly'
  | 'group-friendly';

export interface LocationPhoto {
  src: string;
  alt: LocalizedString;
  caption?: LocalizedString;
}

// -------- People --------

export interface Founder {
  slug: 'renato' | 'gio' | 'maxence';
  name: string;
  role: LocalizedString;
  hometown: string;                            // [VERIFY] for Renato + Gio
  bio: LocalizedString;
  longBio?: LocalizedString;
  portrait?: { src: string; alt: LocalizedString };
}

// -------- Press --------

export interface PressItem {
  publication: string;
  publicationLogo?: string;
  date: string;                                // ISO
  quote: LocalizedString;                      // ALL MARKED [PLACEHOLDER — DO NOT PUBLISH]
  link?: string;
  placeholder: true;                           // hard flag, must be true on every record until verified
}

// -------- Journal --------

export type JournalKind = 'region' | 'supplier' | 'neighborhood' | 'recipe' | 'news';

export interface JournalEntry {
  slug: string;
  kind: JournalKind;
  title: LocalizedString;
  dek: LocalizedString;                        // standfirst / subtitle
  body: LocalizedString;                       // markdown allowed
  hero: { src: string; alt: LocalizedString };
  date: string;
  author?: string;
  tags: string[];
  relatedRegion?: ItalianRegion;
  relatedItems?: string[];                    // menu item slugs
  relatedLocations?: LocationSlug[];
}

// -------- Catering --------

export interface CateringPackage {
  slug: string;
  name: LocalizedString;
  servesMin: number;
  servesMax: number;
  includes: LocalizedString[];
  pricePerPersonFrom: number;                  // cents
  leadTimeHours: number;
  servedAt: LocationSlug[];
  photo?: { src: string; alt: LocalizedString };
}

// -------- Forms --------

export interface CateringInquiry {
  name: string;
  email: string;
  phone: string;
  companyName?: string;
  preferredLocation: LocationSlug;
  date: string;                                // ISO date
  headcount: number;
  packageSlug?: string;
  dietaryNotes?: string;
  message?: string;
  source?: string;                              // analytics: where they clicked from
}

export interface PrivateEventInquiry {
  name: string;
  email: string;
  phone: string;
  preferredLocation: LocationSlug;
  eventType: 'birthday' | 'corporate' | 'rehearsal-dinner' | 'wedding' | 'other';
  date: string;
  headcount: number;
  buyoutInterest: boolean;
  message?: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  phone?: string;
  topic: 'general' | 'feedback' | 'press' | 'careers' | 'franchising' | 'order-issue' | 'lost-item';
  message: string;
  relatedLocation?: LocationSlug;
}

export interface NewsletterSignup {
  email: string;
  city?: CitySlug;
}
