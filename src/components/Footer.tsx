import React from 'react';
import { 
  Radio, 
  Sparkles, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Send, 
  Github, 
  Twitter, 
  Instagram, 
  Linkedin
} from 'lucide-react';
import { useAlienTheme } from '../context/ThemeContext';

interface FooterProps {
  onNavClick: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  const { currentTheme } = useAlienTheme();

  return (
    <footer 
      className="backdrop-blur-md border-t pt-12 pb-8 font-chakra relative overflow-hidden"
      style={{
        backgroundColor: 'rgba(5, 7, 22, 0.85)',
        borderColor: 'rgba(21, 144, 151, 0.35)',
        color: '#d8e8ea',
      }}
    >
      
      {/* Background Accent Grid */}
      <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Col 1 & 2: Branding & Lore */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-2xl border flex items-center justify-center shadow-lg"
                style={{
                  backgroundColor: 'rgba(37, 36, 93, 0.5)',
                  borderColor: 'rgba(21, 144, 151, 0.6)',
                  color: '#f8d092',
                }}
              >
                <Radio className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <span className="font-audiowide text-xl tracking-wider text-[#f8d092]" style={{ fontFamily: "'Audiowide', cursive, sans-serif" }}>
                  PULZION <span style={{ color: '#38a48c' }}>'26</span>
                </span>
                <p 
                  className="font-audiowide text-xs tracking-[0.16em]"
                  style={{ fontFamily: "'Audiowide', cursive, sans-serif", color: '#f8d092' }}
                >
                  BEYOND THE EARTH
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm font-medium leading-relaxed max-w-sm" style={{ color: '#d8e8ea' }}>
              The premier annual technical extravaganza organized by the Association for Computing Machinery (ACM) Student Chapter at Pune Institute of Computer Technology (PICT).
            </p>

            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: Instagram, href: 'https://instagram.com' },
                { icon: Linkedin, href: 'https://linkedin.com' },
                { icon: Twitter, href: 'https://twitter.com' },
                { icon: Github, href: 'https://github.com' },
              ].map((social, i) => {
                const Icon = social.icon;
                return (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full border transition-colors"
                    style={{
                      backgroundColor: 'rgba(26, 86, 120, 0.35)',
                      borderColor: 'rgba(21, 144, 151, 0.4)',
                      color: '#f8d092',
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="font-orbitron font-bold text-xs tracking-widest uppercase mb-4 text-[#f8d092]">
              PORTAL SECTORS
            </h4>
            <ul className="space-y-2 text-xs font-semibold">
              {[
                { id: 'home', label: 'Earth Base' },
                { id: 'events', label: 'Missions' },
                { id: 'register', label: 'Cadet Enlistment' },
                { id: 'profile', label: 'Crew ID' },
                { id: 'sponsors', label: 'Mission Partners' },
                { id: 'coordinators', label: 'Command Station' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      onNavClick(item.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="transition-colors uppercase tracking-wider cursor-pointer hover:text-white"
                    style={{ color: '#38a48c' }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Flagship Battles */}
          <div>
            <h4 className="font-orbitron font-bold text-xs tracking-widest uppercase mb-4 text-[#f8d092]">
              CHALLENGES
            </h4>
            <ul className="space-y-2 text-xs">
              {['Code Infiltration', 'Area 51: Cyber Siege (CTF)', 'Galactic Infiltration 36H', 'Mecha-Wars Arena', 'Cosmic Esports Showdown'].map((name, i) => (
                <li 
                  key={i} 
                  className="cursor-pointer transition-colors hover:text-white"
                  style={{ color: '#38a48c' }}
                  onClick={() => onNavClick('events')}
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Location & Basecamp */}
          <div>
            <h4 className="font-orbitron font-bold text-xs tracking-widest uppercase mb-4 text-[#f8d092]">
              BASECAMP
            </h4>
            <div className="space-y-2 text-xs leading-relaxed">
              <p className="font-semibold text-white">Pune Institute of Computer Technology (PICT)</p>
              <p style={{ color: '#38a48c' }}>Dhankawadi, Pune, Maharashtra 411043</p>
              <p className="font-telemetry pt-1 text-white">pulzion@pict.edu</p>
              <p className="font-telemetry font-bold" style={{ color: '#f8d092' }}>+91 98901 23456</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs" style={{ borderColor: 'rgba(21, 144, 151, 0.3)' }}>
          <p style={{ color: '#38a48c' }}>
            © 2026 PICT ACM Student Chapter (PASC). All rights reserved.
          </p>
          <div className="flex items-center gap-6" style={{ color: '#f8d092' }}>
            <span className="font-telemetry">PROTOCOL: BEYOND THE EARTH</span>
            <span>SECURE INGRESS TERMINAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
