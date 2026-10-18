import type { ImageSourcePropType } from 'react-native';

/**
 * The bundled portraits.
 *
 * `require` rather than a URI: a recording must not depend on the network,
 * and Metro resolves these at build time, so a missing file is a bundling
 * error rather than a blank circle on camera.
 */
export const FACES: ImageSourcePropType[] = [
  require('../../../../assets/images/happnswipe/face-1.jpg'),
  require('../../../../assets/images/happnswipe/face-2.jpg'),
  require('../../../../assets/images/happnswipe/face-3.jpg'),
  require('../../../../assets/images/happnswipe/face-4.jpg'),
  require('../../../../assets/images/happnswipe/face-5.jpg'),
  require('../../../../assets/images/happnswipe/face-6.jpg'),
];
