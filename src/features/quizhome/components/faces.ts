import type { ImageSourcePropType } from 'react-native';

/**
 * The bundled portraits.
 *
 * `require` rather than a URI: a recording must not depend on the network,
 * and Metro resolves these at build time, so a missing file is a bundling
 * error rather than a blank circle on camera.
 */
export const FACES: ImageSourcePropType[] = [
  require('../../../../assets/images/quizhome/face-1.jpg'),
  require('../../../../assets/images/quizhome/face-2.jpg'),
  require('../../../../assets/images/quizhome/face-3.jpg'),
];
