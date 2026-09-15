import { type ReactNode, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../hooks/useScrollVideo';

interface Props {
  children: ReactNode;
  className?: string;
}

export default function CurtainReveal({ children, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setOpen(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOpen(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Curtains */}
      <div className={`curtain-left ${open ? 'curtain-open' : ''}`} />
      <div className={`curtain-right ${open ? 'curtain-open' : ''}`} />
      {/* Content */}
      <div className={`transition-opacity duration-700 ${open ? 'opacity-100' : 'opacity-0'}`}>
        {children}
      </div>
    </div>
  );
}
