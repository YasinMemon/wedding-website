import React, { useEffect, useRef, useState } from 'react';

export function PetalRain({ active = true, speed = 1 }) {
  const canvasRef = useRef(null);
  const [isEnabled, setIsEnabled] = useState(active);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isEnabled) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Rose petals and golden sparkle particles
    const petalCount = Math.min(28, Math.floor(window.innerWidth / 45));
    const petals = [];

    // Colors: deep crimson rose petal, soft pink petal, golden sparkle
    const petalColors = [
      'rgba(180, 30, 50, 0.55)',   // Deep rose
      'rgba(215, 60, 80, 0.45)',   // Crimson
      'rgba(240, 160, 170, 0.5)',  // Soft pink Mogra/Gulab
      'rgba(212, 175, 55, 0.65)',  // Antique gold dust
      'rgba(235, 205, 120, 0.75)', // Golden sparkle
    ];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 8 + 6,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        speedY: (Math.random() * 0.9 + 0.4) * speed,
        speedX: Math.random() * 0.6 - 0.3,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() * 0.02 - 0.01),
        oscillation: Math.random() * 0.02 + 0.01,
        angle: Math.random() * Math.PI * 2,
        isGold: Math.random() > 0.65,
      });
    }

    const drawPetal = (p) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);

      ctx.fillStyle = p.color;

      if (p.isGold) {
        // Star sparkle or diamond dust
        ctx.beginPath();
        const r = p.size * 0.4;
        ctx.moveTo(0, -r);
        ctx.lineTo(r * 0.3, -r * 0.3);
        ctx.lineTo(r, 0);
        ctx.lineTo(r * 0.3, r * 0.3);
        ctx.lineTo(0, r);
        ctx.lineTo(-r * 0.3, r * 0.3);
        ctx.lineTo(-r, 0);
        ctx.lineTo(-r * 0.3, -r * 0.3);
        ctx.closePath();
        ctx.fill();
      } else {
        // Curved organic rose petal
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(p.size / 2, -p.size / 2, p.size, 0, 0, p.size);
        ctx.bezierCurveTo(-p.size, 0, -p.size / 2, -p.size / 2, 0, 0);
        ctx.closePath();
        ctx.fill();
      }

      ctx.restore();
    };

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.y += p.speedY;
        p.angle += p.oscillation;
        p.x += Math.sin(p.angle) * 0.8 + p.speedX;
        p.rotation += p.rotationSpeed;

        // Reset if off bottom or sides
        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
        if (p.x > canvas.width + 20) p.x = -20;
        if (p.x < -20) p.x = canvas.width + 20;

        drawPetal(p);
      }

      animationFrameId = requestAnimationFrame(update);
    };

    update();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [isEnabled, speed]);

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}

