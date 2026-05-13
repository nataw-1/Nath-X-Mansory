# Asset Setup

Drop your real files into these paths to enable full production media:

## 3D Models (`.glb`)
- `assets/models/phantom.glb`
- `assets/models/rolls_royce_cullinan.glb`
- `assets/models/urus.glb`
- `assets/models/sf90.glb`
- `assets/models/2020_ferrari_812_gts.glb`
- `assets/models/bentayga.glb`
- `assets/models/g63.glb`

## Audio (`.mp3`)
- `assets/audio/ambient.mp3` (looped showroom ambient track)
- `assets/audio/phantom-engine.mp3`
- `assets/audio/cullinan-engine.mp3`
- `assets/audio/urus-engine.mp3`
- `assets/audio/sf90-engine.mp3`
- `assets/audio/ferrari-812-stallone-engine.mp3`
- `assets/audio/bentayga-engine.mp3`
- `assets/audio/g63-engine.mp3`

If a file is missing, the site falls back automatically:
- Missing model: procedural cinematic car body is rendered in WebGL.
- Missing audio: synthetic Web Audio engine/ambient sounds are used.
