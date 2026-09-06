import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { EventItem } from '../types';
import { EVENTS_DATA } from '../data/eventsData';

interface CartContextType {
  cartItemIds: string[];
  cartEvents: EventItem[];
  cartCount: number;
  subtotal: number;
  discountAmount: number;
  finalTotal: number;
  appliedCoupon: string | null;
  couponDiscountPercent: number;
  comboDiscountPercent: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (eventId: string) => boolean;
  removeFromCart: (eventId: string) => void;
  toggleCartItem: (eventId: string) => void;
  isInCart: (eventId: string) => boolean;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'pulzion_cart_items_v1';
const COUPON_STORAGE_KEY = 'pulzion_cart_coupon_v1';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItemIds, setCartItemIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(() => {
    try {
      return localStorage.getItem(COUPON_STORAGE_KEY) || null;
    } catch {
      return null;
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItemIds));
    } catch (e) {
      console.error('Failed to sync cart to storage', e);
    }
  }, [cartItemIds]);

  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem(COUPON_STORAGE_KEY, appliedCoupon);
      } else {
        localStorage.removeItem(COUPON_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to sync coupon to storage', e);
    }
  }, [appliedCoupon]);

  const cartEvents = cartItemIds
    .map((id) => EVENTS_DATA.find((e) => e.id === id))
    .filter((e): e is EventItem => Boolean(e));

  const cartCount = cartItemIds.length;

  const subtotal = cartEvents.reduce((sum, item) => sum + item.entryFee, 0);

  // Multi-event combo discount: 2 events = 10%, 3+ events = 15%
  let comboDiscountPercent = 0;
  if (cartCount >= 3) {
    comboDiscountPercent = 15;
  } else if (cartCount >= 2) {
    comboDiscountPercent = 10;
  }

  // Coupon discount
  let couponDiscountPercent = 0;
  if (appliedCoupon) {
    const code = appliedCoupon.toUpperCase().trim();
    if (code === 'PULZION26' || code === 'PULZION2026') {
      couponDiscountPercent = 20;
    } else if (code === 'SQUADPASS' || code === 'CADET15') {
      couponDiscountPercent = 15;
    } else if (code === 'EARLYBIRD' || code === 'PASC10') {
      couponDiscountPercent = 10;
    }
  }

  // Combine discounts (cap max discount at 35%)
  const totalDiscountPercent = Math.min(comboDiscountPercent + couponDiscountPercent, 35);
  const discountAmount = Math.round((subtotal * totalDiscountPercent) / 100);
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const addToCart = (eventId: string): boolean => {
    if (!cartItemIds.includes(eventId)) {
      setCartItemIds((prev) => [...prev, eventId]);
      return true;
    }
    return false;
  };

  const removeFromCart = (eventId: string) => {
    setCartItemIds((prev) => prev.filter((id) => id !== eventId));
  };

  const toggleCartItem = (eventId: string) => {
    if (cartItemIds.includes(eventId)) {
      removeFromCart(eventId);
    } else {
      addToCart(eventId);
    }
  };

  const isInCart = (eventId: string): boolean => {
    return cartItemIds.includes(eventId);
  };

  const clearCart = () => {
    setCartItemIds([]);
    setAppliedCoupon(null);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const applyCoupon = (code: string): { success: boolean; message: string } => {
    const cleanCode = code.toUpperCase().trim();
    if (!cleanCode) {
      return { success: false, message: 'Please enter a valid mission pass code' };
    }

    if (cleanCode === 'PULZION26' || cleanCode === 'PULZION2026') {
      setAppliedCoupon(cleanCode);
      return { success: true, message: 'Code PULZION26 applied! 20% Grand Discount granted.' };
    } else if (cleanCode === 'SQUADPASS' || cleanCode === 'CADET15') {
      setAppliedCoupon(cleanCode);
      return { success: true, message: 'Code SQUADPASS applied! 15% Squad Discount granted.' };
    } else if (cleanCode === 'EARLYBIRD' || cleanCode === 'PASC10') {
      setAppliedCoupon(cleanCode);
      return { success: true, message: 'Code EARLYBIRD applied! 10% Discount granted.' };
    } else {
      return { success: false, message: 'Invalid transmission code. Try PULZION26 or SQUADPASS.' };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  return (
    <CartContext.Provider
      value={{
        cartItemIds,
        cartEvents,
        cartCount,
        subtotal,
        discountAmount,
        finalTotal,
        appliedCoupon,
        couponDiscountPercent,
        comboDiscountPercent,
        isCartOpen,
        setIsCartOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        toggleCartItem,
        isInCart,
        clearCart,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
