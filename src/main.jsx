import { createRoot } from 'react-dom/client';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './styles/global.css';
import App from './App.jsx';

gsap.registerPlugin(ScrollTrigger);

// Google Analytics — only loads if VITE_GA_ID set in env
const gaId = import.meta.env.VITE_GA_ID;
if (gaId && typeof window !== 'undefined') {
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', gaId, { anonymize_ip: true });
}

createRoot(document.getElementById('root')).render(<App />);
