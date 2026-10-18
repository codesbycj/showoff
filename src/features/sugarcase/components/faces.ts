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
  require('../../../../assets/images/sugarcase/face-1.jpg'),
  require('../../../../assets/images/sugarcase/face-2.jpg'),
  require('../../../../assets/images/sugarcase/face-3.jpg'),
  require('../../../../assets/images/sugarcase/face-4.jpg'),
  require('../../../../assets/images/sugarcase/face-5.jpg'),
  require('../../../../assets/images/sugarcase/face-6.jpg'),
];
