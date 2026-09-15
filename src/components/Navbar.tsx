import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const navLinks = [
  { label: 'Menu', href: '/menu' },
  { label: 'Experience', href: '/experience' },
  { label: 'Locations', href: '/locations' },
  { label: 'About', href: '/about' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount, openCart } = useCart();
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Floating pill navbar */}
      <div className="fixed top-4 left-0 right-0 z-[99999] px-4 md:px-8 flex justify-center pointer-events-none">
        <nav className="pointer-events-auto bg-ink/95 backdrop-blur-xl border border-white/8 rounded-full shadow-2xl shadow-black/30 w-full max-w-[1100px] flex items-center justify-between h-14 md:h-16 px-3 md:px-6 transition-all duration-300">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img src="/item7gologo.png" alt="Item7Go" className="h-7 md:h-9 w-auto" />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`text-[11px] font-medium tracking-[0.14em] uppercase px-4 py-2 rounded-full transition-all duration-300 ${
                  location.pathname === link.href
                    ? 'bg-brand-yellow/15 text-brand-yellow'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={openCart}
              className="relative text-white/80 hover:text-brand-yellow transition-colors duration-300 p-2 rounded-full hover:bg-white/5"
              aria-label="Open cart"
            >
              <ShoppingBag size={18} />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-brand-yellow text-ink text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            <Link
              to="/menu"
              className="hidden md:inline-block bg-brand-yellow text-ink text-[10px] font-bold tracking-[0.16em] uppercase px-5 py-2.5 rounded-full hover:bg-brand-yellow-light transition-colors duration-300"
            >
              Order Now
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden text-white/80 hover:text-white p-2 rounded-full hover:bg-white/5 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile dropdown (below the pill) */}
      {mobileOpen && (
        <div className="fixed top-[68px] left-4 right-4 z-[99998] md:hidden pointer-events-auto">
          <div className="bg-ink/95 backdrop-blur-xl border border-white/8 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`block px-6 py-4 text-[12px] font-medium tracking-[0.14em] uppercase transition-colors border-b border-white/5 last:border-0 ${
                  location.pathname === link.href
                    ? 'text-brand-yellow bg-brand-yellow/5'
                    : 'text-white/80 hover:text-brand-yellow hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="p-4">
              <Link
                to="/menu"
                className="block bg-brand-yellow text-ink text-[11px] font-bold tracking-[0.2em] uppercase px-6 py-3 text-center rounded-full"
              >
                Order Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
