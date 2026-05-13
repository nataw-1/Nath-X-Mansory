import { BloomEffect, ChromaticAberrationEffect, EffectComposer, EffectPass, RenderPass } from "postprocessing";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import "./GridScan.css";

const vert = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const frag = `
precision highp float;

uniform vec3 iResolution;
uniform float iTime;
uniform vec2 uSkew;
uniform float uTilt;
uniform float uYaw;
uniform float uLineThickness;
uniform vec3 uLinesColor;
uniform vec3 uScanColor;
uniform float uGridScale;
uniform float uScanOpacity;
uniform float uNoise;
uniform float uScanGlow;
uniform float uScanSoftness;
uniform float uScanDuration;
uniform float uScanDelay;

varying vec2 vUv;

mat2 rot(float a) {
  float c = cos(a);
  float s = sin(a);
  return mat2(c, -s, s, c);
}

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 345.45));
  p += dot(p, p + 34.345);
  return fract(p.x * p.y);
}

float gridLine(vec2 uv, float thickness) {
  vec2 gv = abs(fract(uv - 0.5) - 0.5) / fwidth(uv);
  float line = min(gv.x, gv.y);
  return 1.0 - smoothstep(0.0, max(0.35, thickness), line);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y;
  uv *= rot(uTilt);

  vec3 ray = normalize(vec3(uv + uSkew * 0.38, 1.5));
  ray.xz *= rot(uYaw);

  float depth = 1.18 / max(0.16, ray.z + 0.82);
  vec2 gridUv = ray.xy * depth / max(0.0001, uGridScale);
  gridUv += vec2(iTime * 0.06, -iTime * 0.18);

  float primary = gridLine(gridUv, uLineThickness * 1.55);
  float secondary = gridLine(gridUv * vec2(1.0, 0.55) + vec2(0.0, 0.4), uLineThickness * 0.9) * 0.62;
  float grid = max(primary, secondary);

  float cycle = max(0.2, uScanDuration + uScanDelay);
  float phase = mod(iTime, cycle) / cycle;
  float travel = mix(-2.4, 2.4, phase);
  float softness = max(0.5, uScanSoftness);
  float band = exp(-pow((gridUv.y - travel) / (0.16 * softness), 2.0));
  float aura = exp(-pow((gridUv.y - travel) / (0.42 * softness), 2.0));

  float vignette = smoothstep(1.65, 0.04, length(uv * vec2(0.82, 1.18)));
  float pulse = 0.62 + 0.38 * sin(iTime * 0.85 + gridUv.x * 0.08);
  float edgeGlow = smoothstep(1.24, 0.22, length(uv * vec2(0.78, 1.06)));

  vec3 base = mix(
    vec3(0.95, 0.97, 1.0),
    vec3(0.80, 0.86, 0.97),
    clamp(length(uv * vec2(0.88, 1.05)), 0.0, 1.0)
  );
  base += vec3(0.03, 0.05, 0.09) * edgeGlow * 0.22;
  base += vec3(0.10, 0.12, 0.16) * exp(-pow(length(uv - vec2(0.0, 0.06)) / 0.72, 2.0)) * 0.1;

  vec3 color = base;
  color += uLinesColor * grid * 0.34;
  color += uScanColor * band * uScanOpacity * (0.54 + grid * 0.6) * pulse;
  color += uScanColor * aura * uScanGlow * 0.24;

  float noise = (hash21(gl_FragCoord.xy + iTime * 120.0) - 0.5) * uNoise;
  color += noise;
  color *= vignette;

  gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`;

export default function GridScan({
  sensitivity = 0.55,
  lineThickness = 1,
  linesColor = "#392e4e",
  gridScale = 0.1,
  scanColor = "#ff9ffc",
  scanOpacity = 0.4,
  enablePost = true,
  bloomIntensity = 0.6,
  bloomThreshold = 0,
  bloomSmoothing = 0,
  chromaticAberration = 0.002,
  noiseIntensity = 0.01,
  scanGlow = 0.5,
  scanSoftness = 2,
  scanDuration = 2.0,
  scanDelay = 2.0,
  interactionTarget = null,
  className,
  style
}) {
  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const pointerTarget = useRef(new THREE.Vector2(0, 0));
  const pointerCurrent = useRef(new THREE.Vector2(0, 0));
  const pointerVelocity = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const container = containerRef.current;
    if (!(container instanceof HTMLElement)) {
      return undefined;
    }

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      return undefined;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.autoClear = false;
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const uniforms = {
      iResolution: { value: new THREE.Vector3(container.clientWidth, container.clientHeight, renderer.getPixelRatio()) },
      iTime: { value: 0 },
      uSkew: { value: new THREE.Vector2(0, 0) },
      uTilt: { value: 0 },
      uYaw: { value: 0 },
      uLineThickness: { value: lineThickness },
      uLinesColor: { value: toLinearColor(linesColor) },
      uScanColor: { value: toLinearColor(scanColor) },
      uGridScale: { value: gridScale },
      uScanOpacity: { value: scanOpacity },
      uNoise: { value: noiseIntensity },
      uScanGlow: { value: scanGlow },
      uScanSoftness: { value: scanSoftness },
      uScanDuration: { value: scanDuration },
      uScanDelay: { value: scanDelay }
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: vert,
      fragmentShader: frag,
      transparent: true,
      depthWrite: false,
      depthTest: false
    });

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(quad);

    let composer = null;
    let bloom = null;
    let chroma = null;

    if (enablePost) {
      composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));

      bloom = new BloomEffect({
        intensity: 1,
        luminanceThreshold: bloomThreshold,
        luminanceSmoothing: bloomSmoothing
      });
      bloom.blendMode.opacity.value = Math.max(0, bloomIntensity);

      chroma = new ChromaticAberrationEffect({
        offset: new THREE.Vector2(chromaticAberration, chromaticAberration),
        radialModulation: true,
        modulationOffset: 0
      });

      const effectPass = new EffectPass(camera, bloom, chroma);
      effectPass.renderToScreen = true;
      composer.addPass(effectPass);
    }

    const smoothTime = THREE.MathUtils.lerp(0.42, 0.12, THREE.MathUtils.clamp(sensitivity, 0, 1));
    const pointerSurface = interactionTarget instanceof HTMLElement ? interactionTarget : container;

    const onMove = (event) => {
      const rect = pointerSurface.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      pointerTarget.current.set(x, y);
    };

    const onLeave = () => {
      pointerTarget.current.set(0, 0);
    };

    pointerSurface.addEventListener("mousemove", onMove);
    pointerSurface.addEventListener("mouseleave", onLeave);

    const onResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      uniforms.iResolution.value.set(width, height, renderer.getPixelRatio());
      if (composer) {
        composer.setSize(width, height);
      }
    };

    window.addEventListener("resize", onResize);

    let last = performance.now();
    const tick = () => {
      const now = performance.now();
      const dt = Math.max(0, Math.min(0.1, (now - last) / 1000));
      last = now;

      if (document.hidden || container.clientWidth === 0 || container.clientHeight === 0) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      pointerCurrent.current.copy(
        smoothDampVec2(pointerCurrent.current, pointerTarget.current, pointerVelocity.current, smoothTime, dt)
      );

      const energy = pointerCurrent.current.length();
      uniforms.uSkew.value.set(pointerCurrent.current.x * 0.18, pointerCurrent.current.y * -0.18);
      uniforms.uTilt.value = pointerCurrent.current.y * -0.08;
      uniforms.uYaw.value = pointerCurrent.current.x * 0.12;
      uniforms.iTime.value = now / 1000 + energy * 0.1;

      renderer.clear(true, true, true);
      if (composer) {
        composer.render(dt);
      } else {
        renderer.render(scene, camera);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener("resize", onResize);
      pointerSurface.removeEventListener("mousemove", onMove);
      pointerSurface.removeEventListener("mouseleave", onLeave);
      material.dispose();
      quad.geometry.dispose();
      if (composer) {
        composer.dispose();
      }
      renderer.dispose();
      renderer.forceContextLoss();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [
    bloomIntensity,
    bloomSmoothing,
    bloomThreshold,
    chromaticAberration,
    enablePost,
    gridScale,
    interactionTarget,
    lineThickness,
    linesColor,
    noiseIntensity,
    scanColor,
    scanDelay,
    scanDuration,
    scanGlow,
    scanOpacity,
    scanSoftness,
    sensitivity
  ]);

  return <div ref={containerRef} className={`gridscan${className ? ` ${className}` : ""}`} style={style} />;
}

function toLinearColor(value) {
  const color = new THREE.Color(value);
  return color.convertSRGBToLinear();
}

function smoothDampVec2(current, target, velocity, smoothTime, deltaTime) {
  const dampTime = Math.max(0.0001, smoothTime);
  const omega = 2 / dampTime;
  const x = omega * deltaTime;
  const exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
  const change = current.clone().sub(target);
  const temp = velocity.clone().addScaledVector(change, omega).multiplyScalar(deltaTime);
  velocity.sub(temp.clone().multiplyScalar(omega));
  velocity.multiplyScalar(exp);
  return target.clone().add(change.add(temp).multiplyScalar(exp));
}
