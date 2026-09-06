import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  PhoneCall, 
  GraduationCap, 
  Building2, 
  Calendar, 
  Ticket, 
  Share2, 
  Copy, 
  Check, 
  Edit3, 
  Shield, 
  Trophy, 
  Sparkles, 
  Radio, 
  QrCode, 
  ArrowRight, 
  ArrowLeft, 
  LogOut, 
  Zap, 
  CheckCircle2, 
  Gift, 
  Star,
  Layers,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { UserAccount, EventItem } from '../types';
import { useAlienTheme } from '../context/ThemeContext';

interface ProfilePageProps {
  currentUser: UserAccount | null;
  allEvents: EventItem[];
  onExploreEvents: () => void;
  onGoToLogin: () => void;
  onGoToRegister: () => void;
  onUpdateProfile: (updatedUser: UserAccount) => void;
  onLogout: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  currentUser,
  allEvents,
  onExploreEvents,
  onGoToLogin,
  onGoToRegister,
  onUpdateProfile,
  onLogout,
}) => {
  const { currentTheme } = useAlienTheme();
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeViewTab, setActiveViewTab] = useState<'overview' | 'missions'>('overview');
  const [editFormData, setEditFormData] = useState({
    username: currentUser?.username || '',
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    phone: currentUser?.phone || '',
    contactNumber: currentUser?.contactNumber || currentUser?.phone || '',
    email: currentUser?.email || '',
    college: currentUser?.college || 'Pune Institute of Computer Technology (PICT)',
    year: currentUser?.year || 'Third Year (TE)',
    referralCode: currentUser?.referralCode || '',
  });

  const handleCopy = (text: string, label: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCopiedField(label);
      setTimeout(() => setCopiedField(null), 2500);
    } catch (e) {
      // Fallback
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const updated: UserAccount = {
      ...currentUser,
      username: editFormData.username.trim() || currentUser.username || `cadet_${currentUser.firstName.toLowerCase()}`,
      firstName: editFormData.firstName.trim() || currentUser.firstName,
      lastName: editFormData.lastName.trim() || currentUser.lastName,
      phone: editFormData.phone.trim() || currentUser.phone,
      contactNumber: editFormData.contactNumber.trim() || editFormData.phone.trim() || currentUser.phone,
      email: editFormData.email.trim() || currentUser.email,
      college: editFormData.college.trim() || currentUser.college,
      year: editFormData.year.trim() || currentUser.year,
      referralCode: editFormData.referralCode.trim() || currentUser.referralCode,
    };

    onUpdateProfile(updated);
    setIsEditModalOpen(false);
  };

  // If no user is logged in
  if (!currentUser) {
    return (
      <section className="py-12 sm:py-20 min-h-[80vh] flex items-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          <div 
            className="p-8 sm:p-12 rounded-3xl border shadow-2xl backdrop-blur-xl relative overflow-hidden"
            style={{
              backgroundColor: 'rgba(37, 36, 93, 0.75)',
              borderColor: 'rgba(21, 144, 151, 0.6)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.8), 0 0 35px rgba(21, 144, 151, 0.3)',
            }}
          >
            <div 
              className="w-20 h-20 rounded-3xl mx-auto mb-6 flex items-center justify-center border shadow-lg"
              style={{
                backgroundColor: 'rgba(26, 86, 120, 0.5)',
                borderColor: '#f8d092',
                color: '#f8d092',
              }}
            >
              <User className="w-10 h-10" />
            </div>

            <div 
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-chakra font-bold mb-4"
              style={{
                backgroundColor: 'rgba(87, 28, 86, 0.5)',
                borderColor: '#f8d092',
                color: '#f8d092',
              }}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>CREW ID TERMINAL</span>
            </div>

            <h1 className="font-orbitron font-extrabold text-3xl sm:text-4xl text-white uppercase tracking-tight mb-4">
              AUTHENTICATION <span style={{ color: '#f8d092' }}>REQUIRED</span>
            </h1>

            <p className="text-slate-300 font-chakra text-sm sm:text-base max-w-lg mx-auto mb-8">
              Access your personal Crew ID dossier, digital invasion pass, enrolled mission badges, defense squadron assignments, and referral network.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                id="profile-signin-btn"
                onClick={onGoToLogin}
                className="w-full sm:w-auto px-8 py-3 rounded-full font-orbitron font-bold text-xs tracking-wider border shadow-lg transition-all cursor-pointer hover:scale-105 flex items-center justify-center gap-2"
                style={{
                  backgroundColor: '#f8d092',
                  borderColor: '#ffffff',
                  color: '#050716',
                }}
              >
                <Zap className="w-4 h-4 text-[#050716]" />
                <span>SIGN IN TO CREW TERMINAL</span>
              </button>

              <button
                id="profile-register-btn"
                onClick={onGoToRegister}
                className="w-full sm:w-auto px-8 py-3 rounded-full font-chakra font-bold text-xs tracking-wider border transition-all cursor-pointer hover:border-[#f8d092] flex items-center justify-center gap-2"
                style={{
                  backgroundColor: 'rgba(26, 86, 120, 0.4)',
                  borderColor: 'rgba(21, 144, 151, 0.8)',
                  color: '#f8d092',
                }}
              >
                <Ticket className="w-4 h-4" />
                <span>ENLIST NEW CREW ID PASS</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Derive active values and fallbacks
  const username = currentUser.username || `cadet_${currentUser.firstName.toLowerCase()}_${currentUser.ticketId.replace(/[^0-9]/g, '').slice(-3) || '99'}`;
  const referralCode = currentUser.referralCode || `PULZION26-${currentUser.firstName.toUpperCase().slice(0, 4)}88`;
  const contactNumber = currentUser.contactNumber || currentUser.phone;
  const phoneNumber = currentUser.phone;
  const year = currentUser.year || 'Third Year (TE)';
  const college = currentUser.college || 'Pune Institute of Computer Technology (PICT)';
  const email = currentUser.email;

  const userEvents = allEvents.filter((ev) => currentUser.registeredEvents.includes(ev.id));

  return (
    <section className="py-6 sm:py-8 min-h-[85vh]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-5">
        
        {/* COMPACT COMMAND HEADER BANNER */}
        <div 
          className="p-4 sm:p-5 rounded-3xl border shadow-xl relative overflow-hidden backdrop-blur-xl"
          style={{
            background: `linear-gradient(135deg, rgba(37, 36, 93, 0.92), rgba(26, 86, 120, 0.8))`,
            borderColor: 'rgba(21, 144, 151, 0.6)',
            boxShadow: '0 12px 35px rgba(0,0,0,0.7), 0 0 25px rgba(21, 144, 151, 0.25)',
          }}
        >
          {/* Subtle Ambient Glow */}
          <div 
            className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none opacity-20 blur-3xl"
            style={{ backgroundColor: '#159097' }}
          />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 relative z-10">
            
            {/* User Avatar and Primary Identity */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="relative shrink-0">
                <div 
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-2 flex items-center justify-center text-xl sm:text-2xl font-orbitron font-extrabold shadow-xl text-[#050716]"
                  style={{
                    backgroundColor: '#f8d092',
                    borderColor: '#ffffff',
                    boxShadow: '0 0 20px rgba(248, 208, 146, 0.4)',
                  }}
                >
                  {currentUser.firstName.charAt(0).toUpperCase()}
                </div>
                <div 
                  className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded-full text-[8px] font-chakra font-bold border flex items-center gap-1 shadow-md bg-emerald-950 text-emerald-300 border-emerald-400"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ACTIVE
                </div>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-0.5">
                  <span className="font-chakra text-[10px] tracking-widest uppercase font-bold text-[#38a48c]">
                    OFFICIAL CREW ID DOSSIER
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-[11px] font-telemetry text-slate-300">
                    CREW ID: #{currentUser.ticketId}
                  </span>
                </div>

                <h1 className="font-orbitron font-black text-xl sm:text-2xl text-white tracking-wide flex items-center gap-2">
                  {currentUser.firstName} {currentUser.lastName}
                </h1>

                <div className="flex flex-wrap items-center gap-2 mt-1 text-xs font-chakra text-slate-200">
                  <span className="px-2.5 py-0.5 rounded-full bg-black/40 border border-slate-700 text-[#f8d092] font-mono text-[11px] font-bold flex items-center gap-1">
                    <User className="w-3 h-3 text-[#f8d092]" />
                    @{username}
                  </span>

                  <span className="px-2.5 py-0.5 rounded-full bg-black/40 border border-slate-700 text-slate-300 text-[11px] flex items-center gap-1 truncate max-w-[200px] sm:max-w-xs">
                    <Building2 className="w-3 h-3 text-[#38a48c] shrink-0" />
                    <span className="truncate">{college}</span>
                  </span>

                  <span className="px-2.5 py-0.5 rounded-full bg-black/40 border border-slate-700 text-slate-300 text-[11px] flex items-center gap-1">
                    <GraduationCap className="w-3 h-3 text-[#38a48c]" />
                    {year}
                  </span>
                </div>
              </div>
            </div>

            {/* Top Quick Actions */}
            <div className="flex flex-col items-start sm:items-end gap-2 w-full lg:w-auto shrink-0">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  id="profile-edit-btn"
                  onClick={() => {
                    setEditFormData({
                      username: username,
                      firstName: currentUser.firstName,
                      lastName: currentUser.lastName,
                      phone: currentUser.phone,
                      contactNumber: contactNumber,
                      email: currentUser.email,
                      college: college,
                      year: year,
                      referralCode: referralCode,
                    });
                    setIsEditModalOpen(true);
                  }}
                  className="px-3.5 py-1.5 rounded-full font-chakra font-bold text-xs border tracking-wider flex items-center gap-1.5 transition-all cursor-pointer hover:scale-105 shadow-md"
                  style={{
                    backgroundColor: 'rgba(26, 86, 120, 0.6)',
                    borderColor: '#159097',
                    color: '#f8d092',
                  }}
                >
                  <Edit3 className="w-3.5 h-3.5 text-[#f8d092]" />
                  <span>EDIT CREW ID</span>
                </button>

                <button
                  id="profile-logout-btn"
                  onClick={onLogout}
                  className="px-3.5 py-1.5 rounded-full font-chakra font-bold text-xs border tracking-wider flex items-center gap-1.5 transition-all cursor-pointer hover:bg-rose-900/60 hover:border-rose-400 text-rose-300 hover:text-white shadow-md hover:scale-105"
                  style={{
                    backgroundColor: 'rgba(87, 28, 86, 0.55)',
                    borderColor: 'rgba(248, 113, 113, 0.5)',
                  }}
                  title="Sign out of current Crew ID session"
                >
                  <span>LOGOUT</span>
                  <LogOut className="w-3.5 h-3.5 text-rose-400" />
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* SCREEN VIEW SELECTOR TABS */}
        <div className="flex items-center gap-2 border-b pb-2 overflow-x-auto" style={{ borderColor: 'rgba(21, 144, 151, 0.35)' }}>
          <button
            onClick={() => setActiveViewTab('overview')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-orbitron font-bold tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              activeViewTab === 'overview'
                ? 'bg-[#f8d092] text-[#050716] shadow-[0_0_12px_rgba(248,208,146,0.3)]'
                : 'text-slate-300 hover:text-white bg-slate-900/60 border border-slate-800'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>DOSSIER OVERVIEW</span>
          </button>

          <button
            onClick={() => setActiveViewTab('missions')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-orbitron font-bold tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              activeViewTab === 'missions'
                ? 'bg-[#f8d092] text-[#050716] shadow-[0_0_12px_rgba(248,208,146,0.3)]'
                : 'text-slate-300 hover:text-white bg-slate-900/60 border border-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>REGISTERED MISSIONS</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
              activeViewTab === 'missions' ? 'bg-[#050716] text-[#f8d092]' : 'bg-[#38a48c] text-[#050716]'
            }`}>
              {userEvents.length}
            </span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW SCREEN (BALANCED 2-COLUMN BENTO GRID) */}
        {activeViewTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            
            {/* LEFT COLUMN: COMPACT 7-CREDENTIAL MATRIX (7 COLS) */}
            <div 
              className="lg:col-span-7 p-4 sm:p-5 rounded-3xl border shadow-xl backdrop-blur-xl flex flex-col justify-between"
              style={{
                backgroundColor: 'rgba(37, 36, 93, 0.75)',
                borderColor: 'rgba(21, 144, 151, 0.5)',
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#38a48c]" />
                    <h2 className="font-orbitron font-bold text-sm sm:text-base text-white">
                      CREW ID CREDENTIALS
                    </h2>
                  </div>
                  <button
                    onClick={() => {
                      setEditFormData({
                        username: username,
                        firstName: currentUser.firstName,
                        lastName: currentUser.lastName,
                        phone: currentUser.phone,
                        contactNumber: contactNumber,
                        email: currentUser.email,
                        college: college,
                        year: year,
                        referralCode: referralCode,
                      });
                      setIsEditModalOpen(true);
                    }}
                    className="text-xs font-chakra font-bold text-[#f8d092] hover:underline flex items-center gap-1"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  
                  {/* 1. USERNAME */}
                  <div className="p-3 rounded-2xl border bg-black/40 border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-chakra uppercase font-bold text-slate-400 block flex items-center gap-1">
                        <User className="w-3 h-3 text-[#f8d092]" />
                        Call Sign
                      </span>
                      <p className="font-orbitron font-bold text-sm text-white mt-0.5">
                        @{username}
                      </p>
                    </div>
                    <button
                      onClick={() => handleCopy(`@${username}`, 'username')}
                      className="p-1 rounded-lg bg-slate-800/80 text-slate-400 hover:text-white transition-colors"
                      title="Copy Call Sign"
                    >
                      {copiedField === 'username' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>

                  {/* 2. EMAIL */}
                  <div className="p-3 rounded-2xl border bg-black/40 border-slate-800 flex items-center justify-between">
                    <div className="truncate pr-2">
                      <span className="text-[10px] font-chakra uppercase font-bold text-slate-400 block flex items-center gap-1">
                        <Mail className="w-3 h-3 text-[#f8d092]" />
                        Email Address
                      </span>
                      <p className="font-orbitron font-bold text-xs text-white mt-0.5 truncate" title={email}>
                        {email}
                      </p>
                    </div>
                    <button
                      onClick={() => handleCopy(email, 'email')}
                      className="p-1 rounded-lg bg-slate-800/80 text-slate-400 hover:text-white transition-colors shrink-0"
                      title="Copy Email"
                    >
                      {copiedField === 'email' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>

                  {/* 3. PHONE NUMBER */}
                  <div className="p-3 rounded-2xl border bg-black/40 border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-chakra uppercase font-bold text-slate-400 block flex items-center gap-1">
                        <Phone className="w-3 h-3 text-[#f8d092]" />
                        Phone No.
                      </span>
                      <p className="font-orbitron font-bold text-sm text-white mt-0.5">
                        {phoneNumber}
                      </p>
                    </div>
                    <button
                      onClick={() => handleCopy(phoneNumber, 'phone')}
                      className="p-1 rounded-lg bg-slate-800/80 text-slate-400 hover:text-white transition-colors"
                      title="Copy Phone"
                    >
                      {copiedField === 'phone' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>

                  {/* 4. CONTACT NUMBER */}
                  <div className="p-3 rounded-2xl border bg-black/40 border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-chakra uppercase font-bold text-slate-400 block flex items-center gap-1">
                        <PhoneCall className="w-3 h-3 text-[#f8d092]" />
                        Alt. Contact
                      </span>
                      <p className="font-orbitron font-bold text-sm text-white mt-0.5">
                        {contactNumber}
                      </p>
                    </div>
                    <button
                      onClick={() => handleCopy(contactNumber, 'contactNumber')}
                      className="p-1 rounded-lg bg-slate-800/80 text-slate-400 hover:text-white transition-colors"
                      title="Copy Contact"
                    >
                      {copiedField === 'contactNumber' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>

                  {/* 5. REFERRAL CODE */}
                  <div className="p-3 rounded-2xl border border-[#f8d092]/40 bg-[#571c56]/30 flex items-center justify-between sm:col-span-2">
                    <div>
                      <span className="text-[10px] font-chakra uppercase font-bold text-[#f8d092] block flex items-center gap-1">
                        <Gift className="w-3 h-3 text-[#f8d092]" />
                        Referral Code (+50 Pts bonus)
                      </span>
                      <p className="font-orbitron font-black text-sm sm:text-base text-[#f8d092] mt-0.5 tracking-wider">
                        {referralCode}
                      </p>
                    </div>
                    <button
                      onClick={() => handleCopy(referralCode, 'referral')}
                      className="px-2.5 py-1 rounded-lg font-chakra font-bold text-[11px] bg-[#f8d092] text-[#050716] hover:bg-white transition-all flex items-center gap-1 shadow-sm"
                      title="Copy Referral"
                    >
                      {copiedField === 'referral' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedField === 'referral' ? 'COPIED' : 'COPY'}</span>
                    </button>
                  </div>

                  {/* 6. COLLEGE & 7. YEAR */}
                  <div className="p-3 rounded-2xl border bg-black/40 border-slate-800 sm:col-span-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <div>
                      <span className="text-[10px] font-chakra uppercase font-bold text-slate-400 block flex items-center gap-1">
                        <Building2 className="w-3 h-3 text-[#38a48c]" />
                        Campus Institution
                      </span>
                      <p className="font-orbitron font-bold text-xs sm:text-sm text-white mt-0.5">
                        {college}
                      </p>
                    </div>
                    <div className="shrink-0">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-chakra font-bold bg-[#159097]/30 text-[#f8d092] border border-[#159097]/60">
                        {year}
                      </span>
                    </div>
                  </div>

                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-chakra text-slate-400">
                <span>Country: <strong className="text-white">{currentUser.country || 'India'}</strong></span>
                <span>Enlisted: <strong className="text-white">{new Date(currentUser.joinedAt).toLocaleDateString()}</strong></span>
              </div>
            </div>

            {/* RIGHT COLUMN: DUAL ACTION CARDS (5 COLS) */}
            <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
              
              {/* ENROLLED MISSIONS STATUS CARD */}
              <div 
                className="p-4 sm:p-5 rounded-3xl border shadow-xl backdrop-blur-xl relative overflow-hidden"
                style={{
                  backgroundColor: 'rgba(37, 36, 93, 0.85)',
                  borderColor: 'rgba(248, 208, 146, 0.6)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.6), 0 0 20px rgba(248, 208, 146, 0.15)',
                }}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#f8d092]" />
                    <span className="font-orbitron font-bold text-xs sm:text-sm text-white">
                      MISSION ENROLLMENT STATUS
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[8px] font-chakra font-bold bg-emerald-950 text-emerald-300 border border-emerald-400">
                    AUTHORIZED
                  </span>
                </div>

                <div 
                  className="p-3 rounded-2xl border mb-3 flex items-center justify-between gap-3"
                  style={{
                    backgroundColor: 'rgba(5, 7, 22, 0.7)',
                    borderColor: 'rgba(21, 144, 151, 0.4)',
                  }}
                >
                  <div>
                    <span className="text-[8px] font-telemetry uppercase text-slate-400 block">
                      CREW ACCESS ID
                    </span>
                    <span className="font-orbitron font-extrabold text-sm sm:text-base text-[#f8d092]">
                      {currentUser.ticketId}
                    </span>
                    <p className="text-[11px] font-chakra text-slate-300 mt-0.5">
                      {userEvents.length} {userEvents.length === 1 ? 'Mission' : 'Missions'} Enrolled
                    </p>
                  </div>

                  <div 
                    className="px-3 py-2 rounded-xl text-center border font-orbitron font-bold text-xs"
                    style={{
                      backgroundColor: 'rgba(21, 144, 151, 0.25)',
                      borderColor: '#159097',
                      color: '#f8d092',
                    }}
                  >
                    <span className="block text-lg font-black text-white">{userEvents.length}</span>
                    <span className="text-[9px] text-[#38a48c] uppercase">ACTIVE</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveViewTab('missions')}
                  className="w-full py-2 rounded-xl font-orbitron font-bold text-xs border tracking-wider shadow-md transition-all cursor-pointer hover:scale-[1.02] flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: '#f8d092',
                    borderColor: '#ffffff',
                    color: '#050716',
                  }}
                >
                  <Layers className="w-3.5 h-3.5 text-[#050716]" />
                  <span>VIEW ENROLLED MISSIONS ({userEvents.length})</span>
                </button>
              </div>

              {/* COMPACT MISSION INTEL & QUICK ACCESS CARD */}
              <div 
                className="p-4 sm:p-5 rounded-3xl border shadow-xl backdrop-blur-xl"
                style={{
                  backgroundColor: 'rgba(37, 36, 93, 0.85)',
                  borderColor: 'rgba(21, 144, 151, 0.5)',
                }}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#38a48c]" />
                    <span className="font-orbitron font-bold text-xs sm:text-sm text-white">
                      MISSION HUB
                    </span>
                  </div>
                  <span className="text-[11px] font-chakra font-bold text-[#f8d092] flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>Cadet Active</span>
                  </span>
                </div>

                <div 
                  className="p-3 rounded-2xl border mb-3 flex items-center gap-3"
                  style={{
                    backgroundColor: 'rgba(5, 7, 22, 0.7)',
                    borderColor: 'rgba(56, 164, 140, 0.5)',
                  }}
                >
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center border font-orbitron font-black text-sm shrink-0"
                    style={{
                      backgroundColor: 'rgba(21, 144, 151, 0.25)',
                      borderColor: '#f8d092',
                      color: '#f8d092',
                    }}
                  >
                    <Trophy className="w-5 h-5 text-[#f8d092]" />
                  </div>
                  <div className="truncate">
                    <span className="text-[8px] font-telemetry uppercase text-[#38a48c] block">
                      TOTAL PRIZE POOL
                    </span>
                    <h4 className="font-orbitron font-bold text-xs sm:text-sm text-white truncate">
                      ₹5,00,000+ ACROSS 12+ MISSIONS
                    </h4>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={onExploreEvents}
                    className="py-2 px-3 rounded-xl font-chakra font-bold text-xs border tracking-wider text-[#050716] bg-[#f8d092] hover:bg-white transition-all flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>EXPLORE ALL MISSIONS</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: REGISTERED MISSIONS VIEW */}
        {activeViewTab === 'missions' && (
          <div 
            className="p-4 sm:p-6 rounded-3xl border shadow-xl backdrop-blur-xl"
            style={{
              backgroundColor: 'rgba(37, 36, 93, 0.75)',
              borderColor: 'rgba(21, 144, 151, 0.5)',
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3 mb-4" style={{ borderColor: 'rgba(21, 144, 151, 0.3)' }}>
              <div>
                <h2 className="font-orbitron font-bold text-base sm:text-lg text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#f8d092]" />
                  <span>AUTHORIZED MISSIONS ({userEvents.length})</span>
                </h2>
                <p className="text-xs font-chakra text-slate-300 mt-0.5">
                  Challenges and hackathons linked to your Crew ID clearance.
                </p>
              </div>

              <button
                id="profile-add-missions-btn"
                onClick={onExploreEvents}
                className="px-3.5 py-1.5 rounded-full font-chakra font-bold text-xs border tracking-wider flex items-center gap-1.5 transition-all cursor-pointer hover:scale-105 self-start sm:self-auto"
                style={{
                  backgroundColor: '#f8d092',
                  borderColor: '#ffffff',
                  color: '#050716',
                }}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#050716]" />
                <span>EXPLORE MORE MISSIONS</span>
              </button>
            </div>

            {userEvents.length === 0 ? (
              <div className="text-center py-8">
                <Ticket className="w-10 h-10 text-slate-500 mx-auto mb-2 opacity-50" />
                <p className="font-orbitron text-xs sm:text-sm text-slate-300 font-bold mb-1">
                  NO REGISTERED MISSIONS YET
                </p>
                <p className="text-xs font-chakra text-slate-400 max-w-md mx-auto mb-4">
                  You haven't enrolled in any technical or non-technical challenges. Explore our full roster to compete for ₹5,00,000+ prize pools!
                </p>
                <button
                  onClick={onExploreEvents}
                  className="px-5 py-2 rounded-full font-chakra font-bold text-xs tracking-wider border text-[#f8d092] border-[#159097] hover:bg-[#159097] hover:text-[#050716] transition-all cursor-pointer"
                >
                  BROWSE MISSIONS CATALOGUE
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {userEvents.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-4 rounded-2xl border transition-all relative overflow-hidden flex flex-col justify-between group hover:border-[#f8d092]"
                    style={{
                      backgroundColor: 'rgba(5, 7, 22, 0.65)',
                      borderColor: 'rgba(21, 144, 151, 0.45)',
                    }}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[9px] font-chakra font-bold uppercase px-2 py-0.5 rounded-full bg-[#159097]/30 text-[#f8d092] border border-[#159097]/60">
                          {ev.category}
                        </span>
                        <span className="text-[9px] font-chakra font-bold text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          CONFIRMED
                        </span>
                      </div>

                      <h3 className="font-orbitron font-bold text-sm text-white group-hover:text-[#f8d092] transition-colors mb-0.5">
                        {ev.title}
                      </h3>
                      <p className="text-xs font-chakra text-slate-400 line-clamp-2 mb-2">
                        {ev.tagline}
                      </p>

                      <div className="space-y-1 text-xs font-telemetry text-slate-300 mb-3">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#38a48c]" />
                          <span>{ev.date} • {ev.time}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Trophy className="w-3.5 h-3.5 text-amber-400" />
                          <span>Prize Pool: {ev.prizePool}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t pt-2.5 border-slate-800 text-xs">
                      <span className="font-chakra text-slate-400 text-xs">Entry: <strong className="text-[#f8d092]">₹{ev.entryFee}</strong></span>
                      <span className="font-chakra font-bold text-[#38a48c] flex items-center gap-1 text-xs">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>Enrolled</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* EDIT PROFILE MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div 
            className="max-w-xl w-full rounded-3xl border shadow-2xl overflow-hidden relative"
            style={{
              backgroundColor: '#25245d',
              borderColor: 'rgba(21, 144, 151, 0.7)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.8), 0 0 35px rgba(21, 144, 151, 0.4)',
            }}
          >
            {/* Modal Header */}
            <div className="p-5 border-b flex items-center justify-between" style={{ backgroundColor: 'rgba(26, 86, 120, 0.6)', borderColor: 'rgba(21, 144, 151, 0.4)' }}>
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-[#f8d092]" />
                <h3 className="font-orbitron font-bold text-sm text-white">
                  UPDATE CREW ID DOSSIER
                </h3>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-slate-300 hover:text-white text-xs font-chakra font-bold px-2 py-1 rounded-full border border-slate-700"
              >
                CANCEL
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveProfile} className="p-6 space-y-4">
              
              {/* Username */}
              <div>
                <label className="block text-xs font-chakra font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Operative Username (Unique Handle)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-mono text-xs">@</span>
                  <input
                    type="text"
                    value={editFormData.username}
                    onChange={(e) => setEditFormData({ ...editFormData, username: e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, '') })}
                    placeholder="cadet_callsign"
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl border bg-black/50 text-white font-chakra text-sm focus:outline-none focus:border-[#f8d092]"
                    style={{ borderColor: 'rgba(21, 144, 151, 0.5)' }}
                    required
                  />
                </div>
              </div>

              {/* First & Last Name */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-chakra font-bold uppercase tracking-wider text-slate-300 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={editFormData.firstName}
                    onChange={(e) => setEditFormData({ ...editFormData, firstName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border bg-black/50 text-white font-chakra text-sm focus:outline-none focus:border-[#f8d092]"
                    style={{ borderColor: 'rgba(21, 144, 151, 0.5)' }}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-chakra font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={editFormData.lastName}
                    onChange={(e) => setEditFormData({ ...editFormData, lastName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border bg-black/50 text-white font-chakra text-sm focus:outline-none focus:border-[#f8d092]"
                    style={{ borderColor: 'rgba(21, 144, 151, 0.5)' }}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-chakra font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={editFormData.email}
                  onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border bg-black/50 text-white font-chakra text-sm focus:outline-none focus:border-[#f8d092]"
                  style={{ borderColor: 'rgba(21, 144, 151, 0.5)' }}
                  required
                />
              </div>

              {/* Phone & Contact Number */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-chakra font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={editFormData.phone}
                    onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border bg-black/50 text-white font-chakra text-sm focus:outline-none focus:border-[#f8d092]"
                    style={{ borderColor: 'rgba(21, 144, 151, 0.5)' }}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-chakra font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Contact Number
                  </label>
                  <input
                    type="text"
                    value={editFormData.contactNumber}
                    onChange={(e) => setEditFormData({ ...editFormData, contactNumber: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border bg-black/50 text-white font-chakra text-sm focus:outline-none focus:border-[#f8d092]"
                    style={{ borderColor: 'rgba(21, 144, 151, 0.5)' }}
                    required
                  />
                </div>
              </div>

              {/* College */}
              <div>
                <label className="block text-xs font-chakra font-bold uppercase tracking-wider text-slate-300 mb-1">
                  College / Institution
                </label>
                <input
                  type="text"
                  value={editFormData.college}
                  onChange={(e) => setEditFormData({ ...editFormData, college: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border bg-black/50 text-white font-chakra text-sm focus:outline-none focus:border-[#f8d092]"
                  style={{ borderColor: 'rgba(21, 144, 151, 0.5)' }}
                  required
                />
              </div>

              {/* Year & Referral Code */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-chakra font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Academic Year
                  </label>
                  <select
                    value={editFormData.year}
                    onChange={(e) => setEditFormData({ ...editFormData, year: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border bg-[#050716] text-white font-chakra text-sm focus:outline-none focus:border-[#f8d092]"
                    style={{ borderColor: 'rgba(21, 144, 151, 0.5)' }}
                  >
                    <option value="First Year (FE)">First Year (FE)</option>
                    <option value="Second Year (SE)">Second Year (SE)</option>
                    <option value="Third Year (TE)">Third Year (TE)</option>
                    <option value="Final Year (BE/BTech)">Final Year (BE/BTech)</option>
                    <option value="Post-Graduate / MCA / PhD">Post-Graduate / MCA / PhD</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-chakra font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Custom Referral Code
                  </label>
                  <input
                    type="text"
                    value={editFormData.referralCode}
                    onChange={(e) => setEditFormData({ ...editFormData, referralCode: e.target.value.toUpperCase() })}
                    className="w-full px-4 py-2.5 rounded-xl border bg-black/50 text-[#f8d092] font-chakra font-bold text-sm focus:outline-none focus:border-[#f8d092]"
                    style={{ borderColor: 'rgba(21, 144, 151, 0.5)' }}
                  />
                </div>
              </div>

              {/* Footer Save Button */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl font-chakra font-bold text-xs border border-slate-700 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl font-orbitron font-bold text-xs tracking-wider border transition-all cursor-pointer hover:scale-105 shadow-lg bg-[#f8d092] text-[#050716] border-white"
                >
                  SAVE CHANGES
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </section>
  );
};
