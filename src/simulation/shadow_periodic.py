"""Periodic shadow model for the Solar Agro Tree D11/S12 reference design.

This script projects the 3D vertices of each six-face canopy onto a horizontal
plane using solar altitude and azimuth, then rasterizes the union of shadows in
an interior evaluation window. The periodic tree layout approximates a large
project so the measured window is not dominated by site-edge effects.

Status: engineering concept simulation. Validate against a solar-geometry
library and field measurements before design decisions.
"""

from __future__ import annotations

import argparse
import csv
import math
from dataclasses import dataclass
from pathlib import Path

import cv2
import matplotlib.pyplot as plt
import numpy as np


@dataclass(frozen=True)
class Design:
    name: str = "D11_S12"
    canopy_diameter_m: float = 11.0
    land_hex_side_m: float = 12.0
    edge_height_m: float = 5.0
    apex_height_m: float = 8.0


def regular_hex(radius: float) -> np.ndarray:
    return np.array(
        [
            (
                radius * math.cos(math.radians(30 + 60 * k)),
                radius * math.sin(math.radians(30 + 60 * k)),
            )
            for k in range(6)
        ],
        dtype=float,
    )


def solar_position(latitude_deg: float, solar_time_h: float, declination_deg: float) -> tuple[float, float]:
    latitude = math.radians(latitude_deg)
    declination = math.radians(declination_deg)
    hour_angle = math.radians(15.0 * (solar_time_h - 12.0))

    sin_altitude = (
        math.sin(latitude) * math.sin(declination)
        + math.cos(latitude) * math.cos(declination) * math.cos(hour_angle)
    )
    altitude = math.asin(max(-1.0, min(1.0, sin_altitude)))

    east = -math.cos(declination) * math.sin(hour_angle)
    north = (
        math.cos(latitude) * math.sin(declination)
        - math.sin(latitude) * math.cos(declination) * math.cos(hour_angle)
    )
    azimuth = math.atan2(east, north) % (2.0 * math.pi)
    return altitude, azimuth


def sunrise_sunset(latitude_deg: float, declination_deg: float) -> tuple[float, float]:
    latitude = math.radians(latitude_deg)
    declination = math.radians(declination_deg)
    cos_h0 = -math.tan(latitude) * math.tan(declination)
    h0 = math.acos(max(-1.0, min(1.0, cos_h0)))
    delta_h = math.degrees(h0) / 15.0
    return 12.0 - delta_h, 12.0 + delta_h


def periodic_tree_points(side_m: float, extent_m: float) -> np.ndarray:
    b1 = np.array([math.sqrt(3.0) * side_m, 0.0])
    b2 = np.array([math.sqrt(3.0) * side_m / 2.0, 1.5 * side_m])
    n = int(extent_m / side_m * 2.0) + 10
    points: dict[tuple[float, float], tuple[float, float]] = {}

    vertices = regular_hex(side_m)
    for i in range(-n, n + 1):
        for j in range(-n, n + 1):
            center = i * b1 + j * b2
            if abs(center[0]) > extent_m + 2 * side_m or abs(center[1]) > extent_m + 2 * side_m:
                continue
            points[(round(center[0], 6), round(center[1], 6))] = tuple(center)
            for vertex in vertices + center:
                points[(round(vertex[0], 6), round(vertex[1], 6))] = tuple(vertex)

    return np.array(list(points.values()), dtype=float)


def relative_shadow_polygon(design: Design, altitude: float, azimuth: float) -> np.ndarray:
    base = regular_hex(design.canopy_diameter_m / 2.0)
    vertices = np.vstack(
        [
            np.column_stack([base, np.full(6, design.edge_height_m)]),
            [0.0, 0.0, design.apex_height_m],
        ]
    )

    sx = math.cos(altitude) * math.sin(azimuth)
    sy = math.cos(altitude) * math.cos(azimuth)
    sz = math.sin(altitude)
    projected = np.column_stack(
        [
            vertices[:, 0] - vertices[:, 2] * sx / sz,
            vertices[:, 1] - vertices[:, 2] * sy / sz,
        ]
    ).astype(np.float32)
    return cv2.convexHull(projected.reshape(-1, 1, 2)).reshape(-1, 2).astype(float)


def shadow_mask(
    trees: np.ndarray,
    design: Design,
    altitude: float,
    azimuth: float,
    window_m: float,
    resolution_m: float,
) -> np.ndarray:
    size = int(round(window_m / resolution_m))
    half = window_m / 2.0
    rel = relative_shadow_polygon(design, altitude, azimuth)
    min_x, max_x = rel[:, 0].min(), rel[:, 0].max()
    min_y, max_y = rel[:, 1].min(), rel[:, 1].max()

    relevant = trees[
        (trees[:, 0] + max_x >= -half)
        & (trees[:, 0] + min_x <= half)
        & (trees[:, 1] + max_y >= -half)
        & (trees[:, 1] + min_y <= half)
    ]

    polygons = []
    for cx, cy in relevant:
        polygon = rel + np.array([cx, cy])
        px = np.rint((polygon[:, 0] + half) / resolution_m).astype(np.int32)
        py = np.rint((half - polygon[:, 1]) / resolution_m).astype(np.int32)
        polygons.append(np.column_stack([px, py]).reshape(-1, 1, 2))

    image = np.zeros((size, size), dtype=np.uint8)
    if polygons:
        cv2.fillPoly(image, polygons, 1)
    return image.astype(bool)


def simulate(
    output_dir: Path,
    latitude_deg: float = 33.5104,
    window_m: float = 100.0,
    resolution_m: float = 0.25,
    timestep_minutes: int = 10,
) -> None:
    design = Design()
    output_dir.mkdir(parents=True, exist_ok=True)
    trees = periodic_tree_points(design.land_hex_side_m, window_m / 2.0 + 400.0)

    seasons = {"summer": 23.44, "winter": -23.44}
    summary_rows = []
    hourly_rows = []

    for season, declination in seasons.items():
        sunrise, sunset = sunrise_sunset(latitude_deg, declination)
        dt_h = timestep_minutes / 60.0
        size = int(round(window_m / resolution_m))
        accumulated = np.zeros((size, size), dtype=np.float32)

        t = sunrise
        while t < sunset - 1e-9:
            end = min(t + dt_h, sunset)
            midpoint = (t + end) / 2.0
            altitude, azimuth = solar_position(latitude_deg, midpoint, declination)
            if altitude > 0:
                accumulated += shadow_mask(
                    trees, design, altitude, azimuth, window_m, resolution_m
                ) * (end - t)
            t = end

        values = accumulated.ravel()
        summary_rows.append(
            {
                "season": season,
                "daylight_hours": sunset - sunrise,
                "mean_shadow_hours": float(values.mean()),
                "median_shadow_hours": float(np.median(values)),
                "area_4h_plus_percent": 100.0 * float(np.mean(values >= 4.0)),
                "area_6h_plus_percent": 100.0 * float(np.mean(values >= 6.0)),
                "area_8h_plus_percent": 100.0 * float(np.mean(values >= 8.0)),
                "area_10h_plus_percent": 100.0 * float(np.mean(values >= 10.0)),
            }
        )

        for hour in range(math.ceil(sunrise), math.floor(sunset) + 1):
            altitude, azimuth = solar_position(latitude_deg, hour, declination)
            if altitude <= 0:
                continue
            mask = shadow_mask(trees, design, altitude, azimuth, window_m, resolution_m)
            hourly_rows.append(
                {
                    "season": season,
                    "solar_time": hour,
                    "solar_altitude_deg": math.degrees(altitude),
                    "instantaneous_shade_percent": 100.0 * float(mask.mean()),
                }
            )

        plt.figure(figsize=(7, 6))
        image = plt.imshow(
            accumulated,
            origin="lower",
            extent=[-window_m / 2, window_m / 2, -window_m / 2, window_m / 2],
            interpolation="nearest",
        )
        plt.colorbar(image, label="Shadow hours/day")
        plt.title(f"{design.name} — {season} — periodic interior window")
        plt.xlabel("East-West (m)")
        plt.ylabel("North-South (m)")
        plt.tight_layout()
        plt.savefig(output_dir / f"{design.name}_{season}_shadow_hours.png", dpi=180)
        plt.close()

    with (output_dir / "summary.csv").open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=summary_rows[0].keys())
        writer.writeheader()
        writer.writerows(summary_rows)

    with (output_dir / "hourly.csv").open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=hourly_rows[0].keys())
        writer.writeheader()
        writer.writerows(hourly_rows)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", default="simulations/shadow/generated")
    parser.add_argument("--latitude", type=float, default=33.5104)
    parser.add_argument("--window", type=float, default=100.0)
    parser.add_argument("--resolution", type=float, default=0.25)
    parser.add_argument("--timestep-minutes", type=int, default=10)
    args = parser.parse_args()

    simulate(
        output_dir=Path(args.output),
        latitude_deg=args.latitude,
        window_m=args.window,
        resolution_m=args.resolution,
        timestep_minutes=args.timestep_minutes,
    )
