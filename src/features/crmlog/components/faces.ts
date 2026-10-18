import type { ImageSourcePropType } from 'react-native';

/**
 * The bundled portraits.
 *
 * `require` rather than a URI: a recording must not depend on the network, and
 * Metro resolves these at build time so a missing file is a bundling error
 * rather than a blank circle on camera.
 *
 * The order matches the other two screens of this board, so the same three
 * colleagues appear on every deal.
 */
export const FACES: ImageSourcePropType[] = [
  require('../../../../assets/images/crmlog/face-1.jpg'),
  require('../../../../assets/images/crmlog/face-2.jpg'),
  require('../../../../assets/images/crmlog/face-3.jpg'),
];
