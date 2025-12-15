import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  CartData,
  CartItem,
  getCart,
  addToCart as addToCartUtil,
  removeFromCart as removeFromCartUtil,
  clearCart as clearCartUtil,
  applyCoupon as applyCouponUtil,
  removeCoupon as removeCouponUtil,
  calculateTotals,
} from '@/lib/cart';

export function useCart() {
  const [cart, setCart] = useState<CartData>(getCart());

  // Sync with localStorage changes from other tabs
  useEffect(() => {
    const handleStorage = () => {
      setCart(getCart());
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Add item to cart
  const add = useCallback((item: Omit<CartItem, 'addedAt'>) => {
    const success = addToCartUtil(item);
    setCart(getCart());
    return success;
  }, []);

  // Remove item from cart
  const remove = useCallback((itemId: string) => {
    removeFromCartUtil(itemId);
    setCart(getCart());
  }, []);

  // Clear cart
  const clear = useCallback(() => {
    clearCartUtil();
    setCart(getCart());
  }, []);

  // Apply coupon code
  const applyCouponCode = useCallback((code: string) => {
    const result = applyCouponUtil(code);
    setCart(getCart());
    return result;
  }, []);

  // Remove coupon
  const removeCouponCode = useCallback(() => {
    removeCouponUtil();
    setCart(getCart());
  }, []);

  // Calculate totals
  const totals = useMemo(() => calculateTotals(cart), [cart]);

  return {
    cart,
    itemCount: cart.items.length,
    add,
    remove,
    clear,
    applyCouponCode,
    removeCouponCode,
    totals,
  };
}
