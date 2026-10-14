/**
 * The one clip path every tile is cut with, mounted once at the top of the app.
 *
 * It is an iOS-style squircle rather than a rounded rectangle — the corner
 * curvature is continuous, so there is no visible join where the arc meets the
 * straight edge. The reference generates this at runtime with `figma-squircle`
 * at `cornerRadius: 0.26, cornerSmoothing: 1`; since those inputs never change,
 * the resulting path is pinned here instead of shipping the library to compute
 * one constant. `clipPathUnits="objectBoundingBox"` makes it a 0..1 unit square,
 * so one path fits a tile at any size.
 */
const SQUIRCLE =
  'M 0.5 0 c 0.2251 0 0.3477 0 0.4238 0.0762 c 0.0762 0.0762 0.0762 0.1987 0.0762 0.4238 ' +
  'L 1 0.5 c 0 0.2251 0 0.3477 -0.0762 0.4238 c -0.0762 0.0762 -0.1987 0.0762 -0.4238 0.0762 ' +
  'L 0.5 1 c -0.2251 0 -0.3477 0 -0.4238 -0.0762 c -0.0762 -0.0762 -0.0762 -0.1987 -0.0762 -0.4238 ' +
  'L 0 0.5 c 0 -0.2251 0 -0.3477 0.0762 -0.4238 c 0.0762 -0.0762 0.1987 -0.0762 0.4238 -0.0762 Z';

export function SquircleDefs() {
  return (
    <svg viewBox="0 0 200 200" className="absolute" aria-hidden="true">
      <clipPath id="squircle" clipPathUnits="objectBoundingBox">
        <path d={SQUIRCLE} />
      </clipPath>
    </svg>
  );
}
