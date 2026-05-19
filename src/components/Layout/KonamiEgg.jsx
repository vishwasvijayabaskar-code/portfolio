import { useEffect, useRef, useState } from 'react';
import './konami-egg.css';

const SEQ = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
const CHARS = ['A', 'C', 'G', 'U'];

export default function KonamiEgg() {
  const [active, setActive] = useState(false);
  const idxRef = useRef(0);
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === SEQ[idxRef.current]) {
        idxRef.current += 1;
        if (idxRef.current === SEQ.length) {
          setActive(true);
          idxRef.current = 0;
        }
      } else {
        idxRef.current = key === SEQ[0] ? 1 : 0;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!active) return undefined;
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const fontSize = 18;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array.from({ length: columns }, () => Math.random() * -50);

    const draw = () => {
      ctx.fillStyle = 'rgba(7, 5, 11, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px JetBrains Mono, monospace`;
      drops.forEach((d, i) => {
        const ch = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * fontSize;
        const y = d * fontSize;
        ctx.fillStyle = d * fontSize < 60 ? '#FFFFE0' : '#BFFF36';
        ctx.fillText(ch, x, y);
        if (y > canvas.height && Math.random() > 0.96) drops[i] = 0;
        else drops[i] += 1;
      });
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();

    const dismiss = () => setActive(false);
    const t = setTimeout(dismiss, 9000);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(t);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div className="konami" onClick={() => setActive(false)} aria-hidden="true">
      <canvas ref={canvasRef} className="konami__canvas" />
      <div className="konami__hud mono">
        <span>► CHEAT CODE ACCEPTED · LNCRNA SUBSYSTEM ENGAGED</span>
        <span className="konami__close">CLICK TO DISMISS</span>
      </div>
    </div>
  );
}
