import React from 'react';
import { 
  Award, 
  ExternalLink, 
  Zap, 
  ShieldAlert, 
  Cpu, 
  Gamepad2, 
  Brain, 
  Flame, 
  Sparkles,
  ArrowLeft,
  Calendar
} from 'lucide-react';
import { SPONSORS_DATA } from '../data/sponsorsData';
import { SponsorItem } from '../types';
import { useAlienTheme } from '../context/ThemeContext';

interface SponsorsSectionProps {
  onBack?: () => void;
  onExploreMissions?: () => void;
}

export const SponsorsSection: React.FC<SponsorsSectionProps> = ({
  onBack,
  onExploreMissions,
}) => {
  const { currentTheme } = useAlienTheme();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap': return Zap;
      case 'ShieldAlert': return ShieldAlert;
      case 'Cpu': return Cpu;
      case 'Gamepad2': return Gamepad2;
      case 'Brain': return Brain;
      case 'Flame': return Flame;
      default: return Sparkles;
    }
  };

  return (
    <section className="py-12 sm:py-16 border-b border-slate-800/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Bar if accessed via Profile or Deep Link */}
        {(onBack || onExploreMissions) && (
          <div className="flex items-center justify-between gap-4 mb-8">
            {onBack && (
              <button
                onClick={onBack}
                className="flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-chakra font-bold tracking-wider transition-all cursor-pointer hover:scale-105"
                style={{
                  backgroundColor: 'rgba(26, 86, 120, 0.4)',
                  borderColor: '#159097',
                  color: '#f8d092',
                }}
              >
                <ArrowLeft className="w-4 h-4 text-[#38a48c]" />
                <span>BACK TO EARTH BASE</span>
              </button>
            )}

            {onExploreMissions && (
              <button
                onClick={onExploreMissions}
                className="flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-chakra font-bold tracking-wider transition-all cursor-pointer hover:scale-105 ml-auto"
                style={{
                  backgroundColor: 'rgba(37, 36, 93, 0.6)',
                  borderColor: 'rgba(248, 208, 146, 0.5)',
                  color: '#f8d092',
                }}
              >
                <Calendar className="w-4 h-4 text-[#38a48c]" />
                <span>EXPLORE MISSIONS</span>
              </button>
            )}
          </div>
        )}

        {/* Section Header (Curvilinear design) */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div 
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-chakra font-bold mb-3"
            style={{
              backgroundColor: 'rgba(21, 144, 151, 0.2)',
              borderColor: '#159097',
              color: '#f8d092',
            }}
          >
            <Award className="w-3.5 h-3.5" style={{ color: '#38a48c' }} />
            <span>INTERPLANETARY ALLIANCES</span>
          </div>
          <h2 className="font-orbitron font-extrabold text-3xl sm:text-4xl text-white uppercase tracking-tight">
            OUR <span style={{ color: '#f8d092' }}>MISSION PARTNERS</span>
          </h2>
          <p className="text-sm sm:text-base font-chakra font-medium mt-2" style={{ color: '#d8e8ea' }}>
            Pioneering tech conglomerates, cloud titans, and gaming innovators powering the Pulzion '26 invasion.
          </p>
        </div>

        {/* Sponsor Cards Grid (Smooth Rounded-3xl Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SPONSORS_DATA.map((sp) => {
            const Icon = getIcon(sp.logoIcon);
            return (
              <div
                key={sp.id}
                className="group relative rounded-3xl border p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 backdrop-blur-xl flex flex-col justify-between"
                style={{
                  backgroundColor: 'rgba(37, 36, 93, 0.75)',
                  borderColor: 'rgba(21, 144, 151, 0.4)',
                }}
              >
                <div>
                  {/* Tier Badge (Smooth Pill) */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span 
                      className="text-[11px] font-chakra font-bold tracking-wider px-3 py-1 rounded-full border"
                      style={{
                        backgroundColor: 'rgba(26, 86, 120, 0.5)',
                        borderColor: '#159097',
                        color: '#f8d092',
                      }}
                    >
                      {sp.tier}
                    </span>
                    <a
                      href={sp.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/5"
                      title="Visit Partner Mainframe"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Brand Logo & Name */}
                  <div className="flex items-center gap-3.5 mb-3">
                    <div 
                      className="w-12 h-12 rounded-2xl border flex items-center justify-center shadow-lg"
                      style={{
                        backgroundColor: 'rgba(26, 86, 120, 0.5)',
                        borderColor: '#159097',
                        color: '#38a48c',
                      }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-orbitron font-bold text-lg text-white group-hover:text-slate-100 transition-colors">
                        {sp.name}
                      </h3>
                      <p className="text-xs font-chakra font-bold" style={{ color: '#f8d092' }}>
                        {sp.logoText}
                      </p>
                    </div>
                  </div>

                  {/* Tagline */}
                  <p className="text-xs font-semibold font-chakra tracking-wide mb-2" style={{ color: '#d8e8ea' }}>
                    {sp.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-xs font-chakra leading-relaxed" style={{ color: '#9bbec2' }}>
                    {sp.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t flex items-center justify-between text-[11px] font-telemetry" style={{ borderColor: 'rgba(21, 144, 151, 0.3)', color: '#9bbec2' }}>
                  <span>OFFICIAL ALLY</span>
                  <span style={{ color: '#38a48c' }}>PULZION '26 VERIFIED</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sponsor Callout Banner (Smooth rounded-3xl container) */}
        <div 
          className="mt-10 p-6 sm:p-8 rounded-3xl border flex flex-col sm:flex-row items-center justify-between gap-5 backdrop-blur-xl shadow-xl"
          style={{
            backgroundColor: 'rgba(37, 36, 93, 0.85)',
            borderColor: 'rgba(21, 144, 151, 0.5)',
          }}
        >
          <div>
            <h4 className="font-orbitron font-bold text-lg text-white">
              Want to Partner with Pulzion '26?
            </h4>
            <p className="text-xs sm:text-sm font-chakra mt-1" style={{ color: '#d8e8ea' }}>
              Connect with 5,000+ top engineering minds, host custom hackathon tracks, and boost your brand visibility.
            </p>
          </div>

          <a
            href="mailto:sponsorship@pulzion.org?subject=Partnership%20Proposal%20for%20Pulzion%2026"
            className="px-7 py-3.5 rounded-full font-orbitron font-bold text-xs tracking-wider transition-all shadow-xl hover:scale-105 shrink-0"
            style={{
              backgroundColor: '#f8d092',
              color: '#25245d',
              boxShadow: '0 0 20px rgba(248, 208, 146, 0.4)',
            }}
          >
            BECOME A SPONSOR
          </a>
        </div>

      </div>
    </section>
  );
};
