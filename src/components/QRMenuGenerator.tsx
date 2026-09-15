import { useState, useRef, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Copy, Check } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../hooks/useScrollVideo';

gsap.registerPlugin(ScrollTrigger);

export default function QRMenuGenerator() {
  const [tableNumber, setTableNumber] = useState(1);
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const menuUrl = `https://item7go.com/menu?table=${tableNumber}`;

  useEffect(() => {
    if (reducedMotion) return;
    const el = sectionRef.current;
    if (!el) return;
    gsap.fromTo(el, { opacity: 0, y: 40 }, {
      opacity: 1, y: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' },
    });
  }, [reducedMotion]);

  const handleCopy = () => {
    navigator.clipboard.writeText(menuUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const svg = document.querySelector('#qr-code svg') as SVGElement;
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      ctx?.drawImage(img, 0, 0, 400, 400);
      const a = document.createElement('a');
      a.download = `item7go-table-${tableNumber}.png`;
      a.href = canvas.toDataURL('image/png');
      a.click();
    };
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <section ref={sectionRef} className="bg-cream py-[clamp(50px,8vh,100px)]" style={{ opacity: reducedMotion ? 1 : 0 }}>
      <div className="max-w-[1440px] mx-auto px-[clamp(18px,3.4vw,44px)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <div className="text-[10px] font-medium tracking-[0.22em] uppercase text-mid mb-3">For Restaurants</div>
            <h2 className="font-[var(--font-heading)] text-[clamp(32px,4.5vw,56px)] font-bold tracking-tight leading-none uppercase mb-4">
              TABLE<br />QR MENU
            </h2>
            <p className="text-earth-light text-sm leading-relaxed max-w-[40ch] mb-8">
              Generate a branded QR code for each table. Customers scan it, see the menu, and order directly. No app needed.
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-[11px] font-medium tracking-[0.16em] uppercase text-mid block mb-2">Table Number</label>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((n) => (
                    <button
                      key={n}
                      onClick={() => setTableNumber(n)}
                      className={`w-10 h-10 text-sm font-medium border transition-all duration-200 ${
                        tableNumber === n
                          ? 'bg-warm text-ink border-warm'
                          : 'bg-white border-ink/10 text-earth-light hover:border-warm/40'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={handleCopy} className="flex items-center gap-2 bg-ink text-white px-6 py-3 text-[11px] font-medium tracking-[0.16em] uppercase hover:bg-warm hover:text-ink transition-colors">
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? 'Copied!' : 'Copy Link'}
                </button>
                <button onClick={handleDownload} className="flex items-center gap-2 border border-ink/15 text-earth-light px-6 py-3 text-[11px] font-medium tracking-[0.16em] uppercase hover:border-warm/40 transition-colors">
                  <Download size={14} /> Download PNG
                </button>
              </div>
            </div>
          </div>

          {/* Right — QR code */}
          <div className="flex justify-center">
            <div id="qr-code" className="bg-white p-8 shadow-lg">
              <QRCodeSVG
                value={menuUrl}
                size={280}
                bgColor="#FFFFFF"
                fgColor="#101010"
                level="H"
                includeMargin={false}
              />
              <div className="text-center mt-4">
                <img src="/item7gologo.png" alt="Item7Go" className="h-6 w-auto mx-auto" />
                <div className="text-[11px] text-mid mt-1">Table {tableNumber}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
