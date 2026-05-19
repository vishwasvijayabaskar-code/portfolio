import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import projects from './projectsData.js';
import ProjectPanel from './ProjectPanel.jsx';
import MarginNote from '../Layout/MarginNote.jsx';
import './projects.css';

export default function Projects({ isDesktop = true }) {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (!isDesktop) return undefined;
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return undefined;

    const ctx = gsap.context(() => {
      const getDistance = () => track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: wrap,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(
              projects.length - 1,
              Math.round(self.progress * (projects.length - 1))
            );
            setActiveIdx(idx);
          },
        },
      });

      ScrollTrigger.refresh();
      return () => tween.kill();
    }, wrapRef);

    return () => ctx.revert();
  }, [isDesktop]);

  return (
    <section className="projects" id="projects">
      <div className="projects__intro container">
        <MarginNote side="right" rotate={-5} top="40%">
          click any panel &mdash; rabbit hole
        </MarginNote>
        <h2 className="projects__heading display">
          Things <span className="lime">/ built</span>.
        </h2>
        <p className="projects__lede mono">
          {isDesktop ? 'SCROLL HORIZONTALLY → · CLICK TO OPEN' : 'TAP TO OPEN ↓'}
        </p>
      </div>

      <div className="projects__pin" ref={wrapRef}>
        {isDesktop && (
          <div className="projects__progress mono" aria-hidden="true">
            {projects.map((p, i) => (
              <span
                key={p.id}
                className={`projects__progress-dot ${i === activeIdx ? 'is-active' : ''}`}
              >
                {p.id}
              </span>
            ))}
            <span className="projects__progress-current">
              [{projects[activeIdx]?.title}]
            </span>
          </div>
        )}
        <div className={`projects__track ${isDesktop ? 'is-horizontal' : 'is-vertical'}`} ref={trackRef}>
          {projects.map((p, i) => (
            <ProjectPanel project={p} index={i} key={p.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
