# System Architecture — Solar Agro Tree 1 km² Reference Project

## D11/S12 integrated energy–water–agriculture architecture

**Document status:** Concept engineering / pre-feasibility  
**Reference project:** 1 km² / approximately 100 ha  
**Reference layout:** D11/S12 periodic solar-tree network  
**Related documents:** `1KM_MASTERPLAN.md`, `TECHNICAL_SPECIFICATION.md`, `ENERGY_MODEL.md`, `WATER_MODEL.md`, `SHADOW_SIMULATION.md`, `VALIDATION_PLAN.md`

> This document defines system boundaries, interfaces, flows, measurement points, control hierarchy, and reviewable assumptions. It is not a final electrical single-line diagram, piping and instrumentation diagram (P&ID), SCADA specification, or construction package.

---

## 1. Architecture objective

The project is treated as one integrated infrastructure system rather than a collection of independent solar trees.

The system hierarchy is:

`Solar tree → local electrical group → electrical block → main substation → grid`

and in parallel:

`Well / source → raw-water system → storage → pumping → irrigation sector → crop root zone`

with both systems supervised by:

`Field instrumentation → local controllers / gateways → SCADA → operator / optimization logic`

The design objective is to coordinate energy, water, agriculture, and maintenance so that the project can operate safely under variable solar production, water availability, crop demand, equipment failure, and grid constraints.

---

## 2. Top-level system context

```text
                            ┌───────────────────────┐
                            │     PUBLIC GRID       │
                            └──────────┬────────────┘
                                       │
                              PCC / Main Substation
                                       │
                   ┌───────────────────┴───────────────────┐
                   │                                       │
          Electrical Collection                    Site Auxiliary Loads
                   │                                       │
          ┌────────┴────────┐                      ┌───────┴────────┐
          │ Solar-tree PV   │                      │ Pumps / SCADA  │
          │ electrical field│                      │ O&M / treatment│
          └────────┬────────┘                      └───────┬────────┘
                   │                                       │
                   │                                       │
                   │                               WATER SYSTEM
                   │                                       │
                   │                 Source / wells → storage → irrigation
                   │                                       │
                   └───────────────────────────────┬───────┘
                                                   │
                                           AGRICULTURAL FIELD
                                                   │
                              soil / crops / climate measurements
                                                   │
                                                   ▼
                                                SCADA
```

---

## 3. System boundaries

The project is divided into eight principal subsystems.

| ID | Subsystem | Primary responsibility |
|---|---|---|
| SS-01 | Solar Tree Structural System | support PV canopy and route services |
| SS-02 | PV DC Generation System | convert solar irradiation to DC electricity |
| SS-03 | Electrical Collection & Grid System | conversion, collection, MV distribution, export/import |
| SS-04 | Water Source & Pumping System | abstract and transport water within sustainable limits |
| SS-05 | Water Storage & Treatment System | buffer, condition, and distribute water |
| SS-06 | Irrigation & Agricultural System | deliver water to crops and manage root-zone conditions |
| SS-07 | SCADA / Communications / Data System | monitoring, control, alarms, historian, reporting |
| SS-08 | O&M / Safety / Civil Infrastructure | access, maintenance, fire, drainage, security, buildings |

Each subsystem must have a documented boundary so equipment ownership, protection, maintenance, measurement, and failure responsibility are unambiguous.

---

# 4. SS-01 — Solar Tree Structural System

## 4.1 Scope

Includes:

- foundation;
- main hollow column;
- canopy structural frame;
- six canopy faces;
- PV mounting rails;
- cable routing provisions;
- drainage provisions where used;
- local access/isolation enclosure at base.

## 4.2 Reference geometry

- canopy diameter: 11 m;
- canopy edge height: 5 m;
- canopy apex height: 8 m;
- six inclined faces;
- nominal column diameter used in land calculations: 0.60 m.

## 4.3 Interfaces

Structural system interfaces with:

- PV modules and rails;
- DC cable routing;
- earthing / lightning protection;
- communications/sensors;
- civil foundation;
- agricultural machinery clearance;
- drainage and canopy runoff.

## 4.4 Structural measurement points

Prototype/pilot instrumentation should include selected trees with:

- column strain gauges or equivalent structural test instrumentation;
- tilt/inclinometer measurement;
- vibration/acceleration logging during high wind events;
- canopy displacement references;
- local wind-speed correlation.

These are validation instruments and are not necessarily required on all commercial trees.

---

# 5. SS-02 — PV DC Generation System

## 5.1 Scope

Includes:

- PV modules/cells on six canopy faces;
- string cabling;
- DC connectors;
- DC isolation;
- surge protection;
- string/MPPT grouping;
- optional module-level electronics if justified.

## 5.2 Reference electrical basis

Current preliminary values:

- active PV area/tree: ~83.6 m²;
- nominal module density: ~220 W/m²;
- DC capacity/tree: ~18.4 kWp;
- gross periodic field capacity: ~147.5 MWp for theoretical 8,019-tree density.

The final capacity must be recalculated after infrastructure clipping and final module selection.

## 5.3 MPPT grouping principle

Canopy faces with materially different azimuth/irradiance profiles should not be placed on one MPPT without electrical validation.

Potential architecture:

- face-level grouping;
- paired azimuth groups;
- multi-MPPT string inverter architecture;
- optimizers where economic and maintainable.

No final topology is selected yet.

## 5.4 PV measurement points

Recommended minimum monitoring hierarchy:

### Per solar tree or local string group
- DC voltage;
- DC current;
- calculated DC power;
- isolation/fault status.

### Representative canopy faces
- module backsheet temperature;
- plane-of-array irradiance by representative orientation;
- soiling reference sensor.

### Per inverter
- DC input energy;
- AC power;
- inverter efficiency;
- availability;
- fault code;
- internal temperature.

---

# 6. SS-03 — Electrical Collection & Grid System

## 6.1 Architecture

Conceptual hierarchy:

```text
PV faces
  ↓
DC strings / local groups
  ↓
Inverter station
  ↓
LV AC
  ↓
Step-up transformer
  ↓
MV collector network
  ↓
Main project substation
  ↓
Point of Common Coupling (PCC)
  ↓
Public grid
```

## 6.2 Electrical blocks

Reference master plan: approximately **10 electrical collection blocks**, each around 14–15 MWp gross before final clipping.

Possible station IDs:

`ES-01 ... ES-10`

The blocks should be electrically isolatable.

Failure of one collection block should not de-energize the full project except where required by common protection or grid events.

## 6.3 Main substation boundary

Main substation begins at MV collector incomers and includes:

- MV switchgear;
- protection;
- metering;
- main transformer(s), if required by grid voltage;
- grid synchronization;
- reactive power / power-quality equipment where required;
- PCC equipment.

The public-grid boundary is the formally agreed Point of Common Coupling.

## 6.4 Import/export operating modes

The project may operate in several states:

1. **Export mode** — solar generation exceeds internal demand.
2. **Self-consumption mode** — generation supplies pumping/site loads.
3. **Grid-assisted mode** — import supplements insufficient solar generation.
4. **Curtailment mode** — PV production intentionally reduced due to grid/export constraints.
5. **Islanded critical-load mode** — only if future BESS and protection architecture explicitly support islanding.

Island operation must not be assumed in the reference architecture.

## 6.5 Electrical measurement points

### M-E01 — PV DC generation
Per inverter/collection station.

### M-E02 — LV AC output
At inverter output.

### M-E03 — MV block export
At each `ES-xx` transformer/MV feeder.

### M-E04 — Site auxiliary consumption
Dedicated metering for pumps, treatment, O&M, SCADA, and other loads.

### M-E05 — Main substation bus
Project gross electrical balance.

### M-E06 — PCC revenue meter
Official grid import/export settlement point.

### M-E07 — power quality
Voltage, frequency, harmonics, power factor, reactive power, flicker where required.

---

# 7. SS-04 — Water Source & Pumping System

## 7.1 Core principle

Electrical generation capacity does not define allowable groundwater extraction.

The controlling constraint is:

`Sustainable source yield + water quality + regulatory allocation`

## 7.2 Source types

Possible sources include:

- groundwater wells;
- treated wastewater;
- harvested seasonal runoff;
- transferred water;
- blended sources.

The architecture remains source-neutral until site selection.

## 7.3 Well boundary

For a groundwater source, each well subsystem may include:

- well casing and completion;
- submersible pump;
- motor;
- VFD/drive;
- non-return valve;
- wellhead manifold;
- isolation valve;
- flow meter;
- pressure sensor;
- water-level instrumentation;
- water-quality sampling point;
- local electrical panel;
- communications gateway.

## 7.4 Pump operating philosophy

Preferred priority:

1. pump during periods of available solar power;
2. fill storage reservoirs;
3. irrigate based on crop demand and pressure-zone requirements;
4. avoid unnecessary battery cycling;
5. maintain source abstraction below approved sustainable limits.

## 7.5 Water-source measurement points

### M-W01 — static/dynamic groundwater level
Continuous or scheduled measurement at each production well.

### M-W02 — well flow rate
Required at each production well.

### M-W03 — well discharge pressure
Used with flow and pump power to assess hydraulic performance.

### M-W04 — pump electrical power
Used to calculate actual kWh/m³.

### M-W05 — water quality
At minimum according to source risk: EC, temperature, pH, turbidity, plus laboratory chemistry schedule.

### M-W06 — cumulative abstraction
Daily/monthly/yearly volume per source.

SCADA must enforce or alarm against approved abstraction limits once those limits are defined.

---

# 8. SS-05 — Water Storage & Treatment System

## 8.1 Reference storage

Current planning range:

- total usable storage: ~7,000–8,000 m³;
- preferred arrangement: two ~4,000 m³ units.

IDs:

- `WT-01`
- `WT-02`

## 8.2 Functional modes

Reservoirs may serve as:

- hydraulic buffer;
- solar-energy time shifting through daytime pumping;
- emergency irrigation reserve;
- treatment buffer;
- fire-water reserve if separately approved and protected.

Fire-water volume must not be assumed available for irrigation unless the final safety design permits it.

## 8.3 Treatment boundary

Treatment requirements depend on water chemistry.

Possible process train:

```text
Source
  ↓
screening / pre-filtration
  ↓
raw-water storage (if needed)
  ↓
filtration
  ↓
optional desalination / conditioning
  ↓
disinfection (if required)
  ↓
irrigation storage / distribution
```

No desalination system is assumed until salinity analysis proves it necessary.

## 8.4 Storage/treatment measurement points

### M-W07 — reservoir level
Continuous level measurement per tank/reservoir.

### M-W08 — inlet/outlet flow
Required to close the water balance.

### M-W09 — treatment inlet/outlet pressure
For filter/pump condition.

### M-W10 — treatment electrical consumption
Needed for kWh/m³ calculation.

### M-W11 — treatment water quality
Before and after each critical process stage.

### M-W12 — reservoir temperature / EC
Useful for operational and salinity monitoring.

---

# 9. SS-06 — Irrigation & Agricultural System

## 9.1 Sector architecture

Reference concept: **10 irrigation management sectors**.

IDs:

`AG-01 ... AG-10`

Each sector is hydraulically isolatable and independently metered.

## 9.2 Hydraulic hierarchy

```text
Main reservoir / booster pumps
  ↓
main irrigation header
  ↓
sector isolation valve + meter
  ↓
sector manifold
  ↓
submains
  ↓
laterals
  ↓
drippers
  ↓
root zone
```

## 9.3 Control principle

Irrigation should be demand-based, not timer-only.

Inputs may include:

- soil moisture;
- crop type/growth stage;
- reference evapotranspiration;
- forecast/weather data;
- reservoir state;
- available electrical power;
- source abstraction limit;
- irrigation priority.

## 9.4 Irrigation measurement points

### M-I01 — sector flow meter
Mandatory per sector.

### M-I02 — sector pressure
At manifold/inlet.

### M-I03 — representative distal pressure
Verifies hydraulic uniformity.

### M-I04 — soil moisture
Multiple locations/depths per crop zone.

### M-I05 — soil temperature
Used to quantify microclimate effects.

### M-I06 — soil EC
Where salinity risk is material.

### M-I07 — irrigation volume by crop plot
Derived from measured flow and valve state.

### M-I08 — crop yield / biomass
Required to calculate water productivity.

---

# 10. Agricultural microclimate instrumentation

The project's central hypothesis is that dynamic shade improves the agricultural environment sufficiently to justify the elevated structure.

Therefore measurement must include control plots outside the solar-tree shade.

Recommended measurements:

### M-A01 — PAR / photosynthetically active radiation
At shaded and control locations.

### M-A02 — global solar irradiance
Reference weather station.

### M-A03 — air temperature
At crop-canopy height.

### M-A04 — relative humidity
At crop-canopy height.

### M-A05 — wind speed/direction
At reference meteorological height and selected under-canopy positions.

### M-A06 — soil temperature profile
Multiple depths.

### M-A07 — soil moisture profile
Multiple depths.

### M-A08 — rainfall
Reference gauge plus canopy-runoff study.

### M-A09 — crop yield
kg/ha or t/ha.

### M-A10 — water productivity
`kg crop / m³ irrigation water`

### M-A11 — land equivalent / combined productivity metric
To compare simultaneous agriculture + energy against separate land use.

---

# 11. SS-07 — SCADA / Communications / Data System

## 11.1 Functional layers

```text
Layer 0 — physical process
PV, pumps, valves, reservoirs, soil, crops, weather

Layer 1 — sensors and actuators
meters, transmitters, VFDs, relays, valves

Layer 2 — local control
PLC / RTU / inverter controllers / pump controllers

Layer 3 — site communications
fiber + industrial Ethernet + suitable field protocols

Layer 4 — SCADA
HMI, alarms, commands, historian

Layer 5 — analytics / optimization
energy-water scheduling, reporting, predictive maintenance

Layer 6 — external interfaces
utility/grid, government reporting, secure remote access
```

## 11.2 Communications philosophy

Preferred backbone:

- fiber between major electrical/water/O&M nodes;
- industrial Ethernet at station level;
- suitable fieldbus/Modbus/IEC protocols according to equipment;
- wireless only where it is maintainable and does not create a critical single point of failure.

Final protocol selection is vendor- and cybersecurity-dependent.

## 11.3 SCADA responsibilities

SCADA should:

- display real-time status;
- archive time-series data;
- record alarms/events;
- calculate daily energy and water balances;
- monitor source abstraction limits;
- monitor reservoir inventory;
- control irrigation valves and pump schedules;
- report inverter/pump availability;
- produce maintenance work triggers;
- support crop/microclimate research datasets.

## 11.4 SCADA should not

SCADA should not autonomously override safety protections, groundwater legal limits, or electrical protection settings.

Safety-critical control remains local where appropriate.

---

# 12. Control hierarchy

The reference control hierarchy is:

### Level 1 — local protection
Fast, autonomous protection at inverter, transformer, pump, motor, and electrical equipment.

### Level 2 — equipment control
Local PLC/VFD/inverter control.

### Level 3 — sector control
Electrical block or irrigation-sector coordination.

### Level 4 — site SCADA
Supervisory commands and scheduling.

### Level 5 — optimization layer
Optional optimization based on:

- energy forecast;
- water inventory;
- crop demand;
- grid export limit;
- well sustainable yield;
- weather forecast.

The optimization layer may recommend or schedule actions but must remain bounded by hard operating limits.

---

# 13. Energy-management logic

A preliminary priority stack can be:

1. safety and protection loads;
2. SCADA/communications;
3. water pumping needed to maintain critical reservoir level;
4. irrigation required for crop protection;
5. treatment and agricultural processing;
6. optional cold storage/other productive loads;
7. battery charging if installed and economically justified;
8. grid export;
9. curtailment if export and storage are unavailable.

This order is reviewable and may change based on tariffs, crop risk, grid rules, and contractual obligations.

---

# 14. Water-management logic

Reference water priorities:

1. remain within sustainable source abstraction limits;
2. maintain minimum operational reservoir level;
3. protect crops from critical water stress;
4. irrigate based on measured demand;
5. maintain treatment quality;
6. preserve required emergency/fire reserve;
7. use surplus solar periods for non-urgent reservoir replenishment.

The control system must never treat groundwater as an unlimited energy-storage sink.

---

# 15. Energy–water coupling

One of the project's key architectural advantages is direct coupling between solar production and pumping.

Reference relationship:

`Solar availability → pump scheduling → water storage → irrigation scheduling`

This allows water reservoirs to absorb part of the temporal mismatch between solar generation and crop irrigation demand.

A key KPI is:

`Specific pumping energy = kWh / m³`

which should be calculated per source and per pressure zone.

Another KPI is:

`Energy used for irrigation / total PV generation`

The current pre-feasibility model suggests irrigation pumping may use only a small fraction of total PV energy, but this must be verified with actual TDH, source depth, treatment load, pipe losses, crop demand, and net installed PV capacity.

---

# 16. System metering and balance equations

## 16.1 Electrical balance

At site level:

`PV generation + grid import = grid export + pumping + treatment + O&M + BESS losses + other loads + electrical losses`

SCADA should calculate this daily and monthly.

## 16.2 Water balance

`source abstraction + imported/recovered water + harvested water = irrigation + treatment reject + evaporation + leakage + storage change + other consumption`

All major terms must be measured or estimated transparently.

## 16.3 Agricultural water productivity

`Water productivity = crop yield / irrigation water applied`

This is a core project KPI.

## 16.4 Combined land productivity

The project should evaluate simultaneous agricultural and energy value per hectare, not electricity alone.

---

# 17. Measurement-point register

| ID | Measurement | Location | Purpose |
|---|---|---|---|
| M-E01 | DC power | inverter/string group | PV production |
| M-E02 | AC output | inverter | conversion performance |
| M-E03 | MV energy | each electrical block | block energy balance |
| M-E04 | auxiliary loads | pumps/treatment/O&M | self-consumption |
| M-E05 | substation energy | main bus | project balance |
| M-E06 | import/export | PCC | revenue/grid settlement |
| M-E07 | power quality | PCC/substation | grid compliance |
| M-W01 | water level | each well | aquifer response |
| M-W02 | well flow | each well | abstraction |
| M-W03 | well pressure | wellhead | hydraulic performance |
| M-W04 | pump power | well/pump | kWh/m³ |
| M-W05 | source quality | well/source | treatment/agriculture |
| M-W06 | cumulative abstraction | source | sustainability reporting |
| M-W07 | reservoir level | WT-01/WT-02 | inventory |
| M-W08 | reservoir flow | inlet/outlet | water balance |
| M-W09 | treatment pressure | treatment plant | condition monitoring |
| M-W10 | treatment energy | treatment plant | kWh/m³ |
| M-W11 | treated quality | process outlet | irrigation suitability |
| M-I01 | sector flow | AG-01...10 | irrigation accounting |
| M-I02 | sector pressure | sector inlet | control |
| M-I03 | distal pressure | field | uniformity |
| M-I04 | soil moisture | crop plots | irrigation demand |
| M-I05 | soil temperature | crop plots | microclimate |
| M-I06 | soil EC | risk areas | salinity |
| M-A01 | PAR | shade/control plots | agrivoltaic response |
| M-A02 | irradiance | weather station | solar resource |
| M-A03 | air temperature | field/control | microclimate |
| M-A04 | humidity | field/control | microclimate |
| M-A05 | wind | weather/field | climate + structural correlation |
| M-A08 | rainfall | weather station | water balance |
| M-A09 | crop yield | each trial plot | productivity |

---

# 18. Alarm philosophy

SCADA alarms should be prioritized.

## Priority 1 — safety / immediate response

Examples:

- electrical protection trip;
- fire detection;
- major water leak;
- unsafe reservoir condition;
- unauthorized access to HV area;
- critical pump/motor fault affecting crop survival.

## Priority 2 — operational

- low reservoir level;
- high reservoir level;
- well drawdown beyond approved threshold;
- irrigation pressure out of range;
- inverter block unavailable;
- communication loss to major station.

## Priority 3 — maintenance / performance

- PV underperformance;
- excessive soiling;
- pump efficiency degradation;
- sensor drift;
- filter differential pressure;
- abnormal water-quality trend.

Alarm floods must be prevented through rationalization during detailed design.

---

# 19. Failure containment and resilience

The architecture should avoid large single points of failure.

### Electrical
- multiple collection blocks;
- sectionalized MV network;
- redundant critical control power where justified.

### Water
- multiple sources where hydrogeologically feasible;
- two storage units rather than one;
- isolation valves between sectors;
- pump redundancy for critical booster duties.

### SCADA
- local equipment remains in a safe state if communications fail;
- historian/control server backups;
- UPS for critical automation/network nodes;
- manual fallback for essential irrigation operations.

### Agriculture
- sector isolation allows irrigation to continue outside a failed sector;
- reservoir reserve reduces immediate dependence on a single pump.

---

# 20. Cybersecurity boundary

The project is a physical infrastructure system; SCADA must not be exposed as a normal public web application.

Conceptual zones:

1. field-control network;
2. station/OT network;
3. SCADA servers;
4. operations IT network;
5. external/remote access DMZ;
6. public reporting layer if required.

Required principles:

- role-based access;
- MFA for remote privileged access;
- network segmentation;
- allowlisted remote connections;
- audit logs;
- controlled vendor access;
- offline configuration backups;
- patch/change management;
- no direct internet exposure of PLCs, RTUs, inverters, or protection devices.

Detailed cybersecurity requirements must follow applicable utility/government OT standards.

---

# 21. Data architecture

Each physical asset should have a unique ID.

Examples:

- solar tree: `ST-000001`
- electrical station: `ES-01`
- irrigation sector: `AG-01`
- reservoir: `WT-01`
- well: `WL-01`
- pump: `P-AG01-01`
- flow meter: `FIT-AG01-01`

Data should support:

- asset registry;
- GIS coordinate;
- serial numbers;
- maintenance history;
- time-series measurements;
- alarms/events;
- calibration records;
- crop/plot association;
- engineering documents.

---

# 22. SCADA historian sampling assumptions

Reviewable initial assumptions:

- protection events: event-driven / millisecond-resolution where native device records exist;
- electrical operational data: 1–10 s live values, 1 min historian aggregates;
- pump/flow/pressure: 5–30 s live, 1 min historical;
- reservoir level: 30–60 s;
- soil/climate sensors: 1–5 min;
- crop observations: daily/weekly/manual datasets;
- billing/official energy: revenue meter interval per utility requirement.

Storage architecture must be sized after final point count and retention requirements are known.

---

# 23. Preliminary point-count philosophy

The project may contain thousands of solar trees, but this does not mean every possible sensor must exist on every tree.

Use three monitoring tiers:

### Tier A — every asset
Basic operational status needed for fault localization and production accounting.

### Tier B — representative sample
Detailed thermal, irradiance, soil, structural, and soiling instrumentation.

### Tier C — research plots
High-density measurement for agronomic validation.

This prevents sensor CAPEX and maintenance from becoming disproportionate.

---

# 24. BESS system boundary

Battery storage is optional in the reference architecture.

If installed, the BESS includes:

- battery containers/racks;
- PCS;
- transformer/switchgear;
- BMS/EMS;
- HVAC;
- fire detection/suppression;
- dedicated safety separation.

Possible functions:

- critical-load ride-through;
- peak shifting;
- grid support;
- curtailment capture;
- limited night operation.

BESS must not be sized before comparing its economics with:

- water storage;
- flexible pumping;
- grid export;
- demand shifting.

---

# 25. External interfaces

## Public electrical utility

Interface data:

- export/import limits;
- PCC voltage;
- grid-code requirements;
- protection settings;
- revenue metering;
- dispatch/curtailment signals if applicable.

## Water authority / environmental regulator

Interface data:

- authorized source;
- maximum abstraction;
- reporting frequency;
- water-level limits;
- quality requirements;
- discharge/treatment reject rules.

## Agricultural authority / research partner

Interface data:

- crop trials;
- soil data;
- yield reporting;
- pest/disease observations;
- water-productivity results.

## Government/project owner

Dashboard/reporting:

- generation;
- water use;
- irrigated area;
- crop production;
- system availability;
- major alarms;
- groundwater trends;
- energy exported.

---

# 26. Reviewable architecture assumptions

| Assumption | Current reference | Validation required |
|---|---:|---|
| Gross trees/km² | ~8,019 | final GIS/CAD layout |
| Electrical blocks | ~10 | detailed electrical design |
| Irrigation sectors | ~10 | hydraulic/crop design |
| Gross PV capacity | ~147.5 MWp | net tree count + module design |
| Storage reservoirs | 2 | hydraulic reliability study |
| Water storage | 7,000–8,000 m³ | final demand/source profile |
| Pumping strategy | solar-first + storage | dynamic simulation |
| BESS | optional | techno-economic analysis |
| Main comms backbone | fiber | detailed OT design |
| SCADA architecture | centralized supervision + local control | vendor/OT design |
| Sensor density | tiered | pilot results / O&M economics |
| Grid export | allowed in concept | utility connection study |
| Islanding | not assumed | only if specifically engineered |
| Well count | TBD | hydrogeological testing |

---

# 27. Required detailed-design documents

This architecture should eventually be expanded into:

### Electrical
- single-line diagram (SLD);
- DC string schedule;
- inverter/transformer sizing;
- MV cable schedule;
- protection coordination study;
- grounding/lightning design;
- grid impact study.

### Water
- water balance;
- PFD;
- P&IDs;
- pump curves;
- hydraulic model;
- pipe schedule;
- valve/instrument list;
- treatment process design.

### SCADA
- network architecture;
- I/O list;
- tag database;
- alarm philosophy;
- cause-and-effect matrix;
- control narratives;
- cybersecurity design;
- historian/reporting specification.

### Agriculture
- crop zoning plan;
- irrigation scheduling method;
- sensor locations;
- control-plot design;
- sampling protocols.

---

# 28. Acceptance logic for the pilot

The architecture should be validated progressively.

## Single-tree prototype

Validate:

- structural behavior;
- PV electrical behavior by face;
- cable routing;
- maintenance access;
- communications;
- canopy runoff.

## 31-tree pilot

Validate:

- network shade pattern;
- electrical aggregation;
- representative MPPT strategy;
- irrigation below/among structures;
- communications coverage;
- crop response;
- maintenance workflow.

## 10 ha demonstration

Validate:

- sector hydraulics;
- SCADA scale;
- water/energy dispatch;
- O&M staffing;
- crop economics;
- groundwater response;
- electrical block availability.

Only after these stages should the 1 km² architecture be frozen.

---

# 29. System KPI set

The project should report at minimum:

## Energy
- MWh/day and GWh/year;
- kWh/kWp;
- PV availability;
- inverter availability;
- curtailment;
- exported energy;
- auxiliary consumption.

## Water
- m³/day;
- abstraction/source;
- kWh/m³;
- reservoir turnover;
- leakage/unaccounted water;
- groundwater drawdown/recovery.

## Agriculture
- irrigated ha;
- m³/ha;
- yield t/ha;
- kg crop/m³ water;
- shaded/control yield ratio;
- soil moisture and temperature response.

## Shade/microclimate
- instantaneous shade fraction;
- shade-hours/m²/day;
- PAR reduction;
- soil-temperature reduction;
- air-temperature/humidity changes.

## Operations
- system availability;
- maintenance hours;
- failures/tree/year;
- pump MTBF;
- communications availability.

---

# 30. Architectural conclusion

The Solar Agro Tree project should be operated as a coordinated **energy–water–agriculture utility system**.

The solar tree is the visible physical unit, but the functional unit is the integrated chain:

`Sun → PV canopy → electrical block → pumps/grid → water storage → irrigation sector → crop → measurements → SCADA → operational decision`

The architecture deliberately keeps hard safety and resource limits local and enforceable while using SCADA for supervision and optimization.

The central engineering principle is:

> **Electricity, groundwater, storage, irrigation, and crop demand must be measured and balanced as one system. The project is successful only if energy generation, water use, agricultural productivity, and resource sustainability remain simultaneously acceptable.**
