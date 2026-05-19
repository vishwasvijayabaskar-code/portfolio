import { Link } from 'react-router-dom';
import { useCursorHandlers } from '../../context/CursorContext.jsx';
import Stamp from '../Layout/Stamp.jsx';

export default function ProjectPanel({ project, index }) {
  const cursor = useCursorHandlers('view', 'EXPLORE');

  return (
    <Link
      to={`/projects/${project.slug}`}
      className="project"
      style={{ '--project-accent': project.accent }}
      {...cursor}
    >
      <Stamp
        label={project.stamp}
        variant={project.stampVariant}
        rotate={-6 + index * 2}
        className="project__stamp"
      />

      <header className="project__header mono">
        <span className="project__num">{project.id}</span>
        <span className="project__year">{project.year}</span>
        <span className="project__role">{project.role}</span>
      </header>

      <div className="project__body">
        <h3 className="project__title display">{project.title}</h3>
        <p className="project__subtitle">{project.subtitle}</p>
        <p className="project__blurb">{project.blurb}</p>
      </div>

      <footer className="project__footer">
        <ul className="project__stack mono">
          {project.stack.map((s) => (
            <li key={s} className="project__chip">
              {s}
            </li>
          ))}
        </ul>
        <span className="project__index mono">
          {String(index + 1).padStart(2, '0')} / 05 ↗
        </span>
      </footer>
    </Link>
  );
}
