import { useReducedMotion } from '../hooks/useScrollVideo';

interface Props {
  color?: string;
  size?: number;
  className?: string;
}

export default function FluidBlob({ color = 'rgba(212, 32, 14, 0.12)', size = 400, className = '' }: Props) {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className={`fluid-blob absolute pointer-events-none ${reducedMotion ? '' : ''} ${className}`}
      style={{
        width: size,
        height: size,
        background: color,
        filter: 'blur(60px)',
        opacity: 0.6,
        animation: reducedMotion ? 'none' : undefined,
      }}
    />
  );
}
