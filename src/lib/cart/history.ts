/**
 * Order history — persists placed orders to localStorage so the Order Again
 * rail can recall them on return visits.
 *
 * Sweetgreen + Baymard-validated pattern: returning users have a "standing
 * order" mental model. One-tap reorder removes the entire decision tree.
 */

import type { CartLine } from './store';
import type { LocationSlug } from '@/data/locations';

const STORAGE_KEY = 'it:past-orders-v1';
const MAX_REMEMBERED = 6;

export interface PastOrder {
  orderId: string;
  placedAt: number;             // epoch ms
  location: LocationSlug;
  fulfillment: 'pickup' | 'delivery';
  lines: CartLine[];
  total: number;
}

export function recordOrder(order: PastOrder): void {
  if (typeof window === 'undefined') return;
  const existing = readOrders();
  const next = [order, ...existing].slice(0, MAX_REMEMBERED);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // localStorage may be unavailable (Safari private mode); fail quiet
  }
}

export function readOrders(): PastOrder[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed as PastOrder[];
  } catch {
    return [];
  }
}

export function clearOrders(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

/** Returns the most recent order placed at the given location (if any). */
export function lastOrderAt(location: LocationSlug | null): PastOrder | undefined {
  if (!location) return undefined;
  return readOrders().find((o) => o.location === location);
}
