import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../hooks/useScrollVideo';

gsap.registerPlugin(ScrollTrigger);

const ingredients = [
  { emoji: '🌶️', x: '10%', y: '20%', size: 40, speed: -30, delay: 0 },
  { emoji: '🍅', x: '85%', y: '15%', size: 36, speed: -20, delay: 0.5 },
  { emoji: '🧅', x: '75%', y: '70%', size: 32, speed: -40, delay: 1 },
  { emoji: '🫚', x: '15%', y: '75%', size: 28, speed: -15, delay: 1.5 },
  { emoji: '🌿', x: '50%', y: '10%', size: 34, speed: -25, delay: 0.3 },
  { emoji: '🍋', x: '90%', y: '45%', size: 30, speed: -35, delay: 0.8 },
];

export default function FloatingIngredients() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const container = containerRef.current;
    if (!container) return;

    const els = container.querySelectorAll('.ingredient');
    els.forEach((el, i) => {
      const speed = ingredients[i]?.speed || -20;
      gsap.to(el, {
        y: speed,
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      // Gentle floating bob
      gsap.to(el, {
        y: '+=8',
        duration: 2 + i * 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });

    return () => { ScrollTrigger.getAll().forEach((st) => st.kill()); };
  }, [reducedMotion]);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      {ingredients.map((ing, i) => (
        <div
          key={i}
          className="ingredient absolute"
          style={{
            left: ing.x,
            top: ing.y,
            fontSize: ing.size,
            opacity: 0.25,
            filter: 'blur(0.5px)',
          }}
        >
          {ing.emoji}
        </div>
      ))}
    </div>
  );
}
