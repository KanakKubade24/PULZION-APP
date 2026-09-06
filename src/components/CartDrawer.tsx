import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ShoppingCart, 
  Trash2, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Tag, 
  ShieldCheck, 
  CreditCard, 
  QrCode, 
  Radio, 
  Calendar, 
  Users, 
  Trophy, 
  AlertCircle,
  Clock,
  Ticket,
  ChevronRight,
  Zap,
  Lock,
  Plus
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { UserAccount, EventItem } from '../types';
import { useAlienTheme } from '../context/ThemeContext';

interface CartDrawerProps {
  currentUser: UserAccount | null;
  onLoginRequest: () => void;
  onRegisterAccountAndPass: (user: UserAccount) => void;
  onUpdateUserEvents: (newEventIds: string[]) => void;
  onExploreEvents: () => void;
  onGoToProfile?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  currentUser,
  onLoginRequest,
  onRegisterAccountAndPass,
  onUpdateUserEvents,
  onExploreEvents,
  onGoToProfile,
}) => {
  const {
    cartEvents,
    cartItemIds,
    cartCount,
    subtotal,
    discountAmount,
    finalTotal,
    appliedCoupon,
    couponDiscountPercent,
    comboDiscountPercent,
    isCartOpen,
    closeCart,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const { currentTheme } = useAlienTheme();
  
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'payment' | 'success'>('cart');
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Guest Cadet checkout details if not logged in
  const [guestForm, setGuestForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    college: 'PICT, Pune',
    year: 'FE',
  });
  const [guestFormErrors, setGuestFormErrors] = useState<Record<string, string>>({});

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyCoupon(promoInput);
    setPromoMessage({
      text: res.message,
      isError: !res.success,
    });
    if (res.success) {
      setPromoInput('');
    }
  };

  const handleApplyPresetCoupon = (code: string) => {
    const res = applyCoupon(code);
    setPromoMessage({
      text: res.message,
      isError: !res.success,
    });
  };

  const validateGuestForm = () => {
    const errs: Record<string, string> = {};
    if (!guestForm.firstName.trim()) errs.firstName = 'First name required';
    if (!guestForm.lastName.trim()) errs.lastName = 'Last name required';
    if (!guestForm.email.trim() || !guestForm.email.includes('@')) errs.email = 'Valid email required';
    if (!guestForm.phone.trim() || guestForm.phone.length < 10) errs.phone = '10-digit phone required';
    setGuestFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleProcessPayment = () => {
    if (!currentUser) {
      if (!validateGuestForm()) {
        return;
      }
    }

    setIsProcessingPayment(true);

    setTimeout(() => {
      setIsProcessingPayment(false);
      
      const newEventIds = cartItemIds;

      if (currentUser) {
        // Merge registered events
        const combined = Array.from(new Set([...currentUser.registeredEvents, ...newEventIds]));
        onUpdateUserEvents(combined);
      } else {
        // Create new account for guest
        const newTicketId = `PUL-${Math.floor(100000 + Math.random() * 900000)}`;
        const newUser: UserAccount = {
          id: `usr_${Date.now()}`,
          firstName: guestForm.firstName,
          lastName: guestForm.lastName,
          email: guestForm.email,
          phone: guestForm.phone,
          country: 'India',
          college: guestForm.college,
          year: guestForm.year,
          registeredEvents: newEventIds,
          joinedAt: new Date().toISOString(),
          ticketId: newTicketId,
        };
        onRegisterAccountAndPass(newUser);
      }

      setCheckoutStep('success');
      clearCart();

      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#f8d092', '#159097', '#38a48c', '#ffffff'],
        });
      } catch (e) {}
    }, 1400);
  };

  const handleClose = () => {
    setCheckoutStep('cart');
    closeCart();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
          <motion.div
            id="pulzion-cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 27, stiffness: 240 }}
            className="w-screen max-w-xl text-slate-100 shadow-2xl flex flex-col justify-between overflow-hidden relative border-l"
            style={{
              backgroundColor: '#0a0d24',
              borderColor: 'rgba(21, 144, 151, 0.6)',
              boxShadow: `0 0 50px rgba(21, 144, 151, 0.35)`,
            }}
          >
            {/* Top Luminous Header Bar */}
            <div 
              className="absolute top-0 left-0 right-0 h-1.5 shadow-md"
              style={{
                background: `linear-gradient(to right, #159097, #38a48c, #f8d092)`,
              }}
            />

            {/* Header */}
            <div 
              className="p-5 sm:p-6 border-b relative flex items-center justify-between"
              style={{
                backgroundColor: 'rgba(37, 36, 93, 0.95)',
                borderColor: 'rgba(21, 144, 151, 0.35)',
              }}
            >
              <div className="flex items-center gap-3">
                <div 
                  className="p-2.5 rounded-xl border shadow-lg"
                  style={{
                    backgroundColor: 'rgba(26, 86, 120, 0.5)',
                    borderColor: '#159097',
                    color: '#f8d092',
                  }}
                >
                  <ShoppingCart className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-orbitron font-extrabold text-lg sm:text-xl tracking-wider text-[#f8d092]">
                      MY MISSION CART
                    </h2>
                    {cartCount > 0 && (
                      <span 
                        className="px-2.5 py-0.5 rounded-full text-xs font-chakra font-bold text-[#050716]"
                        style={{ backgroundColor: '#f8d092' }}
                      >
                        {cartCount}
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-chakra tracking-wider" style={{ color: '#38a48c' }}>
                    {checkoutStep === 'payment' ? 'PAYMENT & PASS ALLOCATION' : checkoutStep === 'success' ? 'REGISTRATION COMPLETED' : 'EVENT ENLISTMENT TERMINAL'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {cartCount > 0 && checkoutStep === 'cart' && (
                  <button
                    onClick={clearCart}
                    className="text-xs font-chakra px-3 py-1 rounded-full border transition-colors cursor-pointer text-slate-400 hover:text-rose-400 hover:border-rose-400"
                    style={{
                      backgroundColor: 'rgba(37, 36, 93, 0.6)',
                      borderColor: 'rgba(21, 144, 151, 0.3)',
                    }}
                    title="Clear all events from cart"
                  >
                    Clear All
                  </button>
                )}
                <button
                  id="close-cart-drawer-btn"
                  onClick={handleClose}
                  className="p-2 rounded-full border transition-colors cursor-pointer"
                  style={{
                    backgroundColor: 'rgba(37, 36, 93, 0.6)',
                    borderColor: 'rgba(21, 144, 151, 0.5)',
                    color: '#f8d092',
                  }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">

              {/* SUCCESS VIEW */}
              {checkoutStep === 'success' && (
                <div className="py-8 text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
                  <div 
                    className="w-20 h-20 rounded-full mx-auto flex items-center justify-center border-2 shadow-2xl animate-bounce"
                    style={{
                      backgroundColor: 'rgba(21, 144, 151, 0.25)',
                      borderColor: '#f8d092',
                      boxShadow: '0 0 40px rgba(248, 208, 146, 0.5)',
                    }}
                  >
                    <CheckCircle2 className="w-10 h-10" style={{ color: '#f8d092' }} />
                  </div>

                  <div>
                    <span 
                      className="text-xs font-chakra font-bold tracking-widest px-3 py-1 rounded-full border"
                      style={{
                        backgroundColor: 'rgba(87, 28, 86, 0.5)',
                        borderColor: '#f8d092',
                        color: '#f8d092',
                      }}
                    >
                      PAYMENT CONFIRMED
                    </span>
                    <h3 className="font-orbitron font-extrabold text-2xl mt-3 text-white">
                      REGISTRATION CONFIRMED!
                    </h3>
                    <p className="text-sm font-chakra text-slate-300 mt-2 max-w-md mx-auto leading-relaxed">
                      Your event entries have been successfully linked to your Crew ID dossier.
                    </p>
                  </div>

                  <div 
                    className="p-5 rounded-2xl border text-left space-y-3"
                    style={{
                      backgroundColor: 'rgba(37, 36, 93, 0.6)',
                      borderColor: 'rgba(21, 144, 151, 0.4)',
                    }}
                  >
                    <div className="flex justify-between items-center text-xs font-chakra pb-2 border-b" style={{ borderColor: 'rgba(21, 144, 151, 0.3)' }}>
                      <span style={{ color: '#38a48c' }}>TRANSACTION ID</span>
                      <span className="font-mono text-white">TXN-{Math.floor(10000000 + Math.random() * 90000000)}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-chakra">
                      <span style={{ color: '#38a48c' }}>ENROLLED MISSIONS</span>
                      <span className="font-bold text-[#f8d092]">{cartItemIds.length || 'Active'} Events</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-chakra">
                      <span style={{ color: '#38a48c' }}>AMOUNT PAID</span>
                      <span className="font-orbitron font-bold text-white">₹{finalTotal}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      onClick={() => {
                        handleClose();
                        if (onGoToProfile) onGoToProfile();
                      }}
                      className="flex-1 py-3.5 px-6 rounded-full font-orbitron font-bold text-xs tracking-wider border shadow-xl flex items-center justify-center gap-2 cursor-pointer hover:scale-105 transition-all"
                      style={{
                        backgroundColor: '#f8d092',
                        color: '#25245d',
                        borderColor: '#f8d092',
                      }}
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#25245d]" />
                      <span>VIEW MY CREW ID DOSSIER</span>
                    </button>

                    <button
                      onClick={() => {
                        handleClose();
                        onExploreEvents();
                      }}
                      className="py-3 px-5 rounded-full font-chakra font-bold text-xs tracking-wider border text-slate-300 hover:text-white cursor-pointer"
                      style={{
                        backgroundColor: 'rgba(26, 86, 120, 0.4)',
                        borderColor: '#159097',
                      }}
                    >
                      Browse More Missions
                    </button>
                  </div>
                </div>
              )}

              {/* EMPTY CART STATE */}
              {checkoutStep !== 'success' && cartCount === 0 && (
                <div className="py-12 text-center space-y-5">
                  <div 
                    className="w-16 h-16 rounded-full mx-auto flex items-center justify-center border shadow-lg"
                    style={{
                      backgroundColor: 'rgba(37, 36, 93, 0.5)',
                      borderColor: 'rgba(21, 144, 151, 0.4)',
                      color: '#f8d092',
                    }}
                  >
                    <ShoppingCart className="w-8 h-8 opacity-60" />
                  </div>
                  <div>
                    <h3 className="font-orbitron font-bold text-lg text-white">
                      YOUR CART IS EMPTY
                    </h3>
                    <p className="text-xs sm:text-sm font-chakra text-slate-300 mt-1 max-w-sm mx-auto leading-relaxed">
                      You have not added any missions to your invasion squad cart yet. Browse our 25+ technical and gaming events.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      handleClose();
                      onExploreEvents();
                    }}
                    className="py-3 px-6 rounded-full font-orbitron font-bold text-xs tracking-wider border shadow-lg flex items-center justify-center gap-2 mx-auto cursor-pointer hover:scale-105 transition-all"
                    style={{
                      backgroundColor: 'rgba(26, 86, 120, 0.6)',
                      borderColor: '#159097',
                      color: '#f8d092',
                      boxShadow: '0 0 20px rgba(21, 144, 151, 0.3)',
                    }}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>EXPLORE ALL MISSIONS</span>
                  </button>
                </div>
              )}

              {/* CART REVIEW STEP */}
              {checkoutStep === 'cart' && cartCount > 0 && (
                <>
                  {/* Multi-event perk alert */}
                  <div 
                    className="p-3.5 rounded-2xl border flex items-center gap-3 text-xs font-chakra"
                    style={{
                      backgroundColor: 'rgba(26, 86, 120, 0.3)',
                      borderColor: 'rgba(248, 208, 146, 0.4)',
                    }}
                  >
                    <Sparkles className="w-5 h-5 shrink-0" style={{ color: '#f8d092' }} />
                    <div className="flex-1">
                      <p className="font-bold text-white">
                        {cartCount >= 3 
                          ? '🔥 Squad Combo Active: 15% Multi-Event Discount Applied!'
                          : cartCount === 2
                          ? '✨ Duo Pass Active: 10% Discount Applied! Add 1 more for 15% OFF.'
                          : '⚡ Festival Perk: Add 1 more event to unlock 10% Duo Discount!'}
                      </p>
                    </div>
                  </div>

                  {/* List of Cart Items */}
                  <div className="space-y-3">
                    <p className="text-xs font-chakra font-bold tracking-wider" style={{ color: '#38a48c' }}>
                      SELECTED MISSIONS ({cartCount})
                    </p>
                    {cartEvents.map((item) => {
                      const isAlreadyEnrolled = currentUser?.registeredEvents.includes(item.id);
                      return (
                        <div
                          key={item.id}
                          className="p-4 rounded-2xl border flex flex-col justify-between gap-3 relative transition-all"
                          style={{
                            backgroundColor: 'rgba(37, 36, 93, 0.45)',
                            borderColor: 'rgba(21, 144, 151, 0.4)',
                          }}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span 
                                  className="text-[10px] font-chakra font-bold px-2 py-0.5 rounded-full border"
                                  style={{
                                    backgroundColor: 'rgba(87, 28, 86, 0.4)',
                                    borderColor: 'rgba(21, 144, 151, 0.5)',
                                    color: '#f8d092',
                                  }}
                                >
                                  {item.category.toUpperCase()}
                                </span>
                                {isAlreadyEnrolled && (
                                  <span className="text-[10px] font-chakra font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                                    Already on Pass
                                  </span>
                                )}
                              </div>
                              <h4 className="font-orbitron font-bold text-sm text-white">
                                {item.title}
                              </h4>
                              <p className="text-xs font-chakra text-slate-300 line-clamp-1 mt-0.5">
                                {item.tagline}
                              </p>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="p-2 rounded-xl border text-slate-400 hover:text-rose-400 hover:border-rose-400 transition-colors cursor-pointer shrink-0"
                              style={{
                                backgroundColor: 'rgba(26, 86, 120, 0.3)',
                                borderColor: 'rgba(21, 144, 151, 0.3)',
                              }}
                              title="Remove mission"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t text-xs font-chakra" style={{ borderColor: 'rgba(21, 144, 151, 0.2)' }}>
                            <div className="flex items-center gap-3 text-slate-300 text-[11px]">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5 text-[#38a48c]" />
                                {item.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="w-3.5 h-3.5 text-[#159097]" />
                                {item.teamSize}
                              </span>
                            </div>

                            <div className="text-right">
                              <span className="font-orbitron font-bold text-sm text-[#f8d092]">
                                ₹{item.entryFee}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Promo Code System */}
                  <div 
                    className="p-4 rounded-2xl border space-y-3"
                    style={{
                      backgroundColor: 'rgba(26, 86, 120, 0.2)',
                      borderColor: 'rgba(21, 144, 151, 0.35)',
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-chakra font-bold tracking-wider flex items-center gap-1.5 text-white">
                        <Tag className="w-3.5 h-3.5 text-[#f8d092]" />
                        APPLY FESTIVAL PROMO CODE
                      </span>
                      {appliedCoupon && (
                        <button
                          onClick={removeCoupon}
                          className="text-[11px] font-chakra text-rose-300 hover:underline cursor-pointer"
                        >
                          Remove ({appliedCoupon})
                        </button>
                      )}
                    </div>

                    <form onSubmit={handleApplyPromo} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="e.g. PULZION26, SQUADPASS"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        className="flex-1 px-4 py-2 rounded-full border text-xs font-chakra font-mono uppercase outline-none"
                        style={{
                          backgroundColor: 'rgba(37, 36, 93, 0.6)',
                          borderColor: 'rgba(21, 144, 151, 0.5)',
                          color: '#f8d092',
                        }}
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-full font-chakra font-bold text-xs border tracking-wider cursor-pointer hover:scale-105 transition-all"
                        style={{
                          backgroundColor: '#159097',
                          borderColor: '#f8d092',
                          color: '#050716',
                        }}
                      >
                        APPLY
                      </button>
                    </form>

                    {promoMessage && (
                      <p className={`text-[11px] font-chakra ${promoMessage.isError ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {promoMessage.text}
                      </p>
                    )}

                    {/* Quick clickable coupons */}
                    {!appliedCoupon && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <span className="text-[10px] font-chakra text-slate-400">Try Codes:</span>
                        {['PULZION26', 'SQUADPASS', 'EARLYBIRD'].map((code) => (
                          <button
                            key={code}
                            type="button"
                            onClick={() => handleApplyPresetCoupon(code)}
                            className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border border-dashed hover:border-solid transition-colors cursor-pointer"
                            style={{
                              backgroundColor: 'rgba(37, 36, 93, 0.4)',
                              borderColor: 'rgba(248, 208, 146, 0.5)',
                              color: '#f8d092',
                            }}
                          >
                            {code}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Summary Breakdown */}
                  <div 
                    className="p-4 rounded-2xl border space-y-2.5 text-xs font-chakra"
                    style={{
                      backgroundColor: 'rgba(37, 36, 93, 0.5)',
                      borderColor: 'rgba(21, 144, 151, 0.35)',
                    }}
                  >
                    <div className="flex justify-between text-slate-300">
                      <span>Event Registration Subtotal</span>
                      <span className="font-mono text-white">₹{subtotal}</span>
                    </div>

                    {comboDiscountPercent > 0 && (
                      <div className="flex justify-between text-emerald-400">
                        <span>Multi-Event Combo Discount ({comboDiscountPercent}%)</span>
                        <span className="font-mono">-₹{Math.round((subtotal * comboDiscountPercent) / 100)}</span>
                      </div>
                    )}

                    {appliedCoupon && couponDiscountPercent > 0 && (
                      <div className="flex justify-between text-[#f8d092]">
                        <span>Promo Code ({appliedCoupon}) ({couponDiscountPercent}%)</span>
                        <span className="font-mono">-₹{Math.round((subtotal * couponDiscountPercent) / 100)}</span>
                      </div>
                    )}

                    <div className="pt-2 border-t flex justify-between items-center text-sm font-bold" style={{ borderColor: 'rgba(21, 144, 151, 0.3)' }}>
                      <span className="text-white font-orbitron">TOTAL PAYABLE</span>
                      <span className="text-lg font-orbitron font-extrabold text-[#f8d092]">
                        ₹{finalTotal}
                      </span>
                    </div>
                  </div>
                </>
              )}

              {/* PAYMENT & CHECKOUT STEP */}
              {checkoutStep === 'payment' && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  
                  {/* Account Information / Guest form */}
                  <div 
                    className="p-4 rounded-2xl border space-y-3"
                    style={{
                      backgroundColor: 'rgba(37, 36, 93, 0.6)',
                      borderColor: 'rgba(21, 144, 151, 0.4)',
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-chakra font-bold tracking-wider text-[#38a48c] flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-[#f8d092]" />
                        CADET CREDENTIALS & PASS OWNER
                      </span>
                      {!currentUser && (
                        <button
                          onClick={() => {
                            handleClose();
                            onLoginRequest();
                          }}
                          className="text-[11px] font-chakra text-[#f8d092] hover:underline cursor-pointer"
                        >
                          Already have an account? Login
                        </button>
                      )}
                    </div>

                    {currentUser ? (
                      <div className="p-3 rounded-xl border flex items-center justify-between text-xs font-chakra" style={{ backgroundColor: 'rgba(26, 86, 120, 0.3)', borderColor: 'rgba(21, 144, 151, 0.3)' }}>
                        <div>
                          <p className="font-bold text-[#f8d092]">{currentUser.firstName} {currentUser.lastName}</p>
                          <p className="text-slate-300 text-[11px]">{currentUser.email} • {currentUser.college}</p>
                        </div>
                        <span className="font-telemetry text-[10px] text-[#38a48c]">
                          #{currentUser.ticketId.slice(0, 7)}
                        </span>
                      </div>
                    ) : (
                      <div className="space-y-3 pt-1">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <input
                              type="text"
                              placeholder="First Name *"
                              value={guestForm.firstName}
                              onChange={(e) => setGuestForm({ ...guestForm, firstName: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border text-xs font-chakra outline-none"
                              style={{
                                backgroundColor: 'rgba(26, 86, 120, 0.3)',
                                borderColor: guestFormErrors.firstName ? '#ef4444' : 'rgba(21, 144, 151, 0.4)',
                                color: '#f8d092',
                              }}
                            />
                            {guestFormErrors.firstName && <span className="text-[10px] text-rose-400">{guestFormErrors.firstName}</span>}
                          </div>
                          <div>
                            <input
                              type="text"
                              placeholder="Last Name *"
                              value={guestForm.lastName}
                              onChange={(e) => setGuestForm({ ...guestForm, lastName: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border text-xs font-chakra outline-none"
                              style={{
                                backgroundColor: 'rgba(26, 86, 120, 0.3)',
                                borderColor: guestFormErrors.lastName ? '#ef4444' : 'rgba(21, 144, 151, 0.4)',
                                color: '#f8d092',
                              }}
                            />
                            {guestFormErrors.lastName && <span className="text-[10px] text-rose-400">{guestFormErrors.lastName}</span>}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <input
                              type="email"
                              placeholder="Email Address *"
                              value={guestForm.email}
                              onChange={(e) => setGuestForm({ ...guestForm, email: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border text-xs font-chakra outline-none"
                              style={{
                                backgroundColor: 'rgba(26, 86, 120, 0.3)',
                                borderColor: guestFormErrors.email ? '#ef4444' : 'rgba(21, 144, 151, 0.4)',
                                color: '#f8d092',
                              }}
                            />
                            {guestFormErrors.email && <span className="text-[10px] text-rose-400">{guestFormErrors.email}</span>}
                          </div>
                          <div>
                            <input
                              type="tel"
                              placeholder="Phone Number *"
                              value={guestForm.phone}
                              onChange={(e) => setGuestForm({ ...guestForm, phone: e.target.value })}
                              className="w-full px-3 py-2 rounded-xl border text-xs font-chakra outline-none"
                              style={{
                                backgroundColor: 'rgba(26, 86, 120, 0.3)',
                                borderColor: guestFormErrors.phone ? '#ef4444' : 'rgba(21, 144, 151, 0.4)',
                                color: '#f8d092',
                              }}
                            />
                            {guestFormErrors.phone && <span className="text-[10px] text-rose-400">{guestFormErrors.phone}</span>}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder="College Name"
                            value={guestForm.college}
                            onChange={(e) => setGuestForm({ ...guestForm, college: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border text-xs font-chakra outline-none"
                            style={{
                              backgroundColor: 'rgba(26, 86, 120, 0.3)',
                              borderColor: 'rgba(21, 144, 151, 0.4)',
                              color: '#f8d092',
                            }}
                          />
                          <select
                            value={guestForm.year}
                            onChange={(e) => setGuestForm({ ...guestForm, year: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border text-xs font-chakra outline-none"
                            style={{
                              backgroundColor: 'rgba(37, 36, 93, 0.9)',
                              borderColor: 'rgba(21, 144, 151, 0.4)',
                              color: '#f8d092',
                            }}
                          >
                            <option value="FE">First Year (FE)</option>
                            <option value="SE">Second Year (SE)</option>
                            <option value="TE">Third Year (TE)</option>
                            <option value="BE">Final Year (BE)</option>
                            <option value="Other">Other / Postgrad</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Payment Channel Selection */}
                  <div 
                    className="p-4 rounded-2xl border space-y-3"
                    style={{
                      backgroundColor: 'rgba(37, 36, 93, 0.6)',
                      borderColor: 'rgba(21, 144, 151, 0.4)',
                    }}
                  >
                    <span className="text-xs font-chakra font-bold tracking-wider text-[#38a48c] block">
                      CHOOSE SECURE PAYMENT GATEWAY
                    </span>

                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('upi')}
                        className={`p-3 rounded-2xl border text-center font-chakra text-xs font-bold transition-all cursor-pointer ${
                          paymentMethod === 'upi' ? 'shadow-md scale-102' : 'opacity-70'
                        }`}
                        style={{
                          backgroundColor: paymentMethod === 'upi' ? 'rgba(26, 86, 120, 0.7)' : 'rgba(37, 36, 93, 0.4)',
                          borderColor: paymentMethod === 'upi' ? '#f8d092' : 'rgba(21, 144, 151, 0.3)',
                          color: paymentMethod === 'upi' ? '#f8d092' : '#38a48c',
                        }}
                      >
                        <QrCode className="w-5 h-5 mx-auto mb-1" />
                        <span>UPI / QR</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-3 rounded-2xl border text-center font-chakra text-xs font-bold transition-all cursor-pointer ${
                          paymentMethod === 'card' ? 'shadow-md scale-102' : 'opacity-70'
                        }`}
                        style={{
                          backgroundColor: paymentMethod === 'card' ? 'rgba(26, 86, 120, 0.7)' : 'rgba(37, 36, 93, 0.4)',
                          borderColor: paymentMethod === 'card' ? '#f8d092' : 'rgba(21, 144, 151, 0.3)',
                          color: paymentMethod === 'card' ? '#f8d092' : '#38a48c',
                        }}
                      >
                        <CreditCard className="w-5 h-5 mx-auto mb-1" />
                        <span>Cards</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('netbanking')}
                        className={`p-3 rounded-2xl border text-center font-chakra text-xs font-bold transition-all cursor-pointer ${
                          paymentMethod === 'netbanking' ? 'shadow-md scale-102' : 'opacity-70'
                        }`}
                        style={{
                          backgroundColor: paymentMethod === 'netbanking' ? 'rgba(26, 86, 120, 0.7)' : 'rgba(37, 36, 93, 0.4)',
                          borderColor: paymentMethod === 'netbanking' ? '#f8d092' : 'rgba(21, 144, 151, 0.3)',
                          color: paymentMethod === 'netbanking' ? '#f8d092' : '#38a48c',
                        }}
                      >
                        <Radio className="w-5 h-5 mx-auto mb-1" />
                        <span>NetBanking</span>
                      </button>
                    </div>

                    {/* Method Details simulation */}
                    {paymentMethod === 'upi' && (
                      <div className="p-4 rounded-xl border text-center space-y-2 mt-3" style={{ backgroundColor: 'rgba(26, 86, 120, 0.25)', borderColor: 'rgba(21, 144, 151, 0.3)' }}>
                        <div className="w-32 h-32 mx-auto bg-white p-2 rounded-xl border flex flex-col items-center justify-center shadow-inner">
                          <QrCode className="w-24 h-24 text-slate-900" />
                        </div>
                        <p className="text-[11px] font-chakra font-medium text-slate-300">
                          Scan via GPay / PhonePe / Paytm / BHIM
                        </p>
                        <p className="text-[10px] font-mono text-[#f8d092]">
                          UPI ID: <span className="underline">pict.pasc.pulzion@axis</span>
                        </p>
                      </div>
                    )}

                    {paymentMethod === 'card' && (
                      <div className="p-3 rounded-xl border space-y-2 text-xs font-chakra" style={{ backgroundColor: 'rgba(26, 86, 120, 0.25)', borderColor: 'rgba(21, 144, 151, 0.3)' }}>
                        <input 
                          type="text" 
                          placeholder="Card Number (4000 1234 5678 9010)" 
                          className="w-full px-3 py-2 rounded-lg border outline-none bg-slate-900/60 border-slate-700 text-white font-mono"
                          defaultValue="4532 8921 4412 8890"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <input 
                            type="text" 
                            placeholder="MM/YY" 
                            className="w-full px-3 py-2 rounded-lg border outline-none bg-slate-900/60 border-slate-700 text-white font-mono"
                            defaultValue="12/28"
                          />
                          <input 
                            type="password" 
                            placeholder="CVV" 
                            maxLength={3}
                            className="w-full px-3 py-2 rounded-lg border outline-none bg-slate-900/60 border-slate-700 text-white font-mono"
                            defaultValue="782"
                          />
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'netbanking' && (
                      <div className="p-3 rounded-xl border text-xs font-chakra space-y-2" style={{ backgroundColor: 'rgba(26, 86, 120, 0.25)', borderColor: 'rgba(21, 144, 151, 0.3)' }}>
                        <select className="w-full px-3 py-2 rounded-lg border outline-none bg-slate-900 text-white">
                          <option>HDFC Bank</option>
                          <option>State Bank of India (SBI)</option>
                          <option>ICICI Bank</option>
                          <option>Axis Bank</option>
                          <option>Kotak Mahindra Bank</option>
                        </select>
                      </div>
                    )}
                  </div>

                  {/* Grand Total Summary in Payment */}
                  <div className="flex items-center justify-between p-3.5 rounded-2xl border text-xs font-chakra" style={{ backgroundColor: 'rgba(87, 28, 86, 0.35)', borderColor: 'rgba(248, 208, 146, 0.4)' }}>
                    <div>
                      <span className="text-slate-300 block">AMOUNT TO PAY</span>
                      <span className="text-[11px] text-[#38a48c]">Includes all discounts & fees</span>
                    </div>
                    <span className="font-orbitron font-extrabold text-xl text-[#f8d092]">
                      ₹{finalTotal}
                    </span>
                  </div>

                </div>
              )}

            </div>

            {/* Sticky Action Footer */}
            {checkoutStep !== 'success' && cartCount > 0 && (
              <div 
                className="p-4 sm:p-5 border-t flex items-center justify-between gap-3"
                style={{
                  backgroundColor: 'rgba(37, 36, 93, 0.95)',
                  borderColor: 'rgba(21, 144, 151, 0.35)',
                }}
              >
                <div>
                  <span className="text-[10px] font-telemetry block" style={{ color: '#38a48c' }}>
                    {checkoutStep === 'payment' ? 'FINAL AMOUNT' : 'ESTIMATED TOTAL'}
                  </span>
                  <span className="font-orbitron font-extrabold text-lg sm:text-xl text-[#f8d092]">
                    ₹{finalTotal}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {checkoutStep === 'payment' ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setCheckoutStep('cart')}
                        className="px-4 py-3 rounded-full font-chakra font-bold text-xs border text-slate-300 hover:text-white cursor-pointer"
                        style={{
                          backgroundColor: 'rgba(26, 86, 120, 0.4)',
                          borderColor: '#159097',
                        }}
                      >
                        Back
                      </button>

                      <button
                        id="btn-confirm-pay"
                        type="button"
                        onClick={handleProcessPayment}
                        disabled={isProcessingPayment}
                        className="px-6 py-3.5 rounded-full font-orbitron font-bold text-xs tracking-wider border shadow-xl flex items-center gap-2 cursor-pointer hover:scale-105 transition-all disabled:opacity-50"
                        style={{
                          backgroundColor: '#f8d092',
                          color: '#25245d',
                          borderColor: '#f8d092',
                          boxShadow: '0 0 25px rgba(248, 208, 146, 0.5)',
                        }}
                      >
                        {isProcessingPayment ? (
                          <>
                            <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                            <span>TRANSMITTING...</span>
                          </>
                        ) : (
                          <>
                            <Lock className="w-4 h-4 text-[#25245d]" />
                            <span>PAY ₹{finalTotal} & CONFIRM</span>
                          </>
                        )}
                      </button>
                    </>
                  ) : (
                    <button
                      id="btn-proceed-checkout"
                      type="button"
                      onClick={() => setCheckoutStep('payment')}
                      className="px-6 py-3.5 rounded-full font-orbitron font-bold text-xs tracking-wider border shadow-xl flex items-center gap-2 cursor-pointer hover:scale-105 transition-all"
                      style={{
                        backgroundColor: '#f8d092',
                        color: '#25245d',
                        borderColor: '#f8d092',
                        boxShadow: '0 0 25px rgba(248, 208, 146, 0.5)',
                      }}
                    >
                      <span>PROCEED TO CHECKOUT</span>
                      <ArrowRight className="w-4 h-4 text-[#25245d]" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
