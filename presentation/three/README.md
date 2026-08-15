# Three.js Presentation Prototype

This folder contains the first 3D prototype for the Solar Agro Tree presentation.

## What it shows

- one central D11 solar tree;
- six surrounding trees forming the reference seven-tree hexagonal cell;
- 11 m six-face elevated canopy geometry;
- 5 m canopy edge and 8 m apex;
- 12 m center-to-corner land-cell radius;
- crop rows and agricultural ground;
- moving directional sunlight and visible sun path;
- four repeatable camera shots: Hero, Network, Top, and Orbit.

## Files

- `index.html` — canvas, HUD, controls, and Three.js import map.
- `styles.css` — presentation overlay and responsive layout.
- `scene.js` — geometry, lighting, camera animation, sun animation, and capture timeline.

## Three.js dependency

The prototype pins Three.js `0.184.0` through the import map in `index.html`.

The Three.js documentation recommends ES modules/import maps for browser-based projects and supports loading the module from a CDN for static deployments.

## Run locally

Do not open `index.html` directly with `file://`.

From the repository root, run for example:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/presentation/three/
```

It can also be hosted directly with GitHub Pages.

## Controls

- **Pause / Play** — stops or resumes the timeline.
- **Reset** — returns the current shot to time zero.
- **Camera** — selects the camera choreography.
- **Speed** — changes playback speed.
- Keyboard shortcuts: `1` Hero, `2` Network, `3` Top, `4` Orbit, `Space` Pause/Play.

## Capture mode

For a repeatable recording timeline, append:

```text
?capture=1
```

Example:

```text
http://localhost:8000/presentation/three/?capture=1
```

Capture mode uses a fixed 30 fps simulation time step and enables `preserveDrawingBuffer` on the WebGL renderer. This is intended to make browser/screen capture more repeatable.

A later production workflow may use Playwright/Puppeteer or an external screen recorder to capture the canvas and encode the result with FFmpeg to MP4. The current prototype deliberately does not bundle a video encoder into the browser scene.

## Important engineering note

This visualization communicates the current D11/S12 concept. It is **not a structural CAD model**. Column dimensions, rail sections, panel segmentation, foundations, wind design, and exact module arrangement remain subject to engineering validation.
