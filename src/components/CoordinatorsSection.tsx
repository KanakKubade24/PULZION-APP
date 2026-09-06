import React from 'react';
import { 
  PhoneCall, 
  MessageSquare, 
  ExternalLink,
  Instagram,
  Linkedin,
  Github,
  Globe,
  Mail,
  Send
} from 'lucide-react';
import { CONTACTS_DATA } from '../data/coordinatorsData';
import { useAlienTheme } from '../context/ThemeContext';

export const CoordinatorsSection: React.FC = () => {
  const { currentTheme } = useAlienTheme();

  return (
    <section className="py-10 sm:py-16 relative overflow-hidden">
      
      {/* Sci-Fi Grid Backdrop with ambient glow dots */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(to right, #00f0ff15 1px, transparent 1px), linear-gradient(to bottom, #00f0ff15 1px, transparent 1px)`,
            backgroundSize: '36px 36px',
          }}
        />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col gap-8">
        
        {/* 1. ABOUT PULZION HUD CARD */}
        <div 
          className="rounded-[32px] sm:rounded-[36px] p-6 sm:p-8 md:p-10 backdrop-blur-2xl border-2 relative transition-all shadow-2xl overflow-hidden"
          style={{
            backgroundColor: 'rgba(37, 36, 93, 0.75)',
            borderColor: 'rgba(21, 144, 151, 0.65)',
            boxShadow: '0 0 45px rgba(21, 144, 151, 0.25), inset 0 0 30px rgba(21, 144, 151, 0.08)',
          }}
        >
          {/* Subtle decorative glowing corner nodes */}
          <div className="absolute top-4 left-4 w-2 h-2 rounded-full blur-[1px] animate-pulse" style={{ backgroundColor: '#159097' }} />
          <div className="absolute top-4 right-4 w-2 h-2 rounded-full blur-[1px] animate-pulse" style={{ backgroundColor: '#571c56' }} />
          
          <h2 
            className="font-orbitron font-black text-xl sm:text-2xl md:text-3xl tracking-[0.25em] uppercase text-center mb-6"
            style={{
              color: '#f8d092',
              textShadow: '0 0 20px rgba(21, 144, 151, 0.8), 0 0 35px rgba(56, 164, 140, 0.4)',
            }}
          >
            ABOUT PULZION
          </h2>

          <p className="font-chakra font-medium text-sm sm:text-base md:text-lg leading-relaxed text-center sm:text-justify tracking-wide" style={{ color: '#d8e8ea' }}>
            Pulzion is the annual technical fest organized by PICT ACM Student Chapter. Pulzion has hosted multiple events including coding competition ranging from amateur competitions two day-long as well as mock placements, business management based and quizzing events. It has become one of the most anticipated events taking place at PICT with participants from colleges all over Pune. With high aspirations, backed with sincerity and dedication, the PASC team aims to add value to the college and all the people in it.
          </p>
        </div>

        {/* 2. CONTACT US HUD CARD */}
        <div 
          className="rounded-[32px] sm:rounded-[36px] p-6 sm:p-8 md:p-10 backdrop-blur-2xl border-2 relative transition-all shadow-2xl overflow-hidden"
          style={{
            backgroundColor: 'rgba(37, 36, 93, 0.75)',
            borderColor: 'rgba(21, 144, 151, 0.65)',
            boxShadow: '0 0 45px rgba(21, 144, 151, 0.25), inset 0 0 30px rgba(21, 144, 151, 0.08)',
          }}
        >
          <h2 
            className="font-orbitron font-black text-xl sm:text-2xl md:text-3xl tracking-[0.25em] uppercase text-center mb-7"
            style={{
              color: '#38a48c',
              textShadow: '0 0 20px rgba(56, 164, 140, 0.8), 0 0 35px rgba(21, 144, 151, 0.4)',
            }}
          >
            CONTACT US
          </h2>

          <div className="flex flex-col gap-4 sm:gap-5">
            {CONTACTS_DATA.map((contact, index) => (
              <div 
                key={index}
                className="group relative rounded-2xl sm:rounded-3xl p-4 sm:p-5 border-2 transition-all duration-300 hover:scale-[1.01] shadow-lg flex items-center justify-between"
                style={{
                  backgroundColor: 'rgba(26, 86, 120, 0.45)',
                  borderColor: '#159097',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.6), inset 0 0 15px rgba(21, 144, 151, 0.15)',
                }}
              >
                <div className="flex items-center gap-4 sm:gap-5">
                  {/* WhatsApp Rounded Icon Button */}
                  <a
                    href={contact.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-[0_0_15px_rgba(56,164,140,0.4)] shrink-0 cursor-pointer"
                    style={{
                      backgroundColor: 'rgba(37, 36, 93, 0.8)',
                      borderColor: '#38a48c',
                      color: '#38a48c',
                    }}
                    title={`Message ${contact.name} on WhatsApp`}
                  >
                    <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7" />
                  </a>

                  {/* Name and Phone */}
                  <div>
                    <h3 className="font-chakra font-bold text-base sm:text-xl tracking-wide" style={{ color: '#f8d092' }}>
                      {contact.name}
                    </h3>
                    <a 
                      href={`tel:${contact.phone}`}
                      className="font-chakra font-medium text-xs sm:text-base hover:text-white transition-colors block mt-0.5 tracking-wider"
                      style={{ color: '#38a48c' }}
                    >
                      {contact.phone}
                    </a>
                  </div>
                </div>

                {/* Quick Call Button */}
                <a
                  href={`tel:${contact.phone}`}
                  className="px-4 py-2 rounded-full border text-xs font-chakra font-bold transition-all flex items-center gap-2 hover:scale-105 shadow"
                  style={{
                    backgroundColor: 'rgba(37, 36, 93, 0.8)',
                    borderColor: '#159097',
                    color: '#f8d092',
                  }}
                >
                  <PhoneCall className="w-3.5 h-3.5" style={{ color: '#38a48c' }} />
                  <span className="hidden sm:inline">Call</span>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* 3. SOCIALS HUD CARD */}
        <div 
          className="rounded-[32px] sm:rounded-[36px] p-6 sm:p-8 md:p-10 backdrop-blur-2xl border-2 relative transition-all shadow-2xl overflow-hidden"
          style={{
            backgroundColor: 'rgba(37, 36, 93, 0.75)',
            borderColor: 'rgba(21, 144, 151, 0.65)',
            boxShadow: '0 0 45px rgba(21, 144, 151, 0.25), inset 0 0 30px rgba(21, 144, 151, 0.08)',
          }}
        >
          <h2 
            className="font-orbitron font-black text-xl sm:text-2xl md:text-3xl tracking-[0.25em] uppercase text-center mb-6"
            style={{
              color: '#f8d092',
              textShadow: '0 0 20px rgba(248, 208, 146, 0.8), 0 0 35px rgba(87, 28, 86, 0.4)',
            }}
          >
            SOCIALS
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {[
              { name: 'Instagram', handle: '@pict_acm', url: 'https://instagram.com/pict_acm', icon: Instagram },
              { name: 'LinkedIn', handle: 'PASC PICT', url: 'https://linkedin.com/company/pict-acm-student-chapter', icon: Linkedin },
              { name: 'GitHub', handle: 'PASC-PICT', url: 'https://github.com', icon: Github },
              { name: 'Website', handle: 'pict.acm.org', url: 'https://pict.acm.org', icon: Globe },
            ].map((social, idx) => {
              const Icon = social.icon;
              return (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl border flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-105 group shadow-md"
                  style={{
                    backgroundColor: 'rgba(26, 86, 120, 0.35)',
                    borderColor: 'rgba(21, 144, 151, 0.4)',
                  }}
                >
                  <Icon className="w-6 h-6 mb-2 transition-colors" style={{ color: '#38a48c' }} />
                  <span className="font-chakra font-bold text-xs block" style={{ color: '#f8d092' }}>
                    {social.name}
                  </span>
                  <span className="font-telemetry text-[10px] block mt-0.5" style={{ color: '#38a48c' }}>
                    {social.handle}
                  </span>
                </a>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
