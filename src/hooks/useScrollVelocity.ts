import { useEffect, useState, useRef } from 'react';

export function useScrollVelocity() {
  const [velocity, setVelocity] = useState(0);
  const lastScroll = useRef(0);
  const lastTime = useRef(performance.now());
  const rafId = useRef(0);

  useEffect(() => {
    let running = true;

    function onScroll() {
      if (!running) return;
      const now = performance.now();
      const dt = now - lastTime.current;
      if (dt > 0) {
        const speed = Math.abs(window.scrollY - lastScroll.current) / dt;
        setVelocity(Math.min(speed * 16, 5)); // normalize to 0-5 range
      }
      lastScroll.current = window.scrollY;
      lastTime.current = now;
    }

    // Decay velocity when not scrolling
    function decay() {
      setVelocity((v) => (v > 0.01 ? v * 0.92 : 0));
      rafId.current = requestAnimationFrame(decay);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    rafId.current = requestAnimationFrame(decay);

    return () => {
      running = false;
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Map velocity (0-5) to scale (0.98-1.04)
  const scale = 1 + (velocity / 5) * 0.04 - (velocity < 0.1 ? 0 : 0.02);

  return { velocity, scale };
}
