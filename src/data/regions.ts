/**
 * Italian regions on the IT menu.
 *
 * Powers the regional-Italy map (the site's navigational + storytelling spine).
 * Calabria is the front door (the founders' home).
 */

export type ItalianRegion =
  | 'calabria'
  | 'sicilia'
  | 'campania'
  | 'puglia'
  | 'lazio'
  | 'toscana'
  | 'emilia-romagna'
  | 'lombardia'
  | 'piemonte'
  | 'veneto'
  | 'liguria';

export interface Region {
  slug: ItalianRegion;
  name: string;
  italianName: string;
  capital: string;
  blurb: string;
  longBlurb: string;
  signatureIngredients: string[];
  signatureDishes: string[];
  founderConnection?: string;
  accentColor: 'monogram' | 'peperoncino' | 'bergamot' | 'ionian' | 'olive' | 'terracotta' | 'basilico';
}

export const REGIONS: Region[] = [
  {
    slug: 'calabria',
    name: 'Calabria',
    italianName: 'Calabria',
    capital: 'Catanzaro',
    blurb: 'The toe of Italy. Where the food starts.',
    longBlurb:
      'Mountains that fall into two seas. Peperoncino on every table. N\'duja you spread with a knife and a little fear. Bergamot you can\'t grow anywhere else. The brothers grew up here. Today on IT\'s plate it shows up as Spianata Calabrese on the antipasto and on the Diavola pizza — the brothers\' bigger Calabrian repertoire is what the rebuild proposes to surface.',
    signatureIngredients: ["Spianata calabrese", 'Peperoncino', "N'duja", 'Bergamot', 'Pecorino crotonese'],
    signatureDishes: ['Spianata Calabrese (on Diavola)', 'Spianata Pala', 'Antipasto della Casa with Spianata', 'Paccheri alla Calabrese (proposed)'],
    founderConnection: "Renato and Gio's home region.",
    accentColor: 'peperoncino',
  },
  {
    slug: 'sicilia',
    name: 'Sicily',
    italianName: 'Sicilia',
    capital: 'Palermo',
    blurb: 'Arancini, citrus, swordfish — and the cousin Calabria looks at across the strait.',
    longBlurb:
      'Across the Strait of Messina from Calabria. Volcanic soil, Phoenician trade routes, Norman castles. Sicilian citrus shows up in the dolci. Swordfish travels north for the involtini.',
    signatureIngredients: ['Blood orange', 'Pistachio di Bronte', 'Swordfish', 'Ricotta'],
    signatureDishes: ['Arancini', 'Pistachio tiramisù', 'Cannoli'],
    accentColor: 'bergamot',
  },
  {
    slug: 'campania',
    name: 'Campania',
    italianName: 'Campania',
    capital: 'Naples',
    blurb: 'Naples. The pizza. The San Marzano. The mozzarella di bufala.',
    longBlurb:
      'The DNA of the pizza. San Marzano tomatoes (DOP). Mozzarella di bufala from the Volturno plain. Naples taught the world how to bake dough; the brothers learned from the same teachers.',
    signatureIngredients: ['San Marzano DOP', 'Mozzarella di bufala', 'Provolone del Monaco'],
    signatureDishes: ['Pizza margherita', 'Pizza alla pala', 'Sfogliatella'],
    accentColor: 'peperoncino',
  },
  {
    slug: 'puglia',
    name: 'Puglia',
    italianName: 'Puglia',
    capital: 'Bari',
    blurb: 'Orecchiette, burrata, the heel of Italy.',
    longBlurb: 'The heel. Olive oil that the rest of Italy buys. Orecchiette shaped on a wooden board. Burrata you eat the same day it\'s made.',
    signatureIngredients: ['Burrata', 'Stracciatella', 'Olive oil (DOP)'],
    signatureDishes: ['Orecchiette con cime di rapa', 'Burrata con prosciutto'],
    accentColor: 'olive',
  },
  {
    slug: 'lazio',
    name: 'Lazio',
    italianName: 'Lazio',
    capital: 'Rome',
    blurb: 'Roman pasta. The four Romans.',
    longBlurb: "Cacio e pepe. Carbonara. Amatriciana. Gricia. The four Romans live on every IT menu.",
    signatureIngredients: ['Pecorino romano DOP', 'Guanciale', 'Pepe nero'],
    signatureDishes: ['Cacio e pepe', 'Carbonara', 'Amatriciana'],
    accentColor: 'caffe' as never,
  },
  {
    slug: 'toscana',
    name: 'Tuscany',
    italianName: 'Toscana',
    capital: 'Florence',
    blurb: 'Bread, beans, olive oil. The simple things, done right.',
    longBlurb: 'Tuscan restraint. Pappa al pomodoro on a January menu. Pici cacio e pepe at the counter. Olive oil from Lucca on the table.',
    signatureIngredients: ['Pici', 'Tuscan olive oil', 'Pecorino toscano'],
    signatureDishes: ['Pici cacio e pepe', 'Pappa al pomodoro'],
    accentColor: 'olive',
  },
  {
    slug: 'emilia-romagna',
    name: 'Emilia-Romagna',
    italianName: 'Emilia-Romagna',
    capital: 'Bologna',
    blurb: 'Parmigiano. Prosciutto. Tagliatelle. The pantry of Italy.',
    longBlurb:
      'Where pasta gets serious. The Parmigiano Reggiano DOP cheese on every IT counter is from a 40-cow farm in Reggio Emilia. The prosciutto crudo is from Langhirano. The tagliatelle is made on-site in every store, every morning.',
    signatureIngredients: ['Parmigiano Reggiano DOP', 'Prosciutto di Parma DOP', 'Aceto balsamico tradizionale'],
    signatureDishes: ['Tagliatelle al ragù', 'Lasagne alla bolognese', 'Tortellini in brodo'],
    accentColor: 'bergamot',
  },
  {
    slug: 'lombardia',
    name: 'Lombardy',
    italianName: 'Lombardia',
    capital: 'Milan',
    blurb: 'Risotto. Mortadella. The Milanese aperitivo.',
    longBlurb: "Milan's discipline. The aperitivo hour started here. Risotto alla milanese, golden with saffron.",
    signatureIngredients: ['Mortadella di Bologna IGP', 'Riso carnaroli', 'Gorgonzola'],
    signatureDishes: ['Risotto alla milanese', 'Mortadella panino'],
    accentColor: 'bergamot',
  },
  {
    slug: 'piemonte',
    name: 'Piedmont',
    italianName: 'Piemonte',
    capital: 'Turin',
    blurb: 'White truffle, Barolo, the slow side of Italy.',
    longBlurb: 'Where slow food was named. Turin chocolate. Barolo. Hazelnuts from the Langhe.',
    signatureIngredients: ['Hazelnuts di Piemonte', 'Truffle (seasonal)', 'Castelmagno'],
    signatureDishes: ['Hazelnut tiramisù', 'Vitello tonnato'],
    accentColor: 'terracotta',
  },
  {
    slug: 'veneto',
    name: 'Veneto',
    italianName: 'Veneto',
    capital: 'Venice',
    blurb: 'Venice. Cicchetti. Prosecco. Aperol.',
    longBlurb: 'Cicchetti at the counter — the original counter-service Italian.',
    signatureIngredients: ['Polenta', 'Baccalà', 'Prosecco DOC'],
    signatureDishes: ['Cicchetti plate', 'Spritz veneziano'],
    accentColor: 'ionian',
  },
  {
    slug: 'liguria',
    name: 'Liguria',
    italianName: 'Liguria',
    capital: 'Genoa',
    blurb: 'Pesto. Focaccia. The Ligurian coast.',
    longBlurb: 'Basil from Pra. Olive oil from Imperia. Focaccia by the slice.',
    signatureIngredients: ['Basilico di Pra DOP', 'Pine nuts', 'Olive oil di Liguria'],
    signatureDishes: ['Trofie al pesto', 'Focaccia di Recco'],
    accentColor: 'basilico',
  },
];

export function regionBySlug(slug: ItalianRegion): Region | undefined {
  return REGIONS.find((r) => r.slug === slug);
}

export const CALABRIA_SLUG: ItalianRegion = 'calabria';
