import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './scroll-indicator.css';

export default function ScrollIndicator() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const fade = gsap.to(el, {
      opacity: 0,
      y: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        end: 'top 30%',
        scrub: true,
      },
    });

    return () => {
      fade.scrollTrigger?.kill();
      fade.kill();
    };
  }, []);

  return (
    <div className="scroll-ind mono" ref={ref}>
      <span className="scroll-ind__label">SCROLL</span>
      <span className="scroll-ind__bar">
        <span className="scroll-ind__fill" />
      </span>
      <span className="scroll-ind__hint">↓</span>
    </div>
  );
}
