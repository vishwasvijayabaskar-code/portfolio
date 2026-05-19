import { useId } from 'react';
import './duotone-photo.css';

// Duotone-treated photo via SVG filter.
// Usage:
//   <DuotonePhoto src="/photos/me.jpg" alt="..." variant="lime" rotate={-3} />
// variants: 'lime' | 'red' | 'cream'

const PALETTES = {
  lime:  { shadow: '#07050B', highlight: '#BFFF36' },
  red:   { shadow: '#07050B', highlight: '#F04000' },
  cream: { shadow: '#2E1A4A', highlight: '#FFFFE0' },
};

export default function DuotonePhoto({
  src,
  alt = '',
  variant = 'lime',
  rotate = 0,
  width,
  caption,
  className = '',
}) {
  const filterId = useId();
  const p = PALETTES[variant] || PALETTES.lime;

  return (
    <figure
      className={`duo ${className}`}
      style={{
        '--duo-rotate': `${rotate}deg`,
        width: width || 'auto',
      }}
    >
      <div className="duo__frame">
        <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
          <filter id={filterId}>
            <feColorMatrix
              type="matrix"
              values="0.33 0.33 0.33 0 0
                      0.33 0.33 0.33 0 0
                      0.33 0.33 0.33 0 0
                      0    0    0    1 0"
            />
            <feComponentTransfer colorInterpolationFilters="sRGB">
              <feFuncR
                type="table"
                tableValues={`${parseInt(p.shadow.slice(1, 3), 16) / 255} ${parseInt(p.highlight.slice(1, 3), 16) / 255}`}
              />
              <feFuncG
                type="table"
                tableValues={`${parseInt(p.shadow.slice(3, 5), 16) / 255} ${parseInt(p.highlight.slice(3, 5), 16) / 255}`}
              />
              <feFuncB
                type="table"
                tableValues={`${parseInt(p.shadow.slice(5, 7), 16) / 255} ${parseInt(p.highlight.slice(5, 7), 16) / 255}`}
              />
            </feComponentTransfer>
          </filter>
        </svg>
        <img
          src={src}
          alt={alt}
          className="duo__img"
          style={{ filter: `url(#${filterId}) contrast(1.15)` }}
          loading="lazy"
          onError={(e) => {
            if (e.currentTarget.src.endsWith('/photos/_placeholder.svg')) return;
            e.currentTarget.src = '/photos/_placeholder.svg';
          }}
        />
        <span className="duo__corner duo__corner--tl" />
        <span className="duo__corner duo__corner--tr" />
        <span className="duo__corner duo__corner--bl" />
        <span className="duo__corner duo__corner--br" />
      </div>
      {caption && <figcaption className="duo__caption mono">{caption}</figcaption>}
    </figure>
  );
}
