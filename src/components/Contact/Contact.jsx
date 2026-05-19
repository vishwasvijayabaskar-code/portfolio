import { useCallback, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ContactLink from './ContactLink.jsx';
import './contact.css';

const EMAIL = 'vishwasvijayabaskar@gmail.com';

export default function Contact() {
  const ref = useRef(null);
  const headlineRef = useRef(null);
  const [toast, setToast] = useState('');

  useEffect(() => {
    const el = headlineRef.current;
    if (!el) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scale: 0.6, opacity: 0, y: 80 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 1,
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setToast('COPIED');
      setTimeout(() => setToast(''), 1600);
    } catch {
      setToast('COPY FAILED');
      setTimeout(() => setToast(''), 1600);
    }
  }, []);

  return (
    <section className="contact" id="contact" ref={ref}>
      <div className="contact__inner container">
        <p className="contact__pretitle mono">
          ▓ OPEN INBOX · OPEN TO RESEARCH, BUILDS, WEIRD IDEAS
        </p>
        <h2 className="contact__email-headline display" ref={headlineRef}>
          <span className="contact__email-link" onClick={copyEmail}>
            vishwasvijayabaskar
            <span className="contact__at">@</span>
            gmail.com
          </span>
        </h2>
        <p className="contact__sublede mono">
          ↑ CLICK TO COPY · OR REACH ME ↓
        </p>

        <div className="contact__links">
          <ContactLink
            label="GITHUB"
            value="github.com/vvijayabaskar"
            href="https://github.com/vvijayabaskar"
            variant="view"
          />
          <ContactLink
            label="LINKEDIN"
            value="Vishwas Vijayabaskar"
            href="https://www.linkedin.com/in/vishwas-vijayabaskar"
            variant="view"
          />
        </div>

        <footer className="contact__footer mono">
          <span>© 2026 · Cary, NC</span>
          <span>Built with React · Three.js · GSAP · Framer Motion</span>
        </footer>

        {toast && <div className="contact__toast mono">{toast} → {EMAIL}</div>}
      </div>
    </section>
  );
}
