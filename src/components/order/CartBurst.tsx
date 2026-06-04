'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { onCartBurst, type CartBurstDetail } from '@/lib/cart/burst';

interface ActiveBurst extends CartBurstDetail {
  /** Pre-resolved target coordinates so each burst is locked to its target */
  targetX: number;
  targetY: number;
}

/**
 * Renders the "+1" badges that fly from each Add-click to the cart icon.
 * Mounts once at the root (in layout.tsx). Reads the cart icon position
 * from a data attribute set by the Nav.
 */
export function CartBurst() {
  const [bursts, setBursts] = useState<ActiveBurst[]>([]);

  useEffect(() => {
    return onCartBurst((detail) => {
      // Resolve current cart icon position at burst time
      const target = document.querySelector<HTMLElement>('[data-cart-target]');
      const rect = target?.getBoundingClientRect();
      const targetX = rect ? rect.left + rect.width / 2 : window.innerWidth - 32;
      const targetY = rect ? rect.top + rect.height / 2 : 32;
      setBursts((prev) => [...prev, { ...detail, targetX, targetY }]);
      // Auto-remove after the animation duration so we don't grow forever
      window.setTimeout(() => {
        setBursts((prev) => prev.filter((b) => b.id !== detail.id));
      }, 1100);
    });
  }, []);

  return (
    <div aria-hidden className="fixed inset-0 z-[120] pointer-events-none">
      <AnimatePresence>
        {bursts.map((b) => (
          <motion.div
            key={b.id}
            initial={{ x: b.x - 18, y: b.y - 18, opacity: 0, scale: 0.6 }}
            animate={{
              x: b.targetX - 18,
              y: b.targetY - 18,
              opacity: [0, 1, 1, 0],
              scale: [0.6, 1.15, 0.85, 0.4],
            }}
            transition={{
              x: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
              y: { duration: 0.8, ease: [0.5, 0, 0.7, 0.5] },
              opacity: { duration: 0.95, times: [0, 0.15, 0.7, 1] },
              scale: { duration: 0.95, times: [0, 0.18, 0.7, 1] },
            }}
            className="absolute top-0 left-0 w-9 h-9 rounded-full bg-peperoncino text-carta font-display text-lg flex items-center justify-center shadow-lg"
            style={{ willChange: 'transform, opacity' }}
          >
            {b.label}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
