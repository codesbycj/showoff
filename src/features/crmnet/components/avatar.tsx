import { Image } from 'react-native';

import { radius } from '../theme';
import { FACES } from './faces';

/**
 * A customer's photograph.
 *
 * The reference shows people, so this shows people: free-licensed portraits,
 * bundled rather than hotlinked, credited in `assets/images/crmnet/CREDITS.md`.
 * Initials on a disc is what a real CRM falls back to for a contact with no
 * picture — it is not a stand-in for a design that has one.
 *
 * `resizeMode="cover"` on an already-square source is a no-op on the crop and
 * guards the case where a replacement file is not square.
 */
export function Avatar({ face, size }: { face: number; size: number }) {
  return (
    <Image
      source={FACES[face % FACES.length]}
      style={{ width: size, height: size, borderRadius: radius.full }}
      resizeMode="cover"
      accessibilityIgnoresInvertColors
    />
  );
}
