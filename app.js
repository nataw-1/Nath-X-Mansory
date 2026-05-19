import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import modelRollsRoyceCullinan from "./assets/models/rolls_royce_cullinan.glb";
import modelKoenigseggOnePro from "./assets/models/koenigsegg_one_pro.glb";
import modelPorsche911TurboS from "./assets/models/porsche_911_turbo_s.glb";
import modelLamborghiniRevuelto from "./assets/models/free_lamborghini_revuelto.glb";
import modelLamborghiniUrus from "./assets/models/modified_lamborghini_urus.glb";
import modelBugattiBolide from "./assets/models/bugatti_bolide_2024.glb";
import modelFerrari812Gts from "./assets/models/2020_ferrari_812_gts.glb";

const cars = [
  {
    id: "phantom",
    name: "Mansory Rolls-Royce Phantom",
    vehicleClass: "Ultra Luxury Grand Tourer",
    enhancementLevel: "Bespoke Edition",
    performanceDescriptor:
      "Elevated V12 touring with executive-grade dynamic composure.",
    description:
      "A flagship commission blending stately presence with precision-tuned power delivery.",
    modelUrl: modelRollsRoyceCullinan,
    modelScale: 1.35,
    engineAudioUrl: "assets/audio/phantom-engine.mp3",
    fallbackBodyColor: "#8f8f8f",
    specs: {
      powerOutput: "610 hp",
      torque: "950 Nm",
      zeroToHundred: "4.9 sec",
      topSpeed: "155 mph",
      drivetrain: "Rear-Wheel Drive",
    },
    exteriorEnhancement:
      "Forged-carbon fascia package, extended lower lines, and refined executive aero detailing.",
    interiorCraftsmanship:
      "Hand-finished leather architecture with bespoke quilting, metallic inlays, and tailored illumination.",
    aerodynamicOptimization:
      "Front pressure balancing and rear flow conditioning deliver stable high-speed road manners.",
    limitedProductionNotice:
      "Commissioned in strictly limited allocations with client-specific finish and trim curation.",
    dashboardIntelligence: "Dashboard Intelligence: Executive Dynamic Suite",
    activeMonitoring:
      "Active Performance Monitoring: V12 thermal and torque channels synchronized.",
    driveModes: {
      sport:
        "Progressive throttle map with firmer dynamic posture for spirited luxury driving.",
      track:
        "Maximum response profile with sharp shift strategy and sustained power output.",
      comfort:
        "Silken touring mode tuned for acoustic calm and long-range composure.",
    },
  },
  {
    id: "onepro",
    name: "Koenigsegg One:1 Pro",
    vehicleClass: "Hypercar",
    enhancementLevel: "Track-Focused Series",
    performanceDescriptor:
      "1600 hp twin-turbo V8 thrust with extreme aero-loaded high-speed stability.",
    description:
      "A bespoke hypercar program centered on extreme power density, low mass, and race-derived control systems.",
    modelUrl: modelKoenigseggOnePro,
    modelScale: 1.12,
    modelTargetSize: 4.9,
    modelYOffset: 0.02,
    engineAudioUrl: "assets/audio/koenigsegg-one-pro-engine.mp3",
    fallbackBodyColor: "#d7dadf",
    specs: {
      powerOutput: "1600 hp (E85)",
      torque: "1500 Nm",
      zeroToHundred: "2.79 sec",
      topSpeed: "500 km/h (311 mph) predicted",
      drivetrain: "Rear-Wheel Drive, 9-speed Light Speed Transmission",
    },
    exteriorEnhancement:
      "Active aero architecture, high-downforce channels, and low-drag surfacing optimized for ultra-high-speed operation.",
    interiorCraftsmanship:
      "Focused lightweight cockpit with premium motorsport trim, precision stitching, and driver-centric control layout.",
    aerodynamicOptimization:
      "Front canard balancing, roofline flow control, and rear aero management calibrated for stability near top-speed range.",
    limitedProductionNotice:
      "Specialized low-volume build developed for collectors seeking extreme track and road capability.",
    dashboardIntelligence: "Dashboard Intelligence: Hypercar Telemetry Matrix",
    activeMonitoring:
      "Active Performance Monitoring: Boost, clutch-state, thermal load, and aero channels live.",
    driveModes: {
      sport:
        "Road attack calibration with rapid throttle response and sharper chassis weighting.",
      track:
        "Maximum-performance strategy with aggressive shift logic and downforce-priority balance.",
      comfort:
        "Controlled touring tune preserving response while smoothing low-speed drivability.",
    },
  },
  {
    id: "p9lm900",
    name: "MANSORY P9LM EVO 900",
    vehicleClass: "Ultra-Exclusive Performance Coupe",
    enhancementLevel: "Limited Complete Conversion",
    performanceDescriptor:
      "900 hp flat-six powertrain with race-grade response and street-legal hypercar pace.",
    description:
      "A complete vehicle conversion of the Porsche 911 Turbo S (992), engineered for extreme output and limited-series exclusivity.",
    modelUrl: modelPorsche911TurboS,
    modelScale: 1.1,
    modelTargetSize: 4.75,
    modelYOffset: 0.03,
    engineAudioUrl: "assets/audio/p9lm-evo-900-engine.mp3",
    fallbackBodyColor: "#d6d7da",
    specs: {
      powerOutput: "900 hp",
      torque: "1050 Nm",
      zeroToHundred: "2.5 sec",
      topSpeed: "340 km/h (211 mph)",
      drivetrain: "All-Wheel Drive (911 Turbo S platform)",
    },
    exteriorEnhancement:
      "Comprehensive forged-carbon widebody conversion with aero-optimized front, side, and rear architecture.",
    interiorCraftsmanship:
      "Bespoke cockpit finishing with premium leather, contrast stitching, and performance-focused material detailing.",
    aerodynamicOptimization:
      "High-speed stability package tuned around reduced lift, aggressive airflow channeling, and rear aero balance.",
    limitedProductionNotice:
      "Strictly limited production: 10 Coupes and 7 Cabriolets worldwide.",
    dashboardIntelligence: "Dashboard Intelligence: P9LM Dynamic Control Suite",
    activeMonitoring:
      "Active Performance Monitoring: Boost pressure, thermal load, and traction behavior live.",
    driveModes: {
      sport:
        "Sharper throttle and torque delivery with tighter chassis response for aggressive road use.",
      track:
        "Maximum performance mapping for sustained high-load operation and rapid shift behavior.",
      comfort:
        "Refined touring calibration preserving power reserve while smoothing daily drivability.",
    },
  },
  {
    id: "carbonadox",
    name: "MANSORY Carbonado X",
    vehicleClass: "One-Off Hybrid Hypercar",
    enhancementLevel: "Atelier Dubai Showcase",
    performanceDescriptor:
      "1120 hp hybrid system output with carbon-focused aero and extreme launch performance.",
    description:
      "A one-of-one conversion that evolves the Carbonado lineage onto the Lamborghini Revuelto platform as an exclusive 2026 atelier statement.",
    modelUrl: modelLamborghiniRevuelto,
    modelScale: 1.12,
    modelTargetSize: 4.9,
    modelYOffset: 0.02,
    engineAudioUrl: "assets/audio/carbonado-x-engine.mp3",
    fallbackBodyColor: "#d9b35f",
    specs: {
      powerOutput: "1120 hp (824 kW)",
      torque: "1050 Nm",
      zeroToHundred: "2.3 sec",
      topSpeed: "355 km/h (221 mph)",
      drivetrain: "AWD Hybrid V12",
    },
    exteriorEnhancement:
      "Forged-carbon conversion surfaces, dramatic aerodynamic profiling, and signature Carbonado visual architecture.",
    interiorCraftsmanship:
      "Bespoke supercar cockpit with contrast leather, carbon detailing, and atelier-grade finishing execution.",
    aerodynamicOptimization:
      "Airflow-managed front and rear channels tuned for high-speed stability and aggressive cornering balance.",
    limitedProductionNotice:
      "One-of-one atelier commission unveiled for Mansory Dubai in February 2026.",
    dashboardIntelligence: "Dashboard Intelligence: Carbonado Hybrid Command",
    activeMonitoring:
      "Active Performance Monitoring: V12 load, hybrid assist, and traction channels tracked live.",
    driveModes: {
      sport:
        "Immediate hybrid torque delivery with sharpened steering and throttle calibration.",
      track:
        "Maximum performance profile for sustained high-load laps and rapid transient response.",
      comfort:
        "Balanced hyper-GT mode with smoother low-speed response and refined cruising behavior.",
    },
  },
  {
    id: "venatuss900",
    name: "MANSORY Venatus S (P900)",
    vehicleClass: "Ultra-Performance Luxury SUV",
    enhancementLevel: "P900 Conversion",
    performanceDescriptor:
      "900 hp twin-turbo V8 output with aggressive launch and high-speed stability.",
    description:
      "A full conversion based on the Urus S/Performante platform, tuned for extreme road presence and track-level acceleration.",
    modelUrl: modelLamborghiniUrus,
    modelScale: 1.08,
    modelTargetSize: 4.4,
    modelYOffset: 0.02,
    engineAudioUrl: "assets/audio/venatus-s-p900-engine.mp3",
    fallbackBodyColor: "#d39a2c",
    specs: {
      powerOutput: "900 hp",
      torque: "1100 Nm",
      zeroToHundred: "2.9 sec",
      topSpeed: "325 km/h",
      drivetrain: "All-Wheel Drive",
    },
    exteriorEnhancement:
      "Forged-carbon aero conversion with widened stance, performance cooling channels, and signature Venatus surface language.",
    interiorCraftsmanship:
      "Bespoke performance-luxury cabin with contrast leather architecture, carbon trim, and precision stitch detailing.",
    aerodynamicOptimization:
      "Front and rear airflow channeling tuned for high-speed composure and reduced lift under full acceleration.",
    limitedProductionNotice:
      "Produced in strictly limited bespoke allocations with client-driven finish programs.",
    dashboardIntelligence: "Dashboard Intelligence: Venatus Dynamic Command",
    activeMonitoring:
      "Active Performance Monitoring: Boost pressure, drivetrain load, and traction vector data live.",
    driveModes: {
      sport:
        "Aggressive throttle and shift mapping for rapid road attack response.",
      track:
        "Peak-output calibration for repeated high-load acceleration and corner-exit stability.",
      comfort:
        "Refined torque delivery profile balancing luxury ride quality with reserve performance.",
    },
  },
  {
    id: "bolide2024",
    name: "Bugatti Bolide (2024)",
    vehicleClass: "Track-Only Hypercar",
    enhancementLevel: "Production Series",
    performanceDescriptor:
      "W16 quad-turbo power with lightweight, race-first engineering and extreme aero focus.",
    description:
      "A pure track machine engineered without road-legal constraints, built for maximum downforce, minimum mass, and elite lap-time performance.",
    modelUrl: modelBugattiBolide,
    modelScale: 1.08,
    modelTargetSize: 4.95,
    modelYOffset: 0.03,
    engineAudioUrl: "assets/audio/bugatti-bolide-engine.mp3",
    fallbackBodyColor: "#2f68a5",
    specs: {
      powerOutput: "1,600 PS (1,578 hp) production / up to 1,850 PS concept",
      torque: "1,600 Nm",
      zeroToHundred: "2.2 sec",
      topSpeed: "501 km/h (311 mph) limited",
      drivetrain: "AWD, 8.0L quad-turbo W16, 7-speed dual-clutch",
    },
    exteriorEnhancement:
      "Track-focused body geometry with extreme downforce channels, exposed technical surfacing, and race-grade airflow management.",
    interiorCraftsmanship:
      "Purpose-built motorsport cockpit architecture with lightweight materials and functional performance ergonomics.",
    aerodynamicOptimization:
      "High-energy front/rear aero package balances stability and cooling under sustained high-speed track operation.",
    limitedProductionNotice:
      "Delivered as a limited-production track-only program for highly specialized performance clients.",
    dashboardIntelligence:
      "Dashboard Intelligence: W16 Circuit Performance Console",
    activeMonitoring:
      "Active Performance Monitoring: Boost, thermal load, aero pressure, and drivetrain telemetry live.",
    driveModes: {
      sport:
        "Aggressive throttle calibration for rapid corner-exit acceleration and road-course response.",
      track:
        "Maximum performance profile tuned for sustained lap intensity, grip control, and high-speed stability.",
      comfort:
        "Stability-priority setup for controlled warm-up laps and measured power delivery.",
    },
  },

  {
    id: "stallone812",
    name: 'Mansory Ferrari 812 "Stallone"',
    vehicleClass: "Ultra Luxury Coupe",
    enhancementLevel: "Bespoke Edition",
    performanceDescriptor:
      "Naturally aspirated V12 ferocity with radical forged-carbon identity.",
    description:
      "The Stallone is a radical super-GT defined by dramatic carbon architecture and elite craftsmanship.",
    modelUrl: modelFerrari812Gts,
    modelScale: 1.16,
    engineAudioUrl: "assets/audio/ferrari-812-stallone-engine.mp3",
    fallbackBodyColor: "#b80f14",
    specs: {
      powerOutput: "830 hp",
      torque: "740 Nm",
      zeroToHundred: "2.8 sec",
      topSpeed: "~345 km/h (214-216 mph)",
      drivetrain: "Rear-Wheel Drive",
    },
    exteriorEnhancement:
      "Full forged-carbon aero conversion featuring sculpted bumpers, side architecture, and a commanding rear wing.",
    interiorCraftsmanship:
      "High-contrast, hand-stitched interior overhaul with bespoke trim pairings and motorsport-luxury detailing.",
    aerodynamicOptimization:
      "Downforce-centric front and rear balancing developed for high-speed confidence and precision turn-in.",
    limitedProductionNotice:
      "Ultra-limited atelier build reserved for collectors seeking maximum visual and performance impact.",
    dashboardIntelligence: "Dashboard Intelligence: V12 Command Interface",
    activeMonitoring:
      "Active Performance Monitoring: Real-time rev, traction, and thermal behavior analysis.",
    driveModes: {
      sport:
        "Immediate throttle articulation with assertive chassis communication for road attack driving.",
      track:
        "Hard-edge calibration for peak lap-oriented response and sustained aerodynamic stability.",
      comfort:
        "Grand touring profile retaining V12 character while smoothing urban and highway refinement.",
    },
  },
];

const state = {
  activePage: "landing",
  selectedCar: cars[0],
  audioEnabled: false,
  audio: null,
  currentAngle: "",
  showcaseRAF: null,
  three: null,
  threeReady: false,
  ambientTrack: null,
  currentEngineTrack: null,
  availableAudioSources: null,
  hasWarnedMissingAmbientAudio: false,
  missingEngineAudioWarnings: new Set(),
};

const landingRuntime = {
  initialized: false,
  lenis: null,
  lenisRAF: null,
  heroParallaxBound: false,
};

const showroomScrollGuard = {
  bound: false,
};

const pages = [...document.querySelectorAll(".page")];
const app = document.getElementById("app");
const landingPage = document.getElementById("landing");
const showroomPage = document.getElementById("showroom");
const carShowcasePage = document.getElementById("carShowcase");
const transitionOverlay = document.getElementById("transitionOverlay");
const carGrid = document.getElementById("carGrid");
const showroomBuildCount = document.getElementById("showroomBuildCount");
const showroomPowerPeak = document.getElementById("showroomPowerPeak");
const showroomSpeedPeak = document.getElementById("showroomSpeedPeak");
const carSelect = document.getElementById("carSelect");
const soundToggle = document.getElementById("soundToggle");
const customCursor = document.getElementById("customCursor");
const showcaseScroll = document.getElementById("showcaseScroll");
const carModel = document.getElementById("carModel");
const angleLabel = document.getElementById("angleLabel");
const driverPanel = document.getElementById("driverPanel");
const startEngineBtn = document.getElementById("startEngineBtn");
const rpmNeedle = document.getElementById("rpmNeedle");
const specsGrid = document.getElementById("specsGrid");
const showcaseCarName = document.querySelector(".showcase-car-name");
const showcaseCarSubtitle = document.querySelector(".showcase-car-subtitle");
const contactForm = document.getElementById("contactForm");
const stageScene = document.querySelector(".stage-scene");
const dashboard = document.querySelector(".dashboard");
const threeViewport = document.getElementById("threeViewport");
const threeLoading = document.getElementById("threeLoading");
const exteriorEnhancementText = document.getElementById(
  "exteriorEnhancementText",
);
const interiorCraftsmanshipText = document.getElementById(
  "interiorCraftsmanshipText",
);
const aerodynamicNotesText = document.getElementById("aerodynamicNotesText");
const limitedProductionText = document.getElementById("limitedProductionText");
const dashboardIntelligenceLabel = document.getElementById(
  "dashboardIntelligenceLabel",
);
const activeMonitoringText = document.getElementById("activeMonitoringText");
const modeSportText = document.getElementById("modeSportText");
const modeTrackText = document.getElementById("modeTrackText");
const modeComfortText = document.getElementById("modeComfortText");
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
);

const anglePhases = [
  { from: 0, to: 0.18, label: "Front Fascia" },
  { from: 0.18, to: 0.34, label: "Side Profile" },
  { from: 0.34, to: 0.5, label: "Rear Diffuser" },
  { from: 0.5, to: 0.66, label: "Driver Side" },
  { from: 0.66, to: 0.78, label: "Roof Sculpting" },
  { from: 0.78, to: 0.9, label: "Interior Transition" },
  { from: 0.9, to: 1, label: "Driver Perspective" },
];

function renderCars() {
  if (carGrid) {
    carGrid.classList.remove("cards-ready");
  }
  carGrid.innerHTML = "";
  cars.forEach((car, index) => {
    const buildSerial = String(index + 1).padStart(2, "0");
    const quickPower = car.specs?.powerOutput || "N/A";
    const quickSprint = car.specs?.zeroToHundred || "N/A";
    const quickTopSpeed = car.specs?.topSpeed || "N/A";

    const card = document.createElement("article");
    card.className = "car-card";
    card.setAttribute("role", "listitem");
    card.style.setProperty("--card-index", String(index));

     const imageSrc = car.id === "onepro" ? "assets/images/Mansory-Jesko.jpg" : car.id === "p9lm900" ? "assets/images/Mansory%20P9LM.webp" : car.id === "carbonadox" ? "assets/images/Carbonado%20X.webp" : car.id === "venatuss900" ? "assets/images/Ventus.webp" : car.id === "bolide2024" ? "assets/images/Bugatti%20boldie.webp" : car.id === "stallone812" ? "assets/images/Mansory%20stallone.jpg" : "assets/images/mansory-cullinan.jpg";

    card.innerHTML = `
      <div class="car-card-image">
        <img src="${imageSrc}" alt="${car.name}" loading="lazy" onerror="this.src='assets/images/mansory-rear.webp'">
      </div>
      <div class="car-card-content">
        <div class="car-card-top">
          <span class="car-card-index">Build ${buildSerial}</span>
          <span class="car-card-ready">Ready</span>
        </div>
        <h3 class="car-card-name">${car.name}</h3>
        <p class="car-class-label">${car.vehicleClass || "Bespoke Vehicle Program"}</p>
        <div class="car-card-divider"></div>
        <div class="car-quick-specs">
          <span><small>Power</small><strong>${quickPower}</strong></span>
          <span><small>0-100</small><strong>${quickSprint}</strong></span>
          <span><small>Top Speed</small><strong>${quickTopSpeed}</strong></span>
        </div>
        <button class="car-card-button" data-car-id="${car.id}">View 3D Build</button>
      </div>
    `;
    carGrid.append(card);
  });
  hydrateShowroomHighlights();
  requestAnimationFrame(() => {
    carGrid.classList.add("cards-ready");
  });
}

function extractLeadingNumber(rawValue) {
  if (rawValue === undefined || rawValue === null) {
    return NaN;
  }
  const match = String(rawValue).match(/(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : NaN;
}

function hydrateShowroomHighlights() {
  if (showroomBuildCount) {
    showroomBuildCount.textContent = `${cars.length}`;
  }

  if (showroomPowerPeak) {
    const powerPeak = cars.reduce((best, car) => {
      const numeric = extractLeadingNumber(car?.specs?.powerOutput);
      return Number.isFinite(numeric) ? Math.max(best, numeric) : best;
    }, 0);
    showroomPowerPeak.textContent =
      powerPeak > 0 ? `${Math.round(powerPeak)} hp` : "N/A";
  }

  if (showroomSpeedPeak) {
    const speedPeak = cars.reduce((best, car) => {
      const numeric = extractLeadingNumber(car?.specs?.topSpeed);
      return Number.isFinite(numeric) ? Math.max(best, numeric) : best;
    }, 0);
    showroomSpeedPeak.textContent =
      speedPeak > 0 ? `${Math.round(speedPeak)} km/h` : "N/A";
  }
}

function fillCarSelect() {
  cars.forEach((car) => {
    const option = document.createElement("option");
    option.value = car.id;
    option.textContent = car.name;
    carSelect.append(option);
  });
}

function bindEvents() {
  document.getElementById("enterShowroomBtn").addEventListener("click", () => {
    playUISound(240, 0.12);
    if (landingPage) {
      landingPage.classList.remove("exiting");
      void landingPage.offsetWidth;
      landingPage.classList.add("exiting");
    }
    runTransition(
      () => {
        setActivePage("showroom");
        landingPage?.classList.remove("exiting");
      },
      { variant: "showroom-enter" },
    );
  });

  document.getElementById("backToShowroom").addEventListener("click", () => {
    playUISound(210, 0.1);
    runTransition(() => setActivePage("showroom"));
  });

  document.querySelectorAll("[data-target]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.getAttribute("data-target");
      playUISound(180, 0.1);
      runTransition(() => setActivePage(target));
    });
  });

  carGrid.addEventListener("click", (event) => {
    const rawTarget = event.target;
    if (!(rawTarget instanceof Element)) {
      return;
    }
    const target = rawTarget.closest("button[data-car-id]");
    if (!(target instanceof HTMLButtonElement)) {
      return;
    }
    const carId = target.dataset.carId;
    const selected = cars.find((car) => car.id === carId);
    if (!selected) {
      return;
    }
    state.selectedCar = selected;

    playEngineHoverSweep();

    if (state.threeReady && state.three) {
      state.three.preloadCar(selected, { priority: true });
    }

    // Instant transition to car showcase
    setActivePage("carShowcase");
    hydrateShowcase(selected);
    syncShowcaseProgress();
  });

  showcaseScroll.addEventListener("scroll", () => {
    if (state.activePage !== "carShowcase") {
      return;
    }
    if (state.showcaseRAF) {
      cancelAnimationFrame(state.showcaseRAF);
    }
    state.showcaseRAF = requestAnimationFrame(syncShowcaseProgress);
  });

  startEngineBtn.addEventListener("click", () => {
    animateRPMNeedle();
    if (stageScene) {
      stageScene.classList.remove("engine-shake");
      void stageScene.offsetWidth;
      stageScene.classList.add("engine-shake");
    }
    if (dashboard) {
      dashboard.classList.add("engine-on");
    }
    startEngineBtn.textContent = "Engine Running";
    playEngineStart();
  });

  document.querySelectorAll(".color-dot").forEach((dot) => {
    dot.addEventListener("click", () => {
      document
        .querySelectorAll(".color-dot")
        .forEach((btn) => btn.classList.remove("active"));
      dot.classList.add("active");
      const color = dot.getAttribute("data-color") || "#7f7f7f";
      document.documentElement.style.setProperty("--car-color", color);
      if (state.threeReady && state.three) {
        state.three.setBodyColor(color);
      }
      playUISound(300, 0.09);
    });
  });

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    playUISound(480, 0.12);
    const submitButton = contactForm.querySelector("button[type='submit']");
    if (submitButton instanceof HTMLButtonElement) {
      submitButton.textContent = "Request Sent";
      submitButton.style.filter = "brightness(1.2)";
      window.setTimeout(() => {
        submitButton.textContent = "Submit Request";
        submitButton.style.filter = "none";
      }, 1700);
    }
    contactForm.reset();
  });

  soundToggle.addEventListener("click", toggleAudio);
  document
    .getElementById("enterShowroomBtn")
    .addEventListener("mouseenter", playHoverEngine);
  wireCursor();
  wireReferenceInteractions();
  wireShowroomScrollGuard();
  wireProgressiveCarPreload();

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      state.three?.stopRenderLoop?.();
    } else if (state.activePage === "carShowcase") {
      state.three?.startRenderLoop?.();
    }
  });

  document.querySelectorAll(".showroom-pill").forEach((btn, index) => {
    if (!(btn instanceof HTMLElement)) {
      return;
    }
    btn.style.setProperty("--pill-index", String(index));
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".showroom-pill")
        .forEach((pill) => pill.classList.remove("is-active"));
      btn.classList.add("is-active");
      playUISound(220, 0.08);
    });
  });
}

function setActivePage(pageId) {
  state.activePage = pageId;
  pages.forEach((page) => {
    const isActive = page.id === pageId;
    page.classList.toggle("active", isActive);
    page.setAttribute("aria-hidden", String(!isActive));
  });
  document.body.classList.toggle("showroom-isolation", pageId !== "landing");
  document.body.classList.toggle("showroom-environment", pageId === "showroom");
  document.body.classList.toggle("landing-active", pageId === "landing");
  if (pageId === "showroom") {
    window.scrollTo({ top: 0, behavior: "auto" });
  }
  if (landingRuntime.lenis) {
    if (pageId === "landing") {
      landingRuntime.lenis.start();
      landingRuntime.lenis.scrollTo(0, { immediate: true });
    } else {
      landingRuntime.lenis.stop();
    }
  } else if (pageId === "landing") {
    window.scrollTo({ top: 0, behavior: "auto" });
  }
  if (showroomPage) {
    if (pageId === "showroom") {
      showroomPage.classList.remove("mount-in");
      void showroomPage.offsetWidth;
      showroomPage.classList.add("mount-in");
    } else {
      showroomPage.classList.remove("mount-in");
    }
  }
  if (pageId === "carShowcase") {
    showcaseScroll.scrollTop = 0;
    syncShowcaseProgress();
    state.three?.startRenderLoop?.();
  } else {
    state.three?.stopRenderLoop?.();
  }
}

function wireShowroomScrollGuard() {
  if (showroomScrollGuard.bound) {
    return;
  }
  showroomScrollGuard.bound = true;

  const shouldBlockMouseScroll = () => false;

  document.addEventListener(
    "wheel",
    (event) => {
      if (!shouldBlockMouseScroll()) {
        return;
      }
      event.preventDefault();
    },
    { passive: false },
  );

  document.addEventListener("mousedown", (event) => {
    if (!shouldBlockMouseScroll()) {
      return;
    }
    if (event.button === 1) {
      event.preventDefault();
    }
  });

  document.addEventListener("auxclick", (event) => {
    if (!shouldBlockMouseScroll()) {
      return;
    }
    if (event.button === 1) {
      event.preventDefault();
    }
  });
}

function wireProgressiveCarPreload() {
  if (!(carGrid instanceof HTMLElement)) {
    return;
  }

  const queuePreloadFromTarget = (rawTarget, priority = true) => {
    if (!state.threeReady || !state.three || !(rawTarget instanceof Element)) {
      return;
    }
    const trigger = rawTarget.closest("button[data-car-id]");
    if (!(trigger instanceof HTMLButtonElement)) {
      return;
    }
    const carId = trigger.dataset.carId;
    if (!carId) {
      return;
    }
    state.three.preloadCar(carId, { priority });
  };

  carGrid.addEventListener(
    "pointerenter",
    (event) => {
      queuePreloadFromTarget(event.target, true);
    },
    true,
  );

  carGrid.addEventListener("focusin", (event) => {
    queuePreloadFromTarget(event.target, true);
  });

  carGrid.addEventListener(
    "touchstart",
    (event) => {
      queuePreloadFromTarget(event.target, true);
    },
    { passive: true },
  );

  carGrid.addEventListener(
    "mousedown",
    (event) => {
      queuePreloadFromTarget(event.target, true);
    },
    true,
  );
}

function initLandingExperience() {
  if (landingRuntime.initialized) {
    return;
  }
  const cinematicRoot = document.querySelector("[data-cinematic-root]");
  if (!cinematicRoot) {
    return;
  }

  landingRuntime.initialized = true;
  splitLandingHeadline();
  initLandingSmoothScroll();
  initLandingParallax();
  wireLandingCardMicroMotion();
  initLandingGsapScenes();
  initLandingStatCounters();
}
function splitLandingHeadline() {
  const title = document.getElementById("landingTitle");
  if (!(title instanceof HTMLElement) || title.dataset.split === "true") {
    return;
  }
  const words = title.textContent.trim().split(/\s+/).filter(Boolean);
  title.innerHTML = words
    .map(
      (word, index) =>
        `<span class="hero-word" style="--word-index:${index}">${word}</span>`,
    )
    .join(" ");
  title.dataset.split = "true";
  title.setAttribute("aria-label", words.join(" "));
}

function initLandingSmoothScroll() {
  const shouldUseSmooth =
    !prefersReducedMotion.matches && window.innerWidth > 900;
  if (
    !shouldUseSmooth ||
    typeof window.Lenis !== "function" ||
    landingRuntime.lenis
  ) {
    return;
  }
  const lenis = new window.Lenis({
    duration: 1.35,
    smoothWheel: true,
    wheelMultiplier: 0.72,
    lerp: 0.075,
  });

  if (window.ScrollTrigger) {
    lenis.on("scroll", () => window.ScrollTrigger.update());
  }

  const raf = (time) => {
    lenis.raf(time);
    landingRuntime.lenisRAF = requestAnimationFrame(raf);
  };
  landingRuntime.lenisRAF = requestAnimationFrame(raf);
  landingRuntime.lenis = lenis;
}

function initLandingParallax() {
  if (
    landingRuntime.heroParallaxBound ||
    prefersReducedMotion.matches ||
    !window.matchMedia("(pointer: fine)").matches
  ) {
    return;
  }
  const hero = document.querySelector(".landing-hero");
  if (!(hero instanceof HTMLElement)) {
    return;
  }
  landingRuntime.heroParallaxBound = true;

  let parallaxRaf = 0;
  let lastHeroMove = null;
  hero.addEventListener("pointermove", (event) => {
    if (state.activePage !== "landing") {
      return;
    }
    lastHeroMove = event;
    if (parallaxRaf) {
      return;
    }
    parallaxRaf = requestAnimationFrame(() => {
      parallaxRaf = 0;
      const e = lastHeroMove;
      if (!e) {
        return;
      }
      const rect = hero.getBoundingClientRect();
      const xNorm =
        clamp((e.clientX - rect.left) / Math.max(rect.width, 1), 0, 1) - 0.5;
      const yNorm =
        clamp((e.clientY - rect.top) / Math.max(rect.height, 1), 0, 1) - 0.5;
      const pointerX = ((xNorm + 0.5) * 100).toFixed(2);
      const pointerY = ((yNorm + 0.5) * 100).toFixed(2);
      const centerFalloff = Math.min(Math.hypot(xNorm * 1.7, yNorm * 1.5), 1);
      const pointerEnergy = (0.34 + (1 - centerFalloff) * 0.66).toFixed(3);
      hero.style.setProperty(
        "--hero-parallax-x",
        `${(xNorm * 22).toFixed(2)}px`,
      );
      hero.style.setProperty(
        "--hero-parallax-y",
        `${(yNorm * 16).toFixed(2)}px`,
      );
      hero.style.setProperty("--hero-pointer-x", `${pointerX}%`);
      hero.style.setProperty("--hero-pointer-y", `${pointerY}%`);
      hero.style.setProperty("--hero-pointer-energy", pointerEnergy);
      hero.style.setProperty(
        "--hero-tilt-x",
        `${(yNorm * -2.2).toFixed(2)}deg`,
      );
      hero.style.setProperty("--hero-tilt-y", `${(xNorm * 3.1).toFixed(2)}deg`);
    });
  });

  hero.addEventListener("pointerleave", () => {
    hero.style.setProperty("--hero-parallax-x", "0px");
    hero.style.setProperty("--hero-parallax-y", "0px");
    hero.style.setProperty("--hero-pointer-x", "50%");
    hero.style.setProperty("--hero-pointer-y", "46%");
    hero.style.setProperty("--hero-pointer-energy", "0");
    hero.style.setProperty("--hero-tilt-x", "0deg");
    hero.style.setProperty("--hero-tilt-y", "0deg");
  });
}

function initLandingGsapScenes() {
  if (prefersReducedMotion.matches || window.innerWidth <= 900) {
    return;
  }
  const gsapLib = window.gsap;
  const scrollTriggerLib = window.ScrollTrigger;
  if (!gsapLib || !scrollTriggerLib) {
    return;
  }
  gsapLib.registerPlugin(scrollTriggerLib);

  gsapLib.from("#heroReactBackground", {
    scale: 1.08,
    opacity: 0,
    duration: 1.8,
    ease: "expo.out",
  });
  gsapLib.from(
    ".gridscan-floor, .gridscan-scanline, .gridscan-frame-top, .gridscan-particles",
    {
      opacity: 0,
      y: 18,
      duration: 1.15,
      ease: "power3.out",
      stagger: 0.06,
      delay: 0.08,
    },
  );

  gsapLib.from(".hero-title", {
    yPercent: 24,
    opacity: 0,
    duration: 1.05,
    ease: "power4.out",
    delay: 0.18,
  });
  gsapLib.from(
    ".brand-lockup, .hero-logo-badge, .hero-subtext, .hero-cta-row, .hero-trust, .hero-scroll-cue",
    {
      y: 40,
      opacity: 0,
      duration: 1.2,
      ease: "expo.out",
      stagger: 0.1,
      delay: 0.4,
    },
  );

  gsapLib.to("#heroReactBackground", {
    yPercent: -2.4,
    scrollTrigger: {
      trigger: ".scene-hero",
      start: "top top",
      end: "bottom top",
      scrub: 1.35,
    },
  });
  gsapLib.to(".gridscan-floor", {
    yPercent: -6,
    scrollTrigger: {
      trigger: ".scene-hero",
      start: "top top",
      end: "bottom top",
      scrub: 1.25,
    },
  });
  gsapLib.to(".gridscan-spotlight", {
    yPercent: -4,
    xPercent: 1.8,
    scrollTrigger: {
      trigger: ".scene-hero",
      start: "top top",
      end: "bottom top",
      scrub: 1.2,
    },
  });
  gsapLib.utils.toArray(".scene-panel").forEach((panel) => {
    if (
      !(panel instanceof HTMLElement) ||
      panel.classList.contains("scene-hero")
    ) {
      return;
    }
    const timeline = gsapLib.timeline({
      scrollTrigger: {
        trigger: panel,
        start: "top 86%",
        end: "top 50%",
        toggleActions: "play none none none",
      },
    });
    timeline.from(panel, {
      y: 28,
      opacity: 0.72,
      scale: 0.992,
      duration: 1.12,
      ease: "power2.out",
      transformOrigin: "50% 50%",
      immediateRender: false,
    });
    timeline.from(
      panel.querySelectorAll(
        ".scene-eyebrow, h2, p, .scene-media, .brand-stats",
      ),
      {
        y: 26,
        opacity: 0,
        duration: 0.96,
        stagger: 0.06,
        ease: "expo.out",
      },
      "-=0.76",
    );

    const shell = panel.querySelector(".scene-shell");
    if (shell) {
      gsapLib.to(shell, {
        yPercent: -3,
        scrollTrigger: {
          trigger: panel,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }
  });

  const galleryStage = document.querySelector(".gallery-stage");
  const galleryTrack = document.querySelector(".gallery-track");
  if (
    galleryStage instanceof HTMLElement &&
    galleryTrack instanceof HTMLElement
  ) {
    const getTrackDistance = () =>
      Math.max(galleryTrack.scrollWidth - galleryStage.clientWidth, 0);
    if (getTrackDistance() > 40) {
      gsapLib.to(galleryTrack, {
        x: () => -getTrackDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: ".scene-b",
          start: "top top",
          end: () => `+=${getTrackDistance() * 1.08}`,
          scrub: 1.45,
          pin: galleryStage,
          pinSpacing: true,
          invalidateOnRefresh: true,
          anticipatePin: 0.8,
          fastScrollEnd: true,
        },
      });

      const cards = gsapLib.utils.toArray(".gallery-card");
      if (cards.length > 0) {
        gsapLib.from(cards, {
          opacity: 0.12,
          y: 18,
          scale: 0.992,
          duration: 0.72,
          stagger: 0.05,
          ease: "expo.out",
          clearProps: "opacity,transform",
          scrollTrigger: {
            trigger: ".scene-b",
            start: "top 78%",
            once: true,
          },
        });
      }
    }
  }

  gsapLib.utils.toArray(".service-card, .testimonial-card").forEach((el) => {
    if (!(el instanceof HTMLElement)) {
      return;
    }
    gsapLib.from(el, {
      y: 32,
      opacity: 0,
      duration: 0.9,
      ease: "expo.out",
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        toggleActions: "play none none none",
      },
    });
  });

  gsapLib.utils
    .toArray(".scene-final .quote-layout, .scene-final .lead-form")
    .forEach((el) => {
      if (!(el instanceof HTMLElement)) {
        return;
      }
      gsapLib.from(el, {
        y: 26,
        opacity: 0,
        duration: 0.95,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 86%",
          toggleActions: "play none none none",
        },
      });
    });
}

function wireLandingCardMicroMotion() {
  if (
    prefersReducedMotion.matches ||
    !window.matchMedia("(pointer: fine)").matches
  ) {
    return;
  }
  const cards = document.querySelectorAll(".gallery-card");
  cards.forEach((card) => {
    if (!(card instanceof HTMLElement) || card.dataset.motionBound === "true") {
      return;
    }
    card.dataset.motionBound = "true";
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x =
        clamp((event.clientX - rect.left) / Math.max(rect.width, 1), 0, 1) -
        0.5;
      const y =
        clamp((event.clientY - rect.top) / Math.max(rect.height, 1), 0, 1) -
        0.5;
      card.style.setProperty("--card-tilt-x", `${(-y * 7).toFixed(2)}deg`);
      card.style.setProperty("--card-tilt-y", `${(x * 8).toFixed(2)}deg`);
      card.style.setProperty(
        "--card-glow-x",
        `${((x + 0.5) * 100).toFixed(2)}%`,
      );
      card.style.setProperty(
        "--card-glow-y",
        `${((y + 0.5) * 100).toFixed(2)}%`,
      );
    });
    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--card-tilt-x", "0deg");
      card.style.setProperty("--card-tilt-y", "0deg");
      card.style.setProperty("--card-glow-x", "50%");
      card.style.setProperty("--card-glow-y", "50%");
    });
  });
}

function initLandingStatCounters() {
  const statValues = Array.from(
    document.querySelectorAll(".stat-value[data-target]"),
  );
  if (statValues.length === 0) {
    return;
  }
  const gsapLib = window.gsap;
  const scrollTriggerLib = window.ScrollTrigger;

  statValues.forEach((node) => {
    const target = Number(node.getAttribute("data-target"));
    if (!Number.isFinite(target)) {
      return;
    }
    const isDecimal = target % 1 !== 0;
    if (prefersReducedMotion.matches || !gsapLib || !scrollTriggerLib) {
      node.textContent = isDecimal ? target.toFixed(1) : String(Math.round(target));
      return;
    }
    const counter = { value: 0 };
    gsapLib.to(counter, {
      value: target,
      duration: 1.8,
      ease: "expo.out",
      onUpdate: () => {
        node.textContent = isDecimal ? counter.value.toFixed(1) : String(Math.round(counter.value));
      },
      scrollTrigger: {
        trigger: node,
        start: "top 82%",
        once: true,
      },
    });
  });
}

let transitionGeneration = 0;

function runTransition(onMidpoint, options = {}) {
  const variant = options.variant || "";
  const gsapLib = window.gsap;

  if (!gsapLib || !transitionOverlay) {
    onMidpoint();
    return;
  }

  transitionGeneration += 1;
  const token = transitionGeneration;

  const tl = gsapLib.timeline({
    onComplete: () => {
      if (token === transitionGeneration) {
        gsapLib.to(transitionOverlay, {
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut",
          onComplete: () => {
            transitionOverlay.classList.remove("active");
            if (variant) transitionOverlay.classList.remove(variant);
          }
        });
      }
    }
  });

  transitionOverlay.classList.add("active");
  if (variant) transitionOverlay.classList.add(variant);

  tl.to(transitionOverlay, {
    opacity: 1,
    duration: 0.5,
    ease: "expo.inOut",
    onComplete: () => {
      onMidpoint();
    }
  });
}

function hydrateShowcase(car) {
  const immersiveMode =
    car.id === "stallone812" ||
    car.id === "onepro" ||
    car.id === "bolide2024" ||
    car.id === "p9lm900" ||
    car.id === "carbonadox" ||
    car.id === "venatuss900";
  if (carShowcasePage) {
    carShowcasePage.classList.toggle("immersive-mode", immersiveMode);
  }
  showcaseCarName.textContent = car.name;
  showcaseCarSubtitle.textContent = car.description;
  renderSpecs(car.specs);
  driverPanel.classList.remove("visible");
  if (dashboard) {
    dashboard.classList.remove("engine-on");
  }
  if (stageScene) {
    stageScene.classList.remove("engine-shake");
    stageScene.classList.remove("model-ready", "fallback-active");
    stageScene.classList.add("model-loading");
  }
  startEngineBtn.textContent = "Start Engine";
  angleLabel.textContent = immersiveMode ? "Live Orbit View" : "Front Fascia";
  const defaultColor = car.fallbackBodyColor || "#7f7f7f";
  document.documentElement.style.setProperty("--car-color", defaultColor);
  document.querySelectorAll(".color-dot").forEach((dot, index) => {
    dot.classList.toggle("active", index === 0);
  });
  carSelect.value = car.id;
  if (exteriorEnhancementText) {
    exteriorEnhancementText.textContent = car.exteriorEnhancement;
  }
  if (interiorCraftsmanshipText) {
    interiorCraftsmanshipText.textContent = car.interiorCraftsmanship;
  }
  if (aerodynamicNotesText) {
    aerodynamicNotesText.textContent = car.aerodynamicOptimization;
  }
  if (limitedProductionText) {
    limitedProductionText.textContent = car.limitedProductionNotice;
  }
  if (dashboardIntelligenceLabel) {
    dashboardIntelligenceLabel.textContent = car.dashboardIntelligence;
  }
  if (activeMonitoringText) {
    activeMonitoringText.textContent = car.activeMonitoring;
  }
  if (modeSportText) {
    modeSportText.textContent =
      car.driveModes?.sport || modeSportText.textContent;
  }
  if (modeTrackText) {
    modeTrackText.textContent =
      car.driveModes?.track || modeTrackText.textContent;
  }
  if (modeComfortText) {
    modeComfortText.textContent =
      car.driveModes?.comfort || modeComfortText.textContent;
  }

  if (state.threeReady && state.three) {
    state.three.setImmersiveMode(immersiveMode);
    state.three.loadCar(car);
    state.three.setBodyColor(defaultColor);
  } else if (stageScene) {
    stageScene.classList.remove("model-loading");
    stageScene.classList.add("model-ready", "fallback-active");
  }
}

function renderSpecs(specs) {
  specsGrid.innerHTML = "";
  Object.entries(specs).forEach(([label, value]) => {
    const item = document.createElement("article");
    item.className = "spec-item";
    item.style.opacity = "0";
    item.innerHTML = `
      <div class="spec-label">${humanizeKey(label)}</div>
      <div class="spec-value">${value}</div>
    `;
    specsGrid.append(item);
  });

  const gsapLib = window.gsap;
  if (gsapLib) {
    gsapLib.fromTo(
      specsGrid.querySelectorAll(".spec-item"),
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: "expo.out",
        delay: 0.2
      }
    );
  }
}

function humanizeKey(key) {
  const labelMap = {
    powerOutput: "Power Output",
    torque: "Torque",
    zeroToHundred: "0-100 km/h",
    topSpeed: "Top Speed",
    drivetrain: "Drivetrain",
  };
  if (labelMap[key]) {
    return labelMap[key];
  }
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char) => char.toUpperCase());
}

function syncShowcaseProgress() {
  const maxScroll = showcaseScroll.scrollHeight - showcaseScroll.clientHeight;
  const progress = maxScroll <= 0 ? 0 : showcaseScroll.scrollTop / maxScroll;
  const immersiveMode = !!carShowcasePage?.classList.contains("immersive-mode");

  if (immersiveMode) {
    angleLabel.textContent = "Live Orbit View";
    if (state.threeReady && state.three) {
      state.three.update(progress);
    } else {
      updateFallbackModel(progress);
    }
    driverPanel.classList.remove("visible");
    return;
  }

  const phase =
    anglePhases.find(
      (entry) => progress >= entry.from && progress <= entry.to,
    ) || anglePhases[0];

  if (state.currentAngle !== phase.label) {
    state.currentAngle = phase.label;
    angleLabel.textContent = phase.label;
    angleLabel.style.opacity = "0";
    requestAnimationFrame(() => {
      angleLabel.style.opacity = "1";
    });
  }

  if (state.threeReady && state.three) {
    state.three.update(progress);
  } else {
    updateFallbackModel(progress);
  }

  if (progress >= 0.88) {
    driverPanel.classList.add("visible");
  } else {
    driverPanel.classList.remove("visible");
  }
}

function updateFallbackModel(progress) {
  const rotY = interpolate(0, 360, Math.min(progress, 0.72) / 0.72);
  const rotX = interpolate(0, 30, clamp((progress - 0.62) / 0.25, 0, 1));
  const scale = interpolate(1, 1.26, clamp((progress - 0.72) / 0.28, 0, 1));
  carModel.style.transform = `rotateY(${rotY}deg) rotateX(${rotX}deg) scale(${scale})`;
  carModel.style.filter = `brightness(${1 + progress * 0.2})`;
}

function interpolate(start, end, amount) {
  return start + (end - start) * amount;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function wireCursor() {
  if (!customCursor) {
    return;
  }

  let cursorRaf = 0;
  let pendingX = 0;
  let pendingY = 0;
  document.addEventListener("mousemove", (event) => {
    pendingX = event.clientX;
    pendingY = event.clientY;
    if (cursorRaf) {
      return;
    }
    cursorRaf = requestAnimationFrame(() => {
      cursorRaf = 0;
      customCursor.style.left = `${pendingX}px`;
      customCursor.style.top = `${pendingY}px`;
    });
  });

  document
    .querySelectorAll("button, a, input, select, textarea")
    .forEach((interactive) => {
      interactive.addEventListener("mouseenter", () =>
        customCursor.classList.add("active"),
      );
      interactive.addEventListener("mouseleave", () =>
        customCursor.classList.remove("active"),
      );
    });

  const showroomEntry = document.getElementById("enterShowroomBtn");
  if (showroomEntry) {
    showroomEntry.addEventListener("mouseenter", () =>
      customCursor.classList.add("showcase-hover"),
    );
    showroomEntry.addEventListener("mouseleave", () =>
      customCursor.classList.remove("showcase-hover"),
    );
  }
}

function wireReferenceInteractions() {
  if (!window.matchMedia("(pointer: fine)").matches) {
    return;
  }

  const magneticTargets = document.querySelectorAll(
    ".cta-button, .ghost-button, .top-back, .sound-toggle",
  );
  magneticTargets.forEach((target) => {
    if (
      !(target instanceof HTMLElement) ||
      target.dataset.motionBound === "true"
    ) {
      return;
    }
    target.dataset.motionBound = "true";
    target.addEventListener("mousemove", (event) => {
      const rect = target.getBoundingClientRect();
      const offsetX = event.clientX - rect.left - rect.width / 2;
      const offsetY = event.clientY - rect.top - rect.height / 2;
      const moveX = clamp(offsetX * 0.08, -8, 8);
      const moveY = clamp(offsetY * 0.08, -8, 8);
      target.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
    });
    target.addEventListener("mouseleave", () => {
      target.style.transform = "";
    });
  });

  const cards = document.querySelectorAll(".car-card");
  cards.forEach((card) => {
    if (!(card instanceof HTMLElement) || card.dataset.motionBound === "true") {
      return;
    }
    card.dataset.motionBound = "true";
    let cardRaf = 0;
    let lastCardEvent = null;
    card.addEventListener("pointermove", (event) => {
      lastCardEvent = event;
      if (cardRaf) {
        return;
      }
      cardRaf = requestAnimationFrame(() => {
        cardRaf = 0;
        const e = lastCardEvent;
        if (!e) {
          return;
        }
        const rect = card.getBoundingClientRect();
        const relativeX = clamp(
          (e.clientX - rect.left) / Math.max(rect.width, 1),
          0,
          1,
        );
        const relativeY = clamp(
          (e.clientY - rect.top) / Math.max(rect.height, 1),
          0,
          1,
        );
        card.style.setProperty("--mx", `${(relativeX * 100).toFixed(2)}%`);
        card.style.setProperty("--my", `${(relativeY * 100).toFixed(2)}%`);
        const tiltX = (0.5 - relativeY) * 5;
        const tiltY = (relativeX - 0.5) * 7;
        card.style.setProperty("--tilt-x", `${tiltX.toFixed(2)}deg`);
        card.style.setProperty("--tilt-y", `${tiltY.toFixed(2)}deg`);
      });
    });
    card.addEventListener("pointerleave", () => {
      lastCardEvent = null;
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
      card.style.setProperty("--mx", "50%");
      card.style.setProperty("--my", "50%");
    });
  });

  if (
    stageScene instanceof HTMLElement &&
    stageScene.dataset.motionBound !== "true"
  ) {
    stageScene.dataset.motionBound = "true";
    let stageRaf = 0;
    let lastStageEvent = null;
    stageScene.addEventListener("pointermove", (event) => {
      if (state.activePage !== "carShowcase") {
        return;
      }
      lastStageEvent = event;
      if (stageRaf) {
        return;
      }
      stageRaf = requestAnimationFrame(() => {
        stageRaf = 0;
        const e = lastStageEvent;
        if (!e) {
          return;
        }
        const rect = stageScene.getBoundingClientRect();
        const normalizedX =
          clamp((e.clientX - rect.left) / Math.max(rect.width, 1), 0, 1) - 0.5;
        const normalizedY =
          clamp((e.clientY - rect.top) / Math.max(rect.height, 1), 0, 1) - 0.5;
        stageScene.style.setProperty(
          "--stage-x",
          `${(normalizedX * 14).toFixed(2)}px`,
        );
        stageScene.style.setProperty(
          "--stage-y",
          `${(normalizedY * 10).toFixed(2)}px`,
        );
        stageScene.style.setProperty("--stage-scale", "1.014");
      });
    });
    stageScene.addEventListener("pointerleave", () => {
      lastStageEvent = null;
      stageScene.style.setProperty("--stage-x", "0px");
      stageScene.style.setProperty("--stage-y", "0px");
      stageScene.style.setProperty("--stage-scale", "1");
    });
  }
}

function toggleAudio() {
  if (!state.audio) {
    state.audio = createAudioSuite();
  }

  state.audioEnabled = !state.audioEnabled;
  soundToggle.textContent = `Sound: ${state.audioEnabled ? "On" : "Off"}`;

  if (state.audioEnabled) {
    ensureAmbientTrack();
    state.audio.startAmbient();
    playTrack(state.ambientTrack);
    playUISound(340, 0.1);
  } else {
    state.audio.stopAmbient();
    stopTrack(state.ambientTrack);
    stopTrack(state.currentEngineTrack);
  }
}

function ensureShowroomAudio() {
  if (!state.audio) {
    state.audio = createAudioSuite();
  }
  ensureAmbientTrack();
  if (!state.audioEnabled) {
    state.audioEnabled = true;
    if (soundToggle) {
      soundToggle.textContent = "Sound: On";
    }
  }
  state.audio.startAmbient();
  playTrack(state.ambientTrack);
  state.audio.engineSweep(0.15);
}

function playUISound(freq, duration) {
  if (!state.audioEnabled || !state.audio) {
    return;
  }
  state.audio.beep(freq, duration);
}

function playHoverEngine() {
  if (!state.audioEnabled || !state.audio) {
    return;
  }
  state.audio.engineSweep(0.11);
}

function playEngineHoverSweep() {
  if (!state.audioEnabled || !state.audio) {
    return;
  }
  state.audio.engineSweep(0.22);
}

function playEngineStart() {
  if (!state.audioEnabled || !state.audio) {
    return;
  }

  const engineProfiles = {
    phantom: { base: 58, peak: 132 },
    onepro: { base: 112, peak: 238 },
    bolide2024: { base: 118, peak: 248 },
    p9lm900: { base: 104, peak: 230 },
    carbonadox: { base: 110, peak: 242 },
    venatuss900: { base: 86, peak: 198 },
    stallone812: { base: 102, peak: 222 },
  };
  const profile =
    engineProfiles[state.selectedCar.id] || engineProfiles.phantom;
  state.audio.engineIgnition(profile);

  stopTrack(state.currentEngineTrack);
  const engineSource = state.selectedCar.engineAudioUrl;
  if (!hasAudioSource(engineSource)) {
    if (!state.missingEngineAudioWarnings.has(engineSource)) {
      console.warn(
        `Engine audio file not found: ${engineSource}. Using synthesized engine only.`,
      );
      state.missingEngineAudioWarnings.add(engineSource);
    }
    state.currentEngineTrack = null;
    return;
  }

  state.currentEngineTrack = createTrack(engineSource, false, 0.85);
  playTrack(state.currentEngineTrack);
}

function createTrack(src, loop, volume) {
  const audio = new Audio(src);
  audio.loop = loop;
  audio.volume = volume;
  audio.preload = "auto";
  return audio;
}

function ensureAmbientTrack() {
  const ambientSource = "assets/audio/ambient.mp3";
  if (!state.ambientTrack && hasAudioSource(ambientSource)) {
    state.ambientTrack = createTrack(ambientSource, true, 0.35);
  }
  if (!state.ambientTrack && !state.hasWarnedMissingAmbientAudio) {
    console.warn(
      `Ambient audio file not found: ${ambientSource}. Continuing without ambient track.`,
    );
    state.hasWarnedMissingAmbientAudio = true;
  }
}

function hasAudioSource(src) {
  if (!src) {
    return false;
  }
  if (state.availableAudioSources === null) {
    state.availableAudioSources = resolveAvailableAudioSources();
  }
  return state.availableAudioSources.has(src);
}

function resolveAvailableAudioSources() {
  const knownAudioFiles = [
    "assets/audio/ambient.mp3",
    "assets/audio/phantom-engine.mp3",
    "assets/audio/koenigsegg-one-pro-engine.mp3",
    "assets/audio/p9lm-evo-900-engine.mp3",
    "assets/audio/carbonado-x-engine.mp3",
    "assets/audio/venatus-s-p900-engine.mp3",
    "assets/audio/bugatti-bolide-engine.mp3",
    "assets/audio/ferrari-812-stallone-engine.mp3",
  ];

  return new Set(knownAudioFiles);
}

function playTrack(track) {
  if (!track) {
    return;
  }
  const promise = track.play();
  if (promise && typeof promise.catch === "function") {
    promise.catch(() => {
      // Keep synthetic fallback active if media file is unavailable.
    });
  }
}

function stopTrack(track) {
  if (!track) {
    return;
  }
  track.pause();
  track.currentTime = 0;
}

function animateRPMNeedle() {
  rpmNeedle.animate(
    [
      { transform: "rotate(-125deg)" },
      { transform: "rotate(48deg)" },
      { transform: "rotate(-20deg)" },
      { transform: "rotate(16deg)" },
    ],
    { duration: 1250, easing: "cubic-bezier(.2,.8,.2,1)", fill: "forwards" },
  );
}

async function initThreeStage() {
  if (!threeViewport) {
    return;
  }
  if (!hasWebGLSupport()) {
    if (threeLoading) {
      threeLoading.textContent =
        "3D disabled: WebGL is unavailable in this browser/device.";
    }
    return;
  }
  try {
    state.three = createThreeManager({
      THREE,
      GLTFLoader,
      mount: threeViewport,
      loadingEl: threeLoading,
      onModelLoaded: () => {
        if (!stageScene) {
          return;
        }
        stageScene.classList.remove("model-loading", "fallback-active");
        stageScene.classList.add("model-ready");
      },
      onModelFallback: () => {
        if (!stageScene) {
          return;
        }
        stageScene.classList.remove("model-loading");
        stageScene.classList.add("model-ready", "fallback-active");
      },
    });
    state.threeReady = true;
    if (stageScene) {
      stageScene.classList.add("three-ready");
    }
    if (state.activePage === "carShowcase") {
      state.three.startRenderLoop();
    }
  } catch (error) {
    if (threeLoading) {
      const reason = error instanceof Error ? error.message : String(error);
      threeLoading.textContent = `3D scene unavailable (${reason}). Fallback visual active.`;
    }
    console.error("Three.js initialization failed:", error);
  }
}

function hasWebGLSupport() {
  try {
    const canvas = document.createElement("canvas");
    const context =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    return !!context;
  } catch {
    return false;
  }
}

function createThreeManager({
  THREE,
  GLTFLoader,
  mount,
  loadingEl,
  onModelLoaded,
  onModelFallback,
}) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    42,
    mount.clientWidth / mount.clientHeight,
    0.1,
    100,
  );
  camera.position.set(0, 2.2, 8.2);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(mount.clientWidth, mount.clientHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  mount.append(renderer.domElement);

  const pmrem = new THREE.PMREMGenerator(renderer);
  const envMap = pmrem.fromScene(new RoomEnvironment(), 0.12).texture;
  scene.environment = envMap;
  scene.background = new THREE.Color(0xf4f6fb);
  pmrem.dispose();

  const clock = new THREE.Clock();

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.enableZoom = true;
  controls.minDistance = 2.2;
  controls.maxDistance = 12;
  controls.target.set(0, 0.4, 0);
  controls.enabled = false;
  controls.autoRotate = false;
  controls.autoRotateSpeed = 1;

  const hemi = new THREE.HemisphereLight(0xfff2d9, 0x111111, 0.8);
  scene.add(hemi);

  const key = new THREE.SpotLight(0xffdf9a, 1.8, 28, Math.PI / 5, 0.5, 1.2);
  key.position.set(0, 8, 6);
  key.target.position.set(0, 0, 0);
  scene.add(key);
  scene.add(key.target);

  const rim = new THREE.DirectionalLight(0xffffff, 0.9);
  rim.position.set(-5, 3, -6);
  scene.add(rim);

  const fill = new THREE.PointLight(0xf26a2e, 0.75, 14, 2);
  fill.position.set(4, 2, 3);
  scene.add(fill);

  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(8, 64),
    new THREE.MeshStandardMaterial({
      color: 0x101010,
      metalness: 0.2,
      roughness: 0.26,
    }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -0.8;
  scene.add(floor);

  const ring = new THREE.Mesh(
    new THREE.RingGeometry(2.8, 4.8, 64),
    new THREE.MeshBasicMaterial({
      color: 0xd39a2c,
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide,
    }),
  );
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = -0.75;
  scene.add(ring);

  const showroomShell = new THREE.Group();
  scene.add(showroomShell);

  const bayFloorMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xe4e7ee,
    metalness: 0.58,
    roughness: 0.24,
    clearcoat: 0.55,
    clearcoatRoughness: 0.14,
    envMapIntensity: 1.0,
  });

  const bayFloor = new THREE.Mesh(
    new THREE.CircleGeometry(18, 120),
    bayFloorMaterial,
  );
  bayFloor.rotation.x = -Math.PI / 2;
  bayFloor.position.y = -0.82;
  showroomShell.add(bayFloor);

  const carpetMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xf9f9fb,
    emissive: new THREE.Color(0xdee7ff),
    emissiveIntensity: 0.25,
    metalness: 0.32,
    roughness: 0.2,
    clearcoat: 0.28,
    clearcoatRoughness: 0.12,
  });
  const carpet = new THREE.Mesh(
    new THREE.RingGeometry(2.8, 8.2, 120, 1),
    carpetMaterial,
  );
  carpet.rotation.x = -Math.PI / 2;
  carpet.position.y = -0.79;
  showroomShell.add(carpet);

  const grid = new THREE.GridHelper(18, 32, 0xcfd6e8, 0xbac4da);
  grid.position.y = -0.82;
  if (Array.isArray(grid.material)) {
    grid.material.forEach((mat) => {
      mat.transparent = true;
      mat.opacity = 0.18;
    });
  } else {
    grid.material.transparent = true;
    grid.material.opacity = 0.18;
  }
  showroomShell.add(grid);

  const roomMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xf3f5fb,
    metalness: 0.08,
    roughness: 0.82,
    side: THREE.BackSide,
    envMapIntensity: 0.2,
  });
  const room = new THREE.Mesh(new THREE.BoxGeometry(24, 10, 24), roomMaterial);
  room.position.y = 4.2;
  showroomShell.add(room);

  const lightPanels = [];
  const panelMaterial = new THREE.MeshBasicMaterial({
    color: 0xd3a52c,
    transparent: true,
    opacity: 0.22,
  });
  const panelGeo = new THREE.PlaneGeometry(12, 1.1);

  const ceilingPanel = new THREE.Mesh(panelGeo, panelMaterial.clone());
  ceilingPanel.rotation.x = Math.PI / 2;
  ceilingPanel.position.set(0, 7.3, 0);
  showroomShell.add(ceilingPanel);
  lightPanels.push(ceilingPanel.material);

  const wallPanelFront = new THREE.Mesh(panelGeo, panelMaterial.clone());
  wallPanelFront.position.set(0, 4.6, -9.6);
  showroomShell.add(wallPanelFront);
  lightPanels.push(wallPanelFront.material);

  const wallPanelBack = wallPanelFront.clone();
  wallPanelBack.position.z = 9.6;
  showroomShell.add(wallPanelBack);
  lightPanels.push(wallPanelBack.material);

  const wallPanelLeft = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 1),
    panelMaterial.clone(),
  );
  wallPanelLeft.rotation.y = Math.PI / 2;
  wallPanelLeft.position.set(-9.8, 4.6, 0);
  showroomShell.add(wallPanelLeft);
  lightPanels.push(wallPanelLeft.material);

  const wallPanelRight = wallPanelLeft.clone();
  wallPanelRight.position.x = 9.8;
  showroomShell.add(wallPanelRight);
  lightPanels.push(wallPanelRight.material);

  const sweepLight = new THREE.SpotLight(
    0xffffff,
    1.5,
    36,
    Math.PI / 4.8,
    0.35,
    1.35,
  );
  sweepLight.position.set(0, 6.5, 7);
  sweepLight.target.position.set(0, 0.5, 0);
  scene.add(sweepLight);
  scene.add(sweepLight.target);

  const blueWash = new THREE.PointLight(0xf5f5f5, 0.7, 22, 2.1);
  blueWash.position.set(-6.5, 5, -4.5);
  scene.add(blueWash);

  const amberWash = new THREE.PointLight(0xfdfdfd, 0.62, 20, 2);
  amberWash.position.set(6.5, 5, 4.5);
  scene.add(amberWash);

  const roofStrips = [];
  const roofStripMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.46,
  });
  const roofStripGeoX = new THREE.PlaneGeometry(18, 0.22);
  const roofStripGeoZ = new THREE.PlaneGeometry(0.22, 18);

  const stripFront = new THREE.Mesh(roofStripGeoX, roofStripMaterial.clone());
  stripFront.position.set(0, 7.4, -11.6);
  showroomShell.add(stripFront);
  roofStrips.push(stripFront.material);

  const stripBack = stripFront.clone();
  stripBack.position.z = 11.6;
  showroomShell.add(stripBack);
  roofStrips.push(stripBack.material);

  const stripLeft = new THREE.Mesh(roofStripGeoZ, roofStripMaterial.clone());
  stripLeft.position.set(-11.6, 7.4, 0);
  showroomShell.add(stripLeft);
  roofStrips.push(stripLeft.material);

  const stripRight = stripLeft.clone();
  stripRight.position.x = 11.6;
  showroomShell.add(stripRight);
  roofStrips.push(stripRight.material);

  const ceilingLamp = new THREE.Mesh(
    new THREE.CircleGeometry(3.6, 48),
    new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.65,
    }),
  );
  ceilingLamp.position.set(0, 7.6, 0);
  ceilingLamp.rotation.x = Math.PI / 2;
  showroomShell.add(ceilingLamp);

  const lampLight = new THREE.SpotLight(
    0xffffff,
    1.15,
    26,
    Math.PI / 4,
    0.45,
    1.2,
  );
  lampLight.position.set(0, 7.4, 0);
  lampLight.target.position.set(0, 0.5, 0);
  scene.add(lampLight);
  scene.add(lampLight.target);

  const edgeLights = [
    new THREE.PointLight(0xffffff, 0.44, 14, 2.1),
    new THREE.PointLight(0xffffff, 0.44, 14, 2.1),
    new THREE.PointLight(0xffffff, 0.44, 14, 2.1),
    new THREE.PointLight(0xffffff, 0.44, 14, 2.1),
  ];
  edgeLights[0].position.set(-9, 2.2, -6);
  edgeLights[1].position.set(9, 2.2, -6);
  edgeLights[2].position.set(-9, 2.2, 6);
  edgeLights[3].position.set(9, 2.2, 6);
  edgeLights.forEach((light) => scene.add(light));

  const root = new THREE.Group();
  scene.add(root);

  const loader = new GLTFLoader();
  const modelTemplateCache = new Map();
  const modelTemplatePromiseCache = new Map();
  const preloadTimers = new Set();
  const preloadQueue = [];
  const queuedPreloadUrls = new Set();
  let preloadInFlight = false;
  let activeCarObject = null;
  let loadToken = 0;
  let immersiveMode = false;
  let activeCarMeta = null;
  let cameraTween = null;
  let placeholderTimer = null;

  function createProceduralCar(colorHex) {
    const group = new THREE.Group();

    const body = new THREE.Mesh(
      new THREE.BoxGeometry(4.2, 0.85, 1.9, 4, 2, 2),
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(colorHex),
        metalness: 0.86,
        roughness: 0.22,
        clearcoat: 1,
        clearcoatRoughness: 0.13,
      }),
    );
    body.position.y = 0.1;
    group.add(body);

    const hood = new THREE.Mesh(
      new THREE.BoxGeometry(1.4, 0.36, 1.9, 2, 1, 1),
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(colorHex),
        metalness: 0.84,
        roughness: 0.21,
      }),
    );
    hood.position.set(1.45, 0.36, 0);
    group.add(hood);

    const cabin = new THREE.Mesh(
      new THREE.BoxGeometry(1.7, 0.66, 1.5, 3, 2, 2),
      new THREE.MeshPhysicalMaterial({
        color: 0x1f2228,
        metalness: 0.4,
        roughness: 0.08,
        transmission: 0.4,
        transparent: true,
        opacity: 0.9,
      }),
    );
    cabin.position.set(-0.2, 0.73, 0);
    group.add(cabin);

    for (const x of [-1.45, 1.45]) {
      for (const z of [-0.9, 0.9]) {
        const wheel = new THREE.Mesh(
          new THREE.CylinderGeometry(0.42, 0.42, 0.38, 24),
          new THREE.MeshStandardMaterial({
            color: 0x141414,
            metalness: 0.2,
            roughness: 0.9,
          }),
        );
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(x, -0.35, z);
        group.add(wheel);
      }
    }

    const splitter = new THREE.Mesh(
      new THREE.BoxGeometry(0.95, 0.08, 1.88),
      new THREE.MeshStandardMaterial({
        color: 0x0a0a0a,
        metalness: 0.1,
        roughness: 0.95,
      }),
    );
    splitter.position.set(2.1, -0.2, 0);
    group.add(splitter);

    group.position.y = -0.08;
    return group;
  }

  function clearActiveCar() {
    if (!activeCarObject) {
      return;
    }
    root.remove(activeCarObject);
    activeCarObject = null;
  }

  function attachCar(obj) {
    clearActiveCar();
    activeCarObject = obj;
    root.add(activeCarObject);
    if (loadingEl) {
      loadingEl.textContent = "";
    }
  }

  function fallbackLoad(car) {
    const procedural = createProceduralCar(car.fallbackBodyColor || "#7f7f7f");
    attachCar(procedural);
  }

  function prepareModelTemplate(car) {
    if (!car?.modelUrl) {
      return Promise.reject(new Error("Missing model URL"));
    }

    const cached = modelTemplateCache.get(car.modelUrl);
    if (cached) {
      return Promise.resolve(cached);
    }

    const pending = modelTemplatePromiseCache.get(car.modelUrl);
    if (pending) {
      return pending;
    }

    const loadPromise = new Promise((resolve, reject) => {
      loader.load(
        car.modelUrl,
        (gltf) => {
          try {
            const template = gltf.scene;
            normalizeModel(template, car);
            template.traverse((child) => {
              if (child.isMesh) {
                child.castShadow = false;
                child.receiveShadow = false;
              }
            });
            modelTemplateCache.set(car.modelUrl, template);
            resolve(template);
          } catch (error) {
            reject(error);
          }
        },
        undefined,
        (error) => {
          reject(error);
        },
      );
    });

    modelTemplatePromiseCache.set(car.modelUrl, loadPromise);
    loadPromise.finally(() => {
      modelTemplatePromiseCache.delete(car.modelUrl);
    });
    return loadPromise;
  }

  function clonePreparedModel(template) {
    return template.clone(true);
  }

  function drainPreloadQueue() {
    while (!preloadInFlight && preloadQueue.length > 0) {
      const nextCar = preloadQueue.shift();
      if (!nextCar) {
        continue;
      }
      if (queuedPreloadUrls.has(nextCar.modelUrl)) {
        continue;
      }
      queuedPreloadUrls.add(nextCar.modelUrl);
      preloadInFlight = true;
      prepareModelTemplate(nextCar)
        .catch(() => { })
        .finally(() => {
          preloadInFlight = false;
          if (preloadQueue.length > 0) {
            requestAnimationFrame(drainPreloadQueue);
          }
        });
    }
  }

  function enqueueCarPreload(car, priority = false) {
    if (!car?.modelUrl) {
      return;
    }
    if (
      modelTemplateCache.has(car.modelUrl) ||
      modelTemplatePromiseCache.has(car.modelUrl) ||
      queuedPreloadUrls.has(car.modelUrl)
    ) {
      return;
    }
    if (priority) {
      preloadQueue.unshift(car);
    } else {
      preloadQueue.push(car);
    }
    queuedPreloadUrls.add(car.modelUrl);
    drainPreloadQueue();
  }

  function prioritizeCarPreload(car) {
    if (!car?.modelUrl) {
      return;
    }
    if (
      modelTemplateCache.has(car.modelUrl) ||
      modelTemplatePromiseCache.has(car.modelUrl)
    ) {
      return;
    }
    const queuedIndex = preloadQueue.findIndex(
      (entry) => entry.modelUrl === car.modelUrl,
    );
    if (queuedIndex > 0) {
      const [entry] = preloadQueue.splice(queuedIndex, 1);
      preloadQueue.unshift(entry);
      return;
    }
    if (queuedIndex === 0) {
      return;
    }
    enqueueCarPreload(car, true);
  }

  function loadCar(car) {
    activeCarMeta = car;
    const token = ++loadToken;

    clearActiveCar();

    if (placeholderTimer) {
      window.clearTimeout(placeholderTimer);
      placeholderTimer = null;
    }

    if (stageScene) {
      stageScene.classList.add("model-loading-soft");
      stageScene.classList.remove("model-reveal");
    }

    if (loadingEl) {
      loadingEl.textContent = `Loading ${car.name}...`;
    }

    const cachedTemplate = modelTemplateCache.get(car.modelUrl);
    if (cachedTemplate) {
      attachCar(clonePreparedModel(cachedTemplate));
      if (immersiveMode) {
        fitImmersiveCamera(car);
      }
      if (stageScene) {
        stageScene.classList.remove("model-loading-soft");
        stageScene.classList.add("model-reveal");
        placeholderTimer = window.setTimeout(
          () => stageScene.classList.remove("model-reveal"),
          360,
        );
      }
      onModelLoaded?.();
      return;
    }

    prepareModelTemplate(car)
      .then((template) => {
        if (token !== loadToken) {
          return;
        }
        attachCar(clonePreparedModel(template));
        if (immersiveMode) {
          fitImmersiveCamera(car);
        }
        if (stageScene) {
          stageScene.classList.remove("model-loading-soft");
          stageScene.classList.add("model-reveal");
          placeholderTimer = window.setTimeout(
            () => stageScene.classList.remove("model-reveal"),
            360,
          );
        }
        onModelLoaded?.();
      })
      .catch((error) => {
        if (token !== loadToken) {
          return;
        }
        attachCar(createProceduralCar(car.fallbackBodyColor || "#7f7f7f"));
        if (immersiveMode) {
          fitImmersiveCamera(car);
        }
        if (stageScene) {
          stageScene.classList.remove("model-loading-soft");
        }
        onModelFallback?.();
        if (loadingEl) {
          const reason =
            error instanceof Error
              ? error.message
              : String(error || "Unknown loader error");
          loadingEl.textContent = `3D load failed (${reason}). Showing fallback body.`;
        }
        console.error(`Failed to load ${car.modelUrl}:`, error);
      });
  }

  function scheduleModelWarmup() {
    enqueueCarPreload(state.selectedCar, true);
    cars.forEach((car, index) => {
      if (car.id === state.selectedCar.id) {
        return;
      }
      enqueueCarPreload(car, false);
    });
  }

  function preloadCar(carRef, options = {}) {
    const priority = options.priority !== false;
    const car =
      typeof carRef === "string"
        ? cars.find((entry) => entry.id === carRef)
        : carRef;
    if (!car) {
      return;
    }
    if (priority) {
      prioritizeCarPreload(car);
      return;
    }
    enqueueCarPreload(car, false);
  }

  function normalizeModel(model, car) {
    const baseBox = getRenderableBounds(model);
    if (baseBox.isEmpty()) {
      return;
    }

    const baseCenter = baseBox.getCenter(new THREE.Vector3());
    model.position.sub(baseCenter);

    const recenteredBox = getRenderableBounds(model);
    const baseSize = recenteredBox.getSize(new THREE.Vector3());
    const maxDim = Math.max(baseSize.x, baseSize.y, baseSize.z) || 1;
    const targetSize = car.modelTargetSize || 4.3;
    const scaleFactor = (targetSize / maxDim) * (car.modelScale || 1);
    model.scale.setScalar(scaleFactor);

    model.rotation.y = car.modelRotationY || 0;

    const adjustedBox = getRenderableBounds(model);
    const minY = adjustedBox.min.y;
    model.position.y += -0.8 - minY + (car.modelYOffset || 0);
  }

  function getRenderableBounds(model) {
    const meshEntries = [];
    model.updateMatrixWorld(true);

    model.traverse((child) => {
      if (!child?.isMesh || !child.geometry) {
        return;
      }
      if (!child.geometry.boundingBox) {
        child.geometry.computeBoundingBox();
      }
      const localBounds = child.geometry.boundingBox;
      if (!localBounds || localBounds.isEmpty()) {
        return;
      }
      const worldBounds = localBounds.clone().applyMatrix4(child.matrixWorld);
      if (worldBounds.isEmpty()) {
        return;
      }
      const size = worldBounds.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const center = worldBounds.getCenter(new THREE.Vector3());
      meshEntries.push({ box: worldBounds, maxDim, center });
    });

    if (meshEntries.length === 0) {
      return new THREE.Box3().setFromObject(model);
    }

    const sortedDims = meshEntries
      .map((entry) => entry.maxDim)
      .sort((a, b) => a - b);
    const medianDim =
      sortedDims[Math.floor(sortedDims.length / 2)] || sortedDims[0] || 1;
    const outlierThreshold = medianDim * 6;
    const dimensionFiltered = meshEntries.filter(
      (entry) => entry.maxDim <= outlierThreshold,
    );
    const primary =
      dimensionFiltered.length > 0 ? dimensionFiltered : meshEntries;

    const medianCenter = primary
      .map((entry) => entry.center)
      .sort((a, b) => a.x - b.x)
    [Math.floor(primary.length / 2)].clone();
    medianCenter.y = primary
      .map((entry) => entry.center)
      .sort((a, b) => a.y - b.y)[Math.floor(primary.length / 2)].y;
    medianCenter.z = primary
      .map((entry) => entry.center)
      .sort((a, b) => a.z - b.z)[Math.floor(primary.length / 2)].z;

    const centerDistances = primary
      .map((entry) => entry.center.distanceTo(medianCenter))
      .sort((a, b) => a - b);
    const medianDistance =
      centerDistances[Math.floor(centerDistances.length / 2)] || 0;
    const spatialThreshold = Math.max(medianDistance * 4, medianDim * 1.5);
    const spatiallyFiltered = primary.filter(
      (entry) => entry.center.distanceTo(medianCenter) <= spatialThreshold,
    );
    const selected = spatiallyFiltered.length > 0 ? spatiallyFiltered : primary;

    const union = new THREE.Box3();
    selected.forEach((entry) => union.union(entry.box));
    return union;
  }

  function animateCameraPose(nextPosition, nextTarget, duration = 620) {
    if (cameraTween) {
      cancelAnimationFrame(cameraTween);
      cameraTween = null;
    }
    const startPos = camera.position.clone();
    const startTarget = controls.target.clone();
    const startTime = performance.now();

    const step = (now) => {
      const t = clamp((now - startTime) / duration, 0, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      camera.position.lerpVectors(startPos, nextPosition, eased);
      controls.target.lerpVectors(startTarget, nextTarget, eased);
      controls.update();
      if (t < 1) {
        cameraTween = requestAnimationFrame(step);
      } else {
        cameraTween = null;
      }
    };
    cameraTween = requestAnimationFrame(step);
  }

  function fitImmersiveCamera(car) {
    if (!activeCarObject) {
      return;
    }
    const bounds = getRenderableBounds(activeCarObject);
    if (bounds.isEmpty()) {
      return;
    }
    const size = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());
    const verticalFov = THREE.MathUtils.degToRad(camera.fov);
    const fitHeightDistance =
      size.y / Math.max(2 * Math.tan(verticalFov / 2), 0.001);
    const fitWidthDistance =
      size.x /
      Math.max(2 * Math.tan(verticalFov / 2), 0.001) /
      Math.max(camera.aspect, 0.5);
    const baseDistance = Math.max(
      fitHeightDistance,
      fitWidthDistance,
      size.z * 0.95,
    );
    const framingPadding = car?.immersivePadding || 1.45;
    const distance = clamp(baseDistance * framingPadding, 2.8, 10.8);
    const target = new THREE.Vector3(
      center.x,
      center.y + size.y * 0.06,
      center.z,
    );
    const position = new THREE.Vector3(
      center.x + distance * 0.24,
      center.y + Math.max(size.y * 0.3, 0.95),
      center.z + distance,
    );
    controls.minDistance = clamp(distance * 0.48, 1.9, 7);
    controls.maxDistance = clamp(distance * 2.5, 6.5, 18);
    animateCameraPose(position, target, 640);
  }

  function setBodyColor(color) {
    if (!activeCarObject) {
      return;
    }
    const bodyColor = new THREE.Color(color);
    activeCarObject.traverse((child) => {
      if (!child.isMesh || !child.material) {
        return;
      }
      if (!Array.isArray(child.material)) {
        if (child.material.color && child.material.metalness !== undefined) {
          child.material.color.lerp(bodyColor, 0.45);
          child.material.needsUpdate = true;
        }
      }
    });
  }

  function update(progress) {
    if (immersiveMode) {
      ring.visible = false;
      floor.visible = false;
      return;
    }

    ring.visible = true;
    floor.visible = true;
    const exteriorPhase = clamp(progress / 0.72, 0, 1);
    const theta = exteriorPhase * Math.PI * 2;
    const exteriorRadius = 7.1;

    const exteriorPos = new THREE.Vector3(
      Math.sin(theta) * exteriorRadius,
      2.2 + Math.sin(theta * 0.4) * 0.25,
      Math.cos(theta) * exteriorRadius,
    );
    const interiorStart = new THREE.Vector3(0.9, 1.45, 2.2);
    const interiorEnd = new THREE.Vector3(0.18, 1.08, 0.42);
    const tInterior = clamp((progress - 0.72) / 0.28, 0, 1);

    camera.position.copy(exteriorPos);
    if (tInterior > 0) {
      camera.position.lerpVectors(interiorStart, interiorEnd, tInterior);
    }

    const lookAtExterior = new THREE.Vector3(0, 0.4, 0);
    const lookAtInterior = new THREE.Vector3(2.2, 1, 0.05);
    const lookAt = lookAtExterior.clone().lerp(lookAtInterior, tInterior);
    camera.lookAt(lookAt);

    root.rotation.y = Math.sin(progress * Math.PI) * 0.08;
    ring.material.opacity = 0.08 + progress * 0.14;
  }

  function resize() {
    const width = mount.clientWidth;
    const height = mount.clientHeight;
    camera.aspect = width / Math.max(height, 1);
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  window.addEventListener("resize", resize);

  function setImmersiveMode(enabled) {
    immersiveMode = enabled;
    controls.enabled = enabled;
    controls.autoRotate = enabled;
    if (enabled) {
      controls.autoRotateSpeed = 1;
      ring.visible = false;
      floor.visible = false;
      if (activeCarObject) {
        fitImmersiveCamera(activeCarMeta);
      } else {
        animateCameraPose(
          new THREE.Vector3(0, 1.45, 4.15),
          new THREE.Vector3(0, 0.45, 0),
          520,
        );
        controls.minDistance = 2.2;
        controls.maxDistance = 12;
      }
    } else {
      animateCameraPose(
        new THREE.Vector3(0, 2.2, 8.2),
        new THREE.Vector3(0, 0.4, 0),
        520,
      );
      controls.minDistance = 2.2;
      controls.maxDistance = 12;
      controls.autoRotateSpeed = 1;
      ring.visible = true;
      floor.visible = true;
    }
    controls.update();
    resize();
  }

  let renderLoopId = null;

  function shouldRenderThree() {
    return (
      state.activePage === "carShowcase" &&
      document.visibilityState === "visible"
    );
  }

  function animate() {
    if (!renderer.domElement.isConnected) {
      renderLoopId = null;
      return;
    }
    if (!shouldRenderThree()) {
      renderLoopId = null;
      return;
    }
    const elapsed = clock.getElapsedTime();
    sweepLight.position.x = Math.sin(elapsed * 0.32) * 7.6;
    sweepLight.position.z = Math.cos(elapsed * 0.32) * 7.6;
    sweepLight.position.y = 6.5 + Math.sin(elapsed * 0.7) * 0.28;
    sweepLight.target.position.y = 0.5 + Math.sin(elapsed * 0.9) * 0.06;
    blueWash.intensity = 0.55 + Math.sin(elapsed * 0.8) * 0.08;
    amberWash.intensity = 0.5 + Math.cos(elapsed * 0.75) * 0.08;
    lampLight.intensity = 1.05 + Math.sin(elapsed * 0.6) * 0.08;
    if (ceilingLamp.material) {
      ceilingLamp.material.opacity = 0.58 + Math.sin(elapsed * 0.7) * 0.06;
    }
    roofStrips.forEach((mat, idx) => {
      mat.opacity = 0.24 + Math.sin(elapsed * 0.95 + idx * 0.6) * 0.08;
    });
    edgeLights.forEach((light, index) => {
      light.intensity = 0.26 + Math.sin(elapsed * 0.9 + index) * 0.06;
    });
    bayFloorMaterial.metalness = 0.64 + Math.sin(elapsed * 0.4) * 0.03;
    bayFloorMaterial.roughness = 0.26 + Math.sin(elapsed * 0.5) * 0.015;
    roomMaterial.emissive.setHex(0x111823);
    roomMaterial.emissiveIntensity = 0.08 + Math.sin(elapsed * 0.5) * 0.02;
    lightPanels.forEach((mat, index) => {
      mat.opacity = 0.18 + Math.sin(elapsed * 0.9 + index * 0.5) * 0.06;
    });
    controls.update();
    renderer.render(scene, camera);
    renderLoopId = requestAnimationFrame(animate);
  }

  function startRenderLoop() {
    if (renderLoopId != null) {
      return;
    }
    resize();
    renderLoopId = requestAnimationFrame(animate);
  }

  function stopRenderLoop() {
    if (renderLoopId != null) {
      cancelAnimationFrame(renderLoopId);
      renderLoopId = null;
    }
  }

  return {
    loadCar,
    preloadCar,
    setBodyColor,
    update,
    setImmersiveMode,
    resize,
    startRenderLoop,
    stopRenderLoop,
  };
}

function createAudioSuite() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  const audioContext = new AudioContextClass();
  const master = audioContext.createGain();
  master.gain.value = 0.19;
  master.connect(audioContext.destination);

  const ambientOsc = audioContext.createOscillator();
  ambientOsc.type = "sine";
  ambientOsc.frequency.value = 63;

  const ambientOsc2 = audioContext.createOscillator();
  ambientOsc2.type = "triangle";
  ambientOsc2.frequency.value = 93;

  const ambientGain = audioContext.createGain();
  ambientGain.gain.value = 0;
  ambientOsc.connect(ambientGain);
  ambientOsc2.connect(ambientGain);
  ambientGain.connect(master);
  ambientOsc.start();
  ambientOsc2.start();

  let ambientOn = false;

  function startAmbient() {
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }
    if (ambientOn) {
      return;
    }
    ambientOn = true;
    const now = audioContext.currentTime;
    ambientGain.gain.cancelScheduledValues(now);
    ambientGain.gain.setValueAtTime(0, now);
    ambientGain.gain.linearRampToValueAtTime(0.08, now + 1.1);
  }

  function stopAmbient() {
    ambientOn = false;
    const now = audioContext.currentTime;
    ambientGain.gain.cancelScheduledValues(now);
    ambientGain.gain.setValueAtTime(ambientGain.gain.value, now);
    ambientGain.gain.linearRampToValueAtTime(0, now + 0.5);
  }

  function beep(freq = 300, duration = 0.1) {
    const oscillator = audioContext.createOscillator();
    oscillator.type = "triangle";
    oscillator.frequency.value = freq;
    const gain = audioContext.createGain();
    gain.gain.value = 0;
    oscillator.connect(gain);
    gain.connect(master);
    const now = audioContext.currentTime;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.07, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    oscillator.start(now);
    oscillator.stop(now + duration + 0.02);
  }

  function engineSweep(length = 0.2) {
    const oscillator = audioContext.createOscillator();
    oscillator.type = "sawtooth";
    oscillator.frequency.setValueAtTime(90, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
      260,
      audioContext.currentTime + length,
    );
    const gain = audioContext.createGain();
    gain.gain.value = 0.0001;
    oscillator.connect(gain);
    gain.connect(master);
    const now = audioContext.currentTime;
    gain.gain.exponentialRampToValueAtTime(0.06, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + length);
    oscillator.start(now);
    oscillator.stop(now + length + 0.03);
  }

  function engineIgnition(profile = { base: 65, peak: 150 }) {
    const now = audioContext.currentTime;
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = "sawtooth";
    oscillator.frequency.setValueAtTime(profile.base, now);
    oscillator.frequency.exponentialRampToValueAtTime(profile.peak, now + 0.28);
    oscillator.frequency.exponentialRampToValueAtTime(
      Math.max(profile.base + 30, 90),
      now + 1.2,
    );
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.22, now + 0.06);
    gain.gain.exponentialRampToValueAtTime(0.05, now + 1.2);
    oscillator.connect(gain);
    gain.connect(master);
    oscillator.start(now);
    oscillator.stop(now + 1.3);
  }

  return {
    startAmbient,
    stopAmbient,
    beep,
    engineSweep,
    engineIgnition,
  };
}

// ===== STARTUP =====
// Run immediately when script loads
(function startup() {
  try {
    app.classList.remove("hidden");
  } catch (e) { }
  try {
    renderCars();
  } catch (e) { }
  try {
    fillCarSelect();
  } catch (e) { }
  try {
    bindEvents();
  } catch (e) { }
  try {
    setActivePage("landing");
    initLandingExperience();
  } catch (e) { }

  // Initialize 3D stage for car showcase
  try {
    initThreeStage().then(() => {
      if (state.threeReady && state.three) {
        // Preload all car models in background
        enqueueCarPreload(state.selectedCar, true);
        cars.forEach((car) => {
          if (car.id !== state.selectedCar.id) {
            enqueueCarPreload(car, false);
          }
        });
      }
    });
  } catch (e) { }

  // Showroom filter functionality
  try {
    const filterPills = document.querySelectorAll(".filter-pill");
    const carCards = document.querySelectorAll(".car-grid .car-card");

    filterPills.forEach((pill) => {
      pill.addEventListener("click", () => {
        // Update active state
        filterPills.forEach((p) => p.classList.remove("active"));
        pill.classList.add("active");

        const filter = pill.dataset.filter;

        // Filter cards
        carCards.forEach((card, index) => {
          const car = cars[index];
          let shouldShow = false;

          if (filter === "all") {
            shouldShow = true;
          } else if (
            filter === "hypercar" &&
            (car.vehicleClass?.toLowerCase().includes("hypercar") ||
              car.id === "onepro" ||
              car.id === "bolide2024")
          ) {
            shouldShow = true;
          } else if (
            filter === "grandtourer" &&
            (car.vehicleClass?.toLowerCase().includes("grand tourer") ||
              car.id === "phantom")
          ) {
            shouldShow = true;
          } else if (
            filter === "suv" &&
            (car.vehicleClass?.toLowerCase().includes("suv") ||
              car.id === "venatuss900")
          ) {
            shouldShow = true;
          } else if (
            filter === "limited" &&
            (car.enhancementLevel?.toLowerCase().includes("limited") ||
              car.id === "p9lm900" ||
              car.id === "carbonadox")
          ) {
            shouldShow = true;
          }

          card.style.display = shouldShow ? "block" : "none";
        });
      });
    });

    // Navbar scroll effect
    const navbar = document.querySelector(".showroom-navbar");
    if (navbar) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 10) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }
      });
    }

    // Back to landing page buttons
    document
      .querySelectorAll(".back-to-landing-btn, .back-to-landing-footer-btn")
      .forEach((btn) => {
        btn.addEventListener("click", () => {
          setActivePage("landing");
          initLandingExperience();
        });
      });
  } catch (e) { }
})();








