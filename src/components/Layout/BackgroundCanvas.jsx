import { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, ChromaticAberration, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import ParticleField from '../Hero/ParticleField.jsx';
import './background-canvas.css';

function detectGpuTier() {
  if (typeof window === 'undefined') return { count: 12000, dpr: 1.75 };
  const cores = navigator.hardwareConcurrency || 4;
  const w = window.innerWidth;
  const h = window.innerHeight;
  const px = w * h;
  if (cores <= 4 || px < 900_000) return { count: 5000, dpr: 1.25 };
  if (cores <= 8 || px < 1_500_000) return { count: 8500, dpr: 1.5 };
  return { count: 12000, dpr: 1.75 };
}

export default function BackgroundCanvas() {
  const tier = useMemo(detectGpuTier, []);

  return (
    <div className="bg-canvas" aria-hidden="true">
      <Canvas
        dpr={[1, tier.dpr]}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 6], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <ParticleField count={tier.count} />
        <EffectComposer multisampling={0} disableNormalPass>
          <Bloom intensity={0.85} luminanceThreshold={0.15} luminanceSmoothing={0.9} mipmapBlur />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={[0.0018, 0.0018]}
          />
          <Noise opacity={0.04} premultiply blendFunction={BlendFunction.ADD} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
