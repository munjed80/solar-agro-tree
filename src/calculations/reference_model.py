from __future__ import annotations

import math
from dataclasses import dataclass


@dataclass(frozen=True)
class Design:
    project_area_m2: float = 1_000_000.0
    canopy_diameter_m: float = 11.0
    hex_side_m: float = 12.0
    canopy_edge_height_m: float = 5.0
    canopy_apex_height_m: float = 8.0
    pv_coverage_fraction: float = 0.90
    pv_power_density_w_per_m2: float = 220.0
    column_diameter_m: float = 0.60
    pump_efficiency: float = 0.65


def hex_area(side_m: float) -> float:
    return 3.0 * math.sqrt(3.0) / 2.0 * side_m**2


def effective_trees_per_hex() -> float:
    return 1.0 + 6.0 / 3.0


def tree_density_per_m2(design: Design) -> float:
    return effective_trees_per_hex() / hex_area(design.hex_side_m)


def tree_count(design: Design) -> float:
    return tree_density_per_m2(design) * design.project_area_m2


def canopy_inclined_area_per_tree(design: Design) -> float:
    radius = design.canopy_diameter_m / 2.0
    edge_apothem = radius * math.cos(math.radians(30.0))
    rise = design.canopy_apex_height_m - design.canopy_edge_height_m
    slant_height = math.sqrt(edge_apothem**2 + rise**2)
    face_area = 0.5 * radius * slant_height
    return 6.0 * face_area


def pv_area_per_tree(design: Design) -> float:
    return canopy_inclined_area_per_tree(design) * design.pv_coverage_fraction


def dc_capacity_kwp_per_tree(design: Design) -> float:
    return pv_area_per_tree(design) * design.pv_power_density_w_per_m2 / 1000.0


def dc_capacity_mwp(design: Design) -> float:
    return tree_count(design) * dc_capacity_kwp_per_tree(design) / 1000.0


def column_footprint_m2(design: Design) -> float:
    radius = design.column_diameter_m / 2.0
    return tree_count(design) * math.pi * radius**2


def pumping_kwh_per_m3(head_m: float, efficiency: float) -> float:
    rho = 1000.0
    g = 9.80665
    joules = rho * g * head_m
    return joules / (3_600_000.0 * efficiency)


def water_m3_per_kwh(head_m: float, efficiency: float) -> float:
    return 1.0 / pumping_kwh_per_m3(head_m, efficiency)


def irrigation_volume_m3_per_day(area_ha: float, irrigation_mm_per_day: float) -> float:
    return area_ha * irrigation_mm_per_day * 10.0


def main() -> None:
    design = Design()

    print("Solar Agro Tree — D11/S12 reference model")
    print(f"Hex area: {hex_area(design.hex_side_m):,.3f} m²")
    print(f"Tree density: {tree_density_per_m2(design) * 10_000:,.3f} trees/ha")
    print(f"Trees per 1 km²: {tree_count(design):,.1f}")
    print(f"Inclined canopy area/tree: {canopy_inclined_area_per_tree(design):,.2f} m²")
    print(f"PV area/tree: {pv_area_per_tree(design):,.2f} m²")
    print(f"DC capacity/tree: {dc_capacity_kwp_per_tree(design):,.2f} kWp")
    print(f"DC capacity/1 km²: {dc_capacity_mwp(design):,.2f} MWp")
    print(f"Column footprint: {column_footprint_m2(design):,.1f} m²")

    for head_m in (100.0, 200.0, 300.0):
        print(
            f"Water at {head_m:.0f} m head: "
            f"{water_m3_per_kwh(head_m, design.pump_efficiency):,.3f} m³/kWh"
        )

    irrigation_m3 = irrigation_volume_m3_per_day(100.0, 5.0)
    pumping_energy_300 = irrigation_m3 * pumping_kwh_per_m3(300.0, design.pump_efficiency)
    print(f"100 ha at 5 mm/day: {irrigation_m3:,.0f} m³/day")
    print(f"Energy to lift that water 300 m: {pumping_energy_300:,.1f} kWh/day")


if __name__ == "__main__":
    main()
