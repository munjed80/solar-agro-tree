#!/usr/bin/env python3
"""Preliminary wind-load screening for the D11 solar-tree concept.

This script is intentionally simple and transparent. It is NOT a code-compliant
structural design tool. It exists to expose sensitivity to wind speed, canopy
geometry, projected area, force coefficients, and load height before detailed
engineering.
"""

from __future__ import annotations

import argparse
import csv
import math
import sys
from dataclasses import dataclass, asdict
from typing import Iterable


@dataclass(frozen=True)
class Geometry:
    canopy_diameter_m: float = 11.0
    canopy_rise_m: float = 3.0
    edge_height_m: float = 5.0
    apex_height_m: float = 8.0
    column_diameter_m: float = 0.60

    @property
    def canopy_radius_m(self) -> float:
        return self.canopy_diameter_m / 2.0

    @property
    def plan_area_m2(self) -> float:
        r = self.canopy_radius_m
        return 3.0 * math.sqrt(3.0) / 2.0 * r * r

    @property
    def lateral_projected_area_m2(self) -> float:
        canopy_projection = self.canopy_diameter_m * self.canopy_rise_m
        exposed_column = self.column_diameter_m * self.edge_height_m
        return canopy_projection + exposed_column

    @property
    def default_cp_height_m(self) -> float:
        return (self.edge_height_m + self.apex_height_m) / 2.0


@dataclass(frozen=True)
class Assumptions:
    air_density_kg_m3: float = 1.225
    lateral_force_coefficient: float = 1.30
    uplift_coefficient: float = 1.20


@dataclass(frozen=True)
class Result:
    wind_speed_m_s: float
    dynamic_pressure_pa: float
    dynamic_pressure_kpa: float
    horizontal_force_kn: float
    base_moment_kn_m: float
    uplift_force_kn: float


def calculate(
    wind_speed_m_s: float,
    geometry: Geometry,
    assumptions: Assumptions,
    cp_height_m: float | None = None,
    lateral_area_m2: float | None = None,
) -> Result:
    """Calculate one screening load case."""
    q_pa = 0.5 * assumptions.air_density_kg_m3 * wind_speed_m_s**2

    area_lateral = (
        geometry.lateral_projected_area_m2
        if lateral_area_m2 is None
        else lateral_area_m2
    )
    cp_height = geometry.default_cp_height_m if cp_height_m is None else cp_height_m

    horizontal_force_n = (
        q_pa * assumptions.lateral_force_coefficient * area_lateral
    )
    uplift_force_n = q_pa * assumptions.uplift_coefficient * geometry.plan_area_m2

    horizontal_force_kn = horizontal_force_n / 1000.0
    uplift_force_kn = uplift_force_n / 1000.0
    base_moment_kn_m = horizontal_force_kn * cp_height

    return Result(
        wind_speed_m_s=wind_speed_m_s,
        dynamic_pressure_pa=q_pa,
        dynamic_pressure_kpa=q_pa / 1000.0,
        horizontal_force_kn=horizontal_force_kn,
        base_moment_kn_m=base_moment_kn_m,
        uplift_force_kn=uplift_force_kn,
    )


def parse_wind_speeds(raw: str) -> list[float]:
    values = []
    for item in raw.split(","):
        item = item.strip()
        if not item:
            continue
        value = float(item)
        if value <= 0:
            raise ValueError("Wind speeds must be positive.")
        values.append(value)
    if not values:
        raise ValueError("At least one wind speed is required.")
    return values


def render_table(results: Iterable[Result]) -> str:
    rows = list(results)
    headers = (
        "V (m/s)",
        "q (kPa)",
        "F_H (kN)",
        "M_base (kN·m)",
        "F_U (kN)",
    )
    body = [
        (
            f"{r.wind_speed_m_s:.1f}",
            f"{r.dynamic_pressure_kpa:.3f}",
            f"{r.horizontal_force_kn:.1f}",
            f"{r.base_moment_kn_m:.1f}",
            f"{r.uplift_force_kn:.1f}",
        )
        for r in rows
    ]
    widths = [len(h) for h in headers]
    for row in body:
        widths = [max(w, len(value)) for w, value in zip(widths, row)]

    def line(row: tuple[str, ...]) -> str:
        return " | ".join(value.rjust(width) for value, width in zip(row, widths))

    separator = "-+-".join("-" * width for width in widths)
    return "\n".join([line(headers), separator, *(line(row) for row in body)])


def write_csv(path: str, results: Iterable[Result]) -> None:
    rows = list(results)
    if not rows:
        return
    with open(path, "w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=list(asdict(rows[0]).keys()))
        writer.writeheader()
        for row in rows:
            writer.writerow(asdict(row))


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Preliminary wind screening for the Solar Agro Tree D11 concept."
    )
    parser.add_argument(
        "--wind-speeds",
        default="25,35,45,55",
        help="Comma-separated trial wind speeds in m/s. Default: 25,35,45,55",
    )
    parser.add_argument("--diameter", type=float, default=11.0, help="Canopy diameter (m).")
    parser.add_argument("--rise", type=float, default=3.0, help="Canopy vertical rise (m).")
    parser.add_argument("--edge-height", type=float, default=5.0, help="Canopy edge height (m).")
    parser.add_argument("--apex-height", type=float, default=8.0, help="Canopy apex height (m).")
    parser.add_argument("--column-diameter", type=float, default=0.60, help="Reference column diameter (m).")
    parser.add_argument("--air-density", type=float, default=1.225, help="Air density (kg/m³).")
    parser.add_argument("--cf", type=float, default=1.30, help="Lateral force coefficient sensitivity value.")
    parser.add_argument("--cu", type=float, default=1.20, help="Uplift coefficient sensitivity value.")
    parser.add_argument(
        "--cp-height",
        type=float,
        default=None,
        help="Override effective horizontal load height (m).",
    )
    parser.add_argument(
        "--lateral-area",
        type=float,
        default=None,
        help="Override lateral projected area (m²).",
    )
    parser.add_argument("--csv", default=None, help="Optional output CSV path.")
    return parser


def validate_args(args: argparse.Namespace) -> None:
    positive = {
        "diameter": args.diameter,
        "rise": args.rise,
        "edge-height": args.edge_height,
        "apex-height": args.apex_height,
        "column-diameter": args.column_diameter,
        "air-density": args.air_density,
        "cf": args.cf,
        "cu": args.cu,
    }
    for name, value in positive.items():
        if value <= 0:
            raise ValueError(f"{name} must be positive.")
    if args.apex_height <= args.edge_height:
        raise ValueError("apex-height must be greater than edge-height.")
    if args.cp_height is not None and args.cp_height <= 0:
        raise ValueError("cp-height must be positive.")
    if args.lateral_area is not None and args.lateral_area <= 0:
        raise ValueError("lateral-area must be positive.")


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()

    try:
        validate_args(args)
        wind_speeds = parse_wind_speeds(args.wind_speeds)
    except ValueError as exc:
        parser.error(str(exc))

    geometry = Geometry(
        canopy_diameter_m=args.diameter,
        canopy_rise_m=args.rise,
        edge_height_m=args.edge_height,
        apex_height_m=args.apex_height,
        column_diameter_m=args.column_diameter,
    )
    assumptions = Assumptions(
        air_density_kg_m3=args.air_density,
        lateral_force_coefficient=args.cf,
        uplift_coefficient=args.cu,
    )

    results = [
        calculate(
            speed,
            geometry,
            assumptions,
            cp_height_m=args.cp_height,
            lateral_area_m2=args.lateral_area,
        )
        for speed in wind_speeds
    ]

    print("Solar Agro Tree — D11 Wind Precheck")
    print("NOT FOR CONSTRUCTION")
    print()
    print(f"Plan area: {geometry.plan_area_m2:.2f} m²")
    print(f"Default lateral projected area: {geometry.lateral_projected_area_m2:.2f} m²")
    print(f"Default load height: {geometry.default_cp_height_m:.2f} m")
    print(f"Lateral coefficient Cf: {assumptions.lateral_force_coefficient:.2f}")
    print(f"Uplift coefficient Cu: {assumptions.uplift_coefficient:.2f}")
    print()
    print(render_table(results))

    if args.csv:
        write_csv(args.csv, results)
        print(f"\nCSV written to: {args.csv}")

    return 0


if __name__ == "__main__":
    sys.exit(main())
