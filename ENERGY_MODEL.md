# Energy Model

## Purpose

Estimate the photovoltaic capacity and annual energy envelope of the D11/S12 reference design while clearly separating geometric calculations from assumptions that still require a professional PV yield model.

## Per-tree PV geometry

Reference inclined canopy area:

- total inclined surface: ~92.9 m²/tree;
- assumed usable PV coverage: 90%;
- usable PV surface: ~83.6 m²/tree.

Assuming a preliminary module power density of 220 Wp/m²:

- DC capacity per tree: ~18.4 kWp.

## 1 km² capacity

Reference tree count:

- ~8,019 trees/km².

Therefore preliminary installed DC capacity:

- ~147.5 MWp/km².

This is a nameplate DC capacity estimate, not annual generation.

## Orientation effect

The six faces point in different azimuth directions. The array therefore spreads production over the day but does not behave like a uniformly south-facing fixed-tilt plant. Faces with different azimuths should be modelled independently in the final yield study.

## Preliminary annual generation envelope

For concept-level planning only, the current model applies an effective annual specific-yield range of:

- 1,350–1,500 kWh/kWp/year.

This range is intended to account conservatively for orientation diversity, temperature, soiling, wiring, inverter losses, availability, and mutual shading before a detailed hourly model is completed.

Resulting preliminary annual generation:

- lower case: ~199 GWh/year;
- central planning case: ~210 GWh/year;
- upper case: ~221 GWh/year.

Average annual daily energy in the central case:

- ~575 MWh/day.

## Preliminary seasonal allocation

For early planning only:

| Season | Energy |
|---|---:|
| Winter | ~38 GWh |
| Spring | ~58 GWh |
| Summer | ~66 GWh |
| Autumn | ~48 GWh |
| Total | ~210 GWh |

These seasonal values are assumptions for system planning, not validated meteorological results.

## Final modelling requirements

A bankable model must use site coordinates and measured/validated meteorological data and should model:

- each canopy-face tilt and azimuth;
- horizon and terrain;
- near-shading;
- module temperature;
- soiling;
- mismatch;
- DC wiring;
- inverter efficiency;
- clipping;
- transformer and MV losses;
- availability and curtailment.

Tools such as PVsyst, SAM, or validated PVGIS-based workflows may be used depending on project stage.

## Energy-use hierarchy

Priority uses may include:

1. direct daytime water pumping;
2. water treatment;
3. irrigation pressure and controls;
4. cold storage;
5. agricultural processing;
6. project auxiliary loads;
7. battery charging for critical loads;
8. grid export where feasible.

Water storage should be considered as a major form of operational energy shifting: pump water during solar hours and store water rather than storing all electricity in batteries.

## Status

Capacity geometry: **calculated + assumptions.**  
Annual and seasonal generation: **preliminary / requires professional PV simulation.**
