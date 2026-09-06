import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Trophy, 
  Clock, 
  Users, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  Phone, 
  Mail, 
  Sparkles, 
  Zap, 
  AlertCircle,
  Share2,
  Ticket,
  Radio,
  Eye,
  Disc,
  ShoppingCart,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { EventItem, UserAccount } from '../types';
import { AlienBadge, AlienButton, AlienDecoderText } from './AlienUIElements';
import { useAlienTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';

interface EventDetailDrawerProps {
  event: EventItem | null;
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserAccount | null;
  onRegisterEvent: (eventId: string) => void;
  onOpenRegisterPage: (preselectedEventId?: string) => void;
  onRequireAuth?: (event: EventItem) => void;
}

export const EventDetailDrawer: React.FC<EventDetailDrawerProps> = ({
  event,
  isOpen,
  onClose,
  currentUser,
  onRegisterEvent,
  onOpenRegisterPage,
  onRequireAuth,
}) => {
  const { currentTheme } = useAlienTheme();
  const { isInCart, addToCart, openCart } = useCart();
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'rounds' | 'rules' | 'coordinators'>('overview');

  if (!isOpen || !event) return null;

  const isAlreadyRegistered = currentUser?.registeredEvents.includes(event.id);
  const inCart = isInCart(event.id);

  const handleCartClick = () => {
    if (inCart) {
      onClose();
      openCart();
    } else if (!currentUser) {
      if (onRequireAuth) {
        onRequireAuth(event);
      }
    } else {
      addToCart(event.id);
    }
  };

  const handleRegisterClick = () => {
    if (!currentUser) {
      onClose();
      onOpenRegisterPage(event.id);
    } else if (!isAlreadyRegistered) {
      onRegisterEvent(event.id);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: [currentTheme.palette.primaryHex, currentTheme.palette.secondaryHex, '#ffffff'],
        });
      } catch (e) {}
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
          <motion.div
            id="event-detail-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className="w-screen max-w-2xl border-l text-slate-100 shadow-2xl flex flex-col justify-between overflow-hidden relative"
            style={{
              backgroundColor: '#0a0d24',
              borderColor: 'rgba(21, 144, 151, 0.6)',
              boxShadow: `0 0 50px rgba(21, 144, 151, 0.35)`,
            }}
          >
            {/* Top Glowing Header Accent (Smooth curved line) */}
            <div 
              className="absolute top-0 left-0 right-0 h-1.5 shadow-md"
              style={{
                background: `linear-gradient(to right, #159097, #38a48c, #f8d092)`,
              }}
            />

            {/* Header Section */}
            <div 
              className="p-5 sm:p-6 border-b relative"
              style={{
                backgroundColor: 'rgba(37, 36, 93, 0.95)',
                borderColor: 'rgba(21, 144, 151, 0.35)',
              }}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-2">
                  <span 
                    className="text-xs font-chakra font-bold tracking-wider px-3.5 py-1 rounded-full border"
                    style={{
                      backgroundColor: 'rgba(87, 28, 86, 0.45)',
                      borderColor: 'rgba(21, 144, 151, 0.6)',
                      color: '#f8d092',
                    }}
                  >
                    {event.category.toUpperCase()}
                  </span>
                  <span className="text-xs font-telemetry" style={{ color: '#38a48c' }}>
                    XENO-ID://{event.id}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleShare}
                    className="px-3 py-1.5 rounded-full border text-xs font-chakra transition-colors flex items-center gap-1.5 cursor-pointer"
                    style={{
                      backgroundColor: 'rgba(26, 86, 120, 0.5)',
                      borderColor: 'rgba(21, 144, 151, 0.5)',
                      color: '#f8d092',
                    }}
                    title="Copy transmission link"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{copiedLink ? 'LINK COPIED' : 'SHARE'}</span>
                  </button>

                  <button
                    onClick={onClose}
                    className="p-1.5 rounded-full border transition-colors cursor-pointer"
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

              <h2 className="font-orbitron font-extrabold text-2xl sm:text-3xl tracking-wide mb-2" style={{ color: '#f8d092' }}>
                {event.title}
              </h2>
              <p className="text-sm font-chakra leading-relaxed" style={{ color: '#d8e8ea' }}>
                {event.tagline}
              </p>
            </div>

            {/* Navigation Sub-tabs (Smooth Curvilinear Pill Tabs) */}
            <div 
              className="px-5 sm:px-6 py-2.5 border-b flex gap-2 overflow-x-auto"
              style={{
                backgroundColor: 'rgba(26, 86, 120, 0.3)',
                borderColor: 'rgba(21, 144, 151, 0.35)',
              }}
            >
              {(['overview', 'rounds', 'rules', 'coordinators'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveSubTab(tab)}
                  className={`px-4 py-1.5 rounded-full text-xs font-chakra font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer border ${
                    activeSubTab === tab
                      ? 'shadow-sm'
                      : 'border-transparent'
                  }`}
                  style={{
                    backgroundColor: activeSubTab === tab ? 'rgba(37, 36, 93, 0.8)' : 'transparent',
                    borderColor: activeSubTab === tab ? '#159097' : 'transparent',
                    color: activeSubTab === tab ? '#f8d092' : '#38a48c',
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
              {activeSubTab === 'overview' && (
                <>
                  {/* Quick Stat Blocks (Smooth Rounded-2xl Cards) */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div 
                      className="p-3.5 rounded-2xl border"
                      style={{
                        backgroundColor: 'rgba(37, 36, 93, 0.4)',
                        borderColor: 'rgba(21, 144, 151, 0.35)',
                      }}
                    >
                      <div className="flex items-center gap-1.5 text-[11px] font-chakra mb-1" style={{ color: '#38a48c' }}>
                        <Trophy className="w-3.5 h-3.5" style={{ color: '#f8d092' }} />
                        <span>PRIZE POOL</span>
                      </div>
                      <p className="font-orbitron font-bold text-base" style={{ color: '#f8d092' }}>
                        {event.prizePool}
                      </p>
                    </div>

                    <div 
                      className="p-3.5 rounded-2xl border"
                      style={{
                        backgroundColor: 'rgba(37, 36, 93, 0.4)',
                        borderColor: 'rgba(21, 144, 151, 0.35)',
                      }}
                    >
                      <div className="flex items-center gap-1.5 text-[11px] font-chakra mb-1" style={{ color: '#38a48c' }}>
                        <Zap className="w-3.5 h-3.5" style={{ color: '#38a48c' }} />
                        <span>ENTRY TARIFF</span>
                      </div>
                      <p className="font-chakra font-bold text-base" style={{ color: '#f8d092' }}>
                        ₹{event.entryFee}
                      </p>
                    </div>

                    <div 
                      className="p-3.5 rounded-2xl border"
                      style={{
                        backgroundColor: 'rgba(37, 36, 93, 0.4)',
                        borderColor: 'rgba(21, 144, 151, 0.35)',
                      }}
                    >
                      <div className="flex items-center gap-1.5 text-[11px] font-chakra mb-1" style={{ color: '#38a48c' }}>
                        <Users className="w-3.5 h-3.5" style={{ color: '#159097' }} />
                        <span>SQUAD SIZE</span>
                      </div>
                      <p className="font-chakra font-bold text-base" style={{ color: '#f8d092' }}>
                        {event.teamSize}
                      </p>
                    </div>

                    <div 
                      className="p-3.5 rounded-2xl border"
                      style={{
                        backgroundColor: 'rgba(37, 36, 93, 0.4)',
                        borderColor: 'rgba(21, 144, 151, 0.35)',
                      }}
                    >
                      <div className="flex items-center gap-1.5 text-[11px] font-chakra mb-1" style={{ color: '#38a48c' }}>
                        <MapPin className="w-3.5 h-3.5" style={{ color: '#f8d092' }} />
                        <span>LOCATION</span>
                      </div>
                      <p className="font-chakra font-bold text-base truncate" style={{ color: '#f8d092' }}>
                        {event.venue}
                      </p>
                    </div>
                  </div>

                  {/* Description Dossier */}
                  <div className="space-y-3">
                    <h3 className="font-orbitron font-bold text-sm uppercase tracking-wider flex items-center gap-2" style={{ color: '#f8d092' }}>
                      <Radio className="w-4 h-4" style={{ color: '#38a48c' }} />
                      <span>MISSION DOSSIER</span>
                    </h3>
                    <p 
                      className="text-sm font-chakra leading-relaxed p-4 rounded-2xl border"
                      style={{
                        backgroundColor: 'rgba(26, 86, 120, 0.25)',
                        borderColor: 'rgba(21, 144, 151, 0.35)',
                        color: '#d8e8ea',
                      }}
                    >
                      {event.description}
                    </p>
                  </div>

                  {/* Date & Time Schedule Pill */}
                  <div 
                    className="p-4 rounded-2xl border flex items-center justify-between"
                    style={{
                      backgroundColor: 'rgba(37, 36, 93, 0.45)',
                      borderColor: 'rgba(21, 144, 151, 0.4)',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5" style={{ color: '#38a48c' }} />
                      <div>
                        <span className="text-[10px] font-telemetry block" style={{ color: '#38a48c' }}>WAR ZONE SCHEDULE</span>
                        <span className="text-sm font-chakra font-bold" style={{ color: '#f8d092' }}>{event.date} • {event.time}</span>
                      </div>
                    </div>
                    <span 
                      className="text-xs font-chakra px-3 py-1 rounded-full border"
                      style={{
                        backgroundColor: 'rgba(87, 28, 86, 0.5)',
                        borderColor: 'rgba(21, 144, 151, 0.4)',
                        color: '#f8d092',
                      }}
                    >
                      {event.slotsRemaining} Spots Left
                    </span>
                  </div>
                </>
              )}

              {activeSubTab === 'rounds' && (
                <div className="space-y-4">
                  <h3 className="font-orbitron font-bold text-sm uppercase tracking-wider" style={{ color: '#f8d092' }}>
                    BATTLE PHASES & ELIMINATION ROUNDS
                  </h3>
                  <div className="space-y-3">
                    {event.rounds.map((round, idx) => (
                      <div 
                        key={idx}
                        className="p-4 rounded-2xl border flex items-start gap-3.5"
                        style={{
                          backgroundColor: 'rgba(37, 36, 93, 0.4)',
                          borderColor: 'rgba(21, 144, 151, 0.35)',
                        }}
                      >
                        <div 
                          className="w-7 h-7 rounded-full flex items-center justify-center font-orbitron font-bold text-xs shrink-0 shadow-md text-[#25245d]"
                          style={{
                            backgroundColor: '#f8d092',
                          }}
                        >
                          {idx + 1}
                        </div>
                        <div>
                          <p className="text-sm font-chakra font-bold mb-1" style={{ color: '#f8d092' }}>
                            Phase {idx + 1}
                          </p>
                          <p className="text-xs font-chakra leading-relaxed" style={{ color: '#d8e8ea' }}>
                            {round}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSubTab === 'rules' && (
                <div className="space-y-4">
                  <h3 className="font-orbitron font-bold text-sm uppercase tracking-wider" style={{ color: '#f8d092' }}>
                    DIRECTIVES & PROTOCOLS
                  </h3>
                  <div className="space-y-2.5">
                    {event.rules.map((rule, idx) => (
                      <div 
                        key={idx}
                        className="p-3.5 rounded-2xl border flex items-center gap-3 text-xs font-chakra"
                        style={{
                          backgroundColor: 'rgba(37, 36, 93, 0.35)',
                          borderColor: 'rgba(21, 144, 151, 0.35)',
                          color: '#d8e8ea',
                        }}
                      >
                        <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: '#38a48c' }} />
                        <span>{rule}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeSubTab === 'coordinators' && (
                <div className="space-y-4">
                  <h3 className="font-orbitron font-bold text-sm uppercase tracking-wider" style={{ color: '#f8d092' }}>
                    EVENT COMMANDERS
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {event.coordinators.map((coord, idx) => (
                      <div 
                        key={idx}
                        className="p-4 rounded-2xl border flex flex-col justify-between"
                        style={{
                          backgroundColor: 'rgba(37, 36, 93, 0.4)',
                          borderColor: 'rgba(21, 144, 151, 0.35)',
                        }}
                      >
                        <div>
                          <h4 className="font-orbitron font-bold text-sm" style={{ color: '#f8d092' }}>{coord.name}</h4>
                          <p className="text-xs font-chakra mt-0.5" style={{ color: '#38a48c' }}>{coord.role}</p>
                        </div>
                        <div className="mt-3 pt-3 border-t space-y-1.5 text-xs font-chakra" style={{ borderColor: 'rgba(21, 144, 151, 0.3)' }}>
                          <a 
                            href={`tel:${coord.phone}`}
                            className="flex items-center gap-2 transition-colors hover:text-white"
                            style={{ color: '#38a48c' }}
                          >
                            <Phone className="w-3.5 h-3.5" style={{ color: '#38a48c' }} />
                            <span>{coord.phone}</span>
                          </a>
                          <a 
                            href={`mailto:${coord.email}`}
                            className="flex items-center gap-2 transition-colors truncate hover:text-white"
                            style={{ color: '#d8e8ea' }}
                          >
                            <Mail className="w-3.5 h-3.5" style={{ color: '#159097' }} />
                            <span className="truncate">{coord.email}</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Action Footer (Smooth Curvilinear Pill Buttons) */}
            <div 
              className="p-4 sm:p-5 border-t flex items-center justify-between gap-3"
              style={{
                backgroundColor: 'rgba(37, 36, 93, 0.95)',
                borderColor: 'rgba(21, 144, 151, 0.35)',
              }}
            >
              <div>
                <span className="text-[10px] font-telemetry block" style={{ color: '#38a48c' }}>TARIFF</span>
                <span className="font-orbitron font-extrabold text-lg" style={{ color: '#f8d092' }}>
                  ₹{event.entryFee} <span className="text-xs font-chakra font-normal" style={{ color: '#38a48c' }}>/ team</span>
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                {isAlreadyRegistered ? (
                  <div
                    className="flex items-center gap-2 px-5 py-3 rounded-full border font-chakra font-bold text-xs tracking-wider"
                    style={{
                      backgroundColor: 'rgba(26, 86, 120, 0.6)',
                      borderColor: '#159097',
                      color: '#f8d092',
                    }}
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>ALREADY REGISTERED</span>
                  </div>
                ) : (
                  <>
                    <button
                      id="drawer-cart-btn"
                      type="button"
                      onClick={handleCartClick}
                      className="flex items-center gap-2 px-4 py-3 rounded-full border font-chakra font-bold text-xs tracking-wider cursor-pointer hover:scale-105 transition-all"
                      style={{
                        backgroundColor: inCart ? '#f8d092' : 'rgba(26, 86, 120, 0.5)',
                        borderColor: inCart ? '#f8d092' : '#159097',
                        color: inCart ? '#25245d' : '#f8d092',
                        boxShadow: inCart ? '0 0 15px rgba(248, 208, 146, 0.4)' : undefined,
                      }}
                      title={inCart ? 'Open Cart' : 'Add to Cart'}
                    >
                      {inCart ? (
                        <>
                          <Check className="w-4 h-4 text-[#25245d]" />
                          <span>IN CART • OPEN</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4 text-[#f8d092]" />
                          <span>ADD TO CART</span>
                        </>
                      )}
                    </button>

                    <button
                      id="drawer-register-btn"
                      onClick={handleRegisterClick}
                      className="flex items-center gap-2 px-5 py-3 rounded-full font-orbitron font-bold text-xs tracking-wider shadow-xl cursor-pointer hover:scale-105 transition-all"
                      style={{
                        backgroundColor: '#f8d092',
                        color: '#25245d',
                        boxShadow: `0 0 25px rgba(248, 208, 146, 0.5)`,
                      }}
                    >
                      <ShieldCheck className="w-4 h-4 text-[#25245d]" />
                      <span>{currentUser ? 'DIRECT ENROLL' : 'ENLIST NOW'}</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};
