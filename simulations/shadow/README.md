# Shadow Simulation Workspace

This directory is reserved for reproducible shadow-model code, configuration files, CSV outputs, and generated maps.

## Required model inputs

- latitude/longitude;
- date or solar declination;
- solar time step;
- canopy diameter;
- canopy-edge height;
- apex height;
- periodic hexagonal tree coordinates;
- grid resolution;
- evaluation-zone size.

## Reference validation target

For D11/S12 at the current reference latitude, the periodic central-zone model should reproduce approximately:

- 65–66% instantaneous shade during major summer daytime hours;
- ~9.4 h/m²/day mean summer-solstice shadow exposure;
- ~6.6 h/m²/day mean winter-solstice shadow exposure.

Generated figures should not be committed without the script/configuration required to reproduce them.

## Planned next step

Move the current prototype shadow algorithm into a standalone Python module with documented coordinate generation, sun-position calculation, polygon projection, rasterization, tests, and CSV output.
