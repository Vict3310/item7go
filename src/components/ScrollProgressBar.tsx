import { useEffect, useRef } from 'react';

export default function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onScroll() {
      const bar = barRef.current;
      const hero = document.getElementById('cinematic-hero');
      if (!bar || !hero) return;
      const rect = hero.getBoundingClientRect();
      const scrollHeight = hero.offsetHeight - window.innerHeight;
      if (scrollHeight <= 0) return;
      const progress = Math.max(0, Math.min(1, -rect.top / scrollHeight));
      bar.style.transform = `scaleX(${progress})`;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 h-[3px] bg-warm z-[60] origin-left"
      style={{ transform: 'scaleX(0)', willChange: 'transform' }}
    />
  );
}
