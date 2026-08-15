# Shadow Simulation

## Objective

Quantify how much of the agricultural ground is shaded at each time of day and how many cumulative shadow-hours each square metre receives under the periodic D11/S12 network.

## Reference geometry

- latitude reference: 33.51° N;
- canopy diameter: 11 m;
- canopy-edge height: 5 m;
- apex height: 8 m;
- land-cell side: 12 m;
- periodic honeycomb network;
- evaluation zone located away from project boundaries.

## Method

Each solar tree is represented as a three-dimensional six-face pyramid. For each sampled time:

1. solar altitude and azimuth are calculated;
2. each canopy vertex and apex are projected onto the ground along the solar vector;
3. the convex shadow polygon is calculated;
4. all tree-shadow polygons are unioned over a central evaluation grid;
5. instantaneous shaded fraction is measured;
6. shadow exposure is integrated over the daylight period.

The periodic calculation avoids the edge bias created by simulating only one seven-tree cell.

## Current reference results

### Summer-solstice reference day

Approximate instantaneous shaded fraction in the central zone:

| Solar time | Shade |
|---|---:|
| 08:00 | 66.5% |
| 10:00 | 65.8% |
| 12:00 | 65.0% |
| 14:00 | 66.0% |
| 16:00 | 66.4% |
| 18:00 | 71.6% |

Mean shadow exposure:

- daylight: ~14.22 h;
- mean shadow: ~9.4 h/m²/day;
- ~100% of evaluated ground receives at least 4 h shade;
- ~95% receives at least 6 h;
- ~81% receives at least 8 h;
- ~38% receives at least 10 h.

### Winter-solstice reference day

- daylight: ~9.78 h;
- mean shadow: ~6.6 h/m²/day.

Low solar altitude produces longer shadows even though winter daylight is shorter.

## Interpretation

A 65% instantaneous shaded fraction does not mean the same 65% of land is permanently shaded. The shadow field moves continuously. The agricultural hypothesis is therefore based on dynamic shade: crops and soil may alternate between direct light and shade through the day.

## What the model does not yet include

- diffuse-sky radiation;
- cloud cover;
- terrain slope;
- canopy deformation;
- vegetation height;
- module transparency or gaps;
- local horizon obstruction;
- measured weather-year data;
- seasonal crop canopy interactions.

## Validation plan

The 31-tree pilot should instrument several representative ground points with:

- PAR sensors;
- pyranometers where justified;
- soil-temperature probes;
- air-temperature/humidity sensors;
- soil-moisture sensors.

Simulated shade-hours should then be compared with measured irradiance and crop response.

## Status

**Simulated / requires field validation.**
