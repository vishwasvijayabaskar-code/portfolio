import { useEffect, useRef, useState } from 'react';
import useMagnetic from '../../hooks/useMagnetic.js';
import { useCursorHandlers } from '../../context/CursorContext.jsx';

const SCRAMBLE_CHARS = '!@#$%^&*<>/\\|01XV?';

function scramble(target, durationMs, setValue) {
  const len = target.length;
  let frame = 0;
  const totalFrames = Math.max(12, Math.floor(durationMs / 30));
  const interval = setInterval(() => {
    frame += 1;
    const progress = frame / totalFrames;
    let out = '';
    for (let i = 0; i < len; i += 1) {
      const reveal = i / len;
      if (progress > reveal) {
        out += target[i];
      } else {
        out += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }
    }
    setValue(out);
    if (frame >= totalFrames) {
      clearInterval(interval);
      setValue(target);
    }
  }, 30);
  return () => clearInterval(interval);
}

export default function ContactLink({ label, value, href, onClick, variant = 'write' }) {
  const ref = useMagnetic(0.25);
  const cursor = useCursorHandlers(variant, 'OPEN');
  const [display, setDisplay] = useState(value);
  const cleanupRef = useRef(null);

  useEffect(() => {
    setDisplay(value);
  }, [value]);

  const handleEnter = () => {
    cleanupRef.current?.();
    cleanupRef.current = scramble(value, 450, setDisplay);
  };

  const handleLeave = () => {
    cleanupRef.current?.();
    setDisplay(value);
  };

  const Tag = href ? 'a' : 'button';
  const extras = href ? { href, target: '_blank', rel: 'noreferrer noopener' } : { type: 'button', onClick };

  return (
    <Tag
      className="contact-link"
      ref={ref}
      data-magnetic
      onMouseEnter={(e) => {
        cursor.onMouseEnter(e);
        handleEnter();
      }}
      onMouseLeave={(e) => {
        cursor.onMouseLeave(e);
        handleLeave();
      }}
      {...extras}
    >
      <span className="contact-link__label mono">{label}</span>
      <span className="contact-link__value display">{display}</span>
    </Tag>
  );
}
