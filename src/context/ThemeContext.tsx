import React, { createContext, useContext, useState, useEffect } from 'react';
import { AlienThemeConfig, AlienThemeId, ALIEN_THEMES } from '../types/theme';
import { playAlienSound } from '../utils/alienAudio';

export type BgVisualMode = 'curved-waves' | 'vortex' | 'spore-swarm' | 'plasma-aurora' | 'fluid-droplets';

interface ThemeContextType {
  currentTheme: AlienThemeConfig;
  allThemes: AlienThemeConfig[];
  setTheme: (id: AlienThemeId) => void;
  bgVisualMode: BgVisualMode;
  setBgVisualMode: (mode: BgVisualMode) => void;
  isAtmosphereModalOpen: boolean;
  setIsAtmosphereModalOpen: (open: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeId, setThemeId] = useState<AlienThemeId>(() => {
    const saved = localStorage.getItem('pulzion_alien_theme');
    if (saved && ALIEN_THEMES.some((t) => t.id === saved)) {
      return saved as AlienThemeId;
    }
    return 'beyond-earth';
  });

  const [bgVisualMode, setBgVisualMode] = useState<BgVisualMode>(() => {
    const saved = localStorage.getItem('pulzion_bg_visual_mode');
    return (saved as BgVisualMode) || 'curved-waves';
  });

  const [isAtmosphereModalOpen, setIsAtmosphereModalOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const currentTheme = ALIEN_THEMES.find((t) => t.id === themeId) || ALIEN_THEMES[0];

  const setTheme = (id: AlienThemeId) => {
    setThemeId(id);
    localStorage.setItem('pulzion_alien_theme', id);
    if (soundEnabled) {
      // Harmonic audio feedback upon switching atmosphere
      playAlienSound('bio-pulse');
    }
  };

  const handleSetBgVisualMode = (mode: BgVisualMode) => {
    setBgVisualMode(mode);
    localStorage.setItem('pulzion_bg_visual_mode', mode);
    if (soundEnabled) {
      playAlienSound('transmission');
    }
  };

  useEffect(() => {
    // Apply dynamic CSS variables on root
    const root = document.documentElement;
    root.style.setProperty('--theme-primary', currentTheme.palette.primaryHex);
    root.style.setProperty('--theme-secondary', currentTheme.palette.secondaryHex);
    root.style.setProperty('--theme-accent', currentTheme.palette.accentHex);
    root.style.setProperty('--theme-dark-bg', currentTheme.palette.darkBg);
  }, [currentTheme]);

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        allThemes: ALIEN_THEMES,
        setTheme,
        bgVisualMode,
        setBgVisualMode: handleSetBgVisualMode,
        isAtmosphereModalOpen,
        setIsAtmosphereModalOpen,
        soundEnabled,
        setSoundEnabled,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useAlienTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAlienTheme must be used within a ThemeProvider');
  }
  return context;
};
