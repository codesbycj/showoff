/**
 * Screen 4 content — the consultation booking.
 *
 * `OPTIONS`, `DATES` and `TIMES` carry explicit element types because each is
 * emptied one entry at a time for the timelapse, and an empty array literal
 * infers `never[]`.
 */

export const HEADER = {
  title: 'Book Consultation Session',
  avatar: require('../../../../assets/images/auralegal/alexi-avatar.jpg') as number,
} as const;

export const SUBJECT = {
  name: 'Alexi Turner',
  place: 'Sydney, Australia',
  specialty: 'Family Lawyer',
  avatar: require('../../../../assets/images/auralegal/alexi-avatar.jpg') as number,
} as const;

export const SECTIONS = {
  typeTitle: 'Consultation Type',
  step: 'Step 1 of 2',
  whenTitle: 'Select Date & Time',
  month: 'October 2024',
} as const;

export type ConsultOption = {
  key: string;
  label: string;
  /** Only the online option carries a platform tag. */
  tag: string | null;
  icon: 'videocam' | 'apartment' | 'directionsCar';
};

export const OPTIONS: readonly ConsultOption[] = [
  // STEP 4.08 the one that is selected
  // { key: 'online', label: 'Online Consultation', tag: 'Zoom / Meet', icon: 'videocam' },
  // STEP 4.09 going to them
  // { key: 'office', label: 'Meeting at Lawyer Office', tag: null, icon: 'apartment' },
  // STEP 4.17 them coming to you
  // { key: 'client', label: 'Office Visit - Client Location', tag: null, icon: 'directionsCar' },
];

/**
 * The date fan.
 *
 * `rise` and `tilt` are the export's own per-position offsets — the capsules
 * are rotated and lifted to suggest an arc rather than being placed on one. The
 * middle entry is the selected one and takes no tilt at all.
 */
export type FanDate = {
  key: string;
  weekday: string;
  day: string;
  height: number;
  tilt: string;
  rise: number;
  dim: number;
};

export const DATES: readonly FanDate[] = [
  // STEP 4.13 the far left of the fan
  // { key: '9', weekday: 'Sun', day: '9', height: 80, tilt: '-12deg', rise: 8, dim: 0.7 },
  // STEP 4.14 one in
  // { key: '10', weekday: 'Mon', day: '10', height: 96, tilt: '-6deg', rise: 4, dim: 0.85 },
  // STEP 4.15 the day itself
  // { key: '11', weekday: 'Tue', day: '11', height: 112, tilt: '0deg', rise: 0, dim: 1 },
  // STEP 4.16 one out
  // { key: '12', weekday: 'Wed', day: '12', height: 96, tilt: '6deg', rise: 4, dim: 0.85 },
  // STEP 4.20 and the far right
  // { key: '13', weekday: 'Thu', day: '13', height: 80, tilt: '12deg', rise: 8, dim: 0.7 },
];

export type TimeSlot = { key: string; label: string; dim: number };

/**
 * Keys are prefixed `t` so they cannot collide with `DATES`. Both arrays live in
 * this one file, and the timelapse uncomments an entry *by key* — an unprefixed
 * `'11'` would match the date as readily as the time.
 */
export const TIMES: readonly TimeSlot[] = [
  // STEP 4.21 first thing
  // { key: 't09', label: '09:00 AM', dim: 0.6 },
  // STEP 4.22 mid morning
  // { key: 't10', label: '10:00 AM', dim: 0.8 },
  // STEP 4.23 the slot we want
  // { key: 't11', label: '11:00 AM', dim: 1 },
  // STEP 4.28 midday
  // { key: 't12', label: '12:00 PM', dim: 0.8 },
  // STEP 4.29 and after lunch
  // { key: 't13', label: '01:00 PM', dim: 0.6 },
];

export const CONFIRM = {
  caption: 'Continue with Alexi',
} as const;

/** The toast the export hides off-screen until the booking is confirmed. */
export const TOAST = {
  title: 'Appointment Reserved',
  detail: 'Tue, Oct 11 at 11:00 AM',
} as const;
