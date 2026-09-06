import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { AlienThemeConfig, AlienThemeId, ALIEN_THEMES } from '../types/theme';
import { playAlienSound } from '../utils/alienAudio';

export type BgVisualMode = 'curved-waves' | 'vortex' | 'spore-swarm' | 'plasma-aurora' | 'fluid-droplets';

const VALID_BG_MODES: BgVisualMode[] = [
  'curved-waves',
  'vortex',
  'spore-swarm',
  'plasma-aurora',
  'fluid-droplets',
];

interface ThemeContextType {
  currentTheme: AlienThemeConfig;
  allThemes: AlienThemeConfig[];
  setTheme: (id: AlienThemeId) => void;
  bgVisualMode: BgVisualMode;
  setBgVisualMode: (mode: BgVisualMode) => void;
  isAtmosphereModalOpen: boolean;
  setIsAtmosphereModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean | ((prev: boolean) => boolean)) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'pulzion_alien_theme';
const BG_MODE_STORAGE_KEY = 'pulzion_bg_visual_mode';
const SOUND_STORAGE_KEY = 'pulzion_sound_enabled';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeId, setThemeId] = useState<AlienThemeId>(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved && ALIEN_THEMES.some((t) => t.id === saved)) {
        return saved as AlienThemeId;
      }
    } catch {
      // Fallback on storage block
    }
    return 'beyond-earth';
  });

  const [bgVisualMode, setBgVisualModeState] = useState<BgVisualMode>(() => {
    try {
      const saved = localStorage.getItem(BG_MODE_STORAGE_KEY) as BgVisualMode;
      if (saved && VALID_BG_MODES.includes(saved)) {
        return saved;
      }
    } catch {
      // Fallback on storage block
    }
    return 'curved-waves';
  });

  const [soundEnabled, setSoundEnabledState] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(SOUND_STORAGE_KEY);
      return saved !== null ? JSON.parse(saved) : true;
    } catch {
      return true;
    }
  });

  const [isAtmosphereModalOpen, setIsAtmosphereModalOpen] = useState(false);

  // Derive active theme safely
  const currentTheme = useMemo(() => {
    return ALIEN_THEMES.find((t) => t.id === themeId) || ALIEN_THEMES[0];
  }, [themeId]);

  // Sync sound preference to localStorage
  const setSoundEnabled = useCallback((action: boolean | ((prev: boolean) => boolean)) => {
    setSoundEnabledState((prev) => {
      const nextValue = typeof action === 'function' ? action(prev) : action;
      try {
        localStorage.setItem(SOUND_STORAGE_KEY, JSON.stringify(nextValue));
      } catch (e) {
        console.error('Failed to save sound preference', e);
      }
      return nextValue;
    });
  }, []);

  // Theme Setter Handler
  const setTheme = useCallback(
    (id: AlienThemeId) => {
      setThemeId(id);
      try {
        localStorage.setItem(THEME_STORAGE_KEY, id);
      } catch (e) {
        console.error('Failed to save theme choice', e);
      }
      if (soundEnabled) {
        playAlienSound('bio-pulse');
      }
    },
    [soundEnabled]
  );

  // BG Visual Mode Setter Handler
  const setBgVisualMode = useCallback(
    (mode: BgVisualMode) => {
      setBgVisualModeState(mode);
      try {
        localStorage.setItem(BG_MODE_STORAGE_KEY, mode);
      } catch (e) {
        console.error('Failed to save background visual mode', e);
      }
      if (soundEnabled) {
        playAlienSound('transmission');
      }
    },
    [soundEnabled]
  );

  // Sync Dynamic CSS Root Variables
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--theme-primary', currentTheme.palette.primaryHex);
    root.style.setProperty('--theme-secondary', currentTheme.palette.secondaryHex);
    root.style.setProperty('--theme-accent', currentTheme.palette.accentHex);
    root.style.setProperty('--theme-dark-bg', currentTheme.palette.darkBg);
  }, [currentTheme]);

  // Memoized Context Value
  const contextValue = useMemo(
    () => ({
      currentTheme,
      allThemes: ALIEN_THEMES,
      setTheme,
      bgVisualMode,
      setBgVisualMode,
      isAtmosphereModalOpen,
      setIsAtmosphereModalOpen,
      soundEnabled,
      setSoundEnabled,
    }),
    [
      currentTheme,
      setTheme,
      bgVisualMode,
      setBgVisualMode,
      isAtmosphereModalOpen,
      soundEnabled,
      setSoundEnabled,
    ]
  );

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};

export const useAlienTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAlienTheme must be used within a ThemeProvider');
  }
  return context;
};
