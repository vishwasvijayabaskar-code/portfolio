import { motion } from 'framer-motion';
import WordReveal from './WordReveal.jsx';
import './about.css';

const STATS = [
  { label: 'GPA', value: '4.45' },
  { label: 'CHESS OTB', value: '1300' },
  { label: 'CUBE PR', value: '57.32s' },
  { label: 'STARTUPS', value: '5+' },
];

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about__inner container">
        <div className="about__meta mono">
          <span>01 — ABOUT</span>
          <span>—</span>
          <span>WHO</span>
        </div>

        <WordReveal
          as="p"
          className="about__lead display"
          text="I'm a 16 year old builder, researcher, and founder based in Cary, NC."
        />

        <div className="about__body">
          <WordReveal
            as="p"
            className="about__body-text"
            text="ISEF researcher. Startup builder. Problem solver. Roadrunner. Risk taker."
          />
        </div>

        <motion.div
          className="about__stats"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
          }}
        >
          {STATS.map((s) => (
            <motion.div
              key={s.label}
              className="about__stat"
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
              }}
            >
              <span className="about__stat-value display">{s.value}</span>
              <span className="about__stat-label mono">{s.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
