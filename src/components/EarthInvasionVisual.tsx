import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  Zap, 
  ShieldAlert, 
  Sparkles, 
  Target, 
  Activity, 
  Volume2, 
  VolumeX,
  Crosshair,
  Wifi,
  Eye,
  Disc
} from 'lucide-react';
import { playAlienClickSound, playAlienDecodeSound } from '../utils/alienAudio';

export const EarthInvasionVisual: React.FC = () => {
  const [beamMode, setBeamMode] = useState<'scan' | 'tractor' | 'emp'>('scan');
  const [isFiring, setIsFiring] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [scanProgress, setScanProgress] = useState(68);
  const [shipHovered, setShipHovered] = useState(false);
  const [targetLockIndex, setTargetLockIndex] = useState(0);

  const targets = [
    { name: 'PICT PUNE SECTOR', coords: '18.4575° N, 73.8508° E', threat: 'HIGH INTELLECT', status: 'LOCKED' },
    { name: 'QUANTUM CODE ARENA', coords: 'SECTOR-07 TECH MATRIX', threat: 'HACKATHON ACTIVE', status: 'INFILTRATING' },
    { name: 'CYBER WARFARE LABS', coords: 'ORBITAL GRID 09-P', threat: 'FIREWALL BREACH', status: 'SYNCHRONIZED' },
  ];

  useEffect(() => {
    const targetInterval = setInterval(() => {
      setTargetLockIndex((prev) => (prev + 1) % targets.length);
    }, 4500);

    const progressInterval = setInterval(() => {
      setScanProgress((prev) => (prev >= 100 ? 15 : prev + 1));
    }, 400);

    return () => {
      clearInterval(targetInterval);
      clearInterval(progressInterval);
    };
  }, []);

  const handleTriggerBeam = (mode: 'scan' | 'tractor' | 'emp') => {
    setBeamMode(mode);
    setIsFiring(true);
    if (soundEnabled) {
      if (mode === 'tractor') playAlienDecodeSound();
      else if (mode === 'emp') playAlienClickSound(320);
      else playAlienClickSound(750);
    }
    setTimeout(() => setIsFiring(false), 2000);
  };

  const currentTarget = targets[targetLockIndex];

  return (
    <div className="relative w-full rounded-3xl p-5 sm:p-6 border backdrop-blur-xl shadow-2xl overflow-hidden select-none transition-all duration-500"
      style={{
        backgroundColor: 'rgba(37, 36, 93, 0.45)',
        borderColor: 'rgba(21, 144, 151, 0.55)',
        boxShadow: `0 20px 50px rgba(5, 7, 22, 0.9), 0 0 35px rgba(21, 144, 151, 0.25)`,
      }}
    >
      {/* Background Ambient Radial Glow */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen"
        style={{
          background: `radial-gradient(circle at 50% 30%, ${
            beamMode === 'emp' ? '#571c56' : beamMode === 'tractor' ? '#f8d092' : '#159097'
          }40, transparent 70%)`
        }}
      />

      {/* Top Header Telemetry Strip */}
      <div className="relative z-10 flex items-center justify-between border-b border-slate-700/70 pb-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center justify-center w-7 h-7 rounded-lg bg-black/60 border border-[#159097]/60">
            <Radio className="w-3.5 h-3.5 text-[#f8d092] animate-pulse" />
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-orbitron font-extrabold text-xs tracking-wider text-[#f8d092]">
                DREADNOUGHT X-99
              </span>
              <span className="px-1.5 py-0.2 rounded text-[8px] font-chakra font-black tracking-widest bg-rose-950/80 text-rose-300 border border-rose-500/50 uppercase">
                INVADING
              </span>
            </div>
            <p className="text-[9px] font-telemetry text-[#38a48c] tracking-widest">
              EXTRATERRESTRIAL FLAGSHIP • ORBIT 120KM
            </p>
          </div>
        </div>

        {/* Audio Toggle & Scan Radar Status */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-1.5 rounded-lg border border-slate-700/60 bg-black/40 text-slate-400 hover:text-[#f8d092] transition-colors cursor-pointer"
            title={soundEnabled ? "Mute Ship Audio" : "Enable Ship Audio"}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-[#38a48c]" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 border border-[#38a48c]/40 text-[10px] font-chakra text-[#38a48c]">
            <Activity className="w-3 h-3 animate-pulse" />
            <span>SYNC {scanProgress}%</span>
          </div>
        </div>
      </div>

      {/* Main Spaceship & Earth Invasion Stage (SVG Vector Art) */}
      <div 
        className="relative z-10 w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-slate-800/80 bg-[#050716]/80 flex flex-col items-center justify-between pt-2 pb-0 cursor-crosshair group"
        onMouseEnter={() => setShipHovered(true)}
        onMouseLeave={() => setShipHovered(false)}
        onClick={() => handleTriggerBeam(beamMode)}
        title="Click to pulse Extraterrestrial Beam"
      >
        {/* Deep Space Background Stars & Grid */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(#159097 1px, transparent 1px), radial-gradient(#f8d092 1px, transparent 1px)`,
            backgroundSize: '24px 24px, 48px 48px',
            backgroundPosition: '0 0, 12px 12px'
          }} />
        </div>

        {/* Escort Scout Drone 1 (Left) */}
        <div className="absolute left-6 top-16 pointer-events-none transition-transform duration-1000 animate-bounce"
          style={{ animationDuration: '4s' }}
        >
          <svg width="40" height="24" viewBox="0 0 40 24" fill="none" className="drop-shadow-[0_0_8px_#38a48c]">
            <polygon points="20,2 38,16 26,22 20,18 14,22 2,16" fill="#1a5678" stroke="#38a48c" strokeWidth="1.2" />
            <circle cx="20" cy="11" r="3" fill="#f8d092" className="animate-pulse" />
            <line x1="8" y1="16" x2="4" y2="23" stroke="#159097" strokeWidth="1.5" />
            <line x1="32" y1="16" x2="36" y2="23" stroke="#159097" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Escort Scout Drone 2 (Right) */}
        <div className="absolute right-6 top-10 pointer-events-none transition-transform duration-1000 animate-bounce"
          style={{ animationDuration: '5s', animationDelay: '1s' }}
        >
          <svg width="36" height="22" viewBox="0 0 40 24" fill="none" className="drop-shadow-[0_0_8px_#f8d092]">
            <polygon points="20,2 38,16 26,22 20,18 14,22 2,16" fill="#25245d" stroke="#f8d092" strokeWidth="1.2" />
            <circle cx="20" cy="11" r="2.5" fill="#38a48c" className="animate-pulse" />
            <line x1="6" y1="16" x2="2" y2="23" stroke="#f8d092" strokeWidth="1.5" />
            <line x1="34" y1="16" x2="38" y2="23" stroke="#f8d092" strokeWidth="1.5" />
          </svg>
        </div>

        {/* Tactical Crosshair overlay */}
        <div className="absolute top-3 right-3 text-[9px] font-telemetry text-slate-500 flex items-center gap-1">
          <Crosshair className="w-3 h-3 text-[#f8d092]" />
          <span>LOCK: {currentTarget.coords}</span>
        </div>

        {/* Interactive Mothership SVG Vector */}
        <div className={`relative z-20 transition-all duration-500 ${shipHovered ? 'scale-105' : 'scale-100'} ${isFiring ? 'translate-y-1' : 'animate-pulse'}`}
          style={{ animationDuration: '3.5s' }}
        >
          <svg width="220" height="90" viewBox="0 0 220 90" fill="none" className="overflow-visible drop-shadow-[0_10px_25px_rgba(21,144,151,0.5)]">
            
            {/* Plasma Thruster Exhaust Trails */}
            <g opacity="0.85">
              <ellipse cx="60" cy="46" rx="8" ry="3" fill="#159097" className="animate-ping" style={{ animationDuration: '1.5s' }} />
              <ellipse cx="160" cy="46" rx="8" ry="3" fill="#159097" className="animate-ping" style={{ animationDuration: '1.5s' }} />
              <path d="M50 46 L30 58 L45 52 Z" fill="#38a48c" opacity="0.7" />
              <path d="M170 46 L190 58 L175 52 Z" fill="#38a48c" opacity="0.7" />
            </g>

            {/* Main Dreadnought Saucer Wings / Chassis */}
            <path 
              d="M10 42 C40 20, 180 20, 210 42 C185 58, 35 58, 10 42 Z" 
              fill="url(#shipHullGrad)" 
              stroke="#159097" 
              strokeWidth="2" 
            />

            {/* Inner Ring Biomechanical Panels */}
            <path 
              d="M40 40 C70 26, 150 26, 180 40 C155 52, 65 52, 40 40 Z" 
              fill="#25245d" 
              stroke="#38a48c" 
              strokeWidth="1.5" 
            />

            {/* Glowing Alien Glyphs on Hull */}
            <text x="50" y="43" fill="#f8d092" fontSize="7" fontFamily="Orbitron" letterSpacing="2">⍙⎍⌰</text>
            <text x="145" y="43" fill="#f8d092" fontSize="7" fontFamily="Orbitron" letterSpacing="2">⍜⋏⟒</text>

            {/* Upper Command Deck Dome */}
            <ellipse cx="110" cy="28" rx="36" ry="15" fill="url(#domeGrad)" stroke="#f8d092" strokeWidth="1.5" />
            
            {/* Alien Pilot Silhouette & Glowing Eyes */}
            <ellipse cx="110" cy="26" rx="9" ry="11" fill="#050716" />
            <circle cx="106" cy="24" r="2.2" fill="#38a48c" className="animate-pulse" />
            <circle cx="114" cy="24" r="2.2" fill="#38a48c" className="animate-pulse" />
            <ellipse cx="110" cy="18" rx="5" ry="3" fill="#571c56" opacity="0.8" />

            {/* Central Bio-Energy Fusion Core (Ventral Emitter) */}
            <ellipse cx="110" cy="48" rx="18" ry="6" fill="#f8d092" stroke="#ffffff" strokeWidth="1" className="animate-pulse" />
            <circle cx="110" cy="48" r="4" fill={beamMode === 'emp' ? '#f87171' : beamMode === 'tractor' ? '#f8d092' : '#38a48c'} />

            {/* Hull Lights Strip */}
            {[30, 55, 80, 140, 165, 190].map((x, i) => (
              <circle 
                key={i} 
                cx={x} 
                cy="44" 
                r="1.8" 
                fill={i % 2 === 0 ? '#38a48c' : '#f8d092'} 
                className="animate-ping" 
                style={{ animationDuration: `${1.2 + (i % 3) * 0.4}s` }} 
              />
            ))}

            {/* Gradient Definitions */}
            <defs>
              <linearGradient id="shipHullGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1a5678" />
                <stop offset="50%" stopColor="#25245d" />
                <stop offset="100%" stopColor="#571c56" />
              </linearGradient>
              <linearGradient id="domeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f8d092" stopOpacity="0.8" />
                <stop offset="60%" stopColor="#159097" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#050716" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Active Plasma / Tractor / Scan Beam projecting to Earth */}
        <div className="relative w-full flex-1 flex flex-col items-center justify-end -mt-3">
          
          {/* Beam Laser Cone */}
          <div 
            className={`w-40 sm:w-56 h-28 sm:h-32 transition-all duration-300 pointer-events-none relative flex items-center justify-center`}
            style={{
              clipPath: 'polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%)',
              background: beamMode === 'emp' 
                ? 'linear-gradient(to bottom, rgba(244,63,94,0.85), rgba(87,28,86,0.3) 70%, transparent)' 
                : beamMode === 'tractor'
                ? 'linear-gradient(to bottom, rgba(248,208,146,0.9), rgba(21,144,151,0.4) 60%, transparent)'
                : 'linear-gradient(to bottom, rgba(56,164,140,0.85), rgba(21,144,151,0.3) 60%, transparent)',
              opacity: isFiring ? 1 : 0.65,
            }}
          >
            {/* Animated Laser Pulse Lines inside beam */}
            <div className="w-full h-full absolute inset-0 flex flex-col justify-around opacity-60">
              <div className="w-full h-[1px] bg-white animate-pulse" />
              <div className="w-full h-[1px] bg-[#f8d092] animate-ping" />
              <div className="w-full h-[1px] bg-[#38a48c] animate-pulse" />
            </div>
          </div>

          {/* Earth's Atmosphere Curvature Sphere Section */}
          <div className="relative w-full h-14 sm:h-16 -mt-6 rounded-t-[100%] border-t-2 border-[#38a48c] shadow-[0_-10px_35px_rgba(21,144,151,0.6)] overflow-hidden flex items-center justify-center"
            style={{
              background: 'radial-gradient(circle at 50% 120%, #159097 0%, #1a5678 40%, #050716 90%)',
            }}
          >
            {/* Earth Continents / City Lights glow */}
            <div className="absolute inset-0 opacity-40 mix-blend-screen flex justify-around items-center px-8">
              <div className="w-12 h-6 rounded-full bg-[#38a48c]/60 blur-[2px]" />
              <div className="w-20 h-8 rounded-full bg-[#f8d092]/50 blur-[3px]" />
              <div className="w-16 h-5 rounded-full bg-[#159097]/70 blur-[2px]" />
            </div>

            {/* Target Reticle Locked on Earth */}
            <div className="relative z-10 flex items-center gap-1 px-3 py-1 rounded-full bg-black/80 border border-[#f8d092] shadow-lg animate-pulse">
              <Target className="w-3 h-3 text-[#f8d092]" />
              <span className="font-orbitron font-extrabold text-[9px] text-white">
                TARGET: {currentTarget.name}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Interactive Controls & Threat Analysis Panel */}
      <div className="relative z-10 mt-4 pt-3 border-t border-slate-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        
        {/* Mode Selector Buttons */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          <span className="text-[10px] font-chakra font-bold text-slate-400 uppercase mr-1 hidden sm:inline">
            BEAM MODE:
          </span>
          
          <button
            onClick={() => handleTriggerBeam('scan')}
            className={`flex-1 sm:flex-none px-3 py-1 rounded-xl text-xs font-chakra font-bold border transition-all cursor-pointer ${
              beamMode === 'scan'
                ? 'bg-[#38a48c]/30 border-[#38a48c] text-[#f8d092] shadow-[0_0_10px_rgba(56,164,140,0.5)]'
                : 'bg-black/40 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            BIO SCAN
          </button>

          <button
            onClick={() => handleTriggerBeam('tractor')}
            className={`flex-1 sm:flex-none px-3 py-1 rounded-xl text-xs font-chakra font-bold border transition-all cursor-pointer ${
              beamMode === 'tractor'
                ? 'bg-[#f8d092]/30 border-[#f8d092] text-[#f8d092] shadow-[0_0_10px_rgba(248,208,146,0.5)]'
                : 'bg-black/40 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            TRACTOR
          </button>

          <button
            onClick={() => handleTriggerBeam('emp')}
            className={`flex-1 sm:flex-none px-3 py-1 rounded-xl text-xs font-chakra font-bold border transition-all cursor-pointer ${
              beamMode === 'emp'
                ? 'bg-rose-950/60 border-rose-500 text-rose-300 shadow-[0_0_10px_rgba(244,63,94,0.5)]'
                : 'bg-black/40 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            PLASMA EMP
          </button>
        </div>

        {/* Live Intel Readout */}
        <div className="flex items-center gap-2 text-[10px] font-chakra font-semibold text-slate-300">
          <ShieldAlert className="w-3.5 h-3.5 text-[#f8d092]" />
          <span>STATUS: <strong className="text-emerald-400">{currentTarget.status}</strong> • THREAT: <strong className="text-[#f8d092]">{currentTarget.threat}</strong></span>
        </div>

      </div>

    </div>
  );
};
