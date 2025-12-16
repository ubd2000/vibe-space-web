import { CART_STORAGE_KEY, DEMO_COUPONS } from '@/lib/constants';

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

export const initialCart: CartData = { items: [] };

/**
 * Get cart data from localStorage (Client only)
 */
export function getCart(): CartData {
  if (typeof window === 'undefined') return initialCart;
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialCart;
  } catch (error) {
    console.error('Failed to get cart from localStorage:', error);
    return initialCart;
  }
}

/**
 * Save cart data to localStorage (Client only)
 */
export function saveCart(cart: CartData): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Failed to save cart to localStorage:', error);
  }
}

/**
 * Add item to cart (Pure)
 */
export function addToCart(cart: CartData, item: Omit<CartItem, 'addedAt'>): CartData {
  // Check if item already exists
  if (cart.items.find(i => i.id === item.id)) {
    return cart; // Item already in cart, return as is
  }

  return {
    ...cart,
    items: [...cart.items, { ...item, addedAt: Date.now() }]
  };
}

/**
 * Remove item from cart (Pure)
 */
export function removeFromCart(cart: CartData, itemId: string): CartData {
  return {
    ...cart,
    items: cart.items.filter(item => item.id !== itemId)
  };
}

/**
 * Clear entire cart (Pure)
 */
export function clearCart(): CartData {
  return initialCart;
}

/**
 * Apply coupon code (Pure)
 * Returns new cart with coupon applied if valid, else returns original cart
 */
export function applyCoupon(cart: CartData, code: string): { cart: CartData; success: boolean; description?: string } {
  const upperCode = code.toUpperCase();
  const coupon = DEMO_COUPONS[upperCode];

  if (coupon) {
    return {
      cart: {
        ...cart,
        couponCode: upperCode,
        discount: coupon.discount
      },
      success: true,
      description: coupon.description
    };
  }

  return { cart, success: false };
}

/**
 * Remove coupon from cart (Pure)
 */
export function removeCoupon(cart: CartData): CartData {
  const { couponCode, discount, ...rest } = cart;
  // Ensure we structure it correctly as CartData
  return { ...rest, items: rest.items } as CartData;
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
