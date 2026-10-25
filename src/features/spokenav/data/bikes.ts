/**
 * Everything the ride screen says, so the components stay presentational.
 *
 * The brand, the address and every figure are invented. The road is a
 * free-licensed photograph, credited in
 * `assets/images/spokenav/CREDITS.md`.
 *
 * **The route is drawn, the road is photographed**, which is the split the
 * rule asks for: a road is a picture of a place and out of drawing range,
 * while a route line is a piece of interface. That is also why there is no
 * drawn map on this screen — a map has no idea to interpret, so vectoring one
 * is tracing rather than building.
 */

const road = require('../../../../assets/images/spokenav/road.jpg');

export const ride = {
  address: 'Jalan Amegah 12, Malibu Night',
  instruction: { lead: 'In ', distance: '30m', rest: ', Turn Left' },
  src: road,
} as const;

export const views = [
  { id: 'road', label: 'Road', on: true },
  { id: 'satellite', label: 'Satellite', on: false },
] as const;

export const stats = [
  { id: 's1', label: 'Time left', value: '00:21:32' },
  { id: 's2', label: 'Calories', value: '623 Kcal' },
  { id: 's3', label: 'Distance', value: '20 km' },
] as const;

export const hint = 'Swipe for more information';
