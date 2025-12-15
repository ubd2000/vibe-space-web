export interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  creator: string;
  category: string;
  addedAt: number;
}

export interface CartData {
  items: CartItem[];
  couponCode?: string;
  discount?: number;
}

const CART_STORAGE_KEY = 'virtumall-cart';

// Demo coupons for testing
const DEMO_COUPONS: Record<string, { discount: number; description: string }> = {
  'WELCOME10': { discount: 10, description: '신규 회원 10% 할인' },
  'CYBER20': { discount: 20, description: '사이버펑크 특별 20% 할인' },
  'VTUBER15': { discount: 15, description: 'VTuber 아바타 15% 할인' },
};

/**
 * Get cart data from localStorage
 */
export function getCart(): CartData {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to get cart from localStorage:', error);
  }
  return { items: [] };
}

/**
 * Add item to cart
 */
export function addToCart(item: Omit<CartItem, 'addedAt'>): boolean {
  try {
    const cart = getCart();

    // Check if item already exists
    const exists = cart.items.find(i => i.id === item.id);
    if (exists) {
      return false; // Item already in cart
    }

    // Add item with timestamp
    cart.items.push({ ...item, addedAt: Date.now() });
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    return true;
  } catch (error) {
    console.error('Failed to add item to cart:', error);
    return false;
  }
}

/**
 * Remove item from cart
 */
export function removeFromCart(itemId: string): void {
  try {
    const cart = getCart();
    cart.items = cart.items.filter(item => item.id !== itemId);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Failed to remove item from cart:', error);
  }
}

/**
 * Clear entire cart
 */
export function clearCart(): void {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify({ items: [] }));
  } catch (error) {
    console.error('Failed to clear cart:', error);
  }
}

/**
 * Apply coupon code
 */
export function applyCoupon(code: string): { valid: boolean; discount: number; description?: string } {
  const upperCode = code.toUpperCase();
  const coupon = DEMO_COUPONS[upperCode];

  if (coupon) {
    try {
      const cart = getCart();
      cart.couponCode = upperCode;
      cart.discount = coupon.discount;
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      return { valid: true, discount: coupon.discount, description: coupon.description };
    } catch (error) {
      console.error('Failed to apply coupon:', error);
      return { valid: false, discount: 0 };
    }
  }

  return { valid: false, discount: 0 };
}

/**
 * Remove coupon from cart
 */
export function removeCoupon(): void {
  try {
    const cart = getCart();
    delete cart.couponCode;
    delete cart.discount;
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Failed to remove coupon:', error);
  }
}

/**
 * Calculate cart totals
 */
export function calculateTotals(cart: CartData): {
  subtotal: number;
  discount: number;
  total: number;
} {
  const subtotal = cart.items.reduce((sum, item) => sum + item.price, 0);
  const discountAmount = cart.discount ? Math.round((subtotal * cart.discount) / 100) : 0;
  const total = subtotal - discountAmount;

  return {
    subtotal,
    discount: discountAmount,
    total,
  };
}
