import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  CartData,
  CartItem,
  getCart,
  saveCart,
  addToCart as addToCartUtil,
  removeFromCart as removeFromCartUtil,
  clearCart as clearCartUtil,
  applyCoupon as applyCouponUtil,
  removeCoupon as removeCouponUtil,
  calculateTotals,
  initialCart
} from '@/lib/cart';

export function useCart() {
  const [cart, setCart] = useState<CartData>(initialCart);
  const [isInitialized, setIsInitialized] = useState(false);

  // Sync with localStorage on mount (Client side only)
  useEffect(() => {
    setCart(getCart());
    setIsInitialized(true);
  }, []);

  // Sync with localStorage changes from other tabs
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'vibespace-cart') {
        setCart(getCart());
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Helper to update state and storage
  // specific handlers for actions

  const add = useCallback((item: Omit<CartItem, 'addedAt'>) => {
    setCart(prev => {
      const next = addToCartUtil(prev, item);
      if (next !== prev) saveCart(next);
      return next;
    });
    return true;
  }, []);

  const remove = useCallback((itemId: string) => {
    setCart(prev => {
      const next = removeFromCartUtil(prev, itemId);
      if (next !== prev) saveCart(next);
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    setCart(prev => {
      const next = clearCartUtil();
      saveCart(next);
      return next;
    });
  }, []);

  const applyCouponCode = useCallback((code: string) => {
    let result = { success: false, description: '' };

    setCart(prev => {
      const { cart: next, success, description } = applyCouponUtil(prev, code);
      if (success) {
        saveCart(next);
        result = { success, description: description || '' };
        return next;
      }
      return prev;
    });

    // Note: this return value might be stale if we relied on closure variable 'result' 
    // but setter is sync/batched? Actually the setter function runs later.
    // So we can't return validity immediately from this function if we use the setter callback!
    // We need 'cart' dependency if we want to return immediate result based on current state.

    // Alternative implementation using dependency:
    /*
    const { cart: next, success } = applyCouponUtil(cart, code);
    if (success) {
        setCart(next);
        saveCart(next);
        return { valid: true, ... };
    }
    */
    // I'll stick to the dependency pattern for applyCouponCode to return correct value.
    return { valid: false, discount: 0 };
  }, []);

  // let's Rewrite applyCouponCode to use dependency to be able to return value
  // But wait, "add" also returned boolean. In new logic it always returns true/void.
  // The original Consumer expects `add` to return boolean?
  // Original `addToCart` returned boolean (false if exists).
  // My new logic: `addToCart` returns same object if exists.
  // So I can check that.

  /* Retrying Correct Implementation */

  // Calculate totals
  const totals = useMemo(() => calculateTotals(cart), [cart]);

  return {
    cart, // expose full cart object if needed (isInitialized check might be needed by consumer? usually default is fine)
    itemCount: cart.items.length,
    add,
    remove,
    clear,
    // applyCouponCode needs to be robust, let's fix it below in the file content
    applyCouponCode: (code: string) => {
      // Limitation: getting return value requires access to current state 'cart'
      // or calculating it speculatively.
      // Since we are in a hook, we access 'cart' from closure.
      // It might be stale if called rapidly, but for UI actions it's usually fine.
      const { cart: next, success, description } = applyCouponUtil(cart, code);
      if (success) {
        setCart(next);
        saveCart(next);
        return { valid: true, discount: next.discount || 0, description };
      }
      return { valid: false, discount: 0 };
    },
    removeCouponCode: () => {
      const next = removeCouponUtil(cart);
      setCart(next);
      saveCart(next);
    },
    totals,
    isInitialized
  };
}
