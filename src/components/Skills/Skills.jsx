import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SkillChip from './SkillChip.jsx';
import './skills.css';

const ROWS = [
  ['Python', 'PyTorch', 'Three.js', 'React', 'GSAP', 'Framer Motion', 'Vite', 'GLSL'],
  ['Angular', 'Scala', 'Supabase', 'Claude APIs', 'LLM Agents', 'AI Automation', 'Prompt Engineering'],
  ['Full Stack', 'Streamlit', 'Plaid', 'Clerk', 'Shader / WebGL', 'TensorBoard', 'Multi-agent Systems'],
];

export default function Skills() {
  const rootRef = useRef(null);
  const rowRefs = useRef([]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const ctx = gsap.context(() => {
      const tweens = rowRefs.current.map((row, i) => {
        if (!row) return null;
        const dir = i % 2 === 0 ? -1 : 1;
        return gsap.to(row, {
          xPercent: dir * 50,
          ease: 'none',
          duration: 40 + i * 8,
          repeat: -1,
        });
      });

      const trigger = ScrollTrigger.create({
        trigger: root,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const v = self.getVelocity();
          const boost = 1 + Math.min(Math.abs(v) / 800, 4);
          tweens.forEach((tw, i) => {
            if (!tw) return;
            const dir = i % 2 === 0 ? -1 : 1;
            tw.timeScale(boost * dir);
          });
        },
      });

      return () => {
        trigger.kill();
        tweens.forEach((t) => t?.kill());
      };
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="skills" id="skills" ref={rootRef}>
      <div className="skills__intro container">
        <div className="skills__meta mono">
          <span>03 — STACK</span>
          <span>—</span>
          <span>HOW</span>
        </div>
        <h2 className="skills__heading display">
          Tools <span className="lime">/ trade</span>.
        </h2>
      </div>

      <div className="skills__marquee">
        {ROWS.map((row, i) => (
          <div className="skills__row-mask" key={`row-${i}`}>
            <div
              className="skills__row"
              ref={(el) => (rowRefs.current[i] = el)}
            >
              {[...row, ...row, ...row].map((label, j) => (
                <SkillChip label={label} key={`${label}-${j}`} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
