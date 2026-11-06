/**
 * Sizes for a 393dp phone.
 *
 * The packing tile and the itinerary beside it share whatever the sheet has
 * left between the flight card and the dock, so the pair reaches the dock on
 * any phone instead of stopping short of it.
 */
import { useWindowDimensions } from 'react-native';

export const MARGIN = 20;
export const PAD_TOP = 6;

export const HEADER_H = 44;
export const TAB_H = 44;
export const NEXT_H = 26;
export const TRIP_CARD_H = 74;
export const FLIGHT_CARD_H = 112;
export const DOCK_H = 58;
export const SHEET_PAD = 16;

export const GAP_HEADER_TABS = 16;
export const GAP_TABS_NEXT = 20;
export const GAP_NEXT_SHEET = 14;
export const GAP_CARDS = 12;

export function useTripsLayout(insets: { top: number; bottom: number }) {
  const { width, height } = useWindowDimensions();

  const aboveSheet =
    insets.top +
    PAD_TOP +
    HEADER_H +
    GAP_HEADER_TABS +
    TAB_H +
    GAP_TABS_NEXT +
    NEXT_H +
    GAP_NEXT_SHEET;

  const sheetTop = aboveSheet;
  const used = SHEET_PAD + TRIP_CARD_H + GAP_CARDS + FLIGHT_CARD_H + GAP_CARDS;
  const bottom = DOCK_H + insets.bottom;

  return {
    width,
    sheetTop,
    /** What is left for the packing tile and the itinerary beside it. */
    panelH: Math.max(220, height - sheetTop - used - bottom - 8),
  };
}
