import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for romeobook, derived from the live window.
 *
 * **The notes field is the remainder.** Everything else in the column is
 * budgeted and the textarea takes what is left, so the form fills the window
 * exactly — there is no spare dp for a band at the foot (INSPO-RULES I3).
 * romeospot does the same trick with its hero; whichever block can absorb
 * slack gracefully should be the one that does.
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 20;
  const gap = 14;

  const barH = 44;
  const venueH = 86;
  const dateH = 134; // label + value row, then the day strip
  const fieldH = 64; // time, and party size
  const capH = 18; // "Special Requests" / "Booking by"
  const nameH = 52;
  const ctaH = 56;

  const fixed =
    insets.top +
    barH +
    gap +
    venueH +
    gap +
    dateH +
    gap +
    fieldH + // time
    gap +
    fieldH + // party size
    gap +
    capH +
    6 + // caption -> notes
    gap +
    capH +
    6 + // caption -> name
    nameH +
    gap +
    ctaH +
    insets.bottom;

  // Clamped so a short window cannot collapse the notes box below usefulness.
  const notesH = Math.max(72, H - fixed);

  return {
    W,
    H,
    insets,
    margin,
    gap,
    barH,
    venue: { h: venueH, radius: 14 },
    date: { h: dateH, radius: 16 },
    field: { h: fieldH, radius: 16 },
    capH,
    notesH,
    name: { h: nameH, radius: 14 },
    cta: { h: ctaH, radius: 16 },
    /** One chip in the horizontal day strip. */
    day: { w: 52, h: 62, radius: 14, gap: 10 },
    /** The round -/+ controls on the party-size row. */
    step: 30,
    orb: 44,
  };
}
