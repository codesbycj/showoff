/**
 * Everything the tracker says, so the components stay presentational.
 *
 * **There is no map here, and that is deliberate.** A map is not in drawing
 * range: it has no idea to interpret, so vectoring one is tracing the
 * reference path by path, which is copying with extra steps (AGENTS.md, "A
 * map is not in drawing range either"). What is drawn instead is the map
 * *idea* — a flat ground, a faint rule for texture, a radius ring around
 * where the parcel started, a route to where it is going, and a pin at each
 * end. None of the reference's real street and district names are reused.
 *
 * **The places are invented**, for the same reason the merchants were: the
 * reference names real neighbourhoods, and a showcase has no business
 * asserting where anyone's parcel is.
 */

export const copy = {
  code: '#70D20800B',
  state: 'Transit',
  name: 'Two boxes, packed',
  senderLabel: 'Sender',
  receiverLabel: 'Receiver',
  courier: 'Ravi Deshmukh',
} as const;

export const parcel = require('../../../../assets/images/cratetrack/parcel.jpg');
export const courier = require('../../../../assets/images/cratetrack/face-1.jpg');

export const route = {
  from: 'Harbour Yard',
  to: 'Ridgeway Depot',
} as const;
