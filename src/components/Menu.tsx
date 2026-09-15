import { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Flame, Star } from 'lucide-react';
import { menuCategories, menuItems, type MenuCategory } from '../data/menu';
import { useCart } from '../context/CartContext';
import { triggerCartFly } from './CartFly';
import SuccessCheckmark from './SuccessCheckmark';
import LazyImage from './LazyImage';

gsap.registerPlugin(ScrollTrigger);

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('Rice');
  const [addedId, setAddedId] = useState<string | null>(null);
  const [gridVisible, setGridVisible] = useState(false);
  const { addItem } = useCart();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredItems = menuItems.filter((item) => item.category === activeCategory);

  useEffect(() => {
    if (!headingRef.current) return;
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: headingRef.current, start: 'top 85%' } }
    );
  }, []);

  // Stagger grid entrance on category change
  useEffect(() => {
    setGridVisible(false);
    const timer = setTimeout(() => setGridVisible(true), 50);
    return () => clearTimeout(timer);
  }, [activeCategory]);

  useEffect(() => {
    if (!gridRef.current || !gridVisible) return;
    const cards = gridRef.current.querySelectorAll('.menu-card');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 24, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.05, ease: 'power2.out' }
    );
  }, [gridVisible]);

  const handleAdd = useCallback((id: string, e: React.MouseEvent) => {
    const item = menuItems.find((m) => m.id === id);
    if (!item) return;

    // Cart fly animation
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    triggerCartFly(rect.left + rect.width / 2, rect.top + rect.height / 2);

    addItem(item);
    setAddedId(id);
    setTimeout(() => setAddedId(null), 1200);
  }, [addItem]);

  return (
    <section id="menu" ref={sectionRef} className="bg-ink text-white">
      <div className="max-w-[1440px] mx-auto px-[clamp(18px,3.4vw,44px)] py-[clamp(50px,8vh,100px)]">
        {/* Section heading */}
        <div ref={headingRef} className="mb-[clamp(24px,4vh,48px)]">
          <div className="text-[10px] font-medium tracking-[0.22em] uppercase text-white/40 mb-3">
            The Menu
          </div>
          <h2 className="font-[var(--font-heading)] text-[clamp(36px,5vw,64px)] font-bold tracking-[-0.02em] leading-none uppercase">
            TASTE THE<br />DIFFERENCE
          </h2>
        </div>

        {/* Category tabs — rounded pills */}
        <div className="flex gap-2 mb-[clamp(20px,3vh,40px)] overflow-x-auto scroll-x-mobile flex-nowrap pb-2">
          {menuCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 text-[11px] font-medium tracking-[0.16em] uppercase transition-all duration-300 rounded-full shrink-0 ${
                activeCategory === cat
                  ? 'bg-brand-yellow text-ink'
                  : 'bg-white/8 text-white/60 hover:bg-white/15 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu grid — rounded cards */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="menu-card group relative bg-white/5 border border-white/8 hover:border-brand-yellow/30 rounded-2xl overflow-hidden transition-all duration-400"
              style={{
                opacity: gridVisible ? 1 : 0,
                transform: gridVisible ? 'none' : 'translateY(24px)',
                transition: `opacity 0.5s cubic-bezier(0.22, 0.61, 0.36, 1) ${index * 50}ms, transform 0.5s cubic-bezier(0.22, 0.61, 0.36, 1) ${index * 50}ms`,
              }}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <LazyImage
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  {item.popular && (
                    <span className="bg-brand-yellow text-ink text-[9px] font-bold tracking-[0.12em] uppercase px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Star size={10} fill="currentColor" /> Popular
                    </span>
                  )}
                  {item.spicy && (
                    <span className="bg-brand-red text-white text-[9px] font-bold tracking-[0.12em] uppercase px-2.5 py-1 rounded-full flex items-center gap-1">
                      <Flame size={10} /> Spicy
                    </span>
                  )}
                </div>

                {/* Add button — round */}
                <button
                  onClick={(e) => handleAdd(item.id, e)}
                  className="absolute bottom-3 right-3 w-10 h-10 bg-brand-yellow text-ink rounded-full flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-brand-yellow-light hover:scale-110"
                  aria-label={`Add ${item.name} to cart`}
                >
                  {addedId === item.id ? (
                    <SuccessCheckmark size={18} />
                  ) : (
                    <Plus size={18} strokeWidth={2} />
                  )}
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <h3 className="text-sm font-semibold tracking-wide">{item.name}</h3>
                    <p className="text-[12.5px] text-white/50 mt-1 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="text-brand-yellow font-bold text-sm whitespace-nowrap font-[var(--font-accent)]">
                    ₦{item.price.toLocaleString()}
                  </div>
                </div>

                {/* Mobile add button — rounded pill */}
                <button
                  onClick={(e) => handleAdd(item.id, e)}
                  className="md:hidden w-full mt-3 bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow text-[10px] font-medium tracking-[0.18em] uppercase py-3 rounded-full hover:bg-brand-yellow hover:text-ink transition-all duration-300"
                >
                  {addedId === item.id ? (
                    <span className="flex items-center justify-center gap-2">
                      <SuccessCheckmark size={14} /> Added
                    </span>
                  ) : 'Add to Order'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
