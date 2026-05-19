import './terminal-frame.css';

// ASCII terminal-window wrapper for screenshots / images / arbitrary children.
// Usage:
//   <TerminalFrame title="output.png" path="~/lncrna/results">
//     <img src="..." alt="..." />
//   </TerminalFrame>

export default function TerminalFrame({ title = 'preview', path = '', children, className = '' }) {
  return (
    <figure className={`term-frame ${className}`}>
      <header className="term-frame__bar mono">
        <span className="term-frame__dots">
          <span className="term-frame__dot term-frame__dot--r" />
          <span className="term-frame__dot term-frame__dot--y" />
          <span className="term-frame__dot term-frame__dot--g" />
        </span>
        <span className="term-frame__title">▓ {title}</span>
        {path && <span className="term-frame__path">{path}</span>}
      </header>
      <div className="term-frame__body">{children}</div>
      <footer className="term-frame__foot mono">
        <span>READY</span>
        <span>UTF-8 · LF · 100%</span>
      </footer>
    </figure>
  );
}
