import { useEffect, useRef, useState } from 'react';

const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export function useTextScramble(text: string, trigger = true) {
  const [display, setDisplay] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trigger || !ref.current) return;
    const el = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          scramble();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [trigger, text]);

  function scramble() {
    const length = text.length;
    const iterations = length * 2;
    let frame = 0;

    function tick() {
      let result = '';
      for (let i = 0; i < length; i++) {
        if (i < frame / 2) {
          result += text[i];
        } else if (text[i] === ' ') {
          result += ' ';
        } else {
          result += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      setDisplay(result);
      frame++;
      if (frame <= iterations) {
        requestAnimationFrame(tick);
      }
    }
    tick();
  }

  return { ref, display: display || text };
}
