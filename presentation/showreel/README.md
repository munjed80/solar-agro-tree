# Showreel — Solar Agro Tree D11/S12

This page is a standalone cinematic visualization of the final-form Solar Agro Tree concept using Three.js.

## What it shows

- expanded hexagonal field of many D11/S12 solar trees;
- elevated six-face PV canopies (11 m diameter, 5 m edge, 8 m apex, 12 m hex-cell spacing);
- crop rows and soft shadows;
- animated dawn → noon → dusk sun and sky shift;
- timed camera sequence and bilingual metric cards.

## Run locally

From the repository root:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000/presentation/showreel/
```

## Controls

- **Play/Pause**
- **Restart**
- **Record** (records exactly one full loop)
- Keyboard: `Space` = Play/Pause, `R` = Restart

## Record a WebM

1. Open `http://localhost:8000/presentation/showreel/`
2. Click **Record**
3. Wait for one loop to finish; download starts automatically as:
   `solar-agro-tree-showreel.webm`

For deterministic capture timing, use:

```text
http://localhost:8000/presentation/showreel/?capture=1
```

## Optional MP4 conversion (FFmpeg)

```bash
ffmpeg -i solar-agro-tree-showreel.webm -c:v libx264 -pix_fmt yuv420p showreel.mp4
```

## Engineering note

This is a conceptual visualization for communication and evidence framing. It is not a construction drawing and not a structural CAD model.
