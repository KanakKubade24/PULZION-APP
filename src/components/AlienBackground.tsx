import React, { useEffect, useRef } from 'react';

export const AlienBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // EXACT ALIEN PLANET NEBULA PALETTE:
    // #571c56: Deep Nebula Purple
    // #25245d: Cosmic Midnight Indigo
    // #1a5678: Deep Nebula Ocean Teal
    // #159097: Vivid Alien Cyan Aurora
    // #38a48c: Emerald Jade / Sea Green
    // #f8d092: Warm Starlight Gold / Amber Stardust

    // 1. Ultra-dense micro star dust field
    const microStarCount = Math.floor((width * height) / 340);
    const microStars = Array.from({ length: microStarCount }, () => {
      const colorRoll = Math.random();
      const hue = colorRoll < 0.35 
        ? '248, 208, 146' // #f8d092 gold
        : colorRoll < 0.65
        ? '21, 144, 151'  // #159097 cyan
        : colorRoll < 0.85
        ? '56, 164, 140'  // #38a48c jade
        : '235, 245, 255'; // crisp white stardust

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 0.75 + 0.25,
        alpha: Math.random() * 0.75 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        hue,
      };
    });

    // 2. Medium & Bright prominent nebula stars with diffraction spikes
    const brightStarCount = Math.floor((width * height) / 2000);
    const brightStars = Array.from({ length: brightStarCount }, () => {
      const isSuperBright = Math.random() < 0.28;
      const colorRoll = Math.random();

      const hue = colorRoll < 0.4
        ? '248, 208, 146' // Starlight gold #f8d092
        : colorRoll < 0.7
        ? '21, 144, 151'  // Alien cyan #159097
        : colorRoll < 0.88
        ? '56, 164, 140'  // Alien sea green #38a48c
        : '220, 190, 255'; // Purple glow

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: isSuperBright ? Math.random() * 1.6 + 1.3 : Math.random() * 0.9 + 0.8,
        baseAlpha: isSuperBright ? Math.random() * 0.4 + 0.6 : Math.random() * 0.4 + 0.4,
        twinkleSpeed: Math.random() * 0.035 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
        hue,
        isSuperBright,
        spikeLength: isSuperBright ? Math.random() * 8 + 4 : 0,
      };
    });

    // 3. Dense Stellar Clusters / Constellation Nodes
    const clusterCenters = [
      { x: width * 0.22, y: height * 0.2, count: 50, radius: 190 },
      { x: width * 0.78, y: height * 0.26, count: 70, radius: 240 },
      { x: width * 0.85, y: height * 0.72, count: 55, radius: 210 },
      { x: width * 0.32, y: height * 0.8, count: 45, radius: 180 },
      { x: width * 0.52, y: height * 0.42, count: 40, radius: 160 },
    ];

    const clusterStars = clusterCenters.flatMap((cluster) =>
      Array.from({ length: cluster.count }, () => {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.pow(Math.random(), 1.6) * cluster.radius;
        const colorRoll = Math.random();
        const hue = colorRoll < 0.45 
          ? '248, 208, 146' // Gold
          : colorRoll < 0.8
          ? '21, 144, 151'  // Cyan
          : '255, 255, 255';

        return {
          x: cluster.x + Math.cos(angle) * dist,
          y: cluster.y + Math.sin(angle) * dist,
          radius: Math.random() * 1.1 + 0.35,
          baseAlpha: Math.random() * 0.65 + 0.35,
          twinkleSpeed: Math.random() * 0.03 + 0.01,
          twinklePhase: Math.random() * Math.PI * 2,
          hue,
        };
      })
    );

    // 4. Shooting Stars / Ion Meteors
    const shootingStars: Array<{
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      alpha: number;
      active: boolean;
      delay: number;
      width: number;
      color: string;
    }> = Array.from({ length: 7 }, (_, index) => ({
      x: 0,
      y: 0,
      length: 0,
      speed: 0,
      angle: 0,
      alpha: 0,
      active: false,
      delay: Math.floor(Math.random() * 150) + index * 35,
      width: 1.6,
      color: '248, 208, 146',
    }));

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Deep space void gradient: #050716 (cosmic indigo/teal blend) to #0c0817 (#571c56 purple depth)
      const bgGrad = ctx.createLinearGradient(0, 0, width * 0.3, height);
      bgGrad.addColorStop(0, '#040814');      // Deep Void Navy (#1a5678 shadow)
      bgGrad.addColorStop(0.35, '#060b1c');   // Cosmic Indigo (#25245d shadow)
      bgGrad.addColorStop(0.7, '#0c0718');    // Deep Purple Shadow (#571c56 depth)
      bgGrad.addColorStop(1, '#03060e');

      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // NEBULA CLOUD 1: Vibrant Teal Cyan & Emerald Aurora (#159097 & #38a48c)
      const nebula1 = ctx.createRadialGradient(
        width * 0.72,
        height * 0.28,
        30,
        width * 0.72,
        height * 0.28,
        Math.max(width, height) * 0.6
      );
      nebula1.addColorStop(0, 'rgba(21, 144, 151, 0.38)'); // #159097
      nebula1.addColorStop(0.35, 'rgba(56, 164, 140, 0.22)'); // #38a48c
      nebula1.addColorStop(0.7, 'rgba(26, 86, 120, 0.12)'); // #1a5678
      nebula1.addColorStop(1, 'transparent');
      ctx.fillStyle = nebula1;
      ctx.fillRect(0, 0, width, height);

      // NEBULA CLOUD 2: Starlight Amber & Gold Core Glow (#f8d092)
      const nebulaGold = ctx.createRadialGradient(
        width * 0.65,
        height * 0.32,
        10,
        width * 0.65,
        height * 0.32,
        Math.max(width, height) * 0.32
      );
      nebulaGold.addColorStop(0, 'rgba(248, 208, 146, 0.28)'); // #f8d092
      nebulaGold.addColorStop(0.4, 'rgba(248, 208, 146, 0.1)');
      nebulaGold.addColorStop(1, 'transparent');
      ctx.fillStyle = nebulaGold;
      ctx.fillRect(0, 0, width, height);

      // NEBULA CLOUD 3: Deep Royal Purple & Cosmic Indigo Accretion (#571c56 & #25245d)
      const nebulaPurple = ctx.createRadialGradient(
        width * 0.25,
        height * 0.68,
        25,
        width * 0.25,
        height * 0.68,
        Math.max(width, height) * 0.55
      );
      nebulaPurple.addColorStop(0, 'rgba(87, 28, 86, 0.35)');  // #571c56
      nebulaPurple.addColorStop(0.45, 'rgba(37, 36, 93, 0.25)'); // #25245d
      nebulaPurple.addColorStop(0.8, 'rgba(26, 86, 120, 0.08)');
      nebulaPurple.addColorStop(1, 'transparent');
      ctx.fillStyle = nebulaPurple;
      ctx.fillRect(0, 0, width, height);

      // 1. Draw Micro Star Dust Field
      microStars.forEach((star) => {
        const twinkle = Math.sin(frame * star.twinkleSpeed + star.twinklePhase) * 0.35 + 0.65;
        ctx.fillStyle = `rgba(${star.hue}, ${star.alpha * twinkle})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 2. Draw Dense Cluster Stars
      clusterStars.forEach((star) => {
        const twinkle = Math.sin(frame * star.twinkleSpeed + star.twinklePhase) * 0.4 + 0.6;
        ctx.fillStyle = `rgba(${star.hue}, ${star.baseAlpha * twinkle})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Draw Bright Prominent Stars with Halo & Cross-Spikes
      brightStars.forEach((star) => {
        const twinkle = Math.sin(frame * star.twinkleSpeed + star.twinklePhase) * 0.35 + 0.65;
        const currentAlpha = star.baseAlpha * twinkle;

        // Core star
        ctx.fillStyle = `rgba(${star.hue}, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        // Atmospheric halo
        ctx.fillStyle = `rgba(${star.hue}, ${currentAlpha * 0.3})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius * 3.4, 0, Math.PI * 2);
        ctx.fill();

        // 4-point star diffraction spikes
        if (star.isSuperBright && star.spikeLength > 0) {
          ctx.strokeStyle = `rgba(${star.hue}, ${currentAlpha * 0.45})`;
          ctx.lineWidth = 0.85;
          ctx.beginPath();
          ctx.moveTo(star.x - star.spikeLength, star.y);
          ctx.lineTo(star.x + star.spikeLength, star.y);
          ctx.moveTo(star.x, star.y - star.spikeLength);
          ctx.lineTo(star.x, star.y + star.spikeLength);
          ctx.stroke();
        }
      });

      // 4. Render Active Shooting Stars / Meteors
      shootingStars.forEach((meteor) => {
        if (!meteor.active) {
          meteor.delay--;
          if (meteor.delay <= 0) {
            meteor.active = true;
            meteor.x = Math.random() * width * 1.1 - width * 0.05;
            meteor.y = Math.random() * height * 0.75;
            meteor.length = Math.random() * 130 + 70;
            meteor.speed = Math.random() * 10 + 8;
            meteor.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.35;
            meteor.alpha = 1;
            meteor.width = Math.random() < 0.35 ? 2.2 : 1.5;
            meteor.color = Math.random() < 0.5 ? '248, 208, 146' : '21, 144, 151';
          }
        } else {
          const tailX = meteor.x - Math.cos(meteor.angle) * meteor.length;
          const tailY = meteor.y - Math.sin(meteor.angle) * meteor.length;

          const meteorGrad = ctx.createLinearGradient(meteor.x, meteor.y, tailX, tailY);
          meteorGrad.addColorStop(0, `rgba(${meteor.color}, ${meteor.alpha})`);
          meteorGrad.addColorStop(0.4, `rgba(56, 164, 140, ${meteor.alpha * 0.6})`);
          meteorGrad.addColorStop(1, 'transparent');

          ctx.beginPath();
          ctx.moveTo(meteor.x, meteor.y);
          ctx.lineTo(tailX, tailY);
          ctx.strokeStyle = meteorGrad;
          ctx.lineWidth = meteor.width;
          ctx.lineCap = 'round';
          ctx.stroke();

          // Sparkle head
          ctx.fillStyle = `rgba(255, 255, 255, ${meteor.alpha})`;
          ctx.beginPath();
          ctx.arc(meteor.x, meteor.y, meteor.width * 1.3, 0, Math.PI * 2);
          ctx.fill();

          meteor.x += Math.cos(meteor.angle) * meteor.speed;
          meteor.y += Math.sin(meteor.angle) * meteor.speed;
          meteor.alpha -= 0.014;

          if (meteor.alpha <= 0 || meteor.x > width + 100 || meteor.y > height + 100) {
            meteor.active = false;
            meteor.delay = Math.floor(Math.random() * 180) + 40;
          }
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
