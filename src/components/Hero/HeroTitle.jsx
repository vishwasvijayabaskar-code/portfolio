import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const NAME_FIRST = 'VISHWAS';
const NAME_LAST = 'VIJAYABASKAR';
const TAGLINE = 'PUZZLES TO PROBLEMS';

function splitChars(text) {
  return text.split('').map((ch, i) => (
    <span key={`${ch}-${i}`} className="hero__char" data-char>
      {ch === ' ' ? ' ' : ch}
    </span>
  ));
}

export default function HeroTitle() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const chars = root.querySelectorAll('[data-char]');
    const tag = root.querySelector('[data-tagline]');

    gsap.set(chars, { yPercent: 110, opacity: 0 });
    gsap.set(tag, { yPercent: 100, opacity: 0 });

    const tl = gsap.timeline({ delay: 0.2 });
    tl.to(chars, {
      yPercent: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'expo.out',
      stagger: { each: 0.025, from: 'start' },
    });
    tl.to(
      tag,
      {
        yPercent: 0,
        opacity: 1,
        duration: 1.0,
        ease: 'expo.out',
      },
      '-=0.7'
    );

    return () => tl.kill();
  }, []);

  return (
    <h1 className="hero__title display" ref={rootRef}>
      <span className="hero__title-row">{splitChars(NAME_FIRST)}</span>
      <span className="hero__title-row">{splitChars(NAME_LAST)}</span>
      <div className="hero__title-tag">
        <span className="hero__tagline" data-tagline>
          / {TAGLINE}
        </span>
        <span className="hero__id">[ID — 16YO · NC]</span>
      </div>
    </h1>
  );
}
