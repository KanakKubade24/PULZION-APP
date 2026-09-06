/**
 * Centralized Design System & Brand Identity Tokens
 * Easily customize application branding, color palette, typography, and visual assets here.
 */

export interface DesignSystemConfig {
  appName: string;
  appShortName: string;
  appEdition: string;
  tagline: string;
  organization: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    highlight: string;
    backgroundDark: string;
    surfaceDark: string;
    surfaceCard: string;
    border: string;
    textPrimary: string;
    textMuted: string;
  };
  typography: {
    displayFont: string;
    bodyFont: string;
    monoFont: string;
  };
  assets: {
    logoSymbol: string;
    mascotName: string;
  };
}

export const APP_CONFIG: DesignSystemConfig = {
  // [MY APP NAME]
  appName: 'PULZION',
  appShortName: 'PULZION',
  appEdition: "'26",
  tagline: 'Beyond The Earth - Galactic Technology & Autonomous Innovation Symposium',
  organization: 'PICT ACM STUDENT CHAPTER (PASC)',

  // [PRIMARY / SECONDARY / ACCENT COLOR TOKENS]
  colors: {
    primary: '#159097',       // Cyber Cyan / Deep Teal
    secondary: '#25245d',     // Quantum Indigo
    accent: '#f8d092',        // Amber Gold / Cyber Gold
    highlight: '#38a48c',     // Emerald Matrix
    backgroundDark: '#050716',// Space Obsidian
    surfaceDark: '#0b1026',   // Deep Space Surface
    surfaceCard: 'rgba(37, 36, 93, 0.7)',
    border: 'rgba(21, 144, 151, 0.45)',
    textPrimary: '#ffffff',
    textMuted: '#94a3b8',
  },

  // [MY FONT]
  typography: {
    displayFont: 'Audiowide, cursive, sans-serif',
    bodyFont: 'Oxanium, system-ui, sans-serif',
    monoFont: 'Share Tech Mono, monospace',
  },

  // [MY LOGO]
  assets: {
    logoSymbol: 'Radio',
    mascotName: 'Cyber Sentinel',
  },
};
