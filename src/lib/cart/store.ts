'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { LocationSlug } from '@/data/locations';
import type { MenuItem } from '@/data/menu';

export interface CartLine {
  id: string;                  // line id, unique per add (allows two of the same item with diff notes)
  itemId: string;              // menu item id
  itemSlug: string;
  name: string;
  unitPriceCents: number;
  quantity: number;
  notes?: string;
  region: string;
  photo?: string;
}

export type FulfillmentMode = 'pickup' | 'delivery';
export type PickupTiming = { kind: 'asap' } | { kind: 'scheduled'; isoTime: string };

interface CartState {
  // Hydration flag — true once persisted state has loaded on the client.
  hasHydrated: boolean;
  // Active location for ordering (null until picked).
  locationSlug: LocationSlug | null;
  // Fulfillment mode + timing.
  fulfillment: FulfillmentMode;
  pickupTiming: PickupTiming;
  // Lines in cart.
  lines: CartLine[];
  // Drawer / picker open state.
  isCartOpen: boolean;
  isLocationPickerOpen: boolean;

  // Actions
  setHasHydrated: (v: boolean) => void;
  setLocation: (slug: LocationSlug) => void;
  setFulfillment: (mode: FulfillmentMode) => void;
  setPickupTiming: (timing: PickupTiming) => void;
  addItem: (item: MenuItem, quantity?: number, notes?: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  removeLine: (lineId: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  openLocationPicker: () => void;
  closeLocationPicker: () => void;
}

function generateLineId(itemId: string) {
  return `${itemId}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      hasHydrated: false,
      locationSlug: null,
      fulfillment: 'pickup',
      pickupTiming: { kind: 'asap' },
      lines: [],
      isCartOpen: false,
      isLocationPickerOpen: false,

      setHasHydrated: (v) => set({ hasHydrated: v }),

      setLocation: (slug) =>
        set({ locationSlug: slug, isLocationPickerOpen: false }),

      setFulfillment: (mode) => set({ fulfillment: mode }),
      setPickupTiming: (timing) => set({ pickupTiming: timing }),

      addItem: (item, quantity = 1, notes) => {
        const existing = get().lines.find(
          (l) => l.itemId === item.id && (l.notes ?? '') === (notes ?? ''),
        );
        if (existing) {
          set({
            lines: get().lines.map((l) =>
              l.id === existing.id ? { ...l, quantity: l.quantity + quantity } : l,
            ),
            isCartOpen: true,
          });
        } else {
          set({
            lines: [
              ...get().lines,
              {
                id: generateLineId(item.id),
                itemId: item.id,
                itemSlug: item.slug,
                name: item.name,
                unitPriceCents: item.priceCents,
                quantity,
                notes,
                region: item.region,
                photo: item.photo?.src,
              },
            ],
            isCartOpen: true,
          });
        }
      },

      updateQuantity: (lineId, quantity) => {
        if (quantity <= 0) {
          set({ lines: get().lines.filter((l) => l.id !== lineId) });
        } else {
          set({
            lines: get().lines.map((l) =>
              l.id === lineId ? { ...l, quantity } : l,
            ),
          });
        }
      },

      removeLine: (lineId) =>
        set({ lines: get().lines.filter((l) => l.id !== lineId) }),

      clearCart: () => set({ lines: [] }),

      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      openLocationPicker: () => set({ isLocationPickerOpen: true }),
      closeLocationPicker: () => set({ isLocationPickerOpen: false }),
    }),
    {
      name: 'it-cart-v1',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        locationSlug: state.locationSlug,
        fulfillment: state.fulfillment,
        pickupTiming: state.pickupTiming,
        lines: state.lines,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);

// Derived selectors

export function selectSubtotalCents(state: CartState): number {
  return state.lines.reduce((sum, l) => sum + l.unitPriceCents * l.quantity, 0);
}

export function selectCartCount(state: CartState): number {
  return state.lines.reduce((n, l) => n + l.quantity, 0);
}

export function selectTax(state: CartState): number {
  // Florida sales tax 7%, NYC 8.875% — derived from location at checkout. Default 8%.
  return Math.round(selectSubtotalCents(state) * 0.08);
}

export function selectTipDefault(state: CartState): number {
  // Default 18% on subtotal.
  return Math.round(selectSubtotalCents(state) * 0.18);
}

export function selectTotal(state: CartState): number {
  return selectSubtotalCents(state) + selectTax(state) + selectTipDefault(state);
}
