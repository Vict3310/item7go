import { useEffect, useRef } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    total,
    itemCount,
    isOpen,
    closeCart,
  } = useCart();
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };
    if (isOpen) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, closeCart]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className={`fixed inset-0 bg-black/60 z-[60] transition-opacity duration-500 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />

      {/* Panel — always anchored to the RIGHT edge */}
      <div
        ref={panelRef}
        className={`fixed top-0 right-0 h-full w-full sm:max-w-[420px] bg-ink text-white z-[70] flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.6,0,0.2,1)] rounded-l-3xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 md:px-6 py-4 md:py-5 border-b border-white/10">
          <div className="flex items-center gap-2 md:gap-3">
            <ShoppingBag size={16} strokeWidth={1.5} className="md:size-[18px]" />
            <h2 className="text-xs md:text-sm font-medium tracking-[0.14em] uppercase">
              Your Order
            </h2>
            <span className="text-white/40 text-xs">({itemCount})</span>
          </div>
          <button
            onClick={closeCart}
            className="text-white/50 hover:text-white transition-colors"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-4 md:px-6 py-3 md:py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={36} className="text-white/15 mb-3 md:mb-4" />
              <p className="text-white/40 text-sm">Your cart is empty</p>
              <p className="text-white/25 text-xs mt-1">Add something delicious</p>
            </div>
          ) : (
            <div className="space-y-3 md:space-y-4">
              {items.map((ci) => (
                <div
                  key={ci.item.id}
                  className="flex gap-3 md:gap-4 p-3 bg-white/5 border border-white/5 rounded-2xl"
                >
                  <div className="w-14 h-14 md:w-16 md:h-16 shrink-0 overflow-hidden bg-white/5 rounded-xl">
                    <img
                      src={ci.item.image}
                      alt={ci.item.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-sm font-medium truncate">{ci.item.name}</h3>
                      <button
                        onClick={() => removeItem(ci.item.id)}
                        className="text-white/30 hover:text-spice transition-colors shrink-0"
                        aria-label={`Remove ${ci.item.name}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <p className="text-warm text-xs font-semibold mt-1">
                      ₦{ci.item.price.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => updateQuantity(ci.item.id, ci.quantity - 1)}
                        className="w-6 h-6 border border-white/15 flex items-center justify-center hover:border-white/40 transition-colors rounded-full"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="text-xs font-medium w-4 text-center">{ci.quantity}</span>
                      <button
                        onClick={() => updateQuantity(ci.item.id, ci.quantity + 1)}
                        className="w-6 h-6 border border-white/15 flex items-center justify-center hover:border-white/40 transition-colors rounded-full"
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                      <span className="ml-auto text-xs text-white/50">
                        ₦{(ci.item.price * ci.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-white/10 px-4 md:px-6 py-4 md:py-5 space-y-3 md:space-y-4">
            <div className="flex justify-between items-baseline">
              <span className="text-white/50 text-xs md:text-sm">Subtotal</span>
              <span className="font-[var(--font-heading)] text-lg md:text-xl font-bold">
                ₦{total.toLocaleString()}
              </span>
            </div>

            <button className="w-full bg-warm text-ink py-3 md:py-4 text-[10px] md:text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-warm-light transition-colors duration-300 btn-fill rounded-full">
              <span>Checkout — ₦{total.toLocaleString()}</span>
            </button>

            <button
              onClick={clearCart}
              className="w-full text-center text-white/30 text-[10px] md:text-[11px] tracking-[0.14em] uppercase hover:text-white/60 transition-colors"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
