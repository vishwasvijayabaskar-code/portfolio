import './hero-ticker.css';

const ITEMS = [
  'NOW BUILDING · lncRNA classifier',
  '◆',
  'last commit · curo/auth',
  '◆',
  'shipped · ssma v1.2',
  '◆',
  'reading · The Selfish Gene',
  '◆',
  'cube PR · 18.34s',
  '◆',
  'chess · 1300 OTB',
  '◆',
  'open to · research, builds, weird ideas',
  '◆',
  'currently · awake when I shouldn\'t be',
  '◆',
  'NOW BUILDING · lncRNA classifier',
  '◆',
  'last commit · curo/auth',
  '◆',
  'shipped · ssma v1.2',
];

export default function HeroTicker() {
  return (
    <div className="hero-ticker" aria-hidden="true">
      <div className="hero-ticker__rail">
        {[...ITEMS, ...ITEMS].map((it, i) => (
          <span
            key={i}
            className={`hero-ticker__item mono ${it === '◆' ? 'is-diamond' : ''}`}
          >
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}
