import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';
import { useReducedMotion } from '../hooks/useScrollVideo';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "The jollof rice here is honestly the best I've ever had. The smoky bottom is everything. I drive 40 minutes just for this.",
    name: 'Chioma A.',
    role: 'Regular since 2023',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80',
  },
  {
    quote: "Item7Go feels like home. The atmosphere, the food, the people — it's like walking into my aunt's kitchen, but elevated.",
    name: 'Tunde O.',
    role: 'Food blogger',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
  },
  {
    quote: "We hosted our office party here and everyone was blown away. The suya platter disappeared in minutes. Already booked for next month.",
    name: 'Amara N.',
    role: 'Corporate client',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
  },
  {
    quote: "Finally, a Nigerian restaurant that nails the presentation AND the taste. The Item7Go Platter is a must-order.",
    name: 'Emeka K.',
    role: 'Instagram foodie',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll('.test-card');
    cards.forEach((card, i) => {
      gsap.fromTo(card, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' },
        delay: i * 0.1,
      });
    });
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className="bg-bone py-[clamp(50px,8vh,100px)]">
      <div className="max-w-[1440px] mx-auto px-[clamp(18px,3.4vw,44px)]">
        <div className="mb-[clamp(24px,4vh,48px)]">
          <div className="text-[10px] font-medium tracking-[0.22em] uppercase text-mid mb-3">What People Say</div>
          <h2 className="font-[var(--font-heading)] text-[clamp(36px,5vw,64px)] font-bold tracking-[-0.02em] leading-none uppercase">
            LOVED BY<br />LAGOS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white p-6 border border-ink/5 rounded-2xl test-card" style={{ opacity: reducedMotion ? 1 : 0 }}>
              <Quote size={24} className="text-warm/40 mb-4" />
              <p className="text-sm leading-relaxed text-earth-light mb-6 italic">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-3 border-t border-ink/5 pt-4">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-ink/10">
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-[11px] text-mid">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
