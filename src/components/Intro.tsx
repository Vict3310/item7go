import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../hooks/useScrollVideo';
import SectionNumber from './SectionNumber';
import OvershootCounter from './OvershootCounter';



gsap.registerPlugin(ScrollTrigger);

export default function Intro() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const p1Ref = useRef<HTMLDivElement>(null);
  const p2Ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    if (!section) return;

    const els = [headingRef.current, p1Ref.current, p2Ref.current].filter(Boolean);

    els.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          delay: i * 0.15,
        }
      );
    });
  }, [reducedMotion]);

  return (
    <section id="about" ref={sectionRef} className="relative bg-cream snap-section">
      <div className="max-w-[1440px] mx-auto px-[clamp(18px,3.4vw,44px)] py-[clamp(60px,10vh,140px)]">
        {/* Editorial heading */}
        <div className="max-w-[900px] relative">
          <SectionNumber number="01" />
          <h2
            ref={headingRef}
            className="font-[var(--font-heading)] text-[clamp(40px,8vw,100px)] leading-[0.9] tracking-[-0.03em] uppercase text-ink relative z-10"
            style={{ opacity: reducedMotion ? 1 : 0 }}
          >
            GOOD FOOD.<br />
            GOOD PEOPLE.<br />
            GOOD <span className="text-brand-yellow">TIMES.</span>
          </h2>
        </div>

        {/* Supporting copy */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 mt-[clamp(30px,5vh,60px)]">
          <div ref={p1Ref} style={{ opacity: reducedMotion ? 1 : 0 }}>
            <div className="text-[10px] font-medium tracking-[0.22em] uppercase text-mid mb-4">
              Our Story
            </div>
            <p className="text-[clamp(15px,1.2vw,18px)] text-earth-light leading-relaxed max-w-[45ch]">
              Item7Go was born from a simple idea — that Nigerian food deserves a stage as bold 
              as its flavours. We started with a single location and a dream to share the warmth 
              of Nigerian cooking with everyone. Today, we serve hundreds of guests daily, 
              each plate a love letter to the cuisine that raised us.
            </p>
          </div>
          <div ref={p2Ref} style={{ opacity: reducedMotion ? 1 : 0 }}>
            <div className="text-[10px] font-medium tracking-[0.22em] uppercase text-mid mb-4">
              What We Believe
            </div>
            <p className="text-[clamp(15px,1.2vw,18px)] text-earth-light leading-relaxed max-w-[45ch]">
              Every grain of jollof tells a story. Every suya stick carries a tradition. 
              We don't just serve food — we serve memories, culture, and community. 
              From the smoke of the grill to the rhythm of our kitchen, 
              Item7Go is where Nigeria comes alive on a plate.
            </p>
          </div>
        </div>

        {/* Large stats bar with animated counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-[clamp(40px,8vh,80px)] border-t border-ink/10 pt-[clamp(24px,4vh,40px)]">
          <OvershootCounter target={4} label="Locations" />
          <OvershootCounter target={50} suffix="+" label="Menu Items" />
          <OvershootCounter target={100} suffix="%" label="Nigerian Soul" />
          <OvershootCounter target={4} label="Cities" />
        </div>
      </div>
    </section>
  );
}
