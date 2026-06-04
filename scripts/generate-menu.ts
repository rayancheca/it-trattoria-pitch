/**
 * Generate src/data/menu.ts from research/10-real-menu-data.json.
 *
 * The JSON file (produced by Phase-11 menu-data agent) is the canonical
 * source of truth. We emit a TypeScript module so the rest of the app
 * gets typing, autocomplete, and tree-shakeable named exports.
 *
 * Run: pnpm exec tsx scripts/generate-menu.ts
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

interface RawItem {
  id: string;
  slug: string;
  name: string;
  italianName?: string;
  category: string;
  subcategory?: string;
  region: string;
  description: string;
  priceCents: number;
  nycPriceCents?: number;
  allergens?: string[];
  dietary?: string[];
  photo?: string | null;
  availableAt: string[];
  sourcedFrom?: string[];
  verified: boolean;
  aspirational?: boolean;
  featured?: boolean;
  newThisWeek?: boolean;
  note?: string;
}

interface RawCategory {
  slug: string;
  name: string;
  italianName: string;
  blurb: string;
}

interface RawData {
  categories: RawCategory[];
  items: RawItem[];
}

const root = process.cwd();
const json = JSON.parse(readFileSync(join(root, 'research/10-real-menu-data.json'), 'utf8')) as RawData;

// Map invented region slugs to ones in src/data/regions.ts.
const KNOWN_REGIONS = new Set([
  'calabria', 'sicilia', 'campania', 'puglia', 'lazio', 'toscana',
  'emilia-romagna', 'lombardia', 'piemonte', 'veneto', 'liguria',
]);

// Decide a real "hero" photo path for each item — Agent B will overwrite
// these once the real-images extraction lands. For now use the best
// existing Unsplash placeholder per category as a fallback.
function pickHeroPhoto(item: RawItem): string | null {
  if (item.photo) return item.photo;
  // Best-effort matches against existing /public/images/menu/*.jpg
  const slug = item.slug;
  const candidates: Record<string, string> = {
    'spaghetti-pomodoro': '/images/menu/cacio-pepe.jpg',
    'rigatoni-alla-siciliana': '/images/menu/tagliatelle-ragu.jpg',
    'spaghetti-alfredo': '/images/menu/cacio-pepe.jpg',
    'spaghetti-genovese': '/images/menu/trofie-pesto.jpg',
    'rigatoni-vodka': '/images/menu/tagliatelle-ragu.jpg',
    'spaghetti-carbonara': '/images/menu/cacio-pepe.jpg',
    'rigatoni-bolognese': '/images/menu/tagliatelle-ragu.jpg',
    'lasagna-bolognese': '/images/menu/tagliatelle-ragu.jpg',
    'pizza-margherita': '/images/menu/margherita.jpg',
    'pizza-prosciutto-burrata': '/images/menu/margherita.jpg',
    'pizza-diavola': '/images/menu/spianata.jpg',
    'pizza-pala-spianata-half': '/images/menu/spianata.jpg',
    'pizza-pala-spianata-slice': '/images/menu/spianata.jpg',
    'antipasto-della-casa': '/images/menu/tagliere-calabrese.jpg',
    'stracciatella-focaccia': '/images/menu/burrata-prosciutto.jpg',
    'caesar-salad': '/images/menu/orecchiette.jpg',
    'tiramisu-coffee': '/images/menu/tiramisu-classico.jpg',
    'tiramisu-pistachio': '/images/menu/tiramisu-bergamot.jpg',
    'cannoli': '/images/menu/cornetto.jpg',
    'crostata': '/images/menu/cornetto.jpg',
    'cornetto': '/images/menu/cornetto.jpg',
    'espresso': '/images/menu/espresso.jpg',
    'cappuccino': '/images/menu/cappuccino.jpg',
    'spritz-aperol': '/images/menu/spritz-calabrese.jpg',
    'paccheri-alla-calabrese': '/images/menu/paccheri-calabrese.jpg',
    'tiramisu-bergamotto': '/images/menu/tiramisu-bergamot.jpg',
    'spianata-pala-feature': '/images/menu/spianata.jpg',
  };
  return candidates[slug] ?? null;
}

function camelize(arr: string[]): string {
  return `[${arr.map((s) => `'${s.replace(/'/g, "\\'")}'`).join(', ')}]`;
}

function escStr(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n');
}

function toRegion(raw: string): string {
  if (KNOWN_REGIONS.has(raw)) return raw;
  // Map unknown region to a sensible default
  if (raw === 'umbria') return 'toscana'; // umbrian items closest to toscana visually
  return 'lazio'; // fallback
}

const categoriesOut = json.categories
  .map((c) => `  '${c.slug}': { name: '${escStr(c.name)}', italianName: '${escStr(c.italianName)}', blurb: '${escStr(c.blurb)}' },`)
  .join('\n');

const itemsOut = json.items
  .map((item) => {
    const photo = pickHeroPhoto(item);
    return `  {
    id: '${item.id}',
    slug: '${item.slug}',
    name: '${escStr(item.name)}',${item.italianName ? `\n    italianName: '${escStr(item.italianName)}',` : ''}
    category: '${item.category}' as MenuCategory,${item.subcategory ? `\n    subcategory: '${item.subcategory}',` : ''}
    region: '${toRegion(item.region)}' as ItalianRegion,
    description: '${escStr(item.description)}',
    priceCents: ${item.priceCents},${item.nycPriceCents != null ? `\n    nycPriceCents: ${item.nycPriceCents},` : ''}
    allergens: ${camelize(item.allergens ?? [])} as Allergen[],
    dietary: ${camelize(item.dietary ?? [])} as DietaryTag[],
    photo: ${photo ? `{ src: '${photo}', alt: '${escStr(item.name)} — IT Trattoria' }` : 'undefined'},
    availableAt: ${camelize(item.availableAt)} as LocationSlug[],
    sourcedFrom: ${camelize(item.sourcedFrom ?? [])},
    verified: ${item.verified},${item.aspirational ? '\n    aspirational: true,' : ''}${item.featured ? '\n    featured: true,' : ''}${item.newThisWeek ? '\n    newThisWeek: true,' : ''}${item.note ? `\n    note: '${escStr(item.note)}',` : ''}
    ingredients: [],
    sourcing: [],
  }`;
  })
  .join(',\n');

const ts = `/**
 * Menu — IT Trattoria
 *
 * GENERATED FILE. Do not edit by hand.
 * Canonical source: research/10-real-menu-data.json
 * Regenerate via: pnpm exec tsx scripts/generate-menu.ts
 *
 * Items marked \`verified: true\` were confirmed against at least one real
 * source (Toast view-only menu, Uber Eats per-location store, Sage Menu
 * historical snapshot). Items marked \`aspirational: true\` are pitch-side
 * Calabrian-heritage proposals — they are NOT currently on IT's menu.
 */

import type { ItalianRegion } from './regions';
import type { LocationSlug } from './locations';

export type MenuCategory = 'aperitivo' | 'al-banco' | 'a-tavola' | 'dolce' | 'bevande';

export type DietaryTag = 'vegetarian' | 'vegan' | 'gluten-free' | 'spicy' | 'contains-pork' | 'contains-alcohol';

export type Allergen = 'gluten' | 'dairy' | 'eggs' | 'nuts' | 'soy' | 'shellfish' | 'sulfites' | 'fish';

export interface Sourcing {
  ingredient: string;
  producer?: string;
  origin: string;
  note?: string;
}

export interface MenuItem {
  id: string;
  slug: string;
  name: string;
  italianName?: string;
  category: MenuCategory;
  /** Optional finer-grained classifier within a category (pasta / pizza / salad / etc) */
  subcategory?: string;
  region: ItalianRegion;
  description: string;
  longDescription?: string;
  priceCents: number;
  /** NYC pricing differs by ~$1 on most items */
  nycPriceCents?: number;
  ingredients: string[];
  sourcing: Sourcing[];
  allergens: Allergen[];
  dietary: DietaryTag[];
  photo?: { src: string; alt: string };
  availableAt: LocationSlug[];
  /** Identifiers of the public sources this item was verified against */
  sourcedFrom: string[];
  /** True if confirmed from a real IT-owned source (Toast/Uber/Sage) */
  verified: boolean;
  /**
   * True if this item is a pitch-side proposal for the menu rebuild and is
   * NOT currently on IT's menu. Marked clearly in UI.
   */
  aspirational?: boolean;
  featured?: boolean;
  newThisWeek?: boolean;
  note?: string;
  pasta?: { shape: string; sauce: string; fresh: boolean };
}

export const CATEGORIES: Record<MenuCategory, { name: string; italianName: string; blurb: string }> = {
${categoriesOut}
};

export const MENU_ITEMS: MenuItem[] = [
${itemsOut}
];

// ---------- Lookups ----------

export function itemBySlug(slug: string): MenuItem | undefined {
  return MENU_ITEMS.find((i) => i.slug === slug);
}

export function itemsByCategory(category: MenuCategory): MenuItem[] {
  return MENU_ITEMS.filter((i) => i.category === category);
}

export function itemsByRegion(region: ItalianRegion): MenuItem[] {
  return MENU_ITEMS.filter((i) => i.region === region);
}

export function featuredItems(): MenuItem[] {
  // Featured = either explicitly featured OR the top verified, high-confidence dishes
  const explicit = MENU_ITEMS.filter((i) => i.featured);
  if (explicit.length > 0) return explicit;
  return MENU_ITEMS.filter((i) =>
    [
      'spaghetti-carbonara',
      'rigatoni-bolognese',
      'pizza-margherita',
      'lasagna-bolognese',
      'antipasto-della-casa',
      'tiramisu-coffee',
      'cappuccino',
    ].includes(i.slug),
  );
}

export function aspirationalItems(): MenuItem[] {
  return MENU_ITEMS.filter((i) => i.aspirational);
}

// ---------- Pricing ----------

/** Locations in NYC use \`nycPriceCents\` if present. */
const NYC_LOCATIONS = new Set<LocationSlug>(['nyc-midtown-7th', 'nyc-midtown-5th']);

export function priceFor(item: MenuItem, location?: LocationSlug): number {
  if (location && NYC_LOCATIONS.has(location) && item.nycPriceCents != null) {
    return item.nycPriceCents;
  }
  return item.priceCents;
}

export function formatPrice(cents: number): string {
  return \`$\${(cents / 100).toFixed(2)}\`;
}
`;

writeFileSync(join(root, 'src/data/menu.ts'), ts);
console.log(`✓ Wrote src/data/menu.ts — ${json.items.length} items, ${json.categories.length} categories`);
console.log(`  ${json.items.filter((i) => i.verified).length} verified, ${json.items.filter((i) => i.aspirational).length} aspirational`);
