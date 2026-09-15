import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../hooks/useScrollVideo';

const experienceItems = [
  {
    title: 'The Interior',
    description: 'Warm lighting, rich textures, and design inspired by the energy of Lagos nights.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    aspect: 'aspect-[4/5]',
  },
  {
    title: 'The Dining',
    description: 'From intimate tables to communal feasts — every seat tells a different story.',
    image: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&q=80',
    aspect: 'aspect-[3/2]',
  },
  {
    title: 'The Food',
    description: 'Every plate is a canvas. We serve Nigerian food the way it was meant to be experienced.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
    aspect: 'aspect-[3/2]',
  },
  {
    title: 'The Service',
    description: 'Warm, attentive, and genuine. We treat every guest like family.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    aspect: 'aspect-[4/5]',
  },
  {
    title: 'The Atmosphere',
    description: 'Afrobeats in the air, the sizzle of the grill, laughter echoing off the walls.',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb51f3a?w=800&q=80',
    aspect: 'aspect-[16/9]',
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (reducedMotion) {
      setRevealed(new Set(Array.from({ length: 9 }, (_, i) => i)));
      return;
    }
    const section = sectionRef.current;
    if (!section) return;

    const revealEls = section.querySelectorAll('.exp-reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-reveal-idx'));
            setRevealed((prev) => new Set(prev).add(idx));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -5% 0px' }
    );

    revealEls.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [reducedMotion]);

  const revealStyle = (idx: number, delay = 0) => ({
    opacity: revealed.has(idx) ? 1 : 0,
    transform: revealed.has(idx) ? 'none' : 'translateY(40px)',
    transition: `opacity 0.8s cubic-bezier(0.22,0.61,0.36,1) ${delay}s, transform 0.8s cubic-bezier(0.22,0.61,0.36,1) ${delay}s`,
  });

  return (
    <section id="experience" ref={sectionRef} className="bg-earth text-white">
      <div className="max-w-[1440px] mx-auto px-[clamp(18px,3.4vw,44px)] py-[clamp(60px,10vh,120px)]">
        {/* Header */}
        <div className="mb-[clamp(30px,5vh,60px)]">
          <div className="text-[10px] font-medium tracking-[0.22em] uppercase text-white/40 mb-3 exp-reveal"
            data-reveal-idx={0} style={revealStyle(0)}>
            The Experience
          </div>
          <h2 className="font-[var(--font-heading)] text-[clamp(36px,5vw,64px)] font-bold tracking-[-0.02em] leading-none uppercase exp-reveal"
            data-reveal-idx={1} style={revealStyle(1, 0.05)}>
            STEP INSIDE<br />ITEM7GO
          </h2>
          <p className="text-white/50 mt-4 max-w-[44ch] text-[clamp(14px,1.2vw,17px)] leading-relaxed exp-reveal"
            data-reveal-idx={2} style={revealStyle(2, 0.1)}>
            More than a restaurant — it's a destination. From the moment you walk in,
            every detail is designed to transport you.
          </p>
        </div>

        {/* Experience grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
          {/* Large left item */}
          <div className="md:col-span-5 md:row-span-2 group exp-reveal"
            data-reveal-idx={3} style={revealStyle(3, 0.15)}>
            <div className={`${experienceItems[0].aspect} overflow-hidden relative rounded-2xl`}>
              <img src={experienceItems[0].image} alt={experienceItems[0].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="font-[var(--font-heading)] text-xl font-bold">{experienceItems[0].title}</h3>
                <p className="text-white/60 text-sm mt-1 max-w-[30ch]">{experienceItems[0].description}</p>
              </div>
            </div>
          </div>

          {/* Top right */}
          <div className="md:col-span-7 group exp-reveal"
            data-reveal-idx={4} style={revealStyle(4, 0.2)}>
            <div className={`${experienceItems[1].aspect} overflow-hidden relative rounded-2xl`}>
              <img src={experienceItems[1].image} alt={experienceItems[1].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="font-[var(--font-heading)] text-xl font-bold">{experienceItems[1].title}</h3>
                <p className="text-white/60 text-sm mt-1 max-w-[30ch]">{experienceItems[1].description}</p>
              </div>
            </div>
          </div>

          {/* Bottom right items */}
          <div className="md:col-span-4 group exp-reveal"
            data-reveal-idx={5} style={revealStyle(5, 0.25)}>
            <div className={`${experienceItems[2].aspect} overflow-hidden relative rounded-2xl`}>
              <img src={experienceItems[2].image} alt={experienceItems[2].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
                <h3 className="font-[var(--font-heading)] text-base font-bold">{experienceItems[2].title}</h3>
              </div>
            </div>
          </div>

          <div className="md:col-span-3 group exp-reveal"
            data-reveal-idx={6} style={revealStyle(6, 0.3)}>
            <div className={`${experienceItems[3].aspect} overflow-hidden relative rounded-2xl`}>
              <img src={experienceItems[3].image} alt={experienceItems[3].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4">
                <h3 className="font-[var(--font-heading)] text-base font-bold">{experienceItems[3].title}</h3>
              </div>
            </div>
          </div>

          <div className="md:col-span-12 group exp-reveal"
            data-reveal-idx={7} style={revealStyle(7, 0.35)}>
            <div className={`${experienceItems[4].aspect} overflow-hidden relative rounded-2xl`}>
              <img src={experienceItems[4].image} alt={experienceItems[4].title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="font-[var(--font-heading)] text-xl font-bold">{experienceItems[4].title}</h3>
                <p className="text-white/60 text-sm mt-1 max-w-[40ch]">{experienceItems[4].description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-[clamp(30px,5vh,60px)] flex flex-wrap gap-4 exp-reveal"
          data-reveal-idx={8} style={revealStyle(8, 0.4)}>
          <a href="/menu" className="bg-warm text-ink px-8 py-4 text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-warm-light transition-colors duration-300 rounded-full">
            View the Menu
          </a>
          <a href="/locations" className="border border-white/20 text-white px-8 py-4 text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-white/5 transition-colors duration-300 rounded-full">
            Visit Us
          </a>
        </div>
      </div>
    </section>
  );
}
