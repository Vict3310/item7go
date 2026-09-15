import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../hooks/useScrollVideo';
import LazyImage from './LazyImage';

gsap.registerPlugin(ScrollTrigger);

const slides = [
  { image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=900&q=80', caption: 'Jollof Rice', desc: 'Our signature party jollof, smoky and rich' },
  { image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=900&q=80', caption: 'Suya Platter', desc: 'Grilled beef with yaji spice and fresh onions' },
  { image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=900&q=80', caption: 'Pounded Yam', desc: 'Smooth, stretchy — the perfect partner for soup' },
  { image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=900&q=80', caption: 'Egusi Soup', desc: 'Thick melon seed soup with spinach and palm oil' },
  { image: 'https://images.unsplash.com/photo-1560508179-b2c9b389c13a?w=900&q=80', caption: 'Zobo Drink', desc: 'Refreshing hibiscus with pineapple and ginger' },
  { image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=900&q=80', caption: 'Fried Plantain', desc: 'Sweet, ripe plantain fried golden' },
];

export default function Filmstrip() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [imagesReady, setImagesReady] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;
    const images = document.querySelectorAll('.filmstrip-slide img');
    let loaded = 0;
    const total = images.length;

    if (total === 0) {
      setImagesReady(true);
      return;
    }

    const check = () => {
      loaded++;
      if (loaded >= total) setImagesReady(true);
    };

    images.forEach((img) => {
      if ((img as HTMLImageElement).complete) {
        loaded++;
        if (loaded >= total) setImagesReady(true);
      } else {
        (img as HTMLImageElement).addEventListener('load', check, { once: true });
        (img as HTMLImageElement).addEventListener('error', check, { once: true });
      }
    });
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    if (!imagesReady) return;
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const totalWidth = track.scrollWidth - window.innerWidth;
    if (totalWidth <= 0) return;

    const st = gsap.to(track, {
      x: -totalWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: () => `+=${Math.min(totalWidth, window.innerWidth * 3)}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => { st.kill(); };
  }, [reducedMotion, imagesReady]);

  return (
    <section ref={containerRef} className="relative h-screen bg-ink" style={{ overflow: 'visible' }}>
      <div className="absolute top-4 left-4 md:top-8 md:left-8 z-20">
        <div className="text-[9px] md:text-[10px] font-medium tracking-[0.22em] uppercase text-white/40 mb-1.5 md:mb-2">
          Scroll to explore
        </div>
        <h2 className="font-[var(--font-heading)] text-2xl md:text-3xl lg:text-4xl font-bold text-white uppercase">
          THE <span className="text-brand-yellow">GALLERY</span>
        </h2>
      </div>

      <div
        ref={trackRef}
        className="flex items-center gap-8 h-full px-[5vw]"
        style={{ width: `${slides.length * 50}vw` }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className="filmstrip-slide flex-shrink-0 w-[65vw] sm:w-[50vw] md:w-[30vw] h-[50vh] sm:h-[55vh] md:h-[60vh] relative group"
            style={{ marginTop: i % 2 === 0 ? '0' : '8vh' }}
          >
            <div className="w-full h-full overflow-hidden">
              <LazyImage
                src={slide.image}
                alt={slide.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
              <h3 className="font-[var(--font-heading)] text-xl font-bold text-white">{slide.caption}</h3>
              <p className="text-white/60 text-sm mt-1">{slide.desc}</p>
            </div>
            <div className="absolute top-4 left-4 text-white/20 font-[var(--font-heading)] text-6xl font-bold">
              {String(i + 1).padStart(2, '0')}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
