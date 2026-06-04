/**
 * Cart "+1 burst" animation event bus.
 *
 * When an Add-to-cart button is clicked anywhere, we dispatch a custom DOM
 * event with the click point. The <CartBurst /> overlay listens and animates
 * a "+1" badge from that point toward the cart icon. The cart icon in <Nav />
 * scale-bumps when the burst "arrives."
 *
 * Lower coupling than threading callbacks through every component.
 */

const EVENT = 'it:cart-burst';

export interface CartBurstDetail {
  /** Click point in viewport coordinates */
  x: number;
  y: number;
  /** Label to render in the burst (e.g. "+1" or item name initial) */
  label: string;
  /** Unique id for keying the React element */
  id: string;
}

export function emitCartBurst(x: number, y: number, label = '+1') {
  if (typeof window === 'undefined') return;
  const detail: CartBurstDetail = {
    x,
    y,
    label,
    id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
  };
  window.dispatchEvent(new CustomEvent<CartBurstDetail>(EVENT, { detail }));
}

export function onCartBurst(handler: (detail: CartBurstDetail) => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const listener = (e: Event) => {
    const ce = e as CustomEvent<CartBurstDetail>;
    handler(ce.detail);
  };
  window.addEventListener(EVENT, listener);
  return () => window.removeEventListener(EVENT, listener);
}
