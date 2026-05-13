import GridScan from "./GridScan.jsx";
import { mountReactIsland } from "./mount.jsx";

export function mountHeroGridScan() {
  const container = document.getElementById("heroReactBackground");
  const hero = document.querySelector(".landing-hero");

  if (!(container instanceof HTMLElement) || !(hero instanceof HTMLElement)) {
    return () => {};
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isCompactViewport = window.matchMedia("(max-width: 900px)").matches;

  return mountReactIsland(container, GridScan, {
    sensitivity: 0.55,
    lineThickness: 1.45,
    linesColor: "#4f4382",
    gridScale: 0.082,
    scanColor: "#FF9FFC",
    scanOpacity: prefersReducedMotion ? 0.36 : 0.72,
    enablePost: !prefersReducedMotion && !isCompactViewport,
    bloomIntensity: isCompactViewport ? 0.48 : 0.96,
    chromaticAberration: isCompactViewport ? 0.0012 : 0.002,
    noiseIntensity: prefersReducedMotion ? 0 : 0.01,
    scanGlow: isCompactViewport ? 0.68 : 0.98,
    scanSoftness: 2,
    scanDuration: isCompactViewport ? 2.3 : 1.9,
    scanDelay: isCompactViewport ? 2.0 : 1.6,
    interactionTarget: hero,
    className: "hero-gridscan-layer",
    style: { width: "100%", height: "100%" }
  });
}
