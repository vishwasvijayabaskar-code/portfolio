import Hero from '../components/Hero/Hero.jsx';
import About from '../components/About/About.jsx';
import Projects from '../components/Projects/Projects.jsx';
import Skills from '../components/Skills/Skills.jsx';
import Activities from '../components/Activities/Activities.jsx';
import Contact from '../components/Contact/Contact.jsx';
import AsciiDivider from '../components/Layout/AsciiDivider.jsx';

export default function HomePage({ isDesktop }) {
  return (
    <main>
      <Hero />
      <AsciiDivider id="01" label="ABOUT" right="WHO" />
      <About />
      <AsciiDivider id="02" label="PROJECTS" right="WHAT" />
      <Projects isDesktop={isDesktop} />
      <AsciiDivider id="03" label="STACK" right="HOW" />
      <Skills />
      <AsciiDivider id="04" label="ELSEWHERE" right="WHEN NOT BUILDING" />
      <Activities />
      <AsciiDivider id="05" label="CONTACT" right="NEXT" />
      <Contact />
    </main>
  );
}
