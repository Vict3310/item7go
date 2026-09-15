import { useEffect, useRef, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface UseScrollVideoOptions {
  videoRef: RefObject<HTMLVideoElement | null>;
  containerRef: RefObject<HTMLDivElement | null>;
  containerHeight?: string;
  start?: string;
  end?: string;
  onProgress?: (progress: number) => void;
}

export function useScrollVideo({
  videoRef,
  containerRef,
  containerHeight = '300vh',
  start = 'top top',
  end = 'bottom bottom',
  onProgress,
}: UseScrollVideoOptions) {
  const rafId = useRef<number>(0);
  const lastTime = useRef<number>(0);
  const isReady = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    container.style.height = containerHeight;

    video.addEventListener('loadedmetadata', () => {
      isReady.current = true;
    });

    // Use GSAP ScrollTrigger to map scroll progress to video time
    const st = ScrollTrigger.create({
      trigger: container,
      start,
      end,
      scrub: true,
      onUpdate: (self) => {
        if (!isReady.current && video.readyState >= 1) {
          isReady.current = true;
        }
        if (!isReady.current) return;

        const progress = self.progress;
        const targetTime = progress * video.duration;

        // Smooth lerp to target time using rAF
        const lerp = (current: number, target: number, factor: number) =>
          current + (target - current) * factor;

        const animate = (timestamp: number) => {
          if (!lastTime.current) lastTime.current = timestamp;
          const deltaTime = timestamp - lastTime.current;

          if (deltaTime > 0) {
            const newTime = lerp(video.currentTime, targetTime, 0.15);
            // Only update if difference is meaningful
            if (Math.abs(newTime - video.currentTime) > 0.01) {
              video.currentTime = newTime;
            }
          }

          lastTime.current = timestamp;

          // Continue animation if not close enough
          if (Math.abs(video.currentTime - targetTime) > 0.01) {
            rafId.current = requestAnimationFrame(animate);
          }
        };

        cancelAnimationFrame(rafId.current);
        rafId.current = requestAnimationFrame(animate);

        onProgress?.(progress);
      },
    });

    return () => {
      st.kill();
      cancelAnimationFrame(rafId.current);
    };
  }, [containerRef, videoRef, containerHeight, start, end, onProgress]);

  return { ScrollTrigger };
}

export function useReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
