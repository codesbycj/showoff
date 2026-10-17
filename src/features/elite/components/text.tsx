import { Text as RNText, type StyleProp, type TextProps, type TextStyle } from 'react-native';

import { type } from '../theme';

/**
 * One string, set from the ramp in `theme.ts`.
 *
 * It carries its own ramp — family, size, leading and tracking together —
 * rather than resolving against the repo's semantic utilities, because the
 * weights of Poppins are separate families to React Native: a `font-bold`
 * utility would ask for a weight the family cannot supply and get a
 * synthesised face on web and nothing at all on Android.
 *
 * `includeFontPadding: false` keeps Android from adding leading the web
 * harness does not have; without it every line sits a pixel or two low on
 * device and no web render would show it.
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
