import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useScrollVideo';

export default function FilmGrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let lastScroll = 0;
    const overlay = canvas.parentElement;
    const c = canvas;
    const cx = ctx;

    function resize() {
      const isMobile = window.innerWidth < 768;
      c.width = isMobile ? Math.floor(window.innerWidth / 4) : window.innerWidth / 2;
      c.height = isMobile ? Math.floor(window.innerHeight / 4) : window.innerHeight / 2;
    }
    resize();
    window.addEventListener('resize', resize);

    function onScroll() {
      const delta = Math.abs(window.scrollY - lastScroll);
      lastScroll = window.scrollY;
      if (overlay) {
        overlay.style.opacity = String(0.03 + Math.min(delta / 16, 3) * 0.015);
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    function render() {
      const w = c.width;
      const h = c.height;
      const imageData = cx.createImageData(w, h);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = 25;
      }
      cx.putImageData(imageData, 0, 0);
      animId = requestAnimationFrame(render);
    }
    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div className="noise-overlay">
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
