/*
 * Find a point on an element that the pointer will actually land on.
 * Injected by cdp.js's `boxOf`; `input` is `{ sel }`.
 */
const el = document.querySelector(input.sel);
if (!el) return null;

const r = el.getBoundingClientRect();
if (r.width === 0 && r.height === 0) return null;

const box = { left: r.left, top: r.top, w: r.width, h: r.height };
/*
 * The element itself, or something inside it -- and deliberately NOT an
 * ancestor that happens to be under the pointer. An <svg> contains its paths,
 * so accepting an ancestor accepts the hole in the middle of a donut as a hit
 * on the ring, which is exactly the bug this file was written to fix.
 */
const mine = (x, y) => {
  if (x < 0 || y < 0 || x > innerWidth - 1 || y > innerHeight - 1) return false;
  const hit = document.elementFromPoint(x, y);
  return !!hit && (hit === el || el.contains(hit));
};

const cx = r.left + r.width / 2;
const cy = r.top + r.height / 2;
if (mine(cx, cy)) return { x: cx, y: cy, ...box, probed: false };

// A ring, an L, a thin diagonal: walk the box looking for the element itself.
// Spiral outward from the centre so the point found is the most central one
// that works, which keeps a hover near where a person would aim.
const STEPS = 11;
let best = null;
let bestD = Infinity;
for (let iy = 0; iy < STEPS; iy++) {
  for (let ix = 0; ix < STEPS; ix++) {
    const x = r.left + (r.width * (ix + 0.5)) / STEPS;
    const y = r.top + (r.height * (iy + 0.5)) / STEPS;
    if (!mine(x, y)) continue;
    const d = (x - cx) * (x - cx) + (y - cy) * (y - cy);
    if (d < bestD) {
      bestD = d;
      best = { x, y };
    }
  }
}

return best ? { ...best, ...box, probed: true } : { x: cx, y: cy, ...box, probed: true, covered: true };
