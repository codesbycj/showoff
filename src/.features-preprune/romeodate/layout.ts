import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for romeodate, derived from the live window.
 *
 * **The calendar is the remainder.** Everything else in the column is budgeted
 * and the month grid takes what is left, so the form fills the window exactly
 * and there is no band at the foot (INSPO-RULES I3). Each showcase in this
 * board picks whichever block absorbs slack gracefully — the hero on
 * romeospot, the notes box on romeobook, the calendar here.
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 20;
  const gap = 14;

  const barH = 44;
  const venueH = 86;
  const fieldH = 64;
  const ctaH = 56;

  // Inside the calendar card, above the grid.
  const dateHeadH = 58;
  const monthTitleH = 30;
  const weekdayH = 24;
  const rows = 5; // December 2025 fits in five weeks

  const fixed =
    insets.top +
    barH +
    gap +
    venueH +
    gap +
    /* calendar card goes here */
    gap +
    fieldH +
    gap +
    fieldH +
    gap +
    ctaH +
    insets.bottom;

  const calendarH = Math.max(286, H - fixed);
  const gridH = calendarH - dateHeadH - monthTitleH - weekdayH - 12;
  const cellH = Math.max(34, Math.floor(gridH / rows));

  return {
    W,
    H,
    insets,
    margin,
    gap,
    barH,
    venue: { h: venueH, radius: 14 },
    calendar: {
      h: calendarH,
      radius: 16,
      headH: dateHeadH,
      titleH: monthTitleH,
      weekdayH,
      cellH,
      /** The selected day's disc, sized to sit comfortably inside its cell. */
      disc: Math.min(38, cellH - 4),
    },
    field: { h: fieldH, radius: 16 },
    cta: { h: ctaH, radius: 16 },
    step: 30,
    orb: 44,
  };
}
