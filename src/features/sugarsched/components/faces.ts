import type { ImageSourcePropType } from 'react-native';

/**
 * The bundled portraits.
 *
 * `require` rather than a URI: a recording must not depend on the network,
 * and Metro resolves these at build time, so a missing file is a bundling
 * error rather than a blank circle on camera.
 *
 * The order matches the other screens of this board, so the same colleague
 * is the same person wherever they appear.
 */
export const FACES: ImageSourcePropType[] = [
  require('../../../../assets/images/sugarsched/face-1.jpg'),
  require('../../../../assets/images/sugarsched/face-2.jpg'),
  require('../../../../assets/images/sugarsched/face-3.jpg'),
  require('../../../../assets/images/sugarsched/face-4.jpg'),
  require('../../../../assets/images/sugarsched/face-5.jpg'),
  require('../../../../assets/images/sugarsched/face-6.jpg'),
];
