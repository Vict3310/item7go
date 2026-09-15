import { useReducedMotion } from '../hooks/useScrollVideo';

interface Props {
  color?: string;
  className?: string;
}

export default function MorphBackground({ color = 'rgba(212, 32, 14, 0.06)', className = '' }: Props) {
  const reducedMotion = useReducedMotion();

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <div
        className="morph-bg absolute"
        style={{
          width: '60vw',
          height: '60vw',
          maxWidth: '800px',
          maxHeight: '800px',
          background: color,
          top: '-10%',
          right: '-10%',
          animation: reducedMotion ? 'none' : undefined,
        }}
      />
      <div
        className="morph-bg absolute"
        style={{
          width: '40vw',
          height: '40vw',
          maxWidth: '500px',
          maxHeight: '500px',
          background: 'rgba(255, 209, 0, 0.04)',
          bottom: '-5%',
          left: '-5%',
          animation: reducedMotion ? 'none' : undefined,
          animationDelay: '-4s',
        }}
      />
    </div>
  );
}
