import { lazy, Suspense } from 'react';
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
import useMediaQuery from './hooks/useMediaQuery.js';
import useReducedMotion from './hooks/useReducedMotion.js';

const ProjectDetail = lazy(() => import('./pages/ProjectDetail.jsx'));
const Chess404 = lazy(() => import('./pages/Chess404.jsx'));

function RouteFallback() {
  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', fontFamily: 'JetBrains Mono, monospace', color: '#BFFF36', letterSpacing: '0.22em', fontSize: 11 }}>
      ▓ LOADING ▓
    </main>
  );
}

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
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<HomePage isDesktop={enable3D} />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
              <Route path="*" element={<Chess404 />} />
            </Routes>
          </Suspense>
        </SmoothScroll>
      </CursorProvider>
    </BrowserRouter>
  );
}
