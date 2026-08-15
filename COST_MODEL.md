# Cost Model v2 — Structural and Project Economics Framework

## Purpose

This document defines the economic model required to decide whether Solar Agro Tree is viable beyond the research/pilot stage.

The central economic question is no longer simply:

> How much does 1 km² cost?

It is:

> **What is the maximum economically acceptable installed cost per solar tree, and can the wind-resistant structure and foundation be delivered below that threshold?**

No final project CAPEX is published yet because the largest cost drivers — steel mass, foundation, water source, grid connection, and local fabrication — have not been validated.

---

## 1. Current economic risk hierarchy

### Risk 1 — Elevated structure and foundation

The D11 canopy has an 11 m diameter and sits between 5 m and 8 m above grade.

`STRUCTURAL_PRECHECK.md` shows that wind action can create substantial overturning and uplift envelopes. Therefore:

- steel mass/tree;
- connection complexity;
- foundation cost/tree;
- erection cost/tree;

must be treated as first-order economic variables.

### Risk 2 — Sustainable delivered water cost

Available solar energy does not prove water availability.

The relevant economic metric is:

`USD per sustainable m³ delivered to the crop root zone`

including:

- well drilling/rehabilitation;
- pumping energy;
- pump replacement;
- treatment;
- storage;
- distribution losses;
- irrigation equipment;
- hydrogeological monitoring.

### Risk 3 — Agricultural value under dynamic shade

The project needs measured crop value per hectare and per cubic metre of water under the actual shade regime.

### Risk 4 — Electricity value

Electricity has different values depending on whether it is:

- consumed by project loads;
- replacing unavailable/off-grid generation;
- exported at a fixed tariff;
- curtailed;
- shifted to high-value hours using storage or flexible loads.

---

## 2. Cost hierarchy

The cost model shall calculate four nested levels:

### Level A — Per solar tree

`CAPEX_tree = structure + foundation + PV share + DC share + installation + instrumentation`

### Level B — Per hectare

`CAPEX_ha = tree density × CAPEX_tree + irrigation + roads + sector infrastructure + agricultural establishment`

### Level C — Per electrical block

Includes:

- combiner/string infrastructure;
- inverter station;
- transformer;
- MV switchgear;
- block communications;
- local roads/service pads.

### Level D — Whole 1 km² project

Includes all distributed costs plus:

- main substation;
- water storage/treatment;
- wells;
- operations compound;
- grid connection;
- engineering;
- owner costs;
- contingency.

---

## 3. Solar-tree structural CAPEX

This is the highest-priority cost package.

### Required measured quantities from structural engineering / prototype

- kg primary steel/tree;
- kg secondary steel/tree;
- kg rails/tree;
- m² galvanizing/coating/tree;
- number and grade of structural bolts;
- weld length and fabrication hours;
- foundation concrete m³/tree;
- reinforcement kg/tree;
- anchor steel/tree;
- excavation/drilling quantity;
- crane hours/tree;
- erection labour hours/tree;
- transport volume/mass/tree.

### Structure cost equation

A practical procurement model should use:

`C_structure = steel_mass × fabricated_steel_rate + coating + bolts + shop_labor + transport + erection`

### Foundation cost equation

`C_foundation = excavation + concrete + rebar + anchors + equipment + labor + QA`

No `USD/tree` assumption should be presented as a fact until these quantities exist.

---

## 4. Structural design variants must be priced, not merely discussed

The project should compare at least:

- **A:** fixed D11 six-face canopy;
- **B:** vented D11 canopy;
- **C:** segmented/open-gap canopy;
- **D:** reduced-height canopy;
- **E:** alternative smaller canopy/denser lattice;
- **F:** stowable/dynamic concept only if mechanically justified.

For every variant, calculate:

- shade-hours/m²;
- PV kWp/tree;
- tree density;
- wind screening moment;
- uplift screening force;
- kg steel/tree;
- foundation cost/tree;
- installed USD/tree;
- USD/ha;
- agricultural area retained.

The cheapest structure is not automatically optimal. The goal is the best total value per hectare.

---

## 5. PV system CAPEX

Separate PV cost from elevated structural cost so the project can be compared fairly with conventional PV.

### Direct PV package

- modules;
- rails/clamps attributable specifically to PV;
- DC cable;
- connectors;
- combiners;
- DC isolation/protection;
- inverters;
- monitoring;
- grounding/lightning protection.

Metrics:

- USD/kWp for PV/electrical equipment excluding solar-tree structural premium;
- USD/kWp including solar-tree structural premium.

This separation answers the critical question:

> How much extra are we paying for agricultural shade compared with ordinary ground-mounted PV?

---

## 6. Water CAPEX

### Water-source package

- hydrogeological investigation;
- exploratory drilling if needed;
- production wells;
- pump tests;
- pumps;
- VFDs;
- wellhead instrumentation.

### Treatment/storage package

- filtration;
- desalination where required;
- disinfection;
- chemical systems;
- reservoirs;
- booster pumps;
- fire-water reserve if combined.

### Distribution package

- main pipes;
- sector manifolds;
- valves;
- pressure regulation;
- drip irrigation;
- fertigation;
- flow meters;
- soil sensors.

Required output:

`lifetime USD / delivered irrigation m³`

and separately:

`annual OPEX / delivered irrigation m³`

---

## 7. Roads, civil and site infrastructure

The 1 km² master plan currently reserves an indicative 8–10% envelope for non-crop infrastructure.

Cost items:

- perimeter road;
- central service spines;
- secondary access;
- drainage;
- fencing/security;
- operations building;
- workshop;
- warehouse;
- parking;
- grading;
- fire access.

Road design should be minimized because overbuilding roads directly destroys the project's land-use advantage.

---

## 8. Digital and control CAPEX

Include:

- weather stations;
- irradiance sensors;
- soil moisture/temperature sensors;
- well level sensors;
- flow/pressure instrumentation;
- electrical meters;
- PLC/RTU equipment;
- communications backbone;
- SCADA;
- asset management;
- cybersecurity equipment;
- data storage.

Digital systems should be valued against avoided water use, avoided failures, improved crop yield, and reduced maintenance — not treated only as IT overhead.

---

## 9. OPEX model

Annual OPEX should be divided into:

### Structure/PV

- inspections;
- PV cleaning;
- fastener/connection checks;
- corrosion repair;
- module replacement;
- inverter service/replacement reserve.

### Water

- pump maintenance;
- well rehabilitation;
- treatment consumables;
- filter replacement;
- pipe/valve repair;
- irrigation replacement.

### Agriculture

- labor;
- seed/planting material;
- fertilizer;
- crop protection;
- machinery;
- harvest;
- packaging/logistics.

### Project operations

- security;
- SCADA/communications;
- management;
- insurance;
- permits/fees where applicable.

---

## 10. Revenue/value model

Value streams must remain separate in the model.

### A. Electricity used internally

Value equals avoided alternative energy cost, not necessarily grid tariff.

### B. Electricity exported

`Revenue_export = exported_kWh × realized_export_price`

Curtailment must be modeled explicitly.

### C. Agricultural gross margin

Use gross margin, not gross sales:

`Crop_margin = crop_revenue − crop_variable_costs`

### D. Water-saving value

Only include water-saving value if measured against an open-sun control and if water has a defensible economic value.

### E. Additional shaded-land services

Possible future scenarios may include nurseries, livestock shade, post-harvest operations, or other productive shaded uses.

These should be modeled as optional modules, not assumed in the base case.

---

## 11. Core economic equations

### Annual project free operating value before financing/tax

`Annual_value = electricity_value + crop_gross_margin + other_validated_value − OPEX`

### Simple payback

`Payback = total_CAPEX / annual_net_value`

### Discounted cash flow

The full model shall calculate:

- NPV;
- IRR;
- discounted payback;
- replacement CAPEX;
- residual value where appropriate.

Financing, taxation, grants, carbon finance, and subsidies must be shown separately from the underlying engineering economics.

---

## 12. The key threshold: maximum affordable tree cost

For commercial decision-making, the model should solve backward for:

`C_tree,max`

where:

`NPV = 0`

at a defined:

- project life;
- discount rate;
- crop margin;
- water cost;
- electricity value;
- OPEX;
- infrastructure cost excluding trees.

This produces a useful engineering target:

> **The structural team receives a maximum installed USD/tree target rather than being asked simply to make the tree strong.**

If the validated structural design costs more than `C_tree,max`, the geometry must change or additional value streams must be proven.

---

## 13. Scenario structure

Every future cost model should publish at least three scenarios:

| Variable | Low-cost / favorable | Base | High-cost / adverse |
|---|---:|---:|---:|
| Fabricated steel USD/kg | Input | Input | Input |
| Steel kg/tree | Input | Input | Input |
| Foundation USD/tree | Input | Input | Input |
| PV equipment USD/kWp | Input | Input | Input |
| Water USD/m³ | Input | Input | Input |
| Crop gross margin USD/ha | Input | Input | Input |
| PV yield kWh/kWp/y | Input | Input | Input |
| Realized electricity USD/kWh | Input | Input | Input |
| OPEX/year | Input | Input | Input |

The repository should never hide uncertainty behind a single deterministic number.

---

## 14. Sensitivity analysis priorities

The first sensitivity model should rank:

1. installed structure + foundation USD/tree;
2. design wind speed / structural mass;
3. sustainable delivered water USD/m³;
4. crop gross margin/ha;
5. PV yield;
6. electricity value;
7. PV coverage percentage;
8. OPEX;
9. discount rate;
10. project lifetime.

The second stage should use Monte Carlo sampling once credible probability distributions are available.

---

## 15. Required pilot outputs

Phase 1 and Phase 2 should produce measured values for:

- kg steel/tree;
- fabricated structure USD/tree;
- foundation USD/tree;
- erection hours/tree;
- crane hours/tree;
- PV installed USD/kWp;
- annualized maintenance hours/tree;
- cleaning water/tree;
- shadow-hours/m²;
- crop yield/ha;
- irrigation m³/ha;
- pump kWh/m³;
- system availability.

These measurements will replace the largest assumptions in this document.

---

## 16. Decision gates

### Gate E1 — Structural plausibility

Can the selected geometry survive required design loads with acceptable member/foundation quantities?

### Gate E2 — Prototype cost

Is measured installed tree cost below the provisional economic threshold?

### Gate E3 — Agricultural/water performance

Does measured crop value and water productivity justify the shade infrastructure?

### Gate E4 — Integrated economics

Does the combined electricity + agriculture system produce acceptable NPV/IRR without relying on unsupported external benefits?

### Gate E5 — Financing strategy

Only after E4 should grants, climate finance, concessional capital, carbon mechanisms, or public support be layered onto the model.

---

## 17. Status

**Version:** v2 framework.  
**Current limiting data:** structural quantities and site water economics.  
**Next numerical inputs:** validated structural concept, local fabrication prices, prototype BOQ, hydrogeological data, and crop trial data.

Until those inputs exist, any published billion-dollar or full-project CAPEX figure would create false precision and should be avoided.
