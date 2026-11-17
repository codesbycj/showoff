import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for nordstay, derived from the live window (I2).
 *
 * **The gallery is the remainder.** Every row below it is sized, the price bar
 * owns the foot, and the photographs take whatever is left — so the rows can
 * never run under the bar (R3: covering text is a FAIL, and the fix is to
 * inset the content, not to nudge the control) and the foot can never open a
 * band (I3). At 393x852 it settles around 318dp, which is the share of the
 * screen the board gives it.
 *
 * **The bar is not padded by `insets.bottom`** — `barBottom` *is* the inset
 * plus a hair, and adding the inset to the bar as well is the double-count
 * that put an empty band under four screens of a deleted batch (R1b).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 22;
  const control = 40;

  const gapTitle = 14;
  const titleH = 60;

  const gapRow = 14;
  const hostH = 58;

  const amenityTitleH = 26;
  const chipH = 34;
  const chipGap = 8;
  /**
   * **Three rows, not two.** The board sets its eight amenities in two rows
   * at artboard scale; at 393dp with a 44dp-safe chip they wrap to three, and
   * assuming two put the last check-in note under the price bar — an R3 FAIL
   * the audit caught and the eye did not.
   */
  const amenityRows = 3;
  const amenitiesH = amenityTitleH + 10 + chipH * amenityRows + chipGap * (amenityRows - 1);

  const noteH = 48;
  const gapNotes = 12;
  const notesH = gapNotes + noteH * 2 + gapNotes;

  const barH = 70;
  const barBottom = insets.bottom + 10;
  /** The rows stop here; the bar starts here. Nothing overlaps. */
  const barZone = barH + barBottom + 14;

  const below =
    gapTitle + titleH + gapRow + hostH + gapRow + amenitiesH + gapRow + notesH + barZone;
  const galleryH = Math.max(260, H - below);

  return {
    W,
    H,
    insets,
    margin,
    gallery: { h: galleryH, radius: 26, control },
    titleH,
    gapTitle,
    hostH,
    gapRow,
    amenity: { titleH: amenityTitleH, chipH, chipGap, h: amenitiesH },
    noteH,
    gapNotes,
    bar: { h: barH, bottom: barBottom, radius: 35 },
  };
}
