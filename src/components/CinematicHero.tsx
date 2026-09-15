import { useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useReducedMotion } from '../hooks/useScrollVideo';

interface StoryBlock {
  id: string;
  text: string;
  subtitle?: string;
  showAt: number;
  hideAt: number;
  position: 'left' | 'right';
}

const storyBlocks: StoryBlock[] = [
  { id: 'welcome', text: 'WELCOME TO', subtitle: 'ITEM7GO', showAt: 0.02, hideAt: 0.14, position: 'left' },
  { id: 'nigerian', text: 'Nigerian food.', subtitle: 'Made for everyone.', showAt: 0.16, hideAt: 0.28, position: 'right' },
  { id: 'come-inside', text: 'COME INSIDE.', subtitle: 'A taste of Nigeria, beyond the ordinary.', showAt: 0.32, hideAt: 0.46, position: 'left' },
  { id: 'this-is', text: 'THIS IS', subtitle: 'ITEM7GO.', showAt: 0.50, hideAt: 0.62, position: 'right' },
  { id: 'atmosphere', text: 'MORE THAN A MEAL.', subtitle: "It's an experience.", showAt: 0.64, hideAt: 0.76, position: 'left' },
  { id: 'hungry', text: 'COME HUNGRY.', subtitle: 'LEAVE HAPPY.', showAt: 0.78, hideAt: 0.86, position: 'right' },
  { id: 'ready', text: 'READY TO EAT?', subtitle: '', showAt: 0.88, hideAt: 0.97, position: 'left' },
];

function updateTextOverlays(
  blocks: StoryBlock[],
  refs: Map<string, HTMLDivElement>,
  progress: number
) {
  blocks.forEach((block) => {
    const el = refs.get(block.id);
    if (!el) return;

    const { showAt, hideAt } = block;
    const mid = (showAt + hideAt) / 2;

    if (progress >= showAt && progress <= hideAt) {
      let opacity: number;
      let translateY: number;

      if (progress < mid) {
        const t = (progress - showAt) / (mid - showAt);
        opacity = t;
        translateY = (1 - t) * 20;
      } else {
        const t = (progress - mid) / (hideAt - mid);
        opacity = 1 - t;
        translateY = -t * 20;
      }

      el.style.opacity = String(Math.max(0, Math.min(1, opacity)));
      el.style.transform = `translateY(${translateY}px)`;
    } else {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
    }
  });
}

function getCurrentSideText(progress: number): string {
  if (progress < 0.02) return 'ITEM7GO';
  if (progress < 0.14) return 'WELCOME';
  if (progress < 0.28) return 'NIGERIAN FOOD';
  if (progress < 0.46) return 'COME INSIDE';
  if (progress < 0.62) return 'THIS IS IT';
  if (progress < 0.76) return 'EXPERIENCE';
  if (progress < 0.97) return 'DINNING';
  return 'ORDER NOW';
}

export default function CinematicHero() {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const sideProgressRef = useRef<HTMLDivElement>(null);
  const sideLabelRef = useRef<HTMLDivElement>(null);
  const heroIntroRef = useRef<HTMLDivElement>(null);

  const setTextRef = useCallback((id: string, el: HTMLDivElement | null) => {
    if (el) textRefs.current.set(id, el);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    const cont = container;
    const vid = video;

    vid.muted = true;
    vid.playsInline = true;
    vid.preload = 'auto';
    vid.loop = true;

    function onScroll() {
      const rect = cont.getBoundingClientRect();
      const scrollHeight = cont.offsetHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / scrollHeight));

      updateTextOverlays(storyBlocks, textRefs.current, progress);

      // Fade out hero intro as user scrolls
      if (heroIntroRef.current) {
        const fadeOut = Math.max(0, 1 - progress * 4);
        heroIntroRef.current.style.opacity = String(fadeOut);
        heroIntroRef.current.style.transform = `translateY(${-progress * 50}px)`;
      }

      // Side progress
      if (sideProgressRef.current) {
        const indicator = sideProgressRef.current.querySelector('.side-progress-fill');
        const counter = sideProgressRef.current.querySelector('.side-progress-counter');
        if (indicator) (indicator as HTMLElement).style.height = `${progress * 100}%`;
        if (counter) (counter as HTMLElement).textContent = `${Math.round(progress * 100)}%`;
      }

      // Side label
      if (sideLabelRef.current) {
        const label = sideLabelRef.current.querySelector('.side-label-text');
        if (label) (label as HTMLElement).textContent = getCurrentSideText(progress);
      }
    }

    vid.play().catch(() => {});
    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <section id="cinematic-hero" className="relative bg-ink">
        <div className="h-screen flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="font-[var(--font-heading)] text-5xl md:text-7xl font-bold tracking-tight mb-4">
              WELCOME TO<br />ITEM7GO
            </h1>
            <p className="text-white/60 text-lg tracking-wide">Nigerian food. Made for everyone.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="cinematic-hero" ref={containerRef} className="relative" style={{ height: '300vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-ink">
        <video ref={videoRef} className="w-full h-full object-cover" muted playsInline preload="auto">
          <source src="/inside-web.mp4" type="video/mp4" />
        </video>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-black/80 md:from-black/70 md:via-transparent md:to-black/70 pointer-events-none" />

        {/* Side-intro text — visible on page load, on the left */}
        <div
          ref={heroIntroRef}
          className="absolute inset-0 flex items-center z-10 pointer-events-none px-4 md:px-[clamp(18px,3.4vw,44px)]"
        >
          <div className="max-w-[300px] md:max-w-[360px]">
            <div className="text-[9px] md:text-[10px] font-medium tracking-[0.22em] uppercase text-brand-yellow/60 mb-2 md:mb-3">
              Premium Nigerian Cuisine
            </div>
            <h1 className="font-[var(--font-heading)] text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[0.95] text-white">
              WELCOME TO<br />
              <span className="text-brand-yellow">ITEM7</span><span className="text-brand-red">GO</span>
            </h1>
            <p className="text-white/50 text-xs md:text-sm lg:text-base tracking-wide mt-2 md:mt-3 leading-relaxed">
              Authentic Nigerian food made for everyone. Jollof, suya, egusi, and more.
            </p>
            <div className="flex flex-wrap gap-2 md:gap-3 mt-4 md:mt-6">
              <Link to="/menu" className="bg-brand-yellow text-ink px-4 md:px-5 py-2 md:py-2.5 text-[9px] md:text-[10px] font-medium tracking-[0.18em] uppercase hover:bg-brand-yellow-light transition-colors duration-300 rounded-full">
                Explore the Menu
              </Link>
              <Link to="/locations" className="border border-brand-yellow/40 text-brand-yellow px-4 md:px-5 py-2 md:py-2.5 text-[9px] md:text-[10px] font-medium tracking-[0.18em] uppercase hover:bg-brand-yellow/10 transition-colors duration-300 rounded-full">
                Find a Location
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll-triggered text blocks */}
        {storyBlocks.map((block) => (
          <div
            key={block.id}
            ref={(el) => setTextRef(block.id, el)}
            className={`absolute inset-0 flex items-center z-10 pointer-events-none px-6 md:px-0 ${
              block.position === 'left'
                ? 'md:left-0 md:pl-[clamp(24px,5vw,80px)] md:justify-start justify-center'
                : 'md:right-0 md:pr-[clamp(24px,5vw,80px)] md:justify-end justify-center md:text-right text-center'
            }`}
            style={{ opacity: 0 }}
          >
            <div className="max-w-[420px]">
              <h2 className="text-white font-[var(--font-heading)] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[0.95]">
                {block.text}
              </h2>
              {block.subtitle && (
                <p className="text-white/70 text-sm md:text-base lg:text-xl font-light tracking-wide mt-2 md:mt-3 leading-relaxed">
                  {block.subtitle}
                </p>
              )}
              {block.id === 'ready' && (
                <div className="flex flex-wrap gap-3 mt-6 md:mt-8 pointer-events-auto">
                  <Link to="/menu" className="bg-brand-yellow text-ink px-6 py-3 text-[10px] font-medium tracking-[0.18em] uppercase hover:bg-brand-yellow-light transition-colors duration-300 rounded-full">
                    Explore the Menu
                  </Link>
                  <Link to="/locations" className="border border-brand-yellow/60 text-brand-yellow px-6 py-3 text-[10px] font-medium tracking-[0.18em] uppercase hover:bg-brand-yellow/10 transition-colors duration-300 rounded-full">
                    Find a Location
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/50 text-[10px] tracking-[0.3em] uppercase font-[var(--font-accent)]">
            Scroll to enter
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent" />
        </div>

        {/* Side progress indicator */}
        <div
          ref={sideProgressRef}
          className="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-4 pointer-events-none hidden md:flex"
        >
          <div className="w-[2px] h-32 bg-white/10 relative rounded-full overflow-hidden">
            <div
              className="side-progress-fill absolute bottom-0 w-full bg-brand-yellow rounded-full transition-none"
              style={{ height: '0%' }}
            />
          </div>
          <span className="side-progress-counter text-white/40 text-[10px] tracking-[0.2em] font-[var(--font-accent)]">
            0%
          </span>
        </div>

        {/* Side label */}
        <div
          ref={sideLabelRef}
          className="fixed right-6 top-1/2 -translate-y-[calc(50% + 100px)] z-40 pointer-events-none hidden md:block"
        >
          <div className="text-[9px] tracking-[0.3em] uppercase text-white/30 font-[var(--font-accent)]">
            <span className="side-label-text">ITEM7GO</span>
          </div>
        </div>
      </div>
    </section>
  );
}
