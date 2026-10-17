import { Text as RNText, type StyleProp, type TextProps, type TextStyle } from 'react-native';

import { type } from '../theme';

/**
 * One string, set from the ramp in `theme.ts`.
 *
 * The shared `src/components/ui/text.tsx` resolves against the repo's semantic
 * utilities, which is right for a showcase that re-themes those variables.
 * This one carries its own ramp instead — family, size, leading and tracking
 * together — because the four weights of Plus Jakarta Sans are four distinct
 * families to React Native, and a `font-bold` utility would pick a weight the
 * family cannot supply and get a synthesised face on web and nothing on
 * Android.
 *
 * `includeFontPadding: false` keeps Android from adding leading that the web
 * harness does not have; without it every line sits a pixel or two low on
 * device and nothing in a web render would show it.
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
