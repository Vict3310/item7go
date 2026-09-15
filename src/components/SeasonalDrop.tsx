import { useState, useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../hooks/useScrollVideo';

gsap.registerPlugin(ScrollTrigger);

const newMenuItems = [
  { name: 'Coconut Jollof', price: 5500, image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400&q=80', tag: 'New' },
  { name: 'Grilled Tilapia Pepper', price: 7000, image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=400&q=80', tag: 'New' },
  { name: 'Spicy Goat Soup', price: 6000, image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80', tag: 'New' },
  { name: 'Plantain Fries Platter', price: 3500, image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&q=80', tag: 'New' },
];

function useCountdown(target: Date) {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) { setTime({ d: 0, h: 0, m: 0, s: 0 }); return; }
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return time;
}

export default function SeasonalDrop() {
  const [revealed, setRevealed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  // Set drop date to next Friday — memoized
  const dropDate = useMemo(() => {
    const now = new Date();
    const daysUntilFriday = (5 - now.getDay() + 7) % 7 || 7;
    const d = new Date(now);
    d.setDate(now.getDate() + daysUntilFriday);
    d.setHours(12, 0, 0, 0);
    return d;
  }, []);

  const { d, h, m, s } = useCountdown(dropDate);
  const isLive = d === 0 && h === 0 && m === 0 && s === 0;

  useEffect(() => {
    if (reducedMotion) return;
    const el = sectionRef.current;
    if (!el) return;
    gsap.fromTo(el, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
    });
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className="bg-earth text-white py-[clamp(50px,8vh,100px)]" style={{ opacity: reducedMotion ? 1 : 0 }}>
      <div className="max-w-[1440px] mx-auto px-[clamp(18px,3.4vw,44px)]">
        <div className="text-center mb-12">
          <div className="text-[10px] font-medium tracking-[0.22em] uppercase text-warm mb-3">Coming Soon</div>
          <h2 className="font-[var(--font-heading)] text-[clamp(36px,5vw,64px)] font-bold tracking-tight leading-none uppercase mb-3">
            NEW MENU DROP
          </h2>
          <p className="text-white/50 text-sm max-w-[40ch] mx-auto">
            {isLive ? 'The new menu is here!' : `Launching Friday at 12 PM. Set your reminder.`}
          </p>
        </div>

        {/* Countdown or reveal */}
        {!isLive && !revealed ? (
          <div className="flex justify-center gap-3 sm:gap-6 mb-12">
            {[
              { val: d, label: 'Days' },
              { val: h, label: 'Hours' },
              { val: m, label: 'Mins' },
              { val: s, label: 'Secs' },
            ].map((t) => (
              <div key={t.label} className="text-center">
                <div className="bg-white/10 backdrop-blur-sm w-14 h-14 sm:w-20 sm:h-20 flex items-center justify-center font-[var(--font-heading)] text-2xl sm:text-3xl font-bold">
                  {String(t.val).padStart(2, '0')}
                </div>
                <div className="text-[10px] text-white/40 mt-2 uppercase tracking-wider">{t.label}</div>
              </div>
            ))}
          </div>
        ) : null}

        {/* Items — always visible or after reveal */}
        {(isLive || revealed) && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {newMenuItems.map((item) => (
              <div key={item.name} className="bg-white/5 border border-white/8 overflow-hidden group">
                <div className="aspect-square overflow-hidden relative">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                  <span className="absolute top-3 left-3 bg-warm text-ink text-[9px] font-bold tracking-[0.1em] uppercase px-2 py-1">{item.tag}</span>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold">{item.name}</h3>
                  <div className="text-warm text-sm font-bold mt-1">₦{item.price.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLive && !revealed && (
          <div className="text-center">
            <button
              onClick={() => setRevealed(true)}
              className="border border-white/20 text-white px-8 py-3 text-[11px] font-medium tracking-[0.16em] uppercase hover:bg-white/5 transition-colors"
            >
              Preview the Menu
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
