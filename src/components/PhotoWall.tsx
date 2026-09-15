import { useRef, useEffect, useState } from 'react';
import { Camera, Heart } from 'lucide-react';

const photos = [
  { src: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400&q=80', user: '@chioma_eats', likes: 342 },
  { src: 'https://images.unsplash.com/photo-1558030006-450675393462?w=400&q=80', user: '@tunde_foodie', likes: 289 },
  { src: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80', user: '@amara_kitchen', likes: 456 },
  { src: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80', user: '@emeka_grills', likes: 198 },
  { src: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&q=80', user: '@nneka_vibes', likes: 567 },
  { src: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&q=80', user: '@chidi_plate', likes: 321 },
  { src: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?w=400&q=80', user: '@ifeoma_eats', likes: 445 },
  { src: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&q=80', user: '@obi_table', likes: 278 },
  { src: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400&q=80', user: '@sade_bites', likes: 612 },
];

export default function PhotoWall() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState<Set<number>>(new Set());

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll('.photo-card');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-idx'));
            setVisible((prev) => new Set(prev).add(idx));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -10% 0px' }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-bone py-[clamp(50px,8vh,80px)]">
      <div className="max-w-[1440px] mx-auto px-[clamp(18px,3.4vw,44px)]">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-[10px] font-medium tracking-[0.22em] uppercase text-mid mb-3">Community</div>
            <h2 className="font-[var(--font-heading)] text-[clamp(32px,4.5vw,56px)] font-bold tracking-tight leading-none uppercase">
              PHOTO WALL
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-2 bg-warm/10 px-4 py-2">
            <Camera size={16} className="text-warm" />
            <span className="text-[11px] font-medium tracking-[0.14em] uppercase text-warm">
              Share with #Item7Go
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {photos.map((photo, i) => (
            <div
              key={i}
              data-idx={i}
              className={`photo-card group relative aspect-square overflow-hidden bg-ink/5 cursor-pointer rounded-2xl transition-all duration-700 ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
                visible.has(i)
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-90'
              }`}
              style={{ transitionDelay: `${(i % 4) * 80}ms` }}
            >
              <img src={photo.src} alt={`Customer photo by ${photo.user}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center justify-between">
                  <span className="text-white text-xs font-medium">{photo.user}</span>
                  <span className="flex items-center gap-1 text-white/80 text-xs">
                    <Heart size={12} fill="currentColor" /> {photo.likes}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-mid text-sm mb-4">Share your Item7Go moments for a chance to be featured and win free meals.</p>
          <button
            className="bg-ink text-white px-8 py-3 text-[11px] font-medium tracking-[0.16em] uppercase hover:bg-warm hover:text-ink transition-colors rounded-full w-full sm:w-auto"
          >
            Upload Your Photo
          </button>
        </div>
      </div>
    </section>
  );
}
