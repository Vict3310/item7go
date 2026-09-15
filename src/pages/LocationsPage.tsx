import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Clock, Phone, ArrowRight, Navigation } from 'lucide-react';
import { locations } from '../data/locations';
import { useReducedMotion } from '../hooks/useScrollVideo';
import Newsletter from '../components/Newsletter';
import SectionNumber from '../components/SectionNumber';
import TiltCard from '../components/TiltCard';

gsap.registerPlugin(ScrollTrigger);

export default function LocationsPage() {
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
          scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
        }
      );
    });

    return () => { ScrollTrigger.getAll().forEach((st) => st.kill()); };
  }, [reducedMotion]);

  return (
    <div className="min-h-screen pt-[96px]">
      {/* Hero */}
      <section ref={sectionRef} className="bg-cream">
        <div className="max-w-[1440px] mx-auto px-[clamp(18px,3.4vw,44px)] py-[clamp(60px,10vh,120px)]">
          <div className="mb-[clamp(30px,5vh,60px)]">
            <div className="relative">
              <SectionNumber number="04" />
              <div className="text-[10px] font-medium tracking-[0.22em] uppercase text-mid mb-3 loc-reveal relative z-10">
                Find Us
              </div>
              <h1 className="font-[var(--font-heading)] text-[clamp(42px,7vw,90px)] font-bold tracking-[-0.03em] leading-[0.9] uppercase loc-reveal relative z-10">
                OUR<br />
                <span className="text-brand-red">LOCATIONS</span>
              </h1>
            </div>
            <p className="text-earth-light mt-6 max-w-[44ch] text-[clamp(14px,1.2vw,18px)] leading-relaxed loc-reveal">
              Four locations across Lagos and Abuja. Each one a different chapter of the Item7Go story.
            </p>
          </div>

          {/* Location cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {locations.map((loc, i) => (
              <TiltCard key={loc.id} className="bg-white border border-ink/8 rounded-2xl p-6 md:p-8 hover:border-brand-red/40 transition-colors duration-300 group loc-reveal">
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div>
                    <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-brand-red mb-1 block">
                      Location {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-[var(--font-heading)] text-[clamp(20px,2vw,26px)] font-bold tracking-tight">
                      {loc.name}
                    </h3>
                    <p className="text-mid text-sm mt-1">{loc.city}</p>
                  </div>
                  <a
                    href={loc.mapUrl}
                    className="text-brand-red opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    aria-label={`Get directions to ${loc.name}`}
                  >
                    <Navigation size={20} />
                  </a>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 text-sm text-earth-light">
                    <MapPin size={16} className="text-brand-red mt-0.5 shrink-0" />
                    <span>{loc.address}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-earth-light">
                    <Clock size={16} className="text-brand-red shrink-0" />
                    <span>{loc.hours}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-earth-light">
                    <Phone size={16} className="text-brand-red shrink-0" />
                    <span>{loc.phone}</span>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-ink/8 flex flex-wrap gap-4">
                  <a
                    href={loc.mapUrl}
                    className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.18em] uppercase text-brand-red hover:text-brand-red-dark transition-colors duration-300"
                  >
                    Get Directions
                    <ArrowRight size={14} />
                  </a>
                  <a
                    href="tel:+2348123456789"
                    className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.18em] uppercase text-mid hover:text-ink transition-colors duration-300"
                  >
                    Call Now
                  </a>                </div>
              </TiltCard>

            ))}
          </div>

          {/* CTA */}
          <div className="mt-[clamp(40px,6vh,80px)] bg-ink text-white p-8 md:p-12 rounded-3xl loc-reveal">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h3 className="font-[var(--font-heading)] text-2xl md:text-3xl font-bold uppercase mb-2">
                  Can't make it in?
                </h3>
                <p className="text-white/50 text-sm max-w-[40ch]">
                  Order online and we'll deliver the Item7Go experience straight to your door.
                </p>
              </div>
              <a
                href="/menu"
                className="bg-brand-yellow text-ink px-8 py-4 text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-brand-yellow-light transition-colors rounded-full"
              >
                Order for Delivery
              </a>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </div>
  );
}
