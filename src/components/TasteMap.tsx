import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, ArrowRight, X } from 'lucide-react';
import { useReducedMotion } from '../hooks/useScrollVideo';

gsap.registerPlugin(ScrollTrigger);

interface Region {
  id: string;
  name: string;
  dish: string;
  description: string;
  history: string;
  x: string; // % position on map
  y: string;
  color: string;
  image: string;
}

const regions: Region[] = [
  {
    id: 'yoruba',
    name: 'Yoruba',
    dish: 'Amala & Ewedu',
    description: 'Smooth yam flour swallow paired with jute leaf soup — the pride of southwestern Nigeria.',
    history: 'Amala has been a staple of the Yoruba people for centuries, originally made from dried yam. Ewedu, the accompanying soup, is rich in iron and traditionally served at celebrations.',
    x: '30%', y: '55%',
    color: '#C0522A',
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&q=80',
  },
  {
    id: 'igbo',
    name: 'Igbo',
    dish: 'Oha Soup & Fufu',
    description: 'Wild oha leaves in a rich palm nut base, served with stretchy cassava fufu.',
    history: 'Oha soup is a delicacy of the Igbo people of southeastern Nigeria. The oha leaves are wild-harvested and cannot be cultivated, making this soup a treasured treat.',
    x: '60%', y: '58%',
    color: '#2C8C4A',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80',
  },
  {
    id: 'hausa',
    name: 'Hausa',
    dish: 'Tuwo Shinkafa & Miyan Kuka',
    description: 'Soft rice pudding swallow with baobab leaf soup — hearty northern comfort.',
    history: 'Tuwo Shinkafa is the centrepiece of Hausa cuisine, often served at Ramadan gatherings. Miyan Kuka, made from dried baobab leaves, is unique to the north.',
    x: '35%', y: '20%',
    color: '#8B6914',
    image: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?w=400&q=80',
  },
  {
    id: 'delta',
    name: 'Niger Delta',
    dish: 'Banga Soup & Starch',
    description: 'Rich palm fruit soup with fresh catfish, served with yellow starch.',
    history: 'Banga soup originates from the Urhobo and Itsekiri people of the Niger Delta. It uses fresh palm fruits and a unique spice blend called "beletete."',
    x: '42%', y: '45%',
    color: '#D4883A',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=400&q=80',
  },
  {
    id: 'benue',
    name: 'Tiv / Benue',
    dish: 'Achicha & Eneji',
    description: 'Dried cocoyam with dried vegetable soup — the food of the "Food Basket of Nigeria."',
    history: 'Benue State is called the Food Basket of Nigeria. Achicha is made from dried cocoyam flakes and is a beloved Tiv dish served at community gatherings.',
    x: '52%', y: '35%',
    color: '#6B4E8B',
    image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&q=80',
  },
];

export default function TasteMap() {
  const [selected, setSelected] = useState<Region | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const el = sectionRef.current;
    if (!el) return;
    gsap.fromTo(el, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
    });
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className="bg-bone py-[clamp(50px,8vh,100px)]" style={{ opacity: reducedMotion ? 1 : 0 }}>
      <div className="max-w-[1440px] mx-auto px-[clamp(18px,3.4vw,44px)]">
        <div className="mb-8">
          <div className="text-[10px] font-medium tracking-[0.22em] uppercase text-mid mb-3">Discover</div>
          <h2 className="font-[var(--font-heading)] text-[clamp(32px,4.5vw,56px)] font-bold tracking-tight leading-none uppercase mb-2">
            TASTE MAP<br />OF NIGERIA
          </h2>
          <p className="text-earth-light text-sm max-w-[44ch]">
            Explore the diverse flavours of Nigeria. Each region has its own signature dishes, shaped by centuries of culture, trade, and tradition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Interactive map */}
          <div className="relative bg-white border border-ink/5 p-4 aspect-[3/4] md:aspect-auto md:min-h-[500px]">
            {/* Stylized Nigeria outline (simplified SVG) */}
            <svg viewBox="0 0 300 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M120 20 L180 15 L220 40 L250 80 L260 120 L255 160 L265 200 L270 250 L255 300 L230 340 L200 370 L160 385 L120 375 L80 350 L55 310 L40 260 L35 200 L45 150 L60 100 L80 55 Z"
                fill="#EFEDE8"
                stroke="#101010"
                strokeWidth="1"
                opacity="0.3"
              />
            </svg>

            {/* Region pins */}
            {regions.map((region) => (
              <button
                key={region.id}
                onClick={() => setSelected(region)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group ${
                  selected?.id === region.id ? 'scale-125 z-10' : 'hover:scale-110'
                }`}
                style={{ left: region.x, top: region.y }}
              >
                <div
                  className="w-10 h-10 md:w-8 md:h-8 rounded-full flex items-center justify-center shadow-md transition-colors duration-300"
                  style={{ backgroundColor: region.color }}
                >
                  <MapPin size={16} className="text-white" />
                </div>
                <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-medium bg-white px-2 py-0.5 shadow-sm border border-ink/5 md:opacity-0 md:group-hover:opacity-100 transition-opacity opacity-80">
                  {region.name}
                </div>
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <div>
            {selected ? (
              <div className="bg-white border border-ink/5 overflow-hidden">
                <div className="aspect-video overflow-hidden">
                  <img src={selected.image} alt={selected.dish} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-[10px] font-medium tracking-[0.22em] uppercase text-mid mb-1">{selected.name} Region</div>
                      <h3 className="font-[var(--font-heading)] text-2xl font-bold">{selected.dish}</h3>
                    </div>
                    <button onClick={() => setSelected(null)} className="text-mid hover:text-ink">
                      <X size={18} />
                    </button>
                  </div>
                  <p className="text-sm text-earth-light leading-relaxed mb-4">{selected.description}</p>
                  <div className="bg-bone p-4 mb-4">
                    <div className="text-[10px] font-medium tracking-[0.16em] uppercase text-mid mb-2">History</div>
                    <p className="text-xs text-earth-light leading-relaxed">{selected.history}</p>
                  </div>
                  <button className="flex items-center gap-2 text-[11px] font-medium tracking-[0.16em] uppercase text-warm hover:text-warm-dark transition-colors">
                    Order {selected.dish} <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-ink/5 p-8 flex flex-col items-center justify-center min-h-[400px] text-center">
                <MapPin size={40} className="text-warm/30 mb-4" />
                <h3 className="font-[var(--font-heading)] text-xl font-bold mb-2">Select a Region</h3>
                <p className="text-mid text-sm max-w-[30ch]">
                  Click on any pin to discover the dishes, history, and culture of that region.
                </p>
              </div>
            )}

            {/* Quick links */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
              {regions.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelected(r)}
                  className={`text-left p-3 border text-xs transition-all duration-200 ${
                    selected?.id === r.id ? 'border-warm bg-warm/5' : 'border-ink/5 hover:border-warm/30'
                  }`}
                >
                  <div className="font-semibold">{r.name}</div>
                  <div className="text-mid mt-0.5">{r.dish}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
