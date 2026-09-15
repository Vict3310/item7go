import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Clock, Phone, ArrowRight } from 'lucide-react';
import { locations } from '../data/locations';
import { useReducedMotion } from '../hooks/useScrollVideo';
import TiltCard from './TiltCard';
import SectionNumber from './SectionNumber';

gsap.registerPlugin(ScrollTrigger);

export default function Locations() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    if (!section) return;

    const reveals = section.querySelectorAll('.loc-reveal');
    reveals.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [reducedMotion]);

  return (
    <section id="locations" ref={sectionRef} className="bg-cream">
      <div className="max-w-[1440px] mx-auto px-[clamp(18px,3.4vw,44px)] py-[clamp(60px,10vh,120px)]">
        {/* Header */}
        <div className="mb-[clamp(30px,5vh,60px)]">
          <div className="relative">
            <SectionNumber number="04" />
            <div className="text-[10px] font-medium tracking-[0.22em] uppercase text-mid mb-3 loc-reveal relative z-10">
              Find Us
            </div>
            <h2 className="font-[var(--font-heading)] text-[clamp(36px,5vw,64px)] font-bold tracking-[-0.02em] leading-none uppercase loc-reveal relative z-10">
              OUR<br /><span className="text-brand-red">LOCATIONS</span>
            </h2>
          </div>
        </div>

        {/* Location cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {locations.map((loc) => (
            <TiltCard key={loc.id} className="bg-white border border-ink/8 rounded-2xl p-6 md:p-8 hover:border-brand-red/40 transition-colors duration-300 group loc-reveal">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <h3 className="font-[var(--font-heading)] text-[clamp(20px,2vw,26px)] font-bold tracking-tight">
                    {loc.name}
                  </h3>
                  <p className="text-mid text-sm mt-1">{loc.city}</p>
                </div>
                <a
                  href={loc.mapUrl}
                  className="text-warm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-label={`Get directions to ${loc.name}`}
                >
                  <ArrowRight size={20} />
                </a>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 text-sm text-earth-light">
                  <MapPin size={16} className="text-warm mt-0.5 shrink-0" />
                  <span>{loc.address}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-earth-light">
                  <Clock size={16} className="text-warm shrink-0" />
                  <span>{loc.hours}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-earth-light">
                  <Phone size={16} className="text-warm shrink-0" />
                  <span>{loc.phone}</span>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-ink/8">
                <a
                  href={loc.mapUrl}
                  className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.18em] uppercase text-warm hover:text-warm-dark transition-colors duration-300"
                >
                  Get Directions
                  <ArrowRight size={14} />
                </a>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
