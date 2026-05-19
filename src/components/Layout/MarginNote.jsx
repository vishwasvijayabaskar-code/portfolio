import './margin-note.css';

export default function MarginNote({ children, side = 'right', rotate = -4, top = '20%', className = '' }) {
  return (
    <span
      className={`margin-note margin-note--${side} ${className}`}
      style={{ '--note-rotate': `${rotate}deg`, '--note-top': top }}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}
