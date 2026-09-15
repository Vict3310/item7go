import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Clock, Users, MapPin } from 'lucide-react';
import { locations } from '../data/locations';
import { useReducedMotion } from '../hooks/useScrollVideo';

gsap.registerPlugin(ScrollTrigger);

export default function ReservationForm() {
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
    setSubmitted(true);
  };

  return (
    <section id="reservation" ref={sectionRef} className="bg-earth text-white py-[clamp(50px,8vh,100px)]" style={{ opacity: reducedMotion ? 1 : 0 }}>
      <div className="max-w-[1440px] mx-auto px-[clamp(18px,3.4vw,44px)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {/* Left */}
          <div>
            <div className="text-[10px] font-medium tracking-[0.22em] uppercase text-white/40 mb-3">Reserve</div>
            <h2 className="font-[var(--font-heading)] text-[clamp(28px,5vw,56px)] font-bold tracking-tight leading-none uppercase mb-4">
              BOOK A TABLE
            </h2>
            <p className="text-white/50 text-sm max-w-[36ch] leading-relaxed mb-8">
              Secure your spot at Item7Go. Walk-ins welcome, but reservations guarantee your table.
            </p>
            <div className="space-y-4 text-sm text-white/50">
              <div className="flex items-center gap-3"><Calendar size={16} className="text-warm" /> Open daily from 10 AM</div>
              <div className="flex items-center gap-3"><Clock size={16} className="text-warm" /> Tables held for 15 minutes</div>
              <div className="flex items-center gap-3"><Users size={16} className="text-warm" /> Groups of 8+ call ahead</div>
              <div className="flex items-center gap-3"><MapPin size={16} className="text-warm" /> 4 locations across Lagos & Abuja</div>
            </div>
          </div>

          {/* Right form */}
          <div className="bg-white/5 border border-white/10 p-4 md:p-6 lg:p-8 rounded-3xl">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="text-4xl md:text-5xl mb-4">🍽️</div>
                <h3 className="font-[var(--font-heading)] text-xl md:text-2xl font-bold mb-2">Reservation Confirmed</h3>
                <p className="text-white/50 text-sm">We'll send you a confirmation shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  <input type="text" placeholder="First name" required className="bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-2 focus:outline-warm rounded-full" />
                  <input type="text" placeholder="Last name" required className="bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-2 focus:outline-warm rounded-full" />
                </div>
                <input type="email" placeholder="Email" required className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-2 focus:outline-warm rounded-full" />
                <input type="tel" placeholder="Phone" required className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-2 focus:outline-warm rounded-full" />
                <select required className="w-full bg-white/5 border border-white/10 px-4 py-3 text-sm text-white/60 focus:outline-2 focus:outline-warm rounded-full">
                  <option value="">Select location</option>
                  {locations.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                </select>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                  <input type="date" required className="bg-white/5 border border-white/10 px-4 py-3 text-sm text-white/60 focus:outline-2 focus:outline-warm rounded-full" />
                  <select required className="bg-white/5 border border-white/10 px-4 py-3 text-sm text-white/60 focus:outline-2 focus:outline-warm rounded-full">
                    <option value="">Time</option>
                    <option>11:00 AM</option><option>12:00 PM</option><option>1:00 PM</option>
                    <option>6:00 PM</option><option>7:00 PM</option><option>8:00 PM</option>
                  </select>
                  <select required className="bg-white/5 border border-white/10 px-4 py-3 text-sm text-white/60 focus:outline-2 focus:outline-warm rounded-full">
                    <option value="">Guests</option>
                    {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n === 1 ? 'guest' : 'guests'}</option>)}
                  </select>
                </div>
                <button type="submit" className="w-full bg-warm text-ink py-4 text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-warm-light transition-colors rounded-full">
                  Reserve Table
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
