import { useEffect, useRef, useState } from 'react';

interface Props {
  target: number;
  prefix?: string;
  suffix?: string;
  label: string;
  duration?: number;
}

export default function OvershootCounter({ target, prefix = '', suffix = '', label, duration = 1400 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState('0');
  const [bouncing, setBouncing] = useState(false);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || animated.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const start = performance.now();

          const tick = (now: number) => {
            const progress = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - progress, 3);
            // Overshoot: go 8% past then settle
            const overshoot = progress > 0.85 ? 1 + (1 - progress) * 0.08 : eased;
            const displayVal = Math.round(target * overshoot);

            setDisplay(displayVal.toLocaleString());

            if (progress < 1) {
              requestAnimationFrame(tick);
            } else {
              setDisplay(target.toLocaleString());
              setBouncing(true);
              setTimeout(() => setBouncing(false), 500);
            }
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <div ref={ref}>
      <div className={`font-[var(--font-heading)] text-[clamp(32px,4vw,56px)] font-bold leading-none text-brand-red ${bouncing ? 'counter-bounce' : ''}`}>
        {prefix}{display}{suffix}
      </div>
      <div className="text-[11px] tracking-[0.14em] uppercase text-mid mt-2">
        {label}
      </div>
    </div>
  );
}
