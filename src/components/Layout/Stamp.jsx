import './stamp.css';

export default function Stamp({ label, rotate = -8, variant = 'red', className = '' }) {
  return (
    <span
      className={`stamp stamp--${variant} ${className}`}
      style={{ '--stamp-rotate': `${rotate}deg` }}
      aria-hidden="true"
    >
      <span className="stamp__inner">{label}</span>
    </span>
  );
}
