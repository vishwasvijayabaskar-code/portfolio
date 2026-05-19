import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useCursorState } from '../../context/CursorContext.jsx';
import './cursor.css';

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const { variant, label } = useCursorState();

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return undefined;

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3.out' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3.out' });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.32, ease: 'power3.out' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.32, ease: 'power3.out' });

    const onMove = (e) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div className="cursor" aria-hidden="true">
      <div ref={dotRef} className={`cursor__dot cursor__dot--${variant}`} />
      <div ref={ringRef} className={`cursor__ring cursor__ring--${variant}`}>
        {label && <span className="cursor__label mono">{label}</span>}
      </div>
    </div>
  );
}
