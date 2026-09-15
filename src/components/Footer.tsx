import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';

const footerLinks = {
  menu: [
    { label: 'Rice', href: '/menu' },
    { label: 'Swallow', href: '/menu' },
    { label: 'Soups', href: '/menu' },
    { label: 'Proteins', href: '/menu' },
    { label: 'Drinks', href: '/menu' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Locations', href: '/locations' },
    { label: 'Experience', href: '/experience' },
    { label: 'Careers', href: '#' },
    { label: 'Catering', href: '#' },
  ],
  help: [
    { label: 'Order Online', href: '/menu' },
    { label: 'Reservations', href: '/experience' },
    { label: 'Gift Cards', href: '#' },
    { label: 'FAQ', href: '#' },
    { label: 'Contact', href: '#' },
  ],
};

const SocialIcon = ({ name }: { name: string }) => {
  const paths: Record<string, ReactNode> = {
    Instagram: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
    Twitter: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    Facebook: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    YouTube: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  };
  return <>{paths[name] || null}</>;
};

const socials = [
  { label: 'Instagram', href: '#' },
  { label: 'Twitter', href: '#' },
  { label: 'Facebook', href: '#' },
  { label: 'YouTube', href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="max-w-[1440px] mx-auto px-[clamp(18px,3.4vw,44px)] pt-[clamp(50px,8vh,80px)] pb-8">
        {/* Top CTA */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-[clamp(30px,5vh,60px)] border-b border-white/10">
          <div>
            <h3 className="font-[var(--font-heading)] text-[clamp(28px,4vw,44px)] font-bold tracking-tight leading-none">
              HUNGRY YET?
            </h3>
            <p className="text-white/40 mt-2 text-sm max-w-[36ch]">
              Order online or visit us. Nigerian food the way it should be.
            </p>
          </div>
          <div className="flex gap-4 flex-wrap">
            <Link
              to="/menu"
              className="shimmer-btn bg-brand-yellow text-ink px-8 py-4 text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-brand-yellow-light transition-colors duration-300 btn-fill rounded-full"
            >
              <span>Order Now</span>
            </Link>
            <Link
              to="/locations"
              className="border border-white/20 text-white px-8 py-4 text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-white/5 transition-colors duration-300 rounded-full"
            >
              Find a Location
            </Link>
          </div>
        </div>

        {/* Main columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 py-[clamp(30px,5vh,60px)]">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <img src="/item7gologo.png" alt="Item7Go" className="h-10 w-auto mb-4" />
            <p className="text-white/40 text-sm leading-relaxed max-w-[28ch]">
              Nigerian food, made with love. Serving authentic flavours since day one.
            </p>
            <div className="flex gap-3 mt-5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/40 hover:text-brand-yellow hover:border-brand-yellow/40 transition-all duration-300"
                  aria-label={s.label}
                >
                  <SocialIcon name={s.label} />
                </a>
              ))}
            </div>
          </div>

          {/* Menu */}
          <div>
            <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4">Menu</h4>
            <div className="space-y-2.5">
              {footerLinks.menu.map((link) => (
                <Link key={link.label} to={link.href} className="block text-sm text-white/40 hover:text-white transition-colors duration-300">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4">Company</h4>
            <div className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <Link key={link.label} to={link.href} className="block text-sm text-white/40 hover:text-white transition-colors duration-300">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4">Help</h4>
            <div className="space-y-2.5">
              {footerLinks.help.map((link) => (
                <Link key={link.label} to={link.href} className="block text-sm text-white/40 hover:text-white transition-colors duration-300">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-t border-white/10">
          <div>
            <div className="text-[10px] font-medium tracking-[0.22em] uppercase text-white/30 mb-2">Head Office</div>
            <p className="text-sm text-white/50 leading-relaxed">14A Adeola Odeku Street<br />Victoria Island, Lagos</p>
          </div>
          <div>
            <div className="text-[10px] font-medium tracking-[0.22em] uppercase text-white/30 mb-2">Contact</div>
            <p className="text-sm text-white/50">hello@item7go.com<br />+234 812 345 6789</p>
          </div>
          <div>
            <div className="text-[10px] font-medium tracking-[0.22em] uppercase text-white/30 mb-2">Hours</div>
            <p className="text-sm text-white/50">Mon – Sun: 10:00 AM – 11:00 PM<br />Delivery available</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-white/10 text-[11px] text-white/25">
          <span>&copy; 2026 Item7Go. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white/50 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/50 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
