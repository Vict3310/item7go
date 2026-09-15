import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useScrollVideo';

interface Particle {
  x: number; y: number; vx: number; vy: number; size: number; color: string;
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let mouse = { x: -1000, y: -1000 };

    const c = canvas;
    const cx = ctx;

    function resize() {
      c.width = window.innerWidth;
      c.height = window.innerHeight;
    }
    resize();

    const colors = ['#D4200E', '#FFD100', '#E8432E', '#FFE04D'];
    const isMobile = window.innerWidth < 768;
    const particles: Particle[] = [];
    const count = isMobile ? Math.min(20, Math.floor(window.innerWidth / 40)) : Math.min(60, Math.floor(window.innerWidth / 20));

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * c.width,
        y: Math.random() * c.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const onMouseMove = (e: MouseEvent) => { mouse = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);

    function render() {
      cx.clearRect(0, 0, c.width, c.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > c.width) p.vx *= -1;
        if (p.y < 0 || p.y > c.height) p.vy *= -1;

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120 * 0.02;
          p.vx += dx * force;
          p.vy += dy * force;
        }

        p.vx *= 0.99;
        p.vy *= 0.99;

        cx.beginPath();
        cx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        cx.fillStyle = p.color;
        cx.globalAlpha = 0.6;
        cx.fill();
      }

      cx.globalAlpha = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            cx.beginPath();
            cx.moveTo(particles[i].x, particles[i].y);
            cx.lineTo(particles[j].x, particles[j].y);
            cx.strokeStyle = particles[i].color;
            cx.globalAlpha = (1 - dist / 150) * 0.15;
            cx.lineWidth = 0.5;
            cx.stroke();
          }
        }
      }
      cx.globalAlpha = 1;

      animId = requestAnimationFrame(render);
    }
    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.4 }}
    />
  );
}
