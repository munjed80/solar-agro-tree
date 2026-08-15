# Showreel — Solar Agro Tree D11/S12 (Scientific Edition)

A cinematic, scientifically-grounded Three.js visualization of the Solar Agro Tree
D11/S12 agrivoltaic concept, suitable for government/investor presentation.

## Scientific basis

### Solar geometry (parity with `src/simulation/shadow_periodic.py`)

The sun position is computed each frame using the exact equations from
`src/simulation/shadow_periodic.py`:

```
solar_position(latitude_deg, solar_time_h, declination_deg)
sunrise_sunset(latitude_deg, declination_deg)
```

- **Latitude reference**: 33.51° N (same as `SHADOW_SIMULATION.md` and the Python default `33.5104`)
- **Summer solstice**: declination +23.44°, daylight ~14.22 h
- **Winter solstice**: declination −23.44°, daylight ~9.78 h

The animation runs from sunrise to sunset in real solar time.
Shadow direction and length are physically correct at every moment.

### Reference geometry (locked)

| Parameter | Value |
|---|---|
| Canopy diameter | 11 m (radius 5.5 m) |
| Canopy-edge height | 5 m |
| Apex height | 8 m |
| Hex land-cell side | 12 m |
| Tree density | ~80.2 trees/ha |
| Trees per km² | ≈ 8,019 |

A 10 m scale bar and an orange ~1.75 m human-scale reference figure are visible in the scene.

### Scientific HUD

A live HUD overlay shows:
- **Solar time** (HH:MM, driven by real sunrise/sunset)
- **Solar altitude** (degrees)
- **Season** (Summer / Winter)
- **Instantaneous shaded fraction** — calibrated to match `SHADOW_SIMULATION.md`:
  ≈66.5% @ 08:00, ≈65.8% @ 10:00, ≈65.0% @ 12:00, ≈66.0% @ 14:00, ≈66.4% @ 16:00, ≈71.6% @ 18:00

### Shadow heat map

The ground texture is a pre-computed shadow-hours heat map (integrated from the
sun path) consistent with `SHADOW_SIMULATION.md`:

| Shadow hours | Ground fraction |
|---|---|
| ≥ 10 h | ~38% |
| ≥ 8 h  | ~81% |
| ≥ 6 h  | ~95% |
| ≥ 4 h  | ~100% |

A colour legend is displayed on screen.

## Reference metrics displayed

| Metric | Value |
|---|---|
| Trees per km² | ≈ 8,019 |
| Total PV capacity | ≈ 147.5 MWp |
| Annual generation | 199–221 GWh |
| Summer shade fraction | ≈ 65% |

## Run locally

```bash
python -m http.server 8000
# open: http://localhost:8000/presentation/showreel/
```

## Controls

| Control | Action |
|---|---|
| **Pause / Play** | Toggle animation |
| **Restart** | Reset to start |
| **🌞 Summer / ❄️ Winter** | Toggle season (changes declination, day length, shadows) |
| **Record** | Record one full loop |
| `Space` | Play/Pause |
| `R` | Restart |
| `S` | Toggle season |

## Capture mode (deterministic, fixed 30 fps)

```
http://localhost:8000/presentation/showreel/?capture=1
```

## Recording to video

### In-browser recording

Click **Record** — a full loop (~96 s) is recorded and downloaded automatically.
The browser will attempt MP4 (`video/mp4;codecs=avc1`) first, falling back to WebM.
File name: `solar-agro-tree-showreel.mp4` or `.webm`

### Convert WebM → MP4 (FFmpeg, for iPhone compatibility)

```bash
ffmpeg -i solar-agro-tree-showreel.webm -c:v libx264 -pix_fmt yuv420p showreel.mp4
```

### Watch on mobile

1. Open the GitHub Pages URL on your phone's browser (Safari / Chrome).
2. The visualization runs live and is fully responsive (portrait + landscape).
3. For a saved video: record on a computer, convert to MP4, share via
   AirDrop / Google Drive / WhatsApp.
   Alternatively, use the phone's built-in screen recorder while viewing the
   GitHub Pages URL.

## GitHub Pages URL

```
https://munjed80.github.io/solar-agro-tree/presentation/showreel/
```

## Disclaimer

This is a conceptual simulation for communication and evidence framing.
Solar geometry equations are physically correct for lat 33.51° N;
all other outputs (shade fraction, energy yield, agricultural parameters)
are engineering estimates that **require field validation and specialist
design before any implementation decision**.

> **عرض محاكى · lat 33.51° N · يتطلب تحققًا ميدانيًا**
> Simulated · lat 33.51° N · requires field validation · not a construction drawing
