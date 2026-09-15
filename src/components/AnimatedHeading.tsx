import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useScrollVideo';

interface Props {
  text: string;
  tag?: 'h1' | 'h2' | 'h3';
  className?: string;
  delay?: number;
}

export default function AnimatedHeading({ text, tag = 'h2', className = '', delay = 0 }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !ref.current) return;
    const el = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add('animate');
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, reducedMotion]);

  const Tag = tag;
  const words = text.split(' ');

  return (
    <Tag ref={ref as React.Ref<HTMLHeadingElement>} className={`letter-stagger ${className}`}>
      {words.map((word, wi) => (
        <span key={wi}>
          {word.split('').map((char, ci) => (
            <span
              key={ci}
              style={{ transitionDelay: `${(wi * word.length + ci) * 30 + delay}ms` }}
            >
              {char}
            </span>
          ))}
          {wi < words.length - 1 && ' '}
        </span>
      ))}
    </Tag>
  );
}
