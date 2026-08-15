# Technical Specification — Reference D11/S12

## 1. Solar tree geometry

Reference dimensions:

- canopy form: regular six-face pyramid;
- canopy tip-to-tip diameter: 11.0 m;
- canopy circumradius: 5.5 m;
- canopy edge height above grade: 5.0 m;
- canopy apex height above grade: 8.0 m;
- vertical rise from edge to apex: 3.0 m;
- central column reference outside diameter for land-footprint calculations: 0.60 m.

The 0.60 m column diameter is not a final structural size. Structural analysis may require a different section, wall thickness, taper, or multi-member mast.

## 2. Canopy surface

A regular 11 m tip-to-tip hexagon has six equal triangular inclined faces. The preliminary total inclined canopy surface is approximately 92.9 m² per tree.

Assuming 90% usable photovoltaic coverage after rails, edges, access gaps, drainage, and structural interruptions:

- usable PV surface: ~83.6 m²/tree;
- preliminary module density assumption: 220 Wp/m²;
- preliminary DC capacity: ~18.4 kWp/tree.

## 3. Module mounting concept

The preferred construction sequence is:

1. foundation;
2. hollow central column;
3. primary canopy frame;
4. radial/edge members;
5. PV mounting rails;
6. electrical conduits;
7. photovoltaic modules.

The PV modules should be removable independently of the primary structure. The rail concept must allow replacement without disassembling the canopy.

Custom triangular modules should not be assumed until their manufacturing cost, certification, availability, replacement logistics, and electrical layout are compared with standard rectangular or semi-standard modules.

## 4. Column services

The hollow column may carry:

- DC power cables;
- communications/fibre;
- sensor wiring;
- grounding conductor;
- rainwater drainage pipe;
- local isolation and monitoring interfaces near the base.

Battery storage is not assumed inside the column. Sector-level battery/electrical stations are preferred because thermal management, fire safety, access, and maintenance are easier to control.

## 5. Land-cell geometry

Reference land cell:

- regular hexagon;
- side length: 12.0 m;
- center-to-vertex distance: 12.0 m;
- neighboring cell-center distance: √3 × 12 = ~20.785 m;
- cell area: (3√3/2) × 12² = ~374.123 m².

Tree arrangement:

- one tree at each land-cell center;
- one tree at every hexagon vertex;
- every vertex tree is shared by three neighboring cells in a periodic network.

Effective tree count per land cell:

1 + 6/3 = 3 trees/cell.

Reference density:

- ~80.19 trees/ha;
- ~8,019 trees/km².

## 6. Agricultural clearance

A 5 m canopy-edge height is intended to preserve access for tractors, service vehicles, irrigation maintenance, and field operations. Final clearance must be validated against the actual equipment fleet and canopy deflection under wind/load.

## 7. Structural engineering requirements

Before fabrication, the tree requires formal structural analysis covering at minimum:

- site design wind speed;
- gust factors and aerodynamic pressure;
- uplift;
- overturning moment;
- torsion;
- fatigue/cyclic loading;
- member buckling;
- connection design;
- canopy deflection;
- foundation bearing and uplift;
- corrosion protection;
- seismic requirements where applicable.

No foundation size, steel section, bolt grade, weld procedure, or member thickness in this repository should be treated as construction-ready unless explicitly issued by a qualified structural engineer.

## 8. Electrical architecture

The six canopy faces have different azimuths and should not be indiscriminately combined on a single MPPT. The final system should group electrically compatible orientations or use a suitable optimizer/MPPT architecture after yield and cost modelling.

Potential hierarchy:

Solar trees → string/combiner groups → block inverters → MV transformers → project MV network → main substation/grid or local loads.

## 9. Water and irrigation integration

The tree network should coexist with buried water mains, sector manifolds, drip irrigation, sensor nodes, and service corridors. Water pumping should be controlled at sector level rather than per tree.

## 10. Status

This specification defines the reference geometry only. It is a concept-engineering baseline, not an issued-for-construction specification.
