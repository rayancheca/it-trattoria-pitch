/**
 * Founders + key people
 *
 * Bios are best-effort first drafts based on public information. The hometown
 * field is flagged [VERIFY] in QUESTIONS.md — the founders should confirm
 * before the pitch is shown publicly.
 *
 * Portrait photos: Agent B (Phase 11 image extraction) confirmed ZERO public
 * portraits of Renato, Gio, or Maxence exist across 12 sources. We use the
 * official "IT IS FAMILY" crew polaroid as a stand-in placeholder for all
 * three until a commissioned shoot lands. The `portrait.needsShoot` flag is
 * surfaced visually so the founders know exactly what to replace.
 */

export interface Founder {
  slug: 'renato' | 'gio' | 'maxence';
  name: string;
  role: string;
  hometown: string;
  bio: string;
  longBio?: string;
  portrait?: { src: string; alt: string; needsShoot?: boolean };
}

// Placeholder portrait — used for all 3 founders until a real shoot lands.
const PLACEHOLDER_PORTRAIT = '/images/real/founders/it-crew.png';

export const FOUNDERS: Founder[] = [
  {
    slug: 'renato',
    name: 'Renato Iera',
    role: 'Co-Founder',
    hometown: 'Calabria, Italy',
    bio:
      'Born in Calabria. Moved to Paris with his brother Gio in his twenties. Opened the first IT in 2014 with a single counter, a pasta machine, and one rule: cook the food they grew up eating.',
    longBio:
      'Renato grew up in a Calabrian kitchen — peperoncino on everything, fresh pasta on Sundays, the family Vespa parked outside. He moved to Paris in his twenties, worked in kitchens that taught him discipline and others that taught him what to avoid, and in 2014 opened the first IT — a single counter with a pasta machine and the food of his childhood. Eleven years later there are 20+ trattorias across France and four in the US. He still rolls pasta when he visits a new store.',
    portrait: { src: PLACEHOLDER_PORTRAIT, alt: 'IT IS FAMILY — official IT crew polaroid (placeholder until commissioned shoot)', needsShoot: true },
  },
  {
    slug: 'gio',
    name: 'Gio Iera',
    role: 'Co-Founder',
    hometown: 'Calabria, Italy',
    bio:
      'Born in Calabria. Co-founded IT in Paris in 2014. Runs the day-to-day across the kitchens — sourcing, training, and the calls about why the mortadella isn\'t right today.',
    longBio:
      'Gio is the brother who answers his phone. Sourcing, training, calling Italy when the mortadella doesn\'t taste right — Gio does it. He grew up in the same Calabrian kitchen as Renato, moved to Paris in his twenties, and has been on the floor of every IT opening since 2014. He flies to Miami Beach more often than he flies to Paris.',
    portrait: { src: PLACEHOLDER_PORTRAIT, alt: 'IT IS FAMILY — official IT crew polaroid (placeholder until commissioned shoot)', needsShoot: true },
  },
  {
    slug: 'maxence',
    name: 'Maxence Lellouche',
    role: 'CEO',
    hometown: 'Paris, France',
    bio:
      'CEO of IT. The reason there are now 20+ stores instead of one. Joined the brothers when there were three trattorias; built the systems that let them keep cooking like there\'s still only one.',
    portrait: { src: PLACEHOLDER_PORTRAIT, alt: 'IT IS FAMILY — official IT crew polaroid (placeholder until commissioned shoot)', needsShoot: true },
  },
];

export function founderBySlug(slug: Founder['slug']): Founder | undefined {
  return FOUNDERS.find((f) => f.slug === slug);
}
