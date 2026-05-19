import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CursorProvider } from './context/CursorContext.jsx';
import SmoothScroll from './components/Layout/SmoothScroll.jsx';
import Cursor from './components/Layout/Cursor.jsx';
import GrainOverlay from './components/Layout/GrainOverlay.jsx';
import ScanlineOverlay from './components/Layout/ScanlineOverlay.jsx';
import BackgroundCanvas from './components/Layout/BackgroundCanvas.jsx';
import StatusWidget from './components/Layout/StatusWidget.jsx';
import KonamiEgg from './components/Layout/KonamiEgg.jsx';
import HomePage from './pages/HomePage.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import Chess404 from './pages/Chess404.jsx';
import useMediaQuery from './hooks/useMediaQuery.js';
import useReducedMotion from './hooks/useReducedMotion.js';

export default function App() {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const reducedMotion = useReducedMotion();
  const enable3D = isDesktop && !reducedMotion;

  return (
    <BrowserRouter>
      <CursorProvider>
        <SmoothScroll reducedMotion={reducedMotion}>
          <div className="nyan-bg" aria-hidden="true" />
          {enable3D && <BackgroundCanvas />}
          <ScanlineOverlay />
          <GrainOverlay />
          <Cursor />
          <StatusWidget />
          <KonamiEgg />
          <Routes>
            <Route path="/" element={<HomePage isDesktop={enable3D} />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="*" element={<Chess404 />} />
          </Routes>
        </SmoothScroll>
      </CursorProvider>
    </BrowserRouter>
  );
}
