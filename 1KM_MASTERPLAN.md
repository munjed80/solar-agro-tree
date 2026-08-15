# 1 km² Master Plan — D11/S12

## Solar Agro Tree reference layout

**Document status:** Concept engineering / pre-feasibility  
**Reference area:** 1,000 m × 1,000 m = 1,000,000 m² = 100 ha  
**Reference geometry:** D11/S12  
**Purpose:** define a reviewable spatial framework for solar trees, agricultural blocks, roads, water storage, electrical stations, wells, and operational infrastructure.

> This is a **planning basis, not a construction drawing**. Tree count, road reservations, foundations, electrical blocks, reservoirs, wells, setbacks, and equipment footprints must be reconciled after topographic, geotechnical, hydrogeological, structural, agricultural, fire-safety, and grid studies.

---

## 1. Design principles

The master plan follows six rules:

1. Preserve the periodic D11/S12 solar-tree field over as much land as possible.
2. Keep most ground area available for agriculture.
3. Concentrate heavy infrastructure near the perimeter and selected service corridors.
4. Separate high-voltage/electrical service areas from normal agricultural operations.
5. Use sectorized water and electrical networks so one failure does not stop the full site.
6. Make every planning assumption explicit and replaceable after survey data become available.

---

## 2. Reference solar-tree geometry

### Individual tree

| Parameter | Reference value | Status |
|---|---:|---|
| Canopy diameter D | 11 m | Defined |
| Canopy radius | 5.5 m | Calculated |
| Canopy edge height | 5 m | Assumed design |
| Apex height | 8 m | Assumed design |
| Number of canopy faces | 6 | Defined |
| PV active area/tree | ~83.6 m² | Preliminary |
| DC capacity/tree | ~18.4 kWp | Preliminary |

### Periodic land cell

The reference ground cell is a regular hexagon with side:

`S = 12 m`

Its area is:

`A_hex = (3√3 / 2) × S² ≈ 374.1 m²`

A visual seven-tree cell contains one center tree and six corner trees. In a periodic network, each corner tree is shared by three adjacent cells, so the effective tree count per land cell is:

`1 + 6/3 = 3 trees`

The theoretical infinite-field density is therefore:

`3 / 374.1 × 10,000 ≈ 80.2 trees/ha`

or approximately:

`8,019 trees/km²`

### Important boundary condition

**8,019 is the theoretical periodic density applied to 1 km², not a surveyed construction count.** A finite 1,000 m × 1,000 m boundary will create edge effects. Roads, reservoirs, stations, setbacks, drainage, and excluded areas will also displace some tree positions.

Therefore this master plan uses:

- **8,019 trees as the gross reference design capacity**, and
- a **net installed tree count to be generated later by GIS/CAD clipping** after all infrastructure polygons and site setbacks are fixed.

No official proposal should claim exactly 8,019 constructed trees until that layout is generated.

---

## 3. Site coordinate system

For planning purposes only, define a local Cartesian coordinate system:

- southwest corner: `(0, 0)`
- southeast corner: `(1000, 0)`
- northwest corner: `(0, 1000)`
- northeast corner: `(1000, 1000)`

`X` increases eastward and `Y` increases northward.

Actual project coordinates shall use the approved national/site survey coordinate reference system.

---

## 4. Gross land allocation

The following allocation is a **reviewable planning assumption**, not a final land take.

| Use | Planning area | Share |
|---|---:|---:|
| Agricultural / solar-tree field | ~920,000 m² | ~92.0% |
| Internal roads and service corridors | ~40,000 m² | ~4.0% |
| Water reservoirs / treatment / pump areas | ~15,000 m² | ~1.5% |
| Electrical stations / main substation / BESS reserve | ~12,000 m² | ~1.2% |
| Operations, workshop, warehouse, security | ~5,000 m² | ~0.5% |
| Drainage, fire-water, landscape/setback contingency | ~8,000 m² | ~0.8% |
| **Total** | **1,000,000 m²** | **100%** |

This gives a target agricultural utilization of approximately **90–92 ha** after infrastructure reservations, consistent with the project's current 90–94 ha planning range.

The solar-tree canopy may overhang portions of agricultural/service space where structurally and operationally acceptable, so canopy coverage and land allocation must not be added as mutually exclusive areas.

---

## 5. Master-plan zoning

### Zone A — Solar-agricultural production field

Target gross area: **~92 ha**.

The D11/S12 lattice occupies the main interior. Crop rows, drip irrigation, sensors, and light agricultural machinery operate below and between trees.

The lattice should remain continuous across irrigation-sector boundaries wherever possible. Trees are removed only where required by:

- primary roads;
- electrical compounds;
- reservoirs;
- wellheads and sanitary protection areas;
- operations buildings;
- drainage infrastructure;
- fire and emergency access;
- final boundary/setback requirements.

### Zone B — Main utility spine

Reserve one **north–south central utility corridor** approximately 12 m wide, centered near `X = 500 m`.

Conceptual composition:

- 6 m primary all-weather road;
- buried medium-voltage route;
- fiber/communications duct;
- main irrigation header;
- drainage/service allowance.

The exact cross-section must be coordinated so electrical and water systems maintain required separation and safe access.

### Zone C — East–west service spine

Reserve a second 12 m corridor centered near `Y = 500 m`.

The two spines divide the site into four large operational quadrants and provide direct emergency/service access to the center.

Where the two corridors intersect, provide a controlled central service node rather than a large paved plaza.

### Zone D — Perimeter service route

Provide a nominal **6 m all-weather perimeter route** inside the property boundary, subject to final security and fire requirements.

Functions:

- emergency circulation;
- maintenance access;
- inspection;
- perimeter electrical/water routing where appropriate;
- access to reservoirs and electrical compounds.

A security fence, drainage strip, and legal setback may require additional width beyond the road itself.

---

## 6. Agricultural sectorization

Divide the productive field into **10 irrigation management sectors**, each targeting roughly 9–10 ha of net crop area after local infrastructure deductions.

Example IDs:

`AG-01` through `AG-10`

Each sector should have:

- isolation valve;
- flow meter;
- pressure sensor;
- soil-moisture monitoring stations;
- local irrigation manifold;
- fertigation connection where required;
- sector electrical/communications cabinet;
- mapped tree IDs and crop plots.

The ten-sector arrangement is intentionally operational rather than geometrically rigid. Final sector boundaries should follow hydraulic pressure zones, crop type, terrain, and access.

---

## 7. Roads and access

### 7.1 Main roads

Reference width: **6 m carriageway**.

Main roads:

- north–south central road;
- east–west central road;
- perimeter loop.

These roads must support:

- fire/emergency vehicles;
- agricultural trucks;
- crane/maintenance vehicles for tree structures;
- module replacement operations;
- transformer and pump maintenance.

### 7.2 Secondary agricultural access

Avoid paving a dense road grid.

Use compacted or stabilized 4 m service lanes only where necessary, preferably aligned with natural gaps in the tree lattice and irrigation-sector boundaries.

Target total road/service-corridor land take: **~4% of the site**, subject to turning-radius and fire-access review.

### 7.3 Main gate

Conceptual main gate: south boundary near the central utility spine.

Provide:

- security checkpoint;
- vehicle inspection space;
- visitor/maintenance parking outside the production field where possible.

A secondary emergency gate should be provided on the opposite or adjacent boundary after site-access study.

---

## 8. Water system master plan

Water infrastructure must be designed from sustainable water availability, **not from available solar power**.

### 8.1 Design irrigation demand

Current reference scenario:

- irrigated area: 100 ha gross benchmark;
- irrigation application: 5 mm/day.

Equivalent demand:

`100 ha × 50 m³/ha/day = 5,000 m³/day`

For a practical 90–92 ha crop area:

`≈4,500–4,600 m³/day`

This is an illustrative peak/reference irrigation requirement, not a final crop-water requirement.

### 8.2 Storage target

Adopt a preliminary **1.5-day operational storage target** for the practical field:

`4,600 × 1.5 ≈ 6,900 m³`

Round planning capacity:

**7,000–8,000 m³ total usable water storage.**

This is a planning assumption to be optimized after well yield, crop demand, treatment requirements, pumping schedule, fire reserve, and water quality are known.

### 8.3 Reservoir arrangement

Preferred concept: **two reservoirs rather than one**.

- `WT-01`: ~4,000 m³ usable
- `WT-02`: ~4,000 m³ usable

Advantages:

- maintenance without total loss of storage;
- separation of raw/treated water if required;
- operational redundancy;
- easier staged construction.

Conceptual location: north-west and north-east utility zones close to perimeter access, subject to topography.

Reservoir type is intentionally undefined at this stage: lined earth basin, reinforced-concrete tank, steel tank, or hybrid solution must be selected through cost, evaporation, water-quality, geotechnical, and maintenance studies.

### 8.4 Pump/treatment station

Reserve a water-treatment and pump compound of approximately **2,000–3,000 m²** adjacent to the primary storage system.

Possible systems:

- filtration;
- disinfection;
- fertigation;
- brackish-water treatment if required;
- booster pumps;
- instrumentation;
- chemical storage with containment.

### 8.5 Wells

**Do not assign a fixed number of wells in the master plan.**

Well count depends on sustainable tested yield.

For example only:

- required water = 4,600 m³/day;
- if one approved well sustainably supplies 500 m³/day;
- approximately 10 equivalent wells would be required before redundancy.

This example is not a site prediction.

Well locations must follow hydrogeological investigation and sanitary/protection requirements, not the visual symmetry of the hexagonal solar layout.

---

## 9. Electrical master plan

The gross reference PV capacity is approximately:

`8,019 trees × 18.4 kWp/tree ≈ 147.5 MWp DC`

This is a **gross theoretical reference**. Net capacity falls if tree positions are removed for infrastructure or if PV coverage per canopy is reduced.

### 9.1 Electrical blocks

Use **10 conceptual electrical collection blocks**, approximately aligned with operational/agricultural sectors where practical.

Reference gross capacity per block:

`~14–15 MWp DC`

Actual block size shall be optimized for inverter topology, voltage, cable losses, protection, maintenance, and equipment availability.

### 9.2 Distributed inverter/transformer stations

Reserve approximately **10 distributed electrical stations**, IDs:

`ES-01` through `ES-10`

Conceptual compound allowance:

`~20 m × 25 m = 500 m² each`

Total planning allowance:

`~5,000 m²`

The stations should be placed adjacent to primary/secondary service corridors to avoid heavy-equipment traffic through crop areas.

### 9.3 Main substation

Reserve approximately **5,000–7,000 m²** near the site boundary closest to the eventual grid point of connection.

Conceptual location for this neutral master plan: south-east utility zone.

Final location depends on:

- grid connection voltage;
- transmission route;
- utility requirements;
- transformer size;
- protection;
- fire separation;
- future expansion.

### 9.4 Battery energy storage reserve

Do **not** install batteries inside each solar-tree column as the reference architecture.

Reserve a controlled BESS area near the main electrical compound if storage is economically justified.

The master plan reserves approximately **3,000–5,000 m²** for future storage, but no MWh rating is defined yet.

Water storage and daytime pumping should be evaluated before purchasing large electrochemical storage capacity.

---

## 10. Operations and maintenance area

Reserve approximately **5,000 m²** near the main southern entrance for:

- control room;
- operations office;
- workshop;
- spare PV modules;
- spare structural parts;
- irrigation parts;
- maintenance vehicles;
- PPE and safety equipment;
- small laboratory / water-quality testing area;
- staff facilities.

Heavy storage should remain near the gate to minimize truck movement through agricultural sectors.

---

## 11. Drainage and stormwater

The solar canopies change the spatial distribution of rainfall reaching the ground. The project therefore needs a drainage model even in an arid environment.

Design tasks include:

- canopy runoff collection versus direct discharge;
- erosion at canopy drip lines;
- road drainage;
- flash-flood routing;
- reservoir overflow;
- infiltration/recharge opportunities;
- protection of electrical compounds.

Reserve **~0.8% of gross site area** as an initial combined allowance for drainage, fire-water, setbacks, and unallocated safety infrastructure. This allowance must be recalculated after hydrological study.

---

## 12. Tree placement around infrastructure

The periodic D11/S12 grid should be generated computationally over the full site and then clipped against exclusion polygons.

Recommended GIS/CAD sequence:

1. Generate infinite D11/S12 periodic tree coordinates.
2. Clip to the surveyed property polygon.
3. Apply boundary setback.
4. Remove trees conflicting with main roads.
5. Remove trees conflicting with reservoirs and water compounds.
6. Remove trees conflicting with electrical compounds and safety clearances.
7. Remove trees conflicting with buildings, wells, drainage, and fire routes.
8. Recalculate exact installed tree count.
9. Recalculate DC capacity and shade map using the final coordinates.
10. Optimize local tree relocations only if they preserve structural, agricultural, and shading constraints.

This process prevents the false precision of claiming 8,019 installed trees before the infrastructure layout is finalized.

---

## 13. Indicative spatial arrangement

Not to scale:

```text
NORTH
┌──────────────────────────────────────────────────────────────┐
│ Perimeter service road / drainage / security                │
│                                                              │
│ [WT-01]      AGRICULTURAL + SOLAR TREE FIELD       [WT-02]  │
│ Water         AG-01 ... AG-05                     Water      │
│                                                              │
│ ES nodes   · · · D11/S12 periodic field · · ·     ES nodes │
│                                                              │
│================ EAST–WEST SERVICE SPINE ====================│
│                         │                                    │
│                         │                                    │
│                 NORTH–SOUTH SPINE                            │
│                         │                                    │
│ ES nodes   · · · D11/S12 periodic field · · ·     ES nodes │
│            AG-06 ... AG-10                                  │
│                                                              │
│ [O&M / Gate]                                 [MAIN SUBSTATION]│
│ Perimeter service road / drainage / security                │
└──────────────────────────────────────────────────────────────┘
SOUTH
```

This diagram communicates functional zoning only. It does not establish construction coordinates.

---

## 14. Preliminary infrastructure schedule

| Asset | Reference quantity | Status |
|---|---:|---|
| Gross reference solar trees | 8,019 | Calculated periodic density |
| Net installed trees | TBD | Requires GIS/CAD clipping |
| Irrigation sectors | 10 | Planning assumption |
| Electrical collection blocks | 10 | Planning assumption |
| Distributed electrical stations | ~10 | Planning assumption |
| Main substation | 1 | Required if utility-scale grid export proceeds |
| Water reservoirs | 2 | Planning assumption |
| Total usable water storage | 7,000–8,000 m³ | Preliminary |
| Main O&M compound | 1 | Planning assumption |
| Main gate | 1 | Planning assumption |
| Emergency gate | ≥1 | Requires safety/access design |
| Wells | TBD | Hydrogeology dependent |
| Central utility spines | 2 | Planning assumption |
| Perimeter service loop | 1 | Planning assumption |

---

## 15. Preliminary land-use performance

The current planning target is:

- gross project land: **100 ha**;
- agricultural/solar production field: **~92 ha**;
- practical crop area: **~90–92 ha** depending on local equipment and access;
- non-agricultural infrastructure: **~8–10 ha maximum planning envelope**.

This is more conservative than counting only column footprints. It recognizes that a real utility-scale agro-energy project requires roads, reservoirs, substations, safety clearances, drainage, and maintenance infrastructure.

---

## 16. Reviewable engineering assumptions

The following values are deliberately exposed for review:

| Assumption | Current value | Required validation |
|---|---:|---|
| D11 canopy diameter | 11 m | Prototype/agronomic optimization |
| S12 land-cell side | 12 m | Shadow/crop/maintenance optimization |
| Canopy edge height | 5 m | Machinery + structural review |
| Apex height | 8 m | Structural/wind review |
| Gross tree density | 80.2/ha | Geometry |
| Main road width | 6 m | Traffic/fire review |
| Utility spine reservation | 12 m | Detailed utility coordination |
| Crop area target | 90–92 ha | Final CAD/GIS layout |
| Irrigation sectors | 10 | Hydraulic/crop design |
| Reference irrigation | 5 mm/day | Crop + climate field data |
| Water storage | 7,000–8,000 m³ | Hydraulic reliability study |
| Electrical blocks | 10 | Detailed electrical design |
| Distributed station footprint | 500 m² | Vendor/electrical design |
| Main substation allowance | 5,000–7,000 m² | Grid utility study |
| BESS reserve | 3,000–5,000 m² | Economic/storage study |

---

## 17. Information required before preliminary design freeze

### Survey
- legal boundary;
- topographic survey;
- existing roads/utilities;
- flood paths.

### Geotechnical
- bearing capacity;
- soil stratigraphy;
- corrosion conditions;
- foundation recommendations.

### Hydrogeology
- aquifer identification;
- static/dynamic water levels;
- pump tests;
- sustainable yield;
- water chemistry and salinity.

### Climate
- design wind speed;
- gusts;
- temperature extremes;
- solar resource;
- dust/soiling;
- rainfall intensity.

### Agriculture
- soil chemistry;
- soil texture;
- crop selection;
- root-zone depth;
- crop-water requirement;
- acceptable shade range.

### Electrical
- grid point of connection;
- allowed export capacity;
- grid voltage;
- protection/grid-code requirements.

---

## 18. Master-plan design freeze sequence

The 1 km² plan should mature through the following gates:

### MP-0 — Concept
Current document.

### MP-1 — Site-informed concept
Add actual site polygon, topography, grid access, hydrogeology, and wind data.

### MP-2 — 30% preliminary design
Generate exact tree coordinates, road geometry, reservoir dimensions, preliminary electrical single-line, water balance, and drainage concept.

### MP-3 — Pilot-informed revision
Incorporate measured results from the full-scale tree and 31-tree pilot.

### MP-4 — Detailed design
Structural foundations, final PV strings, MV network, pumping, irrigation, civil works, SCADA, fire systems, BOQ, construction packages.

No 1 km² construction commitment should be made before MP-3 evidence has been reviewed.

---

## 19. Key master-plan conclusion

The reference 1 km² project should be treated as a **solar-agricultural utility campus**, not as 8,019 independent objects.

Its design hierarchy is:

`Site → utility corridors → water/electrical blocks → agricultural sectors → periodic solar-tree lattice → individual tree`

The theoretical D11/S12 field provides approximately **8,019 trees/km²**, but a credible engineering master plan must reserve space for water, electricity, roads, safety, drainage, and operations before fixing the final installed count.

The target is therefore not “place exactly 8,019 trees at any cost.” The target is:

> **Preserve the D11/S12 shading and energy logic while delivering approximately 90–92 hectares of operational agricultural land, reliable water distribution, maintainable electrical infrastructure, emergency access, and a layout that can be built and expanded safely.**
