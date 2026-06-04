'use client';

import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useCart } from '@/lib/cart/store';
import type { MenuItem } from '@/data/menu';

interface Props {
  item: MenuItem;
  size?: 'sm' | 'md';
}

export function AddToCartButton({ item, size = 'md' }: Props) {
  const addItem = useCart((s) => s.addItem);
  const openLocationPicker = useCart((s) => s.openLocationPicker);
  const locationSlug = useCart((s) => s.locationSlug);

  const small = size === 'sm';

  function onClick() {
    if (!locationSlug) {
      openLocationPicker();
      return;
    }
    addItem(item, 1);
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.94 }}
      className={`inline-flex items-center justify-center gap-1.5 ${
        small ? 'h-9 px-3 text-sm' : 'h-11 px-5'
      } bg-caffe text-carta rounded-sm font-medium hover:bg-monogram transition-colors`}
    >
      <Plus size={small ? 14 : 16} aria-hidden />
      <span>Add</span>
    </motion.button>
  );
}
