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

// Map each item to its best photo. Priority:
// 1. Item's own photo field (set by Agent A)
// 2. Real IT photo from /public/images/real/* (Agent B's haul)
// 3. Fallback to original Unsplash placeholders
function pickHeroPhoto(item: RawItem): string | null {
  if (item.photo) return item.photo;

  const slug = item.slug;

  // REAL IT photos (Agent B) — prefer these
  const realIT: Record<string, string> = {
    // Pasta — real IT pasta photos
    'spaghetti-pomodoro': '/images/real/menu/it-pasta.jpg',
    'spaghetti-carbonara': '/images/real/menu/spaghetti-bolognaise.png',
    'rigatoni-bolognese': '/images/real/menu/spaghetti-bolognaise.png',
    'rigatoni-alla-siciliana': '/images/real/menu/toast-menu-item-pasta.jpg',
    'spaghetti-alfredo': '/images/real/menu/it-pasta.jpg',
    'spaghetti-genovese': '/images/real/menu/it-pasta.jpg',
    'rigatoni-vodka': '/images/real/menu/it-pasta.jpg',
    'lasagna': '/images/real/menu/spaghetti-bolognaise.png',
    'lasagna-bolognese': '/images/real/menu/spaghetti-bolognaise.png',
    'penne-arrabbiata': '/images/real/menu/it-pasta.jpg',
    'penne-vodka': '/images/real/menu/it-pasta.jpg',
    'tagliatelle-bolognese': '/images/real/menu/spaghetti-bolognaise.png',

    // Pizza — real IT pizza photos
    'pizza-margherita': '/images/real/menu/it-pizza.png',
    'pizza-prosciutto-burrata': '/images/real/menu/restaurantguru-pizza-1.jpg',
    'pizza-diavola': '/images/real/menu/restaurantguru-pizza-c330.jpg',
    'pizza-tartufo': '/images/real/menu/restaurantguru-pizza-1.jpg',
    'pizza-quattro-formaggi': '/images/real/menu/restaurantguru-pizza-c330.jpg',
    'pizza-pala-spianata-half': '/images/real/menu/restaurantguru-pizza-c330.jpg',
    'pizza-pala-spianata-slice': '/images/real/menu/restaurantguru-pizza-c330.jpg',
    'pizza-pala-margherita-half': '/images/real/menu/it-pizza.png',
    'pizza-pala-margherita-slice': '/images/real/menu/it-pizza.png',

    // Antipasti / aperitivo
    'antipasto-della-casa': '/images/menu/tagliere-calabrese.jpg',
    'appetizer-antipasto-famiglia': '/images/menu/tagliere-calabrese.jpg',
    'stracciatella-focaccia': '/images/menu/burrata-prosciutto.jpg',
    'bruschetta': '/images/menu/burrata-prosciutto.jpg',

    // Breakfast (Sage Menu)
    'breakfast-avocado-toast': '/images/menu/burrata-prosciutto.jpg',
    'breakfast-eggs-bacon': '/images/menu/cornetto.jpg',
    'breakfast-truffle-scramble': '/images/menu/cornetto.jpg',

    // Salads
    'caesar-salad': '/images/menu/orecchiette.jpg',
    'mediterranea': '/images/menu/orecchiette.jpg',
    'amore-verde': '/images/menu/orecchiette.jpg',

    // Dolce — real IT tiramisu photos
    'tiramisu-coffee': '/images/real/menu/toast-tiramisu-720.jpg',
    'tiramisu-pistachio': '/images/real/menu/restaurantguru-tiramisu.jpg',
    'tiramisu-strawberry': '/images/real/menu/restaurantguru-tiramisu.jpg',
    'tiramisu-nutella': '/images/real/menu/restaurantguru-tiramisu.jpg',
    'tiramisu-classic': '/images/real/menu/toast-tiramisu-720.jpg',
    'cannoli': '/images/menu/cornetto.jpg',
    'dolce-cannolo-pistacchio': '/images/menu/cornetto.jpg',
    'dolce-cannolo-cioccolato': '/images/menu/cornetto.jpg',
    'dolce-crostata-fragole': '/images/menu/cornetto.jpg',
    'crostata': '/images/menu/cornetto.jpg',
    'chocolate-ganache': '/images/menu/cornetto.jpg',
    'cornetto': '/images/menu/cornetto.jpg',
    'cornetto-nutella': '/images/menu/cornetto.jpg',
    'cornetto-vuoto': '/images/menu/cornetto.jpg',

    // Bevande — coffees
    'espresso': '/images/menu/espresso.jpg',
    'cappuccino': '/images/menu/cappuccino.jpg',
    'macchiato': '/images/menu/espresso.jpg',
    'americano': '/images/menu/espresso.jpg',
    'latte': '/images/menu/cappuccino.jpg',
    'coffee-double-espresso': '/images/menu/espresso.jpg',
    'coffee-caffe-latte': '/images/menu/cappuccino.jpg',
    'coffee-hot-tea': '/images/menu/cappuccino.jpg',

    // Bevande — drinks
    'spritz-aperol': '/images/menu/spritz-calabrese.jpg',
    'bevande-still-water': '/images/menu/espresso.jpg',
    'bevande-sparkling-water': '/images/menu/espresso.jpg',
    'bevande-molecola': '/images/menu/spritz-calabrese.jpg',
    'bevande-limonata': '/images/menu/spritz-calabrese.jpg',
    'bevande-aranciata': '/images/menu/spritz-calabrese.jpg',
    'bevande-the-limone': '/images/menu/cappuccino.jpg',
    'bevande-the-pesca': '/images/menu/cappuccino.jpg',

    // Juices
    'juice-orange': '/images/menu/spritz-calabrese.jpg',
    'juice-ace': '/images/menu/spritz-calabrese.jpg',
    'juice-power-punch': '/images/menu/spritz-calabrese.jpg',
    'juice-detox': '/images/menu/spritz-calabrese.jpg',
    'juice-peacefull': '/images/menu/spritz-calabrese.jpg',
    'juice-sunset': '/images/menu/spritz-calabrese.jpg',
    'detox-juice': '/images/menu/spritz-calabrese.jpg',
    'peacefull-juice': '/images/menu/spritz-calabrese.jpg',
    'sunset-juice': '/images/menu/spritz-calabrese.jpg',
    'power-punch-juice': '/images/menu/spritz-calabrese.jpg',

    // Aspirational
    'paccheri-alla-calabrese': '/images/menu/paccheri-calabrese.jpg',
    'tiramisu-bergamotto': '/images/menu/tiramisu-bergamot.jpg',
    'spianata-pala-feature': '/images/real/menu/restaurantguru-pizza-c330.jpg',
  };
  if (realIT[slug]) return realIT[slug];

  // Final fallback by subcategory/keyword — catches anything I didn't explicitly map
  const lc = slug.toLowerCase();
  if (lc.includes('pizza')) return '/images/real/menu/it-pizza.png';
  if (lc.includes('pasta') || lc.includes('spaghetti') || lc.includes('rigatoni') || lc.includes('penne') || lc.includes('tagliatelle') || lc.includes('lasagna')) return '/images/real/menu/it-pasta.jpg';
  if (lc.includes('tiramisu')) return '/images/real/menu/toast-tiramisu-720.jpg';
  if (lc.includes('cannolo') || lc.includes('cannoli') || lc.includes('crostata') || lc.includes('dolce')) return '/images/real/menu/toast-tiramisu-720.jpg';
  if (lc.includes('breakfast') || lc.includes('cornetto') || lc.includes('toast')) return '/images/menu/cornetto.jpg';
  if (lc.includes('cappuccino') || lc.includes('latte') || lc.includes('coffee') || lc.includes('tea') || lc.includes('the-')) return '/images/menu/cappuccino.jpg';
  if (lc.includes('espresso') || lc.includes('macchiato') || lc.includes('americano')) return '/images/menu/espresso.jpg';
  if (lc.includes('juice') || lc.includes('orange') || lc.includes('limonata') || lc.includes('aranciata') || lc.includes('spritz') || lc.includes('molecola') || lc.includes('water')) return '/images/menu/spritz-calabrese.jpg';
  if (lc.includes('salad') || lc.includes('insalata')) return '/images/menu/orecchiette.jpg';
  if (lc.includes('antipasto') || lc.includes('tagliere')) return '/images/menu/tagliere-calabrese.jpg';
  return '/images/real/menu/it-pasta.jpg'; // absolute last fallback so NOTHING is photoless
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
  // Featured = either explicitly featured OR the top verified, high-confidence
  // dishes in PRIORITY ORDER. Carbonara leads (top cross-source verified +
  // most editorial-strong signature).
  const explicit = MENU_ITEMS.filter((i) => i.featured);
  if (explicit.length > 0) return explicit;
  const order = [
    'spaghetti-carbonara',
    'pizza-margherita',
    'rigatoni-bolognese',
    'lasagna-bolognese',
    'antipasto-della-casa',
    'tiramisu-coffee',
    'pizza-diavola',
  ];
  return order
    .map((slug) => MENU_ITEMS.find((i) => i.slug === slug))
    .filter((i): i is MenuItem => Boolean(i));
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
