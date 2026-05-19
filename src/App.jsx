import { useEffect } from 'react';
import { CursorProvider } from './context/CursorContext.jsx';
import SmoothScroll from './components/Layout/SmoothScroll.jsx';
import Cursor from './components/Layout/Cursor.jsx';
import GrainOverlay from './components/Layout/GrainOverlay.jsx';
import BackgroundCanvas from './components/Layout/BackgroundCanvas.jsx';
import Hero from './components/Hero/Hero.jsx';
import About from './components/About/About.jsx';
import Projects from './components/Projects/Projects.jsx';
import Skills from './components/Skills/Skills.jsx';
import Activities from './components/Activities/Activities.jsx';
import Contact from './components/Contact/Contact.jsx';
import useMediaQuery from './hooks/useMediaQuery.js';

export default function App() {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'auto';
  }, []);

  return (
    <CursorProvider>
      <SmoothScroll>
        <div className="nyan-bg" aria-hidden="true" />
        {isDesktop && <BackgroundCanvas />}
        <GrainOverlay />
        <Cursor />
        <main>
          <Hero />
          <About />
          <Projects isDesktop={isDesktop} />
          <Skills />
          <Activities />
          <Contact />
        </main>
      </SmoothScroll>
    </CursorProvider>
  );
}
