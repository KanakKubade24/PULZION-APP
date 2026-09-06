import React, { createContext, useContext, useState, useEffect, useMemo, useCallback, ReactNode } from 'react';
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
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
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

  // Sync to localStorage
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

  // Derivations & Calculations
  const cartEvents = useMemo(() => {
    return cartItemIds
      .map((id) => EVENTS_DATA.find((e) => e.id === id))
      .filter((e): e is EventItem => Boolean(e));
  }, [cartItemIds]);

  const cartCount = cartItemIds.length;

  const subtotal = useMemo(() => {
    return cartEvents.reduce((sum, item) => sum + item.entryFee, 0);
  }, [cartEvents]);

  // Multi-event combo discount: 2 events = 10%, 3+ events = 15%
  const comboDiscountPercent = useMemo(() => {
    if (cartCount >= 3) return 15;
    if (cartCount >= 2) return 10;
    return 0;
  }, [cartCount]);

  // Coupon discount
  const couponDiscountPercent = useMemo(() => {
    if (!appliedCoupon) return 0;
    const code = appliedCoupon.toUpperCase().trim();
    if (code === 'PULZION26' || code === 'PULZION2026') return 20;
    if (code === 'SQUADPASS' || code === 'CADET15') return 15;
    if (code === 'EARLYBIRD' || code === 'PASC10') return 10;
    return 0;
  }, [appliedCoupon]);

  // Combined totals capped at 35%
  const { discountAmount, finalTotal } = useMemo(() => {
    const totalDiscountPercent = Math.min(comboDiscountPercent + couponDiscountPercent, 35);
    const discount = Math.round((subtotal * totalDiscountPercent) / 100);
    const total = Math.max(0, subtotal - discount);
    return { discountAmount: discount, finalTotal: total };
  }, [subtotal, comboDiscountPercent, couponDiscountPercent]);

  // Handler Functions
  const addToCart = useCallback((eventId: string): boolean => {
    let added = false;
    setCartItemIds((prev) => {
      if (!prev.includes(eventId)) {
        added = true;
        return [...prev, eventId];
      }
      return prev;
    });
    return added;
  }, []);

  const removeFromCart = useCallback((eventId: string) => {
    setCartItemIds((prev) => prev.filter((id) => id !== eventId));
  }, []);

  const toggleCartItem = useCallback((eventId: string) => {
    setCartItemIds((prev) =>
      prev.includes(eventId) ? prev.filter((id) => id !== eventId) : [...prev, eventId]
    );
  }, []);

  const isInCart = useCallback(
    (eventId: string): boolean => cartItemIds.includes(eventId),
    [cartItemIds]
  );

  const clearCart = useCallback(() => {
    setCartItemIds([]);
    setAppliedCoupon(null);
  }, []);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const applyCoupon = useCallback((code: string): { success: boolean; message: string } => {
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
  }, []);

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
  }, []);

  // Memoized Context Value
  const contextValue = useMemo(
    () => ({
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
    }),
    [
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
      openCart,
      closeCart,
      addToCart,
      removeFromCart,
      toggleCartItem,
      isInCart,
      clearCart,
      applyCoupon,
      removeCoupon,
    ]
  );

  return <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
