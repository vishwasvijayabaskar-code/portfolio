import HeroTitle from './HeroTitle.jsx';
import ScrollIndicator from './ScrollIndicator.jsx';
import './hero.css';

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero__inner container">
        <div className="hero__meta mono">
          <span>VV</span>
          <span>2026 — PORTFOLIO</span>
          <span>CARY, NC · 35.78°N</span>
        </div>
        <HeroTitle />
        <div className="hero__sub mono">
          <span className="hero__sub-bullet">●</span>
          <span>BUILDER · RESEARCHER · FOUNDER</span>
        </div>
      </div>
      <ScrollIndicator />
    </section>
  );
}
