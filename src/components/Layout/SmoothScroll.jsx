import useSmoothScroll from '../../hooks/useSmoothScroll.js';

export default function SmoothScroll({ children, reducedMotion = false }) {
  useSmoothScroll({ reducedMotion });
  return <>{children}</>;
}
