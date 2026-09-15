import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Flame, Star, Search, ShoppingBag } from 'lucide-react';
import { menuCategories, menuItems, type MenuCategory, type MenuItem } from '../data/menu';
import { useCart } from '../context/CartContext';


gsap.registerPlugin(ScrollTrigger);

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedId, setAddedId] = useState<string | null>(null);
  const { addItem, itemCount } = useCart();
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch =
      searchQuery === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Group by category for "All" view
  const groupedItems = activeCategory === 'All'
    ? menuCategories.map((cat) => ({
        category: cat,
        items: filteredItems.filter((item) => item.category === cat),
      })).filter((g) => g.items.length > 0)
    : [{ category: activeCategory, items: filteredItems }];

  useEffect(() => {
    if (!headingRef.current) return;
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.menu-item-card');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 24, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.05, ease: 'power2.out' }
    );
  }, [activeCategory, searchQuery]);

  const handleAdd = (item: MenuItem) => {
    addItem(item);
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  const popularItems = menuItems.filter((item) => item.popular);

  return (
    <div className="min-h-screen bg-ink text-white pt-[96px]">
      {/* Hero */}
      <section className="relative py-[clamp(60px,10vh,120px)] px-[clamp(18px,3.4vw,44px)] max-w-[1440px] mx-auto">
        <div ref={headingRef}>
          <div className="text-[10px] font-medium tracking-[0.22em] uppercase text-white/40 mb-3">
            Our Menu
          </div>
          <h1 className="font-[var(--font-heading)] text-[clamp(42px,7vw,90px)] font-bold tracking-[-0.03em] leading-[0.9] uppercase glitch-text" data-text="TASTE THE DIFFERENCE">
            TASTE THE<br />
            <span className="text-brand-yellow">DIFFERENCE</span>
          </h1>
          <p className="text-white/50 mt-6 text-[clamp(14px,1.2vw,18px)] max-w-[50ch] leading-relaxed">
            Authentic Nigerian flavours, made fresh daily. From our signature jollof to hand-cut suya — every dish tells a story.
          </p>
        </div>

        {/* Search */}
        <div className="mt-10 max-w-[480px] relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            placeholder="Search our menu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-full pl-12 pr-4 py-4 text-sm text-white placeholder:text-white/30 focus:outline-2 focus:outline-brand-yellow transition-all"
          />
        </div>
      </section>

      {/* Popular Picks */}
      {!searchQuery && activeCategory === 'All' && (
        <section className="px-[clamp(18px,3.4vw,44px)] max-w-[1440px] mx-auto mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Star size={16} className="text-brand-yellow" fill="currentColor" />
            <h2 className="text-[11px] font-medium tracking-[0.22em] uppercase text-white/60">Popular Picks</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularItems.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="menu-item-card group relative bg-white/5 border border-white/8 hover:border-brand-yellow/30 rounded-2xl transition-all duration-400 cursor-pointer"
                onClick={() => handleAdd(item)}
              >
                <div className="relative aspect-[3/2] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-sm font-semibold">{item.name}</h3>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-brand-yellow font-bold text-sm font-[var(--font-accent)]">
                        ₦{item.price.toLocaleString()}
                      </span>
                      <span className="text-[9px] font-bold tracking-[0.12em] uppercase bg-brand-yellow text-ink px-2 py-0.5">
                        Popular
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Category Tabs */}
      <section className="px-[clamp(18px,3.4vw,44px)] max-w-[1440px] mx-auto">
        <div className="flex gap-2 mb-10 border-b border-white/10 pb-4 overflow-x-auto scroll-x-mobile flex-nowrap md:flex-wrap">
          <button
            onClick={() => setActiveCategory('All')}              className={`px-5 py-2.5 text-[11px] font-medium tracking-[0.16em] uppercase transition-all duration-300 rounded-full whitespace-nowrap ${
              activeCategory === 'All'
                ? 'bg-brand-yellow text-ink'
                : 'bg-white/8 text-white/60 hover:bg-white/15 hover:text-white'
            }`}
          >
            All ({menuItems.length})
          </button>
          {menuCategories.map((cat) => {
            const count = menuItems.filter((i) => i.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 text-[11px] font-medium tracking-[0.16em] uppercase transition-all duration-300 rounded-full whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-brand-yellow text-ink'
                    : 'bg-white/8 text-white/60 hover:bg-white/15 hover:text-white'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Menu Grid */}
        <div ref={gridRef}>
          {groupedItems.map((group) => (
            <div key={group.category} className="mb-16">
              {activeCategory === 'All' && (
                <div className="flex items-center gap-4 mb-8">
                  <h3 className="font-[var(--font-heading)] text-2xl md:text-3xl font-bold uppercase tracking-tight">
                    {group.category}
                  </h3>
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-[11px] text-white/30 tracking-widest uppercase">
                    {group.items.length} {group.items.length === 1 ? 'item' : 'items'}
                  </span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {group.items.map((item) => (
                  <div
                    key={item.id}
                    className="menu-item-card group relative bg-white/5 border border-white/8 hover:border-brand-yellow/30 rounded-2xl transition-all duration-400"
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-white/5">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex gap-2">
                        {item.popular && (
                          <span className="bg-brand-yellow text-ink text-[9px] font-bold tracking-[0.12em] uppercase px-2.5 py-1 flex items-center gap-1">
                            <Star size={10} fill="currentColor" /> Popular
                          </span>
                        )}
                        {item.spicy && (
                          <span className="bg-brand-red text-white text-[9px] font-bold tracking-[0.12em] uppercase px-2.5 py-1 flex items-center gap-1">
                            <Flame size={10} /> Spicy
                          </span>
                        )}
                        {item.vegetarian && (
                          <span className="bg-green-600 text-white text-[9px] font-bold tracking-[0.12em] uppercase px-2.5 py-1">
                            Veg
                          </span>
                        )}
                      </div>

                      {/* Add button */}
                      <button
                        onClick={() => handleAdd(item)}
                        className="absolute bottom-3 right-3 w-10 h-10 bg-brand-yellow text-ink rounded-full flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-brand-yellow-light"
                        aria-label={`Add ${item.name} to cart`}
                      >
                        <Plus size={18} strokeWidth={2} />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <div className="flex justify-between items-start gap-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold tracking-wide">{item.name}</h3>
                          <p className="text-[12.5px] text-white/50 mt-1 line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                        <div className="text-brand-yellow font-bold text-sm whitespace-nowrap font-[var(--font-accent)]">
                          ₦{item.price.toLocaleString()}
                        </div>
                      </div>

                      {/* Mobile add button */}
                      <button
                        onClick={() => handleAdd(item)}
                        className="md:hidden w-full mt-3 bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow text-[10px] font-medium tracking-[0.18em] uppercase py-3 rounded-full hover:bg-brand-yellow hover:text-ink transition-all duration-300"
                      >
                        {addedId === item.id ? '✓ Added' : 'Add to Order'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {filteredItems.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-white/40 text-lg">No items found</p>
              <p className="text-white/25 text-sm mt-2">Try a different search or category</p>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-[clamp(18px,3.4vw,44px)] max-w-[1440px] mx-auto py-[clamp(60px,10vh,100px)]">
        <div className="bg-brand-red/10 border border-brand-red/20 p-8 md:p-12 rounded-3xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="font-[var(--font-heading)] text-2xl md:text-3xl font-bold uppercase mb-2">
              Know what you want?
            </h3>
            <p className="text-white/50 text-sm">
              Skip the browse — head straight to checkout and we'll get your order started.
            </p>
          </div>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 bg-brand-yellow text-ink px-8 py-4 text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-brand-yellow-light transition-colors rounded-full"
            >
              <ShoppingBag size={16} />
              View Cart ({itemCount})
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
