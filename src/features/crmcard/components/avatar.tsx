import { Image } from 'react-native';

import { radius } from '../theme';
import { FACES } from './faces';

/**
 * Someone's photograph, round.
 *
 * The reference shows people, so this shows people: free-licensed portraits,
 * bundled rather than hotlinked, credited in
 * `assets/images/crmcard/CREDITS.md`.
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
