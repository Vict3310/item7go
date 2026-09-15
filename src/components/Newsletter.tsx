import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../hooks/useScrollVideo';

gsap.registerPlugin(ScrollTrigger);

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail('');
  };

  return (
    <section ref={sectionRef} className="bg-cream py-[clamp(50px,8vh,80px)]" style={{ opacity: reducedMotion ? 1 : 0 }}>
      <div className="max-w-[1440px] mx-auto px-[clamp(18px,3.4vw,44px)] text-center">
        <h2 className="font-[var(--font-heading)] text-[clamp(30px,4.6vw,56px)] font-bold tracking-[-0.03em] uppercase mb-3">
          STAY IN THE LOOP
        </h2>
        <p className="text-mid text-sm max-w-[40ch] mx-auto mb-8">
          Get exclusive deals, new menu drops, and event invites. We write once a month, never spam.
        </p>

        {submitted ? (
          <div className="text-warm font-medium tracking-wide">
            ✓ You're in! Check your inbox for a welcome surprise.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center max-w-[480px] mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-5 py-4 bg-white border border-ink/10 text-sm focus:outline-2 focus:outline-warm transition-all rounded-full"
            />
            <button
              type="submit"
              className="bg-ink text-white px-8 py-4 text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-warm hover:text-ink transition-colors duration-300 rounded-full"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
