import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  ChevronRight, 
  Trophy, 
  Users, 
  Flame,
  Zap,
  Terminal,
  Clock
} from 'lucide-react';
import { useAlienTheme } from '../context/ThemeContext';

interface HeroBannerProps {
  onRegisterClick: () => void;
  onExploreEventsClick: () => void;
  mothershipImgSrc?: string;
}

// Target Fest Date: October 15, 2026
const TARGET_DATE_MS = new Date('2026-10-15T09:00:00').getTime();

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onRegisterClick,
  onExploreEventsClick,
  mothershipImgSrc = "/src/assets/images/alien_mothership_title_1788290808780.jpg"
}) => {
  const { currentTheme } = useAlienTheme();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = Date.now();
      const difference = TARGET_DATE_MS - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 bg-transparent">
      
      {/* Soft Cosmic Gradient Backing */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
        <div 
          className="absolute right-0 top-0 w-full lg:w-3/4 h-full opacity-35 mix-blend-screen transition-all duration-700"
          style={{
            background: `radial-gradient(circle at 75% 35%, #15909725 0%, #38a48c15 35%, transparent 70%)`
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Main Hero Header Block */}
        <div className="max-w-4xl mb-12">
          
          {/* Clean College & Fest Presenter Tag */}
          <div className="flex items-center gap-3 mb-5">
            <div 
              className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full border text-xs font-chakra tracking-wide backdrop-blur-md"
              style={{
                backgroundColor: 'rgba(37, 36, 93, 0.85)',
                borderColor: 'rgba(21, 144, 151, 0.5)',
                color: '#f8d092',
              }}
            >
              <span 
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: '#38a48c' }}
              />
              <span className="font-semibold text-white">PICT ACM STUDENT CHAPTER (PASC)</span>
              <span style={{ color: '#159097' }}>•</span>
              <span style={{ color: '#f8d092' }}>PUNE</span>
            </div>
          </div>

          {/* PULZION '26 Display Headline with Cosmic Galaxy & Mothership Background */}
          <div 
            className="relative rounded-3xl p-6 sm:p-8 md:p-10 mb-6 overflow-hidden border backdrop-blur-2xl shadow-2xl transition-all duration-700 group"
            style={{
              background: 'linear-gradient(135deg, #050a1d 0%, #07112b 35%, #091738 70%, #050d22 100%)',
              borderColor: 'rgba(26, 86, 120, 0.7)',
              boxShadow: `0 25px 60px rgba(3, 7, 22, 0.95), 0 0 45px rgba(21, 144, 151, 0.35), inset 0 0 35px rgba(10, 26, 68, 0.6)`,
            }}
          >
            {/* Background Galaxy & Mothership Layer */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
              
              {/* Galaxy Nebula Swirl 1 */}
              <div 
                className="absolute inset-0 opacity-80 mix-blend-screen"
                style={{
                  background: 'radial-gradient(ellipse at 80% 45%, rgba(20, 60, 130, 0.65) 0%, rgba(37, 36, 93, 0.45) 45%, rgba(6, 12, 35, 0) 75%)'
                }}
              />

              {/* Galaxy Nebula Swirl 2 */}
              <div 
                className="absolute inset-0 opacity-70 mix-blend-screen"
                style={{
                  background: 'radial-gradient(circle at 65% 65%, rgba(21, 144, 151, 0.5) 0%, rgba(56, 164, 140, 0.25) 35%, transparent 70%), radial-gradient(circle at 25% 30%, rgba(30, 64, 135, 0.4) 0%, rgba(87, 28, 86, 0.25) 45%, transparent 75%)'
                }}
              />

              {/* Cosmic Diagonal Galactic Dust Trail */}
              <div 
                className="absolute inset-0 opacity-40 mix-blend-overlay"
                style={{
                  background: 'linear-gradient(60deg, transparent 15%, rgba(21, 144, 151, 0.25) 45%, rgba(248, 208, 146, 0.15) 55%, transparent 85%)'
                }}
              />

              {/* Galaxy Starfield */}
              <div className="absolute inset-0 z-0">
                <div className="absolute top-[12%] left-[8%] w-1 h-1 bg-cyan-200 rounded-full animate-pulse shadow-[0_0_6px_#38bdf8]" style={{ animationDuration: '2.5s' }} />
                <div className="absolute top-[28%] left-[22%] w-1.5 h-1.5 bg-amber-100 rounded-full animate-pulse shadow-[0_0_8px_#fde68a]" style={{ animationDuration: '3.2s' }} />
                <div className="absolute top-[75%] left-[14%] w-1 h-1 bg-emerald-200 rounded-full animate-pulse shadow-[0_0_6px_#34d399]" style={{ animationDuration: '2.8s' }} />
                <div className="absolute top-[18%] left-[45%] w-0.5 h-0.5 bg-white rounded-full opacity-80" />
                <div className="absolute top-[82%] left-[38%] w-1 h-1 bg-cyan-300 rounded-full animate-pulse shadow-[0_0_6px_#38bdf8]" style={{ animationDuration: '4s' }} />
                <div className="absolute top-[15%] left-[62%] w-1.5 h-1.5 bg-white rounded-full animate-pulse shadow-[0_0_8px_#ffffff]" style={{ animationDuration: '2.2s' }} />
                <div className="absolute top-[35%] left-[55%] w-0.5 h-0.5 bg-cyan-100 rounded-full opacity-90" />
                <div className="absolute top-[88%] left-[58%] w-1 h-1 bg-amber-200 rounded-full opacity-75" />
                <div className="absolute top-[22%] right-[28%] w-1.5 h-1.5 bg-cyan-200 rounded-full animate-pulse shadow-[0_0_8px_#7dd3fc]" style={{ animationDuration: '3.5s' }} />
                <div className="absolute top-[68%] right-[32%] w-1 h-1 bg-teal-200 rounded-full opacity-80" />
                <div className="absolute top-[12%] right-[15%] w-1 h-1 bg-white rounded-full animate-pulse shadow-[0_0_6px_#ffffff]" style={{ animationDuration: '1.9s' }} />
                <div className="absolute top-[48%] right-[10%] w-1.5 h-1.5 bg-amber-200 rounded-full animate-pulse shadow-[0_0_8px_#fde68a]" style={{ animationDuration: '2.7s' }} />
                <div className="absolute top-[85%] right-[18%] w-1 h-1 bg-cyan-300 rounded-full opacity-90" />
                <div className="absolute top-[5%] right-[40%] w-0.5 h-0.5 bg-white rounded-full opacity-70" />
                <div className="absolute top-[92%] right-[5%] w-0.5 h-0.5 bg-cyan-200 rounded-full opacity-60" />
                <div className="absolute top-[45%] left-[5%] w-1 h-1 bg-white rounded-full opacity-75 animate-pulse" style={{ animationDuration: '3s' }} />
                
                {/* 4-Point Cosmic Sparkle Crosses */}
                <div className="absolute top-[20%] left-[32%] opacity-85 scale-75 animate-pulse" style={{ animationDuration: '3.8s' }}>
                  <div className="relative w-4 h-4 flex items-center justify-center">
                    <div className="absolute w-4 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-200 to-transparent shadow-[0_0_8px_#38bdf8]" />
                    <div className="absolute h-4 w-[1.5px] bg-gradient-to-b from-transparent via-cyan-200 to-transparent shadow-[0_0_8px_#38bdf8]" />
                    <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_6px_#ffffff]" />
                  </div>
                </div>

                <div className="absolute top-[70%] right-[22%] opacity-90 scale-90 animate-pulse" style={{ animationDuration: '2.4s' }}>
                  <div className="relative w-5 h-5 flex items-center justify-center">
                    <div className="absolute w-5 h-[1.5px] bg-gradient-to-r from-transparent via-[#f8d092] to-transparent shadow-[0_0_10px_#f8d092]" />
                    <div className="absolute h-5 w-[1.5px] bg-gradient-to-b from-transparent via-[#f8d092] to-transparent shadow-[0_0_10px_#f8d092]" />
                    <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_#ffffff]" />
                  </div>
                </div>

                <div className="absolute top-[10%] right-[8%] opacity-75 scale-75 animate-pulse" style={{ animationDuration: '4.2s' }}>
                  <div className="relative w-4 h-4 flex items-center justify-center">
                    <div className="absolute w-4 h-[1.5px] bg-gradient-to-r from-transparent via-teal-200 to-transparent shadow-[0_0_8px_#2dd4bf]" />
                    <div className="absolute h-4 w-[1.5px] bg-gradient-to-b from-transparent via-teal-200 to-transparent shadow-[0_0_8px_#2dd4bf]" />
                    <div className="w-1 h-1 bg-white rounded-full" />
                  </div>
                </div>
              </div>

              {/* Alien Mothership Visual */}
              <div className="absolute right-0 top-0 bottom-0 flex items-center justify-end">
                <div className="relative w-[360px] sm:w-[500px] md:w-[620px] lg:w-[720px] max-w-none opacity-95 transition-opacity duration-500 -right-6 sm:right-2 md:right-6">
                  <img
                    src={mothershipImgSrc}
                    alt="Extraterrestrial Mothership"
                    aria-hidden="true"
                    className="w-full h-auto object-contain rounded-2xl drop-shadow-[0_15px_50px_rgba(21,144,151,0.9)] brightness-105 contrast-110"
                    style={{
                      maskImage: 'radial-gradient(ellipse at 52% 50%, rgba(0,0,0,1) 55%, rgba(0,0,0,0.7) 80%, rgba(0,0,0,0) 96%)',
                      WebkitMaskImage: 'radial-gradient(ellipse at 52% 50%, rgba(0,0,0,1) 55%, rgba(0,0,0,0.7) 80%, rgba(0,0,0,0) 96%)',
                    }}
                  />
                  
                  {/* Thruster Beam */}
                  <div 
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-44 sm:w-72 h-16 pointer-events-none opacity-90"
                    style={{
                      background: 'linear-gradient(to bottom, rgba(56, 164, 140, 0.95), rgba(21, 144, 151, 0.4) 60%, transparent)',
                      clipPath: 'polygon(38% 0%, 62% 0%, 100% 100%, 0% 100%)',
                      filter: 'blur(2px)',
                    }}
                  />
                </div>
              </div>

              {/* Text Readability Gradient Overlay */}
              <div 
                className="absolute inset-0 z-1"
                style={{
                  background: 'linear-gradient(90deg, rgba(5,10,29,0.94) 0%, rgba(7,17,43,0.85) 35%, rgba(9,23,56,0.5) 65%, rgba(7,17,43,0.15) 100%)'
                }}
              />
            </div>

            {/* Foreground Title Content */}
            <div className="relative z-10 pl-2 sm:pl-4 border-l-2 py-1 max-w-xl sm:max-w-2xl" style={{ borderColor: 'rgba(21, 144, 151, 0.8)' }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-chakra font-bold tracking-widest uppercase bg-[#159097]/30 text-[#38a48c] border border-[#159097]/50 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  INVASION CODEX ACTIVE
                </span>
              </div>

              <h1 
                className="font-audiowide text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-wide uppercase leading-tight select-none font-normal" 
                style={{ fontFamily: "'Audiowide', cursive, sans-serif" }}
              >
                <span 
                  style={{ 
                    fontFamily: "'Audiowide', cursive, sans-serif",
                    color: '#f8d092',
                    textShadow: '0 0 35px rgba(248, 208, 146, 0.4), 0 4px 18px rgba(0,0,0,0.95)'
                  }}
                >
                  PULZION
                </span>{' '}
                <span 
                  style={{ 
                    fontFamily: "'Audiowide', cursive, sans-serif",
                    color: '#38a48c',
                    textShadow: '0 0 35px rgba(56, 164, 140, 0.4), 0 4px 18px rgba(0,0,0,0.95)'
                  }}
                >
                  '26
                </span>
              </h1>

              <p 
                className="font-audiowide text-xl sm:text-3xl md:text-4xl lg:text-5xl tracking-[0.12em] sm:tracking-[0.16em] mt-2 sm:mt-3 uppercase transition-colors duration-500 font-normal"
                style={{
                  fontFamily: "'Audiowide', cursive, sans-serif",
                  color: '#f8d092',
                  textShadow: `0 0 30px rgba(21, 144, 151, 0.9), 0 0 15px rgba(248, 208, 146, 0.6), 0 3px 10px rgba(0,0,0,0.95)`,
                }}
              >
                BEYOND THE EARTH
              </p>
            </div>

          </div>

          {/* Tagline Block */}
          <p 
            className="max-w-2xl text-sm sm:text-base lg:text-lg font-chakra font-medium leading-relaxed mb-8 backdrop-blur-sm p-4 rounded-2xl border shadow-lg"
            style={{
              backgroundColor: 'rgba(37, 36, 93, 0.4)',
              borderColor: 'rgba(21, 144, 151, 0.45)',
              color: '#d8e8ea',
            }}
          >
            Extraterrestrial dreadnoughts have entered Earth's exosphere. Humanity's defense relies on 
            elite cyber operatives, algorithm engineers, and visionary developers. Join Western India's premier galactic technology symposium featuring 
            <span className="font-bold text-[#f8d092]"> ₹5,00,000+ Prize Pool</span>, <span className="font-bold text-[#38a48c]">36H Quantum Sprints</span>, 
            Cyber Warfare CTFs, Robotic Mecha Arenas, and High-Velocity Esports.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              id="hero-register-btn"
              type="button"
              onClick={onRegisterClick}
              className="flex items-center gap-3 px-8 py-4 rounded-full font-orbitron font-black text-sm tracking-wider shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
              style={{
                backgroundColor: '#f8d092',
                color: '#25245d',
                boxShadow: `0 0 35px rgba(248, 208, 146, 0.6), 0 0 15px rgba(56, 164, 140, 0.4)`,
              }}
            >
              <ShieldAlert className="w-5 h-5 text-[#25245d]" />
              <span>ENLIST FOR MISSIONS</span>
              <ChevronRight className="w-4 h-4 text-[#25245d]" />
            </button>

            <button
              id="hero-explore-btn"
              type="button"
              onClick={onExploreEventsClick}
              className="flex items-center gap-3 px-7 py-4 rounded-full font-chakra font-bold text-sm sm:text-base tracking-wider transition-all hover:scale-105 cursor-pointer shadow-lg backdrop-blur-md border"
              style={{
                backgroundColor: 'rgba(26, 86, 120, 0.5)',
                borderColor: '#159097',
                color: '#f8d092',
                boxShadow: `0 0 20px rgba(21, 144, 151, 0.3)`,
              }}
            >
              <Terminal className="w-5 h-5" style={{ color: '#38a48c' }} />
              <span>EXPLORE ALL MISSIONS</span>
            </button>
          </div>

        </div>

        {/* Countdown HUD */}
        <div 
          className="max-w-3xl rounded-3xl p-6 sm:p-7 backdrop-blur-xl shadow-2xl relative overflow-hidden border transition-all duration-500"
          style={{
            backgroundColor: 'rgba(26, 86, 120, 0.3)',
            borderColor: 'rgba(21, 144, 151, 0.55)',
            boxShadow: `0 15px 40px rgba(5,7,22,0.8), 0 0 30px rgba(21, 144, 151, 0.35)`,
          }}
        >
          <div 
            className="absolute top-0 right-0 px-4 py-1.5 rounded-bl-2xl text-[11px] font-chakra font-extrabold tracking-wider uppercase"
            style={{
              backgroundColor: '#571c56',
              color: '#f8d092',
              borderLeft: '1px solid rgba(21, 144, 151, 0.5)',
              borderBottom: '1px solid rgba(21, 144, 151, 0.5)',
            }}
          >
            INVASION COUNTDOWN
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-5 mt-2">
            
            <div className="flex items-center gap-3.5">
              <div 
                className="p-3 rounded-2xl border shadow-md"
                style={{
                  backgroundColor: 'rgba(87, 28, 86, 0.35)',
                  borderColor: 'rgba(21, 144, 151, 0.6)',
                  color: '#f8d092',
                }}
              >
                <Clock className="w-6 h-6 animate-spin-slow" />
              </div>
              <div>
                <h3 className="font-orbitron font-bold text-sm sm:text-base uppercase tracking-wider text-[#f8d092]">
                  Mothership Landing Time
                </h3>
                <p className="text-xs font-telemetry" style={{ color: '#38a48c' }}>
                  October 15, 2026 • 09:00 AM IST
                </p>
              </div>
            </div>

            {/* Digits Grid */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center w-full sm:w-auto">
              {[
                { label: 'DAYS', value: timeLeft.days },
                { label: 'HRS', value: timeLeft.hours },
                { label: 'MIN', value: timeLeft.minutes },
                { label: 'SEC', value: timeLeft.seconds },
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className="rounded-2xl px-2.5 sm:px-3.5 py-2 min-w-[62px] sm:min-w-[70px] shadow-md border flex flex-col items-center justify-between"
                  style={{
                    backgroundColor: 'rgba(37, 36, 93, 0.45)',
                    borderColor: 'rgba(21, 144, 151, 0.45)',
                  }}
                >
                  <span 
                    className="font-orbitron font-black text-xl sm:text-2xl leading-none pt-1"
                    style={{
                      color: '#f8d092',
                      textShadow: `0 0 15px ${currentTheme.palette.primaryHex}`,
                    }}
                  >
                    {String(item.value).padStart(2, '0')}
                  </span>
                  <span className="text-[10px] font-orbitron font-bold tracking-wider text-[#38a48c] mt-1.5 uppercase leading-tight text-center w-full">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Highlights Ticker Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-8 max-w-4xl">
          {[
            { icon: Trophy, label: 'TOTAL PRIZE POOL', value: '₹5,00,000+', iconColor: '#f8d092' },
            { icon: Zap, label: 'FLAGSHIP CHALLENGES', value: '25+ MISSIONS', iconColor: '#159097' },
            { icon: Users, label: 'EARTH OPERATIVES', value: '5,000+', iconColor: '#38a48c' },
            { icon: Flame, label: 'HACKATHON DURATION', value: '36H SPRINT', iconColor: '#f8d092' },
          ].map((stat, i) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={i}
                className="rounded-2xl p-4 transition-all backdrop-blur-md shadow-md border"
                style={{
                  backgroundColor: 'rgba(26, 86, 120, 0.25)',
                  borderColor: 'rgba(21, 144, 151, 0.35)',
                }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <IconComponent className="w-4 h-4" style={{ color: stat.iconColor }} />
                  <span className="text-[10px] font-chakra font-bold tracking-wider" style={{ color: '#38a48c' }}>
                    {stat.label}
                  </span>
                </div>
                <div className="font-orbitron font-bold text-lg sm:text-xl text-[#f8d092]">
                  {stat.value}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
