import React from 'react';
import { 
  Palette, 
  Sparkles, 
  X, 
  Check, 
  Waves, 
  Disc, 
  Eye, 
  Zap, 
  Volume2,
  VolumeX,
  Compass,
  LucideIcon
} from 'lucide-react';
import { useAlienTheme, BgVisualMode } from '../context/ThemeContext';

interface VisualModeOption {
  id: BgVisualMode;
  name: string;
  icon: LucideIcon;
  desc: string;
}

export const ThemeAtmosphereSelector: React.FC = () => {
  const {
    currentTheme,
    allThemes,
    setTheme,
    bgVisualMode,
    setBgVisualMode,
    isAtmosphereModalOpen,
    setIsAtmosphereModalOpen,
    soundEnabled,
    setSoundEnabled,
  } = useAlienTheme();

  const visualModes: VisualModeOption[] = [
    {
      id: 'curved-waves',
      name: 'Curved Plasma Ribbons',
      icon: Waves,
      desc: 'Undulating Bézier spline wave streams with harmonic color gradients',
    },
    {
      id: 'vortex',
      name: 'Singularity Vortex',
      icon: Disc,
      desc: 'Gravitational accretion rings & swirling wormhole spiral arms',
    },
    {
      id: 'spore-swarm',
      name: 'Amoebic Spores',
      icon: Eye,
      desc: 'Organic fluid bio-cells & harmonic pulsating membrane curves',
    },
    {
      id: 'plasma-aurora',
      name: 'Curving Ion Auroras',
      icon: Zap,
      desc: 'Atmospheric magnetic ribbons cascading with fluid curves',
    },
    {
      id: 'fluid-droplets',
      name: 'Gravitational Arcs',
      icon: Compass,
      desc: 'Curved comet trails & orbital stardust vectors',
    },
  ];

  if (!isAtmosphereModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-950/95 border border-slate-700/80 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl"
        style={{
          borderColor: `${currentTheme.palette.primaryHex}50`,
          boxShadow: `0 0 50px ${currentTheme.palette.primaryHex}25`,
        }}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg"
              style={{
                backgroundColor: `${currentTheme.palette.primaryHex}20`,
                border: `1px solid ${currentTheme.palette.primaryHex}60`,
              }}
            >
              <Palette className="w-5 h-5" style={{ color: currentTheme.palette.primaryHex }} />
            </div>
            <div>
              <h3 className="font-orbitron font-extrabold text-xl sm:text-2xl text-white tracking-wide">
                BEYOND THE EARTH ATMOSPHERES & THEMES
              </h3>
              <p className="text-xs sm:text-sm font-chakra text-slate-300">
                Switch between organic curved themes & background fluid simulations
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Toggle */}
            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
              title={soundEnabled ? 'Mute Theme Audio' : 'Enable Theme Audio'}
              aria-label="Toggle Theme Audio"
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-green-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-500" />
              )}
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsAtmosphereModalOpen(false)}
              className="p-2.5 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* SECTION 1: Alien Themes Selection */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-orbitron font-bold text-sm text-slate-200 tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4" style={{ color: currentTheme.palette.primaryHex }} />
              SELECT INVASION COLOR THEME (CURVILINEAR PALETTES)
            </h4>
            <span className="text-[11px] font-chakra font-medium text-slate-400">
              Click to apply instantly
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allThemes.map((theme) => {
              const isSelected = currentTheme.id === theme.id;
              
              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => setTheme(theme.id)}
                  className={`relative text-left p-5 rounded-3xl transition-all duration-300 cursor-pointer overflow-hidden border ${
                    isSelected
                      ? 'bg-slate-900/90 border-white/80 shadow-2xl scale-[1.02]'
                      : 'bg-slate-900/50 hover:bg-slate-900/80 border-slate-800/80 hover:border-slate-600'
                  }`}
                  style={{
                    borderColor: isSelected ? theme.palette.primaryHex : undefined,
                    boxShadow: isSelected ? `0 0 25px ${theme.palette.primaryHex}40` : undefined,
                  }}
                >
                  {/* Top Bar with Swatch Dots & Glyph */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5">
                      {theme.palette.extraColors ? (
                        Object.entries(theme.palette.extraColors).map(([key, hexColor]) => (
                          <span 
                            key={key}
                            className="w-3.5 h-3.5 rounded-full shadow-sm" 
                            style={{ backgroundColor: hexColor }} 
                            title={`${hexColor} ${key}`}
                          />
                        ))
                      ) : (
                        <>
                          <span 
                            className="w-4 h-4 rounded-full shadow-sm"
                            style={{ backgroundColor: theme.palette.primaryHex }}
                          />
                          <span 
                            className="w-3.5 h-3.5 rounded-full opacity-80"
                            style={{ backgroundColor: theme.palette.secondaryHex }}
                          />
                          <span 
                            className="w-3 h-3 rounded-full opacity-60"
                            style={{ backgroundColor: theme.palette.accentHex }}
                          />
                        </>
                      )}
                    </div>

                    <span className="font-alien text-xs tracking-widest text-slate-400">
                      {theme.glyph}
                    </span>
                  </div>

                  {/* Theme Title */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h5 className="font-orbitron font-bold text-base text-white">
                        {theme.name}
                      </h5>
                      <p className="text-[11px] font-telemetry tracking-wider text-slate-400 mt-0.5">
                        {theme.palette.name}
                      </p>
                    </div>

                    {isSelected && (
                      <div 
                        className="w-6 h-6 rounded-full flex items-center justify-center text-black font-bold shadow-md shrink-0"
                        style={{ backgroundColor: theme.palette.primaryHex }}
                      >
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>

                  {/* Theme Tagline */}
                  <p className="text-xs font-chakra text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                    {theme.tagline}
                  </p>

                  {/* Visual Curve Badge */}
                  <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-chakra text-slate-400">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">
                      {theme.visualShape.curveLabel}
                    </span>
                    <span className="text-[10px] font-telemetry text-slate-500">
                      {theme.codename}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* SECTION 2: Background Curvilinear Visual Simulation Mode */}
        <div className="mt-8 pt-6 border-t border-slate-800/80">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-orbitron font-bold text-sm text-slate-200 tracking-wider flex items-center gap-2">
              <Waves className="w-4 h-4" style={{ color: currentTheme.palette.primaryHex }} />
              BACKGROUND SIMULATION VISUAL MODE (CURVILINEAR GEOMETRY)
            </h4>
            <span className="text-[11px] font-chakra font-medium text-slate-400">
              Select canvas animation
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {visualModes.map((mode) => {
              const Icon = mode.icon;
              const isActive = bgVisualMode === mode.id;

              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setBgVisualMode(mode.id)}
                  className={`flex items-start gap-3 p-4 rounded-2xl text-left transition-all duration-200 cursor-pointer border ${
                    isActive
                      ? 'bg-slate-900/90 border-white/80 shadow-lg'
                      : 'bg-slate-900/40 hover:bg-slate-900/70 border-slate-800/80 hover:border-slate-700'
                  }`}
                  style={{
                    borderColor: isActive ? currentTheme.palette.primaryHex : undefined,
                  }}
                >
                  <div 
                    className="p-2 rounded-xl shrink-0"
                    style={{
                      backgroundColor: isActive ? `${currentTheme.palette.primaryHex}25` : 'rgba(255,255,255,0.05)',
                      color: isActive ? currentTheme.palette.primaryHex : '#94a3b8',
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-chakra font-bold text-sm text-white truncate">
                        {mode.name}
                      </p>
                      {isActive && (
                        <span 
                          className="w-2 h-2 rounded-full animate-ping shrink-0"
                          style={{ backgroundColor: currentTheme.palette.primaryHex }}
                        />
                      )}
                    </div>
                    <p className="text-xs font-chakra text-slate-400 mt-1 leading-snug">
                      {mode.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between">
          <div className="text-xs font-chakra text-slate-400">
            Current: <span className="font-bold text-white">{currentTheme.name}</span> ({currentTheme.visualShape.curveLabel})
          </div>

          <button
            type="button"
            onClick={() => setIsAtmosphereModalOpen(false)}
            className="px-6 py-2.5 rounded-full font-chakra font-bold text-xs tracking-wider uppercase text-black shadow-lg transition-all hover:scale-105 cursor-pointer"
            style={{
              background: `linear-gradient(to right, ${currentTheme.palette.primaryHex}, ${currentTheme.palette.secondaryHex})`,
            }}
          >
            APPLY & CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
