/**
 * General purpose sound player for themed UI feedback
 */
export function playAlienSound(type: 'bio-pulse' | 'transmission' | 'click' = 'click') {
  switch (type) {
    case 'bio-pulse':
      playAlienClickSound(520);
      break;
    case 'transmission':
      playAlienDecodeSound();
      break;
    case 'click':
    default:
      playAlienClickSound(880);
      break;
  }
}


let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

/**
 * Play a futuristic UI alien click / chirp
 */
export function playAlienClickSound(frequency = 880) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(frequency * 1.8, ctx.currentTime + 0.06);
    osc.frequency.exponentialRampToValueAtTime(frequency * 0.5, ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.12);
  } catch (e) {
    // Ignore audio errors
  }
}

/**
 * Play an alien transmission decode chirp
 */
export function playAlienDecodeSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    for (let i = 0; i < 4; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600 + Math.random() * 1200, now + i * 0.03);
      
      gain.gain.setValueAtTime(0.08, now + i * 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + (i + 1) * 0.03);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + i * 0.03);
      osc.stop(now + (i + 1) * 0.03);
    }
  } catch (e) {}
}

