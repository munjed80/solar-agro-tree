# Structural Precheck — D11 Solar Tree

## Purpose

This document performs an **early structural screening check** for the D11 solar-tree concept before detailed structural engineering and before expanding the cost model.

It answers one narrow question:

> Does an 11 m canopy at 5–8 m elevation create wind actions large enough to threaten the economic viability of the concept?

This is **not a code-compliant structural design** and must not be used to size final steel members, anchors, bolts, welds, or foundations.

The final design must be performed by a qualified structural engineer using the applicable Syrian/international loading, steel, foundation, seismic, fatigue, corrosion, and PV-module standards for the selected site.

---

## 1. Reference geometry

The current D11 geometry is taken from `TECHNICAL_SPECIFICATION.md`:

| Parameter | Value | Status |
|---|---:|---|
| Canopy tip-to-tip diameter | 11.0 m | Defined |
| Canopy circumradius | 5.5 m | Calculated |
| Canopy edge height | 5.0 m | Assumed design |
| Canopy apex height | 8.0 m | Assumed design |
| Vertical canopy rise | 3.0 m | Calculated |
| Reference column diameter | 0.60 m | Land-footprint assumption only |
| Plan area of regular hexagon | ~78.59 m² | Calculated |
| Inclined canopy surface | ~92.9 m² | Calculated |

The current geometry places a large elevated aerodynamic surface above a relatively narrow central support. Wind load is therefore treated as a first-order project risk.

---

## 2. Screening model

### 2.1 Dynamic pressure

The simplified velocity-pressure relationship used in this precheck is:

`q = 0.5 × rho × V²`

where:

- `q` = dynamic pressure in N/m²;
- `rho` = air density, default 1.225 kg/m³;
- `V` = trial wind speed in m/s.

This equation is basic fluid mechanics only. It does **not** include site-specific code factors such as terrain, gust, topography, importance, directionality, height exposure, aerodynamic zoning, or internal/external pressure combinations.

### 2.2 Trial wind speeds

The repository currently evaluates four screening speeds:

- 25 m/s;
- 35 m/s;
- 45 m/s;
- 55 m/s.

These are sensitivity cases only. The selected project site must later provide the actual code design wind basis.

---

## 3. Lateral projected area

For a first screening envelope, the lateral canopy projection is approximated by a bounding rectangle:

`canopy width × canopy rise = 11 × 3 = 33 m²`

The exposed column below the canopy is approximated as:

`0.60 × 5 = 3 m²`

Therefore the default effective lateral projected area used in the screening script is:

`A_lateral = 36 m²`

This is intentionally transparent and replaceable. It is not a CFD-derived aerodynamic area.

A default lateral force coefficient of:

`C_F = 1.30`

is used as a **sensitivity assumption**, not as a code coefficient.

The lateral wind resultant is estimated as:

`F_H = q × C_F × A_lateral`

---

## 4. Base overturning moment

The horizontal resultant is assumed to act at a default effective height of:

`h_cp = 6.5 m`

between the 5 m canopy edge and 8 m apex.

The corresponding base moment is:

`M_base = F_H × h_cp`

This is a deliberately simple global screening model. Detailed analysis must distribute pressure over all six faces and include torsion, connection eccentricity, dynamic response, and asymmetric load cases.

---

## 5. Uplift screening

A separate uplift/suction envelope is calculated using the full horizontal plan area of the canopy:

`A_plan ≈ 78.59 m²`

with a default sensitivity coefficient:

`C_U = 1.20`

Then:

`F_U = q × C_U × A_plan`

Again, `C_U` is not a code-prescribed value. It exists to expose sensitivity and force the project to confront uplift early.

---

## 6. Reference screening results

Using:

- `rho = 1.225 kg/m³`;
- `C_F = 1.30`;
- `A_lateral = 36 m²`;
- `h_cp = 6.5 m`;
- `C_U = 1.20`;
- `A_plan = 78.59 m²`;

the preliminary envelope is:

| Trial wind speed | Dynamic pressure | Horizontal force | Base moment | Uplift force |
|---:|---:|---:|---:|---:|
| 25 m/s | ~0.383 kPa | ~17.9 kN | ~116 kN·m | ~36 kN |
| 35 m/s | ~0.750 kPa | ~35.1 kN | ~228 kN·m | ~71 kN |
| 45 m/s | ~1.240 kPa | ~58.0 kN | ~377 kN·m | ~117 kN |
| 55 m/s | ~1.853 kPa | ~86.7 kN | ~564 kN·m | ~175 kN |

These values are not design loads. They are a screening signal.

---

## 7. Immediate engineering interpretation

The D11 geometry does **not** produce trivial wind actions.

At the 45 m/s screening case, one tree already develops approximately:

- 58 kN lateral resultant;
- 377 kN·m base overturning moment;
- 117 kN uplift envelope.

At 55 m/s, the simplified base moment rises above 560 kN·m.

Because wind action scales approximately with `V²`, relatively small increases in design wind speed can strongly increase structural and foundation cost.

This validates the project's current concern that **wind resistance may be the dominant structural/economic constraint**.

---

## 8. What this means for the foundation

The foundation must resist a combination of:

- overturning;
- uplift;
- horizontal shear;
- cyclic/reversing wind action;
- dead load;
- seismic demand where applicable.

A superficial foundation-size estimate is intentionally not published here because the required geometry depends strongly on:

- soil bearing capacity;
- foundation embedment;
- soil passive resistance;
- groundwater;
- uplift resistance;
- reinforced-concrete design;
- anchor layout;
- foundation self-weight;
- allowable rotation/deflection.

The prototype site must therefore have a basic geotechnical investigation before final foundation fabrication.

---

## 9. Structural variants that should be tested

The D11 fixed canopy should be treated as **Variant A**, not as an untouchable final solution.

### Variant A — Current fixed six-face canopy

Advantages:

- no moving parts;
- simple operating logic;
- continuous shade;
- visually coherent modular geometry.

Risk:

- high fixed wind exposure.

### Variant B — Aerodynamically vented canopy

Introduce controlled gaps between PV groups or between face zones.

Potential benefit:

- reduced pressure differential and uplift;
- lower steel/foundation demand.

Trade-off:

- lower PV coverage;
- changed shade distribution;
- more complex rainwater collection.

### Variant C — Segmented canopy

Divide each triangular face into structurally independent sub-panels with open pressure-relief gaps.

Potential benefit:

- reduced effective continuous sail area;
- easier replacement and transport.

### Variant D — Lower canopy

Test edge/apex heights below 5/8 m where agricultural machinery permits.

Potential benefit:

- lower overturning lever arm;
- reduced column mass.

Trade-off:

- reduced machinery clearance;
- changed microclimate and maintenance access.

### Variant E — Active/stowable geometry

A movable or stowable system may reduce extreme-wind exposure.

This is **not** the baseline design because motors, bearings, controls, failure modes, maintenance, and CAPEX may outweigh the structural savings.

---

## 10. Highest-value sensitivity variables

The structural-economic model should vary at minimum:

- canopy diameter: 8–12 m;
- canopy rise: 2–4 m;
- edge height: 3.5–5.5 m;
- lateral aerodynamic coefficient;
- uplift coefficient;
- design wind speed;
- percentage of open/vented canopy area;
- steel mass/tree;
- foundation cost/tree.

The goal is not simply to minimize steel. It is to maximize:

`agricultural shade value + PV value − structural/foundation cost`

---

## 11. Required next structural work

Before Phase 1 prototype fabrication:

1. obtain a site-specific design wind basis;
2. define applicable structural design standards;
3. build a 3D structural model;
4. apply pressure zones to the six canopy faces;
5. analyze asymmetric wind directions;
6. evaluate uplift and torsion;
7. size candidate mast concepts;
8. size radial/rim members;
9. design connections;
10. perform foundation/geotechnical design;
11. check deflection compatibility with PV modules;
12. check fatigue and repeated wind loading;
13. define corrosion-protection strategy;
14. derive kg steel/tree and m³ concrete/tree for `COST_MODEL.md`.

---

## 12. Decision gate

The project should not proceed directly from concept geometry to an 8,000-tree cost estimate.

The correct gate is:

> **If a structurally validated D11 tree cannot be fabricated, founded, erected, and maintained at an economically acceptable cost, the geometry must change before the 1 km² model is treated as the reference commercial design.**

The prototype is therefore not merely a demonstration object. It is the primary economic test of the project.

---

## 13. Reproducibility

The screening calculations are implemented in:

`src/calculations/wind_load_precheck.py`

All coefficients are exposed as command-line parameters so reviewers can replace the repository assumptions without editing the source code.
