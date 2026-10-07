/**
 * Screen 3 content — the boarding pass.
 */

/** The screen title. "Ticket" is set in the accent serif, a size larger. */
export const TITLE = { lead: 'Your', accent: 'Ticket' } as const;

/** The dark upper half of the pass. */
export const PASS = {
  seat: { label: 'Seat', value: '10' },
  flight: { label: 'Flight', value: 'ID-749' },
  class: { label: 'Class', value: 'Business' },
  date: '05.06.2023',
} as const;

/** The white middle band — where the flight is going. */
export const ROUTE = {
  code: 'NYC',
  place: 'New York, USA',
} as const;

/**
 * The barcode, exactly as the export draws it: 41 bars of these widths in dp,
 * spread across the full width with a 2dp gap, then the digit row beneath.
 *
 * It is a drawing, not an encoding — the digits below spell a different number
 * from anything these bars could carry — so the widths are carried verbatim
 * rather than generated, and the row is not a real symbology.
 */
export const BARCODE = {
  bars: [
    4, 1, 3, 2, 1, 5, 2, 1, 3, 4, 2, 1, 6, 2, 1, 4, 2, 3, 1, 5, 2, 2, 4, 1, 3, 2, 5, 1, 2, 4, 1, 3,
    2, 6, 1, 3, 2, 4, 1, 2, 5,
  ],
  digits: '2 7 4 7 9 0 2 1 5 7 8 3 2 1 5 7',
} as const;

/** The bottom dock. Only two items, unlike home's three. */
export const DOCK = {
  tickets: 'Tickets',
  home: 'Home',
} as const;
