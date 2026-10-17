/**
 * The screen's anchors, in dp, chosen for a 393dp phone.
 *
 * None of these is a measurement off the reference board divided by a scale —
 * the shot is an inspo brief (AGENTS.md, "Three kinds of reference"), so the
 * numbers below are the ones that are right for a real phone: a 24dp page
 * margin, a 40dp display, a 58dp primary button, a stage that takes whatever
 * is left between the copy and the button.
 *
 * Nothing here pins a width. The rail, the copy, the stage and the button all
 * take what the margins leave, and the wallet is sized as a fraction of the
 * window through `useStage()` below — so the screen holds together on a 360dp
 * phone and on a 430dp one, which is the whole point of not copying offsets
 * off someone's artboard.
 *
 * On the insets: `useSafeAreaInsets()` reports 0 under the preview harness.
 * `shoot.js` fakes `59,0,34,0`, but nothing inside an expo-router `Stack` ever
 * reads it — the navigator re-provides the context with its own zeroed
 * metrics. So the design's insets are pinned here as a *fallback*, and
 * `use-insets.ts` prefers the device's whenever it reports any.
 */
import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { type } from './theme';

/** The status bar, iPhone 14 Pro — which is also what `shoot.js` fakes. */
export const TOP_INSET = 59;

/** Its home indicator. */
export const BOTTOM_INSET = 34;

/** The page margin. The rail, the copy and the button all hold to it. */
export const MARGIN = 24;

/** The progress rail, below the status bar. */
export const RAIL_TOP = 16;
/** Each segment: 4dp of bar, 6dp of gap. */
export const RAIL_HEIGHT = 4;
export const RAIL_GAP = 6;
/** How far the rail sits from the counter and from "Skip". */
export const RAIL_INSET = 16;

/** Between the rail and the headline. */
export const HEADLINE_TOP = 44;

/** Between the headline and the lede. */
export const LEDE_TOP = 16;
/**
 * The lede is held to this fraction of the page width rather than wrapped by
 * accident — two tidy lines on a 393dp phone, and still two on a 430dp one.
 */
export const LEDE_WIDTH = 0.8;

/** Between the stage and the button it stands over. */
export const STAGE_BOTTOM = 22;

/** Between the button and the home indicator. */
export const BUTTON_BOTTOM = 10;
export const BUTTON_HEIGHT = 58;
/** The gap between the label and its arrow. */
export const BUTTON_GAP = 10;
export const BUTTON_ARROW = 17;

/**
 * The stage — the pedestal, the wallet and the pool of light under it.
 *
 * Sized off the window rather than pinned, and clamped at both ends: a wide
 * phone must not blow the wallet up past the point where it crowds the
 * headline, and a narrow one must not shrink it to a detail.
 *
 * It is also sized off the **height left over**, not only the width. Every
 * other block on this screen is a fixed number of dp — two insets, a rail, two
 * lines of display, two of lede, a button — so what the stage may occupy is
 * arithmetic, and doing it here means the art shrinks on a short phone instead
 * of overflowing its slot. Relying on overflow is what Android does not
 * forgive, and a `flex: 1` box centred on an oversized child clips it at both
 * edges.
 *
 * `useSafeAreaInsets` is read directly rather than through `use-insets.ts`,
 * which imports this file — a cycle Metro would resolve but nobody should have
 * to reason about. The fallback is the same.
 */
export function useStage() {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  /** Everything above the stage, and everything below it. */
  const above =
    (insets.top || TOP_INSET) +
    RAIL_TOP +
    type.skip.line +
    HEADLINE_TOP +
    type.display.line * 2 +
    LEDE_TOP +
    type.lede.line * 2;
  const below = STAGE_BOTTOM + BUTTON_HEIGHT + BUTTON_BOTTOM + (insets.bottom || BOTTOM_INSET);
  const slot = height - above - below;

  /**
   * The drawn stage stands about 1.64 wallets tall — the pocket and the cards
   * above it, plus the disc and its pool below. 0.58 of the slot leaves the
   * art breathing room inside that rather than filling it to the edges.
   *
   * The width share is the one that binds on a normal phone, and 0.64 is a
   * deliberate step up from a first pass at 0.58: the hero of an onboarding
   * screen should be the hero. Below about 330dp of slot the height share
   * takes over and the art gets out of the copy's way instead.
   *
   * The floor is 80 and not a friendlier number for one measured reason: on a
   * 320x568 screen the height share works out at 88, and a floor of 96 pushed
   * the stage 28dp taller than its slot — straight up through the lede. A
   * floor that overrides the fit is not a floor, it is an overlap.
   */
  const wallet = clamp(Math.min(width * 0.64, slot * 0.58), 80, 290);
  const pedestal = wallet * 1.28;

  return {
    wallet,
    /** The pocket is a little wider than it is tall, as a wallet is. */
    walletHeight: wallet * 0.78,
    /** How far the cards stand out of the pocket. */
    cardRise: wallet * 0.3,
    /** The disc under it — an ellipse, read as a circle in perspective. */
    pedestal,
    /** The pool of light behind the whole stage. */
    glow: clamp(slot * 0.95, 240, 440),
  };
}

function clamp(n: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, n));
}
