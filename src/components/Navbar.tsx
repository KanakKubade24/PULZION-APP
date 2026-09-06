import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  User, 
  Sparkles, 
  Calendar, 
  PhoneCall, 
  ShoppingCart
} from 'lucide-react';
import { UserAccount } from '../types';
import { useCart } from '../context/CartContext';
import { APP_CONFIG } from '../theme/designSystem';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser: UserAccount | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  onLogout,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount, openCart } = useCart();

  // Top-level Navigation Links
  const navItems = [
    { id: 'home', label: 'Earth Base', icon: Sparkles },
    { id: 'events', label: 'Missions', icon: Calendar },
    { id: 'coordinators', label: 'Command Station', icon: PhoneCall },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header 
      className="sticky top-0 z-40 backdrop-blur-xl border-b transition-all"
      style={{
        backgroundColor: 'rgba(5, 7, 22, 0.94)',
        borderColor: 'rgba(21, 144, 151, 0.35)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left Controls: Menu (mobile), Profile, and Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Hamburger Menu Toggle */}
            <button
              id="nav-mobile-menu-btn"
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl border border-slate-800 bg-black/40 text-slate-300 hover:text-white cursor-pointer"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation-drawer"
            >
              {mobileOpen ? <X className="w-5 h-5 text-[#f8d092]" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Profile / Crew ID Icon Button */}
            <button
              id="nav-crew-id-btn"
              type="button"
              onClick={() => handleNavClick(currentUser ? 'profile' : 'login')}
              className="relative p-2 rounded-xl border transition-all cursor-pointer hover:scale-105"
              style={{
                backgroundColor: activeTab === 'profile' ? 'rgba(248, 208, 146, 0.2)' : 'rgba(5, 7, 22, 0.7)',
                borderColor: activeTab === 'profile' ? '#f8d092' : 'rgba(56, 164, 140, 0.6)',
                color: activeTab === 'profile' ? '#f8d092' : '#ffffff',
              }}
              title={currentUser ? "Crew ID & Profile" : "Sign In"}
              aria-label={currentUser ? "View Profile" : "Sign In"}
            >
              <User className="w-4 h-4 text-[#f8d092]" />
              {currentUser && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-[#050716]" />
              )}
            </button>

            {/* Cart Button */}
            <button
              id="nav-my-cart-btn"
              type="button"
              onClick={openCart}
              className="relative flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-chakra font-bold tracking-wider transition-all shadow-md cursor-pointer hover:scale-105"
              style={{
                backgroundColor: cartCount > 0 ? 'rgba(37, 36, 93, 0.75)' : 'rgba(26, 86, 120, 0.35)',
                borderColor: cartCount > 0 ? '#f8d092' : '#159097',
                color: '#f8d092',
                boxShadow: cartCount > 0 ? '0 0 15px rgba(248, 208, 146, 0.35)' : '0 0 10px rgba(21, 144, 151, 0.2)',
              }}
              title="Open My Cart"
              aria-label={`Open Cart (${cartCount} items)`}
            >
              <ShoppingCart className="w-3.5 h-3.5 text-[#f8d092]" />
              <span className="hidden sm:inline">CART</span>
              {cartCount > 0 ? (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-[#f8d092] text-[#050716] animate-pulse">
                  {cartCount}
                </span>
              ) : (
                <span className="text-[10px] text-[#38a48c] font-normal">(0)</span>
              )}
            </button>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1.5" aria-label="Main Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-chakra font-bold tracking-wider transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'shadow-md border'
                      : 'border border-transparent hover:border-slate-700 text-slate-300 hover:text-white'
                  }`}
                  style={{
                    backgroundColor: isActive ? 'rgba(26, 86, 120, 0.5)' : 'transparent',
                    borderColor: isActive ? '#159097' : 'transparent',
                    color: isActive ? '#f8d092' : undefined,
                    boxShadow: isActive ? '0 0 15px rgba(21, 144, 151, 0.4)' : undefined,
                  }}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right: Brand Title Branding (PULZION '26 & BEYOND THE EARTH) */}
          <button 
            id="nav-brand-logo"
            type="button"
            onClick={() => handleNavClick('home')}
            className="flex flex-col items-end text-right group transition-transform focus:outline-none cursor-pointer"
            aria-label="Pulzion Home"
          >
            <div className="flex items-center gap-2">
              <span 
                className="text-[9px] uppercase font-chakra font-bold tracking-wider px-2 py-0.5 rounded-full border hidden sm:inline-block bg-slate-900 border-[#f8d092]/50 text-[#f8d092]"
              >
                PICT ACM CHAPTER
              </span>
              <span className="font-audiowide text-lg sm:text-xl tracking-wider text-[#f8d092] group-hover:brightness-110 transition-all" style={{ fontFamily: "'Audiowide', cursive, sans-serif" }}>
                {APP_CONFIG.appShortName} <span style={{ color: '#38a48c' }}>{APP_CONFIG.appEdition}</span>
              </span>
            </div>
            <p className="font-audiowide text-[11px] tracking-wider font-semibold text-[#38a48c] mt-0.5" style={{ fontFamily: "'Audiowide', cursive, sans-serif" }}>
              BEYOND THE EARTH
            </p>
          </button>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div 
          id="mobile-navigation-drawer"
          className="lg:hidden border-b px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200 max-h-[85vh] overflow-y-auto"
          style={{
            backgroundColor: 'rgba(5, 7, 22, 0.98)',
            borderColor: 'rgba(21, 144, 151, 0.4)',
          }}
        >
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`p-3 rounded-xl border text-left flex items-center gap-2.5 font-chakra text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#1a5678] border-[#f8d092] text-[#f8d092]'
                      : 'bg-black/40 border-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800/80 space-y-2">
            {!currentUser ? (
              <button
                type="button"
                onClick={() => handleNavClick('login')}
                className="w-full py-2.5 rounded-xl font-orbitron font-bold text-xs bg-[#f8d092] text-[#050716] text-center"
              >
                SIGN IN / ENLIST CADET
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onLogout();
                }}
                className="w-full py-2 rounded-xl font-chakra font-bold text-xs bg-rose-950/60 border border-rose-500/40 text-rose-300 text-center"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
