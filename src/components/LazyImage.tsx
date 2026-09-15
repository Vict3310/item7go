import { useState, useRef, useEffect } from 'react';

interface Props {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

export default function LazyImage({ src, alt, className = '', loading = 'lazy' }: Props) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Image will start loading because of native lazy loading
          // Also handle the case where image is already cached
          if (img.complete) {
            setLoaded(true);
          }
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(img);
    return () => observer.disconnect();
  }, []);

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      loading={loading}
      className={`lazy-fade ${loaded ? 'loaded' : ''} ${className}`}
      onLoad={() => setLoaded(true)}
    />
  );
}
