/**
 * Menu — IT Trattoria
 *
 * Tagged by Italian region (powers the regional map differentiator).
 * Sourcing notes attached to every item (powers the "sourcing as UI element"
 * pattern from R3/Sweetgreen).
 */

import type { ItalianRegion } from './regions';
import type { LocationSlug } from './locations';

export type MenuCategory = 'aperitivo' | 'al-banco' | 'a-tavola' | 'dolce' | 'bevande';

export type DietaryTag = 'vegetarian' | 'vegan' | 'gluten-free' | 'spicy' | 'contains-pork' | 'contains-alcohol';

export type Allergen = 'gluten' | 'dairy' | 'eggs' | 'nuts' | 'soy' | 'shellfish' | 'sulfites';

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
  region: ItalianRegion;
  description: string;
  longDescription?: string;
  priceCents: number;
  ingredients: string[];
  sourcing: Sourcing[];
  allergens: Allergen[];
  dietary: DietaryTag[];
  photo?: { src: string; alt: string };
  availableAt: LocationSlug[];
  featured?: boolean;
  newThisWeek?: boolean;
  pasta?: { shape: string; sauce: string; fresh: boolean };
}

const ALL_LOCATIONS: LocationSlug[] = [
  'miami-beach-collins',
  'miami-beach-lincoln-road',
  'nyc-midtown-7th',
  'nyc-midtown-5th',
];

export const CATEGORIES: Record<MenuCategory, { name: string; italianName: string; blurb: string }> = {
  aperitivo: {
    name: 'Aperitivo',
    italianName: 'Aperitivo',
    blurb: 'The hour before dinner. Spritz, taralli, a slice of mortadella.',
  },
  'al-banco': {
    name: 'Al Banco',
    italianName: 'Al Banco',
    blurb: 'At the counter. Pizza alla pala, panini, fritti — fast, hot, Italian.',
  },
  'a-tavola': {
    name: 'A Tavola',
    italianName: 'A Tavola',
    blurb: 'At the table. Fresh pasta and mains. Made every morning.',
  },
  dolce: {
    name: 'Dolce',
    italianName: 'Dolce',
    blurb: 'Sweet. Tiramisù, cornetti, dolci you eat with espresso.',
  },
  bevande: {
    name: 'Bevande',
    italianName: 'Bevande',
    blurb: 'Real Italian espresso. Fresh juices. Wine by the glass.',
  },
};

export const MENU_ITEMS: MenuItem[] = [
  // ---------- A Tavola (Pasta) ----------
  {
    id: 'paccheri-calabrese',
    slug: 'paccheri-alla-calabrese',
    name: 'Paccheri alla Calabrese',
    italianName: 'Paccheri alla Calabrese',
    category: 'a-tavola',
    region: 'calabria',
    description: "Wide paccheri, n'duja butter, San Marzano tomato, pecorino crotonese.",
    longDescription:
      "The dish that started the menu. Wide paccheri tubes catch a sauce of n'duja melted into butter, San Marzano DOP tomato, and a finish of pecorino crotonese. Spicy — Calabrian spicy, not cautious.",
    priceCents: 1850,
    ingredients: ['Paccheri (fresh)', "N'duja", 'San Marzano DOP tomato', 'Pecorino crotonese DOP', 'Butter', 'Basil'],
    sourcing: [
      { ingredient: "N'duja", producer: 'Madeo', origin: 'Crucoli, Calabria', note: 'Spread, not sliced.' },
      { ingredient: 'San Marzano tomato', origin: 'Agro Sarnese-Nocerino, Campania DOP' },
      { ingredient: 'Pecorino crotonese', origin: 'Crotone, Calabria DOP' },
    ],
    allergens: ['gluten', 'dairy'],
    dietary: ['spicy', 'contains-pork'],
    photo: { src: '/images/menu/paccheri-calabrese.jpg', alt: 'Paccheri alla calabrese, overhead, on warm linen' },
    availableAt: ALL_LOCATIONS,
    featured: true,
    pasta: { shape: 'paccheri', sauce: 'n\'duja calabrese', fresh: true },
  },
  {
    id: 'tagliatelle-ragu',
    slug: 'tagliatelle-al-ragu',
    name: 'Tagliatelle al Ragù',
    italianName: 'Tagliatelle al Ragù',
    category: 'a-tavola',
    region: 'emilia-romagna',
    description: 'Hand-cut tagliatelle, slow-cooked beef and pork ragù, Parmigiano Reggiano DOP.',
    longDescription:
      'The Bolognese way. Ragù cooked four hours every morning. Tagliatelle hand-cut on-site. Parmigiano Reggiano shaved over the top — from a 40-cow farm in Reggio Emilia.',
    priceCents: 1950,
    ingredients: ['Tagliatelle (fresh)', 'Beef chuck', 'Pork shoulder', 'San Marzano tomato', 'Soffritto', 'Parmigiano Reggiano DOP'],
    sourcing: [
      { ingredient: 'Parmigiano Reggiano DOP', producer: '4 Madonne Caseificio', origin: 'Reggio Emilia, 30-month aged' },
      { ingredient: 'San Marzano tomato', origin: 'Agro Sarnese-Nocerino, Campania DOP' },
    ],
    allergens: ['gluten', 'dairy', 'eggs'],
    dietary: ['contains-pork'],
    photo: { src: '/images/menu/tagliatelle-ragu.jpg', alt: 'Tagliatelle al ragù, overhead, on warm linen' },
    availableAt: ALL_LOCATIONS,
    featured: true,
    pasta: { shape: 'tagliatelle', sauce: 'ragù bolognese', fresh: true },
  },
  {
    id: 'cacio-pepe',
    slug: 'cacio-e-pepe',
    name: 'Cacio e Pepe',
    italianName: 'Cacio e Pepe',
    category: 'a-tavola',
    region: 'lazio',
    description: 'Tonnarelli, Pecorino Romano DOP, Tellicherry pepper. Three ingredients, made right.',
    priceCents: 1750,
    ingredients: ['Tonnarelli (fresh)', 'Pecorino Romano DOP', 'Tellicherry black pepper'],
    sourcing: [
      { ingredient: 'Pecorino Romano DOP', origin: 'Sardinia, 8-month aged' },
      { ingredient: 'Tellicherry pepper', origin: 'Kerala — the right pepper for the Roman dish' },
    ],
    allergens: ['gluten', 'dairy'],
    dietary: ['vegetarian'],
    photo: { src: '/images/menu/cacio-pepe.jpg', alt: 'Cacio e pepe with black pepper visible' },
    availableAt: ALL_LOCATIONS,
    pasta: { shape: 'tonnarelli', sauce: 'cacio e pepe', fresh: true },
  },
  {
    id: 'orecchiette-cime',
    slug: 'orecchiette-cime-di-rapa',
    name: 'Orecchiette con Cime di Rapa',
    italianName: 'Orecchiette con Cime di Rapa',
    category: 'a-tavola',
    region: 'puglia',
    description: 'Orecchiette, broccoli rabe, anchovy, garlic, breadcrumb.',
    priceCents: 1750,
    ingredients: ['Orecchiette (fresh)', 'Broccoli rabe', 'Cantabrian anchovy', 'Garlic', 'Toasted breadcrumb'],
    sourcing: [
      { ingredient: 'Cantabrian anchovy', producer: 'Don Bocarte', origin: 'Cantabrian Sea' },
    ],
    allergens: ['gluten'],
    dietary: [],
    photo: { src: '/images/menu/orecchiette.jpg', alt: 'Orecchiette con cime di rapa' },
    availableAt: ALL_LOCATIONS,
    pasta: { shape: 'orecchiette', sauce: 'cime di rapa', fresh: true },
  },
  {
    id: 'trofie-pesto',
    slug: 'trofie-al-pesto',
    name: 'Trofie al Pesto',
    italianName: 'Trofie al Pesto',
    category: 'a-tavola',
    region: 'liguria',
    description: 'Twisted trofie, Genovese pesto, potato, green beans.',
    priceCents: 1750,
    ingredients: ['Trofie (fresh)', 'Basilico di Pra DOP', 'Pine nuts', 'Pecorino sardo', 'Parmigiano Reggiano', 'Garlic', 'Olive oil di Liguria'],
    sourcing: [
      { ingredient: 'Basilico di Pra DOP', origin: 'Pra, Genoa' },
    ],
    allergens: ['gluten', 'dairy', 'nuts'],
    dietary: ['vegetarian'],
    photo: { src: '/images/menu/trofie-pesto.jpg', alt: 'Trofie al pesto with potato and green beans' },
    availableAt: ALL_LOCATIONS,
    pasta: { shape: 'trofie', sauce: 'pesto genovese', fresh: true },
  },

  // ---------- Al Banco (pizza, panini, fritti) ----------
  {
    id: 'pizza-margherita-pala',
    slug: 'pizza-alla-pala-margherita',
    name: 'Pizza alla Pala — Margherita',
    italianName: 'Pizza alla Pala — Margherita',
    category: 'al-banco',
    region: 'campania',
    description: 'Long, thin Roman-style pizza. San Marzano tomato, fior di latte, basil.',
    priceCents: 1450,
    ingredients: ['Pizza dough (72-hr cold rise)', 'San Marzano DOP tomato', 'Fior di latte', 'Basil'],
    sourcing: [
      { ingredient: 'Fior di latte', producer: 'Caseificio Olanda', origin: 'Campania' },
    ],
    allergens: ['gluten', 'dairy'],
    dietary: ['vegetarian'],
    photo: { src: '/images/menu/margherita.jpg', alt: 'Pizza alla pala margherita' },
    availableAt: ALL_LOCATIONS,
    featured: true,
  },
  {
    id: 'pizza-spianata',
    slug: 'pizza-alla-pala-spianata',
    name: 'Pizza alla Pala — Spianata Calabrese',
    italianName: 'Pizza alla Pala — Spianata Calabrese',
    category: 'al-banco',
    region: 'calabria',
    description: 'Pizza alla pala, spianata calabrese, fior di latte, peperoncino honey.',
    priceCents: 1550,
    ingredients: ['Pizza dough', 'Spianata calabrese', 'Fior di latte', 'Peperoncino honey'],
    sourcing: [
      { ingredient: 'Spianata calabrese', origin: 'Cosenza, Calabria — pressed-flat salame with peperoncino' },
      { ingredient: 'Peperoncino honey', producer: 'Mieleria Tropea', origin: 'Tropea, Calabria' },
    ],
    allergens: ['gluten', 'dairy'],
    dietary: ['spicy', 'contains-pork'],
    photo: { src: '/images/menu/spianata.jpg', alt: 'Pizza alla pala with spianata calabrese' },
    availableAt: ALL_LOCATIONS,
    featured: true,
  },
  {
    id: 'panino-mortadella',
    slug: 'panino-mortadella',
    name: 'Panino Mortadella & Pistacchio',
    italianName: 'Panino Mortadella & Pistacchio',
    category: 'al-banco',
    region: 'emilia-romagna',
    description: 'Schiacciata, mortadella IGP, stracciatella, pistachio cream.',
    priceCents: 1395,
    ingredients: ['Schiacciata bread', 'Mortadella di Bologna IGP', 'Stracciatella', 'Pistachio cream'],
    sourcing: [
      { ingredient: 'Mortadella di Bologna IGP', producer: 'Pasquini', origin: 'Bologna' },
      { ingredient: 'Pistachio', origin: 'Bronte, Sicily — DOP' },
    ],
    allergens: ['gluten', 'dairy', 'nuts'],
    dietary: ['contains-pork'],
    photo: { src: '/images/menu/panino-mortadella.jpg', alt: 'Mortadella and pistachio panino, cross-section' },
    availableAt: ALL_LOCATIONS,
  },
  {
    id: 'arancini',
    slug: 'arancini',
    name: 'Arancini',
    italianName: 'Arancini',
    category: 'al-banco',
    region: 'sicilia',
    description: 'Sicilian rice balls, ragù centre, fried to order.',
    priceCents: 695,
    ingredients: ['Carnaroli rice', 'Beef ragù', 'Mozzarella', 'Breadcrumb'],
    sourcing: [
      { ingredient: 'Riso carnaroli', producer: 'Acquerello', origin: 'Vercelli, Piedmont — 1-year aged' },
    ],
    allergens: ['gluten', 'dairy'],
    dietary: ['contains-pork'],
    photo: { src: '/images/menu/arancini.jpg', alt: 'Arancini cross-section showing ragù centre' },
    availableAt: ALL_LOCATIONS,
  },

  // ---------- Aperitivo ----------
  {
    id: 'tagliere-calabrese',
    slug: 'tagliere-calabrese',
    name: 'Tagliere Calabrese',
    italianName: 'Tagliere Calabrese',
    category: 'aperitivo',
    region: 'calabria',
    description: "Spianata calabrese, soppressata, pecorino crotonese, n'duja, taralli.",
    priceCents: 2200,
    ingredients: ['Spianata calabrese', 'Soppressata di Calabria', 'Pecorino crotonese DOP', "N'duja", 'Taralli', 'Bergamot marmalade'],
    sourcing: [
      { ingredient: 'Soppressata', origin: 'Cosenza, Calabria' },
      { ingredient: 'Bergamot marmalade', origin: 'Reggio Calabria — bergamot is grown only here' },
    ],
    allergens: ['gluten', 'dairy'],
    dietary: ['spicy', 'contains-pork'],
    photo: { src: '/images/menu/tagliere-calabrese.jpg', alt: 'Calabrian charcuterie board overhead' },
    availableAt: ALL_LOCATIONS,
    featured: true,
  },
  {
    id: 'burrata-prosciutto',
    slug: 'burrata-prosciutto',
    name: 'Burrata & Prosciutto di Parma',
    italianName: 'Burrata & Prosciutto di Parma',
    category: 'aperitivo',
    region: 'puglia',
    description: 'Burrata pugliese, prosciutto di Parma DOP, olive oil, sea salt.',
    priceCents: 1850,
    ingredients: ['Burrata', 'Prosciutto di Parma DOP (24-month)', 'Olive oil', 'Sea salt'],
    sourcing: [
      { ingredient: 'Burrata', producer: 'Caseificio Olanda', origin: 'Andria, Puglia' },
      { ingredient: 'Prosciutto di Parma DOP', producer: 'San Daniele', origin: 'Langhirano, Emilia-Romagna' },
    ],
    allergens: ['dairy'],
    dietary: ['contains-pork'],
    photo: { src: '/images/menu/burrata-prosciutto.jpg', alt: 'Burrata torn open over prosciutto' },
    availableAt: ALL_LOCATIONS,
  },
  {
    id: 'spritz-calabrese',
    slug: 'spritz-calabrese',
    name: 'Spritz Calabrese',
    italianName: 'Spritz Calabrese',
    category: 'aperitivo',
    region: 'calabria',
    description: 'Bergamot, prosecco, soda, peperoncino salt on the rim.',
    priceCents: 1295,
    ingredients: ['Bergamot syrup', 'Prosecco DOC', 'Soda', 'Peperoncino salt'],
    sourcing: [
      { ingredient: 'Bergamot syrup', origin: 'Reggio Calabria — bergamot grown nowhere else' },
    ],
    allergens: ['sulfites'],
    dietary: ['contains-alcohol', 'spicy'],
    photo: { src: '/images/menu/spritz-calabrese.jpg', alt: 'Spritz calabrese with peperoncino salt rim' },
    availableAt: ALL_LOCATIONS,
    featured: true,
  },

  // ---------- Dolce ----------
  {
    id: 'tiramisu-classico',
    slug: 'tiramisu-classico',
    name: 'Tiramisù Classico',
    italianName: 'Tiramisù Classico',
    category: 'dolce',
    region: 'veneto',
    description: 'Mascarpone, espresso, cocoa, savoiardi. Made in a tray every morning.',
    priceCents: 895,
    ingredients: ['Mascarpone', 'Espresso', 'Cocoa', 'Savoiardi', 'Marsala'],
    sourcing: [
      { ingredient: 'Mascarpone', producer: 'Galbani', origin: 'Lombardy' },
    ],
    allergens: ['gluten', 'dairy', 'eggs'],
    dietary: ['vegetarian', 'contains-alcohol'],
    photo: { src: '/images/menu/tiramisu-classico.jpg', alt: 'Tiramisù in a glass, side view' },
    availableAt: ALL_LOCATIONS,
    featured: true,
  },
  {
    id: 'tiramisu-bergamot',
    slug: 'tiramisu-bergamot',
    name: 'Tiramisù al Bergamotto',
    italianName: 'Tiramisù al Bergamotto',
    category: 'dolce',
    region: 'calabria',
    description: 'The Calabrian one. Mascarpone, bergamot, lemon-thyme, hazelnut.',
    longDescription:
      'The brothers\' grandmother\'s tiramisù. Bergamot in place of espresso. The fragrance of Reggio Calabria in a glass — only bergamot can do this, and bergamot only grows in Calabria.',
    priceCents: 995,
    ingredients: ['Mascarpone', 'Bergamot juice', 'Lemon thyme', 'Hazelnut crumble', 'Savoiardi'],
    sourcing: [
      { ingredient: 'Bergamot', origin: 'Reggio Calabria — PDO' },
      { ingredient: 'Hazelnut', origin: 'Langhe, Piedmont' },
    ],
    allergens: ['gluten', 'dairy', 'eggs', 'nuts'],
    dietary: ['vegetarian'],
    photo: { src: '/images/menu/tiramisu-bergamot.jpg', alt: 'Bergamot tiramisù, side view, hazelnut crumble visible' },
    availableAt: ALL_LOCATIONS,
    featured: true,
    newThisWeek: true,
  },
  {
    id: 'cornetto-vuoto',
    slug: 'cornetto-vuoto',
    name: 'Cornetto Vuoto',
    italianName: 'Cornetto Vuoto',
    category: 'dolce',
    region: 'lazio',
    description: 'Italian croissant, plain. Made every morning at 5am.',
    priceCents: 395,
    ingredients: ['Flour', 'Butter', 'Egg', 'Sugar', 'Milk'],
    sourcing: [
      { ingredient: 'Butter', producer: 'Beurre Bordier', origin: 'Brittany — the only butter that gives the right lamination' },
    ],
    allergens: ['gluten', 'dairy', 'eggs'],
    dietary: ['vegetarian'],
    photo: { src: '/images/menu/cornetto.jpg', alt: 'Cornetto on a plate, cross-section visible' },
    availableAt: ALL_LOCATIONS,
  },

  // ---------- Bevende ----------
  {
    id: 'espresso',
    slug: 'espresso',
    name: 'Espresso',
    italianName: 'Espresso',
    category: 'bevande',
    region: 'campania',
    description: 'Single, ristretto, doppio. From a Neapolitan roaster.',
    priceCents: 375,
    ingredients: ['Espresso blend'],
    sourcing: [
      { ingredient: 'Espresso', producer: 'Caffè Borbone', origin: 'Naples' },
    ],
    allergens: [],
    dietary: ['vegetarian', 'vegan'],
    photo: { src: '/images/menu/espresso.jpg', alt: 'Espresso in a small white cup' },
    availableAt: ALL_LOCATIONS,
    featured: true,
  },
  {
    id: 'cappuccino',
    slug: 'cappuccino',
    name: 'Cappuccino',
    italianName: 'Cappuccino',
    category: 'bevande',
    region: 'campania',
    description: 'Real cappuccino. Latte art. Don\'t order it after 11am unless you\'re a tourist.',
    priceCents: 525,
    ingredients: ['Espresso', 'Steamed milk', 'Cocoa (optional)'],
    sourcing: [
      { ingredient: 'Espresso', producer: 'Caffè Borbone', origin: 'Naples' },
    ],
    allergens: ['dairy'],
    dietary: ['vegetarian'],
    photo: { src: '/images/menu/cappuccino.jpg', alt: 'Cappuccino in a ceramic cup with latte art' },
    availableAt: ALL_LOCATIONS,
    featured: true,
  },
];

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
  return MENU_ITEMS.filter((i) => i.featured);
}

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}
