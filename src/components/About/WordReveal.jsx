import { motion } from 'framer-motion';

const lineV = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.04 },
  },
};

const wordV = {
  hidden: { y: '110%' },
  show: {
    y: '0%',
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function WordReveal({ text, className = '', as: Tag = 'span' }) {
  const words = text.split(' ');
  return (
    <Tag className={className}>
      <motion.span
        style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '0.25em' }}
        variants={lineV}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
      >
        {words.map((w, i) => (
          <span
            key={`${w}-${i}`}
            style={{ display: 'inline-block', overflow: 'hidden', paddingBottom: '0.12em' }}
          >
            <motion.span variants={wordV} style={{ display: 'inline-block' }}>
              {w}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
