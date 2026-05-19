import { useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uMouse;
  uniform float uPixelRatio;

  attribute float aScale;
  attribute float aRandom;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec3 pos = position;

    // gentle swirl
    float angle = uTime * 0.15 + aRandom * 6.2831;
    pos.x += sin(angle) * 0.18;
    pos.y += cos(angle * 1.3) * 0.18;
    pos.z += sin(angle * 0.7) * 0.18;

    // scroll-driven depth + tilt
    pos.z += uScroll * 5.5;
    pos.y -= uScroll * 1.2;
    pos.x += sin(uScroll * 3.14159 + aRandom * 6.2831) * uScroll * 0.6;

    // mouse repel field
    vec2 mouseWorld = uMouse * 3.5;
    vec2 d = pos.xy - mouseWorld;
    float dist = length(d);
    float repel = smoothstep(3.0, 0.0, dist);
    pos.xy += normalize(d + vec2(0.001)) * repel * 0.6;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = aScale * uPixelRatio * 14.0 * (1.0 / -mvPosition.z);

    // palette blend across scroll
    vec3 lime  = vec3(0.749, 1.000, 0.212);
    vec3 red   = vec3(0.941, 0.251, 0.000);
    vec3 pink  = vec3(1.000, 0.078, 0.576);
    vec3 cyan  = vec3(0.000, 0.898, 1.000);
    vec3 cream = vec3(1.000, 1.000, 0.878);

    float t = fract(uScroll * 1.6 + aRandom * 0.4);
    vec3 col;
    if (t < 0.25)      col = mix(lime, cream, t * 4.0);
    else if (t < 0.5)  col = mix(cream, pink, (t - 0.25) * 4.0);
    else if (t < 0.75) col = mix(pink, cyan, (t - 0.5) * 4.0);
    else               col = mix(cyan, red, (t - 0.75) * 4.0);

    vColor = col;
    vAlpha = smoothstep(9.0, 0.5, length(pos.xy)) * 0.9;
  }
`;

const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    float a = smoothstep(0.5, 0.0, d) * vAlpha;
    if (a < 0.001) discard;
    gl_FragColor = vec4(vColor, a);
  }
`;

function fibonacciSphere(samples, radius) {
  const points = new Float32Array(samples * 3);
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < samples; i += 1) {
    const y = 1 - (i / (samples - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;
    const radiusJitter = radius * (0.6 + Math.random() * 0.8);
    points[i * 3] = x * radiusJitter;
    points[i * 3 + 1] = y * radiusJitter;
    points[i * 3 + 2] = z * radiusJitter;
  }
  return points;
}

export default function ParticleField({ count = 12000 }) {
  const ref = useRef(null);
  const { size, viewport } = useThree();

  const { positions, scales, randoms } = useMemo(() => {
    const positionsArr = fibonacciSphere(count, 3.2);
    const scalesArr = new Float32Array(count);
    const randomsArr = new Float32Array(count);
    for (let i = 0; i < count; i += 1) {
      scalesArr[i] = 0.4 + Math.random() * 1.6;
      randomsArr[i] = Math.random();
    }
    return { positions: positionsArr, scales: scalesArr, randoms: randomsArr };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 1.75) },
    }),
    []
  );

  useFrame((state, delta) => {
    const mat = ref.current?.material;
    if (!mat) return;
    mat.uniforms.uTime.value += delta;
    const docEl = document.documentElement;
    const max = Math.max(1, docEl.scrollHeight - docEl.clientHeight);
    const progress = Math.min(1, Math.max(0, window.scrollY / max));
    mat.uniforms.uScroll.value += (progress - mat.uniforms.uScroll.value) * 0.08;
    mat.uniforms.uMouse.value.lerp(
      new THREE.Vector2(state.pointer.x, state.pointer.y),
      0.05
    );
  });

  // keep pixel ratio uniform synced with viewport
  useFrame(() => {
    const mat = ref.current?.material;
    if (!mat) return;
    mat.uniforms.uPixelRatio.value = Math.min(viewport.dpr || 1, 1.75);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
        />
        <bufferAttribute
          attach="attributes-aScale"
          args={[scales, 1]}
          count={scales.length}
        />
        <bufferAttribute
          attach="attributes-aRandom"
          args={[randoms, 1]}
          count={randoms.length}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
