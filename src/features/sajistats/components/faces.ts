import type { ImageSourcePropType } from 'react-native';

/**
 * The bundled portraits.
 *
 * `require` rather than a URI: a recording must not depend on the network,
 * and Metro resolves these at build time, so a missing file is a bundling
 * error rather than a blank circle on camera.
 *
 * The two people in the history; merchants keep their drawn marks.
 */
export const FACES: ImageSourcePropType[] = [
  require('../../../../assets/images/sajistats/face-1.jpg'),
  require('../../../../assets/images/sajistats/face-2.jpg'),
  require('../../../../assets/images/sajistats/face-3.jpg'),
];
