/** Everything the booking screen says, kept out of the components. */

export const header = {
  wordmark: 'BRANJA',
  badge: '4',
} as const;

/** Which page of the hero carousel the design is showing. */
export const dots = { count: 3, active: 0 } as const;

export const copy = {
  kicker: 'Your style, effortlessly.',
  display: 'Find your barber. Book\nyour next fresh look.',
  cta: 'Book New Appointment',
} as const;

export const appointment = {
  label: 'UPCOMING APPOINTMENT',
  title: 'Haircut +\nBeard Trim',
  meta: 'Fresh cut and trims await',
  day: 'Wed, Aug 10',
  slots: [
    { key: 'start', time: '09:00 am', meta: '30 min' },
    { key: 'end', time: '09:30 am', meta: '$100.00' },
  ],
  discount: '10% OFF',
  barber: { name: 'Eyal Hossain', role: 'Home Hairstylist', face: 2 },
} as const;

export const dock = [
  { key: 'home', icon: 'home' },
  { key: 'bookings', icon: 'calendar' },
  { key: 'barbers', icon: 'users' },
  { key: 'wallet', icon: 'wallet' },
] as const;

export const selectedDock = 'home';
