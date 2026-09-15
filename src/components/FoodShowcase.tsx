import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../hooks/useScrollVideo';
import LazyImage from './LazyImage';
import SectionNumber from './SectionNumber';
import FloatingIngredients from './FloatingIngredients';
import MorphBackground from './MorphBackground';

gsap.registerPlugin(ScrollTrigger);

const showcaseData = [
  {
    title: 'JOLLOF THAT\nHITS DIFFERENT.',
    description:
      'Our jollof rice is cooked low and slow, with a smoky bottom that Lagosians travel for. Every grain carries the fire of tradition and the warmth of home.',
    image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=1200&q=80',
    layout: 'image-left',
  },
  {
    title: 'FROM GRILL\nTO TABLE.',
    description:
      'Our suya is seasoned with a proprietary yaji blend passed down through generations. Charred to perfection, served with onions and tomatoes that cut through the heat.',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=1200&q=80',
    layout: 'image-right',
  },
  {
    title: 'EVERY SOUP\nTELLS A STORY.',
    description:
      'From egusi to ewedu, our soups are made from scratch every morning. Fresh leaves, real stockfish, and the kind of depth that only comes from slow cooking.',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=1200&q=80',
    layout: 'fullscreen',
  },
  {
    title: 'SWEETNESS\nIN EVERY BITE.',
    description:
      'Fried plantain, golden and caramelised — the side dish that steals the show. We use only the ripest plantains, sliced thick and fried with care.',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=1200&q=80',
    layout: 'collage',
  },
];

export default function FoodShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    if (!section) return;

    // Animate all reveal elements
    const reveals = section.querySelectorAll('.fs-reveal');
    reveals.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // Parallax images
    const parallaxEls = section.querySelectorAll('.fs-parallax');
    parallaxEls.forEach((el) => {
      gsap.to(el, {
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className="bg-cream relative">
      <FloatingIngredients />
      <MorphBackground color="rgba(255, 209, 0, 0.04)" />
      {/* Section header */}
      <div className="max-w-[1440px] mx-auto px-[clamp(18px,3.4vw,44px)] pt-[clamp(50px,8vh,100px)] pb-[clamp(20px,3vh,40px)]">
        <div className="relative">
          <SectionNumber number="02" />
          <div className="text-[10px] font-medium tracking-[0.22em] uppercase text-mid mb-3 fs-reveal relative z-10">
            Flavours
          </div>
          <h2 className="font-[var(--font-heading)] text-[clamp(36px,5vw,64px)] font-bold tracking-[-0.02em] leading-none uppercase fs-reveal relative z-10">
            THE FOOD<br /><span className="text-brand-red">SPEAKS</span>
          </h2>
        </div>
      </div>

      {/* Showcase blocks */}
      {showcaseData.map((block, i) => (
        <div key={i} className="mb-[clamp(20px,4vh,40px)]">
          {block.layout === 'fullscreen' ? (
            <div className="relative h-[60vh] md:h-[80vh] overflow-hidden rounded-3xl mx-[clamp(18px,3.4vw,44px)]">                  <LazyImage
                    src={block.image}
                    alt={block.title.replace('\n', ' ')}
                    className="w-full h-full object-cover fs-parallax color-grade"
                  />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center px-6 fs-reveal">
                  <h3 className="font-[var(--font-heading)] text-[clamp(32px,6vw,72px)] font-bold text-white leading-[0.9] tracking-tight whitespace-pre-line">
                    {block.title}
                  </h3>
                  <p className="text-white/70 mt-4 max-w-[40ch] mx-auto text-[clamp(14px,1.2vw,17px)] leading-relaxed">
                    {block.description}
                  </p>
                </div>
              </div>
            </div>
          ) : block.layout === 'collage' ? (
            <div className="max-w-[1440px] mx-auto px-[clamp(18px,3.4vw,44px)] grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square overflow-hidden rounded-2xl fs-reveal">
                  <LazyImage
                    src={block.image}
                    alt={block.title.replace('\n', ' ')}
                    className="w-full h-full object-cover editorial-img"
                  />
                </div>
                <div className="aspect-square overflow-hidden rounded-2xl mt-8 fs-reveal">
                  <LazyImage
                    src="https://images.unsplash.com/photo-1574484284002-952d92456975?w=600&q=80"
                    alt="Nigerian food spread"
                    className="w-full h-full object-cover editorial-img"
                  />
                </div>
              </div>
              <div className="py-8 fs-reveal">
                <h3 className="font-[var(--font-heading)] text-[clamp(28px,4vw,52px)] font-bold leading-[0.9] tracking-tight text-ink whitespace-pre-line">
                  {block.title}
                </h3>
                <p className="text-earth-light mt-4 max-w-[36ch] text-[clamp(14px,1.2vw,16px)] leading-relaxed">
                  {block.description}
                </p>
              </div>
            </div>
          ) : (
            <div className="max-w-[1440px] mx-auto px-[clamp(18px,3.4vw,44px)] grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
              {block.layout === 'image-right' && (
                <div className="order-2 md:order-1">
                  <div className="text-[10px] font-medium tracking-[0.22em] uppercase text-mid mb-3 fs-reveal">
                    Signature
                  </div>
                  <h3 className="font-[var(--font-heading)] text-[clamp(28px,4vw,52px)] font-bold leading-[0.9] tracking-tight text-ink whitespace-pre-line fs-reveal">
                    {block.title}
                  </h3>
                  <p className="text-earth-light mt-4 max-w-[36ch] text-[clamp(14px,1.2vw,16px)] leading-relaxed fs-reveal">
                    {block.description}
                  </p>
                </div>
              )}
              <div className={`overflow-hidden ${block.layout === 'image-right' ? 'order-1 md:order-2' : ''}`}>
                <div className="aspect-[4/5] overflow-hidden rounded-2xl">
                  <LazyImage
                    src={block.image}
                    alt={block.title.replace('\n', ' ')}
                    className="w-full h-full object-cover editorial-img fs-parallax"
                  />
                </div>
              </div>
              {block.layout === 'image-left' && (
                <div className="order-2">
                  <div className="text-[10px] font-medium tracking-[0.22em] uppercase text-mid mb-3 fs-reveal">
                    Signature
                  </div>
                  <h3 className="font-[var(--font-heading)] text-[clamp(28px,4vw,52px)] font-bold leading-[0.9] tracking-tight text-ink whitespace-pre-line fs-reveal">
                    {block.title}
                  </h3>
                  <p className="text-earth-light mt-4 max-w-[36ch] text-[clamp(14px,1.2vw,16px)] leading-relaxed fs-reveal">
                    {block.description}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
