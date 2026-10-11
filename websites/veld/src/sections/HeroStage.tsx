import { img } from '@/assets/images';

/**
 * The photographic layers behind the hero.
 *
 * Written as a stack rather than one picture because every other thing that
 * happens here is per-layer: the loader scales them all from 1.2, the scroll
 * drifts each one by a different amount, and the cursor trail reads them
 * against a depth map. Adding a cut-out foreground is one more entry.
 *
 * `data-hero-image` is what the loader looks for; `data-depth` is the drift
 * distance in percent, nearest layer moving least.
 */
const LAYERS = [{ src: 'hero-driver.webp', depth: 15, className: 'object-[38%_center]' }] as const;

export function HeroStage() {
  return (
    <div data-trail-stage className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {LAYERS.map((layer) => (
        <div
          key={layer.src}
          data-parallax
          data-parallax-end={layer.depth}
          className="absolute inset-0"
        >
          <img
            data-hero-image
            data-trail-layer
            src={img(layer.src)}
            alt=""
            className={`h-full w-full object-cover ${layer.className ?? ''}`}
            draggable={false}
          />
        </div>
      ))}

      {/* Keeps the copy legible over any frame without flattening the photo. */}
      <div className="absolute inset-0 bg-black/25" />
    </div>
  );
}
