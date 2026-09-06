import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  LogIn, 
  UserPlus, 
  ShoppingCart, 
  ArrowRight,
} from 'lucide-react';
import { EventItem } from '../types';

interface SignInPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGoToLogin: () => void;
  onGoToRegister: () => void;
  targetEvent?: EventItem | null;
}

// Custom Sci-Fi Alien Shield & Lock Graphics
const CadetSecurityShieldIcon: React.FC<{ className?: string }> = ({ className = "w-3 h-3" }) => (
  <svg viewBox="0 0 24 24" className={`${className} fill-current`} xmlns="http://www.w3.org/2000/svg">
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12v4.7c0 4.54-3.1 8.78-7 9.88-3.9-1.1-7-5.34-7-9.88V6.3l7-3.12z"/>
    <circle cx="12" cy="11" r="2.5" />
  </svg>
);

const QuantumLockIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
    <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" fill="none" stroke="#159097" strokeWidth="4" />
    <rect x="32" y="42" width="36" height="28" rx="6" fill="#f8d092" />
    <path d="M 38 42 V 32 A 12 12 0 0 1 62 32 V 42" fill="none" stroke="#f8d092" strokeWidth="5" strokeLinecap="round" />
    <circle cx="50" cy="54" r="3" fill="#070d24" />
  </svg>
);

export const SignInPromptModal: React.FC<SignInPromptModalProps> = ({
  isOpen,
  onClose,
  onGoToLogin,
  onGoToRegister,
  targetEvent,
}) => {
  // Handle ESC key to dismiss modal
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleKeyDown]);

  const modalBackdropStyle = {
    background: 'linear-gradient(145deg, #070d24 0%, #0b1437 50%, #060a1d 100%)',
    borderColor: 'rgba(21, 144, 151, 0.7)',
    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.95), 0 0 40px rgba(21, 144, 151, 0.35)',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          id="signin-prompt-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="signin-prompt-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg rounded-3xl p-6 sm:p-8 overflow-hidden border text-slate-100 z-10"
            style={modalBackdropStyle}
          >
            {/* Top Cosmic Cyan / Gold Glow Gradient Line */}
            <div 
              className="absolute top-0 left-0 right-0 h-1.5"
              style={{
                background: 'linear-gradient(to right, #159097, #38a48c, #f8d092)',
              }}
            />

            {/* Close Button */}
            <button
              id="btn-close-signin-modal"
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full border border-slate-700 bg-[#050716]/80 text-slate-400 hover:text-white hover:border-[#f8d092] transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header Icon & Badges */}
            <div className="flex items-center gap-3 mb-4">
              <div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center border shadow-lg shrink-0 relative"
                style={{
                  backgroundColor: 'rgba(21, 144, 151, 0.25)',
                  borderColor: '#f8d092',
                  boxShadow: '0 0 20px rgba(248, 208, 146, 0.3)',
                }}
              >
                <QuantumLockIcon className="w-7 h-7" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full" />
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-chakra font-bold tracking-widest uppercase bg-[#159097]/30 text-[#f8d092] border border-[#159097]/60 mb-1">
                  <CadetSecurityShieldIcon className="w-3 h-3 text-[#f8d092]" />
                  CADET VERIFICATION REQUIRED
                </div>
                <h2 
                  id="signin-prompt-title" 
                  className="font-orbitron font-extrabold text-xl sm:text-2xl text-white tracking-tight"
                >
                  SIGN IN <span style={{ color: '#f8d092' }}>FIRST</span>
                </h2>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm font-chakra text-slate-300 leading-relaxed mb-5">
              You must be logged in to add missions to your festival cart, lock challenge slot reservations, and claim exclusive multi-event bundle discounts.
            </p>

            {/* Target Event Preview */}
            {targetEvent && (
              <div 
                className="p-3.5 rounded-2xl border mb-6 flex items-center justify-between gap-3"
                style={{
                  backgroundColor: 'rgba(37, 36, 93, 0.4)',
                  borderColor: 'rgba(21, 144, 151, 0.4)',
                }}
              >
                <div className="min-w-0">
                  <span className="text-[10px] font-chakra font-bold uppercase tracking-wider block" style={{ color: '#38a48c' }}>
                    PENDING SELECTION
                  </span>
                  <h4 className="font-orbitron font-bold text-sm text-[#f8d092] truncate">
                    {targetEvent.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1 text-[11px] font-chakra text-slate-300">
                    <span>₹{targetEvent.entryFee}</span>
                    <span>•</span>
                    <span>{targetEvent.teamSize}</span>
                    <span>•</span>
                    <span className="text-emerald-400 font-semibold">{targetEvent.prizePool}</span>
                  </div>
                </div>

                <div 
                  className="w-9 h-9 rounded-xl flex items-center justify-center border shrink-0"
                  style={{
                    backgroundColor: 'rgba(21, 144, 151, 0.3)',
                    borderColor: '#159097',
                  }}
                >
                  <ShoppingCart className="w-4 h-4 text-[#f8d092]" />
                </div>
              </div>
            )}

            {/* Action CTAs */}
            <div className="space-y-3">
              <button
                id="btn-prompt-register"
                type="button"
                onClick={onGoToRegister}
                className="w-full py-3 px-4 rounded-2xl font-orbitron font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-200 shadow-xl hover:scale-[1.02] cursor-pointer"
                style={{
                  backgroundColor: '#f8d092',
                  color: '#070d24',
                  boxShadow: '0 0 25px rgba(248, 208, 146, 0.45)',
                }}
              >
                <UserPlus className="w-4 h-4 text-[#070d24]" />
                <span>CREATE NEW CADET ACCOUNT (ENLIST)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="btn-prompt-signin"
                type="button"
                onClick={onGoToLogin}
                className="w-full py-3 px-4 rounded-2xl font-chakra font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all duration-200 border hover:bg-slate-800/60 cursor-pointer"
                style={{
                  backgroundColor: 'rgba(26, 86, 120, 0.35)',
                  borderColor: '#159097',
                  color: '#f8d092',
                }}
              >
                <LogIn className="w-4 h-4 text-[#38a48c]" />
                <span>LOGIN TO MY ACCOUNT</span>
              </button>
            </div>

            {/* Dismiss option */}
            <div className="mt-4 text-center">
              <button
                id="btn-prompt-cancel"
                type="button"
                onClick={onClose}
                className="text-xs font-chakra text-slate-400 hover:text-slate-200 underline decoration-slate-600 transition-colors cursor-pointer"
              >
                Continue exploring without signing in
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
