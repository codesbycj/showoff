import { Image, View, useWindowDimensions } from 'react-native';

import { faces, rings } from '../data/start';
import { MARGIN, STAGE_MIN, STAGE_SHARE, STAGE_TOP } from '../layout';
import { mg, radius } from '../theme';

/** One of the faint rings behind the faces. */
function Ring({ i, r }: { i: number; r: number }) {
  const ring = rings[i];
  return (
    <View
      style={{
        position: 'absolute',
        left: r - r * ring,
        top: r - r * ring,
        width: r * ring * 2,
        height: r * ring * 2,
        borderRadius: radius.pill,
        // MISTAKE 1.22 the rings came in far too heavy
        borderWidth: 6,
        borderColor: mg.ring,
      }}
    />
  );
}

/**
 * One person, placed by ring and angle.
 *
 * Written out one by one in `Constellation` rather than mapped, so the reveal
 * can land them singly — and because staging the element a `.map` returns
 * leaves a callback whose body is a comment, which does not typecheck.
 */
function Face({ i, r, d }: { i: number; r: number; d: number }) {
  const f = faces[i];
  const size = d * f.size;
  const a = (f.angle * Math.PI) / 180;
  return (
    <Image
      source={f.photo}
      style={{
        position: 'absolute',
        left: r + r * f.ring * Math.cos(a) - size / 2,
        top: r + r * f.ring * Math.sin(a) - size / 2,
        width: size,
        height: size,
        borderRadius: radius.pill,
        borderWidth: 3,
        borderColor: mg.onRed,
      }}
    />
  );
}

/**
 * People, arranged on rings.
 *
 * **Every position is polar, not pixel.** Each face carries a ring (a share
 * of the stage's radius) and an angle, so the arrangement keeps its shape at
 * any screen size instead of being a set of offsets taken off whatever size
 * the reference's artboard happened to be.
 *
 * **The stage sizes itself from the window, not from `onLayout`.** A measured
 * box is the obvious way to do this and it is the way that fails here: the
 * harness captured the screen with the layout callback's value still at zero,
 * every position collapsed to the top-left corner, and the whole
 * constellation rendered as a single white dot. `useWindowDimensions` is
 * known before the first paint, so there is no frame where this is empty.
 *
 * The faces are photographs. On a dating app they are not decoration: the
 * screen's whole claim is that there are real people behind it, and initials
 * on a disc would say the opposite (AGENTS.md, "Faces are photographs").
 */
export function Constellation() {
  const win = useWindowDimensions();
  const d = Math.max(STAGE_MIN, Math.min(win.width - MARGIN * 2, win.height * STAGE_SHARE));
  const r = d / 2;

  return (
    <View style={{ flex: 1, marginTop: STAGE_TOP, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ width: d, height: d }}>
{/* STEP 1.07 one ring
        <Ring i={0} r={r} />
*/}
{/* STEP 1.08 another
        <Ring i={1} r={r} />
*/}
{/* STEP 1.09 and a third
        <Ring i={2} r={r} />
*/}

{/* STEP 1.10 someone on the outer ring
        <Face i={1} r={r} d={d} />
*/}
{/* STEP 1.11 someone else
        <Face i={2} r={r} d={d} />
*/}
{/* STEP 1.12 closer in
        <Face i={3} r={r} d={d} />
*/}
{/* STEP 1.13 further out
        <Face i={4} r={r} d={d} />
*/}
{/* STEP 1.14 and you in the middle
        <Face i={0} r={r} d={d} />
*/}
      </View>
    </View>
  );
}
