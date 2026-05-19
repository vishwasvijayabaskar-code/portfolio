import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, ChromaticAberration, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import ParticleField from '../Hero/ParticleField.jsx';
import './background-canvas.css';

export default function BackgroundCanvas() {
  return (
    <div className="bg-canvas" aria-hidden="true">
      <Canvas
        dpr={[1, 1.75]}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 6], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <ParticleField count={12000} />
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
