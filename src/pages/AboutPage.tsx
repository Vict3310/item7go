import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../hooks/useScrollVideo';
import AwardsBar from '../components/AwardsBar';
import TasteMap from '../components/TasteMap';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';
import OvershootCounter from '../components/OvershootCounter';
import CurtainReveal from '../components/CurtainReveal';
import MorphBackground from '../components/MorphBackground';


gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const p1Ref = useRef<HTMLDivElement>(null);
  const p2Ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const els = [headingRef.current, p1Ref.current, p2Ref.current].filter(Boolean);
    els.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
          delay: i * 0.15,
        }
      );
    });
  }, [reducedMotion]);

  return (
    <div className="min-h-screen pt-[96px]">
      {/* Hero Story */}
      <section ref={sectionRef} className="relative bg-cream">
        <div className="max-w-[1440px] mx-auto px-[clamp(18px,3.4vw,44px)] py-[clamp(60px,10vh,140px)]">
          <div className="max-w-[900px]">
            <div className="text-[10px] font-medium tracking-[0.22em] uppercase text-brand-red mb-4">Our Story</div>
            <h1
              ref={headingRef}
              className="font-[var(--font-heading)] text-[clamp(40px,8vw,100px)] leading-[0.9] tracking-[-0.03em] uppercase text-ink"
            >
              GOOD FOOD.<br />
              GOOD PEOPLE.<br />
              GOOD <span className="text-brand-yellow">TIMES.</span>
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 mt-[clamp(30px,5vh,60px)]">
            <div ref={p1Ref}>
              <p className="text-[clamp(15px,1.2vw,18px)] text-earth-light leading-relaxed max-w-[45ch]">
                Item7Go was born from a simple idea — that Nigerian food deserves a stage as bold
                as its flavours. We started with a single location and a dream to share the warmth
                of Nigerian cooking with everyone. Today, we serve hundreds of guests daily,
                each plate a love letter to the cuisine that raised us.
              </p>
            </div>
            <div ref={p2Ref}>
              <p className="text-[clamp(15px,1.2vw,18px)] text-earth-light leading-relaxed max-w-[45ch]">
                Every grain of jollof tells a story. Every suya stick carries a tradition.
                We don't just serve food — we serve memories, culture, and community.
                From the smoke of the grill to the rhythm of our kitchen,
                Item7Go is where Nigeria comes alive on a plate.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-[clamp(40px,8vh,80px)] border-t border-ink/10 pt-[clamp(24px,4vh,40px)]">
            <OvershootCounter target={4} label="Locations" />
            <OvershootCounter target={50} suffix="+" label="Menu Items" />
            <OvershootCounter target={100} suffix="%" label="Nigerian Soul" />
            <OvershootCounter target={4} label="Cities" />
          </div>
        </div>
      </section>

      <AwardsBar />

      <CurtainReveal>
      {/* Values */}
      <section className="bg-earth text-white py-[clamp(60px,10vh,120px)] relative">
        <MorphBackground color="rgba(212, 32, 14, 0.06)" />
        <div className="max-w-[1440px] mx-auto px-[clamp(18px,3.4vw,44px)]">
          <div className="text-[10px] font-medium tracking-[0.22em] uppercase text-brand-yellow mb-3">What We Stand For</div>
          <h2 className="font-[var(--font-heading)] text-[clamp(32px,5vw,56px)] font-bold tracking-[-0.02em] leading-none uppercase mb-12">
            OUR VALUES
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Authenticity', desc: 'Every recipe traces back to a real Nigerian kitchen. We don\'t water down our flavours — we amplify them.' },
              { title: 'Community', desc: 'Food is how we connect. Our spaces are designed for gatherings, conversations, and shared plates.' },
              { title: 'Quality', desc: 'From sourcing to plating, we obsess over every detail. Nigerian food deserves world-class execution.' },
            ].map((v) => (
              <div key={v.title} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="font-[var(--font-heading)] text-xl font-bold mb-3">{v.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </CurtainReveal>

      <TasteMap />
      <Testimonials />
      <Newsletter />
    </div>
  );
}
