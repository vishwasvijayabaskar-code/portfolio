import './halftone-image.css';

const FALLBACK = '/photos/_thumb-placeholder.svg';

export default function HalftoneImage({ src, alt = '', size = 120, className = '' }) {
  const onErr = (e) => {
    if (e.currentTarget.src.endsWith(FALLBACK)) return;
    e.currentTarget.src = FALLBACK;
  };
  return (
    <div
      className={`halftone ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label={alt}
    >
      <img src={src} alt={alt} className="halftone__img" loading="lazy" onError={onErr} />
      <span className="halftone__dots" aria-hidden="true" />
      <span className="halftone__overlay" aria-hidden="true" />
    </div>
  );
}
