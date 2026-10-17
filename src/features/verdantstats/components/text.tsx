import { Text as RNText, type StyleProp, type TextProps, type TextStyle } from 'react-native';

import { type } from '../theme';

/**
 * One string, set from the ramp in `theme.ts`.
 *
 * A copy of screen 1's, deliberately: every showcase owns its own primitives
 * so that blanking one cannot touch another. See the note at the top of
 * `theme.ts`.
 *
 * The shared `src/components/ui/text.tsx` resolves against the repo's semantic
 * utilities; this one carries its own ramp — family, size, leading and
 * tracking together — because Plus Jakarta Sans' weights are distinct families
 * to React Native, and a `font-bold` utility would ask for a weight the family
 * cannot supply: a synthesised face on web, and nothing at all on Android.
 *
 * `includeFontPadding: false` stops Android adding leading the web harness
 * does not have. Every position on this screen is measured off these line
 * boxes, so a pixel of Android-only padding would move all of them.
 */
export function T({
  variant,
  color,
  style,
  ...rest
}: TextProps & {
  variant: keyof typeof type;
  color?: string;
  style?: StyleProp<TextStyle>;
}) {
  const t = type[variant];
  return (
    <RNText
      allowFontScaling={false}
      style={[
        {
          fontFamily: t.family,
          fontSize: t.size,
          lineHeight: t.line,
          letterSpacing: t.tracking,
          includeFontPadding: false,
          color,
        },
        style,
      ]}
      {...rest}
    />
  );
}
