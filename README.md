# Solar Agro Tree

A modular agrivoltaic infrastructure concept for arid-land agriculture.

Solar Agro Tree combines elevated photovoltaic canopies, dynamic agricultural shading, water pumping, precision irrigation, and modular hexagonal planning in one repeatable system.

> **Project status:** Concept engineering / pre-feasibility. This repository contains calculated geometry, simulated shadow behavior, preliminary energy and water models, and a staged pilot plan. It is not yet a construction-ready design.

## Reference design: D11/S12 — 1 km²

| Parameter | Reference value | Status |
|---|---:|---|
| Project area | 1 km² / 100 ha | Defined |
| Canopy diameter | 11 m | Defined |
| Hexagonal land-cell side | 12 m | Defined |
| Canopy edge height | 5 m | Assumed design |
| Canopy apex height | 8 m | Assumed design |
| Tree density | ~80.2 trees/ha | Calculated |
| Trees per km² | ~8,019 | Calculated |
| Summer instantaneous shade | ~65–66% | Simulated |
| Mean summer shade | ~9.4 h/m²/day | Simulated |
| Mean winter shade | ~6.6 h/m²/day | Simulated |
| PV area per tree | ~83.6 m² | Calculated + assumed coverage |
| DC power per tree | ~18.4 kWp | Preliminary |
| Total DC capacity | ~147.5 MWp | Preliminary |
| Annual generation | ~199–221 GWh | Preliminary model |
| Practical agricultural target | ~90–94 ha | Planning assumption |

## Core objective

The primary objective is not to maximize electricity production alone. It is to create a productive agricultural microclimate over arid land while generating the electricity required for pumping, irrigation, water treatment, monitoring, cold storage, agricultural processing, and possible grid export.

## Integrated layers

1. **Shade** — reduce direct solar load on soil and crops.
2. **Energy** — generate electricity above the agricultural surface.
3. **Water** — power wells, pumping, storage, treatment, and drip irrigation.
4. **Agriculture** — preserve most of the ground for productive use.

## Repository structure

- `README_AR.md` — Arabic project introduction.
- `PROJECT_OVERVIEW.md` — complete project concept and system logic.
- `TECHNICAL_SPECIFICATION.md` — reference tree and network geometry.
- `AGRICULTURAL_MODEL.md` — crop, soil, and field-validation framework.
- `ENERGY_MODEL.md` — PV capacity and energy model.
- `WATER_MODEL.md` — pumping and irrigation-water model.
- `SHADOW_SIMULATION.md` — periodic shadow-model methodology and results.
- `COST_MODEL.md` — CAPEX/OPEX framework.
- `PILOT_PLAN.md` — staged prototype and pilot program.
- `RISKS_AND_LIMITATIONS.md` — engineering and resource risks.
- `GOVERNMENT_PROPOSAL_AR.md` — concise Arabic public-sector proposal.
- `data/` — reference assumptions and calculated parameters.
- `src/` — reproducible engineering calculations.

## Evidence classification

All quantitative statements should be treated as one of:

- **Defined** — selected design parameter.
- **Calculated** — direct geometric or physical result.
- **Simulated** — numerical model result.
- **Assumed** — planning assumption requiring verification.
- **Requires field validation** — cannot be confirmed without site work.

## Recommended development sequence

**Phase 1:** one full-scale solar-tree prototype.  
**Phase 2:** 31-tree / seven-hexagon pilot.  
**Phase 3:** approximately 10 ha agricultural demonstration.  
**Phase 4:** 1 km² deployment after measured technical, agricultural, hydrogeological, and economic validation.

## Critical validation before scale-up

- Hydrogeological survey and sustainable-yield assessment.
- Geotechnical investigation.
- Structural wind-load and fatigue analysis.
- Detailed PV yield and electrical design.
- Crop trials under dynamic shade.
- Prototype manufacturing cost.
- Grid-connection study.
- Environmental and water-resource approvals.

## Intellectual property

No open-source license is selected at this stage. Detailed construction drawings and proprietary engineering should not be published until the project owner chooses an intellectual-property and disclosure strategy.
