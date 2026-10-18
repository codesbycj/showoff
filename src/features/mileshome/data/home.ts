/** Everything the home screen says, kept out of the components. */

export const header = {
  meta: 'Good morning',
  name: 'Jacob Jones',
} as const;

export const balance = {
  label: 'Available miles',
  value: '84,320',
  meta: '+2,140 this month',
} as const;

export const card = {
  title: 'dining',
  meta: '142 partners',
} as const;

/** Which page of the carousel the design is showing. */
export const dots = { count: 6, active: 2 } as const;

export const cta = 'Redeem my miles';

/**
 * The cut-out photographs scattered over the page, and where each one sits.
 *
 * `x` and `y` are fractions of the scatter's own box, so the arrangement keeps
 * its shape on a 360dp phone as well as a 430dp one — a throw laid out in dp
 * slides off the narrow one and leaves a hole on the wide one.
 */
export const scatter = [
  { key: 'burger', art: 'burger', x: -0.03, y: 0.06, w: 96, angle: -8 },
  { key: 'hotdog', art: 'hotdog', x: 0.66, y: 0.02, w: 104, angle: 12 },
  { key: 'pad', art: 'pad', x: 0.64, y: 0.66, w: 104, angle: -14 },
] as const;

export const tabs = [
  { key: 'home', label: 'Home', icon: 'home', solid: true },
  { key: 'brands', label: 'Brands', icon: 'tag', solid: false },
  { key: 'cards', label: 'My cards', icon: 'card', solid: false },
  { key: 'profile', label: 'Profile', icon: 'user', solid: false },
] as const;

export const selectedTab = 'home';
