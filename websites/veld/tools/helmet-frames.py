"""Render a helmet turntable: one WebP per yaw angle, for the scroll-spun canvas.

    python helmet-frames.py [--frames 120] [--size 520] [--quality 72] [--preview]

The partner wall spins a helmet as you scroll, which needs a real turntable —
a flat SVG rotated in 3D reads as a rotating sticker, and there is no photograph
of a helmet that is not covered in somebody's actual sponsors. So the helmet is
modelled as a signed distance field and sphere-traced here, once, into frames
the page then just plays.

The shell is a smooth union of four ellipsoids (cranium, face mass, jaw,
rear spoiler). Everything else — visor aperture, chin vent, livery — is a
*surface region*, decided from where the hit point lands in helmet-local
coordinates rather than modelled as geometry. That is what makes the livery
track the shell as it turns instead of sliding over it.

Antialiasing is analytic, not supersampled: a ray that misses records how close
it passed, and that becomes the alpha. Supersampling 2x would have quadrupled a
render that already takes minutes, for an edge that is no cleaner.
"""

import argparse
import os
import time

import numpy as np
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, "..", "src", "assets", "helmet")

# The site's own palette, so the helmet belongs to the page it sits on.
SHELL = np.array([0.93, 0.93, 0.94])
SIGNAL = np.array([1.00, 0.898, 0.00])
INK = np.array([0.07, 0.07, 0.08])
VISOR = np.array([0.05, 0.07, 0.11])
TRIM = np.array([0.58, 0.60, 0.63])


# --------------------------------------------------------------------------
# Signed distance field
# --------------------------------------------------------------------------
def sd_ellipsoid(p, centre, radii):
    """Approximate SDF of an ellipsoid — exact enough for sphere tracing."""
    q = (p - centre) / radii
    k0 = np.linalg.norm(q, axis=-1)
    k1 = np.linalg.norm(q / radii, axis=-1)
    return np.where(k0 > 1e-6, k0 * (k0 - 1.0) / np.maximum(k1, 1e-6), -min(radii))


def smin(a, b, k):
    """Polynomial smooth minimum: a union with a fillet instead of a crease."""
    h = np.clip(0.5 + 0.5 * (b - a) / k, 0.0, 1.0)
    return b * (1 - h) + a * h - k * h * (1 - h)


def helmet_sdf(p):
    """p: (...,3) in helmet-local space. x right, y up, z towards the viewer."""
    # Proportions matter more than detail here: the cranium has to dominate.
    # An earlier pass gave the jaw its own large mass pushed well forward,
    # which looks right dead-on and reads as a lopsided blob the moment the
    # helmet turns forty degrees. The chin bar is a modest extension of the
    # face, not a second head.
    cranium = sd_ellipsoid(p, np.array([0.0, 0.10, -0.05]), np.array([0.88, 1.00, 0.96]))
    face = sd_ellipsoid(p, np.array([0.0, -0.38, 0.16]), np.array([0.78, 0.52, 0.88]))
    jaw = sd_ellipsoid(p, np.array([0.0, -0.62, 0.28]), np.array([0.52, 0.28, 0.70]))
    # Tucked inside the cranium's own radius. Sitting proud of it turned the
    # rear spoiler into a spike that swung round the silhouette every time the
    # helmet passed three-quarter view.
    spoiler = sd_ellipsoid(p, np.array([0.0, 0.00, -0.78]), np.array([0.42, 0.26, 0.24]))

    d = smin(cranium, face, 0.26)
    d = smin(d, jaw, 0.24)
    d = smin(d, spoiler, 0.28)
    return d


BOUND_RADIUS = 1.75  # comfortably encloses everything above


# --------------------------------------------------------------------------
# Surface regions, in helmet-local coordinates
# --------------------------------------------------------------------------
def soft(edge, x, width):
    """smoothstep, returning 1 well inside the region."""
    return np.clip(0.5 - (x - edge) / max(width, 1e-6), 0.0, 1.0) ** 1


def shade_surface(p, n):
    """Base colour and glossiness per hit point.

    Everything is decided in *spherical* local coordinates — azimuth measured
    from dead ahead, elevation from the equator — rather than from raw x/y/z.
    A livery is painted onto a shell, so its boundaries are lines of latitude
    and longitude; cutting it with planes in x/y/z instead puts hard horizontal
    crescents across the back of the helmet and a visor that wraps round to the
    occiput.
    """
    x, y, z = p[..., 0], p[..., 1], p[..., 2]
    r = np.sqrt(x * x + y * y + z * z) + 1e-6
    az = np.arctan2(x, z)          # 0 ahead, +/-pi behind
    el = np.arcsin(np.clip(y / r, -1.0, 1.0))
    a = np.abs(az)

    colour = np.broadcast_to(SHELL, p.shape).copy()
    gloss = np.full(x.shape, 0.38)
    shininess = np.full(x.shape, 52.0)

    def paint(mask, rgb):
        return np.where(mask[..., None], rgb, colour)

    # --- centre stripe over the crown, front to back -----------------------
    # Painted on the sagittal plane rather than in azimuth, so it stays the
    # same width as it crosses the top instead of pinching at the pole.
    half_w = 0.17
    crown = (np.abs(x) < half_w) & (el > -0.10)
    colour = paint(crown, SIGNAL)
    pin = (np.abs(np.abs(x) - half_w) < 0.030) & (el > -0.10)
    colour = paint(pin, INK)

    # --- visor aperture: a slot, not a belt --------------------------------
    wrap = np.clip(a / 1.22, 0.0, 1.0)
    top = 0.30 - 0.34 * wrap**2
    bottom = -0.13 + 0.17 * wrap**2
    in_port = (a < 1.22) & (el < top) & (el > bottom)

    # Thin ink surround, hugging the port rather than ringing the helmet.
    surround = (a < 1.30) & (el < top + 0.055) & (el > bottom - 0.055) & ~in_port
    colour = paint(surround, INK)
    colour = paint(in_port, VISOR)
    gloss = np.where(in_port, 0.95, gloss)
    shininess = np.where(in_port, 200.0, shininess)

    # --- a signal dart on each flank, under the port -----------------------
    dart = (a > 0.62) & (a < 1.70) & (el < bottom - 0.14) & (el > -0.58 - 0.18 * np.cos(az))
    colour = paint(dart, SIGNAL)

    # --- chin vent, on the bar only ----------------------------------------
    vent = (a < 0.46) & (el < bottom - 0.16) & (el > -0.78) & (z > 0.30)
    colour = paint(vent, INK)
    louvres = vent & (np.abs((el * 30) % 2.0 - 1.0) < 0.40)
    colour = paint(louvres, TRIM * 0.9)

    # --- hem ---------------------------------------------------------------
    colour = paint(el < -1.02, TRIM * 0.45)

    return colour, gloss, shininess


# --------------------------------------------------------------------------
# Rendering
# --------------------------------------------------------------------------
def normalise(v):
    return v / np.maximum(np.linalg.norm(v, axis=-1, keepdims=True), 1e-9)


KEY = normalise(np.array([0.45, 0.62, 0.65]))
FILL = normalise(np.array([-0.62, 0.10, 0.38]))
VIEW = np.array([0.0, 0.0, 1.0])


def render(yaw, w, h):
    """One frame, as an RGBA uint8 array."""
    # Orthographic camera looking down -z. The helmet is rotated, not the camera.
    aspect = w / h
    extent = 1.42
    xs = np.linspace(-extent * aspect, extent * aspect, w, dtype=np.float32)
    ys = np.linspace(extent, -extent, h, dtype=np.float32)
    gx, gy = np.meshgrid(xs, ys)
    pixel = (2 * extent) / h  # world units per pixel, for the analytic alpha

    origin = np.stack([gx, gy, np.full_like(gx, 3.0)], axis=-1).reshape(-1, 3)
    direction = np.array([0.0, 0.0, -1.0], dtype=np.float32)

    # Only trace rays that can possibly hit: an orthographic ray misses the
    # bounding sphere unless its (x, y) is inside that circle. That is about a
    # third of the frame, and skipping the rest is most of the speed-up.
    radial = np.linalg.norm(origin[:, :2], axis=-1)
    live = radial < BOUND_RADIUS
    o = origin[live]

    # Rotate the ray into helmet space (equivalent to rotating the helmet).
    c, s = np.cos(yaw), np.sin(yaw)
    rot = np.array([[c, 0.0, -s], [0.0, 1.0, 0.0], [s, 0.0, c]], dtype=np.float32)
    o_local = o @ rot.T
    d_local = direction @ rot.T

    t = np.zeros(len(o), dtype=np.float32)
    closest = np.full(len(o), 1e9, dtype=np.float32)
    hit = np.zeros(len(o), dtype=bool)

    # March only the rays still in play, compacting every few steps. Without
    # this every ray is evaluated for all 72 steps, including the two thirds
    # that sailed past on step one — which is most of the render time.
    active = np.arange(len(o))
    for step in range(72):
        p = o_local[active] + t[active, None] * d_local
        d = helmet_sdf(p).astype(np.float32)
        # Fancy indexing, not np.minimum.at. The unbuffered `.at` form is the
        # obvious way to write this and is roughly two orders of magnitude
        # slower; it turned a four-minute render into most of an hour.
        closest[active] = np.minimum(closest[active], d)
        struck = d < 4e-4
        hit[active[struck]] = True
        t[active] = np.where(struck, t[active], t[active] + np.maximum(d, 1e-4))
        if step % 6 == 5:
            keep = ~struck & (t[active] < 6.0)
            active = active[keep]
            if active.size == 0:
                break

    # Alpha from how close a missing ray passed, which antialiases the
    # silhouette without rendering a single extra pixel.
    alpha = np.clip(0.5 - closest / pixel, 0.0, 1.0)
    alpha = np.where(hit, 1.0, alpha)

    rgb = np.zeros((len(o), 3), dtype=np.float32)
    idx = alpha > 0.002
    if np.any(idx):
        p = (o_local + t[:, None] * d_local)[idx]

        # Normal by central differences on the field.
        eps = 1.2e-3
        grad = np.empty_like(p)
        for axis in range(3):
            off = np.zeros(3, dtype=np.float32)
            off[axis] = eps
            grad[:, axis] = helmet_sdf(p + off) - helmet_sdf(p - off)
        n_local = normalise(grad)

        base, gloss, shininess = shade_surface(p, n_local)

        # Light in helmet space too, so the key light stays put in the world
        # while the helmet turns under it.
        key = KEY @ rot.T
        fill = FILL @ rot.T
        view = VIEW @ rot.T

        lambert = np.clip(n_local @ key, 0.0, 1.0)
        fill_term = np.clip(n_local @ fill, 0.0, 1.0) * 0.30
        ambient = 0.36

        half = normalise(key + view)
        spec = np.clip(n_local @ half, 0.0, 1.0) ** shininess * gloss

        # A rim light along the silhouette, which is what stops a dark helmet
        # on a white page from reading as a hole.
        rim = (1.0 - np.clip(np.abs(n_local @ view), 0.0, 1.0)) ** 2.6 * 0.30

        lit = base * (ambient + lambert * 0.86 + fill_term)[:, None]
        lit += spec[:, None] * np.array([1.0, 1.0, 0.98])
        lit += rim[:, None] * np.array([0.85, 0.87, 0.92])
        rgb[idx] = np.clip(lit, 0.0, 1.0)

    out = np.zeros((h * w, 4), dtype=np.float32)
    out[live, :3] = rgb
    out[live, 3] = alpha
    out = out.reshape(h, w, 4)

    # Premultiply-safe: push colour into fully transparent pixels from their
    # neighbours is unnecessary here because alpha only fades at the silhouette,
    # where rgb is already the edge colour.
    return (np.clip(out, 0, 1) * 255).astype(np.uint8)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--frames", type=int, default=120)
    ap.add_argument("--size", type=int, default=520)
    ap.add_argument("--quality", type=int, default=72)
    ap.add_argument("--preview", action="store_true", help="8 frames to a contact sheet")
    args = ap.parse_args()

    w = args.size
    h = int(args.size * 1.12)

    if args.preview:
        sheet = Image.new("RGB", (w // 2 * 8, h // 2), (255, 255, 255))
        for i in range(8):
            frame = render(i * 2 * np.pi / 8, w, h)
            im = Image.fromarray(frame, "RGBA").resize((w // 2, h // 2), Image.LANCZOS)
            sheet.paste(im, (i * (w // 2), 0), im)
        path = os.path.join(HERE, "helmet-preview.png")
        sheet.save(path)
        print("preview ->", path)
        return

    os.makedirs(OUT, exist_ok=True)
    start = time.time()
    total = 0
    for i in range(args.frames):
        yaw = i * 2 * np.pi / args.frames
        frame = render(yaw, w, h)
        name = f"frame_{i + 1:04d}.webp"
        dest = os.path.join(OUT, name)
        Image.fromarray(frame, "RGBA").save(dest, "WEBP", quality=args.quality, method=4)
        total += os.path.getsize(dest)
        if (i + 1) % 20 == 0 or i == 0:
            per = (time.time() - start) / (i + 1)
            print(f"  {i + 1}/{args.frames}  {per:.2f}s/frame  {total // 1024}KB so far")
    print(f"{args.frames} frames, {w}x{h}, {total // 1024}KB total, {time.time() - start:.0f}s")


main()
