import { motion } from 'framer-motion';

const rowV = {
  hidden: {
    clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)',
    opacity: 0,
  },
  show: {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    opacity: 1,
    transition: {
      clipPath: { duration: 1.1, ease: [0.87, 0, 0.13, 1] },
      opacity: { duration: 0.3, delay: 0.1 },
    },
  },
};

export default function ActivityRow({ index, title, detail, tag, years, micro }) {
  return (
    <motion.div
      className="activity"
      variants={rowV}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
    >
      <span className="activity__num mono">{String(index + 1).padStart(2, '0')}</span>
      <div className="activity__body">
        <h3 className="activity__title display">{title}</h3>
        {micro && <span className="activity__micro mono">// {micro}</span>}
      </div>
      <span className="activity__detail mono">{detail}</span>
      <span className="activity__years mono">[{years}]</span>
      <span className="activity__tag mono">{tag}</span>
    </motion.div>
  );
}
