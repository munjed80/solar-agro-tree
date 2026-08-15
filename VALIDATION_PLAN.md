# Validation Plan

## Purpose

The current repository is a concept-engineering and pre-feasibility package. The next objective is to convert the key assumptions into measured evidence before any 1 km² implementation decision.

The validation program is organized around the three highest-risk questions:

1. Can the D11 structure survive site-specific wind and fatigue loads at acceptable cost?
2. Does the periodic canopy produce the predicted agricultural microclimate and crop response?
3. Can the selected site provide water sustainably at the required quality and yield?

## Evidence hierarchy

The project should progress from simulation to measurement in this order:

`Analytical calculation -> numerical simulation -> prototype measurement -> pilot measurement -> independent engineering review`

No simulated result should be presented as field-proven performance.

## Phase 1 — Full-scale single-tree prototype

### Structural measurements

Record:
- total fabricated steel mass;
- foundation dimensions and reinforcement;
- canopy deflection under dead load;
- column strain at selected points;
- vibration response under wind;
- bolt/connection movement;
- corrosion protection specification;
- assembly time and equipment required.

### Wind engineering

Before fabrication, obtain site design-wind parameters and perform a structural model covering:
- uplift;
- overturning moment;
- torsion;
- member buckling;
- connection capacity;
- fatigue;
- foundation pull-out and bearing.

Acceptance criteria must be set by a licensed structural engineer under the applicable code framework.

### PV measurements

Measure each face independently:
- irradiance in plane of array;
- module temperature;
- DC voltage/current;
- energy yield;
- soiling loss;
- morning/evening production distribution.

The purpose is to validate the six-azimuth energy model and define MPPT grouping.

## Phase 2 — 31-tree, seven-hexagon pilot

The seven-cell cluster is the minimum meaningful test of shared-tree geometry and moving shade.

### Required sensor grid

Install a repeated spatial grid of:
- PAR sensors;
- pyranometers where appropriate;
- soil-temperature probes;
- soil-moisture probes;
- air temperature / relative humidity sensors;
- wind sensors;
- rainfall gauge;
- irrigation flow meters.

Include an unshaded control plot outside the structure.

### Shadow validation

For representative clear days near:
- summer solstice;
- autumn/spring equinox;
- winter solstice;

compare measured or image-derived shade maps with the model at fixed time intervals.

Primary metrics:
- instantaneous shaded fraction;
- shade-hours per square metre;
- spatial distribution of shade-hours;
- model error by time of day.

Target before scale-up: explainable agreement between simulated and observed shade geometry, with errors documented rather than hidden.

## Agricultural experiment

Use randomized replicated plots where possible.

At minimum compare:
- unshaded control;
- naturally occurring shade intensity under the D11/S12 pattern;
- multiple crop groups with different light requirements.

Measure:
- germination rate;
- biomass;
- marketable yield;
- crop quality;
- water applied;
- soil moisture retention;
- canopy/leaf temperature;
- crop failures or disease pressure.

Primary water-productivity KPI:

`kg of marketable crop / m³ of irrigation water`

A yield increase alone is not sufficient if water consumption increases disproportionately.

## Water-resource validation

A hydrogeological program is mandatory before agricultural scale-up.

Required work:
- exploratory borehole data review;
- static water level;
- pumping water level;
- step-drawdown test;
- constant-rate pumping test;
- recovery monitoring;
- aquifer transmissivity estimate;
- sustainable yield assessment;
- seasonal water-level monitoring;
- water chemistry and salinity analysis.

The power system must never be used as justification for pumping more groundwater than the aquifer can sustainably supply.

## Irrigation validation

Measure:
- pump wire-to-water efficiency;
- total dynamic head;
- pressure at sector manifolds;
- emitter uniformity;
- daily irrigation volume;
- filtration losses;
- fertigation performance.

Compare measured energy per cubic metre against the water model.

## Phase 3 — approximately 10 ha demonstration

Proceed only after the 31-tree pilot produces acceptable structural, agricultural, electrical, and water results.

This phase validates operations at meaningful scale:
- maintenance logistics;
- cleaning strategy;
- electrical block design;
- irrigation zoning;
- farm machinery access;
- labor requirement;
- crop economics;
- security;
- spare-parts strategy.

## Decision gates

### Gate A — single tree
Proceed if structural concept, fabrication cost, installation method, and PV operation are acceptable.

### Gate B — 31 trees
Proceed if dynamic shade produces a useful agricultural response, the model is validated, and water supply is demonstrably sustainable.

### Gate C — 10 ha
Proceed to 1 km² only if measured CAPEX/OPEX and agricultural economics support the investment case.

## Independent review

Before submitting a construction-scale proposal, obtain independent review from at least:
- structural engineering;
- electrical/PV engineering;
- hydrogeology;
- irrigation engineering;
- agronomy;
- environmental permitting.

The strength of the project should come from measured evidence and transparent limitations, not optimistic assumptions.
