import useSmoothScroll from '../../hooks/useSmoothScroll.js';

export default function SmoothScroll({ children }) {
  useSmoothScroll();
  return <>{children}</>;
}
