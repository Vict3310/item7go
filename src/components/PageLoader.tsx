import { useEffect, useState } from 'react';

export default function PageLoader() {
  const [phase, setPhase] = useState<'draw' | 'progress' | 'exit' | 'done'>('draw');

  useEffect(() => {
    // Phase 1: Logo draw (1.2s)
    const t1 = setTimeout(() => setPhase('progress'), 1200);
    // Phase 2: Loading (1.8s)
    const t2 = setTimeout(() => setPhase('exit'), 3000);
    // Phase 3: Exit fade (0.6s)
    const t3 = setTimeout(() => setPhase('done'), 3600);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[100000] bg-ink flex flex-col items-center justify-center transition-opacity duration-700 ${
        phase === 'done' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Animated logo */}
      <div className="relative mb-8">
        {/* Rotating ring */}
        <div
          className={`w-24 h-24 rounded-full border-2 border-brand-yellow/30 flex items-center justify-center ${
            phase === 'draw' ? 'scale-100' : phase === 'progress' ? 'scale-95' : 'scale-150 opacity-0'
          }`}
          style={{
            transition: 'all 0.8s cubic-bezier(0.22, 0.61, 0.36, 1)',
          }}
        >
          {/* Inner pulse */}
          <div className="w-12 h-12 rounded-full border border-brand-yellow/50" />
        </div>

        {/* Brand number */}
        <div
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="text-brand-yellow font-[var(--font-heading)] text-4xl font-bold">
            7
          </span>
        </div>
      </div>

      {/* Brand name */}
      <h1
        className="font-[var(--font-heading)] text-2xl md:text-3xl font-bold tracking-[0.15em] text-white mb-2"
        style={{
          opacity: phase === 'done' ? 0 : 1,
          transform: phase === 'exit' ? 'translateY(-10px)' : 'none',
          transition: 'all 0.6s cubic-bezier(0.22, 0.61, 0.36, 1)',
        }}
      >
        ITEM<span className="text-brand-red">7</span>GO
      </h1>

      {/* Tagline */}
      <p
        className="text-white/40 text-xs tracking-[0.25em] uppercase mb-8"
        style={{
          opacity: phase === 'done' ? 0 : 1,
          transition: 'opacity 0.6s ease',
        }}
      >
        Premium Nigerian Cuisine
      </p>

      {/* Progress bar */}
      {phase === 'progress' && (
        <div
          className="w-32 h-[2px] bg-white/10 rounded-full overflow-hidden"
          style={{
            opacity: phase === 'done' ? 0 : 1,
            transition: 'opacity 0.4s ease',
          }}
        >
          <div
            className="h-full bg-brand-yellow rounded-full"
            style={{
              animation: 'loader-progress 1.8s cubic-bezier(0.22, 0.61, 0.36, 1) forwards',
            }}
          />
        </div>
      )}

      {/* CSS for progress animation */}
      <style>{`
        @keyframes loader-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
