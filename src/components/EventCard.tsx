import React from 'react';
import { 
  Trophy, 
  Users, 
  Calendar, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  Zap, 
  ShieldCheck, 
  Flame, 
  Radio, 
  Eye, 
  Disc,
  ShoppingCart,
  Check
} from 'lucide-react';
import { EventItem } from '../types';
import { AlienBadge, AlienButton, AlienDecoderText } from './AlienUIElements';
import { useAlienTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { UserAccount } from '../types';

interface EventCardProps {
  event: EventItem;
  onSelectEvent: (event: EventItem) => void;
  isRegistered?: boolean;
  currentUser?: UserAccount | null;
  onRequireAuth?: (event: EventItem) => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  onSelectEvent,
  isRegistered = false,
  currentUser,
  onRequireAuth,
}) => {
  const { currentTheme } = useAlienTheme();
  const { isInCart, addToCart, openCart } = useCart();
  const inCart = isInCart(event.id);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Coding':
        return 'border-[#159097]/60 text-[#f8d092] bg-[#1a5678]/40';
      case 'Cyber Security':
        return 'border-[#38a48c]/60 text-[#38a48c] bg-[#25245d]/40';
      case 'AI & Web':
        return 'border-[#571c56]/70 text-[#f8d092] bg-[#571c56]/35';
      case 'Gaming':
        return 'border-[#159097]/60 text-[#f8d092] bg-[#1a5678]/50';
      case 'Robotics':
        return 'border-[#38a48c]/60 text-[#38a48c] bg-[#1a5678]/40';
      default:
        return 'border-[#159097]/60 text-[#f8d092] bg-[#25245d]/40';
    }
  };

  const percentageSlots = Math.round(((event.totalSlots - event.slotsRemaining) / event.totalSlots) * 100);

  const handleCartAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inCart) {
      openCart();
    } else if (!currentUser) {
      if (onRequireAuth) {
        onRequireAuth(event);
      }
    } else {
      addToCart(event.id);
    }
  };

  return (
    <div 
      id={`event-card-${event.id}`}
      onClick={() => onSelectEvent(event)}
      className="group relative rounded-3xl p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col justify-between cursor-pointer overflow-hidden backdrop-blur-xl border"
      style={{
        backgroundColor: 'rgba(26, 86, 120, 0.22)',
        borderColor: inCart ? 'rgba(248, 208, 146, 0.7)' : 'rgba(21, 144, 151, 0.4)',
        boxShadow: inCart ? `0 10px 30px rgba(5, 7, 22, 0.7), 0 0 20px rgba(248, 208, 146, 0.2)` : `0 10px 30px rgba(5, 7, 22, 0.7)`,
      }}
    >
      {/* Decorative Curvilinear Top Glow Accent */}
      <div 
        className="absolute top-0 left-1/4 right-1/4 h-[2px] rounded-full blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(to right, transparent, ${currentTheme.palette.primaryHex}, transparent)`,
        }}
      />
      
      {/* Ambient Radial Hover Aura with organic round shape */}
      <div 
        className="absolute -top-12 -right-12 w-36 h-36 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
        style={{ backgroundColor: currentTheme.palette.primaryHex }}
      />

      <div>
        {/* Top Header: Badge & Status */}
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <span className={`text-xs font-chakra font-bold tracking-wider px-3.5 py-1 rounded-full border ${getCategoryColor(event.category)}`}>
            {event.category.toUpperCase()}
          </span>

          <div className="flex items-center gap-1.5">
            {inCart && !isRegistered && (
              <span 
                className="flex items-center gap-1 text-[11px] font-chakra font-bold px-2.5 py-0.5 rounded-full border"
                style={{
                  backgroundColor: 'rgba(248, 208, 146, 0.2)',
                  borderColor: '#f8d092',
                  color: '#f8d092',
                }}
              >
                <Check className="w-3 h-3 text-[#f8d092]" />
                IN CART
              </span>
            )}

            {isRegistered ? (
              <AlienBadge label="REGISTERED" variant="green" />
            ) : event.isPopular ? (
              <span 
                className="flex items-center gap-1.5 text-[11px] font-chakra font-bold px-3 py-1 rounded-full border shadow-sm"
                style={{
                  backgroundColor: 'rgba(87, 28, 86, 0.6)',
                  borderColor: '#f8d092',
                  color: '#f8d092',
                }}
              >
                <Flame className="w-3.5 h-3.5" style={{ color: '#f8d092' }} />
                POPULAR
              </span>
            ) : (
              <span className="text-xs font-chakra font-medium" style={{ color: '#38a48c' }}>
                {event.badge}
              </span>
            )}
          </div>
        </div>

        {/* Title & Tagline */}
        <h3 
          className="font-orbitron font-bold text-lg sm:text-xl transition-colors mb-2 line-clamp-1"
          style={{ color: '#f8d092' }}
        >
          <span className="group-hover:text-white transition-colors">
            {event.title}
          </span>
        </h3>
        
        <p className="text-xs sm:text-sm font-chakra font-medium leading-relaxed mb-4 line-clamp-2" style={{ color: '#d8e8ea' }}>
          {event.tagline}
        </p>

        {/* Highlights Info Grid with Rounded Cells */}
        <div 
          className="grid grid-cols-2 gap-2.5 py-3.5 my-3.5 text-xs font-chakra border-y"
          style={{ borderColor: 'rgba(21, 144, 151, 0.3)' }}
        >
          <div 
            className="flex items-center gap-2.5 p-2.5 rounded-2xl border"
            style={{
              backgroundColor: 'rgba(37, 36, 93, 0.35)',
              borderColor: 'rgba(21, 144, 151, 0.3)',
            }}
          >
            <Trophy className="w-4 h-4 shrink-0" style={{ color: '#f8d092' }} />
            <div>
              <span className="text-[10px] block font-medium" style={{ color: '#38a48c' }}>PRIZE POOL</span>
              <span className="font-bold font-orbitron text-xs" style={{ color: '#f8d092' }}>{event.prizePool}</span>
            </div>
          </div>

          <div 
            className="flex items-center gap-2.5 p-2.5 rounded-2xl border"
            style={{
              backgroundColor: 'rgba(37, 36, 93, 0.35)',
              borderColor: 'rgba(21, 144, 151, 0.3)',
            }}
          >
            <Zap className="w-4 h-4 shrink-0" style={{ color: '#38a48c' }} />
            <div>
              <span className="text-[10px] block font-medium" style={{ color: '#38a48c' }}>ENTRY FEE</span>
              <span className="font-bold" style={{ color: '#f8d092' }}>₹{event.entryFee} / team</span>
            </div>
          </div>

          <div 
            className="flex items-center gap-2.5 p-2.5 rounded-2xl border"
            style={{
              backgroundColor: 'rgba(37, 36, 93, 0.35)',
              borderColor: 'rgba(21, 144, 151, 0.3)',
            }}
          >
            <Users className="w-4 h-4 shrink-0" style={{ color: '#159097' }} />
            <div>
              <span className="text-[10px] block font-medium" style={{ color: '#38a48c' }}>TEAM SIZE</span>
              <span className="font-medium" style={{ color: '#f8d092' }}>{event.teamSize}</span>
            </div>
          </div>

          <div 
            className="flex items-center gap-2.5 p-2.5 rounded-2xl border"
            style={{
              backgroundColor: 'rgba(37, 36, 93, 0.35)',
              borderColor: 'rgba(21, 144, 151, 0.3)',
            }}
          >
            <Calendar className="w-4 h-4 shrink-0" style={{ color: '#f8d092' }} />
            <div>
              <span className="text-[10px] block font-medium" style={{ color: '#38a48c' }}>SCHEDULE</span>
              <span className="font-medium" style={{ color: '#f8d092' }}>{event.date}</span>
            </div>
          </div>
        </div>

        {/* Slot Availability Progress */}
        <div className="mb-4">
          <div className="flex justify-between items-center text-[11px] font-chakra mb-1.5" style={{ color: '#38a48c' }}>
            <span>Availability ({percentageSlots}% Filled)</span>
            <span className="font-semibold" style={{ color: '#f8d092' }}>{event.slotsRemaining} spots left</span>
          </div>
          <div className="h-2 w-full rounded-full overflow-hidden border" style={{ backgroundColor: '#25245d', borderColor: 'rgba(21, 144, 151, 0.4)' }}>
            <div 
              className="h-full rounded-full transition-all duration-500"
              style={{ 
                width: `${percentageSlots}%`,
                background: `linear-gradient(to right, #159097, #38a48c, #f8d092)`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Action Footer: Add to Cart & View Details */}
      <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {!isRegistered ? (
          <button
            id={`btn-cart-${event.id}`}
            type="button"
            onClick={handleCartAction}
            className="py-2.5 px-3 rounded-full font-chakra font-bold text-xs tracking-wider border transition-all duration-200 flex items-center justify-center gap-1.5 shadow-md hover:scale-[1.02] cursor-pointer"
            style={{
              backgroundColor: inCart ? '#f8d092' : 'rgba(21, 144, 151, 0.35)',
              borderColor: inCart ? '#f8d092' : '#159097',
              color: inCart ? '#25245d' : '#f8d092',
              boxShadow: inCart ? '0 0 15px rgba(248, 208, 146, 0.4)' : undefined,
            }}
            title={inCart ? 'View in Cart' : 'Add event to cart'}
          >
            {inCart ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#25245d]" />
                <span>IN CART • VIEW</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5 text-[#f8d092]" />
                <span>ADD TO CART</span>
              </>
            )}
          </button>
        ) : (
          <div 
            className="py-2.5 px-3 rounded-full font-chakra font-bold text-xs tracking-wider border flex items-center justify-center gap-1.5"
            style={{
              backgroundColor: 'rgba(56, 164, 140, 0.2)',
              borderColor: '#38a48c',
              color: '#38a48c',
            }}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#38a48c]" />
            <span>ENROLLED</span>
          </div>
        )}

        <button
          id={`btn-view-event-${event.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onSelectEvent(event);
          }}
          className="py-2.5 px-3 rounded-full font-chakra font-bold text-xs tracking-wider border transition-all duration-200 flex items-center justify-center gap-1.5 shadow-md hover:scale-[1.02] cursor-pointer"
          style={{
            backgroundColor: 'rgba(37, 36, 93, 0.6)',
            borderColor: '#159097',
            color: '#f8d092',
          }}
        >
          <span>DETAILS</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" style={{ color: '#38a48c' }} />
        </button>
      </div>
    </div>
  );
};

