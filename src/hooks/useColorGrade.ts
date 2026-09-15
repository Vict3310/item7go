import { useEffect, useRef } from 'react';

export function useColorGrade() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const images = el.querySelectorAll('.color-grade');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          } else {
            entry.target.classList.remove('in-view');
          }
        });
      },
      { threshold: 0.3, rootMargin: '-10% 0px' }
    );

    images.forEach((img) => observer.observe(img));
    return () => observer.disconnect();
  }, []);

  return ref;
}
