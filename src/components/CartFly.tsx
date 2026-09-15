import { useState, useEffect } from 'react';

interface FlyDot {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

let flyDotId = 0;
let flyCallback: ((startX: number, startY: number) => void) | null = null;

export function triggerCartFly(startX: number, startY: number) {
  flyCallback?.(startX, startY);
}

export default function CartFly() {
  const [dots, setDots] = useState<FlyDot[]>([]);

  useEffect(() => {
    flyCallback = (startX: number, startY: number) => {
      const endX = window.innerWidth - 40;
      const endY = 30;
      const id = ++flyDotId;

      setDots((prev) => [...prev, { id, startX, startY, endX, endY }]);

      setTimeout(() => {
        setDots((prev) => prev.filter((d) => d.id !== id));
      }, 600);
    };

    return () => { flyCallback = null; };
  }, []);

  return (
    <>
      {dots.map((dot) => (
        <div
          key={dot.id}
          className="cart-fly-dot"
          style={{
            left: dot.startX,
            top: dot.startY,
            animation: `cart-fly-move 0.6s cubic-bezier(0.2, 0.8, 0.3, 1) forwards`,
            // @ts-expect-error CSS custom properties
            '--fly-x': `${dot.endX - dot.startX}px`,
            '--fly-y': `${dot.endY - dot.startY}px`,
          }}
        />
      ))}
      <style>{`
        @keyframes cart-fly-move {
          0% { transform: translate(0, 0) scale(1); opacity: 1; }
          60% { transform: translate(calc(var(--fly-x) * 0.6), calc(var(--fly-y) - 40px)) scale(0.6); opacity: 1; }
          100% { transform: translate(var(--fly-x), var(--fly-y)) scale(0.2); opacity: 0; }
        }
      `}</style>
    </>
  );
}
