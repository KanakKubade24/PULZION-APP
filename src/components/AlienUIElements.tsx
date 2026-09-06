import React, { useState, useEffect } from 'react';
import { Sparkles, Radio, Skull, ShieldAlert, Zap, Terminal, Disc, Eye } from 'lucide-react';
import { playAlienClickSound, playAlienDecodeSound } from '../utils/alienAudio';
import { useAlienTheme } from '../context/ThemeContext';

// Alien Runic cipher mapping
const ALIEN_GLYPHS = ['⍙', '⎍', '⌰', '⋉', '⟟', '⍜', '⋏', '⟒', '⍑', '⊬', '⌿', '⟒', '⍀', '⋔', '⏃', '⏁', '⍀', '⟟', '⌖', '⎎', '⍾', '⍙', '⌖', '⍜', '⍀', '⏁', '⟒', '⌖', '⌘', '⌥', '⎔', '⌬', '⏣', '⎊', '⎉', '⍟', '᚛', '᚜', 'ᚱ', 'ᛃ'];

export function getRandomAlienString(length = 6): string {
  let res = '';
  for (let i = 0; i < length; i++) {
    res += ALIEN_GLYPHS[Math.floor(Math.random() * ALIEN_GLYPHS.length)] + ' ';
  }
  return res.trim();
}

/**
 * Animated Alien Cipher Text: Displays alien glyphs that decode into English on hover or cycle!
 */
export const AlienDecoderText: React.FC<{
  text: string;
  className?: string;
  alienClassName?: string;
  autoDecode?: boolean;
}> = ({ text, className = '', alienClassName = '', autoDecode = false }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const { currentTheme } = useAlienTheme();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHovered || autoDecode) {
      playAlienDecodeSound();
      let iteration = 0;
      interval = setInterval(() => {
        setDisplayText(
          text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              if (index < iteration) {
                return text[index];
              }
              return ALIEN_GLYPHS[Math.floor(Math.random() * ALIEN_GLYPHS.length)];
            })
            .join('')
        );

        if (iteration >= text.length) {
          clearInterval(interval);
        }
        iteration += 1 / 2;
      }, 35);
    } else {
      setDisplayText(text);
    }

    return () => clearInterval(interval);
  }, [isHovered, autoDecode, text]);

  return (
    <span
      className={`inline-block cursor-pointer transition-colors duration-200 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title="Hover to decode Extraterrestrial Transmission"
    >
      <span 
        className={isHovered ? 'font-telemetry tracking-wider' : alienClassName}
        style={{ color: isHovered ? currentTheme.palette.primaryHex : undefined }}
      >
        {displayText}
      </span>
    </span>
  );
};

/**
 * Curvilinear Alien Button (Smooth Rounded Curves & Liquid Fluid Glows)
 */
export const AlienButton: React.FC<{
  children: React.ReactNode;
  variant?: 'primary-green' | 'plasma-cyan' | 'bio-hazard-red' | 'cyber-dark' | 'outline-alien' | 'theme-adaptive' | 'outline-green';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  glyphPrefix?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  id?: string;
  curved?: boolean;
}> = ({
  children,
  variant = 'theme-adaptive',
  size = 'md',
  icon,
  glyphPrefix,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
  id,
}) => {
  const { currentTheme } = useAlienTheme();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    playAlienClickSound(variant === 'bio-hazard-red' ? 520 : 880);
    if (onClick) onClick(e);
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-xs font-chakra tracking-wider gap-1.5 rounded-full',
    md: 'px-6 py-2.5 text-sm font-chakra tracking-wider font-semibold gap-2 rounded-full',
    lg: 'px-8 py-3.5 text-base font-orbitron tracking-wider font-bold gap-3 rounded-full',
  }[size];

  // Dynamic Theme Adaptive styles
  let variantStyles = '';
  if (variant === 'theme-adaptive') {
    variantStyles = `bg-gradient-to-r ${currentTheme.palette.primaryGradient} text-[#050716] font-extrabold border border-white/40 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300`;
  } else if (variant === 'primary-green') {
    variantStyles = 'bg-gradient-to-r from-[#38a48c] via-[#159097] to-[#f8d092] text-[#050716] font-extrabold border border-white/30 shadow-[0_0_25px_rgba(56,164,140,0.4)] hover:shadow-[0_0_35px_rgba(56,164,140,0.7)] hover:scale-105';
  } else if (variant === 'plasma-cyan') {
    variantStyles = 'bg-gradient-to-r from-[#159097] via-[#38a48c] to-[#f8d092] text-[#050716] font-extrabold border border-cyan-200/40 shadow-[0_0_25px_rgba(21,144,151,0.4)] hover:scale-105';
  } else if (variant === 'bio-hazard-red') {
    variantStyles = 'bg-gradient-to-r from-[#571c56] via-[#25245d] to-[#1a5678] text-[#f8d092] font-extrabold border border-[#f8d092]/40 shadow-[0_0_25px_rgba(87,28,86,0.5)] hover:scale-105';
  } else if (variant === 'outline-green' || variant === 'outline-alien') {
    variantStyles = 'bg-[#1a5678]/40 hover:bg-[#1a5678]/70 text-[#f8d092] border border-[#159097]/60 hover:border-[#f8d092] shadow-[0_0_15px_rgba(21,144,151,0.25)] hover:scale-105';
  } else {
    variantStyles = 'bg-[#25245d]/60 text-[#f8d092] hover:text-white border border-[#159097]/40 hover:border-[#159097] shadow-md hover:scale-105';
  }

  return (
    <button
      id={id}
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={`group relative inline-flex items-center justify-center select-none uppercase transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer overflow-hidden backdrop-blur-md ${sizeClasses} ${variantStyles} ${className}`}
    >
      {glyphPrefix && (
        <span className="font-telemetry text-xs opacity-80 mr-1 font-normal">
          {glyphPrefix}
        </span>
      )}

      {icon && <span className="transition-transform group-hover:rotate-6 group-hover:scale-110">{icon}</span>}
      
      <span className="relative z-10 flex items-center gap-1.5">{children}</span>

      {/* Fluid gleam reflection */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 pointer-events-none" />
    </button>
  );
};

/**
 * Curvilinear Alien Badge (Smooth Pill with Glowing Core)
 */
export const AlienBadge: React.FC<{
  label: string;
  glyph?: string;
  variant?: 'green' | 'cyan' | 'purple' | 'amber' | 'red';
  className?: string;
}> = ({ label, glyph, variant = 'green', className = '' }) => {
  const colorMap = {
    green: 'border-[#38a48c]/50 bg-[#1a5678]/40 text-[#38a48c] shadow-[0_0_12px_rgba(56,164,140,0.25)]',
    cyan: 'border-[#159097]/50 bg-[#25245d]/40 text-[#159097] shadow-[0_0_12px_rgba(21,144,151,0.25)]',
    purple: 'border-[#571c56]/60 bg-[#571c56]/40 text-[#f8d092] shadow-[0_0_12px_rgba(87,28,86,0.3)]',
    amber: 'border-[#f8d092]/50 bg-[#25245d]/40 text-[#f8d092] shadow-[0_0_12px_rgba(248,208,146,0.25)]',
    red: 'border-[#571c56]/60 bg-[#571c56]/50 text-[#f8d092] shadow-[0_0_12px_rgba(87,28,86,0.3)]',
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border font-chakra text-xs tracking-wider uppercase backdrop-blur-md ${colorMap} ${className}`}
    >
      <span className="w-2 h-2 rounded-full bg-current animate-pulse shadow-sm" />
      {glyph && <span className="font-alien text-[11px] opacity-90">{glyph}</span>}
      <span>{label}</span>
    </span>
  );
};

/**
 * Curvilinear Alien Card (Smooth Rounded-3xl Container with Liquid Glass & Ambient Glow)
 */
export const AlienCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  glowOnHover?: boolean;
  id?: string;
}> = ({ children, className = '', glowOnHover = true, id }) => {
  const { currentTheme } = useAlienTheme();

  return (
    <div
      id={id}
      className={`relative rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl transition-all duration-300 border ${
        glowOnHover ? 'hover:shadow-[0_10px_40px_rgba(5,7,22,0.8)]' : ''
      } ${className}`}
      style={{
        backgroundColor: 'rgba(26, 86, 120, 0.22)',
        borderColor: 'rgba(21, 144, 151, 0.45)',
        boxShadow: `0 10px 30px rgba(5,7,22,0.7)`,
      }}
    >
      {/* Decorative smooth top-pill glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[2px] rounded-full blur-[1px] opacity-80"
        style={{ background: '#159097' }}
      />
      {children}
    </div>
  );
};

/**
 * Alien Curvy HUD Telemetry Header
 */
export const AlienHUDHeader: React.FC<{
  title: string;
  subtitle?: string;
  sectorId?: string;
  alienCode?: string;
}> = ({ title, subtitle, sectorId = 'SECTOR-7X', alienCode = '⍙⌰⋉::99' }) => {
  const { currentTheme } = useAlienTheme();

  return (
    <div 
      className="relative border-b pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4"
      style={{ borderColor: 'rgba(21, 144, 151, 0.35)' }}
    >
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span 
            className="px-3 py-1 text-[11px] font-chakra font-bold rounded-full uppercase border tracking-wider"
            style={{
              borderColor: 'rgba(21, 144, 151, 0.6)',
              backgroundColor: 'rgba(87, 28, 86, 0.45)',
              color: '#f8d092',
            }}
          >
            {sectorId}
          </span>
          <span 
            className="text-xs font-alien tracking-widest opacity-90"
            style={{ color: '#38a48c' }}
          >
            {alienCode}
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold font-orbitron tracking-tight flex items-center gap-3" style={{ color: '#f8d092' }}>
          {title}
          <span 
            className="w-3 h-3 rounded-full animate-ping shadow-sm"
            style={{ backgroundColor: '#159097' }}
          />
        </h2>
        {subtitle && (
          <p className="text-sm sm:text-base font-chakra mt-1 tracking-wide max-w-2xl" style={{ color: '#d8e8ea' }}>
            {subtitle}
          </p>
        )}
      </div>

      {/* Real-time telemetry curved capsule */}
      <div className="flex items-center gap-3 font-telemetry text-xs">
        <div 
          className="flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-md shadow-md"
          style={{
            backgroundColor: 'rgba(37, 36, 93, 0.6)',
            borderColor: 'rgba(21, 144, 151, 0.5)',
            color: '#f8d092',
          }}
        >
          <Radio 
            className="w-4 h-4 animate-pulse" 
            style={{ color: '#38a48c' }}
          />
          <span style={{ color: '#f8d092' }}>FREQ: 1420.405 MHz</span>
        </div>
      </div>
    </div>
  );
};
