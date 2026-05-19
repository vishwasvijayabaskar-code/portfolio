import { motion } from 'framer-motion';
import WordReveal from './WordReveal.jsx';
import MarginNote from '../Layout/MarginNote.jsx';
import './about.css';

const STATS = [
  { label: 'GPA', value: '4.45' },
  { label: 'BSA RANK', value: 'LIFE' },
  { label: 'LOC SHIPPED', value: '300k+' },
  { label: 'STARTUPS', value: '2+' },
];

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about__inner container">
        <MarginNote side="right" rotate={-6} top="18%">
          almost eagle &mdash; one merit badge out
        </MarginNote>
        <MarginNote side="left" rotate={3} top="60%">
          v slept 4 hrs writing this
        </MarginNote>
        <WordReveal
          as="p"
          className="about__lead display"
          text="Most days I'm training neural networks to read RNA. Other days Gooning at Home."
        />

        <div className="about__body">
          <WordReveal
            as="p"
            className="about__body-text"
            text="16. Cary, NC. Science research. Creating startups in flight. Sleeping when forced."
          />
        </div>

        <motion.div
          className="about__stats-row mono"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.5 }}
        >
          {STATS.map((s, i) => (
            <span key={s.label} className="about__stat-inline">
              <span className="about__stat-inline-val">{s.value}</span>
              <span className="about__stat-inline-label">{s.label}</span>
              {i < STATS.length - 1 && (
                <span className="about__stat-inline-sep">·</span>
              )}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
