import { PROJECTS } from '@/data/projects';
import { PLATE_OPACITY, SCENE } from '@/motion/motion';
import { wrap } from '@/motion/useWheelIndex';

/**
 * The collage.
 *
 * The reference's home is not a list with a card in the middle of it — it is a
 * **scattered 3D scene**. The current project faces the camera near the centre
 * of the screen; the ones behind it fall away to the lower left, large and
 * turned; the ones ahead recede to the upper right. Scrolling flies the camera
 * along that diagonal, so plates sweep past rather than crossfade in place.
 *
 * ## How it is driven
 *
 * Every plate carries a static `--i` — its slot on the diagonal — and the page
 * root carries `--pos`, written once a frame. The whole transform is then a
 * `calc()` off `(var(--i) - var(--pos))`, so the browser interpolates nineteen
 * plates from a single custom property and React never re-renders to animate.
 *
 * ## Why the slots are unwrapped
 *
 * The index is circular, so `--i` is an *absolute* slot that runs negative and
 * past nineteen, and the project it shows is `slot mod 19`. Wrapping the slot
 * instead would make the plate at index 0 jump the whole length of the
 * diagonal every time the list passed the end.
 *
 * Only the plates within `SCENE.range` of the centre are mounted — nine at a
 * time out of nineteen. The rest are not merely transparent; a plate four
 * places out is several thousand pixels away and would still be composited.
 *
 * ## `preserve-3d` is load-bearing
 *
 * Without it on the scene, each plate's `translateZ` is flattened into its
 * parent's plane: the perspective stops applying, nothing foreshortens, and
 * the sort order is painting order rather than depth. It is the difference
 * between a corridor and a pile.
 */
export function Scene({ slot }: { slot: number }) {
  const slots: number[] = [];
  for (let d = -SCENE.range; d <= SCENE.range; d++) slots.push(slot + d);

  return (
    /*
      The cascade wrapper is outside the perspective host on purpose.
      `useCascade` animates `y` and `filter` on a `.cascade-item`, and GSAP
      writes those as inline `transform` and `filter`. On the element that
      carries `perspective`, the filter would flatten the scene's 3D for the
      whole 1.6s the group takes -- the collage would arrive as a flat pile and
      only become a corridor once the tween cleared.
    */
    <div className="cascade-item pointer-events-none absolute inset-0" data-cascade="stage">
      <div
        className="scene absolute inset-0 overflow-hidden"
        style={{
          perspective: `${SCENE.perspective}px`,
          // The vanishing point sits where the centred plate does, so the
          // plates recede *through* it rather than towards the middle of the
          // window.
          perspectiveOrigin: `${SCENE.centre.x * 100}% ${SCENE.centre.y * 100}%`,
        }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            transformStyle: 'preserve-3d',
            // One place for the step, so the diagonal can be retuned without
            // touching nineteen elements.
            ['--step-x' as string]: `${SCENE.step.x * 100}vw`,
            ['--step-y' as string]: `${SCENE.step.y * 100}vh`,
            ['--step-z' as string]: `${SCENE.step.z}px`,
            ['--turn-y' as string]: `${SCENE.turn.y}deg`,
            ['--turn-x' as string]: `${SCENE.turn.x}deg`,
          }}
        >
          {slots.map((s) => {
            const p = PROJECTS[wrap(s, PROJECTS.length)];
            const t = s - slot;
            // Signed, not absolute: the near side is magnified by the
            // perspective and has to clear the screen sooner than the far side,
            // which is shrinking away and can linger.
            const ramp = t > 0 ? PLATE_OPACITY.near : PLATE_OPACITY.far;
            const op = ramp[Math.min(Math.abs(t), ramp.length - 1)];
            return (
              <div
                key={s}
                className="plate"
                style={{
                  ['--i' as string]: s,
                  left: `${SCENE.centre.x * 100}%`,
                  top: `${SCENE.centre.y * 100}%`,
                  width: `${SCENE.plateW * 100}vw`,
                  aspectRatio: `${SCENE.plateAspect}`,
                  opacity: op,
                  // The record's own dominant swatch, behind the image. It shows
                  // for the frame before the file decodes and through the plate's
                  // own edges as it turns away.
                  backgroundColor: p.tone,
                }}
              >
                <img
                  src={p.image}
                  alt=""
                  draggable={false}
                  decoding="async"
                  loading="eager"
                  className="h-full w-full object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
