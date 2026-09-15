import { useState, useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../hooks/useScrollVideo';

gsap.registerPlugin(ScrollTrigger);

function useCountdown(targetDate: Date) {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    function update() {
      const now = new Date().getTime();
      const diff = targetDate.getTime() - now;
      if (diff <= 0) {
        setTime({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTime({
        hours: Math.floor(diff / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    }
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return time;
}

export default function ChefsSpecial() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  // Target: end of next Sunday at midnight — memoized so the countdown doesn't loop
  const target = useMemo(() => {
    const now = new Date();
    const daysUntilSunday = (7 - now.getDay()) % 7 || 7;
    const d = new Date(now);
    d.setDate(now.getDate() + daysUntilSunday);
    d.setHours(23, 59, 59, 0);
    return d;
  }, []);

  const { hours, minutes, seconds } = useCountdown(target);

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
    <section ref={sectionRef} className="bg-bone py-[clamp(50px,8vh,80px)]" style={{ opacity: reducedMotion ? 1 : 0 }}>
      <div className="max-w-[1440px] mx-auto px-[clamp(18px,3.4vw,44px)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Image */}
          <div className="aspect-[4/5] overflow-hidden bg-ink/5 rounded-2xl">
            <img src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80" alt="Item7Go Platter" className="w-full h-full object-cover" loading="lazy" />
          </div>

          {/* Content */}
          <div>
            <div className="text-[10px] font-medium tracking-[0.22em] uppercase text-spice mb-3">Limited Time</div>
            <h2 className="font-[var(--font-heading)] text-[clamp(32px,4.5vw,56px)] font-bold tracking-tight leading-[0.9] uppercase mb-4">
              CHEF'S<br />SPECIAL
            </h2>
            <h3 className="text-xl font-semibold mb-3">Item7Go Platter</h3>
            <p className="text-earth-light text-sm leading-relaxed max-w-[40ch] mb-6">
              Our signature sharing platter with jollof rice, suya, fried plantain, moi moi, and a bottle of zobo. Feeds 2-3 people.
            </p>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-[var(--font-heading)] text-3xl font-bold text-warm">₦12,000</span>
              <span className="text-mid text-sm line-through">₦15,500</span>
              <span className="bg-spice text-white text-[10px] font-bold px-2 py-1 uppercase">23% off</span>
            </div>

            {/* Countdown */}
            <div className="mb-8">
              <div className="text-[10px] font-medium tracking-[0.22em] uppercase text-mid mb-3">Offer ends in</div>
              <div className="flex gap-4">
                {[
                  { val: hours, label: 'Hours' },
                  { val: minutes, label: 'Mins' },
                  { val: seconds, label: 'Secs' },
                ].map((t) => (
                  <div key={t.label} className="text-center">
                    <div className={`bg-ink text-white w-16 h-16 rounded-2xl flex items-center justify-center font-[var(--font-heading)] text-2xl font-bold countdown-digit ${t.label === 'Secs' ? 'pulse' : ''}`} key={`${t.label}-${t.val}`}>
                      {String(t.val).padStart(2, '0')}
                    </div>
                    <div className="text-[10px] text-mid mt-1 uppercase tracking-wider">{t.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <a href="/menu" className="shimmer-btn bg-brand-yellow text-ink px-8 py-4 text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-brand-yellow-light transition-colors inline-block rounded-full">
              Order the Special
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
