import { type ReactNode, useRef, useCallback } from 'react';

interface Props {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  strength?: number;
}

export default function MagneticButton({ children, onClick, href, className = '', strength = 0.3 }: Props) {
  const ref = useRef<HTMLElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  }, [strength]);

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'translate(0, 0)';
  }, []);

  const props = {
    ref: ref as any,
    className: `magnetic-btn ${className}`,
    onMouseMove,
    onMouseLeave,
    onClick,
  };

  if (href) {
    return <a href={href} {...props}>{children}</a>;
  }
  return <button {...props}>{children}</button>;
}
