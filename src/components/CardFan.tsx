import { type ReactNode, useRef, useState, useCallback } from 'react';

interface Props {
  children: ReactNode[];
  className?: string;
}

export default function CardFan({ children, className = '' }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [mouseX, setMouseX] = useState(0);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    setMouseX(x);
  }, []);

  const count = children.length;
  const spread = 12; // degrees per card

  return (
    <div
      ref={containerRef}
      className={`relative h-[400px] ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMouseX(0); }}
      onMouseMove={onMouseMove}
      style={{ perspective: '1000px' }}
    >
      {children.map((child, i) => {
        const center = (count - 1) / 2;
        const offset = i - center;
        const baseAngle = offset * spread;
        const fanAngle = hovered ? baseAngle + mouseX * 5 : 0;
        const fanX = hovered ? offset * 30 : 0;
        const fanZ = hovered ? -Math.abs(offset) * 10 : 0;

        return (
          <div
            key={i}
            className="absolute inset-0 transition-all duration-500"
            style={{
              transform: `translateX(${fanX}px) translateZ(${fanZ}px) rotate(${fanAngle}deg)`,
              transformOrigin: 'bottom center',
              zIndex: i === Math.round(mouseX * 2 + center) ? 10 : count - Math.abs(offset),
              opacity: hovered ? (i === Math.round(mouseX * 2 + center) ? 1 : 0.6) : (i === Math.round(center) ? 1 : 0.8),
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}
