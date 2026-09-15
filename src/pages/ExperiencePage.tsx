import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import PhotoWall from '../components/PhotoWall';
import GalleryLightbox from '../components/GalleryLightbox';
import InstagramFeed from '../components/InstagramFeed';
import SectionNumber from '../components/SectionNumber';
import ReservationForm from '../components/ReservationForm';

gsap.registerPlugin(ScrollTrigger);

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

export default function ExperiencePage() {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  useEffect(() => {
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
  }, []);

  return (
    <div className="min-h-screen pt-[96px]">
      {/* Hero */}
      <section ref={sectionRef} className="bg-earth text-white">
        <div className="max-w-[1440px] mx-auto px-[clamp(18px,3.4vw,44px)] py-[clamp(60px,10vh,120px)]">
          <div className="mb-[clamp(30px,5vh,60px)]">
            <div className="relative">
              <SectionNumber number="03" className="!text-white/[0.03]" />
              <div className="text-[10px] font-medium tracking-[0.22em] uppercase text-white/40 mb-3 relative z-10 exp-reveal"
                data-reveal-idx={0}
                style={{ opacity: revealed.has(0) ? 1 : 0, transform: revealed.has(0) ? 'none' : 'translateY(40px)', transition: 'opacity 0.8s cubic-bezier(0.22,0.61,0.36,1), transform 0.8s cubic-bezier(0.22,0.61,0.36,1)' }}
              >
                The Experience
              </div>
              <h1 className="font-[var(--font-heading)] text-[clamp(42px,7vw,90px)] font-bold tracking-[-0.03em] leading-[0.9] uppercase relative z-10 exp-reveal"
                data-reveal-idx={1}
                style={{ opacity: revealed.has(1) ? 1 : 0, transform: revealed.has(1) ? 'none' : 'translateY(40px)', transition: 'opacity 0.8s cubic-bezier(0.22,0.61,0.36,1) 0.1s, transform 0.8s cubic-bezier(0.22,0.61,0.36,1) 0.1s' }}
              >
                STEP INSIDE<br />
                <span className="text-brand-yellow">ITEM7GO</span>
              </h1>
            </div>
            <p className="text-white/50 mt-6 max-w-[44ch] text-[clamp(14px,1.2vw,18px)] leading-relaxed exp-reveal"
              data-reveal-idx={2}
              style={{ opacity: revealed.has(2) ? 1 : 0, transform: revealed.has(2) ? 'none' : 'translateY(40px)', transition: 'opacity 0.8s cubic-bezier(0.22,0.61,0.36,1) 0.2s, transform 0.8s cubic-bezier(0.22,0.61,0.36,1) 0.2s' }}
            >
              More than a restaurant — it's a destination. From the moment you walk in,
              every detail is designed to transport you.
            </p>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
            {experienceItems.map((item, i) => {
              const revealIdx = 3 + i;
              const colSpan = i === 0 ? 'md:col-span-5 md:row-span-2' :
                             i === 1 ? 'md:col-span-7' :
                             i === 2 ? 'md:col-span-4' :
                             i === 3 ? 'md:col-span-3' :
                             'md:col-span-12';
              return (
                <div key={i} className={`${colSpan} group exp-reveal`}
                  data-reveal-idx={revealIdx}
                  style={{ opacity: revealed.has(revealIdx) ? 1 : 0, transform: revealed.has(revealIdx) ? 'none' : 'translateY(40px)', transition: `opacity 0.8s cubic-bezier(0.22,0.61,0.36,1) ${0.15 + i * 0.08}s, transform 0.8s cubic-bezier(0.22,0.61,0.36,1) ${0.15 + i * 0.08}s` }}
                >
                  <div className={`${item.aspect} overflow-hidden relative rounded-2xl`}>
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6">
                      <h3 className="font-[var(--font-heading)] text-xl font-bold">{item.title}</h3>
                      {item.description && (
                        <p className="text-white/60 text-sm mt-1 max-w-[30ch]">{item.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-[clamp(30px,5vh,60px)] flex flex-wrap gap-4 exp-reveal"
            data-reveal-idx={8}
            style={{ opacity: revealed.has(8) ? 1 : 0, transform: revealed.has(8) ? 'none' : 'translateY(40px)', transition: 'opacity 0.8s cubic-bezier(0.22,0.61,0.36,1) 0.5s, transform 0.8s cubic-bezier(0.22,0.61,0.36,1) 0.5s' }}
          >
            <a href="/menu" className="bg-brand-yellow text-ink px-8 py-4 text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-brand-yellow-light transition-colors duration-300 rounded-full">
              View the Menu
            </a>
            <a href="/locations" className="border border-white/20 text-white px-8 py-4 text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-white/5 transition-colors duration-300 flex items-center gap-2 rounded-full">
              Visit Us <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      <PhotoWall />
      <GalleryLightbox />
      <InstagramFeed />
      <ReservationForm />
    </div>
  );
}
