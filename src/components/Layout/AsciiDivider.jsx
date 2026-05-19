import './ascii-divider.css';

export default function AsciiDivider({ id, label, right }) {
  return (
    <div className="ascii-div" aria-hidden="true">
      <div className="ascii-div__inner container">
        <pre className="ascii-div__line">
{`┌────[ ${id} ]────────────────────────────────────────────────────────┐`}
        </pre>
        <div className="ascii-div__row">
          <span className="ascii-div__label">▓▒░ {label} ░▒▓</span>
          <span className="ascii-div__dot">●●●</span>
          <span className="ascii-div__right">{right} ───→</span>
        </div>
        <pre className="ascii-div__line">
{`└──────────────────────────────────────────────────────────────────────┘`}
        </pre>
      </div>
    </div>
  );
}
