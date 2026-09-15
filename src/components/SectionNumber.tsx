import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useScrollVideo';

interface Props {
  number: string;
  className?: string;
}

export default function SectionNumber({ number, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !ref.current) return;
    const el = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('in-view');
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <div ref={ref} className={`section-number ${className}`}>
      {number}
    </div>
  );
}
