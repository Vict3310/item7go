import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Images } from 'lucide-react';

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

const galleryImages: GalleryImage[] = [
  { src: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=1200&q=80', alt: 'Jollof Rice', caption: 'Our signature jollof' },
  { src: 'https://images.unsplash.com/photo-1558030006-450675393462?w=1200&q=80', alt: 'Suya Platter', caption: 'Grilled suya with yaji spice' },
  { src: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=1200&q=80', alt: 'Egusi Soup', caption: 'Rich egusi with assorted proteins' },
  { src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80', alt: 'Interior', caption: 'The dining space' },
  { src: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&q=80', alt: 'Food Spread', caption: 'A feast for the senses' },
  { src: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=1200&q=80', alt: 'Plantain', caption: 'Golden fried plantain' },
];

interface Props {
  images?: GalleryImage[];
}

export default function GalleryLightbox({ images = galleryImages }: Props) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  const goNext = useCallback(() => setCurrent((c) => (c + 1) % images.length), [images.length]);
  const goPrev = useCallback(() => setCurrent((c) => (c - 1 + images.length) % images.length), [images.length]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, goNext, goPrev]);

  return (
    <section className="bg-bone py-[clamp(50px,8vh,80px)]">
      <div className="max-w-[1440px] mx-auto px-[clamp(18px,3.4vw,44px)]">
        {/* Section header */}
        <div className="mb-8">
          <div className="text-[10px] font-medium tracking-[0.22em] uppercase text-mid mb-3">Gallery</div>
          <h2 className="font-[var(--font-heading)] text-[clamp(32px,4.5vw,56px)] font-bold tracking-tight leading-none uppercase">
            INSIDE<br />ITEM7GO
          </h2>
        </div>

        {/* Grid preview */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {images.slice(0, 6).map((img, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); setOpen(true); }}
              className="aspect-square overflow-hidden bg-ink/10 cursor-pointer group rounded-2xl relative"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <Images size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {open && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center">
          <button onClick={() => setOpen(false)} className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-10" aria-label="Close">
            <X size={28} />
          </button>

          <button onClick={goPrev} className="absolute left-4 text-white/60 hover:text-white transition-colors z-10" aria-label="Previous">
            <ChevronLeft size={36} />
          </button>

          <div className="max-w-[90vw] max-h-[85vh] flex flex-col items-center">
            <img src={images[current].src} alt={images[current].alt} className="max-w-full max-h-[75vh] object-contain rounded-xl" />
            {images[current].caption && (
              <p className="text-white/60 text-sm mt-4">{images[current].caption}</p>
            )}
            <p className="text-white/30 text-xs mt-2">{current + 1} / {images.length}</p>
          </div>

          <button onClick={goNext} className="absolute right-4 text-white/60 hover:text-white transition-colors z-10" aria-label="Next">
            <ChevronRight size={36} />
          </button>
        </div>
      )}
    </section>
  );
}
