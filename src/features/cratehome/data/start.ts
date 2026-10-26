/**
 * Everything the delivery home says, so the components stay presentational.
 *
 * **No emoji.** The reference ends its greeting with a waving hand. An emoji
 * is a different glyph on Windows, Android and iOS and is simply missing for
 * some codepoints on Windows, so it is never shipped as UI (AGENTS.md). The
 * greeting stands on its own.
 *
 * **The parcels are parcels, not branded products.** The reference's rows are
 * a Rolex and a Mac mini. Both are real products, and the honest substitute
 * for a parcel app is a parcel - which also sidesteps the fact that the best
 * free-licensed shots of the obvious alternatives are recognisably one
 * manufacturer's design.
 *
 * **The route reads from one place to another.** The reference labels its
 * middle node "To", between "Dubai" and "Ajman", which is a label where a
 * place name belongs. Here the middle node is where the parcel is now.
 */

export const copy = {
  greetLead: 'Hello,',
  greetName: 'Brandon!',
  search: 'Track your parcel',
  send: 'Send parcel',
  track: 'Track order',
  section: 'Active delivery',
} as const;

export const avatar = require('../../../../assets/images/cratehome/face-1.jpg');

export const deliveries = [
  {
    id: 'd1',
    code: 'ID: 70D2000B',
    name: 'Two boxes, packed',
    state: 'Transit',
    from: 'Dubai',
    at: 'Sharjah',
    to: 'Ajman',
    progress: 0.55,
    art: require('../../../../assets/images/cratehome/parcel-1.jpg'),
  },
  {
    id: 'd2',
    code: 'ID: 60D2300B',
    name: 'Clothes and oddments',
    state: 'Transit',
    from: 'Dubai',
    at: 'Al Quoz',
    to: 'Abu Dhabi',
    progress: 0.28,
    art: require('../../../../assets/images/cratehome/parcel-2.jpg'),
  },
  {
    id: 'd3',
    code: 'ID: 41C8100A',
    name: 'One box, flat-packed',
    state: 'Booked',
    from: 'Dubai',
    at: 'Al Barsha',
    to: 'Fujairah',
    progress: 0.1,
    art: require('../../../../assets/images/cratehome/parcel-3.jpg'),
  },
] as const;

export const tabs = ['home', 'order', 'send', 'tracking', 'profile'] as const;
