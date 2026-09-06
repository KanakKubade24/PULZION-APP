import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Calendar, 
  ShieldCheck, 
  Flame, 
  Search, 
  Filter, 
  ArrowRight, 
  Radio, 
  Gamepad2, 
  Trophy, 
  CheckCircle2, 
  Clock,
  Bookmark,
  SlidersHorizontal,
  Bell
} from 'lucide-react';
import { ThemeProvider, useAlienTheme } from './context/ThemeContext';
import { CartProvider, useCart } from './context/CartContext';
import { AlienBackground } from './components/AlienBackground';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { EventCard } from './components/EventCard';
import { EventDetailDrawer } from './components/EventDetailDrawer';
import { CartDrawer } from './components/CartDrawer';
import { RegisterPage } from './components/RegisterPage';
import { LoginPage } from './components/LoginPage';
import { SponsorsSection } from './components/SponsorsSection';
import { CoordinatorsSection } from './components/CoordinatorsSection';
import { ProfilePage } from './components/ProfilePage';
import { InfoPagesModal } from './components/InfoPagesModal';
import { ForgotPasswordModal } from './components/ForgotPasswordModal';
import { SignInPromptModal } from './components/SignInPromptModal';
import { BottomNav } from './components/BottomNav';
import { Footer } from './components/Footer';

import { EventService } from './services/eventService';
import { AuthService } from './services/authService';
import { RegistrationService } from './services/registrationService';
import { EventItem, UserAccount } from './types';
import { APP_CONFIG } from './theme/designSystem';

function MainAppContent() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  const { currentTheme } = useAlienTheme();
  const { addToCart } = useCart();
  
  // Event details drawer state
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [preselectedEventId, setPreselectedEventId] = useState<string | undefined>(undefined);
  
  // Modals state
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [infoModalTab, setInfoModalTab] = useState<'about' | 'rules' | 'privacy' | 'contact'>('about');
  const [isForgotPassOpen, setIsForgotPassOpen] = useState(false);
  const [isAuthPromptOpen, setIsAuthPromptOpen] = useState(false);
  const [authPromptEvent, setAuthPromptEvent] = useState<EventItem | null>(null);

  // Search & Filter state for Events
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'popular' | 'prize' | 'fee' | 'slots' | 'title'>('popular');
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load user from service on mount
  useEffect(() => {
    try {
      const user = AuthService.getCurrentUser();
      if (user) {
        setCurrentUser(user);
      }
    } catch (e) {
      console.error('Failed to load user session', e);
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleRequireAuth = (event?: EventItem) => {
    setAuthPromptEvent(event || null);
    setIsAuthPromptOpen(true);
  };

  const handleLoginSuccess = (user: UserAccount) => {
    setCurrentUser(user);
    AuthService.setCurrentUser(user);
    setActiveTab('home');
    if (authPromptEvent) {
      addToCart(authPromptEvent.id);
      showToast(`Welcome aboard, Commander ${user.firstName}! Added ${authPromptEvent.title} to your cart.`);
      setAuthPromptEvent(null);
    } else {
      showToast(`Welcome aboard, Commander ${user.firstName}!`);
    }
  };

  const handleRegisterSuccess = (user: UserAccount) => {
    setCurrentUser(user);
    AuthService.setCurrentUser(user);
    setActiveTab('home');
    if (authPromptEvent) {
      addToCart(authPromptEvent.id);
      showToast(`Enlistment Complete! Added ${authPromptEvent.title} to your cart.`);
      setAuthPromptEvent(null);
    } else {
      showToast(`Enlistment Complete! Welcome ${user.firstName}.`);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    AuthService.logout();
    showToast('Signed out from command terminal.');
  };

  const handleSelectEvent = (event: EventItem) => {
    setSelectedEvent(event);
    setIsDrawerOpen(true);
  };

  const handleRegisterEventDirect = async (eventId: string) => {
    if (!currentUser) {
      setPreselectedEventId(eventId);
      setActiveTab('register');
      return;
    }

    const res = await RegistrationService.registerUserForEvent(currentUser, eventId);
    if (res.success) {
      const updatedUser = AuthService.getCurrentUser() || currentUser;
      setCurrentUser(updatedUser);
      showToast('Challenge enrollment confirmed! Added to your Crew ID dossier.');
    }
  };

  const handleUpdateUserEvents = (newEventIds: string[]) => {
    if (currentUser) {
      const updated: UserAccount = {
        ...currentUser,
        registeredEvents: newEventIds,
      };
      setCurrentUser(updated);
      AuthService.setCurrentUser(updated);
      showToast('Crew dossier updated with newly enrolled missions!');
    }
  };

  const handleRegisterAccountAndPass = (newUser: UserAccount) => {
    setCurrentUser(newUser);
    AuthService.setCurrentUser(newUser);
    showToast(`Welcome Cadet ${newUser.firstName}! Your Crew ID is ready.`);
  };

  const handleOpenRegisterWithEvent = (eventId?: string) => {
    setPreselectedEventId(eventId);
    setActiveTab('register');
  };

  const handleOpenInfoModal = (tab?: 'about' | 'rules' | 'privacy' | 'contact') => {
    if (tab) setInfoModalTab(tab);
    setIsInfoModalOpen(true);
  };

  // Filtered & Sorted events via EventService
  const categories = EventService.getCategories();
  const filteredEvents = EventService.searchAndFilterEvents({
    query: searchQuery,
    category: selectedCategory,
    sortBy: sortBy,
    onlyBookmarked: onlyBookmarked,
  });

  return (
    <div className="relative min-h-screen bg-transparent text-slate-100 flex flex-col justify-between selection:bg-[#f8d092] selection:text-[#050716] pb-16 md:pb-0">
      
      {/* Background Simulation Scene */}
      <AlienBackground />

      {/* Global Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div 
            className="px-5 py-3.5 bg-[#050716]/95 border-2 text-white text-xs font-chakra font-bold flex items-center gap-3 shadow-2xl rounded-2xl backdrop-blur-xl"
            style={{
              borderColor: '#f8d092',
              boxShadow: '0 10px 30px rgba(0,0,0,0.8), 0 0 25px rgba(248, 208, 146, 0.25)',
            }}
          >
            <Radio className="w-5 h-5 text-[#f8d092] animate-pulse shrink-0" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main View Router */}
      <main className="relative z-10 flex-1">
        
        {/* VIEW: REGISTER */}
        {activeTab === 'register' && (
          <RegisterPage
            onBack={() => setActiveTab('home')}
            onGoToLogin={() => setActiveTab('login')}
            onRegisterSuccess={handleRegisterSuccess}
            preselectedEventId={preselectedEventId}
            allEvents={EventService.getAllEvents()}
          />
        )}

        {/* VIEW: LOGIN */}
        {activeTab === 'login' && (
          <LoginPage
            onBack={() => setActiveTab('home')}
            onGoToRegister={() => setActiveTab('register')}
            onLoginSuccess={handleLoginSuccess}
            onForgotPassword={() => setIsForgotPassOpen(true)}
          />
        )}

        {/* VIEW: HOME / EARTH BASE */}
        {activeTab === 'home' && (
          <div className="space-y-8 pb-12">
            {/* Hero Section */}
            <HeroBanner
              onRegisterClick={() => {
                if (currentUser) {
                  setActiveTab('profile');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  setActiveTab('register');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              onExploreEventsClick={() => {
                setActiveTab('events');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Quick Tactical Portals Deck */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-3">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-chakra font-bold mb-2 bg-[#159097]/20 border-[#159097]/50 text-[#f8d092]">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>COMMAND NAVIGATION HUBS</span>
                  </div>
                  <h2 className="font-orbitron font-extrabold text-2xl sm:text-3xl text-white uppercase tracking-tight">
                    FESTIVAL <span className="text-[#f8d092]">SECTORS</span>
                  </h2>
                  <p className="text-sm text-slate-300 font-chakra font-medium mt-1">
                    Launch directly into mission catalogs, cadet enlistment, coordinator desks, and festival partners.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    id: 'events',
                    title: 'Missions Catalog',
                    tag: '12+ Flagships',
                    desc: 'Competitive coding, CTFs, 36H Hackathon, robotics & esports with ₹5,00,000+ prize pool.',
                    icon: Calendar,
                  },
                  {
                    id: 'register',
                    title: 'Cadet Enlistment',
                    tag: 'Registration',
                    desc: 'Register for events, lock mission entries, and manage your team credentials.',
                    icon: ShieldCheck,
                  },
                  {
                    id: 'profile',
                    title: 'Crew ID Dossier',
                    tag: 'Personal Hub',
                    desc: 'Access your authenticated clearance credentials, team details, and registered challenges.',
                    icon: ShieldCheck,
                  },
                  {
                    id: 'coordinators',
                    title: 'Command Station',
                    tag: 'Direct Comms',
                    desc: 'Reach out directly to student leaders, technical heads, and operations staff.',
                    icon: Radio,
                  },
                  {
                    id: 'sponsors',
                    title: 'Mission Partners',
                    tag: 'Sponsors',
                    desc: 'Discover our title benefactors, hiring partners, computing clouds, and developer tools.',
                    icon: Sparkles,
                  },
                ].map((hub) => {
                  const Icon = hub.icon;
                  return (
                    <div
                      key={hub.id}
                      onClick={() => {
                        setActiveTab(hub.id);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="group p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
                      style={{
                        backgroundColor: 'rgba(26, 86, 120, 0.25)',
                        borderColor: 'rgba(21, 144, 151, 0.35)',
                      }}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div 
                            className="p-2.5 rounded-xl border"
                            style={{
                              backgroundColor: 'rgba(37, 36, 93, 0.6)',
                              borderColor: 'rgba(21, 144, 151, 0.5)',
                              color: '#f8d092',
                            }}
                          >
                            <Icon className="w-5 h-5 text-[#f8d092]" />
                          </div>
                          <span 
                            className="text-[10px] font-chakra font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full border"
                            style={{
                              backgroundColor: 'rgba(5, 7, 22, 0.6)',
                              borderColor: '#38a48c',
                              color: '#38a48c',
                            }}
                          >
                            {hub.tag}
                          </span>
                        </div>

                        <h3 className="font-orbitron font-bold text-base text-white group-hover:text-[#f8d092] transition-colors">
                          {hub.title}
                        </h3>
                        <p className="text-xs text-slate-300 font-chakra mt-1.5 leading-relaxed">
                          {hub.desc}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-chakra font-bold" style={{ color: '#38a48c' }}>
                        <span>ENGAGE SECTOR</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        )}

        {/* VIEW: DEDICATED EVENTS PAGE */}
        {activeTab === 'events' && (
          <section className="py-8 sm:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              
              {/* Header */}
              <div className="text-center max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-chakra font-bold mb-3 bg-[#159097]/20 border-[#159097]/50 text-[#f8d092]">
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  <span>TOTAL PRIZE POOL ₹5,00,000+</span>
                </div>
                <h1 className="font-orbitron font-extrabold text-3xl sm:text-5xl text-white uppercase tracking-tight">
                  ACTIVE <span className="text-[#f8d092]">MISSIONS & CHALLENGES</span>
                </h1>
                <p className="text-sm sm:text-base text-slate-300 font-chakra font-medium mt-2">
                  Select any challenge to view round breakdowns, rules, prize allocations, coordinator contacts, and register your team.
                </p>
              </div>

              {/* Search, Filter & Sort Bar */}
              <div 
                className="p-4 sm:p-5 rounded-3xl backdrop-blur-xl shadow-lg border space-y-3"
                style={{
                  backgroundColor: 'rgba(26, 86, 120, 0.25)',
                  borderColor: 'rgba(21, 144, 151, 0.4)',
                }}
              >
                <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
                  
                  {/* Search Input */}
                  <div className="relative w-full lg:w-96">
                    <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#38a48c]" />
                    <input
                      type="text"
                      placeholder="Search challenges, keywords, venues, coordinators..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-11 pr-4 py-2.5 rounded-2xl border text-xs font-chakra text-white placeholder-slate-400 bg-[#050716]/80 border-slate-800 focus:outline-none focus:border-[#f8d092] transition-colors"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Right Controls: Sort & Favorites Filter */}
                  <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto justify-end">
                    
                    {/* Sort Selector */}
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-black/50 border border-slate-800 text-xs font-chakra">
                      <SlidersHorizontal className="w-3.5 h-3.5 text-[#f8d092]" />
                      <span className="text-slate-400 hidden sm:inline">Sort:</span>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        className="bg-transparent text-[#f8d092] font-bold focus:outline-none cursor-pointer"
                      >
                        <option value="popular" className="bg-[#050716] text-white">Most Popular</option>
                        <option value="prize" className="bg-[#050716] text-white">Highest Prize Pool</option>
                        <option value="fee" className="bg-[#050716] text-white">Lowest Entry Fee</option>
                        <option value="slots" className="bg-[#050716] text-white">Slots Filling Fast</option>
                        <option value="title" className="bg-[#050716] text-white">Alphabetical (A-Z)</option>
                      </select>
                    </div>

                    {/* Bookmarked Filter */}
                    <button
                      onClick={() => setOnlyBookmarked(!onlyBookmarked)}
                      className={`px-3 py-1.5 rounded-2xl text-xs font-chakra font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${
                        onlyBookmarked
                          ? 'bg-[#f8d092] text-[#050716] border-[#f8d092]'
                          : 'bg-black/50 text-slate-300 border-slate-800 hover:text-white'
                      }`}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>{onlyBookmarked ? 'Favorites Locked' : 'Favorites'}</span>
                    </button>

                  </div>

                </div>

                {/* Category Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-1.5 rounded-full text-xs font-chakra font-bold tracking-wider whitespace-nowrap transition-all cursor-pointer border ${
                        selectedCategory === cat
                          ? 'bg-[#159097] text-white border-[#f8d092] shadow-md scale-105'
                          : 'bg-[#25245d]/40 border-slate-800 text-slate-300 hover:text-white'
                      }`}
                    >
                      {cat.toUpperCase()}
                    </button>
                  ))}
                </div>

              </div>

              {/* Event Cards Grid */}
              {filteredEvents.length === 0 ? (
                <div className="text-center py-16 bg-slate-950/60 rounded-3xl border border-slate-800">
                  <Calendar className="w-12 h-12 text-slate-600 mx-auto mb-2 opacity-50" />
                  <p className="text-slate-300 font-orbitron font-bold text-base">NO MISSIONS FOUND</p>
                  <p className="text-slate-500 font-chakra text-xs mt-1">
                    No challenges match your search filters or bookmark criteria.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                      setOnlyBookmarked(false);
                    }}
                    className="mt-4 px-5 py-2 rounded-full bg-[#f8d092] text-[#050716] text-xs font-orbitron font-bold hover:bg-white transition-all cursor-pointer"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEvents.map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      onSelectEvent={handleSelectEvent}
                      isRegistered={currentUser?.registeredEvents.includes(event.id)}
                      currentUser={currentUser}
                      onRequireAuth={handleRequireAuth}
                    />
                  ))}
                </div>
              )}

            </div>
          </section>
        )}

        {/* VIEW: DEDICATED SPONSORS */}
        {activeTab === 'sponsors' && (
          <SponsorsSection 
            onBack={() => {
              setActiveTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onExploreMissions={() => {
              setActiveTab('events');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* VIEW: DEDICATED COORDINATORS */}
        {activeTab === 'coordinators' && (
          <CoordinatorsSection />
        )}

        {/* VIEW: DEDICATED MY PROFILE PAGE */}
        {activeTab === 'profile' && (
          <ProfilePage
            currentUser={currentUser}
            allEvents={EventService.getAllEvents()}
            onExploreEvents={() => {
              setActiveTab('events');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onGoToLogin={() => {
              setActiveTab('login');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onGoToRegister={() => {
              setActiveTab('register');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onUpdateProfile={(updatedUser) => {
              setCurrentUser(updatedUser);
              AuthService.setCurrentUser(updatedUser);
              showToast('Crew ID dossier updated and synchronized!');
            }}
            onLogout={handleLogout}
          />
        )}

      </main>

      {/* Event Details Slide-in Dossier Drawer */}
      <EventDetailDrawer
        event={selectedEvent}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        currentUser={currentUser}
        onRegisterEvent={handleRegisterEventDirect}
        onOpenRegisterPage={handleOpenRegisterWithEvent}
        onRequireAuth={handleRequireAuth}
      />

      {/* Sign In Required Modal (Triggered when unauthenticated user adds to cart) */}
      <SignInPromptModal
        isOpen={isAuthPromptOpen}
        onClose={() => setIsAuthPromptOpen(false)}
        targetEvent={authPromptEvent}
        onGoToLogin={() => {
          setIsAuthPromptOpen(false);
          setIsDrawerOpen(false);
          setActiveTab('login');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onGoToRegister={() => {
          setIsAuthPromptOpen(false);
          setIsDrawerOpen(false);
          setPreselectedEventId(authPromptEvent?.id);
          setActiveTab('register');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Shopping Cart Drawer & Checkout Terminal */}
      <CartDrawer
        currentUser={currentUser}
        onLoginRequest={() => {
          setActiveTab('login');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onRegisterAccountAndPass={handleRegisterAccountAndPass}
        onUpdateUserEvents={handleUpdateUserEvents}
        onExploreEvents={() => {
          setActiveTab('events');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onGoToProfile={() => {
          setActiveTab('profile');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Comprehensive Information Directory Modal (About, Rules, Contact, Privacy) */}
      <InfoPagesModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
        initialTab={infoModalTab}
      />

      {/* Forgot Password / Security Code Recovery Modal */}
      <ForgotPasswordModal
        isOpen={isForgotPassOpen}
        onClose={() => setIsForgotPassOpen(false)}
        onSuccess={(msg) => showToast(msg)}
      />

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
      />

      {/* Terminal Footer */}
      <Footer onNavClick={(tab) => setActiveTab(tab)} />

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <MainAppContent />
      </CartProvider>
    </ThemeProvider>
  );
}
