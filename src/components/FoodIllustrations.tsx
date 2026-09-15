import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useScrollVideo';

interface Props {
  type: 'jollof' | 'suya' | 'plantain';
  className?: string;
  size?: number;
  color?: string;
}

const paths: Record<string, string> = {
  jollof: 'M20 80 Q20 40 50 30 Q80 40 80 80 Z M15 80 L85 80 M10 85 Q50 95 90 85', // Pot
  suya: 'M50 10 L50 90 M30 25 Q50 20 70 25 M30 40 Q50 35 70 40 M30 55 Q50 50 70 55 M30 70 Q50 65 70 70', // Skewer
  plantain: 'M25 70 Q20 40 35 20 Q50 10 65 20 Q80 40 75 70 Q50 80 25 70 M35 30 Q50 25 65 30', // Plantain
};

export default function FoodIllustrations({ type, className = '', size = 100, color = 'var(--color-brand-yellow)' }: Props) {
  const ref = useRef<SVGSVGElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !ref.current) return;
    const svg = ref.current;
    const pathEls = svg.querySelectorAll('path');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          pathEls.forEach((path, i) => {
            const length = (path as SVGPathElement).getTotalLength();
            (path as SVGPathElement).style.strokeDasharray = String(length);
            (path as SVGPathElement).style.strokeDashoffset = String(length);
            (path as SVGPathElement).style.transition = `stroke-dashoffset ${0.8 + i * 0.3}s cubic-bezier(0.22, 0.61, 0.36, 1) ${i * 0.15}s`;
            requestAnimationFrame(() => {
              (path as SVGPathElement).style.strokeDashoffset = '0';
            });
          });
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(svg);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <svg
      ref={ref}
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {paths[type]?.split(' ').filter(s => s.startsWith('M') || s.startsWith('Q')).length ? (
        <path d={paths[type]} />
      ) : (
        paths[type]?.split(/(?=M)/).filter(Boolean).map((d, i) => (
          <path key={i} d={d.trim()} />
        ))
      )}
    </svg>
  );
}
