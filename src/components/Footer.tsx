import React from 'react';
import { 
  Radio, 
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

  // Dynamic theme colors fallback to defaults if theme properties are absent
  const primaryHex = currentTheme?.palette?.primaryHex || '#159097';
  const secondaryHex = currentTheme?.palette?.secondaryHex || '#38a48c';
  const accentHex = currentTheme?.palette?.accentHex || '#f8d092';
  const textHex = (currentTheme?.palette as unknown as { textHex?: string })?.textHex || '#d8e8ea';

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com', label: 'PICT ACM Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'PICT ACM LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com', label: 'PICT ACM Twitter' },
    { icon: Github, href: 'https://github.com', label: 'PICT ACM GitHub' },
  ];

  const portalSectors = [
    { id: 'home', label: 'Earth Base' },
    { id: 'events', label: 'Missions' },
    { id: 'register', label: 'Cadet Enlistment' },
    { id: 'profile', label: 'Crew ID' },
    { id: 'sponsors', label: 'Mission Partners' },
    { id: 'coordinators', label: 'Command Station' },
  ];

  const challenges = [
    'Code Infiltration',
    'Area 51: Cyber Siege (CTF)',
    'Galactic Infiltration 36H',
    'Mecha-Wars Arena',
    'Cosmic Esports Showdown',
  ];

  const handleSectorClick = (id: string) => {
    onNavClick(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      className="backdrop-blur-md border-t pt-12 pb-8 font-chakra relative overflow-hidden"
      style={{
        backgroundColor: 'rgba(5, 7, 22, 0.85)',
        borderColor: `${primaryHex}59`,
        color: textHex,
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
                  borderColor: `${primaryHex}99`,
                  color: accentHex,
                }}
              >
                <Radio className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <span 
                  className="font-audiowide text-xl tracking-wider" 
                  style={{ fontFamily: "'Audiowide', cursive, sans-serif", color: accentHex }}
                >
                  PULZION <span style={{ color: secondaryHex }}>'26</span>
                </span>
                <p 
                  className="font-audiowide text-xs tracking-[0.16em]"
                  style={{ fontFamily: "'Audiowide', cursive, sans-serif", color: accentHex }}
                >
                  BEYOND THE EARTH
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm font-medium leading-relaxed max-w-sm" style={{ color: textHex }}>
              The premier annual technical extravaganza organized by the Association for Computing Machinery (ACM) Student Chapter at Pune Institute of Computer Technology (PICT).
            </p>

            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social, i) => {
                const Icon = social.icon;
                return (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="p-2.5 rounded-full border transition-colors hover:scale-105"
                    style={{
                      backgroundColor: 'rgba(26, 86, 120, 0.35)',
                      borderColor: `${primaryHex}66`,
                      color: accentHex,
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
            <h4 className="font-orbitron font-bold text-xs tracking-widest uppercase mb-4" style={{ color: accentHex }}>
              PORTAL SECTORS
            </h4>
            <ul className="space-y-2 text-xs font-semibold">
              {portalSectors.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => handleSectorClick(item.id)}
                    className="transition-colors uppercase tracking-wider cursor-pointer hover:text-white"
                    style={{ color: secondaryHex }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Flagship Battles */}
          <div>
            <h4 className="font-orbitron font-bold text-xs tracking-widest uppercase mb-4" style={{ color: accentHex }}>
              CHALLENGES
            </h4>
            <ul className="space-y-2 text-xs font-semibold">
              {challenges.map((name, i) => (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => handleSectorClick('events')}
                    className="transition-colors text-left uppercase tracking-wider cursor-pointer hover:text-white"
                    style={{ color: secondaryHex }}
                  >
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Location & Basecamp */}
          <div>
            <h4 className="font-orbitron font-bold text-xs tracking-widest uppercase mb-4" style={{ color: accentHex }}>
              BASECAMP
            </h4>
            <div className="space-y-2 text-xs leading-relaxed">
              <p className="font-semibold text-white">Pune Institute of Computer Technology (PICT)</p>
              <p style={{ color: secondaryHex }}>Dhankawadi, Pune, Maharashtra 411043</p>
              <p className="font-telemetry pt-1 text-white">pulzion@pict.edu</p>
              <p className="font-telemetry font-bold" style={{ color: accentHex }}>+91 98901 23456</p>
            </div>
          </div>
        </div>

        <div 
          className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs" 
          style={{ borderColor: `${primaryHex}4D` }}
        >
          <p style={{ color: secondaryHex }}>
            © 2026 PICT ACM Student Chapter (PASC). All rights reserved.
          </p>
          <div className="flex items-center gap-6" style={{ color: accentHex }}>
            <span className="font-telemetry">PROTOCOL: BEYOND THE EARTH</span>
            <span>SECURE INGRESS TERMINAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
