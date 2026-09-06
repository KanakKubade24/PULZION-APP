export type AlienThemeId = 
  | 'beyond-earth'
  | 'bio-hive'
  | 'cosmic-wormhole'
  | 'cyber-plasma'
  | 'solar-eclipse'
  | 'acid-matrix'
  | 'deep-stardust';

export interface AlienThemeConfig {
  id: AlienThemeId;
  name: string;
  codename: string;
  tagline: string;
  description: string;
  badge: string;
  glyph: string;
  palette: {
    name: string;
    primaryHex: string;
    secondaryHex: string;
    accentHex: string;
    darkBg: string;
    cardBg: string;
    cardBorder: string;
    primaryGradient: string;
    glowTextClass: string;
    glowBoxClass: string;
    badgeStyle: string;
    particleColors: string[];
    beamColors: [string, string, string];
    extraColors?: {
      deepPurple: string;
      cosmicIndigo: string;
      deepTeal: string;
      cyanTeal: string;
      seaGreen: string;
      starlightGold: string;
    };
  };
  visualShape: {
    cardRadius: string;
    buttonRadius: string;
    badgeRadius: string;
    curveLabel: string;
  };
}

export const ALIEN_THEMES: AlienThemeConfig[] = [
  {
    id: 'beyond-earth',
    name: 'Beyond The Earth // Alien Planet Nebula',
    codename: 'XENO-COSMOS // 00',
    tagline: 'Alien planet sky with teal cyan auroras, deep purple stardust, indigo voids & starlight gold',
    description: 'The official Beyond The Earth color palette featuring deep purple #571c56, cosmic indigo #25245d, deep teal #1a5678, nebula cyan #159097, alien sea green #38a48c, and starlight gold #f8d092.',
    badge: 'FLAGSHIP NEBULA',
    glyph: '⍙⎔⍟',
    palette: {
      name: 'Alien Planet Sky & Cosmic Nebula',
      primaryHex: '#159097',
      secondaryHex: '#38a48c',
      accentHex: '#f8d092',
      darkBg: '#050716',
      cardBg: 'rgba(26, 86, 120, 0.25)',
      cardBorder: 'rgba(21, 144, 151, 0.45)',
      primaryGradient: 'from-[#159097] via-[#38a48c] to-[#f8d092]',
      glowTextClass: 'alien-glow-cyan',
      glowBoxClass: 'shadow-[0_0_30px_rgba(21,144,151,0.45)]',
      badgeStyle: 'bg-[#1a5678]/60 border-[#159097]/60 text-[#f8d092]',
      particleColors: ['#159097', '#38a48c', '#f8d092', '#571c56', '#1a5678', '#25245d'],
      beamColors: ['rgba(21, 144, 151, 0.8)', 'rgba(56, 164, 140, 0.4)', 'rgba(248, 208, 146, 0.1)'],
      extraColors: {
        deepPurple: '#571c56',
        cosmicIndigo: '#25245d',
        deepTeal: '#1a5678',
        cyanTeal: '#159097',
        seaGreen: '#38a48c',
        starlightGold: '#f8d092',
      },
    },
    visualShape: {
      cardRadius: 'rounded-3xl',
      buttonRadius: 'rounded-full',
      badgeRadius: 'rounded-full',
      curveLabel: 'Cosmic Nebula Fluid Curves',
    },
  },
  {
    id: 'bio-hive',
    name: 'Bio-Luminescent Hive',
    codename: 'XENO-SPORIC // 01',
    tagline: 'Deep abyssal bioluminescence with undulating mycelium spores & curved fluid membranes',
    description: 'Vibrant emerald, neon mint, and organic toxic spores emitting soft harmonic bio-glows across sleek curved surfaces.',
    badge: 'BIO-ORGANIC',
    glyph: '⍙⌰⋉',
    palette: {
      name: 'Emerald & Mint Acid',
      primaryHex: '#10b981',
      secondaryHex: '#22c55e',
      accentHex: '#6ee7b7',
      darkBg: '#02120b',
      cardBg: 'rgba(3, 27, 18, 0.75)',
      cardBorder: 'rgba(34, 197, 94, 0.35)',
      primaryGradient: 'from-emerald-400 via-green-400 to-teal-300',
      glowTextClass: 'alien-glow-green',
      glowBoxClass: 'shadow-[0_0_30px_rgba(34,197,94,0.4)]',
      badgeStyle: 'bg-emerald-950/70 border-emerald-500/50 text-emerald-300',
      particleColors: ['#34d399', '#4ade80', '#22c55e', '#a7f3d0'],
      beamColors: ['rgba(52, 211, 153, 0.75)', 'rgba(34, 197, 94, 0.35)', 'rgba(16, 185, 129, 0.05)'],
    },
    visualShape: {
      cardRadius: 'rounded-3xl',
      buttonRadius: 'rounded-full',
      badgeRadius: 'rounded-full',
      curveLabel: 'Organic Bio-Curves',
    },
  },
  {
    id: 'cosmic-wormhole',
    name: 'Cosmic Wormhole & Nebula Void',
    codename: 'SINGULARITY // 02',
    tagline: 'Swirling gravitational accretion disk, ultraviolet vortex particles & orbital nebula curves',
    description: 'Deep ultraviolet void with celestial magenta gas clouds, curved event horizons, and fluid star dust.',
    badge: 'WARP VORTEX',
    glyph: '⌬⎔⏣',
    palette: {
      name: 'Ultraviolet & Cosmic Magenta',
      primaryHex: '#c084fc',
      secondaryHex: '#ec4899',
      accentHex: '#818cf8',
      darkBg: '#090314',
      cardBg: 'rgba(23, 7, 36, 0.75)',
      cardBorder: 'rgba(192, 132, 252, 0.35)',
      primaryGradient: 'from-fuchsia-400 via-purple-400 to-indigo-400',
      glowTextClass: 'alien-glow-purple',
      glowBoxClass: 'shadow-[0_0_30px_rgba(192,132,252,0.4)]',
      badgeStyle: 'bg-purple-950/70 border-purple-500/50 text-purple-300',
      particleColors: ['#c084fc', '#e879f9', '#818cf8', '#f472b6'],
      beamColors: ['rgba(192, 132, 252, 0.75)', 'rgba(236, 72, 153, 0.35)', 'rgba(129, 140, 248, 0.05)'],
    },
    visualShape: {
      cardRadius: 'rounded-3xl',
      buttonRadius: 'rounded-full',
      badgeRadius: 'rounded-full',
      curveLabel: 'Orbital Gravitational Curves',
    },
  },
  {
    id: 'cyber-plasma',
    name: 'Cyber Plasma & Auroras',
    codename: 'FLUX-IONIC // 03',
    tagline: 'High-frequency ion beams, undulating magnetic plasma ribbons & aqua wave ripples',
    description: 'Electric cyan and vivid aqua waveforms flowing across sleek aerodynamic curved hulls.',
    badge: 'PLASMA FLUX',
    glyph: '⍟⌘⌥',
    palette: {
      name: 'Electric Cyan & Aqua',
      primaryHex: '#06b6d4',
      secondaryHex: '#0ea5e9',
      accentHex: '#2dd4bf',
      darkBg: '#020f18',
      cardBg: 'rgba(3, 24, 38, 0.75)',
      cardBorder: 'rgba(6, 182, 212, 0.35)',
      primaryGradient: 'from-cyan-400 via-teal-300 to-sky-400',
      glowTextClass: 'alien-glow',
      glowBoxClass: 'shadow-[0_0_30px_rgba(6,182,212,0.4)]',
      badgeStyle: 'bg-cyan-950/70 border-cyan-500/50 text-cyan-300',
      particleColors: ['#22d3ee', '#38bdf8', '#2dd4bf', '#bae6fd'],
      beamColors: ['rgba(34, 211, 238, 0.75)', 'rgba(45, 212, 191, 0.35)', 'rgba(6, 182, 212, 0.05)'],
    },
    visualShape: {
      cardRadius: 'rounded-3xl',
      buttonRadius: 'rounded-full',
      badgeRadius: 'rounded-full',
      curveLabel: 'Aerodynamic Wave Curves',
    },
  },
  {
    id: 'solar-eclipse',
    name: 'Red Alert Solar Eclipse',
    codename: 'CORONAL-SHOCK // 04',
    tagline: 'Ominous crimson mothership intrusion, fiery coronal plasma arches & solar shockwaves',
    description: 'Intense crimson, ruby laser grids, and molten solar amber curving across dark planetary shadows.',
    badge: 'RED ALERT',
    glyph: '⎊᚜᚛',
    palette: {
      name: 'Crimson & Solar Amber',
      primaryHex: '#f43f5e',
      secondaryHex: '#f97316',
      accentHex: '#fbbf24',
      darkBg: '#140306',
      cardBg: 'rgba(33, 4, 11, 0.75)',
      cardBorder: 'rgba(244, 63, 94, 0.35)',
      primaryGradient: 'from-rose-500 via-red-500 to-amber-400',
      glowTextClass: 'alien-glow-red',
      glowBoxClass: 'shadow-[0_0_30px_rgba(244,63,94,0.4)]',
      badgeStyle: 'bg-rose-950/70 border-rose-500/50 text-rose-300',
      particleColors: ['#fb7185', '#f87171', '#fb923c', '#fde047'],
      beamColors: ['rgba(244, 63, 94, 0.75)', 'rgba(249, 115, 22, 0.35)', 'rgba(251, 191, 36, 0.05)'],
    },
    visualShape: {
      cardRadius: 'rounded-3xl',
      buttonRadius: 'rounded-full',
      badgeRadius: 'rounded-full',
      curveLabel: 'Coronal Shield Curves',
    },
  },
  {
    id: 'acid-matrix',
    name: 'Acid Xenomorph Core',
    codename: 'BIO-MUTAGEN // 05',
    tagline: 'Phosphorescent radioactive lime, DNA helix spline curves & bio-matrix tendrils',
    description: 'Radioactive toxic lime and deep obsidian fluid droplets creating an eerie extraterrestrial bio-lab atmosphere.',
    badge: 'XENO TOXIN',
    glyph: '⍑⊬⌿',
    palette: {
      name: 'Toxic Lime & Phosphor',
      primaryHex: '#84cc16',
      secondaryHex: '#a3e635',
      accentHex: '#d9f99d',
      darkBg: '#070f02',
      cardBg: 'rgba(14, 28, 4, 0.75)',
      cardBorder: 'rgba(132, 204, 22, 0.35)',
      primaryGradient: 'from-lime-400 via-emerald-400 to-green-300',
      glowTextClass: 'alien-glow-lime',
      glowBoxClass: 'shadow-[0_0_30px_rgba(132,204,22,0.4)]',
      badgeStyle: 'bg-lime-950/70 border-lime-500/50 text-lime-300',
      particleColors: ['#a3e635', '#bef264', '#84cc16', '#d9f99d'],
      beamColors: ['rgba(163, 230, 53, 0.75)', 'rgba(132, 204, 22, 0.35)', 'rgba(101, 163, 13, 0.05)'],
    },
    visualShape: {
      cardRadius: 'rounded-3xl',
      buttonRadius: 'rounded-full',
      badgeRadius: 'rounded-full',
      curveLabel: 'Bio-Organic Liquid Droplets',
    },
  },
  {
    id: 'deep-stardust',
    name: 'Deep Astral Stardust',
    codename: 'CELESTIAL // 06',
    tagline: 'Hyper-deep space sapphire, curved comet paths, floating stardust & celestial rings',
    description: 'Majestic deep indigo and starlight aquamarine with curved gravitational lenses and celestial planetary halos.',
    badge: 'ASTRAL RING',
    glyph: '⍜⎎⍙',
    palette: {
      name: 'Stardust Blue & Aquamarine',
      primaryHex: '#38bdf8',
      secondaryHex: '#6366f1',
      accentHex: '#a5f3fc',
      darkBg: '#03081a',
      cardBg: 'rgba(5, 15, 38, 0.75)',
      cardBorder: 'rgba(56, 189, 248, 0.35)',
      primaryGradient: 'from-sky-400 via-blue-400 to-indigo-300',
      glowTextClass: 'alien-glow-cyan',
      glowBoxClass: 'shadow-[0_0_30px_rgba(56,189,248,0.4)]',
      badgeStyle: 'bg-blue-950/70 border-sky-500/50 text-sky-300',
      particleColors: ['#38bdf8', '#818cf8', '#93c5fd', '#c7d2fe'],
      beamColors: ['rgba(56, 189, 248, 0.75)', 'rgba(99, 102, 241, 0.35)', 'rgba(165, 243, 252, 0.05)'],
    },
    visualShape: {
      cardRadius: 'rounded-3xl',
      buttonRadius: 'rounded-full',
      badgeRadius: 'rounded-full',
      curveLabel: 'Celestial Planetary Halos',
    },
  },
];
