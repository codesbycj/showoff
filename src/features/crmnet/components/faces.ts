import type { ImageSourcePropType } from 'react-native';

/**
 * The bundled portraits, in the order the customers are listed.
 *
 * `require` rather than a URI: a recording must not depend on the network, and
 * Metro resolves these at build time so a missing file is a bundling error
 * rather than a blank circle on camera.
 *
 * Baked to 240px square by `tools/bake/faces.py`, which crops each one on the
 * head — a centred crop of a portrait takes the collar.
 */
export const FACES: ImageSourcePropType[] = [
  require('../../../../assets/images/crmnet/face-1.jpg'),
  require('../../../../assets/images/crmnet/face-2.jpg'),
  require('../../../../assets/images/crmnet/face-3.jpg'),
  require('../../../../assets/images/crmnet/face-4.jpg'),
  require('../../../../assets/images/crmnet/face-5.jpg'),
  require('../../../../assets/images/crmnet/face-6.jpg'),
  require('../../../../assets/images/crmnet/face-7.jpg'),
  require('../../../../assets/images/crmnet/face-8.jpg'),
  require('../../../../assets/images/crmnet/face-9.jpg'),
  require('../../../../assets/images/crmnet/face-10.jpg'),
  require('../../../../assets/images/crmnet/face-11.jpg'),
];
