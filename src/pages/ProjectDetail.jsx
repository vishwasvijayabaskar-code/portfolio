import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import projects from '../components/Projects/projectsData.js';
import Stamp from '../components/Layout/Stamp.jsx';
import { useCursorHandlers } from '../context/CursorContext.jsx';
import './project-detail.css';

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const backCursor = useCursorHandlers('write', 'BACK');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <main className="project-detail">
        <div className="project-detail__inner container">
          <h1 className="project-detail__title display">404 / PROJECT NOT FOUND</h1>
          <Link to="/" className="project-detail__back mono" {...backCursor}>
            ← BACK TO INDEX
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main
      className="project-detail"
      style={{ '--project-accent': project.accent }}
    >
      <div className="project-detail__inner container">
        <Link to="/" className="project-detail__back mono" {...backCursor}>
          ← BACK TO INDEX
        </Link>

        <Stamp
          label="UNDER CONSTRUCTION"
          variant="red"
          rotate={-6}
          className="project-detail__construction-stamp"
        />

        <header className="project-detail__head">
          <div className="project-detail__meta mono">
            <span className="project-detail__num">{project.id}</span>
            <span>{project.year}</span>
            <span>{project.role}</span>
          </div>
          <h1 className="project-detail__title display">{project.title}</h1>
          <p className="project-detail__subtitle display">{project.subtitle}</p>
        </header>

        <section className="project-detail__hero">
          <pre className="project-detail__ascii mono" aria-hidden="true">
{`╔══════════════════════════════════════════════════════╗
║  STATUS · WIP / PAGE_UNDER_CONSTRUCTION_v0.1.0       ║
║  BUILD_ID · ${project.id}-${project.slug.toUpperCase().padEnd(28, ' ')}║
║  LAST_TOUCHED · ${new Date().toISOString().slice(0, 10).padEnd(38, ' ')}║
╚══════════════════════════════════════════════════════╝`}
          </pre>
          <p className="project-detail__blurb">{project.blurb}</p>
        </section>

        <section className="project-detail__sections">
          <div className="project-detail__section">
            <h2 className="project-detail__sec-title mono">▓ THE PROBLEM</h2>
            <p className="project-detail__placeholder">[ pending — Vishwas to write ]</p>
          </div>
          <div className="project-detail__section">
            <h2 className="project-detail__sec-title mono">▓ APPROACH</h2>
            <p className="project-detail__placeholder">[ pending — architecture diagrams + decisions ]</p>
          </div>
          <div className="project-detail__section">
            <h2 className="project-detail__sec-title mono">▓ WHAT I LEARNED</h2>
            <p className="project-detail__placeholder">[ pending — retrospective ]</p>
          </div>
          <div className="project-detail__section">
            <h2 className="project-detail__sec-title mono">▓ NEXT</h2>
            <p className="project-detail__placeholder">[ pending — roadmap / follow-ups ]</p>
          </div>
        </section>

        <section className="project-detail__stack-block">
          <h2 className="project-detail__sec-title mono">▓ STACK</h2>
          <ul className="project-detail__stack">
            {project.stack.map((s) => (
              <li key={s} className="project-detail__chip mono">
                {s}
              </li>
            ))}
          </ul>
        </section>

        <footer className="project-detail__footer mono">
          <span>VV / {project.id} / {project.slug}</span>
          <Link to="/" className="project-detail__footer-link" {...backCursor}>
            ← RETURN TO MAIN INDEX
          </Link>
        </footer>
      </div>
    </main>
  );
}
