import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Info, 
  Building2, 
  FileText, 
  PhoneCall, 
  MapPin,
  Mail,
  Award
} from 'lucide-react';
import { APP_CONFIG } from '../theme/designSystem';

interface InfoPagesModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'about' | 'rules' | 'privacy' | 'contact';
}

export const InfoPagesModal: React.FC<InfoPagesModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'about',
}) => {
  const [activeTab, setActiveTab] = useState<'about' | 'rules' | 'privacy' | 'contact'>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="w-full max-w-3xl rounded-3xl border shadow-2xl overflow-hidden relative flex flex-col max-h-[92vh]"
        style={{
          backgroundColor: 'rgba(5, 7, 22, 0.97)',
          borderColor: 'rgba(21, 144, 151, 0.6)',
          boxShadow: '0 25px 60px rgba(0,0,0,0.8), 0 0 40px rgba(21, 144, 151, 0.25)',
        }}
      >
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-[#0b1026]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#159097]/20 border border-[#159097]/40 text-[#f8d092]">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-orbitron font-bold text-sm sm:text-base text-white">
                FESTIVAL INFORMATION & GUIDELINES
              </h2>
              <span className="text-[10px] font-telemetry text-slate-400">
                Official Guidelines, Rules & Regulatory Protocols
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-4 py-2 bg-black/50 border-b border-slate-800 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {[
            { id: 'about', label: 'About Symposium', icon: Info },
            { id: 'rules', label: 'Rules & Code of Conduct', icon: ShieldCheck },
            { id: 'contact', label: 'Help Desk & Venue', icon: PhoneCall },
            { id: 'privacy', label: 'Privacy & Terms', icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-chakra font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#f8d092] text-[#050716]'
                    : 'text-slate-400 hover:text-white bg-slate-900/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-300 font-chakra">
          
          {/* TAB 1: ABOUT */}
          {activeTab === 'about' && (
            <div className="space-y-4 leading-relaxed text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-black/40 border border-slate-800 space-y-2">
                <span className="font-chakra text-[10px] font-bold text-[#f8d092] uppercase tracking-widest block">
                  SYMPOSIUM OVERVIEW
                </span>
                <h3 className="font-orbitron font-extrabold text-base sm:text-lg text-white">
                  {APP_CONFIG.appName} '26
                </h3>
                <p className="text-slate-300 text-xs">
                  {APP_CONFIG.appName} is the annual flagship apex technological symposium organized by the student engineering community at Pune Institute of Computer Technology (PICT).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="font-orbitron font-black text-lg text-[#f8d092]">₹5,00,000+</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Total Prize Pool</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="font-orbitron font-black text-lg text-emerald-400">12+</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Flagship Challenges</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="font-orbitron font-black text-lg text-cyan-400">10,000+</span>
                  <span className="text-[10px] text-slate-400 block mt-0.5">Operative Cadets</span>
                </div>
              </div>

              <p className="text-slate-300 text-xs leading-relaxed">
                Featuring high-stakes competitive coding battles, cybersecurity jeopardy & defense CTFs, 36-hour non-stop prototyping hackathons, industrial mecha-robotics arenas, and tactical esports championships.
              </p>
            </div>
          )}

          {/* TAB 2: RULES */}
          {activeTab === 'rules' && (
            <div className="space-y-3 text-xs sm:text-sm">
              <h3 className="font-orbitron font-bold text-sm text-white">
                EVENT CODE OF CONDUCT & GENERAL PROTOCOLS
              </h3>

              <ul className="space-y-2.5">
                {[
                  'All participants must carry a valid College Photo Identity Card at all times.',
                  'Plagiarism, unauthorized code generation, or pre-built projects in hackathons will result in immediate disqualification without refund.',
                  'Any attempt to attack or tamper with the college server infrastructure or contest scoring boards will lead to blacklisting.',
                  'Teams must report to their respective allocated venues 15 minutes before the round start time indicated on the timetable.',
                  'Decisions made by the event jury, faculty coordinators, and technical leads are final and binding.',
                ].map((rule, idx) => (
                  <li key={idx} className="p-3 rounded-xl bg-black/40 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-300">
                    <span className="w-5 h-5 rounded-full bg-[#159097]/40 text-[#f8d092] flex items-center justify-center font-bold text-[10px] shrink-0">
                      {idx + 1}
                    </span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* TAB 3: CONTACT & HELP DESK */}
          {activeTab === 'contact' && (
            <div className="space-y-4 text-xs sm:text-sm">
              <div className="p-4 rounded-2xl bg-black/40 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#f8d092]" />
                  <div>
                    <h4 className="font-orbitron font-bold text-sm text-white">
                      PICT Pune Campus Location
                    </h4>
                    <span className="text-slate-400 text-xs">
                      Survey No. 27, Near Trimurti Chowk, Dhankawadi, Pune, Maharashtra 411043
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">
                      Emergency Support Desk
                    </span>
                    <span className="font-orbitron font-bold text-xs text-[#f8d092] block mt-0.5">
                      +91 98230 45612 / +91 97654 32189
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">
                      Official Inquiries Email
                    </span>
                    <span className="font-orbitron font-bold text-xs text-[#38a48c] block mt-0.5">
                      pulzion@pict.edu
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PRIVACY & TERMS */}
          {activeTab === 'privacy' && (
            <div className="space-y-3 text-xs leading-relaxed text-slate-300">
              <h3 className="font-orbitron font-bold text-sm text-white">
                DATA PRIVACY & REGISTRATION TERMS
              </h3>
              <p>
                1. <strong>Information Collection</strong>: We collect your name, institutional affiliation, contact phone, and email solely for event coordination and team verification.
              </p>
              <p>
                2. <strong>Certificate & Prize Disbursement</strong>: Account credentials will be used to issue verifiable certificates and facilitate prize distribution.
              </p>
              <p>
                3. <strong>Refund Policy</strong>: Registration fees for confirmed competition slots are non-refundable unless an event is cancelled by the organizing committee.
              </p>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#0b1026] border-t border-slate-800 flex items-center justify-between">
          <span className="text-[10px] font-telemetry text-slate-400">
            {APP_CONFIG.organization} // REGULATORY PORTAL
          </span>
          <button
            onClick={onClose}
            className="px-5 py-1.5 rounded-xl font-orbitron font-bold text-xs bg-[#f8d092] text-[#050716] hover:bg-white transition-all cursor-pointer"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
