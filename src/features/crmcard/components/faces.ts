import type { ImageSourcePropType } from 'react-native';

/**
 * The bundled portraits.
 *
 * `require` rather than a URI: a recording must not depend on the network, and
 * Metro resolves these at build time so a missing file is a bundling error
 * rather than a blank circle on camera.
 *
 * The order matches `crmnet`'s deliberately — the same person has the same
 * photograph on both screens of the board, which is the point of a CRM.
 */
export const FACES: ImageSourcePropType[] = [
  require('../../../../assets/images/crmcard/face-1.jpg'),
  require('../../../../assets/images/crmcard/face-2.jpg'),
  require('../../../../assets/images/crmcard/face-3.jpg'),
  require('../../../../assets/images/crmcard/face-4.jpg'),
];
