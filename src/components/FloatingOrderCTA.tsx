import { useEffect, useState } from 'react';

export default function FloatingOrderCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > window.innerHeight);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      href="/menu"
      className={`fixed bottom-4 left-4 right-4 z-[50] bg-brand-yellow text-ink py-4 text-center text-[11px] font-medium tracking-[0.2em] uppercase shadow-lg rounded-full transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      Order Now
    </a>
  );
}
