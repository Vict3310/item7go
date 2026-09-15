

const posts = [
  { image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=400&q=80', likes: '2.4K' },
  { image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=400&q=80', likes: '1.8K' },
  { image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80', likes: '3.1K' },
  { image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80', likes: '2.7K' },
  { image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&q=80', likes: '1.5K' },
  { image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&q=80', likes: '4.2K' },
];

export default function InstagramFeed() {
  return (
    <section className="bg-ink py-[clamp(50px,8vh,80px)]">
      <div className="max-w-[1440px] mx-auto px-[clamp(18px,3.4vw,44px)]">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-[10px] font-medium tracking-[0.22em] uppercase text-white/40 mb-2">Follow Us</div>
            <h2 className="font-[var(--font-heading)] text-[clamp(28px,4vw,48px)] font-bold text-white tracking-tight uppercase">
              @ITEM7GO
            </h2>
          </div>
          <a href="#" className="flex items-center gap-2 text-warm text-[11px] font-medium tracking-[0.16em] uppercase hover:text-warm-light transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" /></svg> Follow
          </a>
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
          {posts.map((post, i) => (
            <a key={i} href="#" className="group relative aspect-square overflow-hidden bg-white/5 rounded-2xl">
              <img src={post.image} alt={`Item7Go post ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  ♥ {post.likes}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
