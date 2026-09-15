import { useState, useRef, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Plus, Trash2, Receipt } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { menuItems } from '../data/menu';
import { useReducedMotion } from '../hooks/useScrollVideo';

gsap.registerPlugin(ScrollTrigger);

interface Person {
  id: number;
  name: string;
  items: { name: string; price: number }[];
}

export default function SplitBill() {
  const [people, setPeople] = useState<Person[]>([
    { id: 1, name: 'Person 1', items: [] },
    { id: 2, name: 'Person 2', items: [] },
  ]);
  const [showMenu, setShowMenu] = useState<number | null>(null);
  const [shareUrl] = useState('https://item7go.com/split/abc123');
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

  const addPerson = () => {
    setPeople([...people, { id: Date.now(), name: `Person ${people.length + 1}`, items: [] }]);
  };

  const removePerson = (id: number) => {
    if (people.length <= 2) return;
    setPeople(people.filter(p => p.id !== id));
  };

  const addItem = (personId: number, item: { name: string; price: number }) => {
    setPeople(people.map(p =>
      p.id === personId ? { ...p, items: [...p.items, item] } : p
    ));
    setShowMenu(null);
  };

  const removeItem = (personId: number, index: number) => {
    setPeople(people.map(p =>
      p.id === personId ? { ...p, items: p.items.filter((_, i) => i !== index) } : p
    ));
  };

  const getPersonTotal = (person: Person) =>
    person.items.reduce((sum, item) => sum + item.price, 0);

  const grandTotal = people.reduce((sum, p) => sum + getPersonTotal(p), 0);
  const tip = Math.round(grandTotal * 0.1);

  return (
    <section ref={sectionRef} className="bg-bone py-[clamp(50px,8vh,100px)]" style={{ opacity: reducedMotion ? 1 : 0 }}>
      <div className="max-w-[1440px] mx-auto px-[clamp(18px,3.4vw,44px)]">
        <div className="text-[10px] font-medium tracking-[0.22em] uppercase text-mid mb-3">Group Dining</div>
        <h2 className="font-[var(--font-heading)] text-[clamp(32px,4.5vw,56px)] font-bold tracking-tight leading-none uppercase mb-4">
          SPLIT THE<br />BILL
        </h2>
        <p className="text-earth-light text-sm max-w-[40ch] mb-8">
          Everyone adds their items. The app splits it automatically. No awkward math at the table.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* People cards */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {people.map((person) => (
              <div key={person.id} className="bg-white border border-ink/5 p-5">
                <div className="flex items-center justify-between mb-4">
                  <input
                    value={person.name}
                    onChange={(e) => setPeople(people.map(p => p.id === person.id ? { ...p, name: e.target.value } : p))}
                    className="font-semibold text-sm bg-transparent border-b border-ink/10 focus:outline-warm flex-1 mr-2"
                  />
                  {people.length > 2 && (
                    <button onClick={() => removePerson(person.id)} className="text-mid hover:text-spice transition-colors">
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>

                {person.items.length === 0 ? (
                  <p className="text-mid text-xs italic">No items yet</p>
                ) : (
                  <div className="space-y-2 mb-4">
                    {person.items.map((item, i) => (
                      <div key={i} className="flex justify-between items-center text-sm">
                        <span className="text-earth-light">{item.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">₦{item.price.toLocaleString()}</span>
                          <button onClick={() => removeItem(person.id, i)} className="text-mid/40 hover:text-spice">
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => setShowMenu(showMenu === person.id ? null : person.id)}
                  className="w-full border border-dashed border-ink/15 py-2 text-[11px] font-medium tracking-[0.14em] uppercase text-mid hover:border-warm/40 hover:text-warm transition-colors"
                >
                  <Plus size={14} className="inline mr-1" /> Add Item
                </button>

                {showMenu === person.id && (
                  <div className="mt-3 bg-bone p-3 max-h-[200px] overflow-y-auto space-y-1">
                    {menuItems.slice(0, 12).map((item) => (
                      <button
                        key={item.id}
                        onClick={() => addItem(person.id, { name: item.name, price: item.price })}
                        className="w-full flex justify-between items-center text-xs py-2 px-2 hover:bg-white transition-colors text-left"
                      >
                        <span>{item.name}</span>
                        <span className="text-warm font-medium">₦{item.price.toLocaleString()}</span>
                      </button>
                    ))}
                  </div>
                )}

                <div className="mt-3 pt-3 border-t border-ink/5 flex justify-between text-sm font-semibold">
                  <span>{person.name}'s total</span>
                  <span className="text-warm">₦{getPersonTotal(person).toLocaleString()}</span>
                </div>
              </div>
            ))}

            <button
              onClick={addPerson}
              className="border border-dashed border-ink/15 p-5 flex items-center justify-center text-mid hover:border-warm/40 hover:text-warm transition-colors min-h-[120px]"
            >
              <Plus size={20} className="mr-2" /> Add Person
            </button>
          </div>

          {/* Summary sidebar */}
          <div className="bg-ink text-white p-6 h-fit md:sticky md:top-24">
            <div className="flex items-center gap-2 mb-6">
              <Receipt size={18} className="text-warm" />
              <h3 className="font-semibold tracking-wide">Bill Summary</h3>
            </div>

            <div className="space-y-3 mb-6">
              {people.map((p) => (
                <div key={p.id} className="flex justify-between text-sm">
                  <span className="text-white/60">{p.name} ({p.items.length} items)</span>
                  <span>₦{getPersonTotal(p).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Subtotal</span>
                <span>₦{grandTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/60">Tip (10%)</span>
                <span>₦{tip.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-white/10">
                <span>Total</span>
                <span className="text-warm">₦{(grandTotal + tip).toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="text-[10px] font-medium tracking-[0.16em] uppercase text-white/40 mb-3">Share with your group</div>
              <div className="flex justify-center bg-white p-4">
                <QRCodeSVG value={shareUrl} size={120} bgColor="#FFFFFF" fgColor="#101010" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
