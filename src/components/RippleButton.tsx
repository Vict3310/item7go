import { type ReactNode, type MouseEvent } from 'react';

interface Props {
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  'aria-label'?: string;
}

export default function RippleButton({ children, onClick, className = '', type = 'button', disabled, ...rest }: Props) {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Create ripple
    const ripple = document.createElement('span');
    ripple.className = 'ripple-circle';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.width = ripple.style.height = `${Math.max(rect.width, rect.height)}px`;
    btn.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);

    onClick?.(e);
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`ripple-btn ${className}`}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
